const $=id=>document.getElementById(id);
const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const pct=v=>Number(v||0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:4})+'%';
const num=id=>Number($(id)?.value||0);

function go(id){
 document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
 $(id)?.classList.add('active');
 document.querySelectorAll('[data-go]').forEach(b=>b.classList.toggle('active',b.dataset.go===id));
 window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));

function moduleCard(m){
 return `<button class="module-card" onclick="openModule('${m.id}')">
   <div><span class="module-no">MÓDULO ${m.id}</span><h3>${m.title}</h3><p>${m.subtitle}</p></div>
   <div class="card-foot"><span>${m.blocks.length} blocos</span><span>Aula completa →</span></div>
 </button>`;
}

function renderHome(){
 if($('homeModules')) $('homeModules').innerHTML=STUDY_MODULES.slice(0,6).map(moduleCard).join('');
 if($('moduleGrid')) $('moduleGrid').innerHTML=STUDY_MODULES.map(moduleCard).join('');
 $('practiceGrid').innerHTML=PRACTICES.map((p,i)=>`<article class="practice-card">
   <div><span class="tag">${p.tag}</span><span class="practice-code">${p.id}</span></div>
   <h3>${p.title}</h3>
   <p>${p.subtitle}</p>
   <div class="practice-meta"><span>${p.steps.length} etapas</span><span>resolução completa</span></div>
   <button class="practice-open" onclick="openPractice(${i})">Abrir caso completo →</button>
 </article>`).join('');
 $('sourceGrid').innerHTML=SOURCES.map(s=>`<article class="source-card">
   <h3>${s[0]}</h3><p>${s[2]}</p>${s[1]==='#'?'<span class="source-note">Material interno do estudo</span>':`<a href="${s[1]}" target="_blank" rel="noopener">Abrir fonte oficial →</a>`}
 </article>`).join('');
 $('timeline').innerHTML=Object.entries(TIMELINE).map(([y,o])=>`<button class="year" onclick="pickYear('${y}')" data-year="${y}"><b>${y}</b><small>${o.label}</small></button>`).join('');
 pickYear('2027');
}

function openPractice(i){
 const p=PRACTICES[i];
 if(!p)return;
 const premises=p.premises.map(x=>`<li>${x}</li>`).join('');
 const steps=p.steps.map((s,j)=>`<article class="case-step">
   <div class="case-step-top"><span>ETAPA ${String(j+1).padStart(2,'0')}</span></div>
   <h3>${s.t}</h3>
   <div class="case-calc">${s.calc}</div>
   <p>${s.x}</p>
 </article>`).join('');
 $('practicePage').innerHTML=`
   <button class="back" onclick="go('practice')">← Voltar para práticas</button>
   <div class="case-hero">
     <div><span class="tag">${p.tag}</span><span class="practice-code">${p.id}</span>
     <h1 class="page-title">${p.title}</h1><p class="page-lead">${p.subtitle}</p></div>
   </div>
   <section class="case-context">
     <div><span class="eyebrow">CENÁRIO</span><h2>O que está acontecendo?</h2><p>${p.scenario}</p></div>
     <div><span class="eyebrow">OBJETIVO</span><h2>O que você precisa aprender?</h2><p>${p.objective}</p></div>
   </section>
   <section class="case-premises"><span class="eyebrow">ANTES DE CALCULAR</span><h2>Premissas do caso</h2><ul>${premises}</ul></section>
   <section class="case-resolution"><span class="eyebrow">RESOLUÇÃO GUIADA</span><h2>Passo a passo</h2>${steps}</section>
   <section class="case-result"><span class="eyebrow">RESULTADO</span><h2>${p.result}</h2><p>${p.interpretation}</p></section>
   <section class="case-two">
     <div class="case-note warning"><span class="eyebrow">ERRO COMUM</span><h3>O que evitar</h3><p>${p.error}</p></div>
     <div class="case-note client"><span class="eyebrow">COMO EXPLICAR AO CLIENTE</span><h3>Tradução consultiva</h3><p>${p.client}</p></div>
   </section>
   <details class="case-challenge"><summary>Teste de compreensão</summary><div><b>${p.challenge}</b><p>${p.challengeAnswer}</p></div></details>
   <div class="legal-box"><b>Base deste caso</b><p>${p.source}</p></div>
 `;
 go('practicePage');
}

function openModule(id){
 const m=STUDY_MODULES.find(x=>x.id===id);
 if(!m)return;
 const blocks=m.blocks.map((b,i)=>`<section class="lesson-block">
   <div class="lesson-top"><span class="step-no">${String(i+1).padStart(2,'0')}</span><span class="tag">${b.k}</span></div>
   <h2>${b.t}</h2><p>${b.x}</p>
 </section>`).join('');
 const qa=m.qa.map(q=>`<details class="qa"><summary>${q[0]}</summary><div>${q[1]}</div></details>`).join('');
 $('modulePage').innerHTML=`
  <button class="back" onclick="go('modules')">← Todos os estudos</button>
  <span class="module-no">MÓDULO ${m.id}</span>
  <h1 class="page-title">${m.title}</h1>
  <p class="page-lead">${m.intro}</p>
  <div class="compare">
   <div class="compare-box"><span>ANTES</span><h3>Sistema atual</h3><p>${m.before}</p></div>
   <div class="compare-box dark"><span>DEPOIS</span><h3>Nova lógica</h3><p>${m.after}</p></div>
  </div>
  <div class="lesson-stack">${blocks}</div>
  <section class="qa-wrap"><span class="eyebrow">Perguntas respondidas</span><h2>O que costuma gerar dúvida</h2>${qa}</section>
  <div class="legal-box"><b>Base do estudo</b><p>${m.legal}</p></div>`;
 go('modulePage');
}

function pickYear(y){
 document.querySelectorAll('.year').forEach(b=>b.classList.toggle('active',b.dataset.year===y));
 const o=TIMELINE[y];
 $('timelinePanel').innerHTML=`<span class="eyebrow">TRANSIÇÃO</span><h3>${y} · ${o.label}</h3><p>${o.text}</p>`;
}

function searchModules(q){
 q=(q||'').trim().toLowerCase();
 const result=STUDY_MODULES.filter(m=>JSON.stringify(m).toLowerCase().includes(q));
 $('searchResults').innerHTML=result.length?result.map(moduleCard).join(''):'<div class="empty">Nenhum conteúdo encontrado.</div>';
}
$('searchInput')?.addEventListener('input',e=>searchModules(e.target.value));
$('heroSearch')?.addEventListener('keydown',e=>{
 if(e.key==='Enter'){ $('searchInput').value=e.target.value; searchModules(e.target.value); go('search'); }
});

const TRANSITION={
 2026:{old:1,cbs:0,ibs:0,note:'2026 é usado na ferramenta como cenário atual/base comercial.'},
 2027:{old:1,cbs:8.9,ibs:.1,note:'Premissa RTAV: carga nova total de 9% no exercício, separada aqui em CBS 8,9% + IBS 0,1%. O IBS simbólico reduz a parcela da CBS.'},
 2028:{old:1,cbs:8.9,ibs:.1,note:'Premissa RTAV: mesma estrutura didática de 2027, totalizando 9% de CBS + IBS na simulação.'},
 2029:{old:.9,cbs:9,ibs:1.891,note:'Projeção RTAV: CBS 9% + 10% de um IBS cheio estimado em 18,91%; ICMS/ISS a 90%.'},
 2030:{old:.8,cbs:9,ibs:3.782,note:'Projeção RTAV: CBS 9% + 20% de IBS cheio estimado em 18,91%; ICMS/ISS a 80%.'},
 2031:{old:.7,cbs:9,ibs:5.673,note:'Projeção RTAV: CBS 9% + 30% de IBS cheio estimado em 18,91%; ICMS/ISS a 70%.'},
 2032:{old:.6,cbs:9,ibs:7.564,note:'Projeção RTAV: CBS 9% + 40% de IBS cheio estimado em 18,91%; ICMS/ISS a 60%.'},
 2033:{old:0,cbs:9,ibs:18.91,note:'Projeção didática RTAV: CBS 9% + IBS 18,91%, total de 27,91%; ICMS/ISS extintos.'}
};

const REGIME_LABELS={
 presumido:'Lucro Presumido',
 real:'Lucro Real',
 simples:'Simples Nacional — padrão',
 simples_hybrid:'Simples Nacional — híbrido',
 manual:'Outro / manual'
};

const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number(v)||0));
const effectPct=(before,after)=>before?((after/before)-1)*100:0;
const deltaMoney=(before,after)=>after-before;
const effectText=v=>`${v>=0?'+':''}${pct(v)}`;
let snAnnualRatesTouched=false;
let yearlyRows=[];

function regime(){ return $('taxRegime')?.value||'presumido'; }
function isSimpleRegime(r=regime()){ return r==='simples'||r==='simples_hybrid'; }

function calcSnEffective(){
 const r=Math.max(0,num('snRbt12'));
 const nominal=clamp(num('snNominal'),0,100)/100;
 const deduction=Math.max(0,num('snDeduction'));
 return r?Math.max(0,(r*nominal-deduction)/r):0;
}

function updateSnEffective(){
 const eff=calcSnEffective()*100;
 if($('snCurrentEffective')) $('snCurrentEffective').value=pct(eff);
 if(!snAnnualRatesTouched){
  for(let y=2027;y<=2033;y++){
   const el=$('snDas'+y);
   if(el) el.value=eff.toFixed(4);
  }
 }
}

function applyRegimeUI({preset=true}={}){
 const r=regime();
 const simple=isSimpleRegime(r);
 if($('regularCurrentFields')) $('regularCurrentFields').style.display=simple?'none':'block';
 if($('simplesCurrentFields')) $('simplesCurrentFields').style.display=simple?'block':'none';
 if($('regularFutureFields')) $('regularFutureFields').style.display=simple?'none':'block';
 if($('simplesFutureFields')) $('simplesFutureFields').style.display=simple?'block':'none';
 if($('simpleStandardRates')) $('simpleStandardRates').style.display=r==='simples'?'block':'none';
 if($('hybridRegularRates')) $('hybridRegularRates').style.display=r==='simples_hybrid'?'block':'none';

 if(preset){
  if(r==='presumido'){
   $('pisRate').value=.65;
   $('cofinsRate').value=3;
  }else if(r==='real'){
   $('pisRate').value=1.65;
   $('cofinsRate').value=7.6;
  }
 }
 updateSnEffective();
 applyYearPreset();
}

function getRegularRates(year,hybrid=false){
 const p=TRANSITION[year]||TRANSITION[2027];
 const mode=hybrid?($('hybridRateMode')?.value||'rtav'):($('rateMode')?.value||'rtav');
 const reduction=clamp(hybrid?num('hybridReduction'):num('rateReduction'),0,100);
 const factor=1-reduction/100;
 let cbs=0,ibs=0;
 if(mode==='rtav'){
  cbs=p.cbs;
  ibs=p.ibs;
 }else{
  cbs=clamp(hybrid?num('hybridCbsRate'):num('cbsRate'),0,100);
  ibs=clamp(hybrid?num('hybridIbsRate'):num('ibsRate'),0,100);
 }
 return {cbs:cbs*factor,ibs:ibs*factor,reduction,mode};
}

function applyYearPreset(){
 const y=Number($('priceYear')?.value||2027);
 const p=TRANSITION[y]||TRANSITION[2027];
 const r=regime();

 if(!isSimpleRegime(r)&&$('rateMode')?.value==='rtav'){
  $('cbsRate').value=p.cbs;
  $('ibsRate').value=p.ibs;
 }
 if(r==='simples_hybrid'&&$('hybridRateMode')?.value==='rtav'){
  $('hybridCbsRate').value=p.cbs;
  $('hybridIbsRate').value=p.ibs;
 }

 if($('rateNote')){
  if(r==='simples'){
   $('rateNote').textContent='Simples padrão: o preço de cada ano é formado pela alíquota efetiva anual do DAS informada abaixo. A composição CBS/IBS é usada para estimar o crédito do comprador, não para somar novamente ao preço.';
  }else if(r==='simples_hybrid'){
   $('rateNote').textContent='Simples híbrido: o preço combina DAS remanescente por dentro + CBS/IBS do regime regular por fora. A parcela de ICMS/ISS dentro do DAS diminui conforme a transição.';
  }else{
   $('rateNote').textContent=($('rateMode')?.value==='manual')
    ? 'Modo manual: informe CBS e IBS aplicáveis. Na tabela anual, essas alíquotas serão mantidas como premissa e apenas a transição de ICMS/ISS mudará por ano.'
    : p.note;
  }
 }
 calcIntegrated();
}

function syncPriceStrategy(){
 const manual=$('priceStrategy')?.value==='manual';
 if($('manualProjectedPrice')) $('manualProjectedPrice').disabled=!manual;
 calcIntegrated();
}

function syncCreditProfile(){
 const profile=$('buyerCreditProfile')?.value||'full';
 const manual=profile==='manual';
 if(profile==='full'){
  $('cbsCreditPct').value=100;
  $('ibsCreditPct').value=100;
 }else if(profile==='none'){
  $('cbsCreditPct').value=0;
  $('ibsCreditPct').value=0;
 }
 if($('cbsCreditPct')) $('cbsCreditPct').readOnly=!manual;
 if($('ibsCreditPct')) $('ibsCreditPct').readOnly=!manual;
 calcIntegrated();
}

function currentScenario(){
 const r=regime();
 const price=Math.max(0,num('priceNow'));
 const currentCredit=Math.max(0,num('currentBuyerCredit'));
 let taxes=0;

 if(isSimpleRegime(r)){
  taxes=price*calcSnEffective();
 }else{
  const currentRate=
   clamp(num('pisRate'),0,100)+clamp(num('cofinsRate'),0,100)+
   clamp(num('icmsRate'),0,100)+clamp(num('issRate'),0,100)+clamp(num('ipiRate'),0,100);
  taxes=price*currentRate/100;
 }
 return {
  year:2026,regime:r,price,taxes,
  net:Math.max(0,price-taxes),
  credit:currentCredit,
  cost:Math.max(0,price-currentCredit),
  cbs:null,ibs:null,remnant:taxes
 };
}

function annualSimpleDasRate(year){
 return clamp(num('snDas'+year),0,100)/100;
}

function paramsForYear(year){
 const r=regime();
 if(r==='simples'){
  const dasRate=annualSimpleDasRate(year);
  let cbsInside=clamp(num('snCbsDasRate'),0,100)/100;
  let ibsInside=clamp(num('snIbsDasRate'),0,100)/100;
  const sum=cbsInside+ibsInside;
  if(sum>dasRate&&sum>0){
   const scale=dasRate/sum;
   cbsInside*=scale; ibsInside*=scale;
  }
  return {type:'simple',dasRate,cbsInside,ibsInside};
 }

 if(r==='simples_hybrid'){
  const p=TRANSITION[year]||TRANSITION[2027];
  const fixed=clamp(num('hybridFixedDasRate'),0,100)/100;
  const oldBase=clamp(num('hybridOldDasRate'),0,100)/100;
  const remRate=fixed+(oldBase*p.old);
  const rates=getRegularRates(year,true);
  return {type:'hybrid',remRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100};
 }

 const p=TRANSITION[year]||TRANSITION[2027];
 const oldRate=((clamp(num('icmsRate'),0,100)+clamp(num('issRate'),0,100))*p.old)/100;
 const rates=getRegularRates(year,false);
 return {type:'regular',remRate:oldRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100};
}

function scenarioAtPrice(year,projected){
 const base=currentScenario();
 const p=paramsForYear(year);
 const cbsCreditPct=clamp(num('cbsCreditPct'),0,100)/100;
 const ibsCreditPct=clamp(num('ibsCreditPct'),0,100)/100;
 const otherCredit=Math.max(0,num('otherProjectedCredit'));

 let cbs=0,ibs=0,remnant=0,taxes=0,net=0;

 if(p.type==='simple'){
  taxes=projected*p.dasRate;
  cbs=projected*p.cbsInside;
  ibs=projected*p.ibsInside;
  remnant=Math.max(0,taxes-cbs-ibs);
  net=Math.max(0,projected-taxes);
 }else{
  const newRate=p.cbsRate+p.ibsRate;
  const cleanBase=(1+newRate)>0?projected*(1-p.remRate)/(1+newRate):0;
  cbs=cleanBase*p.cbsRate;
  ibs=cleanBase*p.ibsRate;
  remnant=projected*p.remRate;
  taxes=cbs+ibs+remnant;
  net=Math.max(0,projected-taxes);
 }

 const credit=(cbs*cbsCreditPct)+(ibs*ibsCreditPct)+otherCredit;
 return {
  year,regime:regime(),price:projected,cbs,ibs,remnant,taxes,net,credit,
  cost:Math.max(0,projected-credit),
  priceDelta:effectPct(base.price,projected),
  costDelta:effectPct(base.cost,Math.max(0,projected-credit)),
  netDelta:effectPct(base.net,net)
 };
}

function futureScenario(year,strategyOverride=null){
 const base=currentScenario();
 const p=paramsForYear(year);
 const strategy=strategyOverride||($('priceStrategy')?.value||'net');
 let projected=0;

 if(strategy==='net'){
  if(p.type==='simple'){
   projected=(1-p.dasRate)>0?base.net/(1-p.dasRate):0;
  }else{
   const newRate=p.cbsRate+p.ibsRate;
   projected=(1-p.remRate)>0?base.net*(1+newRate)/(1-p.remRate):0;
  }
 }else if(strategy==='gross'){
  projected=base.price;
 }else{
  projected=Math.max(0,num('manualProjectedPrice'));
 }
 return scenarioAtPrice(year,projected);
}

function regimeExplanation(){
 const r=regime();
 if(r==='simples') return 'No Simples padrão, o preço recomendado depende da alíquota efetiva total do DAS em cada ano. Se você repetir a mesma alíquota em todos os anos, o preço recomendado também pode permanecer igual.';
 if(r==='simples_hybrid') return 'No Simples híbrido, o preço é recalculado com DAS remanescente por dentro e CBS/IBS regulares por fora. A parcela de ICMS/ISS dentro do DAS é reduzida ano a ano.';
 if(r==='real') return 'No Lucro Real, o método limpa PIS/Cofins, ICMS/ISS/IPI atuais e reconstrói o preço de cada ano com CBS/IBS e tributos antigos remanescentes.';
 if(r==='presumido') return 'No Lucro Presumido, o método limpa PIS/Cofins, ICMS/ISS/IPI atuais e reconstrói o preço de cada ano com CBS/IBS e tributos antigos remanescentes.';
 return 'No modo manual, as alíquotas informadas são tratadas como premissas para a formação anual do preço.';
}

function calcIntegrated(){
 if(!$('integratedKpis')) return;
 const base=currentScenario();
 const y=Number($('priceYear')?.value||2027);
 const future=futureScenario(y);
 const natural=futureScenario(y,'gross');
 const prev=y===2027?base:futureScenario(y-1);

 const priceDelta=effectPct(base.price,future.price);
 const annualDelta=effectPct(prev.price,future.price);
 const costDelta=effectPct(base.cost,future.cost);
 const netDelta=effectPct(base.net,future.net);
 const creditDelta=deltaMoney(base.credit,future.credit);

 let signal='PREÇO RECALCULADO';
 let headline='O preço foi recalculado para o cenário tributário selecionado.';
 if(priceDelta>.05) {signal='REAJUSTE DE PREÇO';headline='O cenário exige aumento do preço para atingir o objetivo selecionado.';}
 else if(priceDelta<-.05){signal='REDUÇÃO DE PREÇO';headline='O cenário permite preço menor para atingir o objetivo selecionado.';}
 else {signal='PREÇO PRÓXIMO DE 2026';headline='O cenário produz pouca alteração no preço em relação a 2026.';}

 $('resultSignal').textContent=signal;
 $('regimeResultNote').textContent=REGIME_LABELS[regime()]+' · '+regimeExplanation();

 $('integratedKpis').innerHTML=`
  <div class="integrated-kpi dark"><small>Preço calculado em ${y}</small><b>${money(future.price)}</b><span>${effectText(priceDelta)} vs. 2026</span></div>
  <div class="integrated-kpi"><small>Variação anual</small><b>${effectText(annualDelta)}</b><span>vs. ${y-1}</span></div>
  <div class="integrated-kpi"><small>CBS + IBS</small><b>${money(future.cbs+future.ibs)}</b><span>CBS ${money(future.cbs)} · IBS ${money(future.ibs)}</span></div>
  <div class="integrated-kpi dark"><small>Líquido se não reajustasse</small><b>${money(natural.net)}</b><span>${effectText(effectPct(base.net,natural.net))} vs. líquido 2026</span></div>
 `;

 const row=(label,before,after,effect,kind='pct')=>{
  const effectValue=kind==='money'?money(effect):effectText(effect);
  return `<tr><td><strong>${label}</strong></td><td>${money(before)}</td><td>${money(after)}</td><td class="${effect<0?'effect-down':'effect-up'}">${effectValue}</td></tr>`;
 };
 $('integratedTable').innerHTML=[
  row('Preço de venda',base.price,future.price,priceDelta),
  row('Tributos considerados na venda',base.taxes,future.taxes,future.taxes-base.taxes,'money'),
  row('Crédito do comprador',base.credit,future.credit,creditDelta,'money'),
  row('Custo efetivo do comprador',base.cost,future.cost,costDelta),
  row('Receita líquida no preço calculado',base.net,future.net,netDelta),
  row('Receita líquida se mantivesse preço 2026',base.net,natural.net,effectPct(base.net,natural.net))
 ].join('');

 const strategy=$('priceStrategy')?.value||'net';
 const strategyLabel=strategy==='net'
  ? 'formar o preço de cada ano para preservar o líquido econômico de 2026'
  : strategy==='gross'
   ? 'manter o preço bruto de 2026 apenas para medir o impacto'
   : 'usar o preço informado manualmente';

 $('integratedExplanation').innerHTML=`
  <b>${headline}</b>
  <p>A estratégia selecionada é <strong>${strategyLabel}</strong>. Em ${y}, o preço calculado é ${money(future.price)}, uma variação de ${effectText(priceDelta)} contra 2026 e ${effectText(annualDelta)} contra ${y-1}. Se o cliente mantivesse o preço de ${money(base.price)}, a receita líquida seria ${money(natural.net)}.</p>
 `;

 renderYearlyProjection();
}

function renderYearlyProjection(){
 if(!$('yearlyProjectionTable')) return;
 const base=currentScenario();
 const selectedYear=Number($('priceYear')?.value||2027);
 const r=regime();
 const strategy=$('priceStrategy')?.value||'net';

 const rows=[{
  year:2026,regime:r,system:'Atual',price:base.price,cbs:null,ibs:null,remnant:base.remnant,
  credit:base.credit,cost:base.cost,net:base.net,noAdjustNet:base.net,
  diff:0,delta:0,annualDelta:0
 }];

 let prevPrice=base.price;
 for(let year=2027;year<=2033;year++){
  const x=futureScenario(year);
  const noAdjust=futureScenario(year,'gross');
  rows.push({
   year,regime:r,
   system:r==='simples'?'SN padrão':r==='simples_hybrid'?'SN híbrido':'Reforma regular',
   price:x.price,cbs:x.cbs,ibs:x.ibs,remnant:x.remnant,credit:x.credit,cost:x.cost,
   net:x.net,noAdjustNet:noAdjust.net,
   diff:x.price-base.price,
   delta:effectPct(base.price,x.price),
   annualDelta:effectPct(prevPrice,x.price)
  });
  prevPrice=x.price;
 }
 yearlyRows=rows;

 $('yearlyProjectionTable').innerHTML=rows.map(x=>{
  const cls=x.year===2026?'current-year':(x.year===selectedYear?'selected-year':'');
  return `<tr class="${cls}">
   <td>${x.year}</td>
   <td>${REGIME_LABELS[x.regime]}</td>
   <td><span class="system-pill">${x.system}</span></td>
   <td><strong>${money(x.price)}</strong></td>
   <td>${x.cbs===null?'—':money(x.cbs)}</td>
   <td>${x.ibs===null?'—':money(x.ibs)}</td>
   <td>${money(x.remnant)}</td>
   <td>${money(x.credit)}</td>
   <td><strong>${money(x.cost)}</strong></td>
   <td>${money(x.net)}</td>
   <td>${money(x.noAdjustNet)}</td>
   <td class="${x.diff<0?'effect-down':'effect-up'}">${x.year===2026?'—':money(x.diff)}</td>
   <td class="${x.delta<0?'effect-down':'effect-up'}">${x.year===2026?'Base':effectText(x.delta)}</td>
   <td class="${x.annualDelta<0?'effect-down':'effect-up'}">${x.year===2026?'Base':effectText(x.annualDelta)}</td>
  </tr>`;
 }).join('');

 let note='';
 if(strategy==='net'){
  note='Formação de preço ativa: cada ano é recalculado para preservar o mesmo líquido econômico de 2026. Por isso a coluna “Receita líquida no preço calculado” tende a permanecer igual; a coluna “Líquido se mantivesse preço 2026” mostra o impacto sem reajuste.';
 }else if(strategy==='gross'){
  note='Simulação sem reajuste: o preço fica igual por escolha da estratégia, e a receita líquida varia conforme os tributos.';
 }else{
  note='Preço manual: o mesmo preço informado é usado nos anos futuros; a receita líquida varia conforme os tributos.';
 }

 if(r==='simples'){
  note+=' No Simples padrão, use as alíquotas efetivas anuais do DAS. Se elas forem iguais, o preço pode ficar igual; a ferramenta não inventa uma mudança de DAS que o material não fornece.';
 }else if(r==='simples_hybrid'){
  note+=' No híbrido, a parcela de ICMS/ISS do DAS diminui conforme a transição e CBS/IBS regulares crescem conforme as premissas anuais.';
 }else{
  note+=' Nos regimes regulares, o cálculo segue o método RTAV: limpar 2026 → agregar CBS/IBS → embutir ICMS/ISS remanescentes.';
 }
 $('yearlyProjectionNote').textContent=note;
}

function xmlEsc(v){
 return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function xlsCell(value,type='String'){
 const val=type==='Number'?(Number(value)||0):xmlEsc(value);
 return `<Cell><Data ss:Type="${type}">${val}</Data></Cell>`;
}
function exportAnalysisExcel(){
 if(!yearlyRows.length) renderYearlyProjection();
 const r=regime();
 const strategy=$('priceStrategy')?.selectedOptions?.[0]?.textContent||'';

 const rowsXml=yearlyRows.map(x=>`<Row>
  ${xlsCell(x.year,'Number')}${xlsCell(REGIME_LABELS[x.regime])}${xlsCell(x.system)}
  ${xlsCell(x.price,'Number')}${xlsCell(x.cbs??0,'Number')}${xlsCell(x.ibs??0,'Number')}
  ${xlsCell(x.remnant,'Number')}${xlsCell(x.credit,'Number')}${xlsCell(x.cost,'Number')}
  ${xlsCell(x.net,'Number')}${xlsCell(x.noAdjustNet,'Number')}${xlsCell(x.diff,'Number')}
  ${xlsCell(x.delta,'Number')}${xlsCell(x.annualDelta,'Number')}
 </Row>`).join('');

 const headers=[
  'Ano','Regime','Sistema','Preço calculado','CBS','IBS','DAS / tributos remanescentes',
  'Crédito','Custo efetivo','Receita líquida no preço calculado','Líquido se mantivesse preço 2026',
  'Diferença R$','Reajuste vs 2026 (%)','Variação anual (%)'
 ].map(x=>xlsCell(x)).join('');

 const premises=[
  ['Regime',REGIME_LABELS[r]],['Estratégia de preço',strategy],['Preço 2026',num('priceNow')],
  ['Crédito atual do comprador',num('currentBuyerCredit')],['PIS atual %',num('pisRate')],
  ['Cofins atual %',num('cofinsRate')],['ICMS atual %',num('icmsRate')],['ISS atual %',num('issRate')],
  ['IPI atual %',num('ipiRate')],['RBT12',num('snRbt12')],['Alíquota nominal SN %',num('snNominal')],
  ['Parcela a deduzir SN',num('snDeduction')],['Alíquota efetiva atual SN %',calcSnEffective()*100],
  ...Array.from({length:7},(_,i)=>['DAS efetivo SN '+(2027+i)+' %',num('snDas'+(2027+i))]),
  ['Parcela CBS no DAS %',num('snCbsDasRate')],['Parcela IBS no DAS %',num('snIbsDasRate')],
  ['DAS híbrido fixo %',num('hybridFixedDasRate')],['ICMS/ISS híbrido 2026 %',num('hybridOldDasRate')],
  ['Aproveitamento CBS %',num('cbsCreditPct')],['Aproveitamento IBS %',num('ibsCreditPct')],
  ['Outros créditos projetados',num('otherProjectedCredit')],['Modo alíquota regular',$('rateMode')?.value||''],
  ['CBS manual %',num('cbsRate')],['IBS manual %',num('ibsRate')],['Redução regular %',num('rateReduction')],
  ['Modo híbrido',$('hybridRateMode')?.value||''],['CBS híbrido manual %',num('hybridCbsRate')],
  ['IBS híbrido manual %',num('hybridIbsRate')],['Redução híbrido %',num('hybridReduction')]
 ];
 const premXml=premises.map(([a,b])=>`<Row>${xlsCell(a)}${typeof b==='number'?xlsCell(b,'Number'):xlsCell(b)}</Row>`).join('');

 const xml=`<?xml version="1.0" encoding="UTF-8"?>
 <?mso-application progid="Excel.Sheet"?>
 <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Analise 2026-2033"><Table><Row>${headers}</Row>${rowsXml}</Table></Worksheet>
  <Worksheet ss:Name="Premissas"><Table><Row>${xlsCell('Premissa')}${xlsCell('Valor')}</Row>${premXml}</Table></Worksheet>
 </Workbook>`;

 const blob=new Blob(['\ufeff',xml],{type:'application/vnd.ms-excel;charset=utf-8'});
 const url=URL.createObjectURL(blob);
 const a=document.createElement('a');
 a.href=url;
 a.download=`analise-preco-reforma-${r}-2026-2033.xls`;
 document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
}

$('taxRegime')?.addEventListener('change',()=>applyRegimeUI({preset:true}));
$('priceYear')?.addEventListener('change',applyYearPreset);
$('priceStrategy')?.addEventListener('change',syncPriceStrategy);
$('buyerCreditProfile')?.addEventListener('change',syncCreditProfile);
$('exportExcelBtn')?.addEventListener('click',exportAnalysisExcel);

$('rateMode')?.addEventListener('change',()=>{
 const manual=$('rateMode').value==='manual';
 $('cbsRate').readOnly=!manual;$('ibsRate').readOnly=!manual;applyYearPreset();
});
$('hybridRateMode')?.addEventListener('change',()=>{
 const manual=$('hybridRateMode').value==='manual';
 $('hybridCbsRate').readOnly=!manual;$('hybridIbsRate').readOnly=!manual;applyYearPreset();
});

['snRbt12','snNominal','snDeduction'].forEach(id=>$(id)?.addEventListener('input',()=>{
 updateSnEffective();calcIntegrated();
}));
for(let y=2027;y<=2033;y++){
 $('snDas'+y)?.addEventListener('input',()=>{snAnnualRatesTouched=true;calcIntegrated();});
}

[
 'priceNow','pisRate','cofinsRate','icmsRate','issRate','ipiRate','currentBuyerCredit',
 'rateReduction','cbsRate','ibsRate','manualProjectedPrice','cbsCreditPct','ibsCreditPct','otherProjectedCredit',
 'snCbsDasRate','snIbsDasRate','hybridFixedDasRate','hybridOldDasRate','hybridReduction','hybridCbsRate','hybridIbsRate'
].forEach(id=>$(id)?.addEventListener('input',calcIntegrated));

['lpRevenue','lpPresumption'].forEach(id=>$(id)?.addEventListener('input',calcLP));
function calcLP(){
 if(!$('lpResult')) return;
 const revenue=num('lpRevenue'),pres=num('lpPresumption')/100,limit=5000000;
 const before=revenue*pres;
 const normal=Math.min(revenue,limit);
 const excess=Math.max(0,revenue-limit);
 const newPres=pres*1.10;
 const after=normal*pres+excess*newPres;
 $('lpResult').innerHTML=`<div><small>Base sem acréscimo</small><b>${money(before)}</b></div><div><small>Presunção sobre excedente</small><b>${pct(newPres*100)}</b></div><div class="main-result"><small>Base com LC 224</small><strong>${money(after)}</strong><span>Diferença: ${money(after-before)} · análise simplificada da base.</span></div>`;
}

renderHome();
searchModules('');
updateSnEffective();
syncCreditProfile();
syncPriceStrategy();
applyRegimeUI({preset:true});
calcLP();