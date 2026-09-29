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

test('compra comercial aplica créditos atuais e transição por regime do comprador',async({page})=>{
 const errors=[];
 page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
 page.on('pageerror',err=>errors.push(err.message));

 await page.goto('http://127.0.0.1:4173/?e2e=commercial-purchase',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await expect(page.locator('#priceToolPanel')).toHaveClass(/active/);
 await expect(page.locator('#priceToolTab')).toContainText('Compra comercial');

 await page.locator('#priceNow').fill('100,00');
 await page.locator('#exampleSupplier').selectOption('real');
 await page.locator('#icmsRate').fill('18');
 await page.locator('#priceYear').selectOption('2027');

 await expect(page.locator('#activeSupplierBadge')).toHaveText('Lucro Real');
 await expect(page.locator('#priceEquationMemory')).toContainText('Base econômica atual');
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
 await expect(regular.locator('.buyer-total b').nth(0)).toHaveText('R$ 100,00');
 await expect(regular.locator('.buyer-total b').nth(1)).toHaveText('R$ 90,21');

 await expect(presumido).toContainText('CBS');
 await expect(presumido).toContainText('R$ 6,70');
 await expect(presumido).toContainText('IBS');
 await expect(presumido).toContainText('R$ 0,07');
 await expect(presumido).toContainText('ICMS remanescente');
 await expect(presumido).toContainText('R$ 17,46');

 await expect(page.locator('#yearlyProjectionTable tr')).toHaveCount(8);
 await page.locator('#priceYear').selectOption('2033');
 await expect(simple.locator('.buyer-total b').nth(1)).toHaveText('R$ 93,05');
 await expect(regular.locator('.buyer-total b').nth(1)).toHaveText('R$ 72,75');

 await expect(page.locator('#supplierComparisonGrid .supplier-card')).toHaveCount(3);
 await expect(page.locator('[data-supplier="presumido"]')).toContainText('Lucro Presumido');
 await expect(page.locator('[data-supplier="real"]')).toContainText('Lucro Real');
 await expect(page.locator('[data-supplier="simples"]')).toContainText('Simples Nacional');

 await page.locator('#exampleSupplier').selectOption('presumido');
 await page.locator('#priceYear').selectOption('2027');
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 78,35');
 await expect(page.locator('#priceEquationMemory')).toContainText('R$ 104,44');

 await page.locator('#exampleSupplier').selectOption('simples');
 await expect(page.locator('#simplesCurrentFields')).toBeVisible();
 await expect(page.locator('#priceEquationMemory')).toContainText('DAS estimado');

 await page.locator('#exampleSupplier').selectOption('real');
 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Compra comercial · custo efetivo');
 await expect(page.locator('#printReport')).toContainText('Simples Nacional');
 await expect(page.locator('#printReport')).toContainText('Lucro Presumido');
 await expect(page.locator('#printReport')).toContainText('Lucro Real');
 await expect(page.locator('#printReport')).toContainText('Simples · IBS/CBS regular');

 const purchaseSheet=await page.evaluate(()=>{
  let out=null;
  downloadSpreadsheet=(...args)=>{out=args;};
  exportPriceExcel();
  return out;
 });
 expect(purchaseSheet[1]).toContain('Custo Simples padrão');
 expect(purchaseSheet[1]).toContain('Custo Lucro Presumido');
 expect(purchaseSheet[1]).toContain('Custo Lucro Real');
 expect(purchaseSheet[1]).toContain('Custo Simples regular IBS/CBS');
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

test('fornecedor do Simples usa Anexo I e faturamento híbrido permanece intacto',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=simple-supplier',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await page.locator('#exampleSupplier').selectOption('simples');
 await page.locator('#priceNow').fill('1000000');
 await page.locator('#snRbt12').fill('1000000');
 await page.locator('#priceYear').selectOption('2027');

 await expect(page.locator('#simplesCurrentFields')).toBeVisible();
 await expect(page.locator('#snAnnex')).toHaveValue('I');
 await expect(page.locator('#priceEquationMemory')).toContainText('DAS estimado');
 await expect(page.locator('[data-buyer="simples"]')).toContainText('Sem crédito');

 const lpFutureCredit=brl(await page.locator('[data-buyer="presumido"] div').filter({hasText:'Créditos'}).locator('b').last().textContent());
 expect(lpFutureCredit).toBeGreaterThan(0);

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
