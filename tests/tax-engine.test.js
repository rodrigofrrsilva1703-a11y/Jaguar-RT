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

// O checkbox de crédito sinaliza elegibilidade, mas não inventa um valor sem base de aquisições.
const ownCredit={...presumido,purchases:{enabled:true}};
const own2027=engine.futurePriceScenario(ownCredit,2027);
assert.equal(own2027.creditEligible,true,'Checkbox deve marcar elegibilidade ao crédito');
close(own2027.purchaseCredit,0,1e-12,'Ferramenta de preço não deve inventar crédito monetário sem aquisições');
close(own2027.price,p2027.price,1e-8,'Elegibilidade ao crédito, sozinha, não deve alterar o preço');
close(own2027.net,pBase.net,1e-8,'Valor líquido continua preservado');

const ownCreditDisabled={...presumido,purchases:{enabled:false}};
const ownDisabled2027=engine.futurePriceScenario(ownCreditDisabled,2027);
assert.equal(ownDisabled2027.creditEligible,false);
close(ownDisabled2027.price,p2027.price,1e-8,'Checkbox desligado mantém o cálculo normal');

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

// B2B: crédito potencial reduz custo efetivo do comprador.
const b2b={...presumido,buyer:{profile:'b2b',currentCredit:0,usePct:100}};
const b2027=engine.futurePriceScenario(b2b,2027);
close(b2027.buyerCredit,b2027.cbs+b2027.ibs,1e-8,'Crédito B2B potencial');
close(b2027.buyerCost,b2027.price-b2027.buyerCredit,1e-8,'Custo efetivo B2B');

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
const hybridB2B=engine.futurePriceScenario({...hybrid,buyer:{profile:'b2b',usePct:100}},2027);
close(hybridB2B.buyerCredit,hybridB2B.cbs+hybridB2B.ibs,1e-7);
for(const memory of [engine.priceMemory,engine.revenueMemory]){
 const rows=memory(hybrid,2027);
 assert.ok(rows.some(row=>row[0].includes('ISS no DAS')));
 assert.ok(rows.some(row=>row[0].includes('Base da CBS/IBS')));
}
console.log('✓ híbrido: slides, 630 cenários, inversão e memórias validados');
