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

test('custo efetivo segue a matriz por regime do comprador',async({page})=>{
 const errors=[];
 page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
 page.on('pageerror',err=>errors.push(err.message));

 await page.goto('http://127.0.0.1:4173/?e2e=purchase-matrix',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await expect(page.locator('#priceToolPanel')).toHaveClass(/active/);
 await expect(page.locator('#priceToolTab')).toContainText('Compra / custo efetivo');

 await page.locator('#priceNow').fill('100,00');
 await page.locator('#priceTransition').fill('104,15');
 await page.locator('#priceReformCredit').fill('7,05');
 await page.locator('#priceCurrentRealCreditPct').fill('9.25');
 await page.locator('#priceYear').selectOption('2027');

 // Simples: sem crédito hoje e na transição.
 await page.locator('#purchaseBuyerRegime').selectOption('simples');
 await expect(page.locator('#activeBuyerRegimeBadge')).toHaveText('Simples Nacional');
 await expect(page.locator('#buyerExample .buyer-example-card')).toHaveCount(1);
 await expect(page.locator('#buyerExample')).toContainText('Custo efetivo hoje');
 await expect(page.locator('#buyerExample')).toContainText('R$ 100,00');
 await expect(page.locator('#buyerExample')).toContainText('R$ 104,15');
 await expect(page.locator('#resultSignal')).toContainText('+4,15%');

 // Presumido: crédito atual zero e crédito novo de R$ 7,05.
 await page.locator('#purchaseBuyerRegime').selectOption('presumido');
 await expect(page.locator('#activeBuyerRegimeBadge')).toHaveText('Lucro Presumido');
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 104,15 − R$ 7,05 = R$ 97,10');
 await expect(page.locator('#resultSignal')).toContainText('-2,90%');

 // Real: crédito atual de 9,25% e crédito novo de R$ 7,05.
 await page.locator('#purchaseBuyerRegime').selectOption('real');
 await expect(page.locator('#activeBuyerRegimeBadge')).toHaveText('Lucro Real');
 await expect(page.locator('#priceEquationMemory')).toContainText('9,25% = R$ 9,25');
 await expect(page.locator('#buyerExample')).toContainText('R$ 90,75');
 await expect(page.locator('#buyerExample')).toContainText('R$ 97,10');
 await expect(page.locator('#resultSignal')).toContainText('+7,00%');

 // Híbrido permanece como extensão do projeto.
 await page.locator('#purchaseBuyerRegime').selectOption('simples_hybrid');
 await expect(page.locator('#buyerExample')).toContainText('extensão do projeto');
 await expect(page.locator('#buyerExample')).toContainText('R$ 97,10');

 // PDF segue somente o regime selecionado.
 await page.locator('#purchaseBuyerRegime').selectOption('real');
 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Relatório de custo efetivo da compra');
 await expect(page.locator('#printReport')).toContainText('Lucro Real');
 await expect(page.locator('#printReport')).toContainText('R$ 90,75');
 await expect(page.locator('#printReport')).toContainText('R$ 97,10');
 await expect(page.locator('#printReport')).not.toContainText('Cliente Simples Nacional');

 // Excel também segue o regime selecionado.
 const purchaseSheet=await page.evaluate(()=>{
  let out=null;
  downloadSpreadsheet=(...args)=>{out=args;};
  exportPriceExcel();
  return out;
 });
 expect(purchaseSheet[1]).toEqual(['Período','Regime do comprador','Preço da nota','Crédito fiscal','Custo efetivo','Variação %']);
 expect(purchaseSheet[2]).toHaveLength(2);
 expect(purchaseSheet[2][0][4]).toBeCloseTo(90.75,2);
 expect(purchaseSheet[2][1][4]).toBeCloseTo(97.10,2);

 // Comparação por fornecedor continua separada e opcional.
 await page.locator('#supplierAdditionalOptions summary').click();
 await page.locator('#taxRegime').selectOption('presumido');
 await page.locator('#snRbt12').fill('1000000');
 await page.locator('#snAnnex').selectOption('I');
 await expect(page.locator('#supplierComparisonGrid .supplier-card')).toHaveCount(4);

 // Regressão: faturamento continua intacto.
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

test('fornecedor do Simples usa RBT12 e faturamento híbrido permanece intacto',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=simple-supplier',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await page.locator('#priceToolPanel .additional-options summary').click();
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
