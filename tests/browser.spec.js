const {test,expect}=require('@playwright/test');

// Backend isolado por teste: evita usar contas reais e permite validar retomada.
test.beforeEach(async({page})=>{
 let state={};
 await page.addInitScript(()=>sessionStorage.setItem('jaguarrt-session','a'.repeat(64)));
 await page.route('**/functions/v1/jaguarrt',async route=>{
  const b=route.request().postDataJSON();
  if(b.action==='save')state=b.data;
  await route.fulfill({json:{email:'teste@jaguarcontabil.com.br',admin:false,state,attempts:[]}});
 });
});

const brl=text=>{
 const raw=String(text||'').replace(/[^0-9,.-]/g,'').replace(/\./g,'').replace(',','.');
 return Number(raw)||0;
};

test('linha do tempo resume cada ano sem poluir a página inicial',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=timeline',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#accountToggle')).toBeVisible();
 await expect(page.locator('#timeline .year')).toHaveCount(8);
 await expect(page.locator('.transition-phases')).toHaveCount(0);
 await page.locator('#timeline [data-year="2029"]').click();
 await expect(page.locator('#timelinePanel h3')).toHaveText('ICMS/ISS 90% · IBS 10%');
 await expect(page.locator('#timelinePanel')).toContainText('não a alíquota final');
 await expect(page.locator('#timeline [data-year="2029"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('#timelinePanel').getByRole('button',{name:'Próximo'}).click();
 await expect(page.locator('#timelinePanel')).toContainText('2030');
 await expect(page.locator('#timelinePanel h3')).toHaveText('ICMS/ISS 80% · IBS 20%');
 await page.locator('#timeline [data-year="2026"]').click();
 await expect(page.locator('#timelinePanel')).toContainText('CBS 0,9% e IBS 0,1%');
 await expect(page.locator('#timelinePanel .transition-bars')).toHaveCount(0);
});

test('módulos preservam leitura, retomam etapa e filtram o andamento',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=study',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#accountToggle')).toBeVisible();
 await page.locator('nav [data-go="modules"]').click();
 await expect(page.locator('#moduleGrid .module-card')).toHaveCount(16);
 const moduleTitles=await page.locator('#moduleGrid .module-card h3').allTextContents();
 expect(moduleTitles[5]).toContain('Saldo Credor');
 expect(moduleTitles[7]).toContain('Regimes Específicos');
 expect(moduleTitles[8]).toContain('Comércio Exterior');
 expect(moduleTitles[15]).toContain('Consultoria, Automação e Plano de Ação');
 await page.locator('#moduleGrid .module-card').first().click();
 await expect(page.locator('#modulePage .course-block:visible')).toHaveCount(1);
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 01 DE 06');
 await page.locator('#courseNext').click();
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 02 DE 06');
 await expect(page.locator('#courseProgressLabel')).toHaveText('1 de 6 etapas lidas');
 await page.locator('#courseViewAll').click();
 await expect(page.locator('#modulePage .course-block:visible')).toHaveCount(6);
 await page.locator('#courseViewAll').click();
 await page.locator('#modulePage .back').click();
 await page.locator('[data-study-filter="started"]').click();
 await expect(page.locator('#moduleGrid .module-card')).toHaveCount(1);
 await page.locator('#moduleGrid .module-card').click();
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 02 DE 06');
});

test('teste por módulo corrige, refaz e troca perguntas; teste geral mistura módulos',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=quiz',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#accountToggle')).toBeVisible();
 await page.locator('nav [data-go="quiz"]').click();
 await page.locator('#quizModule').selectOption('05');
 await page.locator('#quiz .quiz-primary').click();
 await expect(page.locator('#quizPage .quiz-question')).toHaveCount(10);
 await expect(page.locator('#quizPage .quiz-context')).toHaveCount(10);
 await expect(page.locator('#quizPage .quiz-question legend small').filter({hasText:'CASO PRÁTICO'})).toHaveCount(5);
 await expect(page.locator('#quizPage .quiz-question legend small').filter({hasText:'INTERPRETAÇÃO'})).toHaveCount(5);
 expect((await page.locator('#quizPage .quiz-context').first().textContent()).length).toBeGreaterThan(45);
 const initialIds=await page.evaluate(()=>quizSession.questions.map(q=>q.id));
 await page.locator('#quizPage .quiz-option').first().click();
 await expect(page.locator('#quizProgress')).toContainText('1 de 10');
 await page.locator('.quiz-submit').click();
 await expect(page.locator('#quizError')).toContainText('questão 2');
 for(let i=1;i<10;i++)await page.locator(`#quiz-question-${i} .quiz-option`).first().click();
 await page.locator('.quiz-submit').click();
 await expect(page.locator('.quiz-review-item')).toHaveCount(10);
 await page.locator('.quiz-actions').first().getByText('Refazer este teste').click();
 expect(await page.evaluate(()=>quizSession.questions.map(q=>q.id))).toEqual(initialIds);
 for(let i=0;i<10;i++)await page.locator(`#quiz-question-${i} .quiz-option`).first().click();
 await page.locator('.quiz-submit').click();
 await page.locator('.quiz-actions').first().getByText('Novo teste').click();
 const renewed=await page.evaluate(()=>quizSession.questions.map(q=>q.id));
 expect(renewed.some(id=>!initialIds.includes(id))).toBe(true);
 await page.locator('#quizPage .back').click();
 await page.locator('#quizModule').selectOption('all');
 await page.locator('#quiz .quiz-primary').click();
 expect(await page.evaluate(()=>new Set(quizSession.questions.map(q=>q.module)).size)).toBe(10);
});

async function supplierValue(card,label){
 return brl(await card.locator('.supplier-line').filter({hasText:label}).locator('b').textContent());
}

test('home orienta o próximo passo sem sobrecarregar a tela',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=product-layer',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#accountToggle')).toBeVisible();
 await expect(page.locator('#homeDashboard .home-dashboard-card')).toHaveCount(3);
 await expect(page.locator('#homeLearningPath')).toHaveCount(0);
 await expect(page.locator('#home .home-tool-grid')).toHaveCount(0);
 await expect(page.locator('.legislative-status')).toContainText('Base técnica revisada');
 await expect(page.locator('#homeGreeting')).toContainText('Olá, Teste');
 await expect(page.locator('#home .home-command-links button')).toHaveCount(2);

 await page.locator('nav [data-go="modules"]').click();
 await page.locator('#moduleGrid .module-card').nth(4).click();
 await expect(page.locator('#modulePage .module-summary')).toBeVisible();
 await expect(page.locator('#modulePage .module-summary-item')).toHaveCount(2);
 await expect(page.locator('#modulePage .module-summary')).not.toContainText('NA JAGUAR');
 await expect(page.locator('#modulePage')).not.toContainText('O que o colaborador da Jaguar precisa fazer na prática');
 await expect(page.locator('#modulePage .module-apply')).toBeVisible();
 await expect(page.locator('#modulePage .module-apply')).toContainText('Simular custo e créditos');

 await page.evaluate(()=>openDiagnostic());
 await expect(page.locator('#diagnosticToolPanel')).toHaveClass(/active/);
 await expect(page.locator('#diagnosticToolTab')).toHaveAttribute('aria-selected','true');
 await page.locator('#diagCompany').fill('Empresa Teste');
 await page.locator('#diagRegime').selectOption('simples');
 await page.locator('#diagSpecial').selectOption('import');
 await page.getByRole('button',{name:'Gerar diagnóstico'}).click();
 await expect(page.locator('#diagnosticResult .diagnostic-box')).toHaveCount(3);
 await expect(page.locator('#diagnosticResult')).toContainText('Comércio exterior');
 await expect(page.locator('#diagnosticResult')).toContainText('Simples Nacional');

 await page.evaluate(()=>openTool('price'));
 await expect(page.locator('#priceConsultive .consultive-card')).toHaveCount(4);
 await expect(page.locator('#priceConsultive')).toContainText('O QUE ANALISAR');
 await page.evaluate(()=>openTool('revenue'));
 await expect(page.locator('#revenueConsultive .consultive-card')).toHaveCount(4);
 await expect(page.locator('#revenueConsultive')).toContainText('COM A REFORMA');
});

test('um comprador compara quatro regimes de fornecedor sem conferência duplicada',async({page})=>{
 const errors=[];
 page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
 page.on('pageerror',err=>errors.push(err.message));

 await page.goto('http://127.0.0.1:4173/?e2e=buyer-suppliers',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#accountToggle')).toBeVisible();
 await page.evaluate(()=>go('tools'));

 await expect(page.locator('#priceToolPanel')).toHaveClass(/active/);
 await expect(page.locator('#priceToolTab')).toContainText('Compra / segmentos');
 await expect(page.locator('.additional-options')).toHaveCount(0);

 // Mesmo comprador, quatro fornecedores.
 await page.locator('#priceSegment').selectOption('servicos');
 await page.locator('#priceBuyerRegime').selectOption('presumido');
 await page.locator('#priceNow').fill('100,00');
 await page.locator('#issRate').fill('5');
 await page.locator('#priceYear').selectOption('2027');

 await expect(page.locator('#activeSegmentBadge')).toHaveText('Serviços');
 await expect(page.locator('#activeBuyerBadge')).toHaveText('Lucro Presumido');
 await expect(page.locator('#buyerExample .buyer-example-card')).toHaveCount(4);
 await expect(page.locator('#buyerExample .buyer-example-head')).toContainText('Comprador · Lucro Presumido');
 await expect(page.locator('#buyerExample .buyer-example-head')).toContainText('4 fornecedores');

 const sn=page.locator('[data-supplier="simples"]');
 const lp=page.locator('[data-supplier="presumido"]');
 const lr=page.locator('[data-supplier="real"]');
 const regular=page.locator('[data-supplier="simples_hybrid"]');
 await expect(sn).toContainText('Simples Nacional — padrão');
 await expect(lp).toContainText('Lucro Presumido');
 await expect(lr).toContainText('Lucro Real');
 await expect(regular).toContainText('Simples Nacional — IBS/CBS regular');

 // Paleta padrão: cabeçalho escuro da comparação.
 expect(await lp.locator('h4').evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(17, 17, 17)');

 // Serviços: fornecedor LP e LR têm bases/preços diferentes, mas o comprador é o mesmo.
 await expect(lp.locator('.buyer-total b').nth(0)).toHaveText('R$ 100,00');
 await expect(lp.locator('.buyer-total b').nth(1)).toHaveText('R$ 96,61');
 await expect(lr.locator('.buyer-total b').nth(0)).toHaveText('R$ 100,00');
 await expect(lr.locator('.buyer-total b').nth(1)).toHaveText('R$ 90,68');
 await expect(lp).toContainText('ISS remanescente');
 await expect(lr).toContainText('ISS remanescente');

 // Trocar o comprador recalcula os quatro fornecedores, sem trocar a estrutura.
 await page.locator('#priceBuyerRegime').selectOption('real');
 await expect(page.locator('#activeBuyerBadge')).toHaveText('Lucro Real');
 await expect(page.locator('#buyerExample .buyer-example-card')).toHaveCount(4);
 await expect(lp.locator('.buyer-total b').nth(0)).toHaveText('R$ 90,75');
 await expect(lr.locator('.buyer-total b').nth(0)).toHaveText('R$ 90,75');

 await page.locator('#priceBuyerRegime').selectOption('simples');
 await expect(page.locator('#activeBuyerBadge')).toHaveText('Simples Nacional');
 await expect(lp).toContainText('Sem crédito');
 await expect(lr).toContainText('Sem crédito');

 // Simples e Simples regular são dois fornecedores diferentes na reforma.
 await page.locator('#priceBuyerRegime').selectOption('presumido');
 const snFuture=brl(await sn.locator('.buyer-total b').nth(1).textContent());
 const regularFuture=brl(await regular.locator('.buyer-total b').nth(1).textContent());
 expect(snFuture).not.toBe(regularFuture);

 // Evolução anual: navegação compacta, painel do ano e matriz fornecedor x ano.
 await expect(page.locator('#yearlyPriceStrip .year-price-card')).toHaveCount(8);
 await expect(page.locator('#yearlyPriceStrip .year-nav-year').first()).toHaveText('2026');
 await expect(page.locator('#yearlyPriceStrip .year-nav-phase').first()).toHaveText('Atual');
 await expect(page.locator('#yearDetailPanel .year-detail-item')).toHaveCount(4);
 await expect(page.locator('#yearDetailPanel')).toContainText('comparação dos fornecedores');
 await expect(page.locator('#yearDetailPanel')).toContainText('Menor custo');
 await expect(page.locator('#yearlyProjectionTable tr')).toHaveCount(4);
 await expect(page.locator('#yearlyProjectionHead th')).toHaveCount(9);
 await expect(page.locator('#yearlyProjectionHead')).toContainText('Fornecedor');
 await expect(page.locator('#yearlyProjectionHead')).toContainText('2026');
 await expect(page.locator('#yearlyProjectionHead')).toContainText('2033');
 await expect(page.locator('#yearlyProjectionTable')).toContainText('Lucro Presumido');
 await expect(page.locator('#yearlyProjectionTable')).toContainText('Lucro Real');
 await expect(page.locator('#yearlyProjectionTable .cell-best').first()).toBeVisible();

 // Navegar por um ano troca o painel e destaca a coluna correspondente.
 await page.locator('#yearlyPriceStrip .year-price-card').filter({hasText:'2030'}).click();
 await expect(page.locator('#yearDetailPanel')).toContainText('2030 · comparação dos fornecedores');
 await expect(page.locator('#yearlyPriceStrip .year-price-card').filter({hasText:'2030'})).toHaveClass(/active/);
 await expect(page.locator('#yearlyProjectionHead .selected-column')).toHaveText('2030');

 // Segmentos continuam funcionando.
 await page.locator('#priceSegment').selectOption('comercio');
 await expect(page.locator('#icmsRateWrap')).toBeVisible();
 await expect(page.locator('#issRateWrap')).toBeHidden();
 await page.locator('#priceSegment').selectOption('industria');
 await expect(page.locator('#ipiRateWrap')).toBeVisible();
 await expect(page.locator('#snAnnex')).toHaveValue('II');
 await page.locator('#priceSegment').selectOption('misto');
 await page.locator('#priceOperationType').selectOption('servico');
 await expect(page.locator('#issRateWrap')).toBeVisible();

 // PDF da compra acompanha a estrutura atual: ano selecionado + matriz fornecedor x ano.
 await page.locator('#priceSegment').selectOption('servicos');
 await page.locator('#priceBuyerRegime').selectOption('presumido');
 await page.locator('#priceYear').selectOption('2030');
 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Relatório de custo da compra');
 await expect(page.locator('#printReport')).toContainText('comprador Lucro Presumido');
 await expect(page.locator('#printReport')).toContainText('ano selecionado 2030');
 await expect(page.locator('#printReport')).toContainText('Comparação do ano selecionado');
 await expect(page.locator('#printReport')).toContainText('Evolução do custo 2026–2033');
 await expect(page.locator('#printReport')).toContainText('Fornecedor × ano');
 await expect(page.locator('#printReport .price-pdf-selected .pdf-table tbody tr')).toHaveCount(4);
 await expect(page.locator('#printReport .price-pdf-evolution .pdf-table tbody tr')).toHaveCount(4);
 await expect(page.locator('#printReport .price-pdf-evolution .pdf-table thead th')).toHaveCount(9);
 await expect(page.locator('#printReport .price-pdf-evolution .pdf-table thead')).toContainText('2026');
 await expect(page.locator('#printReport .price-pdf-evolution .pdf-table thead')).toContainText('2033');
 await expect(page.locator('#printReport .price-pdf-selected')).toContainText('Simples Nacional — padrão');
 await expect(page.locator('#printReport .price-pdf-selected')).toContainText('Lucro Presumido');
 await expect(page.locator('#printReport .price-pdf-selected')).toContainText('Lucro Real');
 await expect(page.locator('#printReport .price-pdf-selected')).toContainText('Simples Nacional — IBS/CBS regular');

 const purchaseSheet=await page.evaluate(()=>{
  let out=null;
  downloadSpreadsheet=(...args)=>{out=args;};
  exportPriceExcel();
  return out;
 });
 expect(purchaseSheet[1]).toContain('Custo fornecedor Simples');
 expect(purchaseSheet[1]).toContain('Custo fornecedor LP');
 expect(purchaseSheet[1]).toContain('Custo fornecedor LR');
 expect(purchaseSheet[1]).toContain('Custo fornecedor Simples regular');
 expect(purchaseSheet[3].some(row=>row[0]==='Regime do comprador'&&row[1]==='Lucro Presumido')).toBe(true);
 expect(purchaseSheet[2]).toHaveLength(8);

 // Regressão: faturamento permanece intacto.
 await page.evaluate(()=>showTaxTool('revenue'));
 await expect(page.locator('#revenueToolPanel')).toHaveClass(/active/);
 await page.locator('#revCurrentRevenue').fill('100.000,50');
 await page.locator('#revCurrentRevenue').blur();
 await expect(page.locator('#revCurrentRevenue')).toHaveValue('100.000,50');
 await expect(page.locator('#revCurrentSummary')).toContainText('PIS');
 await expect(page.locator('#revCurrentSummary')).toContainText('Cofins');
 await expect(page.locator('#revCurrentSummary')).toContainText('ICMS');

 expect(errors).toEqual([]);
});

test('fornecedores do Simples compartilham parâmetros do segmento e faturamento híbrido permanece intacto',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=simple-suppliers',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#accountToggle')).toBeVisible();
 await page.evaluate(()=>go('tools'));

 await expect(page.locator('#simplesCurrentFields')).toBeVisible();
 await page.locator('#priceSegment').selectOption('comercio');
 await page.locator('#snRbt12').fill('1000000');
 await expect(page.locator('#snAnnex')).toHaveValue('I');
 await expect(page.locator('#snAnnex')).toBeDisabled();

 await page.locator('#priceSegment').selectOption('industria');
 await expect(page.locator('#snAnnex')).toHaveValue('II');
 await page.locator('#priceSegment').selectOption('servicos');
 await expect(page.locator('#snAnnex')).toHaveValue('III');
 await expect(page.locator('#snAnnex')).toBeEnabled();
 await page.locator('#snAnnex').selectOption('V');
 await expect(page.locator('[data-supplier="simples"]')).toHaveCount(1);
 await expect(page.locator('[data-supplier="simples_hybrid"]')).toHaveCount(1);

 // Regressão exata da ferramenta de faturamento híbrido.
 await page.evaluate(()=>showTaxTool('revenue'));
 await page.locator('#revTaxRegime').selectOption('simples_hybrid');
 await page.locator('#revCurrentRevenue').fill('1000000');
 await page.locator('#revSnRbt12').fill('1000000');
 await page.locator('#revSnAnnex').selectOption('III');
 await page.locator('#revYear').selectOption('2027');
 await expect(page.locator('#revenueMemory')).toContainText('937.481,29');
 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#revenuePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('CBS');
 await expect(page.locator('#printReport')).toContainText('86.342,03');
 await expect(page.locator('#printReport')).toContainText('IBS');
 await expect(page.locator('#printReport')).toContainText('937,48');
 await expect(page.locator('#printReport')).toContainText('DAS remanescente');
 await expect(page.locator('#printReport')).toContainText('101.327,38');
});

test('módulo novo abre no primeiro bloco e módulo iniciado volta ao ponto salvo',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=module-resume',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#siteShell')).toBeVisible();

 await page.locator('nav [data-go="modules"]').click();
 await page.locator('#moduleGrid .module-card').first().click();
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 01 DE 06');
 await expect(page.locator('#modulePage .course-block:visible')).toHaveCount(1);
 await expect(page.locator('#modulePage .course-block:visible .step-no')).toHaveText('01');

 await page.locator('#courseNext').click();
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 02 DE 06');
 await page.locator('#modulePage .back').click();
 await page.locator('#moduleGrid .module-card').first().click();
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 02 DE 06');
 await expect(page.locator('#modulePage .course-block:visible .step-no')).toHaveText('02');
});

test('recarregar preserva o módulo e a etapa em que o usuário estava',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=reload-module',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#siteShell')).toBeVisible();
 await page.locator('nav [data-go="modules"]').click();
 await page.locator('#moduleGrid .module-card').nth(4).click();
 await expect(page.locator('#modulePage')).toHaveClass(/active/);
 await page.locator('#courseNext').click();
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 02 DE 07');
 await page.waitForTimeout(800);

 await page.reload({waitUntil:'domcontentloaded'});
 await expect(page.locator('#modulePage')).toHaveClass(/active/);
 await expect(page.locator('#modulePage .page-title')).toContainText('Créditos de IBS/CBS');
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 02 DE 07');
});

test('recarregar preserva a ferramenta e a aba selecionada',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=reload-tool',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#siteShell')).toBeVisible();
 await page.evaluate(()=>openDiagnostic());
 await expect(page.locator('#tools')).toHaveClass(/active/);
 await expect(page.locator('#diagnosticToolPanel')).toHaveClass(/active/);

 await page.reload({waitUntil:'domcontentloaded'});
 await expect(page.locator('#tools')).toHaveClass(/active/);
 await expect(page.locator('#diagnosticToolPanel')).toHaveClass(/active/);
 await expect(page.locator('#diagnosticToolTab')).toHaveAttribute('aria-selected','true');
});

test('recarregar a página mantém a sessão e não exibe novamente o login',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=session-reload',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#siteShell')).toBeVisible();
 await expect(page.locator('#loginGate')).toBeHidden();
 await expect(page.locator('#authLoading')).toBeHidden();
 await expect(page.locator('#accountToggle')).toBeVisible();

 await page.reload({waitUntil:'domcontentloaded'});
 await expect(page.locator('#siteShell')).toBeVisible();
 await expect(page.locator('#loginGate')).toBeHidden();
 await expect(page.locator('#authLoading')).toBeHidden();
 await expect(page.locator('#accountToggle')).toBeVisible();
 await expect(page.locator('#accountName')).toHaveText('Teste');
});

test('painel pessoal abre sem substituir a navegação',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=account');
 await expect(page.locator('#accountToggle')).toBeVisible();
 await expect(page.locator('#loginGate')).toBeHidden();
 await expect(page.locator('nav [data-go="tools"]')).toBeVisible();
 await page.locator('#accountToggle').click();
 await expect(page.locator('#accountDrawer')).toBeVisible();
 await expect(page.locator('#accountEmail')).toHaveText('teste@jaguarcontabil.com.br');
 await expect(page.locator('#adminSection')).toBeHidden();
 await page.locator('#accountClose').click();
 await expect(page.locator('#accountDrawer')).toBeHidden();
});

test('perfil no celular fica no cabeçalho e informa progresso',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:4173/?e2e=mobile-profile');
 await expect(page.locator('#accountToggle')).toBeVisible();
 await expect(page.locator('#accountName')).toHaveText('Teste');
 await expect(page.locator('#accountProgress')).toHaveText('0%');
 const box=await page.locator('#accountToggle').boundingBox();
 expect(box.y).toBeLessThan(100);
 expect(box.x+box.width).toBeLessThanOrEqual(390);
 await page.locator('#accountToggle').click();
 await expect(page.locator('#accountDrawer')).toBeVisible();
 await expect(page.locator('#accountEmail')).toHaveText('teste@jaguarcontabil.com.br');
});

test('lateral compacta no celular e relatórios em tela própria',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.route('**/functions/v1/jaguarrt',async route=>{
  const body=route.request().postDataJSON();
  const account={email:'rodrigo.silva@jaguarcontabil.com.br',admin:true,state:{},attempts:[]};
  await route.fulfill({json:body.action==='admin'?{accounts:[{...account,online:true,last_seen:new Date().toISOString()},{email:'ana@jaguarcontabil.com.br',online:false,state:{study:{'01':{read:[0]}}},attempts:[{scope:'01',score:8,created_at:new Date().toISOString()}]}]}:account});
 });
 await page.goto('http://127.0.0.1:4173/?e2e=team-reports');
 await expect(page.locator('#accountToggle')).toBeVisible();
 await page.locator('#accountToggle').click();
 const drawer=await page.locator('#accountDrawer').boundingBox();
 expect(drawer.width).toBeLessThan(390);
 await expect(page.locator('#accountContent')).toContainText('Módulo 1');
 await expect(page.locator('#accountContent')).not.toContainText('No modelo de');
 await page.locator('#reportsOpen').click();
 await expect(page.locator('#accountDrawer')).toBeHidden();
 await expect(page.locator('#teamReports')).toBeVisible();
 await expect(page.locator('#reportsList .report-person')).toHaveCount(2);
 await page.locator('#reportsSearch').fill('ana');
 await expect(page.locator('#reportsList .report-person')).toHaveCount(1);
 await page.locator('#reportsList summary').click();
 await expect(page.locator('#reportsList')).toContainText('8/10');
 await page.locator('#reportsBack').click();
 await expect(page.locator('#home')).toBeVisible();
});

test('painel pessoal abre um módulo diretamente no celular',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:4173/?e2e=drawer');
 await page.locator('#accountToggle').click();
 const box=await page.locator('#accountDrawer').boundingBox();
 expect(box.width).toBeLessThan(390);
 await expect(page.locator('#accountDrawer [data-module]')).toHaveCount(16);
 await page.locator('#accountDrawer [data-module="06"]').click();
 await expect(page.locator('#accountDrawer')).toBeHidden();
 await expect(page.locator('#modulePage .page-title')).toContainText('Saldo Credor');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('progresso sem conexão sobrevive ao recarregamento e volta ao servidor',async({page})=>{
 await page.unroute('**/functions/v1/jaguarrt');
 let state={study:{__orderVersion:2}},offline=false;
 await page.route('**/functions/v1/jaguarrt',async route=>{
  const b=route.request().postDataJSON();
  if(offline&&b.action==='save'){await route.abort('failed');return;}
  if(b.action==='save')state=b.data;
  await route.fulfill({json:{email:'teste@jaguarcontabil.com.br',admin:false,state,attempts:[]}});
 });
 await page.goto('http://127.0.0.1:4173/?e2e=offline');
 await expect(page.locator('#accountToggle')).toBeVisible();
 offline=true;
 await page.evaluate(()=>openModule('01'));
 await page.locator('#courseNext').click();
 await expect(page.locator('#accountStatus')).toContainText('aguardando sincronização');
 await page.reload();
 await expect(page.locator('#courseProgressLabel')).toContainText('1 de 7');
 await expect(page.locator('#accountStatus')).toContainText('aguardando sincronização');
 // Another device advanced module 2 while this browser was disconnected.
 state.study['02']={read:[0],step:1};
 offline=false;
 await page.reload();
 await expect(page.locator('#courseProgressLabel')).toContainText('1 de 7');
 await expect.poll(()=>state.study?.['01']?.read).toEqual([0]);
 expect(state.study['02'].read).toEqual([0]);
 await expect.poll(()=>page.evaluate(()=>localStorage.getItem('jaguarrt-unsynced:teste@jaguarcontabil.com.br'))).toBeNull();
});

test('um envio lento não apaga alterações feitas durante a sincronização',async({page})=>{
 await page.unroute('**/functions/v1/jaguarrt');
 let state={study:{__orderVersion:2}},release,waiting=false;
 await page.route('**/functions/v1/jaguarrt',async route=>{
  const b=route.request().postDataJSON();
  if(b.action==='save'){
   if(!waiting){waiting=true;await new Promise(resolve=>{release=resolve;});}
   state=b.data;
  }
  await route.fulfill({json:{email:'teste@jaguarcontabil.com.br',admin:false,state,attempts:[]}});
 });
 await page.goto('http://127.0.0.1:4173/?e2e=slow-save');
 await expect(page.locator('#accountToggle')).toBeVisible();
 await page.evaluate(()=>openModule('01'));
 await page.locator('#courseNext').click();
 await expect.poll(()=>waiting).toBeTruthy();
 await page.locator('#courseNext').click();
 release();
 await expect.poll(()=>state.study?.['01']?.read).toEqual([0,1]);
 await expect(page.locator('#courseProgressLabel')).toContainText('2 de 7');
});

test('relatórios filtram desempenho e módulo; Excel inclui só o resultado filtrado',async({page})=>{
 await page.unroute('**/functions/v1/jaguarrt');
 const accounts=[
  {email:'ana@jaguarcontabil.com.br',state:{study:{__orderVersion:2,'01':{read:[0,1,2,3,4,5,6]}}},attempts:[{score:5,scope:'01',created_at:'2026-09-30T12:00:00Z'}]},
  {email:'bia@jaguarcontabil.com.br',state:{study:{__orderVersion:2}},attempts:[{score:9,scope:'02',created_at:'2026-09-30T12:00:00Z'}]},
  {email:'caio@jaguarcontabil.com.br',state:{study:{__orderVersion:2}},attempts:[]}
 ];
 await page.route('**/functions/v1/jaguarrt',route=>route.fulfill({json:route.request().postDataJSON().action==='admin'?{accounts}:{email:'rodrigo.silva@jaguarcontabil.com.br',admin:true,state:{study:{__orderVersion:2}},attempts:[]}}));
 await page.goto('http://127.0.0.1:4173/?e2e=reports');
 await page.locator('#accountToggle').click();
 await page.locator('#reportsOpen').click();
 await expect(page.locator('.report-person')).toHaveCount(3);
 await page.locator('#reportsPerformance').selectOption('help');
 await expect(page.locator('.report-person')).toHaveCount(1);
 await expect(page.locator('.report-person')).toContainText('Ana');
 await page.locator('#reportsModule').selectOption('01');
 await expect(page.locator('.report-person')).toHaveCount(1);
 await page.waitForFunction(()=>!!window.XLSX);
 const download=page.waitForEvent('download');
 await page.locator('#reportsExport').click();
 const file=await download;
 const base64=require('node:fs').readFileSync(await file.path()).toString('base64');
 const book=await page.evaluate(base64=>{const b=XLSX.read(base64,{type:'base64'});return {names:b.SheetNames,rows:XLSX.utils.sheet_to_json(b.Sheets.Colaboradores),modules:XLSX.utils.sheet_to_json(b.Sheets['Módulos'])};},base64);
 expect(book.names).toEqual(['Colaboradores','Módulos','Testes']);
 const rows=book.rows;
 expect(rows).toHaveLength(1);expect(rows[0]['E-mail']).toBe('ana@jaguarcontabil.com.br');
 expect(book.modules).toHaveLength(16);
 await page.locator('#reportsPerformance').selectOption('untested');
 await expect(page.locator('.report-person')).toHaveCount(0);
 await expect(page.locator('#reportsExport')).toBeDisabled();
});

test('um colaborador não recebe atalho administrativo',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=admin-access');
 await page.locator('#accountToggle').click();
 await expect(page.locator('#adminSection')).toBeHidden();
});

test('recarregar mostra a última aula antes da validação da sessão, sem tela loading',async({page})=>{
 await page.unroute('**/functions/v1/jaguarrt');
 let state={study:{__orderVersion:2}},hold=false,release;
 await page.route('**/functions/v1/jaguarrt',async route=>{
  const b=route.request().postDataJSON();
  if(b.action==='save')state=b.data;
  if(b.action==='state'&&hold)await new Promise(resolve=>{release=resolve;});
  await route.fulfill({json:{email:'teste@jaguarcontabil.com.br',admin:false,state,attempts:[]}});
 });
 await page.goto('http://127.0.0.1:4173/?e2e=no-loading');
 await expect(page.locator('#accountToggle')).toBeVisible();
 await page.evaluate(()=>openModule('01'));
 await page.locator('#courseNext').click();
 await expect(page.locator('#accountStatus')).toContainText('Progresso salvo');
 hold=true;
 await page.reload({waitUntil:'domcontentloaded'});
 await expect(page.locator('#siteShell')).toBeVisible();
 await expect(page.locator('#loginGate')).toBeHidden();
 await expect(page.locator('#authLoading')).toHaveCount(0);
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 02 DE 06');
 await expect(page.locator('#accountName')).toHaveText('Teste');
 expect(await page.locator('#siteShell').evaluate(el=>el.inert)).toBe(true);
 await expect.poll(()=>typeof release).toBe('function');release();
 await expect.poll(()=>page.locator('#siteShell').evaluate(el=>el.inert)).toBe(false);
 await expect(page.locator('#courseStageLabel')).toHaveText('ETAPA 02 DE 06');
});

test('sessão expirada volta ao login após a validação, sem expor relatórios',async({page})=>{
 await page.unroute('**/functions/v1/jaguarrt');
 let expired=false;
 await page.route('**/functions/v1/jaguarrt',route=>route.fulfill(expired?{status:401,json:{error:'Sessão expirada. Entre novamente.'}}:{json:{email:'teste@jaguarcontabil.com.br',admin:false,state:{study:{__orderVersion:2}},attempts:[]}}));
 await page.goto('http://127.0.0.1:4173/?e2e=expired-session');
 await expect(page.locator('#accountToggle')).toBeVisible();
 expired=true;
 await page.reload();
 await expect(page.locator('#loginGate')).toBeVisible();
 await expect(page.locator('#siteShell')).toBeHidden();
 await expect(page.locator('#accountToggle')).toBeHidden();
 await expect(page.locator('#loginError')).toContainText('Sessão expirada');
});

test('sem sessão salva abre diretamente o login, sem mostrar o conteúdo',async({page})=>{
 await page.addInitScript(()=>{localStorage.removeItem('jaguarrt-session');sessionStorage.removeItem('jaguarrt-session');});
 await page.goto('http://127.0.0.1:4173/?e2e=login-direct');
 await expect(page.locator('#loginGate')).toBeVisible();
 await expect(page.locator('#siteShell')).toBeHidden();
 await expect(page.locator('#authLoading')).toHaveCount(0);
 await expect(page.locator('#loginEmail')).toBeFocused();
});

test('celular mantém o login ao recarregar sem conexão e sincroniza o estudo ao voltar',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.unroute('**/functions/v1/jaguarrt');
 let state={study:{__orderVersion:2}},offline=false;
 await page.route('**/functions/v1/jaguarrt',async route=>{
  const b=route.request().postDataJSON();
  if(offline){await route.abort('failed');return;}
  if(b.action==='save')state=b.data;
  await route.fulfill({json:{email:'teste@jaguarcontabil.com.br',admin:false,state,attempts:[]}});
 });
 await page.goto('http://127.0.0.1:4173/?e2e=mobile-disconnection');
 await expect(page.locator('#accountToggle')).toBeVisible();
 await page.evaluate(()=>openModule('01'));
 await page.locator('#courseNext').click();
 await expect(page.locator('#accountStatus')).toContainText('Progresso salvo');
 offline=true;
 await page.reload();
 await expect(page.locator('#sessionNotice')).toBeVisible();
 await expect(page.locator('#loginGate')).toBeHidden();
 await expect(page.locator('#siteShell')).toBeVisible();
 expect(await page.evaluate(()=>localStorage.getItem('jaguarrt-session'))).toBe('a'.repeat(64));
 await page.locator('#courseNext').click();
 await expect(page.locator('#courseProgressLabel')).toContainText('2 de 7');
 offline=false;
 await page.evaluate(()=>window.dispatchEvent(new Event('online')));
 await expect(page.locator('#sessionNotice')).toBeHidden();
 await expect.poll(()=>state.study?.['01']?.read).toEqual([0,1]);
 await page.reload();
 await expect(page.locator('#courseProgressLabel')).toContainText('2 de 7');
 await expect(page.locator('#loginGate')).toBeHidden();
});

test('falha temporária do servidor no celular tenta novamente sem apagar a sessão',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.unroute('**/functions/v1/jaguarrt');
 let failNext=false,retries=0;
 await page.route('**/functions/v1/jaguarrt',async route=>{
  if(failNext){failNext=false;retries++;await route.fulfill({status:503,json:{error:'Servidor indisponível'}});return;}
  await route.fulfill({json:{email:'teste@jaguarcontabil.com.br',admin:false,state:{study:{__orderVersion:2}},attempts:[]}});
 });
 await page.goto('http://127.0.0.1:4173/?e2e=mobile-server-retry');
 await expect(page.locator('#accountToggle')).toBeVisible();
 failNext=true;
 await page.reload();
 await expect(page.locator('#sessionNotice')).toBeVisible();
 await expect(page.locator('#loginGate')).toBeHidden();
 expect(await page.evaluate(()=>localStorage.getItem('jaguarrt-session'))).toBe('a'.repeat(64));
 await expect(page.locator('#sessionNotice')).toBeHidden();
 expect(retries).toBe(1);
 await expect.poll(()=>page.locator('#siteShell').evaluate(el=>el.inert)).toBe(false);
 await expect(page.locator('#loginGate')).toBeHidden();
});

test('resposta inválida de rede mantém a sessão e reconecta ao voltar para o celular',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.unroute('**/functions/v1/jaguarrt');
 let badResponse=false;
 await page.route('**/functions/v1/jaguarrt',async route=>{
  if(badResponse){await route.fulfill({status:502,contentType:'text/html',body:'Bad gateway'});return;}
  await route.fulfill({json:{email:'teste@jaguarcontabil.com.br',admin:false,state:{study:{__orderVersion:2}},attempts:[]}});
 });
 await page.goto('http://127.0.0.1:4173/?e2e=mobile-bad-gateway');
 await expect(page.locator('#accountToggle')).toBeVisible();
 badResponse=true;await page.reload();
 await expect(page.locator('#sessionNotice')).toBeVisible();
 await expect(page.locator('#loginGate')).toBeHidden();
 badResponse=false;
 await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
 await expect(page.locator('#sessionNotice')).toBeHidden();
 await expect(page.locator('#accountName')).toHaveText('Teste');
});

