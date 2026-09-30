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
 const operationUsesIcms=op=>op==='mercadoria'||op==='industria';
 const operationUsesIss=op=>op==='servico';

 function inferOperationType(input={}){
  if(['mercadoria','industria','servico'].includes(input.operationType)) return input.operationType;
  const r=input.currentRates||{};
  if((Number(r.iss)||0)>0&&(Number(r.icms)||0)<=0) return 'servico';
  if((Number(r.ipi)||0)>0) return 'industria';
  return 'mercadoria';
 }

 function legacyTaxBreakdown(amount,currentRates={},operationType='mercadoria'){
  const value=Math.max(0,Number(amount)||0);
  const r={
   pis:clamp(currentRates.pis,0,100),cofins:clamp(currentRates.cofins,0,100),
   icms:clamp(currentRates.icms,0,100),iss:clamp(currentRates.iss,0,100),ipi:clamp(currentRates.ipi,0,100)
  };
  const usesIcms=operationUsesIcms(operationType);
  const usesIss=operationUsesIss(operationType);
  const icms=usesIcms?value*r.icms/100:0;
  const iss=usesIss?value*r.iss/100:0;
  const ipi=operationType==='industria'?value*r.ipi/100:0;
  // Desde 2023, o ICMS destacado não integra a base do PIS/Cofins.
  // Para serviços, esta ferramenta não presume exclusão do ISS: use as alíquotas
  // efetivas aplicáveis ou uma simulação separada quando houver tratamento distinto.
  const pisCofinsBase=Math.max(0,value-icms);
  const pis=pisCofinsBase*r.pis/100;
  const cofins=pisCofinsBase*r.cofins/100;
  const components={pis,cofins,icms,iss,ipi};
  const taxes=Object.values(components).reduce((a,b)=>a+b,0);
  return {components,taxes,net:Math.max(0,value-taxes),pisCofinsBase,usesIcms,usesIss};
 }

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
   const specialByYear={
    2027:{iss:.05,cbs:.2320,ibs:.0026},2028:{iss:.05,cbs:.2320,ibs:.0026},
    2029:{iss:.045,cbs:.2233,ibs:.0480},
    2030:{iss:.040,cbs:.2131,ibs:.0915},
    2031:{iss:.035,cbs:.2038,ibs:.1313},
    2032:{iss:.030,cbs:.1952,ibs:.1677}
   };
   const sp=specialByYear[year];
   const residual=Math.max(0,eff-sp.iss);
   const cbsEff=residual*sp.cbs,ibsEff=residual*sp.ibs,oldEff=sp.iss;
   return {band,eff,cbsEff,ibsEff,oldEff,otherEff:Math.max(0,eff-cbsEff-ibsEff-oldEff),special:true};
  }

  if(band===4&&annex==='IV'&&eff>.125&&year<=2032){
   if(year===2027||year===2028){
    const residual=Math.max(0,eff-.05);
    return {band,eff,cbsEff:residual*.3627,ibsEff:residual*.0040,oldEff:.05,otherEff:Math.max(0,eff-(residual*.3627)-(residual*.0040)-.05),special:true};
   }
   const specialByYear={
    2029:{iss:.045,cbs:.3438,ibs:.0625},
    2030:{iss:.040,cbs:.3235,ibs:.1176},
    2031:{iss:.035,cbs:.3056,ibs:.1667},
    2032:{iss:.030,cbs:.2895,ibs:.2105}
   };
   const sp=specialByYear[year];
   const residual=Math.max(0,eff-sp.iss);
   const cbsEff=residual*sp.cbs,ibsEff=residual*sp.ibs,oldEff=sp.iss;
   return {band,eff,cbsEff,ibsEff,oldEff,otherEff:Math.max(0,eff-cbsEff-ibsEff-oldEff),special:true};
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
  const operationType=inferOperationType(input);
  return {
   regime:input.regime||'presumido',
   operationType,
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
    cbs:clamp(input.future?.cbs,0,100),ibs:clamp(input.future?.ibs,0,100),
    selective:clamp(input.future?.selective,0,100)
   },
   hybridFuture:{
    mode:input.hybridFuture?.mode||'rtav',reduction:clamp(input.hybridFuture?.reduction,0,100),
    cbs:clamp(input.hybridFuture?.cbs,0,100),ibs:clamp(input.hybridFuture?.ibs,0,100),
    selective:clamp(input.hybridFuture?.selective,0,100)
   },
   buyer:{
    profile:input.buyer?.profile||'b2c',
    currentCredit:Math.max(0,Number(input.buyer?.currentCredit)||0),
    usePct:clamp(input.buyer?.usePct??100,0,100)
   },
   purchases:{
    enabled:!!input.purchases?.enabled,
    mode:input.purchases?.mode==='manual'?'manual':'estimate',
    creditablePct:clamp(input.purchases?.creditablePct,0,100),
    usePct:clamp(input.purchases?.usePct??100,0,100),
    cbsCredit:Math.max(0,Number(input.purchases?.cbsCredit)||0),
    ibsCredit:Math.max(0,Number(input.purchases?.ibsCredit)||0)
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
   return {type:'hybrid',excludedRate:sh.oldEff,excludedLabel:['I','II'].includes(cfg.simple.annex)?'ICMS':'ISS',remRate:Math.max(0,sh.eff-sh.cbsEff-sh.ibsEff),cbsRate:rates.cbs/100,ibsRate:rates.ibs/100,source:sh,rates};
  }
  const p=RULES.transition[year]||RULES.transition[2027];
  const currentOldRate=operationUsesIss(cfg.operationType)?cfg.currentRates.iss:cfg.currentRates.icms;
  const oldRate=(currentOldRate*p.old)/100;
  const rates=resolveRegularRates(year,cfg.future);
  return {type:'regular',remRate:oldRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100,
   selectiveRate:cfg.future.selective/100,rates};
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
   const legacy=legacyTaxBreakdown(value,cfg.currentRates,cfg.operationType);
   components=legacy.components;
   taxes=legacy.taxes;
  }
  const net=Math.max(0,value-taxes);

  if(kind==='price'){
   const buyerCredit=Math.min(value,cfg.buyer.currentCredit);
   const buyerCost=Math.max(0,value-buyerCredit);
   return {year:2026,regime:cfg.regime,price:value,taxes,net,components,cbs:null,ibs:null,remnant:taxes,buyerCredit,buyerCost,effectiveCost:buyerCost};
  }

  return {year:2026,regime:cfg.regime,revenue:value,taxes,net,components,cbs:null,ibs:null,remnant:taxes,purchaseCredit:0,netTax:taxes,economicNet:net};
 }

 function currentPriceScenario(input){return currentBaseScenario(input,'price');}
 function currentRevenueScenario(input){return currentBaseScenario(input,'revenue');}


 // No híbrido, CBS/IBS ficam fora da base do DAS. Apenas a parcela
 // de ICMS/ISS do DAS residual é excluída da base dos novos tributos.
 function hybridAtGross(p,gross){
  const newRate=p.cbsRate+p.ibsRate;
  const residualBase=gross/(1+(1-p.excludedRate)*newRate);
  const excludedTax=residualBase*p.excludedRate;
  const cleanBase=residualBase-excludedTax;
  const cbs=cleanBase*p.cbsRate,ibs=cleanBase*p.ibsRate;
  const remnant=residualBase*p.remRate;
  const taxes=cbs+ibs+remnant;
  return {residualBase,excludedTax,cleanBase,cbs,ibs,remnant,taxes,net:Math.max(0,gross-taxes)};
 }

 function hybridGrossFromNet(p,net){
  const residualBase=(1-p.remRate)>0?net/(1-p.remRate):0;
  return residualBase*(1+(1-p.excludedRate)*(p.cbsRate+p.ibsRate));
 }

 function hybridBaseMemory(x){
  if(x.params?.type!=='hybrid') return [];
  return [
   ['Base do DAS residual (sem CBS/IBS)',x.residualBase],
   [x.params.excludedLabel+' no DAS residual — excluído da base CBS/IBS',x.excludedTax]
  ];
 }

 function priceScenarioAtPrice(input,year,projected){
  const cfg=normalizeInput(input);
  const p=paramsForYear(cfg,year);
  const price=Math.max(0,Number(projected)||0);
  let cbs=0,ibs=0,selectiveTax=0,remnant=0,taxes=0,net=0,cleanBase=0,residualBase=null,excludedTax=0;

  if(p.type==='simple'){
   taxes=price*p.dasRate;
   cbs=price*p.cbsInside;
   ibs=price*p.ibsInside;
   remnant=Math.max(0,taxes-cbs-ibs);
   net=Math.max(0,price-taxes);
   cleanBase=net;
  }else if(p.type==='hybrid'){
   ({cbs,ibs,remnant,taxes,net,cleanBase,residualBase,excludedTax}=hybridAtGross(p,price));
  }else{
   const newRate=p.cbsRate+p.ibsRate;
   const selectiveRate=p.selectiveRate||0;
   cleanBase=(1+newRate)>0?price*(1-p.remRate)/((1+selectiveRate)*(1+newRate)):0;
   selectiveTax=cleanBase*selectiveRate;
   const ivaBase=cleanBase+selectiveTax;
   cbs=ivaBase*p.cbsRate;
   ibs=ivaBase*p.ibsRate;
   remnant=price*p.remRate;
   taxes=cbs+ibs+selectiveTax+remnant;
   net=Math.max(0,price-taxes);
  }

  const creditEligible=!!cfg.purchases.enabled;
  const buyerCredit=creditEligible?(cbs+ibs):0;
  const buyerCost=Math.max(0,price-buyerCredit);
  return {year,regime:cfg.regime,price,cbs,ibs,selectiveTax,remnant,taxes,net,cleanBase,residualBase,excludedTax,creditEligible,purchaseCredit:buyerCredit,netTax:Math.max(0,taxes-buyerCredit),economicNet:buyerCost,buyerCredit,buyerCost,effectiveCost:buyerCost,params:p};
 }

 function futurePriceScenario(input,year,keepGross=false){
  const cfg=normalizeInput(input);
  const base=currentPriceScenario(cfg);
  const p=paramsForYear(cfg,year);
  let projected=base.price;

  if(!keepGross){
   if(p.type==='simple') projected=(1-p.dasRate)>0?base.net/(1-p.dasRate):0;
   else if(p.type==='hybrid') projected=hybridGrossFromNet(p,base.net);
   else{
    const newRate=p.cbsRate+p.ibsRate;
    const selectiveRate=p.selectiveRate||0;
    projected=(1-p.remRate)>0?base.net*(1+selectiveRate)*(1+newRate)/(1-p.remRate):0;
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
  let cbs=0,ibs=0,selectiveTax=0,remnant=0,taxes=0,net=0,cleanBase=0,residualBase=null,excludedTax=0;

  if(p.type==='simple'){
   taxes=revenue*p.dasRate;
   cbs=revenue*p.cbsInside;
   ibs=revenue*p.ibsInside;
   remnant=Math.max(0,taxes-cbs-ibs);
   net=Math.max(0,revenue-taxes);
   cleanBase=net;
  }else if(p.type==='hybrid'){
   ({cbs,ibs,remnant,taxes,net,cleanBase,residualBase,excludedTax}=hybridAtGross(p,revenue));
  }else{
   const newRate=p.cbsRate+p.ibsRate;
   const selectiveRate=p.selectiveRate||0;
   cleanBase=(1+newRate)>0?revenue*(1-p.remRate)/((1+selectiveRate)*(1+newRate)):0;
   selectiveTax=cleanBase*selectiveRate;
   const ivaBase=cleanBase+selectiveTax;
   cbs=ivaBase*p.cbsRate;
   ibs=ivaBase*p.ibsRate;
   remnant=revenue*p.remRate;
   taxes=cbs+ibs+selectiveTax+remnant;
   net=Math.max(0,revenue-taxes);
  }

  let cbsCredit=0,ibsCredit=0;
  if(p.type!=='simple'){
   if(cfg.purchases.mode==='manual'){
    cbsCredit=cfg.purchases.cbsCredit;
    ibsCredit=cfg.purchases.ibsCredit;
   }else{
    const purchaseBase=revenue*(cfg.purchases.creditablePct/100)*(cfg.purchases.usePct/100);
    cbsCredit=purchaseBase*(p.cbsRate||0);
    ibsCredit=purchaseBase*(p.ibsRate||0);
   }
  }
  const purchaseCredit=cbsCredit+ibsCredit;
  const cbsPayable=Math.max(0,cbs-cbsCredit);
  const ibsPayable=Math.max(0,ibs-ibsCredit);
  const cbsCreditBalance=Math.max(0,cbsCredit-cbs);
  const ibsCreditBalance=Math.max(0,ibsCredit-ibs);
  const creditBalance=cbsCreditBalance+ibsCreditBalance;
  // Créditos de CBS/IBS não reduzem ICMS/ISS remanescente nem Imposto Seletivo.
  const netTax=remnant+selectiveTax+cbsPayable+ibsPayable;
  const economicNet=Math.max(0,revenue-netTax);
  return {year,regime:cfg.regime,revenue,cbs,ibs,selectiveTax,remnant,taxes,net,cleanBase,residualBase,excludedTax,
   purchaseCredit,cbsCredit,ibsCredit,cbsPayable,ibsPayable,cbsCreditBalance,ibsCreditBalance,creditBalance,netTax,economicNet,params:p};
 }

 function futureRevenueScenario(input,year,keepGross=false){
  const cfg=normalizeInput(input);
  const base=currentRevenueScenario(cfg);
  const p=paramsForYear(cfg,year);
  let gross=base.revenue;

  if(!keepGross){
   if(p.type==='simple') gross=(1-p.dasRate)>0?base.net/(1-p.dasRate):0;
   else if(p.type==='hybrid') gross=hybridGrossFromNet(p,base.net);
   else{
    const newRate=p.cbsRate+p.ibsRate;
    const selectiveRate=p.selectiveRate||0;
    gross=(1-p.remRate)>0?base.net*(1+selectiveRate)*(1+newRate)/(1-p.remRate):0;
   }
  }

  const out=revenueScenarioAtRevenue(cfg,year,Math.max(0,gross));
  out.delta=effectPct(base.revenue,out.revenue);
  return out;
 }

 function supplierPurchaseComparison(input={},year=2027){
  const companyRegime=input.companyRegime||'presumido';
  const suppliers={};
  for(const key of ['presumido','real','simples','simples_hybrid']){
   const model=segmentedPurchaseComparison({...input,supplierRegime:key},Number(year));
   const buyer=model.buyers[companyRegime]||model.buyers.presumido;
   suppliers[key]={
    supplierRegime:key,price:Number(year)===2026?buyer.currentPrice:buyer.futurePrice,
    cbs:model.cbs||0,ibs:model.ibs||0,remnant:(model.oldTaxRemnant||0)+(model.dasRemnant||0),
    credit:Number(year)===2026?buyer.currentCredit:buyer.futureCredit,
    effectiveCost:Number(year)===2026?buyer.currentCost:buyer.futureCost
   };
  }
  return {year:Number(year),companyRegime,regularBuyer:companyRegime!=='simples',
   purchaseGeneratesCredit:input.purchaseGeneratesCredit!==false,
   creditUsePct:clamp(input.creditUsePct??100,0,100),
   creditEnabled:companyRegime!=='simples'&&input.purchaseGeneratesCredit!==false,
   amount:Math.max(0,Number(input.amount)||0),suppliers};
 }

 function supplierPriceProjection(input={},year=2027){
  const regime=['presumido','real','simples','simples_hybrid'].includes(input.supplierRegime)?input.supplierRegime:'presumido';
  const model=segmentedPurchaseComparison({...input,supplierRegime:regime},Number(year));
  return {regime,year:Number(year),currentPrice:model.currentPrice,currentTaxes:model.currentSupplierTaxes,
   currentComponents:{pisCofins:model.currentPisCofins,icms:model.currentIcms,iss:model.currentIss,ipi:model.currentIpi,das:model.currentDas},
   netPrice:model.economicBase,remainingRate:model.futureOldTaxPct/100,newRate:(model.cbsPct+model.ibsPct)/100,
   projectedPrice:model.futurePrice,method:'segmented_canonical'};
 }

 function buyerPurchaseComparison(input={},year=2027){
  const supplierRegime=['presumido','real','simples','simples_hybrid'].includes(input.supplierRegime)?input.supplierRegime:'presumido';
  const model=segmentedPurchaseComparison({...input,supplierRegime},Number(year));
  const buyers={};
  for(const regime of ['simples','presumido','real','simples_hybrid']){
   const x=model.buyers[regime];
   buyers[regime]={currentPrice:x.currentPrice,currentCredit:x.currentCredit,currentCost:x.currentCost,
    futurePrice:x.futurePrice,credit:x.futureCredit,effectiveCost:x.futureCost,changePct:x.changePct};
  }
  return {year:Number(year),supplierRegime,currentPrice:model.currentPrice,futurePrice:model.futurePrice,
   projection:supplierPriceProjection({...input,supplierRegime},year),
   cbs:model.cbs,ibs:model.ibs,cbsPct:model.cbsPct,ibsPct:model.ibsPct,
   remnant:(model.oldTaxRemnant||0)+(model.dasRemnant||0),estimatedCredit:model.cbs+model.ibs,
   futureCredit:model.cbs+model.ibs,buyers};
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

  if(kind==='price'&&cfg.purchases.enabled){
   messages.push({level:'info',code:'purchase_credit',message:'Crédito CBS/IBS ativado: o custo efetivo desconta os valores de CBS e IBS calculados nesta aquisição. O aproveitamento real depende do regime do adquirente e dos requisitos legais/documentais.'});
  }

  if(kind==='revenue'&&cfg.regime==='simples'&&(cfg.purchases.creditablePct>0||cfg.purchases.cbsCredit>0||cfg.purchases.ibsCredit>0)){
   messages.push({level:'info',code:'simple_credit',message:'No Simples padrão, a simulação não apropria créditos de IBS/CBS das aquisições dentro do regime.'});
  }
  if(kind==='revenue'&&!isSimple(cfg.regime)&&cfg.currentRates.icms>0&&cfg.currentRates.iss>0){
   messages.push({level:'error',code:'mixed_legacy',message:'Não aplique ICMS e ISS sobre o mesmo faturamento. Para atividade mista, faça cenários separados de mercadorias e serviços ou use alíquotas efetivas previamente ponderadas.'});
  }
  if(isSimple(cfg.regime)&&(cfg.future.selective>0||cfg.hybridFuture.selective>0)){
   messages.push({level:'warning',code:'selective_simple',message:'O Imposto Seletivo manual desta ferramenta está modelado para regimes regulares; valide separadamente operações do Simples sujeitas a regime específico.'});
  }

  const futureMode=cfg.regime==='simples_hybrid'?cfg.hybridFuture.mode:cfg.future.mode;
  const futureCfg=cfg.regime==='simples_hybrid'?cfg.hybridFuture:cfg.future;
  if(futureMode==='manual'&&futureCfg.cbs===0&&futureCfg.ibs===0){
   messages.push({level:'warning',code:'manual_zero',message:'Modo manual selecionado com CBS e IBS iguais a zero. Confirme a premissa.'});
  }

  return messages;
 }

 // Um fornecedor e uma cotação para todos os regimes de comprador.
 function buyerPurchaseComparison(input={},year=2027){
  const currentPrice=Math.max(0,Number(input.amount)||0);
  const supplierRegime=['presumido','real','simples','simples_hybrid'].includes(input.supplierRegime)?input.supplierRegime:'presumido';
  const projection=supplierPriceProjection({...input,supplierRegime},year);
  const futurePrice=projection.projectedPrice;
  const supplier=supplierPurchaseComparison({...input,companyRegime:'real',amount:futurePrice,
   projectFromCurrent:false,taxOnProjectedPrice:true,purchaseGeneratesCredit:true},year).suppliers[supplierRegime];
  const estimatedCredit=supplier.cbs+supplier.ibs;
  const futureCredit=estimatedCredit;
  const currentRealCredit=currentPrice*clamp(input.currentRealCreditPct,0,100)/100;
  const currentPresumedCredit=currentPrice*clamp(input.currentPresumedCreditPct,0,100)/100;
  const buyers={};
  for(const regime of ['simples','presumido','real','simples_hybrid']){
   const currentCredit=regime==='real'?currentRealCredit:regime==='presumido'?currentPresumedCredit:0;
   const credit=regime==='simples'||input.buyerPurchaseCredit===false?0:futureCredit;
   const currentCost=currentPrice-currentCredit;
   const effectiveCost=futurePrice-credit;
   buyers[regime]={currentPrice,currentCredit,currentCost,futurePrice,credit,effectiveCost,
    changePct:effectPct(currentCost,effectiveCost)};
  }
  return {year:Number(year),supplierRegime,currentPrice,futurePrice,projection,
   cbs:supplier.cbs,ibs:supplier.ibs,cbsPct:futurePrice?supplier.cbs/futurePrice*100:0,
   ibsPct:futurePrice?supplier.ibs/futurePrice*100:0,
   remnant:supplier.remnant,estimatedCredit,futureCredit,buyers};
 }


 // Compra comercial: preserva a base econômica do fornecedor e compara
 // o custo efetivo para quatro regimes de comprador.
 // Premissas didáticas do projeto:
 // - operação comercial de mercadoria;
 // - ICMS atual informado pelo usuário;
 // - fornecedor LP: PIS/Cofins atuais de 3,65%;
 // - fornecedor LR: PIS/Cofins atuais de 9,25%;
 // - Simples padrão do comprador não toma créditos;
 // - LP/LR compradores tomam ICMS + CBS/IBS quando a operação é creditável;
 // - Simples com IBS/CBS no regime regular toma CBS/IBS, mas não o ICMS residual.
 function segmentedPurchaseComparison(input={},year=2027){
  const currentPrice=Math.max(0,Number(input.amount)||0);
  const supplierRegime=['presumido','real','simples','simples_hybrid'].includes(input.supplierRegime)?input.supplierRegime:'presumido';
  const segment=['comercio','industria','servicos','misto'].includes(input.segment)?input.segment:'comercio';
  const defaultOperation=segment==='servicos'?'servico':segment==='industria'?'industria':'mercadoria';
  const operationType=segment==='misto'
   ?(['mercadoria','industria','servico'].includes(input.operationType)?input.operationType:'mercadoria')
   :defaultOperation;
  const usesIcms=operationType!=='servico';
  const usesIss=operationType==='servico';
  const usesIpi=operationType==='industria';

  const icmsPct=clamp(input.icmsRate ?? input.currentRates?.icms ?? 18,0,100);
  const issPct=clamp(input.issRate ?? input.currentRates?.iss ?? 5,0,100);
  const ipiPct=usesIpi?clamp(input.ipiRate ?? input.currentRates?.ipi ?? 0,0,100):0;
  const currentOldTaxPct=usesIcms?icmsPct:issPct;
  const oldTaxName=usesIcms?'ICMS':'ISS';
  const creditable=input.purchaseGeneratesCredit!==false;
  const creditUsePct=clamp(input.creditUsePct??100,0,100);

  const defaultAnnex=operationType==='mercadoria'?'I':operationType==='industria'?'II':'III';
  const simple={
   annex:input.simple?.annex||defaultAnnex,
   rbt12:Math.max(0,Number(input.simple?.rbt12)||0)
  };
  const future={
   mode:input.future?.mode||'rtav',
   reduction:clamp(input.future?.reduction,0,100),
   cbs:clamp(input.future?.cbs,0,100),
   ibs:clamp(input.future?.ibs,0,100),
   selective:clamp(input.future?.selective,0,100)
  };

  let currentPisCofinsPct=0,currentPisCofins=0,currentIcms=0,currentIss=0,currentIpi=0;
  let currentSupplierTaxes=0,economicBase=0,currentDas=0;

  if(supplierRegime==='simples'||supplierRegime==='simples_hybrid'){
   const eff=snEffective(2026,simple.annex,simple.rbt12).eff;
   currentDas=currentPrice*eff;
   currentSupplierTaxes=currentDas;
   economicBase=Math.max(0,currentPrice-currentDas);
  }else{
   currentPisCofinsPct=supplierRegime==='real'?9.25:3.65;
   // ICMS destacado não integra a base do débito de PIS/Cofins.
   currentPisCofins=(currentPrice-(usesIcms?currentPrice*icmsPct/100:0))*currentPisCofinsPct/100;
   currentIcms=usesIcms?currentPrice*icmsPct/100:0;
   currentIss=usesIss?currentPrice*issPct/100:0;
   currentIpi=usesIpi?currentPrice*ipiPct/100:0;
   currentSupplierTaxes=currentPisCofins+currentIcms+currentIss+currentIpi;
   economicBase=Math.max(0,currentPrice-currentSupplierTaxes);
  }

  const simpleSupplier=supplierRegime==='simples'||supplierRegime==='simples_hybrid';
  // Estimativa do ICMS transferível pelo Simples para revenda/industrialização.
  // Usa o RBT12 informado como aproximação do enquadramento do mês anterior.
  const simpleCurrent=snEffective(2026,simple.annex,simple.rbt12);
  const simpleIcmsRate=usesIcms&&['I','II'].includes(simple.annex)
   ?simpleCurrent.eff*(RULES.simpleTables[simple.annex].oldBase[simpleCurrent.band]||0)/100:0;
  const simpleIcms=currentPrice*simpleIcmsRate;
  const regularOldTaxCredit=creditable&&usesIcms?(simpleSupplier?simpleIcms:currentIcms)*(creditUsePct/100):0;
  // A aquisição elegível do Simples também gera crédito no regime não cumulativo.
  const pisCreditBase=Math.max(0,currentPrice-(usesIcms?(simpleSupplier?simpleIcms:currentIcms):0));
  const realPisCofinsCredit=creditable?pisCreditBase*.0925*(creditUsePct/100):0;
  const currentCredits={
   simples:{icms:0,iss:0,ipi:0,pisCofins:0,total:0},
   presumido:{icms:regularOldTaxCredit,iss:0,ipi:0,pisCofins:0,total:regularOldTaxCredit},
   real:{icms:regularOldTaxCredit,iss:0,ipi:0,pisCofins:realPisCofinsCredit,total:regularOldTaxCredit+realPisCofinsCredit},
   simples_hybrid:{icms:0,iss:0,ipi:0,pisCofins:0,total:0}
  };

  const transition=RULES.transition[Number(year)]||RULES.transition[2027];
  const rates=resolveRegularRates(Number(year),future);
  let futurePrice=0,cbs=0,ibs=0,selectiveTax=0,oldTaxRemnant=0,dasRemnant=0;
  let futureOldTaxPct=0,simpleShares=null;

  if(supplierRegime==='simples'){
   simpleShares=snShares(Number(year),simple.annex,simple.rbt12);
   futurePrice=(1-simpleShares.eff)>0?economicBase/(1-simpleShares.eff):0;
   cbs=futurePrice*simpleShares.cbsEff;
   ibs=futurePrice*simpleShares.ibsEff;
   dasRemnant=futurePrice*Math.max(0,simpleShares.eff-simpleShares.cbsEff-simpleShares.ibsEff);
  }else if(supplierRegime==='simples_hybrid'){
   simpleShares=snShares(Number(year),simple.annex,simple.rbt12);
   const hybridInput={
    regime:'simples_hybrid',
    amount:currentPrice,
    currentRates:{pis:0,cofins:0,icms:usesIcms?icmsPct:0,iss:usesIss?issPct:0,ipi:usesIpi?ipiPct:0},
    simple,
    future,
    hybridFuture:future
   };
   const hybrid=futurePriceScenario(hybridInput,Number(year));
   futurePrice=hybrid.price;
   cbs=hybrid.cbs;
   ibs=hybrid.ibs;
   dasRemnant=hybrid.remnant;
  }else{
   futureOldTaxPct=currentOldTaxPct*(transition.old??1);
   selectiveTax=economicBase*(future.selective/100);
   const ivaBase=economicBase+selectiveTax;
   cbs=ivaBase*rates.cbs/100;
   ibs=ivaBase*rates.ibs/100;
   const beforeOldTax=economicBase+selectiveTax+cbs+ibs;
   futurePrice=(1-futureOldTaxPct/100)>0?beforeOldTax/(1-futureOldTaxPct/100):0;
   oldTaxRemnant=futurePrice*futureOldTaxPct/100;
  }

  const simpleFutureIcms=simpleSupplier&&usesIcms&&['I','II'].includes(simple.annex)
   ?(supplierRegime==='simples'?futurePrice:futurePrice-cbs-ibs)*(simpleShares?.oldEff||0):0;
  const creditFactor=creditable?creditUsePct/100:0;
  const regularOldTaxFutureCredit=creditable&&usesIcms?(simpleSupplier?simpleFutureIcms:oldTaxRemnant)*creditFactor:0;
  const futureCredits={
   simples:{icms:0,iss:0,cbs:0,ibs:0,total:0},
   presumido:{
    icms:regularOldTaxFutureCredit,iss:0,cbs:cbs*creditFactor,ibs:ibs*creditFactor,total:0
   },
   real:{
    icms:regularOldTaxFutureCredit,iss:0,cbs:cbs*creditFactor,ibs:ibs*creditFactor,total:0
   },
   simples_hybrid:{icms:0,iss:0,cbs:cbs*creditFactor,ibs:ibs*creditFactor,total:0}
  };
  for(const key of Object.keys(futureCredits)){
   const x=futureCredits[key];
   x.total=(x.icms||0)+(x.iss||0)+(x.cbs||0)+(x.ibs||0);
  }

  const buyers={};
  for(const key of ['simples','presumido','real','simples_hybrid']){
   const currentCredit=currentCredits[key].total;
   const futureCredit=futureCredits[key].total;
   const currentCost=Math.max(0,currentPrice-currentCredit);
   const futureCost=Math.max(0,futurePrice-futureCredit);
   buyers[key]={
    currentPrice,currentCredits:currentCredits[key],currentCredit,currentCost,
    futurePrice,futureCredits:futureCredits[key],futureCredit,futureCost,
    changePct:effectPct(currentCost,futureCost)
   };
  }

  return {
   year:Number(year),segment,operationType,supplierRegime,currentPrice,
   oldTaxName,currentOldTaxPct,icmsPct,issPct,ipiPct,currentPisCofinsPct,
   currentPisCofins,currentIcms,currentIss,currentIpi,currentDas,currentSupplierTaxes,economicBase,
   cbsPct:simpleSupplier?(futurePrice?cbs/futurePrice*100:0):rates.cbs,
   ibsPct:simpleSupplier?(futurePrice?ibs/futurePrice*100:0):rates.ibs,
   cbs,ibs,selectiveTax,futureOldTaxPct,oldTaxRemnant,
   futureIcmsPct:usesIcms?futureOldTaxPct:0,
   futureIssPct:usesIss?futureOldTaxPct:0,
   icmsRemnant:usesIcms?oldTaxRemnant:0,
   issRemnant:usesIss?oldTaxRemnant:0,
   dasRemnant,futurePrice,transitionOldFactor:transition.old??1,
   creditable,creditUsePct,simpleShares,buyers,usesIcms,usesIss,usesIpi
  };
 }

 function commercialPurchaseComparison(input={},year=2027){
  return segmentedPurchaseComparison({...input,segment:input.segment||'comercio'},year);
 }

 function priceMemory(input,year){
  const cfg=normalizeInput(input);
  const base=currentPriceScenario(cfg);
  if(Number(year)===2026){
   return [
    ['Preço da compra em 2026',base.price],
    ['Crédito atual aproveitável',base.buyerCredit],
    ['Custo efetivo atual',base.buyerCost]
   ];
  }
  const x=futurePriceScenario(cfg,Number(year));
  const p=x.params;
  const rows=[
   ['Preço da compra projetado',x.price],
   ...hybridBaseMemory(x),
   [x.params?.type==='hybrid'?'Base da CBS/IBS após excluir '+x.params.excludedLabel:'Base limpa usada no novo sistema',x.cleanBase],
   ['Imposto Seletivo (se informado)',x.selectiveTax||0],
   ['CBS da aquisição',x.cbs],
   ['IBS da aquisição',x.ibs],
   [x.params?.type==='regular'?'ICMS/ISS remanescente':'DAS remanescente',x.remnant],
   ['Crédito CBS/IBS aproveitado',x.buyerCredit],
   ['Custo efetivo da compra',x.buyerCost],
   ['Líquido preservado do fornecedor',x.net],
   ['Tipo do cenário',p.type]
  ];
  return rows;
 }

 function revenueMemory(input,year){
  const cfg=normalizeInput(input);
  const base=currentRevenueScenario(cfg);
  if(Number(year)===2026){
   return [
    ['Faturamento bruto 2026',base.revenue],
    ['Tributos atuais considerados',base.taxes],
    ['Faturamento líquido 2026',base.net]
   ];
  }
  const x=futureRevenueScenario(cfg,Number(year));
  if(cfg.regime==='simples') return [
   ['Faturamento líquido preservado de 2026',base.net],
   ['Alíquota efetiva do DAS',(x.params.dasRate*100).toFixed(4).replace('.',',')+'%'],
   ['DAS total',x.taxes],
   ['Faturamento bruto projetado',x.revenue],
   ['Faturamento líquido',x.net]
  ];
  return [
   ['Faturamento líquido preservado de 2026',base.net],
   ...hybridBaseMemory(x),
   [x.params?.type==='hybrid'?'Base da CBS/IBS após excluir '+x.params.excludedLabel:'Base limpa usada no novo sistema',x.cleanBase],
   ['Imposto Seletivo (se informado)',x.selectiveTax||0],
   ['CBS calculada',x.cbs],
   ['IBS calculado',x.ibs],
   [x.params?.type==='regular'?'ICMS/ISS remanescente':'DAS remanescente',x.remnant],
   ['Tributos brutos',x.taxes],
   ['Crédito de CBS',x.cbsCredit||0],
   ['Crédito de IBS',x.ibsCredit||0],
   ['Carga líquida após créditos',x.netTax],
   ['Saldo credor remanescente',x.creditBalance||0],
   ['Faturamento bruto projetado',x.revenue]
  ];
 }

 return Object.freeze({
  version:'1.5.0',
  rulesVersion:RULES.version,
  clamp,effectPct,isSimple,inferOperationType,legacyTaxBreakdown,snBand,snRateRow,snEffective,snShares,resolveRegularRates,normalizeInput,paramsForYear,
  currentPriceScenario,priceScenarioAtPrice,futurePriceScenario,supplierPurchaseComparison,supplierPriceProjection,
  buyerPurchaseComparison,commercialPurchaseComparison,segmentedPurchaseComparison,
  currentRevenueScenario,revenueScenarioAtRevenue,futureRevenueScenario,
  validatePriceInput:input=>validateInput(input,'price'),
  validateRevenueInput:input=>validateInput(input,'revenue'),
  priceMemory,revenueMemory
 });
});
