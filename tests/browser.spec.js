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
 await expect(page.locator('#moduleGrid .module-card')).toHaveCount(13);
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
