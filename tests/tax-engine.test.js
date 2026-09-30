const assert=require('node:assert/strict');
const rules=require('../tax-rules.js');
const engine=require('../tax-engine.js');

function close(actual,expected,tol=1e-8,label=''){
 assert.ok(Number.isFinite(actual),label+' deve ser finito; atual='+actual);
 assert.ok(Math.abs(actual-expected)<=tol,`${label} esperado=${expected} atual=${actual}`);
}

function pct(a){return a/100;}

const transitionExpected={
 2027:{old:1,cbs:9.21,ibs:.1},
 2028:{old:1,cbs:9.21,ibs:.1},
 2029:{old:.9,cbs:9.21,ibs:1.87},
 2030:{old:.8,cbs:9.21,ibs:3.74},
 2031:{old:.7,cbs:9.21,ibs:5.61},
 2032:{old:.6,cbs:9.21,ibs:7.48},
 2033:{old:0,cbs:9.21,ibs:18.70}
};

// Premissas temporárias do Jaguar-RTAV permanecem explícitas.
for(const [year,expected] of Object.entries(transitionExpected)){
 const row=rules.transition[year];
 close(row.old,expected.old,1e-12,'old '+year);
 close(row.cbs,expected.cbs,1e-12,'CBS '+year);
 close(row.ibs,expected.ibs,1e-12,'IBS '+year);
 assert.equal(row.sourceType,'premissa');
}
close(rules.transition[2033].cbs+rules.transition[2033].ibs,27.91,1e-12,'CBS + IBS 2033');
assert.ok(rules.metadata.warning.includes('9,21%'));
assert.ok(rules.metadata.warning.includes('18,70%'));

// Sistema atual: ICMS é retirado da base do PIS/Cofins na mercadoria.
const lpLegacy=engine.legacyTaxBreakdown(100,{pis:.65,cofins:3,icms:18,iss:0,ipi:0},'mercadoria');
close(lpLegacy.components.icms,18,1e-12,'ICMS LP');
close(lpLegacy.pisCofinsBase,82,1e-12,'base PIS/Cofins LP');
close(lpLegacy.components.pis,.533,1e-12,'PIS LP');
close(lpLegacy.components.cofins,2.46,1e-12,'Cofins LP');
close(lpLegacy.net,79.007,1e-12,'líquido LP comércio');

const lrLegacy=engine.legacyTaxBreakdown(100,{pis:1.65,cofins:7.6,icms:18,iss:0,ipi:0},'mercadoria');
close(lrLegacy.net,74.415,1e-12,'líquido LR comércio');

const serviceLegacy=engine.legacyTaxBreakdown(100,{pis:.65,cofins:3,icms:0,iss:5,ipi:0},'servico');
close(serviceLegacy.components.iss,5,1e-12,'ISS serviço');
close(serviceLegacy.pisCofinsBase,100,1e-12,'base PIS/Cofins serviço');
close(serviceLegacy.net,91.35,1e-12,'líquido LP serviço');

// Faturamento e compra usam a mesma base econômica para a mesma operação.
const lpInput={
 regime:'presumido',operationType:'mercadoria',amount:100,
 currentRates:{pis:.65,cofins:3,icms:18,iss:0,ipi:0},
 future:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0},
 hybridFuture:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0},
 purchases:{mode:'estimate',creditablePct:0,usePct:100}
};
const currentRevenue=engine.currentRevenueScenario(lpInput);
close(currentRevenue.net,79.007,1e-12,'faturamento atual LP');

const purchaseLP=engine.segmentedPurchaseComparison({
 amount:100,segment:'comercio',operationType:'mercadoria',supplierRegime:'presumido',
 icmsRate:18,simple:{annex:'I',rbt12:1000000},
 future:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0},
 purchaseGeneratesCredit:true,creditUsePct:100
},2027);
close(purchaseLP.economicBase,currentRevenue.net,1e-12,'base econômica compra x faturamento');

// Projeção 2027 preserva o líquido atual e aplica tributos novos por fora.
const future2027=engine.futureRevenueScenario(lpInput,2027);
const expected2027=79.007*(1+pct(9.21)+pct(.1))/(1-.18);
close(future2027.revenue,expected2027,1e-10,'faturamento projetado 2027');
close(future2027.net,79.007,1e-10,'líquido preservado 2027');
close(future2027.cbs,79.007*pct(9.21),1e-10,'CBS 2027');
close(future2027.ibs,79.007*pct(.1),1e-10,'IBS 2027');
close(future2027.remnant,future2027.revenue*.18,1e-10,'ICMS remanescente 2027');

// 2033 extingue ICMS/ISS remanescente.
const future2033=engine.futureRevenueScenario(lpInput,2033);
close(future2033.remnant,0,1e-12,'remanescente 2033');
close(future2033.net,79.007,1e-10,'líquido preservado 2033');

// Reduções simples continuam matematicamente consistentes.
const reduced=engine.resolveRegularRates(2033,{mode:'rtav',reduction:60});
close(reduced.cbs,9.21*.4,1e-12,'CBS redução 60%');
close(reduced.ibs,18.70*.4,1e-12,'IBS redução 60%');

// Fórmulas especiais da 5ª faixa do Anexo III conforme LC 227/2026.
const specialIII={
 2029:{iss:.045,cbs:.2233,ibs:.0480},
 2030:{iss:.040,cbs:.2131,ibs:.0915},
 2031:{iss:.035,cbs:.2038,ibs:.1313},
 2032:{iss:.030,cbs:.1952,ibs:.1677}
};
for(const [yearString,sp] of Object.entries(specialIII)){
 const year=Number(yearString);
 const x=engine.snShares(year,'III',3500000);
 assert.equal(x.special,true,'Anexo III deve acionar fórmula especial em '+year);
 const residual=x.eff-sp.iss;
 close(x.oldEff,sp.iss,1e-12,'ISS especial Anexo III '+year);
 close(x.cbsEff,residual*sp.cbs,1e-12,'CBS especial Anexo III '+year);
 close(x.ibsEff,residual*sp.ibs,1e-12,'IBS especial Anexo III '+year);
 close(x.cbsEff+x.ibsEff+x.oldEff+x.otherEff,x.eff,1e-12,'partilha fecha Anexo III '+year);
}

// Fórmulas especiais da 5ª faixa do Anexo IV conforme LC 227/2026.
const specialIV={
 2029:{iss:.045,cbs:.3438,ibs:.0625},
 2030:{iss:.040,cbs:.3235,ibs:.1176},
 2031:{iss:.035,cbs:.3056,ibs:.1667},
 2032:{iss:.030,cbs:.2895,ibs:.2105}
};
for(const [yearString,sp] of Object.entries(specialIV)){
 const year=Number(yearString);
 const x=engine.snShares(year,'IV',3500000);
 assert.equal(x.special,true,'Anexo IV deve acionar fórmula especial em '+year);
 const residual=x.eff-sp.iss;
 close(x.oldEff,sp.iss,1e-12,'ISS especial Anexo IV '+year);
 close(x.cbsEff,residual*sp.cbs,1e-12,'CBS especial Anexo IV '+year);
 close(x.ibsEff,residual*sp.ibs,1e-12,'IBS especial Anexo IV '+year);
 close(x.cbsEff+x.ibsEff+x.oldEff+x.otherEff,x.eff,1e-12,'partilha fecha Anexo IV '+year);
}

// 2027/2028 do Anexo III mantém a regra especial já prevista na LC 227.
for(const year of [2027,2028]){
 const x=engine.snShares(year,'III',3500000);
 assert.equal(x.special,true);
 const residual=x.eff-.05;
 close(x.cbsEff,residual*.2320,1e-12,'CBS Anexo III '+year);
 close(x.ibsEff,residual*.0026,1e-12,'IBS Anexo III '+year);
 close(x.oldEff,.05,1e-12,'ISS Anexo III '+year);
}

// Crédito parcial na compra reduz proporcionalmente créditos atuais e futuros.
const partial=engine.segmentedPurchaseComparison({
 amount:100,segment:'comercio',operationType:'mercadoria',supplierRegime:'real',
 icmsRate:18,simple:{annex:'I',rbt12:1000000},
 future:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0},
 purchaseGeneratesCredit:true,creditUsePct:50
},2027);
close(partial.buyers.real.currentCredits.icms,9,1e-12,'50% ICMS atual');
close(partial.buyers.real.currentCredits.pisCofins,3.7925,1e-12,'50% PIS/Cofins atual');
close(partial.buyers.real.futureCredits.cbs,partial.cbs*.5,1e-12,'50% CBS futura');
close(partial.buyers.real.futureCredits.ibs,partial.ibs*.5,1e-12,'50% IBS futura');
close(partial.buyers.real.futureCredits.icms,partial.oldTaxRemnant*.5,1e-12,'50% ICMS futuro');
assert.ok(Number.isFinite(partial.futurePrice));

// Sem direito a crédito, nenhum comprador regular aproveita os tributos da aquisição.
const noCredit=engine.segmentedPurchaseComparison({
 amount:100,segment:'comercio',operationType:'mercadoria',supplierRegime:'real',
 icmsRate:18,simple:{annex:'I',rbt12:1000000},
 future:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0},
 purchaseGeneratesCredit:false,creditUsePct:100
},2027);
for(const buyer of ['presumido','real','simples_hybrid']){
 close(noCredit.buyers[buyer].currentCredit,0,1e-12,'sem crédito atual '+buyer);
 close(noCredit.buyers[buyer].futureCredit,0,1e-12,'sem crédito futuro '+buyer);
}

// Simples padrão comprador não toma créditos regulares.
close(partial.buyers.simples.currentCredit,0,1e-12,'Simples sem crédito atual');
close(partial.buyers.simples.futureCredit,0,1e-12,'Simples sem crédito futuro');

// Créditos no faturamento são segregados por CBS e IBS e não reduzem ICMS/ISS.
const estimatedCreditInput={
 ...lpInput,
 purchases:{mode:'estimate',creditablePct:50,usePct:100}
};
const estimated=engine.futureRevenueScenario(estimatedCreditInput,2027);
assert.ok(estimated.cbsCredit>0);
assert.ok(estimated.ibsCredit>0);
close(estimated.netTax,
 estimated.remnant+Math.max(0,estimated.cbs-estimated.cbsCredit)+Math.max(0,estimated.ibs-estimated.ibsCredit),
 1e-10,'créditos não reduzem ICMS');

// Crédito manual excedente vira saldo credor; não apaga ICMS remanescente.
const manual=engine.futureRevenueScenario({
 ...lpInput,
 purchases:{mode:'manual',cbsCredit:20,ibsCredit:5,usePct:100}
},2027);
close(manual.cbsPayable,0,1e-12,'CBS quitada por crédito');
close(manual.ibsPayable,0,1e-12,'IBS quitado por crédito');
close(manual.netTax,manual.remnant,1e-10,'ICMS remanescente não compensado');
assert.ok(manual.creditBalance>0,'deve manter saldo credor');
close(manual.creditBalance,manual.cbsCreditBalance+manual.ibsCreditBalance,1e-12,'saldo credor segregado');

// Imposto Seletivo: integra a base de CBS/IBS e não gera crédito automático.
const selective=engine.futureRevenueScenario({
 ...lpInput,
 future:{...lpInput.future,selective:10},
 purchases:{mode:'estimate',creditablePct:0,usePct:100}
},2033);
close(selective.selectiveTax,79.007*.10,1e-10,'IS');
const ivaBase=79.007+selective.selectiveTax;
close(selective.cbs,ivaBase*.0921,1e-10,'CBS sobre base + IS');
close(selective.ibs,ivaBase*.187,1e-10,'IBS sobre base + IS');
close(selective.netTax,selective.selectiveTax+selective.cbs+selective.ibs,1e-10,'IS não creditado');

// O comparador de compra também incorpora IS nos fornecedores regulares.
const purchaseIS=engine.segmentedPurchaseComparison({
 amount:100,segment:'comercio',operationType:'mercadoria',supplierRegime:'presumido',
 icmsRate:18,simple:{annex:'I',rbt12:1000000},
 future:{mode:'rtav',reduction:0,cbs:9.21,ibs:18.70,selective:10},
 purchaseGeneratesCredit:true,creditUsePct:100
},2033);
close(purchaseIS.selectiveTax,purchaseIS.economicBase*.10,1e-10,'IS compra');
close(purchaseIS.cbs,(purchaseIS.economicBase+purchaseIS.selectiveTax)*.0921,1e-10,'CBS compra com IS');
close(purchaseIS.ibs,(purchaseIS.economicBase+purchaseIS.selectiveTax)*.187,1e-10,'IBS compra com IS');

// Empresa mista não pode aplicar ICMS e ISS à mesma receita no mesmo cenário.
const mixedWarnings=engine.validateRevenueInput({
 ...lpInput,currentRates:{pis:.65,cofins:3,icms:18,iss:5,ipi:0}
});
assert.ok(mixedWarnings.some(x=>x.level==='error'&&x.code==='mixed_legacy'),'deve bloquear ICMS + ISS na mesma receita');

// Serviços usam ISS como tributo antigo na transição, não ICMS.
const serviceParams=engine.paramsForYear({
 regime:'presumido',operationType:'servico',amount:100,
 currentRates:{pis:.65,cofins:3,icms:18,iss:5,ipi:0},
 future:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0}
},2029);
close(serviceParams.remRate,.05*.9,1e-12,'ISS remanescente serviço');

// Simples híbrido preserva líquido e mantém CBS/IBS fora do DAS.
const hybrid={
 regime:'simples_hybrid',amount:1000000,
 simple:{annex:'III',rbt12:1000000},
 currentRates:{pis:0,cofins:0,icms:0,iss:5,ipi:0},
 hybridFuture:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0},
 future:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0},
 purchases:{mode:'estimate',creditablePct:0,usePct:100}
};
const hybridBase=engine.currentRevenueScenario(hybrid);
const hybrid2027=engine.futureRevenueScenario(hybrid,2027);
close(hybrid2027.net,hybridBase.net,1e-7,'líquido híbrido preservado');
assert.ok(hybrid2027.residualBase>0);
assert.ok(hybrid2027.cbs>0);
assert.ok(hybrid2027.ibs>0);
const hybrid2033=engine.futureRevenueScenario(hybrid,2033);
close(hybrid2033.excludedTax,0,1e-8,'sem ISS/ICMS excluído em 2033');

// Wrappers legados agora usam o mesmo motor canônico.
const wrapperInput={
 companyRegime:'real',amount:100,segment:'comercio',operationType:'mercadoria',
 icmsRate:18,simple:{annex:'I',rbt12:1000000},
 future:{mode:'rtav',reduction:0,cbs:9.21,ibs:.1,selective:0},
 purchaseGeneratesCredit:true,creditUsePct:100
};
const wrapper=engine.supplierPurchaseComparison(wrapperInput,2027);
const canonical=engine.segmentedPurchaseComparison({...wrapperInput,supplierRegime:'real'},2027);
close(wrapper.suppliers.real.price,canonical.buyers.real.futurePrice,1e-12,'wrapper preço');
close(wrapper.suppliers.real.credit,canonical.buyers.real.futureCredit,1e-12,'wrapper crédito');
close(wrapper.suppliers.real.effectiveCost,canonical.buyers.real.futureCost,1e-12,'wrapper custo');

const buyerWrapper=engine.buyerPurchaseComparison({...wrapperInput,supplierRegime:'real'},2027);
close(buyerWrapper.buyers.real.effectiveCost,canonical.buyers.real.futureCost,1e-12,'buyer wrapper custo');

// Validações básicas.
assert.ok(engine.validatePriceInput({...lpInput,amount:0}).some(x=>x.level==='error'));
assert.ok(engine.validateRevenueInput({...lpInput,future:{mode:'manual',cbs:0,ibs:0,selective:0}}).some(x=>x.code==='manual_zero'));

// Nenhum cenário principal deve produzir NaN/Infinity.
for(const year of [2027,2028,2029,2030,2031,2032,2033]){
 for(const supplierRegime of ['simples','presumido','real','simples_hybrid']){
  const model=engine.segmentedPurchaseComparison({
   amount:100,segment:'comercio',operationType:'mercadoria',supplierRegime,
   icmsRate:18,simple:{annex:'I',rbt12:1000000},
   future:{mode:'rtav',reduction:0,cbs:9.21,ibs:rules.transition[year].ibs,selective:0},
   purchaseGeneratesCredit:true,creditUsePct:100
  },year);
  for(const value of [model.currentPrice,model.economicBase,model.futurePrice,model.cbs,model.ibs]){
   assert.ok(Number.isFinite(value),`valor finito ${supplierRegime} ${year}`);
  }
  for(const buyer of Object.values(model.buyers)){
   assert.ok(Number.isFinite(buyer.currentCost));
   assert.ok(Number.isFinite(buyer.futureCost));
  }
 }
}

console.log('✓ tax-engine: regras fiscais, créditos, Simples, IS e transição validados');
