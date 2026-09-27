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
 await expect(page.locator('#printReport')).toContainText('Evolução 2026–2033');
 await expect(page.locator('#printReport')).not.toContainText('Exemplo editável');
 await expect(page.locator('#printReport')).not.toContainText('Restaurar padrão');

 expect(errors).toEqual([]);
});
