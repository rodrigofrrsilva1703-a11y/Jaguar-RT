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

function renderPracticeGrid(){
 const q=($('practiceSearch')?.value||'').trim().toLowerCase();
 const regime=$('practiceRegimeFilter')?.value||'';
 const sector=$('practiceSectorFilter')?.value||'';

 const filtered=PRACTICES.filter(p=>{
  const text=JSON.stringify(p).toLowerCase();
  const matchQ=!q||text.includes(q);
  const matchRegime=!regime||(p.regimes||[]).includes(regime);
  const matchSector=!sector||p.sector===sector;
  return matchQ&&matchRegime&&matchSector;
 });

 if(!$('practiceGrid')) return;
 $('practiceGrid').innerHTML=filtered.length?filtered.map(p=>{
  const i=PRACTICES.indexOf(p);
  return `<article class="practice-card">
   <div><span class="tag">${p.tag}</span><span class="practice-code">${p.id}</span></div>
   <h3>${p.title}</h3>
   <p>${p.subtitle}</p>
   <div class="practice-meta"><span>${p.steps.length} etapas</span><span>resolução completa</span></div>
   <button class="practice-open" onclick="openPractice(${i})">Abrir caso completo →</button>
  </article>`;
 }).join(''):'<div class="empty">Nenhum caso encontrado com esses filtros.</div>';
}

function renderClientFaq(){
 if(!$('clientFaqGrid')||typeof CLIENT_FAQ==='undefined') return;
 $('clientFaqGrid').innerHTML=CLIENT_FAQ.map(item=>`
  <details><summary>${item.q}</summary><p>${item.a}</p></details>
 `).join('');
}

function renderHome(){
 if($('homeModules')) $('homeModules').innerHTML=STUDY_MODULES.slice(0,6).map(moduleCard).join('');
 if($('moduleGrid')) $('moduleGrid').innerHTML=STUDY_MODULES.map(moduleCard).join('');
 renderPracticeGrid();
 renderClientFaq();
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


function currentScenario(){
 const r=regime();
 const price=Math.max(0,num('priceNow'));
 let taxes=0;
 let components={};

 if(isSimpleRegime(r)){
  const eff=snEffective(2026).eff;
  taxes=price*eff;
  components={das:taxes};
 }else{
  const pis=clamp(num('pisRate'),0,100)/100;
  const cofins=clamp(num('cofinsRate'),0,100)/100;
  const icms=clamp(num('icmsRate'),0,100)/100;
  const iss=clamp(num('issRate'),0,100)/100;
  const ipi=clamp(num('ipiRate'),0,100)/100;
  components={pis:price*pis,cofins:price*cofins,icms:price*icms,iss:price*iss,ipi:price*ipi};
  taxes=Object.values(components).reduce((a,b)=>a+b,0);
 }

 const buyerProfile=$('priceBuyerProfile')?.value||'b2c';
 const buyerCredit=buyerProfile==='b2b'?Math.min(price,Math.max(0,num('priceCurrentBuyerCredit'))):0;
 const buyerCost=Math.max(0,price-buyerCredit);
 return {year:2026,regime:r,price,taxes,net:Math.max(0,price-taxes),components,cbs:null,ibs:null,remnant:taxes,buyerCredit,buyerCost};
}

function paramsForYear(year){
 const r=regime();
 if(r==='simples'){
  const sh=snShares(year);
  return {type:'simple',dasRate:sh.eff,cbsInside:sh.cbsEff,ibsInside:sh.ibsEff};
 }
 if(r==='simples_hybrid'){
  const sh=snShares(year);
  const remRate=Math.max(0,sh.eff-sh.cbsEff-sh.ibsEff);
  const rates=getRegularRates(year,true);
  return {type:'hybrid',remRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100};
 }
 const p=TRANSITION[year]||TRANSITION[2027];
 const oldRate=((clamp(num('icmsRate'),0,100)+clamp(num('issRate'),0,100))*p.old)/100;
 const rates=getRegularRates(year,false);
 return {type:'regular',remRate:oldRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100};
}

function scenarioAtPrice(year,projected){
 const p=paramsForYear(year);
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
 const buyerProfile=$('priceBuyerProfile')?.value||'b2c';
 const buyerUse=clamp(num('priceBuyerCreditPct'),0,100)/100;
 const buyerCredit=buyerProfile==='b2b'?(cbs+ibs)*buyerUse:0;
 const buyerCost=Math.max(0,projected-buyerCredit);
 return {year,regime:regime(),price:projected,cbs,ibs,remnant,taxes,net,buyerCredit,buyerCost};
}

function futureScenario(year,keepGross=false){
 const base=currentScenario();
 const p=paramsForYear(year);
 let projected=base.price;

 if(!keepGross){
  if(p.type==='simple') projected=(1-p.dasRate)>0?base.net/(1-p.dasRate):0;
  else{
   const newRate=p.cbsRate+p.ibsRate;
   projected=(1-p.remRate)>0?base.net*(1+newRate)/(1-p.remRate):0;
  }
 }

 projected=Math.max(0,projected);
 const out=scenarioAtPrice(year,projected);
 out.priceDelta=effectPct(base.price,out.price);
 return out;
}

function regimeExplanation(){
 const r=regime();
 if(r==='simples'){
  if(num('snRbt12')>3600000) return 'Simples padrão: acima do sublimite de R$ 3,6 milhões, ICMS/ISS/IBS exigem validação específica. A projeção continua útil como referência, mas deve ser revisada antes do uso fiscal.';
  return 'Simples padrão: o preço é projetado pela alíquota efetiva do DAS do Anexo/faixa. A composição de CBS e IBS muda ao longo da transição.';
 }
 if(r==='simples_hybrid') return 'Simples híbrido: o DAS remanescente fica separado e CBS/IBS são calculados pelo regime regular.';
 if(r==='real') return 'Lucro Real: o preço de 2026 é limpo de PIS/Cofins, ICMS/ISS e IPI informados; cada ano é reconstruído com CBS/IBS e os tributos antigos remanescentes.';
 if(r==='presumido') return 'Lucro Presumido: o preço de 2026 é limpo dos tributos atuais e reconstruído ano a ano pela transição.';
 return 'Modo manual: as alíquotas informadas são usadas como premissas da projeção.';
}

function updateScenarioStrip(){
 const r=regime(),year=$('priceYear')?.value||'2027';
 if($('activeRegimeBadge')) $('activeRegimeBadge').textContent=REGIME_LABELS[r]||r;
 if($('activeYearBadge')) $('activeYearBadge').textContent=year;
 if($('resultYearLabel')) $('resultYearLabel').textContent=year;
 if($('futureTaxEyebrow')) $('futureTaxEyebrow').textContent=year+' · REFORMA';
}

function summaryRows(rows){
 return '<div class="tax-summary-list">'+rows.map(([label,value,strong])=>`<div class="tax-summary-row"><span>${label}</span><b>${value}</b></div>`).join('')+'</div>';
}

function currentTaxRows(base){
 if(isSimpleRegime(base.regime)){
  return [
   ['Preço bruto',money(base.price)],
   ['DAS / tributos',money(base.taxes)],
   ['Carga sobre o preço',pct(base.price?base.taxes/base.price*100:0)],
   ['Valor líquido',money(base.net)]
  ];
 }
 const c=base.components;
 const rows=[['Preço bruto',money(base.price)]];
 if(c.pis>0) rows.push(['PIS',money(c.pis)]);
 if(c.cofins>0) rows.push(['Cofins',money(c.cofins)]);
 if(c.icms>0) rows.push(['ICMS',money(c.icms)]);
 if(c.iss>0) rows.push(['ISS',money(c.iss)]);
 if(c.ipi>0) rows.push(['IPI',money(c.ipi)]);
 rows.push(['Total de tributos',money(base.taxes)]);
 rows.push(['Valor líquido',money(base.net)]);
 if(($('priceBuyerProfile')?.value||'b2c')==='b2b'){
  rows.push(['Crédito atual informado',money(base.buyerCredit||0)]);
  rows.push(['Custo efetivo do comprador',money(base.buyerCost??base.price)]);
 }
 return rows;
}

function futureTaxRows(x){
 const rows=[['Preço projetado',money(x.price)]];
 if(x.cbs>0) rows.push(['CBS',money(x.cbs)]);
 if(x.ibs>0) rows.push(['IBS',money(x.ibs)]);
 if(x.remnant>0) rows.push([regime()==='simples'?'DAS remanescente':'Tributos remanescentes',money(x.remnant)]);
 rows.push(['Total de tributos',money(x.taxes)]);
 rows.push(['Carga sobre o preço',pct(x.price?x.taxes/x.price*100:0)]);
 rows.push(['Valor líquido',money(x.net)]);
 if(($('priceBuyerProfile')?.value||'b2c')==='b2b'){
  rows.push(['Crédito potencial do comprador',money(x.buyerCredit||0)]);
  rows.push(['Custo efetivo do comprador',money(x.buyerCost??x.price)]);
 }
 return rows;
}


function calcIntegrated(){
 if(!$('integratedKpis')) return;
 updateScenarioStrip();

 const base=currentScenario();
 const y=Number($('priceYear')?.value||2027);
 const future=futureScenario(y);
 const priceDelta=effectPct(base.price,future.price);
 const prev=y===2027?base:futureScenario(y-1);
 const annualDelta=effectPct(prev.price,future.price);

 let signal='PREÇO ESTÁVEL',headline='O preço projetado ficou próximo ao valor atual.';
 if(priceDelta>.05){signal='AUMENTO DE PREÇO';headline='A projeção indica aumento do preço para preservar o mesmo líquido de 2026.';}
 else if(priceDelta<-.05){signal='REDUÇÃO DE PREÇO';headline='A projeção permite preço menor mantendo o mesmo líquido de 2026.';}

 $('resultSignal').textContent=signal;
 $('regimeResultNote').textContent=REGIME_LABELS[regime()]+' · '+regimeExplanation();

 const b2b=($('priceBuyerProfile')?.value||'b2c')==='b2b';
 $('integratedKpis').innerHTML=
  '<div class="integrated-kpi dark"><small>Preço atual</small><b>'+money(base.price)+'</b><span>2026</span></div>'+
  '<div class="integrated-kpi"><small>Tributos atuais</small><b>'+money(base.taxes)+'</b><span>Carga '+pct(base.price?base.taxes/base.price*100:0)+'</span></div>'+
  '<div class="integrated-kpi dark"><small>Preço em '+y+'</small><b>'+money(future.price)+'</b><span>'+effectText(priceDelta)+' vs. 2026</span></div>'+
  '<div class="integrated-kpi"><small>Valor líquido</small><b>'+money(future.net)+'</b><span>Base preservada: '+money(base.net)+'</span></div>'+
  (b2b?'<div class="integrated-kpi dark"><small>Custo efetivo do comprador</small><b>'+money(future.buyerCost)+'</b><span>Crédito potencial '+money(future.buyerCredit)+'</span></div>':'');

 $('currentTaxSummary').innerHTML=summaryRows(currentTaxRows(base));
 $('futureTaxSummary').innerHTML=summaryRows(futureTaxRows(future));
 const buyerSentence=b2b?' Para o comprador PJ, o crédito potencial considerado é '+money(future.buyerCredit)+' e o custo efetivo estimado fica em '+money(future.buyerCost)+'.':'';
 $('integratedExplanation').innerHTML=
  '<b>'+headline+'</b><p>Em 2026, '+money(base.taxes)+' do preço correspondem aos tributos considerados e o valor líquido é '+money(base.net)+
  '. Em '+y+', o preço projetado é <strong>'+money(future.price)+'</strong> ('+effectText(priceDelta)+' contra 2026 e '+effectText(annualDelta)+
  ' contra o ano anterior), mantendo o líquido em '+money(future.net)+'.'+buyerSentence+'</p>';

 renderYearlyProjection();
}

let yearDetailSelected=null;

function selectYearDetail(year){
 yearDetailSelected=Number(year);
 if(year>=2027&&$('priceYear')){
  $('priceYear').value=String(year);
  applyYearPreset();
 }else renderYearlyProjection();
}

function renderYearDetail(year){
 if(!$('yearDetailPanel')||!yearlyRows.length) return;
 const x=yearlyRows.find(r=>r.year===Number(year))||yearlyRows[0];
 const base=yearlyRows[0];
 const isBase=x.year===2026;
 const priceChange=isBase?0:effectPct(base.price,x.price);

 const analysis=isBase
  ? 'Em 2026, de cada '+money(x.price)+' vendidos, '+money(x.taxes)+' correspondem aos tributos considerados e '+money(x.net)+' permanecem como valor líquido.'
  : 'Em '+x.year+', o preço projetado é '+money(x.price)+' ('+effectText(priceChange)+' contra 2026). Os tributos somam '+money(x.taxes)+' e o líquido preservado é '+money(x.net)+'.';

 $('yearDetailPanel').classList.add('visible');
 $('yearDetailPanel').innerHTML=
  '<div class="year-detail-top">'+
   '<div><span>ANÁLISE DO PREÇO · '+REGIME_LABELS[x.regime]+'</span><h4>'+x.year+' · '+x.system+'</h4></div>'+
   '<div class="year-detail-price"><small>PREÇO</small><b>'+money(x.price)+'</b></div>'+
  '</div>'+
  '<div class="year-detail-grid tax-detail">'+
   '<div class="year-detail-item"><small>Total de tributos</small><b>'+money(x.taxes)+'</b></div>'+
   '<div class="year-detail-item"><small>Carga</small><b>'+pct(x.price?x.taxes/x.price*100:0)+'</b></div>'+
   '<div class="year-detail-item"><small>Valor líquido</small><b>'+money(x.net)+'</b></div>'+
   '<div class="year-detail-item"><small>CBS</small><b>'+(x.cbs===null?'—':money(x.cbs))+'</b></div>'+
   '<div class="year-detail-item"><small>IBS</small><b>'+(x.ibs===null?'—':money(x.ibs))+'</b></div>'+
   '<div class="year-detail-item"><small>DAS / tributos remanescentes</small><b>'+money(x.remnant)+'</b></div>'+
   ((($('priceBuyerProfile')?.value||'b2c')==='b2b')?'<div class="year-detail-item"><small>Crédito potencial comprador</small><b>'+money(x.buyerCredit||0)+'</b></div><div class="year-detail-item"><small>Custo efetivo comprador</small><b>'+money(x.buyerCost??x.price)+'</b></div>':'')+
  '</div>'+
  '<div class="tax-analysis-text"><b>Leitura do ano</b><p>'+analysis+'</p></div>';
}

function renderYearlyProjection(){
 if(!$('yearlyProjectionTable')) return;
 const base=currentScenario();
 const selectedYear=Number($('priceYear')?.value||2027);
 const r=regime();
 const rows=[Object.assign({},base,{system:'Atual',delta:0,annualDelta:0})];

 let prevPrice=base.price;
 for(let year=2027;year<=2033;year++){
  const x=futureScenario(year);
  rows.push(Object.assign({},x,{
   system:r==='simples'?'SN padrão':r==='simples_hybrid'?'SN híbrido':'Reforma',
   delta:effectPct(base.price,x.price),
   annualDelta:effectPct(prevPrice,x.price)
  }));
  prevPrice=x.price;
 }
 yearlyRows=rows;

 if(yearDetailSelected===null||!rows.some(x=>x.year===yearDetailSelected)) yearDetailSelected=selectedYear;

 $('yearlyPriceStrip').innerHTML=rows.map(x=>
  '<button type="button" class="year-price-card '+(x.year===yearDetailSelected?'active':'')+'" onclick="selectYearDetail('+x.year+')">'+
   '<small>'+x.year+'</small><b>'+money(x.price)+'</b><span>'+(x.year===2026?'Base':effectText(x.delta)+' vs. 2026')+'</span>'+
  '</button>'
 ).join('');

 $('yearlyProjectionTable').innerHTML=rows.map(x=>{
  const cls=x.year===2026?'current-year':(x.year===yearDetailSelected?'selected-year':'');
  return '<tr class="'+cls+'" onclick="selectYearDetail('+x.year+')">'+
   '<td>'+x.year+'</td><td><strong>'+money(x.price)+'</strong></td><td>'+money(x.taxes)+'</td>'+
   '<td>'+pct(x.price?x.taxes/x.price*100:0)+'</td><td><strong>'+money(x.net)+'</strong></td>'+
  '</tr>';
 }).join('');

 renderYearDetail(yearDetailSelected);

 let note='O preço de cada ano é calculado para preservar o mesmo valor líquido por venda de 2026.';
 if(r==='simples') note+=' No Simples padrão, o preço pode permanecer igual quando a alíquota efetiva total do DAS não muda.';
 if(r==='simples_hybrid') note+=' No híbrido, CBS/IBS ficam fora do DAS e o remanescente permanece separado.';
 $('yearlyProjectionNote').textContent=note;
}


function showTaxTool(which){
 const price=which!=='revenue';
 $('priceToolPanel')?.classList.toggle('active',price);
 $('revenueToolPanel')?.classList.toggle('active',!price);
 $('priceToolTab')?.classList.toggle('active',price);
 $('revenueToolTab')?.classList.toggle('active',!price);
 if(price) calcIntegrated(); else revCalcIntegrated();
}

function revRegime(){return $('revTaxRegime')?.value||'presumido';}
function revIsSimple(r=revRegime()){return r==='simples'||r==='simples_hybrid';}
function revAnnex(){return $('revSnAnnex')?.value||'III';}
function revRbt12(){return Math.max(0,num('revSnRbt12'));}
function revSnEffective(year){return snEffective(year,revAnnex(),revRbt12());}
function revSnShares(year){return snShares(year,revAnnex(),revRbt12());}

function revUpdateSnSummary(){
 const now=revSnEffective(2026);
 if($('revSnBandLabel')) $('revSnBandLabel').value=(now.band+1)+'ª faixa';
 if($('revSnCurrentEffective')) $('revSnCurrentEffective').value=pct(now.eff*100);

 if($('revSnAutoSummary')){
  $('revSnAutoSummary').innerHTML=[2027,2029,2033].map(function(year){
   const sh=revSnShares(year);
   return '<div class="sn-auto-card"><small>'+year+'</small><b>DAS '+pct(sh.eff*100)+'</b><span>CBS efetiva '+pct(sh.cbsEff*100)+' · IBS efetivo '+pct(sh.ibsEff*100)+'</span></div>';
  }).join('');
 }

 if($('revHybridAutoSummary')){
  $('revHybridAutoSummary').innerHTML=[2027,2029,2033].map(function(year){
   const sh=revSnShares(year),rem=Math.max(0,sh.eff-sh.cbsEff-sh.ibsEff);
   return '<div class="sn-auto-card"><small>'+year+'</small><b>DAS rem. '+pct(rem*100)+'</b><span>CBS/IBS fora do DAS</span></div>';
  }).join('');
 }
}

function revGetRates(year,hybrid=false){
 const p=TRANSITION[year]||TRANSITION[2027];
 const mode=hybrid?($('revHybridRateMode')?.value||'rtav'):($('revRateMode')?.value||'rtav');
 const reduction=clamp(hybrid?num('revHybridReduction'):num('revRateReduction'),0,100);
 const factor=1-reduction/100;
 let cbs=0,ibs=0;

 if(mode==='rtav'){cbs=p.cbs;ibs=p.ibs;}
 else{
  cbs=clamp(hybrid?num('revHybridCbsRate'):num('revCbsRate'),0,100);
  ibs=clamp(hybrid?num('revHybridIbsRate'):num('revIbsRate'),0,100);
 }
 return {cbs:cbs*factor,ibs:ibs*factor};
}

function revApplyUI(opts={}){
 const preset=opts.preset!==false;
 const r=revRegime(),simple=revIsSimple(r);

 if($('revRegularCurrentFields')) $('revRegularCurrentFields').style.display=simple?'none':'block';
 if($('revSimplesCurrentFields')) $('revSimplesCurrentFields').style.display=simple?'block':'none';
 if($('revRegularFutureFields')) $('revRegularFutureFields').style.display=simple?'none':'block';
 if($('revSimplesFutureFields')) $('revSimplesFutureFields').style.display=simple?'block':'none';
 if($('revSimpleStandardRates')) $('revSimpleStandardRates').style.display=r==='simples'?'block':'none';
 if($('revHybridRegularRates')) $('revHybridRegularRates').style.display=r==='simples_hybrid'?'block':'none';

 if(preset){
  if(r==='presumido'){$('revPisRate').value=.65;$('revCofinsRate').value=3;}
  else if(r==='real'){$('revPisRate').value=1.65;$('revCofinsRate').value=7.6;}
 }
 revUpdateSnSummary();
 revApplyYearPreset();
}

function revApplyYearPreset(){
 const y=Number($('revYear')?.value||2027);
 const p=TRANSITION[y]||TRANSITION[2027];
 const r=revRegime();

 if(!revIsSimple(r)&&$('revRateMode')?.value==='rtav'){
  $('revCbsRate').value=p.cbs;$('revIbsRate').value=p.ibs;
 }
 if(r==='simples_hybrid'&&$('revHybridRateMode')?.value==='rtav'){
  $('revHybridCbsRate').value=p.cbs;$('revHybridIbsRate').value=p.ibs;
 }

 revUpdateSnSummary();

 if($('revRateNote')){
  if(r==='simples'){
   const sh=revSnShares(y);
   $('revRateNote').textContent='Simples padrão · '+SN_LABELS[revAnnex()]+' · '+(sh.band+1)+'ª faixa · DAS efetivo '+pct(sh.eff*100)+'.';
  }else if(r==='simples_hybrid'){
   $('revRateNote').textContent='Simples híbrido: CBS/IBS ficam fora do DAS; o restante permanece como DAS remanescente.';
  }else{
   $('revRateNote').textContent=p.note;
  }
 }
 revCalcIntegrated();
}

function revCurrentScenario(){
 const r=revRegime();
 const revenue=Math.max(0,num('revCurrentRevenue'));
 let taxes=0,components={};

 if(revIsSimple(r)){
  const eff=revSnEffective(2026).eff;
  taxes=revenue*eff;
  components={das:taxes};
 }else{
  const pis=clamp(num('revPisRate'),0,100)/100;
  const cofins=clamp(num('revCofinsRate'),0,100)/100;
  const icms=clamp(num('revIcmsRate'),0,100)/100;
  const iss=clamp(num('revIssRate'),0,100)/100;
  const ipi=clamp(num('revIpiRate'),0,100)/100;
  components={pis:revenue*pis,cofins:revenue*cofins,icms:revenue*icms,iss:revenue*iss,ipi:revenue*ipi};
  taxes=Object.values(components).reduce(function(a,b){return a+b;},0);
 }

 const purchaseCredit=0;
 const netTax=taxes;
 const economicNet=Math.max(0,revenue-netTax);
 return {year:2026,regime:r,revenue:revenue,taxes:taxes,net:Math.max(0,revenue-taxes),components:components,cbs:null,ibs:null,remnant:taxes,purchaseCredit,netTax,economicNet};
}

function revParamsForYear(year){
 const r=revRegime();

 if(r==='simples'){
  const sh=revSnShares(year);
  return {type:'simple',dasRate:sh.eff,cbsInside:sh.cbsEff,ibsInside:sh.ibsEff};
 }

 if(r==='simples_hybrid'){
  const sh=revSnShares(year);
  const rates=revGetRates(year,true);
  return {type:'hybrid',remRate:Math.max(0,sh.eff-sh.cbsEff-sh.ibsEff),cbsRate:rates.cbs/100,ibsRate:rates.ibs/100};
 }

 const p=TRANSITION[year]||TRANSITION[2027];
 const oldRate=((clamp(num('revIcmsRate'),0,100)+clamp(num('revIssRate'),0,100))*p.old)/100;
 const rates=revGetRates(year,false);
 return {type:'regular',remRate:oldRate,cbsRate:rates.cbs/100,ibsRate:rates.ibs/100};
}

function revScenarioAtRevenue(year,gross){
 const p=revParamsForYear(year);
 let cbs=0,ibs=0,remnant=0,taxes=0,net=0;

 if(p.type==='simple'){
  taxes=gross*p.dasRate;
  cbs=gross*p.cbsInside;
  ibs=gross*p.ibsInside;
  remnant=Math.max(0,taxes-cbs-ibs);
  net=Math.max(0,gross-taxes);
 }else{
  const newRate=p.cbsRate+p.ibsRate;
  const cleanBase=(1+newRate)>0?gross*(1-p.remRate)/(1+newRate):0;
  cbs=cleanBase*p.cbsRate;
  ibs=cleanBase*p.ibsRate;
  remnant=gross*p.remRate;
  taxes=cbs+ibs+remnant;
  net=Math.max(0,gross-taxes);
 }

 const eligibleBasePct=clamp(num('revCreditablePurchasesPct'),0,100)/100;
 const usePct=clamp(num('revPurchaseCreditUsePct'),0,100)/100;
 const purchaseCredit=(p.type==='simple')?0:(gross*eligibleBasePct*((p.cbsRate||0)+(p.ibsRate||0))*usePct);
 const netTax=Math.max(0,taxes-purchaseCredit);
 const economicNet=Math.max(0,gross-netTax);
 return {year:year,regime:revRegime(),revenue:gross,cbs:cbs,ibs:ibs,remnant:remnant,taxes:taxes,net:net,purchaseCredit,netTax,economicNet};
}

function revFutureScenario(year,keepGross=false){
 const base=revCurrentScenario();
 const p=revParamsForYear(year);
 let gross=base.revenue;

 if(!keepGross){
  if(p.type==='simple') gross=(1-p.dasRate)>0?base.net/(1-p.dasRate):0;
  else{
   const newRate=p.cbsRate+p.ibsRate;
   gross=(1-p.remRate)>0?base.net*(1+newRate)/(1-p.remRate):0;
  }
 }

 gross=Math.max(0,gross);
 const out=revScenarioAtRevenue(year,gross);
 out.delta=effectPct(base.revenue,out.revenue);
 return out;
}

function revCurrentRows(base){
 const rows=[['Faturamento bruto',money(base.revenue)]];
 if(!revIsSimple(base.regime)){
  const c=base.components;
  if(c.pis>0) rows.push(['PIS',money(c.pis)]);
  if(c.cofins>0) rows.push(['Cofins',money(c.cofins)]);
  if(c.icms>0) rows.push(['ICMS',money(c.icms)]);
  if(c.iss>0) rows.push(['ISS',money(c.iss)]);
  if(c.ipi>0) rows.push(['IPI',money(c.ipi)]);
 }else rows.push(['DAS / tributos',money(base.taxes)]);
 rows.push(['Total de tributos',money(base.taxes)]);
 rows.push(['Faturamento líquido',money(base.net)]);
 return rows;
}

function revFutureRows(x){
 const rows=[['Faturamento bruto projetado',money(x.revenue)]];
 if(x.cbs>0) rows.push(['CBS',money(x.cbs)]);
 if(x.ibs>0) rows.push(['IBS',money(x.ibs)]);
 if(x.remnant>0) rows.push(['DAS / tributos remanescentes',money(x.remnant)]);
 rows.push(['Total de tributos',money(x.taxes)]);
 if((x.purchaseCredit||0)>0){
  rows.push(['Créditos estimados das aquisições',money(x.purchaseCredit)]);
  rows.push(['Carga líquida após créditos',money(x.netTax)]);
  rows.push(['Líquido econômico após créditos',money(x.economicNet)]);
 }
 rows.push(['Faturamento líquido antes dos créditos',money(x.net)]);
 return rows;
}

let revenueYearlyRows=[],revYearDetailSelected=null;

function revCalcIntegrated(){
 if(!$('revKpis')) return;
 const base=revCurrentScenario();
 const y=Number($('revYear')?.value||2027);
 const future=revFutureScenario(y);
 const unchanged=revFutureScenario(y,true);
 const delta=effectPct(base.revenue,future.revenue);
 const period=$('revRevenuePeriod')?.value||'mensal';

 if($('revActiveRegimeBadge')) $('revActiveRegimeBadge').textContent=REGIME_LABELS[revRegime()]||revRegime();
 if($('revActiveYearBadge')) $('revActiveYearBadge').textContent=y;
 if($('revPeriodBadge')) $('revPeriodBadge').textContent=period.charAt(0).toUpperCase()+period.slice(1);
 if($('revResultYearLabel')) $('revResultYearLabel').textContent=y;
 if($('revFutureEyebrow')) $('revFutureEyebrow').textContent=y+' · REFORMA';

 $('revResultSignal').textContent=delta>.05?'AUMENTO DE FATURAMENTO':delta<-.05?'REDUÇÃO DE FATURAMENTO':'FATURAMENTO ESTÁVEL';
 $('revRegimeResultNote').textContent=REGIME_LABELS[revRegime()]+' · projeção do faturamento bruto necessário para preservar o mesmo faturamento líquido de 2026.';

 const hasPurchaseCredit=(future.purchaseCredit||0)>0;
 $('revKpis').innerHTML=
  '<div class="integrated-kpi dark"><small>Faturamento atual</small><b>'+money(base.revenue)+'</b><span>'+period+'</span></div>'+
  '<div class="integrated-kpi"><small>Tributos atuais</small><b>'+money(base.taxes)+'</b><span>Carga '+pct(base.revenue?base.taxes/base.revenue*100:0)+'</span></div>'+
  '<div class="integrated-kpi dark"><small>Faturamento em '+y+'</small><b>'+money(future.revenue)+'</b><span>'+effectText(delta)+' vs. 2026</span></div>'+
  (hasPurchaseCredit
   ?'<div class="integrated-kpi"><small>Créditos estimados</small><b>'+money(future.purchaseCredit)+'</b><span>Carga líquida '+money(future.netTax)+'</span></div>'
   :'<div class="integrated-kpi"><small>Se não reajustar</small><b>'+money(unchanged.net)+'</b><span>Líquido com bruto de '+money(base.revenue)+'</span></div>');

 $('revCurrentSummary').innerHTML=summaryRows(revCurrentRows(base));
 $('revFutureSummary').innerHTML=summaryRows(revFutureRows(future));
 const creditSentence=hasPurchaseCredit?' Considerando a base de aquisições informada, os créditos estimados de IBS/CBS são '+money(future.purchaseCredit)+', reduzindo a carga líquida para '+money(future.netTax)+'.':'';
 $('revExplanation').innerHTML='<b>Comparação do faturamento.</b><p>Em 2026, o faturamento líquido antes de créditos das aquisições é '+money(base.net)+'. Para preservar esse mesmo líquido em '+y+', o faturamento bruto projetado é <strong>'+money(future.revenue)+'</strong> ('+effectText(delta)+'). Se o faturamento bruto permanecesse em '+money(base.revenue)+', o líquido seria '+money(unchanged.net)+'.'+creditSentence+'</p>';

 revRenderYearly();
}

function revSelectYear(year){
 revYearDetailSelected=Number(year);
 if(year>=2027&&$('revYear')){
  $('revYear').value=String(year);
  revApplyYearPreset();
 }else revRenderYearly();
}

function revRenderDetail(year){
 const x=revenueYearlyRows.find(function(r){return r.year===Number(year);})||revenueYearlyRows[0];
 if(!x) return;
 const base=revenueYearlyRows[0];
 const change=x.year===2026?0:effectPct(base.revenue,x.revenue);
 const analysis=x.year===2026
  ? 'Em 2026, o faturamento bruto é '+money(x.revenue)+', os tributos considerados somam '+money(x.taxes)+' e o faturamento líquido é '+money(x.net)+'.'
  : 'Em '+x.year+', para preservar o mesmo faturamento líquido de 2026, a receita bruta projetada é '+money(x.revenue)+' ('+effectText(change)+'). Os tributos somam '+money(x.taxes)+' e o líquido permanece em '+money(x.net)+'.';

 $('revYearDetailPanel').classList.add('visible');
 $('revYearDetailPanel').innerHTML=
  '<div class="year-detail-top">'+
   '<div><span>ANÁLISE DO FATURAMENTO · '+REGIME_LABELS[x.regime]+'</span><h4>'+x.year+' · '+x.system+'</h4></div>'+
   '<div class="year-detail-price"><small>FATURAMENTO BRUTO</small><b>'+money(x.revenue)+'</b></div>'+
  '</div>'+
  '<div class="year-detail-grid tax-detail">'+
   '<div class="year-detail-item"><small>Total de tributos</small><b>'+money(x.taxes)+'</b></div>'+
   '<div class="year-detail-item"><small>Carga</small><b>'+pct(x.revenue?x.taxes/x.revenue*100:0)+'</b></div>'+
   '<div class="year-detail-item"><small>Faturamento líquido</small><b>'+money(x.net)+'</b></div>'+
   '<div class="year-detail-item"><small>CBS</small><b>'+(x.cbs===null?'—':money(x.cbs))+'</b></div>'+
   '<div class="year-detail-item"><small>IBS</small><b>'+(x.ibs===null?'—':money(x.ibs))+'</b></div>'+
   '<div class="year-detail-item"><small>DAS / tributos remanescentes</small><b>'+money(x.remnant)+'</b></div>'+
   ((x.purchaseCredit||0)>0?'<div class="year-detail-item"><small>Créditos estimados</small><b>'+money(x.purchaseCredit)+'</b></div><div class="year-detail-item"><small>Carga líquida</small><b>'+money(x.netTax)+'</b></div><div class="year-detail-item"><small>Líquido após créditos</small><b>'+money(x.economicNet)+'</b></div>':'')+
  '</div>'+
  '<div class="tax-analysis-text"><b>Leitura do ano</b><p>'+analysis+'</p></div>';
}

function revRenderYearly(){
 const base=revCurrentScenario(),r=revRegime(),selected=Number($('revYear')?.value||2027);
 const rows=[Object.assign({},base,{system:'Atual',delta:0})];

 for(let year=2027;year<=2033;year++){
  const x=revFutureScenario(year);
  rows.push(Object.assign({},x,{
   system:r==='simples'?'SN padrão':r==='simples_hybrid'?'SN híbrido':'Reforma',
   delta:effectPct(base.revenue,x.revenue)
  }));
 }
 revenueYearlyRows=rows;

 if(revYearDetailSelected===null||!rows.some(function(x){return x.year===revYearDetailSelected;})) revYearDetailSelected=selected;

 $('revYearStrip').innerHTML=rows.map(function(x){
  return '<button type="button" class="year-price-card '+(x.year===revYearDetailSelected?'active':'')+'" onclick="revSelectYear('+x.year+')">'+
   '<small>'+x.year+'</small><b>'+money(x.revenue)+'</b><span>'+(x.year===2026?'Base':effectText(x.delta)+' vs. 2026')+'</span></button>';
 }).join('');

 $('revYearlyTable').innerHTML=rows.map(function(x){
  const cls=x.year===2026?'current-year':(x.year===revYearDetailSelected?'selected-year':'');
  return '<tr class="'+cls+'" onclick="revSelectYear('+x.year+')">'+
   '<td>'+x.year+'</td><td><strong>'+money(x.revenue)+'</strong></td><td>'+money(x.taxes)+'</td>'+
   '<td>'+pct(x.revenue?x.taxes/x.revenue*100:0)+'</td><td><strong>'+money(x.net)+'</strong></td></tr>';
 }).join('');

 revRenderDetail(revYearDetailSelected);

 let note='O faturamento bruto de cada ano é calculado para preservar o mesmo faturamento líquido de 2026.';
 if(r==='simples') note+=' No Simples padrão, ele pode permanecer igual quando a alíquota efetiva total do DAS não muda.';
 if(r==='simples_hybrid') note+=' No híbrido, CBS/IBS ficam fora do DAS.';
 $('revYearlyNote').textContent=note;
}


function xmlEsc(v){
 return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function xlsCell(value,type='String'){
 const val=type==='Number'?(Number(value)||0):xmlEsc(value);
 return '<Cell><Data ss:Type="'+type+'">'+val+'</Data></Cell>';
}

function downloadSpreadsheet(filename,headers,rows,premises){
 const headersXml=headers.map(function(x){return xlsCell(x);}).join('');
 const rowsXml=rows.map(function(row){
  return '<Row>'+row.map(function(v){return typeof v==='number'?xlsCell(v,'Number'):xlsCell(v);}).join('')+'</Row>';
 }).join('');
 const premXml=premises.map(function(row){
  return '<Row>'+xlsCell(row[0])+(typeof row[1]==='number'?xlsCell(row[1],'Number'):xlsCell(row[1]))+'</Row>';
 }).join('');

 const xml='<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>'+
  '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'+
  '<Worksheet ss:Name="Analise 2026-2033"><Table><Row>'+headersXml+'</Row>'+rowsXml+'</Table></Worksheet>'+
  '<Worksheet ss:Name="Premissas"><Table><Row>'+xlsCell('Premissa')+xlsCell('Valor')+'</Row>'+premXml+'</Table></Worksheet></Workbook>';

 const blob=new Blob(['\ufeff',xml],{type:'application/vnd.ms-excel;charset=utf-8'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
 setTimeout(function(){URL.revokeObjectURL(url);},1000);
}

function exportPriceExcel(){
 if(!yearlyRows.length) renderYearlyProjection();
 downloadSpreadsheet(
  'analise-preco-'+regime()+'-2026-2033.xls',
  ['Ano','Regime','Sistema','Preço','Tributos','Carga %','Valor líquido','CBS','IBS','DAS / tributos remanescentes'],
  yearlyRows.map(function(x){
   return [x.year,REGIME_LABELS[x.regime],x.system,x.price,x.taxes,x.price?x.taxes/x.price*100:0,x.net,x.cbs??0,x.ibs??0,x.remnant];
  }),
  [
   ['Regime',REGIME_LABELS[regime()]],['Preço 2026',num('priceNow')],
   ['PIS %',num('pisRate')],['Cofins %',num('cofinsRate')],['ICMS %',num('icmsRate')],
   ['ISS %',num('issRate')],['IPI %',num('ipiRate')]
  ]
 );
}

function exportRevenueExcel(){
 if(!revenueYearlyRows.length) revRenderYearly();
 downloadSpreadsheet(
  'analise-faturamento-'+revRegime()+'-2026-2033.xls',
  ['Ano','Regime','Sistema','Faturamento bruto','Tributos','Carga %','Faturamento líquido','CBS','IBS','DAS / tributos remanescentes'],
  revenueYearlyRows.map(function(x){
   return [x.year,REGIME_LABELS[x.regime],x.system,x.revenue,x.taxes,x.revenue?x.taxes/x.revenue*100:0,x.net,x.cbs??0,x.ibs??0,x.remnant];
  }),
  [
   ['Regime',REGIME_LABELS[revRegime()]],['Faturamento 2026',num('revCurrentRevenue')],
   ['Período',$('revRevenuePeriod')?.value||'mensal'],
   ['PIS %',num('revPisRate')],['Cofins %',num('revCofinsRate')],['ICMS %',num('revIcmsRate')],
   ['ISS %',num('revIssRate')],['IPI %',num('revIpiRate')]
  ]
 );
}

$('taxRegime')?.addEventListener('change',function(){applyRegimeUI({preset:true});});
$('snAnnex')?.addEventListener('change',function(){updateSnSummary();calcIntegrated();});
$('snRbt12')?.addEventListener('input',function(){updateSnSummary();calcIntegrated();});
$('priceYear')?.addEventListener('change',applyYearPreset);
$('exportPriceExcelBtn')?.addEventListener('click',exportPriceExcel);

$('rateMode')?.addEventListener('change',function(){
 const manual=$('rateMode').value==='manual';
 $('cbsRate').readOnly=!manual;$('ibsRate').readOnly=!manual;applyYearPreset();
});
$('hybridRateMode')?.addEventListener('change',function(){
 const manual=$('hybridRateMode').value==='manual';
 $('hybridCbsRate').readOnly=!manual;$('hybridIbsRate').readOnly=!manual;applyYearPreset();
});
['priceNow','pisRate','cofinsRate','icmsRate','issRate','ipiRate','rateReduction','cbsRate','ibsRate','hybridReduction','hybridCbsRate','hybridIbsRate'].forEach(function(id){
 $(id)?.addEventListener('input',calcIntegrated);
});

$('revTaxRegime')?.addEventListener('change',function(){revApplyUI({preset:true});});
$('revSnAnnex')?.addEventListener('change',function(){revUpdateSnSummary();revCalcIntegrated();});
$('revSnRbt12')?.addEventListener('input',function(){revUpdateSnSummary();revCalcIntegrated();});
$('revYear')?.addEventListener('change',revApplyYearPreset);
$('revRevenuePeriod')?.addEventListener('change',revCalcIntegrated);
$('exportRevenueExcelBtn')?.addEventListener('click',exportRevenueExcel);

$('revRateMode')?.addEventListener('change',function(){
 const manual=$('revRateMode').value==='manual';
 $('revCbsRate').readOnly=!manual;$('revIbsRate').readOnly=!manual;revApplyYearPreset();
});
$('revHybridRateMode')?.addEventListener('change',function(){
 const manual=$('revHybridRateMode').value==='manual';
 $('revHybridCbsRate').readOnly=!manual;$('revHybridIbsRate').readOnly=!manual;revApplyYearPreset();
});
['revCurrentRevenue','revPisRate','revCofinsRate','revIcmsRate','revIssRate','revIpiRate','revRateReduction','revCbsRate','revIbsRate','revHybridReduction','revHybridCbsRate','revHybridIbsRate'].forEach(function(id){
 $(id)?.addEventListener('input',revCalcIntegrated);
});

['lpRevenue','lpPresumption'].forEach(function(id){$(id)?.addEventListener('input',calcLP);});
function calcLP(){
 if(!$('lpResult')) return;
 const revenue=num('lpRevenue'),pres=num('lpPresumption')/100,limit=5000000;
 const before=revenue*pres,normal=Math.min(revenue,limit),excess=Math.max(0,revenue-limit),newPres=pres*1.10,after=normal*pres+excess*newPres;
 $('lpResult').innerHTML=
  '<div><small>Base sem acréscimo</small><b>'+money(before)+'</b></div>'+
  '<div><small>Presunção sobre excedente</small><b>'+pct(newPres*100)+'</b></div>'+
  '<div class="main-result"><small>Base com LC 224</small><strong>'+money(after)+'</strong><span>Diferença: '+money(after-before)+' · análise simplificada da base.</span></div>';
}

renderHome();
searchModules('');
updateSnSummary();
applyRegimeUI({preset:true});
revUpdateSnSummary();
revApplyUI({preset:true});
showTaxTool('price');
calcLP();
