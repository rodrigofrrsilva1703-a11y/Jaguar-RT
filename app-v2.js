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

let activeTimelineYear='2027';
function pickYear(y){
 if(!TIMELINE[y]) return;
 activeTimelineYear=String(y);
 document.querySelectorAll('.year').forEach(b=>b.classList.toggle('active',b.dataset.year===String(y)));
 const o=TIMELINE[y];
 $('timelinePanel').innerHTML=`<span class="eyebrow">TRANSIÇÃO</span><h3>${y} · ${o.label}</h3><p>${o.text}</p>`;
 const years=Object.keys(TIMELINE);
 const idx=years.indexOf(String(y));
 const pctDone=years.length>1?(idx/(years.length-1))*100:0;
 if($('transitionProgressFill')) $('transitionProgressFill').style.width=`${pctDone}%`;
 if($('transitionProgressLabel')) $('transitionProgressLabel').textContent=y;
}

function moveYear(direction){
 const years=Object.keys(TIMELINE);
 let idx=years.indexOf(activeTimelineYear);
 if(idx<0) idx=0;
 idx=Math.min(years.length-1,Math.max(0,idx+direction));
 pickYear(years[idx]);
}

function searchModules(q){
 q=(q||'').trim().toLowerCase();
 const result=STUDY_MODULES.filter(m=>JSON.stringify(m).toLowerCase().includes(q));
 $('searchResults').innerHTML=result.length?result.map(moduleCard).join(''):'<div class="empty">Nenhum conteúdo encontrado.</div>';
}
function runHeroSearch(){
 const q=$('heroSearch')?.value||'';
 if($('searchInput')) $('searchInput').value=q;
 searchModules(q);
 go('search');
}
function quickSearch(term){
 if($('heroSearch')) $('heroSearch').value=term;
 if($('searchInput')) $('searchInput').value=term;
 searchModules(term);
 go('search');
}
$('searchInput')?.addEventListener('input',e=>searchModules(e.target.value));
$('heroSearch')?.addEventListener('keydown',e=>{
 if(e.key==='Enter') runHeroSearch();
});

const TRANSITION={
 2026:{old:1,cbs:0,ibs:0,note:'2026 é usado como cenário-base.'},
 2027:{old:1,cbs:8.9,ibs:.1,note:'Premissa didática RTAV: total de 9% em 2027, separado em CBS 8,9% + IBS 0,1%.'},
 2028:{old:1,cbs:8.9,ibs:.1,note:'Premissa didática RTAV: mesma estrutura usada para 2027.'},
 2029:{old:.9,cbs:9,ibs:1.891,note:'RTAV: CBS 9% + 10% de IBS cheio estimado em 18,91%; ICMS/ISS a 90%.'},
 2030:{old:.8,cbs:9,ibs:3.782,note:'RTAV: CBS 9% + 20% de IBS cheio estimado; ICMS/ISS a 80%.'},
 2031:{old:.7,cbs:9,ibs:5.673,note:'RTAV: CBS 9% + 30% de IBS cheio estimado; ICMS/ISS a 70%.'},
 2032:{old:.6,cbs:9,ibs:7.564,note:'RTAV: CBS 9% + 40% de IBS cheio estimado; ICMS/ISS a 60%.'},
 2033:{old:0,cbs:9,ibs:18.91,note:'RTAV: projeção didática total de 27,91%; ICMS/ISS extintos.'}
};

const REGIME_LABELS={
 presumido:'Lucro Presumido',
 real:'Lucro Real',
 simples:'Simples Nacional — padrão',
 simples_hybrid:'Simples Nacional — híbrido',
 manual:'Outro / manual'
};

const SN_LABELS={
 I:'Anexo I · Comércio',
 II:'Anexo II · Indústria',
 III:'Anexo III · Serviços',
 IV:'Anexo IV · Serviços',
 V:'Anexo V · Serviços'
};

const SN_TABLES={
 I:{
  rates26:[[180000,4,0],[360000,7.3,5940],[720000,9.5,13860],[1800000,10.7,22500],[3600000,14.3,87300],[4800000,19,378000]],
  rates27:[[180000,4,0],[360000,7.3,5940],[720000,9.5,13860],[1800000,10.7,22500],[3600000,14.3,87300],[4800000,18.9,378000]],
  cbs27:[15.33,15.33,15.33,15.33,15.33,34.02],
  ibs27:[.17,.17,.17,.17,.17,0],
  cbs29:[15.5,15.5,15.5,15.5,15.5,34.4],
  oldBase:[34,34,33.5,33.5,33.5,0]
 },
 II:{
  rates26:[[180000,4.5,0],[360000,7.8,5940],[720000,10,13860],[1800000,11.2,22500],[3600000,14.7,85500],[4800000,30,720000]],
  rates27:[[180000,4.5,0],[360000,7.8,5940],[720000,10,13860],[1800000,11.2,22500],[3600000,14.7,85500],[4800000,29.9,720000]],
  cbs27:[13.85,13.85,13.85,13.85,13.85,25.22],
  ibs27:[.15,.15,.15,.15,.15,0],
  cbs29:[14,14,14,14,14,25.5],
  oldBase:[32,32,32,32,32,0]
 },
 III:{
  rates26:[[180000,6,0],[360000,11.2,9360],[720000,13.5,17640],[1800000,16,35640],[3600000,21,125640],[4800000,33,648000]],
  rates27:[[180000,6,0],[360000,11.2,9360],[720000,13.5,17640],[1800000,16,35640],[3600000,21,125640],[4800000,32.9,648000]],
  cbs27:[15.43,16.91,16.42,16.42,15.43,19.29],
  ibs27:[.17,.19,.19,.19,.17,0],
  cbs29:[15.6,17.1,16.6,16.6,15.6,19.5],
  oldBase:[33.5,32,32.5,32.5,33.5,0]
 },
 IV:{
  rates26:[[180000,4.5,0],[360000,9,8100],[720000,10.2,12420],[1800000,14,39780],[3600000,22,183780],[4800000,33,828000]],
  rates27:[[180000,4.5,0],[360000,9,8100],[720000,10.2,12420],[1800000,14,39780],[3600000,22,183780],[4800000,32.9,828000]],
  cbs27:[21.26,24.73,23.74,22.75,21.76,24.7],
  ibs27:[.24,.27,.26,.25,.24,0],
  cbs29:[21.5,25,24,23,22,25],
  oldBase:[44.5,40,40,40,40,0]
 },
 V:{
  rates26:[[180000,15.5,0],[360000,18,4500],[720000,19.5,9900],[1800000,20.5,17100],[3600000,23,62100],[4800000,30.5,540000]],
  rates27:[[180000,15.5,0],[360000,18,4500],[720000,19.5,9900],[1800000,20.5,17100],[3600000,23,62100],[4800000,30.4,540000]],
  cbs27:[16.96,16.96,17.95,18.94,16.96,19.78],
  ibs27:[.19,.19,.20,.21,.19,0],
  cbs29:[17.15,17.15,18.15,19.15,17.15,20],
  oldBase:[14,17,19,21,23.5,0]
 }
};

const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number(v)||0));
const effectPct=(before,after)=>before?((after/before)-1)*100:0;
const deltaMoney=(before,after)=>after-before;
const effectText=v=>`${v>=0?'+':''}${pct(v)}`;
let yearlyRows=[];

function regime(){ return $('taxRegime')?.value||'presumido'; }
function isSimpleRegime(r=regime()){ return r==='simples'||r==='simples_hybrid'; }
function snAnnex(){ return $('snAnnex')?.value||'III'; }

function snBand(rbt12){
 const r=Math.max(0,Number(rbt12)||0);
 if(r<=180000)return 0;
 if(r<=360000)return 1;
 if(r<=720000)return 2;
 if(r<=1800000)return 3;
 if(r<=3600000)return 4;
 return 5;
}

function snRateRow(year,annex=snAnnex(),rbt12=num('snRbt12')){
 const table=SN_TABLES[annex]||SN_TABLES.III;
 const rows=(year===2027||year===2028)?table.rates27:table.rates26;
 const band=snBand(rbt12);
 return {band,row:rows[band]};
}

function snEffective(year,annex=snAnnex(),rbt12=num('snRbt12')){
 const {band,row}=snRateRow(year,annex,rbt12);
 const r=Math.max(0,Number(rbt12)||0);
 const nominal=row[1]/100;
 const deduction=row[2];
 const eff=r?Math.max(0,(r*nominal-deduction)/r):0;
 return {band,nominal,deduction,eff};
}

function snShares(year,annex=snAnnex(),rbt12=num('snRbt12')){
 const t=SN_TABLES[annex]||SN_TABLES.III;
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

 // Regras especiais de teto de ISS na 5ª faixa dos Anexos III e IV.
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

function updateSnSummary(){
 const annex=snAnnex();
 const rbt12=Math.max(0,num('snRbt12'));
 const now=snEffective(2026,annex,rbt12);
 if($('snBandLabel')) $('snBandLabel').value=`${now.band+1}ª faixa`;
 if($('snCurrentEffective')) $('snCurrentEffective').value=pct(now.eff*100);

 const cards=[2027,2029,2033].map(year=>{
  const sh=snShares(year,annex,rbt12);
  return `<div class="sn-auto-card"><small>${year}</small><b>DAS ${pct(sh.eff*100)}</b><span>CBS efetiva ${pct(sh.cbsEff*100)} · IBS efetivo ${pct(sh.ibsEff*100)}</span></div>`;
 }).join('');
 if($('snAutoSummary')) $('snAutoSummary').innerHTML=cards;

 if($('hybridAutoSummary')){
  $('hybridAutoSummary').innerHTML=[2027,2029,2033].map(year=>{
   const sh=snShares(year,annex,rbt12);
   const rem=Math.max(0,sh.eff-sh.cbsEff-sh.ibsEff);
   return `<div class="sn-auto-card"><small>${year}</small><b>DAS rem. ${pct(rem*100)}</b><span>Retirado do DAS: CBS ${pct(sh.cbsEff*100)} + IBS ${pct(sh.ibsEff*100)}</span></div>`;
  }).join('');
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
   $('pisRate').value=.65;$('cofinsRate').value=3;
  }else if(r==='real'){
   $('pisRate').value=1.65;$('cofinsRate').value=7.6;
  }
 }
 updateSnSummary();
 applyYearPreset();
}

function getRegularRates(year,hybrid=false){
 const p=TRANSITION[year]||TRANSITION[2027];
 const mode=hybrid?($('hybridRateMode')?.value||'rtav'):($('rateMode')?.value||'rtav');
 const reduction=clamp(hybrid?num('hybridReduction'):num('rateReduction'),0,100);
 const factor=1-reduction/100;
 let cbs=0,ibs=0;
 if(mode==='rtav'){cbs=p.cbs;ibs=p.ibs;}
 else{
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
  $('cbsRate').value=p.cbs;$('ibsRate').value=p.ibs;
 }
 if(r==='simples_hybrid'&&$('hybridRateMode')?.value==='rtav'){
  $('hybridCbsRate').value=p.cbs;$('hybridIbsRate').value=p.ibs;
 }
 updateSnSummary();

 if($('rateNote')){
  if(r==='simples'){
   const sh=snShares(y);
   const sub=num('snRbt12')>3600000?' Atenção: RBT12 acima de R$ 3,6 milhões exige tratamento do sublimite de ICMS/ISS/IBS e deve ser validado fora deste cálculo automático.':'';
   $('rateNote').textContent=`Simples padrão · ${SN_LABELS[snAnnex()]} · ${sh.band+1}ª faixa. DAS efetivo ${pct(sh.eff*100)}; dentro dele, CBS ${pct(sh.cbsEff*100)} e IBS ${pct(sh.ibsEff*100)}. O total do DAS pode permanecer estável enquanto a partilha e o crédito mudam.${sub}`;
  }else if(r==='simples_hybrid'){
   $('rateNote').textContent='Simples híbrido: CBS/IBS são retirados automaticamente do DAS conforme o Anexo/faixa e calculados pelo regime regular por fora.';
  }else{
   $('rateNote').textContent=($('rateMode')?.value==='manual')
    ? 'Modo manual: informe CBS e IBS aplicáveis. A transição dos tributos antigos continua sendo aplicada por ano.'
    : p.note;
  }
 }
 calcIntegrated();
}

function syncPriceStrategy(){
 calcIntegrated();
}

function syncCreditProfile(){
 const profile=$('buyerCreditProfile')?.value||'full';
 const manual=profile==='manual';
 if(profile==='full'){$('cbsCreditPct').value=100;$('ibsCreditPct').value=100;}
 else if(profile==='none'){$('cbsCreditPct').value=0;$('ibsCreditPct').value=0;}
 if($('cbsCreditPct')) $('cbsCreditPct').readOnly=!manual;
 if($('ibsCreditPct')) $('ibsCreditPct').readOnly=!manual;
 calcIntegrated();
}

function currentScenario(){
 const r=regime();
 const price=Math.max(0,num('priceNow'));
 const currentCredit=Math.max(0,num('currentBuyerCredit'));
 const sellerCost=Math.max(0,num('sellerOperatingCost'));
 const sellerPurchaseCredit=Math.max(0,num('currentSellerCredit'));
 let taxes=0;

 if(isSimpleRegime(r)) taxes=price*snEffective(2026).eff;
 else{
  const currentRate=clamp(num('pisRate'),0,100)+clamp(num('cofinsRate'),0,100)+clamp(num('icmsRate'),0,100)+clamp(num('issRate'),0,100)+clamp(num('ipiRate'),0,100);
  taxes=price*currentRate/100;
 }

 const net=Math.max(0,price-taxes);
 const sellerResult=net-sellerCost+sellerPurchaseCredit;
 const sellerMargin=price?sellerResult/price:0;

 return {
  year:2026,regime:r,price,taxes,net,
  credit:currentCredit,
  cost:Math.max(0,price-currentCredit),
  cbs:null,ibs:null,remnant:taxes,
  sellerCost,sellerPurchaseCredit,sellerResult,sellerMargin
 };
}

function paramsForYear(year){
 const r=regime();

 if(r==='simples'){
  const sh=snShares(year);
  return {type:'simple',dasRate:sh.eff,cbsInside:sh.cbsEff,ibsInside:sh.ibsEff,oldInside:sh.oldEff};
 }

 if(r==='simples_hybrid'){
  const sh=snShares(year);
  const remRate=Math.max(0,sh.eff-sh.cbsEff-sh.ibsEff);
  const rates=getRegularRates(year,true);
  return {type:'hybrid',remRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100,snCbsRemoved:sh.cbsEff,snIbsRemoved:sh.ibsEff};
 }

 const p=TRANSITION[year]||TRANSITION[2027];
 const oldRate=((clamp(num('icmsRate'),0,100)+clamp(num('issRate'),0,100))*p.old)/100;
 const rates=getRegularRates(year,false);
 return {type:'regular',remRate:oldRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100};
}

function projectedSellerCredit(year){
 const r=regime();
 const creditBase=Math.max(0,num('sellerCreditBase'));
 const usePct=clamp(num('sellerCreditPct'),0,100)/100;
 const other=Math.max(0,num('otherSellerCredit'));

 // No Simples padrão, esta projeção não transforma compras em créditos do regime regular.
 if(r==='simples') return other;

 const p=paramsForYear(year);
 const regularRate=(p.cbsRate||0)+(p.ibsRate||0);
 return (creditBase*regularRate*usePct)+other;
}

function scenarioAtPrice(year,projected){
 const p=paramsForYear(year);
 const cbsCreditPct=clamp(num('cbsCreditPct'),0,100)/100;
 const ibsCreditPct=clamp(num('ibsCreditPct'),0,100)/100;
 const otherCredit=Math.max(0,num('otherProjectedCredit'));
 const sellerCost=Math.max(0,num('sellerOperatingCost'));

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
 const sellerPurchaseCredit=projectedSellerCredit(year);
 const sellerResult=net-sellerCost+sellerPurchaseCredit;
 const sellerMargin=projected?sellerResult/projected:0;

 return {
  year,regime:regime(),price:projected,cbs,ibs,remnant,taxes,net,credit,
  cost:Math.max(0,projected-credit),
  sellerCost,sellerPurchaseCredit,sellerResult,sellerMargin
 };
}

function futureScenario(year,strategyOverride=null){
 const base=currentScenario();
 const p=paramsForYear(year);
 const strategy=strategyOverride||'margin';
 let projected=0;

 if(strategy==='net'){
  if(p.type==='simple') projected=(1-p.dasRate)>0?base.net/(1-p.dasRate):0;
  else{
   const newRate=p.cbsRate+p.ibsRate;
   projected=(1-p.remRate)>0?base.net*(1+newRate)/(1-p.remRate):0;
  }
 }else if(strategy==='margin'){
  const purchaseCredit=projectedSellerCredit(year);
  const targetMargin=base.sellerMargin;

  if(p.type==='simple'){
   const netFactor=1-p.dasRate;
   const denominator=netFactor-targetMargin;
   projected=denominator>0?(base.sellerCost-purchaseCredit)/denominator:base.price;
  }else{
   const newRate=p.cbsRate+p.ibsRate;
   const netFactor=(1-p.remRate)/(1+newRate);
   const denominator=netFactor-targetMargin;
   projected=denominator>0?(base.sellerCost-purchaseCredit)/denominator:base.price;
  }
 }else if(strategy==='gross'){
  projected=base.price;
 }else{
  projected=base.price;
 }

 projected=Math.max(0,projected);
 const out=scenarioAtPrice(year,projected);
 out.priceDelta=effectPct(base.price,out.price);
 out.costDelta=effectPct(base.cost,out.cost);
 out.netDelta=effectPct(base.net,out.net);
 out.sellerResultDelta=out.sellerResult-base.sellerResult;
 out.sellerMarginDelta=(out.sellerMargin-base.sellerMargin)*100;
 return out;
}

function regimeExplanation(){
 const r=regime();
 if(r==='simples'){
  if(num('snRbt12')>3600000) return 'Simples padrão: RBT12 acima do sublimite de R$ 3,6 milhões exige tratamento específico de ICMS/ISS/IBS. A ferramenta sinaliza a faixa, mas o resultado deve ser validado antes de uso com cliente.';
  const e27=snEffective(2027).eff, e33=snEffective(2033).eff;
  const same=Math.abs(e27-e33)<.0000001;
  return same
   ? 'Simples padrão: para esta faixa, a alíquota efetiva total do DAS permanece igual entre 2027 e 2033. Por isso o preço que preserva o líquido pode ficar estável; o impacto anual aparece na partilha CBS/IBS, no crédito do comprador e no custo efetivo.'
   : 'Simples padrão: a ferramenta calcula automaticamente a alíquota efetiva e a partilha de cada ano pelo Anexo e RBT12.';
 }
 if(r==='simples_hybrid') return 'Simples híbrido: a ferramenta retira automaticamente CBS/IBS do DAS e calcula esses tributos pelo regime regular. O DAS remanescente e o preço mudam conforme a partilha anual.';
 if(r==='real') return 'Lucro Real: o preço é reconstruído com PIS/Cofins atuais, CBS/IBS futuros e ICMS/ISS remanescentes conforme a transição.';
 if(r==='presumido') return 'Lucro Presumido: o preço é reconstruído com PIS/Cofins atuais, CBS/IBS futuros e ICMS/ISS remanescentes conforme a transição.';
 return 'Modo manual: as alíquotas informadas são usadas como premissas.';
}

function updateScenarioStrip(){
 const r=regime(),year=$('priceYear')?.value||'2027';
 if($('activeRegimeBadge')) $('activeRegimeBadge').textContent=REGIME_LABELS[r]||r;
 if($('activeYearBadge')) $('activeYearBadge').textContent=year;
 if($('activeStrategyBadge')) $('activeStrategyBadge').textContent='Automático';
}

function calcIntegrated(){
 if(!$('integratedKpis')) return;
 updateScenarioStrip();

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
 const sellerCreditDelta=future.sellerPurchaseCredit-base.sellerPurchaseCredit;
 const sellerResultDelta=future.sellerResult-base.sellerResult;
 const sellerMarginDelta=(future.sellerMargin-base.sellerMargin)*100;

 let signal='PREÇO RECALCULADO',headline='O preço foi recalculado para o cenário tributário selecionado.';
 if(priceDelta>.05){signal='REAJUSTE DE PREÇO';headline='O cenário exige aumento do preço para atingir o objetivo selecionado.';}
 else if(priceDelta<-.05){signal='REDUÇÃO DE PREÇO';headline='O cenário permite preço menor para atingir o objetivo selecionado.';}
 else{signal='PREÇO ESTÁVEL';headline='O preço calculado ficou muito próximo da base de 2026.';}

 $('resultSignal').textContent=signal;
 $('regimeResultNote').textContent=REGIME_LABELS[regime()]+' · '+regimeExplanation();

 if($('sellerMarginPreview')){
  $('sellerMarginPreview').innerHTML=`
   <div><small>Resultado 2026</small><b>${money(base.sellerResult)}</b></div>
   <div><small>Margem 2026</small><b>${pct(base.sellerMargin*100)}</b></div>
  `;
 }

 $('integratedKpis').innerHTML=`
  <div class="integrated-kpi dark"><small>Preço calculado em ${y}</small><b>${money(future.price)}</b><span>${effectText(priceDelta)} vs. 2026</span></div>
  <div class="integrated-kpi"><small>Variação anual</small><b>${effectText(annualDelta)}</b><span>vs. ${y-1}</span></div>
  <div class="integrated-kpi"><small>Resultado / margem</small><b>${money(future.sellerResult)}</b><span>Margem ${pct(future.sellerMargin*100)} · ${sellerMarginDelta>=0?'+':''}${sellerMarginDelta.toFixed(2)} p.p.</span></div>
  <div class="integrated-kpi dark"><small>Custo efetivo do comprador</small><b>${money(future.cost)}</b><span>${effectText(costDelta)} vs. 2026</span></div>
 `;

 const row=(label,before,after,effect,kind='pct')=>{
  let beforeText=money(before),afterText=money(after),effectValue='';
  if(kind==='margin'){
   beforeText=pct(before*100);afterText=pct(after*100);effectValue=`${effect>=0?'+':''}${effect.toFixed(2)} p.p.`;
  }else effectValue=kind==='money'?money(effect):effectText(effect);
  return `<tr><td><strong>${label}</strong></td><td>${beforeText}</td><td>${afterText}</td><td class="${effect<0?'effect-down':'effect-up'}">${effectValue}</td></tr>`;
 };

 $('integratedTable').innerHTML=[
  row('Preço de venda',base.price,future.price,priceDelta),
  row('Tributos considerados na venda',base.taxes,future.taxes,future.taxes-base.taxes,'money'),
  row('Crédito do comprador',base.credit,future.credit,creditDelta,'money'),
  row('Custo efetivo do comprador',base.cost,future.cost,costDelta),
  row('Receita líquida no preço calculado',base.net,future.net,netDelta),
  row('Créditos das compras da empresa',base.sellerPurchaseCredit,future.sellerPurchaseCredit,sellerCreditDelta,'money'),
  row('Resultado operacional simplificado',base.sellerResult,future.sellerResult,sellerResultDelta,'money'),
  row('Margem operacional',base.sellerMargin,future.sellerMargin,sellerMarginDelta,'margin'),
  row('Receita líquida se mantivesse preço 2026',base.net,natural.net,effectPct(base.net,natural.net))
 ].join('');

 let extra=` O cálculo automático usa como referência a margem operacional de 2026 (${pct(base.sellerMargin*100)}), considerando os custos e créditos informados. Em ${y}, o resultado projetado é ${money(future.sellerResult)} e a margem fica em ${pct(future.sellerMargin*100)}.`;
 if(regime()==='simples'&&Math.abs(priceDelta)<=.05){
  extra+=' No Simples padrão, preço estável não significa ausência de impacto: a composição CBS/IBS e o custo efetivo do comprador podem mudar.';
 }

 $('integratedExplanation').innerHTML=`<b>${headline}</b><p>Em ${y}, o preço calculado é <strong>${money(future.price)}</strong> e o custo efetivo do comprador é ${money(future.cost)}.${extra}</p>`;

 renderYearlyProjection();
}

let yearDetailSelected=null;

function selectYearDetail(year){
 yearDetailSelected=Number(year);
 if(year>=2027&&$('priceYear')){
  $('priceYear').value=String(year);
  applyYearPreset();
 }else{
  renderYearlyProjection();
 }
}

function yearAnalysisHTML(x,base){
 if(x.year===2026){
  return `
   <div class="year-analysis-box">
    <span>ANÁLISE DO ANO</span><h5>2026 é a referência da comparação.</h5>
    <div class="year-analysis-grid">
     <div class="year-analysis-point"><b>Preço</b><small>Preço-base de ${money(x.price)} usado para reconstruir os anos seguintes.</small></div>
     <div class="year-analysis-point"><b>Cliente</b><small>Custo efetivo de ${money(x.cost)} após os créditos atuais informados.</small></div>
     <div class="year-analysis-point"><b>Empresa</b><small>Resultado de ${money(x.sellerResult)} e margem de ${pct(x.sellerMargin*100)} antes da Reforma.</small></div>
    </div>
   </div>`;
 }

 const priceWord=x.delta>.05?'aumenta':x.delta<-.05?'diminui':'fica praticamente estável';
 const clientWord=x.costDelta>.05?'aumenta':x.costDelta<-.05?'diminui':'fica praticamente estável';
 const marginDelta=(x.sellerMargin-base.sellerMargin)*100;
 const marginWord=marginDelta>.02?'melhora':marginDelta<-.02?'cai':'é preservada';
 const regimeNote=x.regime==='simples'
  ? 'No Simples padrão, a composição do DAS e o crédito gerado podem mudar mesmo com preço estável.'
  : x.regime==='simples_hybrid'
   ? 'No híbrido, CBS/IBS ficam fora do DAS e o remanescente permanece separado.'
   : 'Nos regimes regulares, CBS/IBS entram por fora e os tributos antigos recuam conforme a transição.';

 return `
  <div class="year-analysis-box">
   <span>ANÁLISE DO ANO</span><h5>O que muda em ${x.year}</h5>
   <div class="year-analysis-grid">
    <div class="year-analysis-point"><b>Preço</b><small>O preço recomendado ${priceWord}: ${money(x.price)} (${effectText(x.delta)} vs. 2026; ${effectText(x.annualDelta)} vs. ano anterior).</small></div>
    <div class="year-analysis-point"><b>Cliente</b><small>O custo efetivo ${clientWord} para ${money(x.cost)}. Crédito considerado: ${money(x.credit)}.</small></div>
    <div class="year-analysis-point"><b>Empresa</b><small>Resultado ${money(x.sellerResult)}; margem ${marginWord} em ${pct(x.sellerMargin*100)}. Créditos das compras: ${money(x.sellerPurchaseCredit)}. ${regimeNote}</small></div>
   </div>
  </div>`;
}

function renderYearDetail(year){
 if(!$('yearDetailPanel')||!yearlyRows.length) return;
 const x=yearlyRows.find(r=>r.year===Number(year))||yearlyRows[0];
 if(!x) return;
 const base=yearlyRows[0];
 const regimeLabel=REGIME_LABELS[x.regime]||x.regime;
 const cbs=x.cbs===null?'—':money(x.cbs);
 const ibs=x.ibs===null?'—':money(x.ibs);
 const priceEffect=x.year===2026?'Base':effectText(x.delta);
 const annualEffect=x.year===2026?'Base':effectText(x.annualDelta);
 const costEffect=x.year===2026?'Base':effectText(x.costDelta);

 let context='Ano-base antes da aplicação da nova formação de preço.';
 if(x.year>2026){
  context=`Preço ${priceEffect} em relação a 2026 e ${annualEffect} em relação ao ano anterior. O custo efetivo do comprador fica em ${money(x.cost)}, uma variação de ${costEffect} contra 2026.`;
 }

 $('yearDetailPanel').classList.add('visible');
 $('yearDetailPanel').innerHTML=`
  <div class="year-detail-top">
   <div><span>DETALHES DO ANO · ${regimeLabel}</span><h4>${x.year} · ${x.system}</h4></div>
   <div class="year-detail-price"><small>PREÇO RECOMENDADO</small><b>${money(x.price)}</b></div>
  </div>
  <div class="year-detail-grid">
   <div class="year-detail-item"><small>CBS</small><b>${cbs}</b></div>
   <div class="year-detail-item"><small>IBS</small><b>${ibs}</b></div>
   <div class="year-detail-item"><small>DAS / tributos remanescentes</small><b>${money(x.remnant)}</b></div>
   <div class="year-detail-item"><small>Crédito do comprador</small><b>${money(x.credit)}</b></div>
   <div class="year-detail-item"><small>Custo efetivo</small><b>${money(x.cost)}</b></div>
   <div class="year-detail-item"><small>Receita líquida</small><b>${money(x.net)}</b></div>
   <div class="year-detail-item"><small>Crédito nas compras da empresa</small><b>${money(x.sellerPurchaseCredit)}</b></div>
   <div class="year-detail-item"><small>Resultado operacional</small><b>${money(x.sellerResult)}</b></div>
   <div class="year-detail-item"><small>Margem operacional</small><b>${pct(x.sellerMargin*100)}</b></div>
   <div class="year-detail-item"><small>Líquido sem reajuste</small><b>${money(x.noAdjustNet)}</b></div>
   <div class="year-detail-item"><small>Diferença no preço</small><b>${x.year===2026?'—':money(x.diff)}</b></div>
  </div>
  <div class="year-detail-foot">${context}</div>
  ${yearAnalysisHTML(x,base)}
 `;
}

function renderYearlyProjection(){
 if(!$('yearlyProjectionTable')) return;
 const base=currentScenario(),selectedYear=Number($('priceYear')?.value||2027),r=regime();

 const rows=[{
  year:2026,regime:r,system:'Atual',price:base.price,cbs:null,ibs:null,remnant:base.remnant,
  credit:base.credit,cost:base.cost,costDelta:0,net:base.net,noAdjustNet:base.net,
  diff:0,delta:0,annualDelta:0,
  sellerPurchaseCredit:base.sellerPurchaseCredit,sellerResult:base.sellerResult,sellerMargin:base.sellerMargin
 }];

 let prevPrice=base.price;
 for(let year=2027;year<=2033;year++){
  const x=futureScenario(year),noAdjust=futureScenario(year,'gross');
  rows.push({
   year,regime:r,
   system:r==='simples'?'SN padrão':r==='simples_hybrid'?'SN híbrido':'Reforma regular',
   price:x.price,cbs:x.cbs,ibs:x.ibs,remnant:x.remnant,credit:x.credit,cost:x.cost,
   costDelta:effectPct(base.cost,x.cost),net:x.net,noAdjustNet:noAdjust.net,
   diff:x.price-base.price,delta:effectPct(base.price,x.price),annualDelta:effectPct(prevPrice,x.price),
   sellerPurchaseCredit:x.sellerPurchaseCredit,sellerResult:x.sellerResult,sellerMargin:x.sellerMargin
  });
  prevPrice=x.price;
 }
 yearlyRows=rows;

 if(yearDetailSelected===null||!rows.some(x=>x.year===yearDetailSelected)) yearDetailSelected=selectedYear;

 if($('yearlyPriceStrip')){
  $('yearlyPriceStrip').innerHTML=rows.map(x=>`
   <button type="button" class="year-price-card ${x.year===yearDetailSelected?'active':''}" onclick="selectYearDetail(${x.year})">
    <small>${x.year}</small>
    <b>${money(x.price)}</b>
    <span>${x.year===2026?'Base':effectText(x.delta)+' vs. 2026'}</span>
   </button>
  `).join('');
 }

 $('yearlyProjectionTable').innerHTML=rows.map(x=>{
  const cls=x.year===2026?'current-year':(x.year===yearDetailSelected?'selected-year':'');
  return `<tr class="${cls}" onclick="selectYearDetail(${x.year})">
   <td>${x.year}</td>
   <td><strong>${money(x.price)}</strong></td>
   <td class="${x.delta<0?'effect-down':'effect-up'}">${x.year===2026?'Base':effectText(x.delta)}</td>
   <td class="${x.annualDelta<0?'effect-down':'effect-up'}">${x.year===2026?'Base':effectText(x.annualDelta)}</td>
   <td>${money(x.credit)}</td>
   <td><strong>${money(x.cost)}</strong></td>
  </tr>`;
 }).join('');

 renderYearDetail(yearDetailSelected);

 let note='O preço de cada ano é calculado automaticamente a partir do cenário de 2026, dos custos, dos créditos e das regras tributárias do período. Clique em qualquer ano para abrir a análise completa de preço, cliente e empresa.';
 if(r==='simples') note+=' No Simples padrão, o preço pode permanecer igual quando a alíquota efetiva total do DAS não muda, mesmo que crédito e custo do comprador mudem.';
 if(r==='simples_hybrid') note+=' No híbrido, o painel separa o DAS remanescente de CBS/IBS.';
 $('yearlyProjectionNote').textContent=note;
}

function xmlEsc(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function xlsCell(value,type='String'){const val=type==='Number'?(Number(value)||0):xmlEsc(value);return `<Cell><Data ss:Type="${type}">${val}</Data></Cell>`;}
function exportAnalysisExcel(){
 if(!yearlyRows.length)renderYearlyProjection();
 const r=regime(),strategy='Automático — margem operacional de 2026';
 const rowsXml=yearlyRows.map(x=>`<Row>${xlsCell(x.year,'Number')}${xlsCell(REGIME_LABELS[x.regime])}${xlsCell(x.system)}${xlsCell(x.price,'Number')}${xlsCell(x.cbs??0,'Number')}${xlsCell(x.ibs??0,'Number')}${xlsCell(x.remnant,'Number')}${xlsCell(x.credit,'Number')}${xlsCell(x.cost,'Number')}${xlsCell(x.costDelta,'Number')}${xlsCell(x.net,'Number')}${xlsCell(x.noAdjustNet,'Number')}${xlsCell(x.sellerPurchaseCredit??0,'Number')}${xlsCell(x.sellerResult??0,'Number')}${xlsCell((x.sellerMargin??0)*100,'Number')}${xlsCell(x.diff,'Number')}${xlsCell(x.delta,'Number')}${xlsCell(x.annualDelta,'Number')}</Row>`).join('');
 const headers=['Ano','Regime','Sistema','Preço calculado','CBS','IBS','DAS / tributos remanescentes','Crédito','Custo efetivo','Custo vs 2026 (%)','Receita líquida no preço calculado','Líquido se mantivesse preço 2026','Crédito das compras da empresa','Resultado operacional simplificado','Margem operacional (%)','Diferença R$','Reajuste vs 2026 (%)','Variação anual (%)'].map(x=>xlsCell(x)).join('');
 const premises=[['Regime',REGIME_LABELS[r]],['Método automático',strategy],['Preço 2026',num('priceNow')],['Anexo Simples',SN_LABELS[snAnnex()]],['RBT12',num('snRbt12')],['Alíquota efetiva SN 2026 %',snEffective(2026).eff*100],['Crédito atual comprador',num('currentBuyerCredit')],['PIS atual %',num('pisRate')],['Cofins atual %',num('cofinsRate')],['ICMS atual %',num('icmsRate')],['ISS atual %',num('issRate')],['IPI atual %',num('ipiRate')],['Aproveitamento CBS %',num('cbsCreditPct')],['Aproveitamento IBS %',num('ibsCreditPct')],['Outros créditos comprador',num('otherProjectedCredit')],['Custos e despesas por venda',num('sellerOperatingCost')],['Créditos atuais nas compras',num('currentSellerCredit')],['Base líquida das compras com crédito',num('sellerCreditBase')],['Aproveitamento créditos das compras %',num('sellerCreditPct')],['Outros créditos projetados da empresa',num('otherSellerCredit')]];
 const premXml=premises.map(([a,b])=>`<Row>${xlsCell(a)}${typeof b==='number'?xlsCell(b,'Number'):xlsCell(b)}</Row>`).join('');
 const xml=`<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Analise 2026-2033"><Table><Row>${headers}</Row>${rowsXml}</Table></Worksheet><Worksheet ss:Name="Premissas"><Table><Row>${xlsCell('Premissa')}${xlsCell('Valor')}</Row>${premXml}</Table></Worksheet></Workbook>`;
 const blob=new Blob(['\ufeff',xml],{type:'application/vnd.ms-excel;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=`analise-preco-reforma-${r}-2026-2033.xls`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

$('taxRegime')?.addEventListener('change',()=>applyRegimeUI({preset:true}));
$('snAnnex')?.addEventListener('change',()=>{updateSnSummary();calcIntegrated();});
$('snRbt12')?.addEventListener('input',()=>{updateSnSummary();calcIntegrated();});
$('priceYear')?.addEventListener('change',applyYearPreset);
$('buyerCreditProfile')?.addEventListener('change',syncCreditProfile);
$('exportExcelBtn')?.addEventListener('click',exportAnalysisExcel);
$('rateMode')?.addEventListener('change',()=>{const manual=$('rateMode').value==='manual';$('cbsRate').readOnly=!manual;$('ibsRate').readOnly=!manual;applyYearPreset();});
$('hybridRateMode')?.addEventListener('change',()=>{const manual=$('hybridRateMode').value==='manual';$('hybridCbsRate').readOnly=!manual;$('hybridIbsRate').readOnly=!manual;applyYearPreset();});

['priceNow','pisRate','cofinsRate','icmsRate','issRate','ipiRate','currentBuyerCredit','rateReduction','cbsRate','ibsRate','cbsCreditPct','ibsCreditPct','otherProjectedCredit','hybridReduction','hybridCbsRate','hybridIbsRate','sellerOperatingCost','currentSellerCredit','sellerCreditBase','sellerCreditPct','otherSellerCredit'].forEach(id=>$(id)?.addEventListener('input',calcIntegrated));

['lpRevenue','lpPresumption'].forEach(id=>$(id)?.addEventListener('input',calcLP));
function calcLP(){
 if(!$('lpResult'))return;
 const revenue=num('lpRevenue'),pres=num('lpPresumption')/100,limit=5000000,before=revenue*pres,normal=Math.min(revenue,limit),excess=Math.max(0,revenue-limit),newPres=pres*1.10,after=normal*pres+excess*newPres;
 $('lpResult').innerHTML=`<div><small>Base sem acréscimo</small><b>${money(before)}</b></div><div><small>Presunção sobre excedente</small><b>${pct(newPres*100)}</b></div><div class="main-result"><small>Base com LC 224</small><strong>${money(after)}</strong><span>Diferença: ${money(after-before)} · análise simplificada da base.</span></div>`;
}

renderHome();
searchModules('');
updateSnSummary();
syncCreditProfile();
syncPriceStrategy();
applyRegimeUI({preset:true});
calcLP();