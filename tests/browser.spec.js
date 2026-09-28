const {test,expect}=require('@playwright/test');

const brl=text=>{
 const raw=String(text||'').replace(/[^0-9,.-]/g,'').replace(/\./g,'').replace(',','.');
 return Number(raw)||0;
};

test('compra/custo efetivo e faturamento carregam sem erro de console',async({page})=>{
 const errors=[];
 page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
 page.on('pageerror',err=>errors.push(err.message));

 await page.goto('http://127.0.0.1:4173/?e2e=1',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await expect(page.locator('#priceToolPanel')).toHaveClass(/active/);
 await expect(page.locator('#priceToolTab')).toContainText('Compra / custo efetivo');
 await page.locator('#priceNow').fill('1.234,56');
 await page.locator('#priceNow').blur();
 await expect(page.locator('#priceNow')).toHaveValue('1.234,56');
 await page.locator('#priceCurrentBuyerCredit').fill('100');
 await page.locator('#taxRegime').selectOption('presumido');
 await page.locator('#pisRate').fill('0.65');
 await page.locator('#cofinsRate').fill('3');
 await page.locator('#icmsRate').fill('18');
 await page.locator('#priceYear').selectOption('2027');

 await expect(page.locator('#integratedKpis')).toContainText('Custo efetivo atual');
 await expect(page.locator('#integratedKpis')).toContainText('1.134,56');
 await expect(page.locator('#yearlyProjectionTable tr')).toHaveCount(8);
 await expect(page.locator('#currentTaxSummary')).toContainText('Preço da compra');
 await expect(page.locator('#currentTaxSummary')).toContainText('Crédito atual aproveitável');
 await expect(page.locator('#currentTaxSummary')).not.toContainText('%');

 const priceRow=page.locator('#futureTaxSummary .tax-summary-row').filter({hasText:'Preço da compra projetado'});
 const costRow=page.locator('#futureTaxSummary .tax-summary-row').filter({hasText:'Custo efetivo'});
 const creditRow=page.locator('#futureTaxSummary .tax-summary-row').filter({hasText:'Crédito CBS/IBS'});
 const grossBefore=brl(await priceRow.locator('b').textContent());
 const costBefore=brl(await costRow.locator('b').textContent());
 expect(costBefore).toBeCloseTo(grossBefore,2);

 await expect(page.locator('#priceTakesCbsIbsCredit')).toBeVisible();
 await page.locator('#priceTakesCbsIbsCredit').check();
 await expect(page.locator('#integratedKpis')).toContainText('Aproveitado');
 const grossAfter=brl(await priceRow.locator('b').textContent());
 const costAfter=brl(await costRow.locator('b').textContent());
 const creditAfter=brl(await creditRow.locator('b').textContent());
 expect(grossAfter).toBeCloseTo(grossBefore,2);
 expect(creditAfter).toBeGreaterThan(0);
 expect(costAfter).toBeLessThan(grossAfter);
 expect(Math.abs(costAfter-(grossAfter-creditAfter))).toBeLessThanOrEqual(0.02);
 await expect(page.locator('#futureTaxSummary')).toContainText('CBS');
 await expect(page.locator('#futureTaxSummary')).toContainText('IBS');
 await expect(page.locator('#futureTaxSummary')).not.toContainText('%');

 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Relatório de compra e custo efetivo');
 await expect(page.locator('#printReport')).toContainText('Crédito CBS/IBS');
 await expect(page.locator('#printReport')).toContainText('Custo efetivo');

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
 await expect(page.locator('#revCurrentSummary')).not.toContainText('+');
 await expect(page.locator('#revCurrentSummary')).not.toContainText('=');
 await page.locator('#revenueAdvanced').evaluate(el=>{el.open=true;});
 await page.locator('#revCreditablePurchasesPct').fill('50');
 await page.locator('#revYear').selectOption('2027');
 await expect(page.locator('#revKpis')).toContainText('Créditos estimados');
 await expect(page.locator('#revYearlyTable tr')).toHaveCount(8);

 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#revenuePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('Resumo executivo');
 await expect(page.locator('#printReport')).toContainText('Comparação tributária');
 await expect(page.locator('#printReport')).toContainText('PIS');
 await expect(page.locator('#printReport')).toContainText('Cofins');
 await expect(page.locator('#printReport')).toContainText('ICMS');
 await expect(page.locator('#printReport')).toContainText('−');
 await expect(page.locator('#printReport')).not.toContainText('+');
 await expect(page.locator('#printReport')).not.toContainText('=');
 await expect(page.locator('#printReport')).not.toContainText('Tributos considerados');
 await expect(page.locator('#printReport')).toContainText('Evolução 2026–2033');

 expect(errors).toEqual([]);
});

test('Simples híbrido mantém cálculo na compra e no faturamento',async({page})=>{
 await page.goto('http://127.0.0.1:4173/?e2e=hybrid',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>go('tools'));

 await page.locator('#taxRegime').selectOption('simples_hybrid');
 await page.locator('#priceNow').fill('1000000');
 await page.locator('#snRbt12').fill('1000000');
 await page.locator('#snAnnex').selectOption('III');
 await page.locator('#priceYear').selectOption('2027');
 await page.locator('#priceTakesCbsIbsCredit').check();
 await expect(page.locator('#priceMemory')).toContainText('937.481,29');
 await expect(page.locator('#priceMemory')).toContainText('39.486,09');
 await expect(page.locator('#futureTaxSummary')).toContainText('86.342,03');
 await expect(page.locator('#futureTaxSummary')).toContainText('937,48');
 await expect(page.locator('#futureTaxSummary')).toContainText('Crédito CBS/IBS');

 await page.evaluate(()=>{window.print=()=>{};});
 await page.locator('#pricePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('86.342,03');
 await expect(page.locator('#printReport')).not.toContainText('Base do DAS residual');

 await page.evaluate(()=>showTaxTool('revenue'));
 await page.locator('#revTaxRegime').selectOption('simples_hybrid');
 await page.locator('#revCurrentRevenue').fill('1000000');
 await page.locator('#revSnRbt12').fill('1000000');
 await page.locator('#revSnAnnex').selectOption('III');
 await page.locator('#revYear').selectOption('2027');
 await expect(page.locator('#revenueMemory')).toContainText('937.481,29');
 await page.locator('#revenuePrintBtn').click();
 await expect(page.locator('#printReport')).toContainText('CBS');
 await expect(page.locator('#printReport')).toContainText('86.342,03');
 await expect(page.locator('#printReport')).toContainText('IBS');
 await expect(page.locator('#printReport')).toContainText('937,48');
 await expect(page.locator('#printReport')).toContainText('DAS / tributos remanescentes');
 await expect(page.locator('#printReport')).toContainText('101.327,38');
 await expect(page.locator('#printReport')).not.toContainText('Base do DAS residual');

 const sheets=await page.evaluate(()=>{
  const out=[];
  downloadSpreadsheet=(...args)=>out.push(args);
  showTaxTool('price');exportPriceExcel();
  showTaxTool('revenue');exportRevenueExcel();
  return out;
 });
 const purchaseSheet=sheets[0],revenueSheet=sheets[1];
 expect(purchaseSheet[1]).toContain('Custo efetivo');
 expect(purchaseSheet[1]).toContain('Crédito aproveitado');
 expect(purchaseSheet[1]).not.toContain('Base DAS residual');
 const purchaseRow=purchaseSheet[2].find(row=>row[0]===2027);
 expect(purchaseRow[7]).toBeCloseTo(87279.51,1);
 expect(purchaseRow[8]).toBeCloseTo(purchaseRow[3]-purchaseRow[7],2);

 expect(revenueSheet[1]).toContain('Base DAS residual');
 const revenueRow=revenueSheet[2].find(row=>row[0]===2027);
 expect(revenueRow.slice(-3)[0]).toBeCloseTo(976967.38,2);
 expect(revenueRow.slice(-3)[1]).toBeCloseTo(39486.09,2);
 expect(revenueRow.slice(-3)[2]).toBeCloseTo(937481.29,2);
});
