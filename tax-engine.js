(function(root,factory){
 let rules=root.RTAV_RULES;
 if(!rules&&typeof require==='function'){
  try{rules=require('./tax-rules.js');}catch(e){}
 }
 const api=factory(rules);
 if(typeof module!=='undefined'&&module.exports) module.exports=api;
 root.RTAV_ENGINE=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(RULES){
 if(!RULES) throw new Error('RTAV_RULES não carregado');

 const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number(v)||0));
 const effectPct=(before,after)=>before?((after/before)-1)*100:0;
 const isSimple=r=>r==='simples'||r==='simples_hybrid';

 function snBand(rbt12){
  const r=Math.max(0,Number(rbt12)||0);
  if(r<=180000)return 0;
  if(r<=360000)return 1;
  if(r<=720000)return 2;
  if(r<=1800000)return 3;
  if(r<=3600000)return 4;
  return 5;
 }

 function snRateRow(year,annex='III',rbt12=0){
  const table=RULES.simpleTables[annex]||RULES.simpleTables.III;
  const rows=(year===2027||year===2028)?table.rates27:table.rates26;
  const band=snBand(rbt12);
  return {band,row:rows[band]};
 }

 function snEffective(year,annex='III',rbt12=0){
  const {band,row}=snRateRow(year,annex,rbt12);
  const r=Math.max(0,Number(rbt12)||0);
  const nominal=row[1]/100;
  const deduction=row[2];
  const eff=r?Math.max(0,(r*nominal-deduction)/r):0;
  return {band,nominal,deduction,eff};
 }

 function snShares(year,annex='III',rbt12=0){
  const t=RULES.simpleTables[annex]||RULES.simpleTables.III;
  const {band,eff}=snEffective(year,annex,rbt12);
  let cbsShare=0,ibsShare=0,oldShare=0;

  if(year===2027||year===2028){
   cbsShare=t.cbs27[band]||0;
   ibsShare=t.ibs27[band]||0;
   oldShare=t.oldBase[band]||0;
  }else{
   cbsShare=t.cbs29[band]||0;
   const base=t.oldBase[band]||0;
   const ibsFactor=year===2029?.10:year===2030?.20:year===2031?.30:year===2032?.40:1;
   oldShare=base*(1-ibsFactor);
   ibsShare=base*ibsFactor;
  }

  if(band===4&&annex==='III'&&eff>.1492537&&year<=2032){
   if(year===2027||year===2028){
    const residual=Math.max(0,eff-.05);
    return {band,eff,cbsEff:residual*.2320,ibsEff:residual*.0026,oldEff:.05,otherEff:Math.max(0,eff-(residual*.2320)-(residual*.0026)-.05),special:true};
   }
   const residual=Math.max(0,eff-.05);
   const ibsFixed=year===2029?.005:year===2030?.01:year===2031?.015:year===2032?.02:.05;
   const oldFixed=Math.max(0,.05-ibsFixed);
   const cbsEff=residual*.2346;
   return {band,eff,cbsEff,ibsEff:ibsFixed,oldEff:oldFixed,otherEff:Math.max(0,eff-cbsEff-ibsFixed-oldFixed),special:true};
  }

  if(band===4&&annex==='IV'&&eff>.125&&year<=2032){
   if(year===2027||year===2028){
    const residual=Math.max(0,eff-.05);
    return {band,eff,cbsEff:residual*.3627,ibsEff:residual*.0040,oldEff:.05,otherEff:Math.max(0,eff-(residual*.3627)-(residual*.0040)-.05),special:true};
   }
   const residual=Math.max(0,eff-.05);
   const ibsFixed=year===2029?.005:year===2030?.01:year===2031?.015:year===2032?.02:.05;
   const oldFixed=Math.max(0,.05-ibsFixed);
   const cbsEff=residual*.3667;
   return {band,eff,cbsEff,ibsEff:ibsFixed,oldEff:oldFixed,otherEff:Math.max(0,eff-cbsEff-ibsFixed-oldFixed),special:true};
  }

  const cbsEff=eff*(cbsShare/100);
  const ibsEff=eff*(ibsShare/100);
  const oldEff=eff*(oldShare/100);
  return {band,eff,cbsEff,ibsEff,oldEff,otherEff:Math.max(0,eff-cbsEff-ibsEff-oldEff),special:false};
 }

 function resolveRegularRates(year,options={}){
  const p=RULES.transition[year]||RULES.transition[2027];
  const mode=options.mode||'rtav';
  const reduction=clamp(options.reduction,0,100);
  const factor=1-reduction/100;
  const cbs=(mode==='rtav'?p.cbs:clamp(options.cbs,0,100))*factor;
  const ibs=(mode==='rtav'?p.ibs:clamp(options.ibs,0,100))*factor;
  return {cbs,ibs,reduction,mode};
 }

 function normalizeInput(input={}){
  const activity=input.incomeTax?.presumedActivity||'commerce_industry';
  const preset=RULES.incomeTaxes?.presumptions?.[activity]||RULES.incomeTaxes?.presumptions?.commerce_industry||{irpj:8,csll:12};
  return {
   regime:input.regime||'presumido',
   amount:Math.max(0,Number(input.amount)||0),
   currentRates:{
    pis:clamp(input.currentRates?.pis,0,100),
    cofins:clamp(input.currentRates?.cofins,0,100),
    icms:clamp(input.currentRates?.icms,0,100),
    iss:clamp(input.currentRates?.iss,0,100),
    ipi:clamp(input.currentRates?.ipi,0,100)
   },
   simple:{annex:input.simple?.annex||'III',rbt12:Math.max(0,Number(input.simple?.rbt12)||0)},
   future:{
    mode:input.future?.mode||'rtav',reduction:clamp(input.future?.reduction,0,100),
    cbs:clamp(input.future?.cbs,0,100),ibs:clamp(input.future?.ibs,0,100)
   },
   hybridFuture:{
    mode:input.hybridFuture?.mode||'rtav',reduction:clamp(input.hybridFuture?.reduction,0,100),
    cbs:clamp(input.hybridFuture?.cbs,0,100),ibs:clamp(input.hybridFuture?.ibs,0,100)
   },
   buyer:{
    profile:input.buyer?.profile||'b2c',
    currentCredit:Math.max(0,Number(input.buyer?.currentCredit)||0),
    usePct:clamp(input.buyer?.usePct??100,0,100)
   },
   purchases:{
    creditablePct:clamp(input.purchases?.creditablePct,0,100),
    usePct:clamp(input.purchases?.usePct??100,0,100)
   },
   incomeTax:{
    period:input.incomeTax?.period==='anual'?'anual':'mensal',
    presumedActivity:activity,
    irpjPresumptionPct:clamp(input.incomeTax?.irpjPresumptionPct??preset.irpj,0,100),
    csllPresumptionPct:clamp(input.incomeTax?.csllPresumptionPct??preset.csll,0,100),
    annualRevenueProjection:Math.max(0,Number(input.incomeTax?.annualRevenueProjection)||0),
    realIrpjBase:Math.max(0,Number(input.incomeTax?.realIrpjBase)||0),
    realCsllBase:Math.max(0,Number(input.incomeTax?.realCsllBase)||0)
   }
  };
 }

 function paramsForYear(input,year){
  const cfg=normalizeInput(input);
  const r=cfg.regime;
  if(r==='simples'){
   const sh=snShares(year,cfg.simple.annex,cfg.simple.rbt12);
   return {type:'simple',dasRate:sh.eff,cbsInside:sh.cbsEff,ibsInside:sh.ibsEff,source:sh};
  }
  if(r==='simples_hybrid'){
   const sh=snShares(year,cfg.simple.annex,cfg.simple.rbt12);
   const rates=resolveRegularRates(year,cfg.hybridFuture);
   return {type:'hybrid',remRate:Math.max(0,sh.eff-sh.cbsEff-sh.ibsEff),cbsRate:rates.cbs/100,ibsRate:rates.ibs/100,source:sh,rates};
  }
  const p=RULES.transition[year]||RULES.transition[2027];
  const oldRate=((cfg.currentRates.icms+cfg.currentRates.iss)*p.old)/100;
  const rates=resolveRegularRates(year,cfg.future);
  return {type:'regular',remRate:oldRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100,rates};
 }

 function currentBaseScenario(input,kind){
  const cfg=normalizeInput(input);
  const value=cfg.amount;
  let taxes=0,components={};

  if(isSimple(cfg.regime)){
   const eff=snEffective(2026,cfg.simple.annex,cfg.simple.rbt12).eff;
   taxes=value*eff;
   components={das:taxes};
  }else{
   const r=cfg.currentRates;
   components={
    pis:value*r.pis/100,
    cofins:value*r.cofins/100,
    icms:value*r.icms/100,
    iss:value*r.iss/100,
    ipi:value*r.ipi/100
   };
   taxes=Object.values(components).reduce((a,b)=>a+b,0);
  }
  const net=Math.max(0,value-taxes);

  if(kind==='price'){
   const buyerCredit=cfg.buyer.profile==='b2b'?Math.min(value,cfg.buyer.currentCredit):0;
   return {year:2026,regime:cfg.regime,price:value,taxes,net,components,cbs:null,ibs:null,remnant:taxes,buyerCredit,buyerCost:Math.max(0,value-buyerCredit)};
  }

  return {year:2026,regime:cfg.regime,revenue:value,taxes,net,components,cbs:null,ibs:null,remnant:taxes,purchaseCredit:0,netTax:taxes,economicNet:net};
 }

 function incomeTaxEstimate(input,revenue){
  const cfg=normalizeInput(input);
  const rules=RULES.incomeTaxes||{};
  const value=Math.max(0,Number(revenue)||0);
  const period=cfg.incomeTax.period;
  const months=period==='anual'?12:1;

  if(cfg.regime!=='presumido'&&cfg.regime!=='real'){
   return {applicable:false,method:'none',irpjBase:0,csllBase:0,irpj:0,csll:0,total:0};
  }

  if(cfg.regime==='presumido'){
   const annualReference=cfg.incomeTax.annualRevenueProjection>0
    ?cfg.incomeTax.annualRevenueProjection
    :cfg.amount*(period==='anual'?1:12);
   const scale=cfg.amount>0?value/cfg.amount:1;
   const annualRevenue=Math.max(0,annualReference*scale);
   const threshold=Number(rules.presumedAnnualThreshold)||5000000;
   const regularRevenue=Math.min(annualRevenue,threshold);
   const excessRevenue=Math.max(0,annualRevenue-threshold);
   const boost=1+(Number(rules.lc224PresumptionIncrease)||10)/100;
   const irpjPct=cfg.incomeTax.irpjPresumptionPct/100;
   const csllPct=cfg.incomeTax.csllPresumptionPct/100;
   const irpjBaseAnnual=regularRevenue*irpjPct+excessRevenue*irpjPct*boost;
   const csllBaseAnnual=regularRevenue*csllPct+excessRevenue*csllPct*boost;
   const additionalThreshold=(Number(rules.irpjAdditionalMonthlyThreshold)||20000)*12;
   const irpjAnnual=irpjBaseAnnual*((Number(rules.irpjRate)||15)/100)
    +Math.max(0,irpjBaseAnnual-additionalThreshold)*((Number(rules.irpjAdditionalRate)||10)/100);
   const csllAnnual=csllBaseAnnual*((Number(rules.csllGeneralRate)||9)/100);
   const divisor=period==='anual'?1:12;
   return {
    applicable:true,method:'presumido',period,annualRevenue,
    irpjBase:irpjBaseAnnual/divisor,csllBase:csllBaseAnnual/divisor,
    irpj:irpjAnnual/divisor,csll:csllAnnual/divisor,total:(irpjAnnual+csllAnnual)/divisor,
    lc224ExcessAnnual:excessRevenue,
    irpjPresumptionPct:cfg.incomeTax.irpjPresumptionPct,
    csllPresumptionPct:cfg.incomeTax.csllPresumptionPct
   };
  }

  const scale=cfg.amount>0?value/cfg.amount:1;
  const irpjBase=cfg.incomeTax.realIrpjBase*scale;
  const csllBase=cfg.incomeTax.realCsllBase*scale;
  const threshold=(Number(rules.irpjAdditionalMonthlyThreshold)||20000)*months;
  const irpj=irpjBase*((Number(rules.irpjRate)||15)/100)
   +Math.max(0,irpjBase-threshold)*((Number(rules.irpjAdditionalRate)||10)/100);
  const csll=csllBase*((Number(rules.csllGeneralRate)||9)/100);
  return {
   applicable:true,method:'real',period,irpjBase,csllBase,irpj,csll,total:irpj+csll,
   baseScale:scale
  };
 }

 function attachIncomeTaxes(input,scenario){
  const inc=incomeTaxEstimate(input,scenario.revenue);
  const beforeIncomeTaxes=scenario.economicNet??scenario.net;
  return Object.assign({},scenario,{
   irpj:inc.irpj,
   csll:inc.csll,
   incomeTaxes:inc.total,
   incomeTaxDetail:inc,
   beforeIncomeTaxes,
   afterIncomeTaxes:beforeIncomeTaxes-inc.total
  });
 }

 function currentPriceScenario(input){return currentBaseScenario(input,'price');}
 function currentRevenueScenario(input){return attachIncomeTaxes(input,currentBaseScenario(input,'revenue'));}

 function priceScenarioAtPrice(input,year,projected){
  const cfg=normalizeInput(input);
  const p=paramsForYear(cfg,year);
  const price=Math.max(0,Number(projected)||0);
  let cbs=0,ibs=0,remnant=0,taxes=0,net=0,cleanBase=0;

  if(p.type==='simple'){
   taxes=price*p.dasRate;
   cbs=price*p.cbsInside;
   ibs=price*p.ibsInside;
   remnant=Math.max(0,taxes-cbs-ibs);
   net=Math.max(0,price-taxes);
   cleanBase=net;
  }else{
   const newRate=p.cbsRate+p.ibsRate;
   cleanBase=(1+newRate)>0?price*(1-p.remRate)/(1+newRate):0;
   cbs=cleanBase*p.cbsRate;
   ibs=cleanBase*p.ibsRate;
   remnant=price*p.remRate;
   taxes=cbs+ibs+remnant;
   net=Math.max(0,price-taxes);
  }

  const buyerCredit=cfg.buyer.profile==='b2b'?(cbs+ibs)*(cfg.buyer.usePct/100):0;
  return {year,regime:cfg.regime,price,cbs,ibs,remnant,taxes,net,cleanBase,buyerCredit,buyerCost:Math.max(0,price-buyerCredit),params:p};
 }

 function futurePriceScenario(input,year,keepGross=false){
  const cfg=normalizeInput(input);
  const base=currentPriceScenario(cfg);
  const p=paramsForYear(cfg,year);
  let projected=base.price;

  if(!keepGross){
   if(p.type==='simple') projected=(1-p.dasRate)>0?base.net/(1-p.dasRate):0;
   else{
    const newRate=p.cbsRate+p.ibsRate;
    projected=(1-p.remRate)>0?base.net*(1+newRate)/(1-p.remRate):0;
   }
  }

  const out=priceScenarioAtPrice(cfg,year,Math.max(0,projected));
  out.priceDelta=effectPct(base.price,out.price);
  return out;
 }

 function revenueScenarioAtRevenue(input,year,gross){
  const cfg=normalizeInput(input);
  const p=paramsForYear(cfg,year);
  const revenue=Math.max(0,Number(gross)||0);
  let cbs=0,ibs=0,remnant=0,taxes=0,net=0,cleanBase=0;

  if(p.type==='simple'){
   taxes=revenue*p.dasRate;
   cbs=revenue*p.cbsInside;
   ibs=revenue*p.ibsInside;
   remnant=Math.max(0,taxes-cbs-ibs);
   net=Math.max(0,revenue-taxes);
   cleanBase=net;
  }else{
   const newRate=p.cbsRate+p.ibsRate;
   cleanBase=(1+newRate)>0?revenue*(1-p.remRate)/(1+newRate):0;
   cbs=cleanBase*p.cbsRate;
   ibs=cleanBase*p.ibsRate;
   remnant=revenue*p.remRate;
   taxes=cbs+ibs+remnant;
   net=Math.max(0,revenue-taxes);
  }

  const purchaseCredit=p.type==='simple'?0:revenue*(cfg.purchases.creditablePct/100)*((p.cbsRate||0)+(p.ibsRate||0))*(cfg.purchases.usePct/100);
  const netTax=Math.max(0,taxes-purchaseCredit);
  const economicNet=Math.max(0,revenue-netTax);
  return attachIncomeTaxes(cfg,{year,regime:cfg.regime,revenue,cbs,ibs,remnant,taxes,net,cleanBase,purchaseCredit,netTax,economicNet,params:p});
 }

 function futureRevenueScenario(input,year,keepGross=false){
  const cfg=normalizeInput(input);
  const base=currentRevenueScenario(cfg);
  const p=paramsForYear(cfg,year);
  let gross=base.revenue;

  if(!keepGross){
   if(p.type==='simple') gross=(1-p.dasRate)>0?base.net/(1-p.dasRate):0;
   else{
    const newRate=p.cbsRate+p.ibsRate;
    gross=(1-p.remRate)>0?base.net*(1+newRate)/(1-p.remRate):0;
   }
  }

  const out=revenueScenarioAtRevenue(cfg,year,Math.max(0,gross));
  out.delta=effectPct(base.revenue,out.revenue);
  return out;
 }

 function validateInput(input,kind='price'){
  const cfg=normalizeInput(input);
  const messages=[];
  if(cfg.amount<=0) messages.push({level:'error',code:'amount',message:kind==='price'?'Informe um preço maior que zero.':'Informe um faturamento maior que zero.'});

  if(isSimple(cfg.regime)){
   if(cfg.simple.rbt12<=0) messages.push({level:'error',code:'rbt12',message:'Informe o RBT12 para calcular a alíquota efetiva do Simples.'});
   if(cfg.simple.rbt12>3600000) messages.push({level:'warning',code:'sublimite',message:'RBT12 acima de R$ 3,6 milhões exige validação específica do sublimite e da parcela estadual/municipal.'});
   if(cfg.simple.rbt12>4800000) messages.push({level:'warning',code:'simples_limit',message:'RBT12 acima de R$ 4,8 milhões está fora do limite geral tratado pelas tabelas automáticas do Simples desta ferramenta.'});
  }else{
   const total=Object.values(cfg.currentRates).reduce((a,b)=>a+b,0);
   if(total>=100) messages.push({level:'error',code:'current_rates',message:'A soma das alíquotas atuais não pode consumir 100% ou mais do valor informado.'});
   else if(total>50) messages.push({level:'warning',code:'current_rates_high',message:'A soma das alíquotas atuais está acima de 50%. Confirme se os percentuais foram informados corretamente.'});
  }

  if(kind==='price'&&cfg.buyer.profile==='b2b'&&cfg.buyer.currentCredit>cfg.amount){
   messages.push({level:'warning',code:'buyer_credit',message:'O crédito atual informado é maior que o preço. O cálculo limita o crédito ao valor da venda.'});
  }

  if(kind==='revenue'&&cfg.regime==='simples'&&cfg.purchases.creditablePct>0){
   messages.push({level:'info',code:'simple_credit',message:'No Simples padrão, a simulação não apropria créditos de IBS/CBS das aquisições dentro do regime.'});
  }

  if(kind==='revenue'&&cfg.regime==='real'&&cfg.incomeTax.realIrpjBase===0&&cfg.incomeTax.realCsllBase===0){
   messages.push({level:'info',code:'real_income_tax_base',message:'Informe as bases tributáveis estimadas do IRPJ e da CSLL para incluir esses tributos no Lucro Real.'});
  }
  if(kind==='revenue'&&cfg.regime==='presumido'&&cfg.incomeTax.annualRevenueProjection<=0){
   messages.push({level:'warning',code:'presumed_annual_revenue',message:'Informe a receita anual projetada para aplicar corretamente a estimativa do Lucro Presumido e a regra da LC 224.'});
  }

  const futureMode=cfg.regime==='simples_hybrid'?cfg.hybridFuture.mode:cfg.future.mode;
  const futureCfg=cfg.regime==='simples_hybrid'?cfg.hybridFuture:cfg.future;
  if(futureMode==='manual'&&futureCfg.cbs===0&&futureCfg.ibs===0){
   messages.push({level:'warning',code:'manual_zero',message:'Modo manual selecionado com CBS e IBS iguais a zero. Confirme a premissa.'});
  }

  return messages;
 }

 function priceMemory(input,year){
  const cfg=normalizeInput(input);
  const base=currentPriceScenario(cfg);
  if(Number(year)===2026){
   return [
    ['Preço bruto 2026',base.price],
    ['Tributos atuais considerados',base.taxes],
    ['Valor líquido 2026',base.net]
   ];
  }
  const x=futurePriceScenario(cfg,Number(year));
  const p=x.params;
  const rows=[
   ['Valor líquido preservado de 2026',base.net],
   ['Base limpa usada no novo sistema',x.cleanBase],
   ['CBS calculada',x.cbs],
   ['IBS calculado',x.ibs],
   ['Tributos/DAS remanescentes',x.remnant],
   ['Total de tributos',x.taxes],
   ['Preço projetado',x.price]
  ];
  if(cfg.buyer.profile==='b2b'){
   rows.push(['Crédito potencial do comprador',x.buyerCredit],['Custo efetivo do comprador',x.buyerCost]);
  }
  rows.push(['Tipo do cenário',p.type]);
  return rows;
 }

 function revenueMemory(input,year){
  const cfg=normalizeInput(input);
  const base=currentRevenueScenario(cfg);
  if(Number(year)===2026){
   const rows=[
    ['Faturamento bruto 2026',base.revenue],
    ['Tributos sobre vendas considerados',base.taxes],
    ['Receita após tributos sobre vendas',base.net]
   ];
   if(base.incomeTaxDetail?.applicable){
    rows.push(['IRPJ estimado',base.irpj],['CSLL estimada',base.csll],['IRPJ + CSLL',base.incomeTaxes],['Saldo após tributos considerados',base.afterIncomeTaxes]);
   }
   return rows;
  }
  const x=futureRevenueScenario(cfg,Number(year));
  const rows=[
   ['Receita após tributos sobre vendas preservada de 2026',base.net],
   ['Base limpa usada no novo sistema',x.cleanBase],
   ['CBS calculada',x.cbs],
   ['IBS calculado',x.ibs],
   ['Tributos/DAS remanescentes',x.remnant],
   ['Tributos brutos sobre vendas',x.taxes],
   ['Créditos estimados das aquisições',x.purchaseCredit],
   ['Carga líquida sobre vendas após créditos',x.netTax],
   ['Faturamento bruto projetado',x.revenue]
  ];
  if(x.incomeTaxDetail?.applicable){
   rows.push(['IRPJ estimado',x.irpj],['CSLL estimada',x.csll],['IRPJ + CSLL',x.incomeTaxes],['Saldo após tributos considerados',x.afterIncomeTaxes]);
  }
  return rows;
 }

 return Object.freeze({
  version:'1.1.0',
  rulesVersion:RULES.version,
  clamp,effectPct,isSimple,snBand,snRateRow,snEffective,snShares,resolveRegularRates,normalizeInput,paramsForYear,
  currentPriceScenario,priceScenarioAtPrice,futurePriceScenario,
  currentRevenueScenario,revenueScenarioAtRevenue,futureRevenueScenario,incomeTaxEstimate,
  validatePriceInput:input=>validateInput(input,'price'),
  validateRevenueInput:input=>validateInput(input,'revenue'),
  priceMemory,revenueMemory
 });
});
