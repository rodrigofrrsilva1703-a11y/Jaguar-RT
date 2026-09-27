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
close(p2027.price,104.14817073170733,0.001,'Preço projetado comércio 2027');
close(p2027.net,pBase.net,1e-8,'Líquido preservado comércio');

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
 close(r2027.price,98.38684210526316,0.001,'Preço projetado serviço 2027');
close(r2027.net,rBase.net,1e-8,'Líquido preservado serviço');

// Preservação do líquido ao longo da transição.
for(let year=2027;year<=2033;year++){
 const x=engine.futurePriceScenario(presumido,year);
 close(x.net,pBase.net,1e-7,`Líquido deve permanecer estável em ${year}`);
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


// IRPJ e CSLL — Lucro Presumido, comércio, R$ 100 mil/mês.
const presumidoIncome={
 ...revenue,
 purchases:{creditablePct:0,usePct:100},
 incomeTax:{
  period:'mensal',
  presumedActivity:'commerce_industry',
  irpjPresumptionPct:8,
  csllPresumptionPct:12,
  annualRevenueProjection:1200000
 }
};
const pi=engine.currentRevenueScenario(presumidoIncome);
close(pi.irpj,1200,0.01,'IRPJ mensal estimado no Lucro Presumido');
close(pi.csll,1080,0.01,'CSLL mensal estimada no Lucro Presumido');
close(pi.incomeTaxes,2280,0.01,'IRPJ + CSLL no Lucro Presumido');
close(pi.afterIncomeTaxes,pi.net-2280,0.01,'Saldo após tributos considerados');

// LC 224 — R$ 10 milhões/ano, comércio.
const lc224={
 regime:'presumido',
 amount:10000000,
 currentRates:{pis:.65,cofins:3,icms:18,iss:0,ipi:0},
 future:{mode:'rtav',reduction:0},
 hybridFuture:{mode:'rtav',reduction:0},
 purchases:{creditablePct:0,usePct:100},
 incomeTax:{
  period:'anual',
  presumedActivity:'commerce_industry',
  irpjPresumptionPct:8,
  csllPresumptionPct:12,
  annualRevenueProjection:10000000
 }
};
const lc=engine.currentRevenueScenario(lc224);
close(lc.incomeTaxDetail.irpjBase,840000,0.01,'Base anual IRPJ com LC 224');
close(lc.incomeTaxDetail.csllBase,1260000,0.01,'Base anual CSLL com LC 224');
close(lc.irpj,186000,0.01,'IRPJ anual com adicional');
close(lc.csll,113400,0.01,'CSLL anual');
close(lc.incomeTaxes,299400,0.01,'IRPJ + CSLL anual');

// Lucro Real — bases tributáveis informadas diretamente.
const realIncome={
 regime:'real',
 amount:100000,
 currentRates:{pis:1.65,cofins:7.6,icms:0,iss:5,ipi:0},
 future:{mode:'rtav',reduction:0},
 hybridFuture:{mode:'rtav',reduction:0},
 purchases:{creditablePct:0,usePct:100},
 incomeTax:{period:'mensal',realIrpjBase:30000,realCsllBase:30000}
};
const ri=engine.currentRevenueScenario(realIncome);
close(ri.irpj,5500,0.01,'IRPJ mensal no Lucro Real');
close(ri.csll,2700,0.01,'CSLL mensal no Lucro Real');
close(ri.incomeTaxes,8200,0.01,'IRPJ + CSLL no Lucro Real');

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
assert.ok(rules.metadata.warning.includes('Premissas'));

console.log('✓ tax-engine: todos os testes passaram');
