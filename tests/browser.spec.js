const {test,expect}=require('@playwright/test');

test('calculadoras carregam e recalculam sem erro de console',async({page})=>{
 const errors=[];
 page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
 page.on('pageerror',err=>errors.push(err.message));

 await page.goto('http://127.0.0.1:4173/?e2e=1',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await expect(page.locator('#priceToolPanel')).toHaveClass(/active/);
 await page.locator('#priceNow').fill('100');
 await page.locator('#taxRegime').selectOption('presumido');
 await page.locator('#pisRate').fill('0.65');
 await page.locator('#cofinsRate').fill('3');
 await page.locator('#icmsRate').fill('18');
 await page.locator('#priceYear').selectOption('2027');
 await expect(page.locator('#integratedKpis')).toContainText('Preço em 2027');
 await expect(page.locator('#yearlyProjectionTable tr')).toHaveCount(8);

 await page.locator('#priceAdvanced').evaluate(el=>{el.open=true;});
 await page.locator('#priceBuyerProfile').selectOption('b2b');
 await expect(page.locator('#integratedKpis')).toContainText('Custo efetivo do comprador');

 await page.evaluate(()=>showTaxTool('revenue'));
 await expect(page.locator('#revenueToolPanel')).toHaveClass(/active/);
 await page.locator('#revCurrentRevenue').fill('100000');
 await page.locator('#revenueAdvanced').evaluate(el=>{el.open=true;});
 await page.locator('#revCreditablePurchasesPct').fill('50');
 await page.locator('#revYear').selectOption('2027');
 await expect(page.locator('#revKpis')).toContainText('Créditos estimados');
 await expect(page.locator('#revYearlyTable tr')).toHaveCount(8);

 // O PDF deve ser um relatório executivo próprio, não uma cópia da tela.
 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#revenuePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Resumo executivo');
 await expect(page.locator('#printReport')).toContainText('Comparação tributária');
 await expect(page.locator('#printReport')).toContainText('PIS');
 await expect(page.locator('#printReport')).toContainText('Cofins');
 await expect(page.locator('#printReport')).toContainText('ICMS');
 await expect(page.locator('#printReport')).toContainText('Total de tributos');
 await expect(page.locator('#printReport')).not.toContainText('Tributos considerados');
 await expect(page.locator('#printReport')).toContainText('Evolução 2026–2033');
 await expect(page.locator('#printReport')).not.toContainText('Exemplo editável');
 await expect(page.locator('#printReport')).not.toContainText('Restaurar padrão');

 expect(errors).toEqual([]);
});

test('Simples híbrido separa ISS e bases em preço, faturamento, PDF e Excel',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=hybrid',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));
 await page.locator('#taxRegime').selectOption('simples_hybrid');
 await page.locator('#priceNow').fill('1000000');
 await page.locator('#snRbt12').fill('1000000');
 await page.locator('#snAnnex').selectOption('III');
 await page.locator('#priceYear').selectOption('2027');
 await expect(page.locator('#priceMemory')).toContainText('937.481,29');
 await expect(page.locator('#priceMemory')).toContainText('39.486,09');
 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('86.342,03');
 await expect(page.locator('#printReport')).toContainText('Base do DAS residual');
 await page.evaluate(()=>showTaxTool('revenue'));
 await page.locator('#revTaxRegime').selectOption('simples_hybrid');
 await page.locator('#revCurrentRevenue').fill('1000000');
 await page.locator('#revSnRbt12').fill('1000000');
 await page.locator('#revSnAnnex').selectOption('III');
 await page.locator('#revYear').selectOption('2027');
 await expect(page.locator('#revenueMemory')).toContainText('937.481,29');
 await page.locator('#revenuePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('39.486,09');
 await expect(page.locator('#printReport')).toContainText('86.342,03');
 const sheets=await page.evaluate(()=>{
  const out=[];
  downloadSpreadsheet=(...args)=>out.push(args);
  exportPriceExcel();exportRevenueExcel();
  return out;
 });
 for(const sheet of sheets){
  expect(sheet[1]).toContain('Base DAS residual');
  const row=sheet[2].find(row=>row[0]===2027);
  expect(row.slice(-3)[0]).toBeCloseTo(976967.38,2);
  expect(row.slice(-3)[1]).toBeCloseTo(39486.09,2);
  expect(row.slice(-3)[2]).toBeCloseTo(937481.29,2);
 }
});
