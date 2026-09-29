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

test('compra por segmentos adapta comércio serviços indústria e misto',async({page})=>{
 const errors=[];
 page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
 page.on('pageerror',err=>errors.push(err.message));

 await page.goto('http://127.0.0.1:4173/?e2e=segments',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await expect(page.locator('#priceToolPanel')).toHaveClass(/active/);
 await expect(page.locator('#priceToolTab')).toContainText('Compra / segmentos');

 // Comércio: preserva a lógica aprovada anteriormente.
 await page.locator('#priceSegment').selectOption('comercio');
 await page.locator('#priceNow').fill('100,00');
 await page.locator('#exampleSupplier').selectOption('real');
 await page.locator('#icmsRate').fill('18');
 await page.locator('#priceYear').selectOption('2027');
 await expect(page.locator('#activeSegmentBadge')).toHaveText('Comércio');
 await expect(page.locator('#icmsRateWrap')).toBeVisible();
 await expect(page.locator('#issRateWrap')).toBeHidden();
 await expect(page.locator('#ipiRateWrap')).toBeHidden();
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 72,75');
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 96,98');
 await expect(page.locator('#buyerExample .buyer-example-card')).toHaveCount(4);

 const simple=page.locator('[data-buyer="simples"]');
 const presumido=page.locator('[data-buyer="presumido"]');
 const real=page.locator('[data-buyer="real"]');
 const regular=page.locator('[data-buyer="simples_hybrid"]');
 await expect(simple.locator('.buyer-total b').nth(0)).toHaveText('R$ 100,00');
 await expect(simple.locator('.buyer-total b').nth(1)).toHaveText('R$ 96,98');
 await expect(presumido.locator('.buyer-total b').nth(0)).toHaveText('R$ 82,00');
 await expect(presumido.locator('.buyer-total b').nth(1)).toHaveText('R$ 72,75');
 await expect(real.locator('.buyer-total b').nth(0)).toHaveText('R$ 72,75');
 await expect(real.locator('.buyer-total b').nth(1)).toHaveText('R$ 72,75');
 await expect(regular.locator('.buyer-total b').nth(1)).toHaveText('R$ 90,21');

 // Serviços: troca ICMS por ISS e permite anexos de serviço no Simples.
 await page.locator('#priceSegment').selectOption('servicos');
 await expect(page.locator('#activeSegmentBadge')).toHaveText('Serviços');
 await expect(page.locator('#icmsRateWrap')).toBeHidden();
 await expect(page.locator('#issRateWrap')).toBeVisible();
 await expect(page.locator('#ipiRateWrap')).toBeHidden();
 await page.locator('#issRate').fill('5');
 await page.locator('#exampleSupplier').selectOption('real');
 await expect(page.locator('#priceEquationMemory')).toContainText('ISS');
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 85,75');
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 98,67');
 await expect(presumido.locator('.buyer-total b').nth(0)).toHaveText('R$ 100,00');
 await expect(real.locator('.buyer-total b').nth(0)).toHaveText('R$ 90,75');
 await expect(page.locator('#snAnnex')).toBeEnabled();
 await expect(page.locator('#snAnnex')).toHaveValue('III');

 // Indústria: usa ICMS e permite IPI atual opcional; Simples aponta Anexo II.
 await page.locator('#priceSegment').selectOption('industria');
 await expect(page.locator('#activeSegmentBadge')).toHaveText('Indústria');
 await expect(page.locator('#icmsRateWrap')).toBeVisible();
 await expect(page.locator('#issRateWrap')).toBeHidden();
 await expect(page.locator('#ipiRateWrap')).toBeVisible();
 await page.locator('#ipiRate').fill('10');
 await page.locator('#exampleSupplier').selectOption('real');
 await expect(page.locator('#snAnnex')).toHaveValue('II');
 await expect(page.locator('#snAnnex')).toBeDisabled();
 await expect(page.locator('#priceEquationMemory')).toContainText('IPI');
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 62,75');

 // Misto: o usuário escolhe a natureza da operação.
 await page.locator('#priceSegment').selectOption('misto');
 await expect(page.locator('#priceOperationTypeWrap')).toBeVisible();
 await page.locator('#priceOperationType').selectOption('servico');
 await expect(page.locator('#activeSegmentBadge')).toContainText('Misto');
 await expect(page.locator('#activeSegmentBadge')).toContainText('Serviço');
 await expect(page.locator('#issRateWrap')).toBeVisible();
 await expect(page.locator('#icmsRateWrap')).toBeHidden();
 await page.locator('#priceOperationType').selectOption('mercadoria');
 await expect(page.locator('#icmsRateWrap')).toBeVisible();
 await expect(page.locator('#snAnnex')).toHaveValue('I');

 // Comparação entre fornecedores e evolução anual continuam disponíveis.
 await page.locator('#priceSegment').selectOption('comercio');
 await page.locator('#exampleSupplier').selectOption('real');
 await expect(page.locator('#supplierComparisonGrid .supplier-card')).toHaveCount(3);
 await expect(page.locator('#yearlyProjectionTable tr')).toHaveCount(8);

 // PDF e Excel carregam o segmento.
 await page.locator('#priceSegment').selectOption('servicos');
 await page.locator('#exampleSupplier').selectOption('real');
 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Compra por segmento · custo efetivo');
 await expect(page.locator('#printReport')).toContainText('Serviços');

 const purchaseSheet=await page.evaluate(()=>{
  let out=null;
  downloadSpreadsheet=(...args)=>{out=args;};
  exportPriceExcel();
  return out;
 });
 expect(purchaseSheet[3].some(row=>row[0]==='Segmento'&&String(row[1]).includes('Serviços'))).toBe(true);
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
 await expect(page.locator('#revCurrentSummary')).toContainText('−');

 expect(errors).toEqual([]);
});

test('fornecedor do Simples adapta anexo ao segmento e faturamento híbrido permanece intacto',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=simple-segment',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await page.locator('#priceSegment').selectOption('comercio');
 await page.locator('#exampleSupplier').selectOption('simples');
 await page.locator('#priceNow').fill('1000000');
 await page.locator('#snRbt12').fill('1000000');
 await page.locator('#priceYear').selectOption('2027');
 await expect(page.locator('#simplesCurrentFields')).toBeVisible();
 await expect(page.locator('#snAnnex')).toHaveValue('I');
 await expect(page.locator('#snAnnex')).toBeDisabled();
 await expect(page.locator('#priceEquationMemory')).toContainText('DAS estimado');

 await page.locator('#priceSegment').selectOption('industria');
 await expect(page.locator('#snAnnex')).toHaveValue('II');
 await page.locator('#priceSegment').selectOption('servicos');
 await expect(page.locator('#snAnnex')).toHaveValue('III');
 await expect(page.locator('#snAnnex')).toBeEnabled();
 await page.locator('#snAnnex').selectOption('V');
 await expect(page.locator('#snAnnex')).toHaveValue('V');

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
