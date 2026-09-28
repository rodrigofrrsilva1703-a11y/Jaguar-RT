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

test('compara a empresa com fornecedores LP, LR, Simples e híbrido',async({page})=>{
 const errors=[];
 page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
 page.on('pageerror',err=>errors.push(err.message));

 await page.goto('http://127.0.0.1:4173/?e2e=suppliers',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await expect(page.locator('#priceToolPanel')).toHaveClass(/active/);
 await expect(page.locator('#priceToolTab')).toContainText('Compra / fornecedores');

 await page.locator('#priceNow').fill('1.234,56');
 await page.locator('#priceNow').blur();
 await expect(page.locator('#priceNow')).toHaveValue('1.234,56');
 await page.locator('#taxRegime').selectOption('presumido');
 await page.locator('#snRbt12').fill('1000000');
 await page.locator('#snAnnex').selectOption('I');
 await page.locator('#priceYear').selectOption('2027');

 await page.locator('#priceNow').fill('100,00');
 await expect(page.locator('#priceEquationMemory')).toContainText('Equação do evento');
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 104,44');
 await expect(page.locator('#buyerExample .buyer-example-card')).toHaveCount(4);
 await expect(page.locator('[data-buyer="presumido"]')).toContainText('R$ 94,72');
 await expect(page.locator('[data-buyer="presumido"]')).toContainText('CBS 9,21%');
 await expect(page.locator('[data-buyer="presumido"]')).toContainText('R$ 9,62');
 await expect(page.locator('[data-buyer="presumido"]')).toContainText('IBS 0,10%');
 await expect(page.locator('[data-buyer="presumido"]')).toContainText('R$ 0,10');
 await page.locator('#buyerPurchaseCredit').uncheck();
 await expect(page.locator('[data-buyer="presumido"] div').filter({hasText:'Crédito aproveitado'}).locator('b')).toHaveText('R$ 0,00');
 await page.locator('#buyerPurchaseCredit').check();
 await expect(page.locator('[data-buyer="real"]')).toContainText('R$ 90,75');
 await expect(page.locator('[data-buyer="simples"]')).toContainText('+4,4444%');
 await page.locator('#priceNow').fill('1.234,56');

 await expect(page.locator('#supplierComparisonGrid .supplier-card')).toHaveCount(4);
 const lp=page.locator('[data-supplier="presumido"]');
 const lr=page.locator('[data-supplier="real"]');
 const sn=page.locator('[data-supplier="simples"]');
 const hybrid=page.locator('[data-supplier="simples_hybrid"]');
 await expect(lp).toContainText('Lucro Presumido');
 await expect(lr).toContainText('Lucro Real');
 await expect(sn).toContainText('Simples Nacional');
 await expect(hybrid).toContainText('Simples Nacional híbrido');

 await expect(page.locator('#priceTakesCbsIbsCredit')).toBeChecked();
 await expect(page.locator('#priceTakesCbsIbsCredit')).toBeEnabled();
 const lpCredit=await supplierValue(lp,'Crédito para sua empresa');
 const lrCredit=await supplierValue(lr,'Crédito para sua empresa');
 const snCredit=await supplierValue(sn,'Crédito para sua empresa');
 const hybridCredit=await supplierValue(hybrid,'Crédito para sua empresa');
 expect(lpCredit).toBeGreaterThan(0);
 expect(lrCredit).toBeGreaterThan(0);
 expect(snCredit).toBeGreaterThan(0);
 expect(hybridCredit).toBeGreaterThan(0);

 const lpCost=brl(await lp.locator('.supplier-cost b').textContent());
 const lpPrice=await supplierValue(lp,'Preço da compra');
 expect(lpPrice).toBeGreaterThan(1234.56);
 expect(await supplierValue(lr,'Preço da compra')).not.toBe(lpPrice);
 expect(await supplierValue(sn,'Preço da compra')).not.toBe(lpPrice);
 expect(lpCost).toBeLessThan(lpPrice);

 await page.locator('#taxRegime').selectOption('simples');
 await expect(page.locator('#priceTakesCbsIbsCredit')).toBeDisabled();
 await expect(page.locator('#priceTakesCbsIbsCredit')).not.toBeChecked();
 await expect(page.locator('#regimeResultNote')).toContainText('não se apropria de créditos');

 expect(await supplierValue(lp,'Crédito para sua empresa')).toBe(0);
 expect(await supplierValue(lr,'Crédito para sua empresa')).toBe(0);
 expect(await supplierValue(sn,'Crédito para sua empresa')).toBe(0);
 expect(await supplierValue(hybrid,'Crédito para sua empresa')).toBe(0);
 const lpCostSimpleBuyer=brl(await lp.locator('.supplier-cost b').textContent());
 const lpPriceSimpleBuyer=await supplierValue(lp,'Preço da compra');
 expect(Math.abs(lpCostSimpleBuyer-lpPriceSimpleBuyer)).toBeLessThanOrEqual(0.02);

 await page.locator('#taxRegime').selectOption('real');
 await expect(page.locator('#priceTakesCbsIbsCredit')).toBeEnabled();
 await expect(page.locator('#priceTakesCbsIbsCredit')).toBeChecked();
 expect(await supplierValue(lp,'Crédito para sua empresa')).toBeGreaterThan(0);
 await expect(page.locator('#yearlyProjectionTable tr')).toHaveCount(8);

 await page.locator('#snRbt12').fill('4800001');
 await expect(page.locator('#priceValidation')).toContainText('R$ 4,8 milhões');
 await expect(page.locator('#supplierComparisonGrid .supplier-card')).toHaveCount(0);
 await page.locator('#snRbt12').fill('1000000');
 await expect(page.locator('#supplierComparisonGrid .supplier-card')).toHaveCount(4);

 await page.locator('#taxRegime').selectOption('simples_hybrid');
 await expect(page.locator('#priceTakesCbsIbsCredit')).toBeEnabled();
 await expect(page.locator('#priceTakesCbsIbsCredit')).toBeChecked();
 await expect(page.locator('#regimeResultNote')).toContainText('podem gerar crédito');

 expect(await supplierValue(hybrid,'Crédito para sua empresa')).toBeGreaterThan(0);
 await page.locator('#taxRegime').selectOption('real');

 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Custo efetivo por regime do comprador');
 await expect(page.locator('#printReport')).toContainText('Cliente Lucro Presumido');
 await expect(page.locator('#printReport')).toContainText('Cliente Lucro Real');
 await expect(page.locator('#printReport')).toContainText('Cliente Simples Nacional');
 await expect(page.locator('#printReport')).toContainText('Cliente Simples híbrido');
 await expect(page.locator('#printReport')).toContainText('CBS sobre preço novo');
 await expect(page.locator('#printReport')).toContainText('IBS sobre preço novo');

 const purchaseSheet=await page.evaluate(()=>{
  let out=null;
  downloadSpreadsheet=(...args)=>{out=args;};
  exportPriceExcel();
  return out;
 });
 expect(purchaseSheet[1]).toContain('Custo fornecedor LP');
 expect(purchaseSheet[1]).toContain('Custo fornecedor LR');
 expect(purchaseSheet[1]).toContain('Custo fornecedor Simples');
 expect(purchaseSheet[1]).toContain('Custo fornecedor Simples híbrido');
 expect(purchaseSheet[2]).toHaveLength(8);

 // Regressão: a ferramenta de faturamento continua funcionando como antes.
 await page.evaluate(()=>showTaxTool('revenue'));
 await expect(page.locator('#revenueToolPanel')).toHaveClass(/active/);
 await page.locator('#revCurrentRevenue').fill('100.000,50');
 await page.locator('#revCurrentRevenue').blur();
 await expect(page.locator('#revCurrentRevenue')).toHaveValue('100.000,50');
 await expect(page.locator('#revCurrentSummary')).toContainText('PIS');
 await expect(page.locator('#revCurrentSummary')).toContainText('Cofins');
 await expect(page.locator('#revCurrentSummary')).toContainText('ICMS');
 await expect(page.locator('#revCurrentSummary')).not.toContainText('Total de tributos');
 await expect(page.locator('#revCurrentSummary')).toContainText('−');

 expect(errors).toEqual([]);
});

test('fornecedor do Simples usa RBT12 e faturamento híbrido permanece intacto',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=simple-supplier',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await page.locator('#taxRegime').selectOption('presumido');
 await page.locator('#priceNow').fill('1000000');
 await page.locator('#snRbt12').fill('1000000');
 await page.locator('#snAnnex').selectOption('III');
 await page.locator('#priceYear').selectOption('2027');

 const sn=page.locator('[data-supplier="simples"]');
 await expect(sn).toContainText('Anexo III');
 expect(await supplierValue(sn,'Crédito para sua empresa')).toBeGreaterThan(0);
 const snCost=brl(await sn.locator('.supplier-cost b').textContent());
 const snPrice=await supplierValue(sn,'Preço da compra');
 expect(snCost).toBeLessThan(snPrice);

 const hybrid=page.locator('[data-supplier="simples_hybrid"]');
 await expect(hybrid).toContainText('híbrido');
 expect(await supplierValue(hybrid,'Crédito para sua empresa')).toBeGreaterThan(0);
 expect(await supplierValue(hybrid,'Tributos remanescentes')).toBeGreaterThan(0);

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
 await expect(page.locator('#printReport')).not.toContainText('Base do DAS residual');
});
