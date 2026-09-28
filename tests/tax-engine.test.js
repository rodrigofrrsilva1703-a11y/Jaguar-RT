const assert=require('node:assert/strict');
const rules=require('../tax-rules.js');
const engine=require('../tax-engine.js');

const close=(actual,expected,tol=1e-6,msg='')=>{
 assert.ok(Math.abs(actual-expected)<=tol,`${msg} esperado=${expected} atual=${actual}`);
};

assert.equal(engine.rulesVersion,rules.version,'Motor deve usar a mesma versão da base de regras');

// Simples: exemplo-base usado no projeto.
const sn=engine.snEffective(2026,'III',1000000);
close(sn.eff,0.12436,1e-8,'Alíquota efetiva do Simples');

// Lucro Presumido: exemplo RTAV comércio R$ 100.
const presumido={
 regime:'presumido',
 amount:100,
 currentRates:{pis:.65,cofins:3,icms:18,iss:0,ipi:0},
 future:{mode:'rtav',reduction:0},
 hybridFuture:{mode:'rtav',reduction:0},
 buyer:{profile:'b2c',currentCredit:0,usePct:100}
};
const pBase=engine.currentPriceScenario(presumido);
close(pBase.net,78.35,1e-8,'Líquido atual comércio');
const p2027=engine.futurePriceScenario(presumido,2027);
close(p2027.price,104.4443719512195,0.001,'Preço projetado comércio 2027 com CBS 9,21%');
close(p2027.net,pBase.net,1e-8,'Líquido preservado comércio');

// Compra / custo efetivo: o preço bruto não muda por causa do crédito do adquirente.
const purchaseWithCredit={...presumido,purchases:{enabled:true}};
const purchase2027=engine.futurePriceScenario(purchaseWithCredit,2027);
assert.equal(purchase2027.creditEligible,true,'Checkbox deve ativar crédito na aquisição');
close(purchase2027.price,p2027.price,1e-8,'Crédito do adquirente não altera o preço bruto do fornecedor');
close(purchase2027.buyerCredit,purchase2027.cbs+purchase2027.ibs,1e-8,'Crédito deve corresponder a CBS + IBS da aquisição');
close(purchase2027.buyerCost,purchase2027.price-purchase2027.buyerCredit,1e-8,'Custo efetivo deve descontar o crédito');
assert.ok(purchase2027.buyerCost<purchase2027.price,'Crédito deve reduzir o custo efetivo');

const purchaseNoCredit={...presumido,purchases:{enabled:false}};
const purchaseNoCredit2027=engine.futurePriceScenario(purchaseNoCredit,2027);
close(purchaseNoCredit2027.buyerCredit,0,1e-12,'Checkbox desligado não aproveita crédito');
close(purchaseNoCredit2027.buyerCost,purchaseNoCredit2027.price,1e-8,'Sem crédito, custo efetivo é o preço da compra');

const currentPurchaseCredit={...presumido,buyer:{profile:'b2b',currentCredit:10,usePct:100}};
const currentPurchase=engine.currentPriceScenario(currentPurchaseCredit);
close(currentPurchase.buyerCredit,10,1e-8,'Crédito atual informado');
close(currentPurchase.buyerCost,90,1e-8,'Custo efetivo atual');

// Lucro Real: exemplo de serviço R$ 100.
const realServico={
 regime:'real',
 amount:100,
 currentRates:{pis:1.65,cofins:7.6,icms:0,iss:5,ipi:0},
 future:{mode:'rtav',reduction:0},
 hybridFuture:{mode:'rtav',reduction:0},
 buyer:{profile:'b2c',currentCredit:0,usePct:100}
};
const rBase=engine.currentPriceScenario(realServico);
close(rBase.net,85.75,1e-8,'Líquido atual serviço LR');
const r2027=engine.futurePriceScenario(realServico,2027);
close(r2027.price,98.66665789473684,0.001,'Preço projetado serviço 2027 com CBS 9,21%');
close(r2027.net,rBase.net,1e-8,'Líquido preservado serviço');

// Preservação do líquido ao longo da transição.
for(let year=2027;year<=2033;year++){
 const x=engine.futurePriceScenario(presumido,year);
 close(x.net,pBase.net,1e-7,`Líquido deve permanecer estável em ${year}`);
}

// Auditoria de paridade preço x faturamento sem créditos: mesmos tributos e mesmo bruto projetado.
for(const input of [presumido,realServico]){
 for(let year=2027;year<=2033;year++){
  const price=engine.futurePriceScenario(input,year);
  const revenueInput={...input,purchases:{creditablePct:0,usePct:100}};
  const revenue=engine.futureRevenueScenario(revenueInput,year);
  close(price.price,revenue.revenue,1e-7,`Preço/faturamento devem usar a mesma formação tributária em ${input.regime} ${year}`);
  close(price.taxes,revenue.taxes,1e-7,`Tributos devem coincidir em ${input.regime} ${year}`);
  close(price.cbs,revenue.cbs,1e-7,`CBS deve coincidir em ${input.regime} ${year}`);
  close(price.ibs,revenue.ibs,1e-7,`IBS deve coincidir em ${input.regime} ${year}`);
  close(price.remnant,revenue.remnant,1e-7,`Remanescentes devem coincidir em ${input.regime} ${year}`);
 }
}

// Simples padrão: mesma alíquota efetiva total pode manter o preço.
const simple={
 regime:'simples',
 amount:100,
 currentRates:{},
 simple:{annex:'III',rbt12:1000000},
 future:{mode:'rtav'},
 hybridFuture:{mode:'rtav'},
 buyer:{profile:'b2c',currentCredit:0,usePct:100}
};
const sBase=engine.currentPriceScenario(simple);
const s2027=engine.futurePriceScenario(simple,2027);
close(s2027.net,sBase.net,1e-8,'Líquido preservado no Simples');
close(s2027.price,100,0.0001,'Preço estável no exemplo do Simples');

// O crédito futuro depende do tique da aquisição, não de um perfil B2B separado.
const futureWithoutTick=engine.futurePriceScenario({...presumido,buyer:{profile:'b2b',currentCredit:0,usePct:100},purchases:{enabled:false}},2027);
close(futureWithoutTick.buyerCredit,0,1e-8,'Sem tique não há crédito CBS/IBS');
const futureWithTick=engine.futurePriceScenario({...presumido,purchases:{enabled:true}},2027);
close(futureWithTick.buyerCredit,futureWithTick.cbs+futureWithTick.ibs,1e-8,'Com tique, CBS e IBS reduzem o custo efetivo');

// Comparador: regime da empresa x três regimes de fornecedor.
const compareInput={
 companyRegime:'presumido',
 amount:1000,
 currentRates:{icms:18,iss:0,ipi:0},
 simple:{annex:'I',rbt12:1000000},
 future:{mode:'rtav',reduction:0},
 purchaseGeneratesCredit:true
};
const supplierCompare=engine.supplierPurchaseComparison(compareInput,2027);
assert.equal(supplierCompare.companyRegime,'presumido');
assert.equal(supplierCompare.creditEnabled,true);
for(const key of ['presumido','real','simples','simples_hybrid']){
 const x=supplierCompare.suppliers[key];
 assert.ok(x.price>0,`Preço projetado deve existir para fornecedor ${key}`);
 assert.ok(x.effectiveCost>0,`Custo efetivo deve existir para fornecedor ${key}`);
 assert.ok(x.credit>0,`Empresa regular deve aproveitar crédito do fornecedor ${key}`);
 close(x.effectiveCost,x.price-x.credit,1e-8,`Custo efetivo deve descontar crédito em ${key}`);
}
for(const key of ['presumido','real','simples','simples_hybrid'])
 close(supplierCompare.suppliers[key].price,1000,1e-8,'Cotação fixa por fornecedor');
close(supplierCompare.suppliers.presumido.credit,supplierCompare.suppliers.real.credit,1e-8,'LP e LR têm o mesmo crédito para igual preço e alíquota');
close(supplierCompare.suppliers.presumido.credit,1000*(.0931/1.0931),1e-8,'Crédito regular calculado por fora do preço total');
assert.ok(
 supplierCompare.suppliers.simples.credit>0,
 'Empresa no regime regular deve receber crédito correspondente ao CBS/IBS do fornecedor do Simples'
);

assert.ok(
 supplierCompare.suppliers.simples_hybrid.credit>0,
 'Empresa no regime regular deve receber crédito de CBS/IBS do fornecedor do Simples híbrido'
);
assert.ok(
 supplierCompare.suppliers.simples_hybrid.remnant>0,
 'Fornecedor Simples híbrido deve manter DAS/tributos remanescentes na transição'
);
assert.notEqual(
 supplierCompare.suppliers.simples.effectiveCost,
 supplierCompare.suppliers.simples_hybrid.effectiveCost,
 'Simples padrão e híbrido devem ser cenários distintos'
);

const hybridBuyerCompare=engine.supplierPurchaseComparison({...compareInput,companyRegime:'simples_hybrid'},2027);
assert.equal(hybridBuyerCompare.regularBuyer,true);
assert.equal(hybridBuyerCompare.creditEnabled,true);
for(const key of ['presumido','real','simples','simples_hybrid']){
 assert.ok(hybridBuyerCompare.suppliers[key].credit>0,`Compradora híbrida deve aproveitar crédito em ${key}`);
}

const simpleBuyerCompare=engine.supplierPurchaseComparison({...compareInput,companyRegime:'simples'},2027);
assert.equal(simpleBuyerCompare.creditEnabled,false);
for(const key of ['presumido','real','simples','simples_hybrid']){
 const x=simpleBuyerCompare.suppliers[key];
 close(x.credit,0,1e-10,`Compradora do Simples não apropria crédito em ${key}`);
 close(x.effectiveCost,x.price,1e-8,`Sem crédito, custo deve ser o preço em ${key}`);
}

const nonCreditableCompare=engine.supplierPurchaseComparison({...compareInput,purchaseGeneratesCredit:false},2027);
assert.equal(nonCreditableCompare.creditEnabled,false);
for(const key of ['presumido','real','simples','simples_hybrid']) close(nonCreditableCompare.suppliers[key].credit,0,1e-10);
for(const icms of [0,12,18]){
 const other=engine.supplierPurchaseComparison({...compareInput,currentRates:{icms}},2027);
 close(other.suppliers.presumido.effectiveCost,supplierCompare.suppliers.presumido.effectiveCost,1e-8,'ICMS do fornecedor não altera cotação fixa');
}

// Matriz direta de custo efetivo por regime do comprador (arquivo-base do usuário).
const directBase={currentPrice:100,transitionPrice:104.15,reformCredit:7.05,currentRealCreditPct:9.25};

const directSimple=engine.buyerRegimeCostComparison({...directBase,buyerRegime:'simples'});
close(directSimple.currentCredit,0,1e-10,'Simples crédito atual');
close(directSimple.futureCredit,0,1e-10,'Simples crédito futuro');
close(directSimple.currentCost,100,1e-10,'Simples custo atual');
close(directSimple.futureCost,104.15,1e-10,'Simples custo 2027');
close(directSimple.changePct,4.15,1e-10,'Simples variação');

const directPresumed=engine.buyerRegimeCostComparison({...directBase,buyerRegime:'presumido'});
close(directPresumed.currentCredit,0,1e-10,'Presumido crédito atual');
close(directPresumed.futureCredit,7.05,1e-10,'Presumido crédito novo');
close(directPresumed.currentCost,100,1e-10,'Presumido custo atual');
close(directPresumed.futureCost,97.10,1e-10,'Presumido custo 2027');
close(directPresumed.changePct,-2.90,1e-10,'Presumido variação');

const directReal=engine.buyerRegimeCostComparison({...directBase,buyerRegime:'real'});
close(directReal.currentCredit,9.25,1e-10,'Real crédito atual 9,25%');
close(directReal.futureCredit,7.05,1e-10,'Real crédito novo');
close(directReal.currentCost,90.75,1e-10,'Real custo atual');
close(directReal.futureCost,97.10,1e-10,'Real custo 2027');
close(directReal.changePct,(97.10/90.75-1)*100,1e-10,'Real variação');

const directHybrid=engine.buyerRegimeCostComparison({...directBase,buyerRegime:'simples_hybrid'});
close(directHybrid.currentCredit,0,1e-10,'Híbrido crédito atual adotado no projeto');
close(directHybrid.futureCredit,7.05,1e-10,'Híbrido crédito novo adotado no projeto');
close(directHybrid.futureCost,97.10,1e-10,'Híbrido custo 2027');

// Um fornecedor LP, preço novo calculado pela equação; quatro compradores.
const event=engine.buyerPurchaseComparison({
 amount:100,supplierRegime:'presumido',currentRates:{icms:18},
 currentRealCreditPct:9.25,currentPresumedCreditPct:0,
 simple:{annex:'I',rbt12:1000000},future:{mode:'rtav'}
},2027);
close(event.buyers.simples.currentCost,100);
close(event.futurePrice,78.35*1.0931/.82);
close(event.buyers.simples.effectiveCost,event.futurePrice);
close(event.buyers.presumido.effectiveCost,event.futurePrice-event.futureCredit);
close(event.buyers.real.currentCost,90.75);
close(event.buyers.real.changePct,(event.buyers.real.effectiveCost/90.75-1)*100);
close(event.buyers.simples_hybrid.effectiveCost,event.buyers.presumido.effectiveCost);
close(event.cbs,event.futurePrice*.0921,1e-8,'CBS calculada sobre preço novo');
close(event.ibs,event.futurePrice*.001,1e-8,'IBS calculado sobre preço novo');
close(event.futureCredit,event.cbs+event.ibs,1e-8,'Crédito separado em CBS e IBS');
const noBuyerCredit=engine.buyerPurchaseComparison({amount:100,supplierRegime:'presumido',currentRates:{icms:18},future:{mode:'rtav'},buyerPurchaseCredit:false},2027);
close(noBuyerCredit.buyers.presumido.credit,0);
close(noBuyerCredit.buyers.real.effectiveCost,noBuyerCredit.futurePrice);
close(noBuyerCredit.cbs,event.cbs);

// Equação do evento: líquido atual × (1 + tributos novos) / (1 − antigos remanescentes).
const equationInput={amount:100,supplierRegime:'presumido',currentRates:{icms:18,iss:0,ipi:0},future:{mode:'rtav'}};
for(const year of [2027,2029,2033]){
 const projected=engine.supplierPriceProjection(equationInput,year);
 const newRate=(rules.transition[year].cbs+rules.transition[year].ibs)/100;
 const remaining=.18*rules.transition[year].old;
 close(projected.netPrice,78.35,1e-8,`Líquido atual ${year}`);
 close(projected.projectedPrice,78.35*(1+newRate)/(1-remaining),1e-8,`Equação ${year}`);
 const automatic=engine.buyerPurchaseComparison(equationInput,year);
 close(automatic.futurePrice,projected.projectedPrice,1e-8,`Preço automático ${year}`);
 const supplierProjection=engine.supplierPurchaseComparison({companyRegime:'real',...equationInput,projectFromCurrent:true},year);
 close(supplierProjection.suppliers.presumido.price,projected.projectedPrice,1e-8,'Preço LP próprio na comparação de fornecedores');
 if(year===2027) assert.notEqual(supplierProjection.suppliers.real.price,supplierProjection.suppliers.presumido.price);
}

// Faturamento com créditos estimados das aquisições.
const revenue={
 regime:'presumido',
 amount:100000,
 currentRates:{pis:.65,cofins:3,icms:18,iss:0,ipi:0},
 future:{mode:'rtav',reduction:0},
 hybridFuture:{mode:'rtav',reduction:0},
 purchases:{creditablePct:50,usePct:100}
};
const revBase=engine.currentRevenueScenario(revenue);
const rev2027=engine.futureRevenueScenario(revenue,2027);
close(rev2027.net,revBase.net,0.0001,'Faturamento líquido preservado');
assert.ok(rev2027.purchaseCredit>0,'Crédito estimado das aquisições deve ser positivo');
close(rev2027.netTax,rev2027.taxes-rev2027.purchaseCredit,1e-8,'Carga líquida após créditos');

// 2033 não carrega ICMS/ISS remanescente no cenário regular.
const p2033=engine.futurePriceScenario(presumido,2033);
close(p2033.remnant,0,1e-10,'Tributos antigos remanescentes em 2033');

// Validações.
const warnings=engine.validatePriceInput({...simple,simple:{annex:'III',rbt12:4000000}});
assert.ok(warnings.some(x=>x.code==='sublimite'),'Deve alertar sublimite');
const errors=engine.validatePriceInput({...presumido,amount:0});
assert.ok(errors.some(x=>x.level==='error'),'Deve alertar valor zerado');

// Metadados: premissas futuras devem estar identificadas.
assert.equal(rules.transition[2027].sourceType,'premissa');
close(rules.transition[2027].cbs,9.21,1e-10,'CBS padrão 2027 deve ser 9,21%');
close(rules.transition[2033].cbs,9.21,1e-10,'CBS padrão 2033 deve ser 9,21%');
close(rules.transition[2029].ibs,1.87,1e-10,'IBS 2029 deve representar 10% de 18,70%');
close(rules.transition[2030].ibs,3.74,1e-10,'IBS 2030 deve representar 20% de 18,70%');
close(rules.transition[2031].ibs,5.61,1e-10,'IBS 2031 deve representar 30% de 18,70%');
close(rules.transition[2032].ibs,7.48,1e-10,'IBS 2032 deve representar 40% de 18,70%');
close(rules.transition[2033].ibs,18.70,1e-10,'IBS cheio 2033 deve ser 18,70%');
close(rules.transition[2033].cbs+rules.transition[2033].ibs,27.91,1e-10,'CBS + IBS 2033 deve totalizar 27,91%');
assert.ok(rules.metadata.warning.includes('Premissas'));

console.log('✓ tax-engine: todos os testes passaram');

// Regressão RTAV: Anexo III, faixa 4, líquido preservado sem créditos.
const hybrid={...simple,regime:'simples_hybrid',amount:1000000};
for(const calculate of [engine.futurePriceScenario,engine.futureRevenueScenario]){
 const x=calculate(hybrid,2027);
 close(x.net,875640,.005,'Líquido do slide');
 close(x.residualBase,976967.38,.005,'Base DAS residual do slide');
 close(x.remnant,101327.38,.005,'DAS residual do slide');
 close(x.excludedTax,39486.09,.005,'ISS excluído do slide');
 close(x.cleanBase,937481.29,.005,'Base CBS do slide');
 close(x.cbs,86342.03,.005,'CBS do slide');
 close(x.ibs,937.481292889,.000001,'IBS usa a mesma base');
 close(x.price??x.revenue,1064246.8920009993,.01,'Total com CBS e IBS por fora');
}
// Preço/faturamento, inversão com bruto fixo, todas as faixas e transição.
for(const annex of ['I','II','III','IV','V']){
 for(const rbt12 of [100000,250000,500000,1000000,3500000,4000000]){
  for(let year=2027;year<=2033;year++){
   for(const rates of [{mode:'rtav'},{mode:'manual',cbs:9.21,ibs:.1,reduction:60},{mode:'manual',cbs:0,ibs:0}]){
    const input={...hybrid,simple:{annex,rbt12},hybridFuture:rates};
    const p=engine.futurePriceScenario(input,year),r=engine.futureRevenueScenario(input,year);
    close(p.price,r.revenue,1e-7,'Paridade preço/faturamento');
    close(p.net,engine.currentPriceScenario(input).net,1e-7,'Preservação líquido');
    close(p.residualBase-p.excludedTax,p.cleanBase,1e-7,'Base exclui apenas ICMS/ISS');
    close(p.price-p.cbs-p.ibs,p.residualBase,1e-7,'CBS/IBS fora do DAS');
    close(p.remnant+p.cbs+p.ibs+p.net,p.price,1e-7,'Reconciliação');
    const inverse=engine.revenueScenarioAtRevenue(input,year,r.revenue);
    close(inverse.net,r.net,1e-7,'Inversão');
    const fixed=engine.futureRevenueScenario(input,year,true);
    close(fixed.revenue,input.amount,1e-7,'Bruto fixo');
    close(fixed.revenue,fixed.net+fixed.taxes,1e-7,'Bruto fixo reconciliado');
    if(year===2033) close(p.excludedTax,0,1e-8,'Sem ISS/ICMS em 2033');
   }
  }
 }
}
const hybridPurchase=engine.futurePriceScenario({...hybrid,purchases:{enabled:true}},2027);
close(hybridPurchase.buyerCredit,hybridPurchase.cbs+hybridPurchase.ibs,1e-7);
close(hybridPurchase.buyerCost,hybridPurchase.price-hybridPurchase.buyerCredit,1e-7);
for(const memory of [engine.priceMemory,engine.revenueMemory]){
 const rows=memory(hybrid,2027);
 assert.ok(rows.some(row=>row[0].includes('ISS no DAS')));
 assert.ok(rows.some(row=>row[0].includes('Base da CBS/IBS')));
}
console.log('✓ híbrido: slides, 630 cenários, inversão e memórias validados');
