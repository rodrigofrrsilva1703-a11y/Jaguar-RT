const {test,expect}=require('@playwright/test');

const brl=text=>{
 const raw=String(text||'').replace(/[^0-9,.-]/g,'').replace(/\./g,'').replace(',','.');
 return Number(raw)||0;
};

test('teste por módulo corrige, refaz e troca perguntas; teste geral mistura módulos',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=quiz',{waitUntil:'domcontentloaded'});
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

 // Paleta do sistema: cabeçalhos pretos, sem roxo.
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

 // Evolução anual agora também usa fornecedor nas colunas.
 await expect(page.locator('#yearlyProjectionTable tr')).toHaveCount(8);
 await expect(page.locator('.price-year-table thead')).toContainText('Ano / fase');
 await expect(page.locator('.price-year-table thead')).toContainText('Simples');
 await expect(page.locator('.price-year-table thead')).toContainText('Lucro Presumido');
 await expect(page.locator('.price-year-table thead')).toContainText('Lucro Real');
 await expect(page.locator('.price-year-table thead')).toContainText('Simples IBS/CBS');
 await expect(page.locator('#yearlyPriceStrip .year-price-card')).toHaveCount(8);
 await expect(page.locator('#yearlyPriceStrip .year-card-highlight').first()).toContainText('Menor custo efetivo');
 await expect(page.locator('#yearlyPriceStrip .year-card-spread').first()).toContainText('Diferença entre fornecedores');
 await expect(page.locator('#yearlyPriceStrip .year-supplier-row').first()).toBeVisible();
 await expect(page.locator('#yearlyProjectionTable .best-pill').first()).toHaveText('menor');

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

 // PDF e Excel seguem comprador x fornecedores.
 await page.locator('#priceSegment').selectOption('servicos');
 await page.locator('#priceBuyerRegime').selectOption('presumido');
 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Comprador × fornecedores · custo efetivo');
 await expect(page.locator('#printReport')).toContainText('comprador Lucro Presumido');
 await expect(page.locator('#printReport')).toContainText('Fornecedor · Simples Nacional — padrão');
 await expect(page.locator('#printReport')).toContainText('Fornecedor · Simples Nacional — IBS/CBS regular');

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
 await expect(page.locator('#printReport')).toContainText('DAS / tributos remanescentes');
 await expect(page.locator('#printReport')).toContainText('101.327,38');
});
