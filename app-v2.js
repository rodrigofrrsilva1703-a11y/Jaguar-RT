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

const TRANSITION=RTAV_RULES.transition;

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

const clamp=RTAV_ENGINE.clamp;
const effectPct=RTAV_ENGINE.effectPct;
const effectText=v=>`${v>=0?'+':''}${pct(v)}`;
let yearlyRows=[];

function regime(){ return $('taxRegime')?.value||'presumido'; }
function isSimpleRegime(r=regime()){ return r==='simples'||r==='simples_hybrid'; }
function snAnnex(){ return $('snAnnex')?.value||'III'; }

function snBand(rbt12){ return RTAV_ENGINE.snBand(rbt12); }

function snRateRow(year,annex=snAnnex(),rbt12=num('snRbt12')){
 return RTAV_ENGINE.snRateRow(year,annex,rbt12);
}

function snEffective(year,annex=snAnnex(),rbt12=num('snRbt12')){
 return RTAV_ENGINE.snEffective(year,annex,rbt12);
}

function snShares(year,annex=snAnnex(),rbt12=num('snRbt12')){
 return RTAV_ENGINE.snShares(year,annex,rbt12);
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


function priceEngineInput(){
 return {
  regime:regime(),
  amount:Math.max(0,num('priceNow')),
  currentRates:{pis:num('pisRate'),cofins:num('cofinsRate'),icms:num('icmsRate'),iss:num('issRate'),ipi:num('ipiRate')},
  simple:{annex:snAnnex(),rbt12:num('snRbt12')},
  future:{mode:$('rateMode')?.value||'rtav',reduction:num('rateReduction'),cbs:num('cbsRate'),ibs:num('ibsRate')},
  hybridFuture:{mode:$('hybridRateMode')?.value||'rtav',reduction:num('hybridReduction'),cbs:num('hybridCbsRate'),ibs:num('hybridIbsRate')},
  buyer:{profile:$('priceBuyerProfile')?.value||'b2c',currentCredit:num('priceCurrentBuyerCredit'),usePct:num('priceBuyerCreditPct')}
 };
}

function currentScenario(){
 return RTAV_ENGINE.currentPriceScenario(priceEngineInput());
}

function paramsForYear(year){
 return RTAV_ENGINE.paramsForYear(priceEngineInput(),year);
}

function scenarioAtPrice(year,projected){
 return RTAV_ENGINE.priceScenarioAtPrice(priceEngineInput(),year,projected);
}

function futureScenario(year,keepGross=false){
 return RTAV_ENGINE.futurePriceScenario(priceEngineInput(),year,keepGross);
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
  const rows=[
   ['Preço bruto',money(base.price)],
   ['DAS / tributos',money(base.taxes)],
   ['Carga sobre o preço',pct(base.price?base.taxes/base.price*100:0)],
   ['Valor líquido',money(base.net)]
  ];
  if(($('priceBuyerProfile')?.value||'b2c')==='b2b'){
   rows.push(['Crédito atual informado',money(base.buyerCredit||0)]);
   rows.push(['Custo efetivo do comprador',money(base.buyerCost??base.price)]);
  }
  return rows;
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


function renderTaxChart(id,rows,mode){
 const el=$(id);
 if(!el||!rows?.length) return;

 let values=[];
 if(mode==='price'){
  rows.forEach(x=>values.push(x.remnant||0,x.cbs||0,x.ibs||0));
 }else{
  rows.forEach(x=>values.push(x.taxes||0,x.purchaseCredit||0,((x.netTax ?? x.taxes) || 0)));
 }
 const max=Math.max(1,...values);

 el.innerHTML=rows.map(x=>{
  const year=x.year;
  if(mode==='price'){
   const a=((x.remnant||0)/max)*100;
   const b=((x.cbs||0)/max)*100;
   const c=((x.ibs||0)/max)*100;
   return '<div class="tax-chart-col" title="'+year+'">'+
    '<div class="tax-chart-bars">'+
     '<span class="tax-chart-bar tertiary" style="height:'+a+'%" title="Remanescentes '+money(x.remnant||0)+'"></span>'+
     '<span class="tax-chart-bar secondary" style="height:'+b+'%" title="CBS '+money(x.cbs||0)+'"></span>'+
     '<span class="tax-chart-bar" style="height:'+c+'%" title="IBS '+money(x.ibs||0)+'"></span>'+
    '</div><b>'+year+'</b><small>'+money(x.taxes||0)+'</small></div>';
  }
  const debit=((x.taxes||0)/max)*100;
  const credit=((x.purchaseCredit||0)/max)*100;
  const liquid=((((x.netTax ?? x.taxes) || 0))/max)*100;
  return '<div class="tax-chart-col" title="'+year+'">'+
   '<div class="tax-chart-bars">'+
    '<span class="tax-chart-bar" style="height:'+debit+'%" title="Débito '+money(x.taxes||0)+'"></span>'+
    '<span class="tax-chart-bar credit" style="height:'+credit+'%" title="Crédito '+money(x.purchaseCredit||0)+'"></span>'+
    '<span class="tax-chart-bar secondary" style="height:'+liquid+'%" title="Carga líquida '+money(((x.netTax ?? x.taxes) || 0))+'"></span>'+
   '</div><b>'+year+'</b><small>'+money(((x.netTax ?? x.taxes) || 0))+'</small></div>';
 }).join('');
}

function renderValidation(id,messages){
 const el=$(id);
 if(!el) return;
 el.innerHTML=(messages||[]).map(function(item){
  return '<div class="validation-message '+item.level+'">'+item.message+'</div>';
 }).join('');
}

function renderMemory(id,rows){
 const el=$(id);
 if(!el) return;
 el.innerHTML=(rows||[]).map(function(row){
  const value=typeof row[1]==='number'?money(row[1]):String(row[1]??'');
  return '<div class="memory-row"><span>'+row[0]+'</span><b>'+value+'</b></div>';
 }).join('');
}

function calcIntegrated(){
 if(!$('integratedKpis')) return;
 updateScenarioStrip();

 const input=priceEngineInput();
 renderValidation('priceValidation',RTAV_ENGINE.validatePriceInput(input));
 const base=currentScenario();
 const y=Number($('priceYear')?.value||2027);
 const future=futureScenario(y);
 renderMemory('priceMemory',RTAV_ENGINE.priceMemory(input,y));
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
 renderTaxChart('priceTaxChart',rows,'price');

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
 $('priceToolTab')?.setAttribute('aria-selected',price?'true':'false');
 $('revenueToolTab')?.setAttribute('aria-selected',price?'false':'true');
 try{localStorage.setItem('jaguar-rtav-active-tool',price?'price':'revenue');}catch(e){}
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

function revenueEngineInput(){
 return {
  regime:revRegime(),
  amount:Math.max(0,num('revCurrentRevenue')),
  currentRates:{pis:num('revPisRate'),cofins:num('revCofinsRate'),icms:num('revIcmsRate'),iss:num('revIssRate'),ipi:num('revIpiRate')},
  simple:{annex:revAnnex(),rbt12:revRbt12()},
  future:{mode:$('revRateMode')?.value||'rtav',reduction:num('revRateReduction'),cbs:num('revCbsRate'),ibs:num('revIbsRate')},
  hybridFuture:{mode:$('revHybridRateMode')?.value||'rtav',reduction:num('revHybridReduction'),cbs:num('revHybridCbsRate'),ibs:num('revHybridIbsRate')},
  purchases:{creditablePct:num('revCreditablePurchasesPct'),usePct:num('revPurchaseCreditUsePct')}
 };
}

function revCurrentScenario(){
 return RTAV_ENGINE.currentRevenueScenario(revenueEngineInput());
}

function revParamsForYear(year){
 return RTAV_ENGINE.paramsForYear(revenueEngineInput(),year);
}

function revScenarioAtRevenue(year,gross){
 return RTAV_ENGINE.revenueScenarioAtRevenue(revenueEngineInput(),year,gross);
}

function revFutureScenario(year,keepGross=false){
 return RTAV_ENGINE.futureRevenueScenario(revenueEngineInput(),year,keepGross);
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
 const input=revenueEngineInput();
 renderValidation('revenueValidation',RTAV_ENGINE.validateRevenueInput(input));
 const base=revCurrentScenario();
 const y=Number($('revYear')?.value||2027);
 const future=revFutureScenario(y);
 renderMemory('revenueMemory',RTAV_ENGINE.revenueMemory(input,y));
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
 renderTaxChart('revenueTaxChart',rows,'revenue');

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

function columnWidths(headers,rows){
 return headers.map(function(header,idx){
  let max=String(header??'').length;
  rows.forEach(function(row){
   const v=row[idx];
   const len=typeof v==='number'?String(Math.round(v*100)/100).length:String(v??'').length;
   if(len>max) max=len;
  });
  return {wch:Math.min(Math.max(max+2,10),34)};
 });
}

function downloadSpreadsheet(filename,headers,rows,premises,memory=[]){
 if(window.XLSX){
  const analysisData=[headers].concat(rows);
  const premiseData=[['Premissa','Valor']].concat(premises);

  const ws=XLSX.utils.aoa_to_sheet(analysisData);
  const wsPremises=XLSX.utils.aoa_to_sheet(premiseData);

  ws['!cols']=columnWidths(headers,rows);
  wsPremises['!cols']=[{wch:34},{wch:28}];

  if(ws['!ref']) ws['!autofilter']={ref:ws['!ref']};

  // Formatos numéricos básicos: valores monetários e percentuais permanecem como números.
  rows.forEach(function(row,rowIndex){
   row.forEach(function(value,colIndex){
    if(typeof value!=='number') return;
    const addr=XLSX.utils.encode_cell({r:rowIndex+1,c:colIndex});
    if(!ws[addr]) return;
    const header=String(headers[colIndex]||'').toLowerCase();
    if(header.includes('%')||header.includes('carga')) ws[addr].z='0.00';
    else if(header.includes('ano')) ws[addr].z='0';
    else ws[addr].z='#,##0.00';
   });
  });

  premises.forEach(function(row,rowIndex){
   if(typeof row[1]!=='number') return;
   const addr=XLSX.utils.encode_cell({r:rowIndex+1,c:1});
   if(wsPremises[addr]) wsPremises[addr].z='#,##0.00';
  });

  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,'Análise 2026-2033');
  XLSX.utils.book_append_sheet(wb,wsPremises,'Premissas');
  if(memory&&memory.length){
   const wsMemory=XLSX.utils.aoa_to_sheet([['Etapa','Valor']].concat(memory));
   wsMemory['!cols']=[{wch:40},{wch:24}];
   XLSX.utils.book_append_sheet(wb,wsMemory,'Memória de cálculo');
  }
  XLSX.writeFile(wb,filename,{compression:true});
  return;
 }

 // Fallback compatível caso a biblioteca XLSX externa não carregue.
 const headersXml=headers.map(function(x){return xlsCell(x);}).join('');
 const rowsXml=rows.map(function(row){
  return '<Row>'+row.map(function(v){return typeof v==='number'?xlsCell(v,'Number'):xlsCell(v);}).join('')+'</Row>';
 }).join('');
 const premXml=premises.map(function(row){
  return '<Row>'+xlsCell(row[0])+(typeof row[1]==='number'?xlsCell(row[1],'Number'):xlsCell(row[1]))+'</Row>';
 }).join('');

 const memoryXml=(memory||[]).map(function(row){
  return '<Row>'+xlsCell(row[0])+(typeof row[1]==='number'?xlsCell(row[1],'Number'):xlsCell(row[1]))+'</Row>';
 }).join('');
 const xml='<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>'+
  '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'+
  '<Worksheet ss:Name="Analise 2026-2033"><Table><Row>'+headersXml+'</Row>'+rowsXml+'</Table></Worksheet>'+
  '<Worksheet ss:Name="Premissas"><Table><Row>'+xlsCell('Premissa')+xlsCell('Valor')+'</Row>'+premXml+'</Table></Worksheet>'+
  (memoryXml?'<Worksheet ss:Name="Memoria de calculo"><Table><Row>'+xlsCell('Etapa')+xlsCell('Valor')+'</Row>'+memoryXml+'</Table></Worksheet>':'')+
  '</Workbook>';

 const blob=new Blob(['\ufeff',xml],{type:'application/vnd.ms-excel;charset=utf-8'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;
 a.download=filename.replace(/\.xlsx$/i,'.xls');
 document.body.appendChild(a);a.click();a.remove();
 setTimeout(function(){URL.revokeObjectURL(url);},1000);
}

function exportPriceExcel(){
 if(!yearlyRows.length) renderYearlyProjection();
 downloadSpreadsheet(
  'analise-preco-'+regime()+'-2026-2033.xlsx',
  ['Ano','Regime','Sistema','Preço','Tributos','Carga %','Valor líquido','CBS','IBS','DAS / tributos remanescentes','Crédito potencial comprador','Custo efetivo comprador'],
  yearlyRows.map(function(x){
   return [x.year,REGIME_LABELS[x.regime],x.system,x.price,x.taxes,x.price?x.taxes/x.price*100:0,x.net,x.cbs??0,x.ibs??0,x.remnant,x.buyerCredit??0,x.buyerCost??x.price];
  }),
  [
   ['Regime',REGIME_LABELS[regime()]],['Preço 2026',num('priceNow')],
   ['Perfil da venda',$('priceBuyerProfile')?.value||'b2c'],['Crédito atual comprador',num('priceCurrentBuyerCredit')],
   ['Aproveitamento futuro CBS/IBS %',num('priceBuyerCreditPct')],
   ['PIS %',num('pisRate')],['Cofins %',num('cofinsRate')],['ICMS %',num('icmsRate')],
   ['ISS %',num('issRate')],['IPI %',num('ipiRate')]
  ],
  RTAV_ENGINE.priceMemory(priceEngineInput(),Number($('priceYear')?.value||2027))
 );
}

function exportRevenueExcel(){
 if(!revenueYearlyRows.length) revRenderYearly();
 downloadSpreadsheet(
  'analise-faturamento-'+revRegime()+'-2026-2033.xlsx',
  ['Ano','Regime','Sistema','Faturamento bruto','Tributos brutos','Carga bruta %','Faturamento líquido antes dos créditos','CBS','IBS','DAS / tributos remanescentes','Créditos estimados das aquisições','Carga líquida','Líquido após créditos'],
  revenueYearlyRows.map(function(x){
   return [x.year,REGIME_LABELS[x.regime],x.system,x.revenue,x.taxes,x.revenue?x.taxes/x.revenue*100:0,x.net,x.cbs??0,x.ibs??0,x.remnant,x.purchaseCredit??0,x.netTax??x.taxes,x.economicNet??x.net];
  }),
  [
   ['Regime',REGIME_LABELS[revRegime()]],['Faturamento 2026',num('revCurrentRevenue')],
   ['Período',$('revRevenuePeriod')?.value||'mensal'],
   ['Base de aquisições creditáveis %',num('revCreditablePurchasesPct')],
   ['Aproveitamento estimado dos créditos %',num('revPurchaseCreditUsePct')],
   ['PIS %',num('revPisRate')],['Cofins %',num('revCofinsRate')],['ICMS %',num('revIcmsRate')],
   ['ISS %',num('revIssRate')],['IPI %',num('revIpiRate')]
  ],
  RTAV_ENGINE.revenueMemory(revenueEngineInput(),Number($('revYear')?.value||2027))
 );
}

const QUICK_PRESETS={
 commerce_lp:{regime:'presumido',pis:.65,cofins:3,icms:18,iss:0,ipi:0},
 services_lp:{regime:'presumido',pis:.65,cofins:3,icms:0,iss:5,ipi:0},
 services_lr:{regime:'real',pis:1.65,cofins:7.6,icms:0,iss:5,ipi:0}
};

function applyQuickPreset(kind){
 const price=kind==='price';
 const select=$(price?'priceQuickPreset':'revenueQuickPreset');
 const p=QUICK_PRESETS[select?.value||''];
 if(!p) return;

 const prefix=price?'':'rev';
 const regimeId=price?'taxRegime':'revTaxRegime';
 const ids=price
  ? {pis:'pisRate',cofins:'cofinsRate',icms:'icmsRate',iss:'issRate',ipi:'ipiRate'}
  : {pis:'revPisRate',cofins:'revCofinsRate',icms:'revIcmsRate',iss:'revIssRate',ipi:'revIpiRate'};

 $(regimeId).value=p.regime;
 $(ids.pis).value=p.pis;$(ids.cofins).value=p.cofins;$(ids.icms).value=p.icms;$(ids.iss).value=p.iss;$(ids.ipi).value=p.ipi;

 if(price){applyRegimeUI({preset:false});calcIntegrated();saveSimulation('price');}
 else{revApplyUI({preset:false});revCalcIntegrated();saveSimulation('revenue');}
}

function togglePresentation(kind){
 const price=kind==='price';
 const panel=$(price?'priceToolPanel':'revenueToolPanel');
 const btn=$(price?'pricePresentationBtn':'revenuePresentationBtn');
 if(!panel||!btn) return;
 const active=panel.classList.toggle('presentation-mode');
 btn.setAttribute('aria-pressed',active?'true':'false');
 btn.textContent=active?'Sair do modo reunião':'Modo reunião';
}

function pdfRows(rows){
 return '<div>'+rows.map(function(row){
  return '<div class="pdf-row"><span>'+xmlEsc(row[0])+'</span><b>'+xmlEsc(row[1])+'</b></div>';
 }).join('')+'</div>';
}

function pdfAnnualTable(headers,rows){
 return '<table class="pdf-table"><thead><tr>'+headers.map(function(h){return '<th>'+xmlEsc(h)+'</th>';}).join('')+
  '</tr></thead><tbody>'+rows.map(function(row){
   return '<tr>'+row.map(function(v){return '<td>'+xmlEsc(v)+'</td>';}).join('')+'</tr>';
  }).join('')+'</tbody></table>';
}

function buildPricePdf(client,year){
 const input=priceEngineInput();
 const base=RTAV_ENGINE.currentPriceScenario(input);
 const future=RTAV_ENGINE.futurePriceScenario(input,year);
 const regimeLabel=REGIME_LABELS[input.regime]||input.regime;
 const currentRows=[['Preço bruto',money(base.price)],['Tributos considerados',money(base.taxes)],['Valor líquido',money(base.net)]];
 const futureRows=[
  ['Preço projetado',money(future.price)],
  ['CBS',money(future.cbs||0)],
  ['IBS',money(future.ibs||0)],
  ['DAS / tributos remanescentes',money(future.remnant||0)],
  ['Total de tributos',money(future.taxes)],
  ['Valor líquido',money(future.net)]
 ];
 if(input.buyer.profile==='b2b'){
  futureRows.push(['Crédito potencial do comprador',money(future.buyerCredit||0)]);
  futureRows.push(['Custo efetivo do comprador',money(future.buyerCost??future.price)]);
 }

 const annual=[{year:2026,...base}];
 for(let y=2027;y<=2033;y++) annual.push(RTAV_ENGINE.futurePriceScenario(input,y));
 const tableRows=annual.map(function(x){
  return [x.year,money(x.price),money(x.taxes),pct(x.price?x.taxes/x.price*100:0),money(x.net)];
 });

 return {
  title:'Relatório de preço de venda',
  subtitle:regimeLabel+' · análise de '+year,
  kpis:[
   ['Preço atual',money(base.price),'2026'],
   ['Preço projetado',money(future.price),String(year)],
   ['Tributos',money(future.taxes),pct(future.price?future.taxes/future.price*100:0)+' do preço'],
   ['Valor líquido',money(future.net),'Base 2026: '+money(base.net)]
  ],
  currentRows,
  futureRows,
  tableHeaders:['Ano','Preço','Tributos','Carga','Valor líquido'],
  tableRows,
  note:'A projeção preserva o valor líquido considerado em 2026. Alíquotas identificadas como RTAV são premissas didáticas e devem ser substituídas pelas aplicáveis à operação quando conhecidas.'
 };
}

function buildRevenuePdf(client,year){
 const input=revenueEngineInput();
 const base=RTAV_ENGINE.currentRevenueScenario(input);
 const future=RTAV_ENGINE.futureRevenueScenario(input,year);
 const regimeLabel=REGIME_LABELS[input.regime]||input.regime;
 const period=$('revRevenuePeriod')?.value||'mensal';
 const currentRows=[['Faturamento bruto',money(base.revenue)],['Tributos considerados',money(base.taxes)],['Faturamento líquido',money(base.net)]];
 const futureRows=[
  ['Faturamento projetado',money(future.revenue)],
  ['CBS',money(future.cbs||0)],
  ['IBS',money(future.ibs||0)],
  ['DAS / tributos remanescentes',money(future.remnant||0)],
  ['Tributos brutos',money(future.taxes)]
 ];
 if((future.purchaseCredit||0)>0){
  futureRows.push(['Créditos estimados',money(future.purchaseCredit)]);
  futureRows.push(['Carga líquida',money(future.netTax)]);
  futureRows.push(['Líquido após créditos',money(future.economicNet)]);
 }else{
  futureRows.push(['Faturamento líquido',money(future.net)]);
 }

 const annual=[{year:2026,...base}];
 for(let y=2027;y<=2033;y++) annual.push(RTAV_ENGINE.futureRevenueScenario(input,y));
 const hasCredit=annual.some(function(x){return (x.purchaseCredit||0)>0;});
 const tableHeaders=hasCredit?['Ano','Faturamento','Tributos','Créditos','Carga líquida']:['Ano','Faturamento','Tributos','Carga','Líquido'];
 const tableRows=annual.map(function(x){
  return hasCredit
   ?[x.year,money(x.revenue),money(x.taxes),money(x.purchaseCredit||0),money(x.netTax??x.taxes)]
   :[x.year,money(x.revenue),money(x.taxes),pct(x.revenue?x.taxes/x.revenue*100:0),money(x.net)];
 });

 return {
  title:'Relatório de faturamento',
  subtitle:regimeLabel+' · '+period+' · análise de '+year,
  kpis:[
   ['Faturamento atual',money(base.revenue),'2026 · '+period],
   ['Faturamento projetado',money(future.revenue),String(year)],
   ['Tributos brutos',money(future.taxes),pct(future.revenue?future.taxes/future.revenue*100:0)+' do faturamento'],
   [(future.purchaseCredit||0)>0?'Carga líquida':'Faturamento líquido',(future.purchaseCredit||0)>0?money(future.netTax):money(future.net),(future.purchaseCredit||0)>0?'Após créditos estimados':'Após tributos']
  ],
  currentRows,
  futureRows,
  tableHeaders,
  tableRows,
  note:(future.purchaseCredit||0)>0
   ?'Os créditos das aquisições são estimativas econômicas baseadas nos percentuais informados. O aproveitamento efetivo depende dos requisitos legais e documentais aplicáveis.'
   :'A projeção preserva o faturamento líquido considerado em 2026. Premissas RTAV devem ser validadas para a operação real.'
 };
}

function printTaxReport(kind){
 showTaxTool(kind);
 const price=kind==='price';
 const report=$('printReport');
 if(!report) return;

 const client=($(price?'priceClientName':'revenueClientName')?.value||'').trim()||'Cliente não identificado';
 const year=Number(price?($('priceYear')?.value||2027):($('revYear')?.value||2027));
 const data=price?buildPricePdf(client,year):buildRevenuePdf(client,year);
 const now=new Date().toLocaleDateString('pt-BR');

 report.innerHTML=
  '<div class="pdf-head">'+
   '<div><div class="pdf-brand">Jaguar Assessoria Contábil × RTAV</div><h1>'+xmlEsc(data.title)+'</h1>'+
    '<p><strong>Cliente:</strong> '+xmlEsc(client)+'</p><p>'+xmlEsc(data.subtitle)+'</p></div>'+
   '<div class="pdf-stamp"><div>'+xmlEsc(now)+'</div><div>Motor '+xmlEsc(RTAV_ENGINE.version)+'</div><div>Regras '+xmlEsc(RTAV_ENGINE.rulesVersion)+'</div></div>'+
  '</div>'+
  '<section class="pdf-section"><div class="pdf-section-title"><h2>Resumo executivo</h2><span>Principais números</span></div>'+
   '<div class="pdf-kpis">'+data.kpis.map(function(k){return '<div class="pdf-kpi"><small>'+xmlEsc(k[0])+'</small><b>'+xmlEsc(k[1])+'</b><span>'+xmlEsc(k[2])+'</span></div>';}).join('')+'</div>'+
  '</section>'+
  '<section class="pdf-section"><div class="pdf-section-title"><h2>Comparação tributária</h2><span>2026 × '+year+'</span></div>'+
   '<div class="pdf-grid"><div class="pdf-card"><h3>2026 · Atual</h3>'+pdfRows(data.currentRows)+'</div>'+
   '<div class="pdf-card"><h3>'+year+' · Reforma</h3>'+pdfRows(data.futureRows)+'</div></div>'+
  '</section>'+
  '<section class="pdf-section"><div class="pdf-section-title"><h2>Evolução 2026–2033</h2><span>Resumo anual</span></div>'+
   pdfAnnualTable(data.tableHeaders,data.tableRows)+'</section>'+
  '<div class="pdf-note">'+xmlEsc(data.note)+'</div>'+
  '<div class="pdf-footer">Relatório de simulação para planejamento. Não substitui enquadramento fiscal, apuração tributária ou validação da legislação aplicável à operação.</div>';

 report.setAttribute('aria-hidden','false');
 setTimeout(function(){
  window.print();
  report.setAttribute('aria-hidden','true');
 },80);
}

const PRICE_STATE_IDS=[
 'taxRegime','priceNow','pisRate','cofinsRate','icmsRate','issRate','ipiRate','snRbt12','snAnnex',
 'priceYear','rateMode','rateReduction','cbsRate','ibsRate','hybridRateMode','hybridReduction','hybridCbsRate','hybridIbsRate',
 'priceBuyerProfile','priceCurrentBuyerCredit','priceBuyerCreditPct','priceQuickPreset','priceClientName'
];
const REVENUE_STATE_IDS=[
 'revTaxRegime','revCurrentRevenue','revRevenuePeriod','revPisRate','revCofinsRate','revIcmsRate','revIssRate','revIpiRate',
 'revSnRbt12','revSnAnnex','revYear','revRateMode','revRateReduction','revCbsRate','revIbsRate','revHybridRateMode',
 'revHybridReduction','revHybridCbsRate','revHybridIbsRate','revCreditablePurchasesPct','revPurchaseCreditUsePct','revenueQuickPreset','revenueClientName'
];

function stateKey(kind){return 'jaguar-rtav-'+kind+'-simulation-v1';}

function saveSimulation(kind){
 const ids=kind==='price'?PRICE_STATE_IDS:REVENUE_STATE_IDS;
 const data={};
 ids.forEach(function(id){
  const el=$(id); if(!el) return;
  data[id]=el.type==='checkbox'?el.checked:el.value;
 });
 try{
  localStorage.setItem(stateKey(kind),JSON.stringify(data));
  const status=$(kind==='price'?'priceSaveStatus':'revenueSaveStatus');
  if(status) status.textContent='Salvo automaticamente neste navegador';
 }catch(e){}
}

function restoreSimulation(kind){
 const ids=kind==='price'?PRICE_STATE_IDS:REVENUE_STATE_IDS;
 let data=null;
 try{data=JSON.parse(localStorage.getItem(stateKey(kind))||'null');}catch(e){}
 if(!data) return false;
 ids.forEach(function(id){
  const el=$(id); if(!el||data[id]===undefined) return;
  if(el.type==='checkbox') el.checked=!!data[id];
  else el.value=data[id];
 });
 return true;
}

function bindAutosave(kind){
 const ids=kind==='price'?PRICE_STATE_IDS:REVENUE_STATE_IDS;
 ids.forEach(function(id){
  const el=$(id); if(!el) return;
  el.addEventListener('input',function(){saveSimulation(kind);});
  el.addEventListener('change',function(){saveSimulation(kind);});
 });
}

function snapshotState(kind){
 const ids=kind==='price'?PRICE_STATE_IDS:REVENUE_STATE_IDS;
 const data={};
 ids.forEach(function(id){
  const el=$(id); if(!el) return;
  data[id]=el.type==='checkbox'?el.checked:el.value;
 });
 return data;
}

function namedScenarioKey(){return 'jaguar-rtav-named-scenarios-v1';}

function readNamedScenarios(){
 try{
  const data=JSON.parse(localStorage.getItem(namedScenarioKey())||'null');
  return data&&typeof data==='object'?data:{price:[],revenue:[]};
 }catch(e){return {price:[],revenue:[]};}
}

function writeNamedScenarios(store){
 try{localStorage.setItem(namedScenarioKey(),JSON.stringify(store));}catch(e){}
}

function renderScenarioOptions(kind){
 const select=$(kind==='price'?'priceScenarioSelect':'revenueScenarioSelect');
 if(!select) return;
 const store=readNamedScenarios();
 const rows=store[kind]||[];
 select.innerHTML='<option value="">'+(rows.length?'Selecione um cenário':'Nenhum cenário salvo')+'</option>'+
  rows.map(function(x){return '<option value="'+x.id+'">'+xmlEsc(x.name)+(x.client?' · '+xmlEsc(x.client):'')+'</option>';}).join('');
}

function saveNamedScenario(kind){
 const nameInput=$(kind==='price'?'priceScenarioName':'revenueScenarioName');
 const clientInput=$(kind==='price'?'priceClientName':'revenueClientName');
 const name=(nameInput?.value||'').trim();
 if(!name){
  const panel=$(kind==='price'?'priceScenarioCompare':'revenueScenarioCompare');
  if(panel) panel.innerHTML='<div class="validation-message warning">Dê um nome ao cenário antes de salvar.</div>';
  return;
 }
 const store=readNamedScenarios();
 const item={
  id:String(Date.now()),
  name,
  client:(clientInput?.value||'').trim(),
  savedAt:new Date().toISOString(),
  data:snapshotState(kind)
 };
 store[kind]=[item].concat(store[kind]||[]).slice(0,30);
 writeNamedScenarios(store);
 renderScenarioOptions(kind);
 const select=$(kind==='price'?'priceScenarioSelect':'revenueScenarioSelect');
 if(select) select.value=item.id;
 const panel=$(kind==='price'?'priceScenarioCompare':'revenueScenarioCompare');
 if(panel) panel.innerHTML='<div class="validation-message info">Cenário “'+xmlEsc(name)+'” salvo neste navegador.</div>';
}

function selectedNamedScenario(kind){
 const id=$(kind==='price'?'priceScenarioSelect':'revenueScenarioSelect')?.value||'';
 const rows=readNamedScenarios()[kind]||[];
 return rows.find(function(x){return x.id===id;})||null;
}

function applySnapshot(kind,data){
 const ids=kind==='price'?PRICE_STATE_IDS:REVENUE_STATE_IDS;
 ids.forEach(function(id){
  const el=$(id); if(!el||data[id]===undefined) return;
  if(el.type==='checkbox') el.checked=!!data[id];
  else el.value=data[id];
 });
 if(kind==='price'){applyRegimeUI({preset:false});calcIntegrated();saveSimulation('price');}
 else{revApplyUI({preset:false});revCalcIntegrated();saveSimulation('revenue');}
}

function loadNamedScenario(kind){
 const item=selectedNamedScenario(kind);
 if(!item) return;
 applySnapshot(kind,item.data||{});
 const client=$(kind==='price'?'priceClientName':'revenueClientName');
 if(client&&item.client) client.value=item.client;
}

function numberFromState(data,id,fallback=0){
 const v=Number(data?.[id]);
 return Number.isFinite(v)?v:fallback;
}

function priceInputFromState(data){
 return {
  regime:data?.taxRegime||'presumido',
  amount:numberFromState(data,'priceNow'),
  currentRates:{
   pis:numberFromState(data,'pisRate'),cofins:numberFromState(data,'cofinsRate'),
   icms:numberFromState(data,'icmsRate'),iss:numberFromState(data,'issRate'),ipi:numberFromState(data,'ipiRate')
  },
  simple:{annex:data?.snAnnex||'III',rbt12:numberFromState(data,'snRbt12')},
  future:{mode:data?.rateMode||'rtav',reduction:numberFromState(data,'rateReduction'),cbs:numberFromState(data,'cbsRate'),ibs:numberFromState(data,'ibsRate')},
  hybridFuture:{mode:data?.hybridRateMode||'rtav',reduction:numberFromState(data,'hybridReduction'),cbs:numberFromState(data,'hybridCbsRate'),ibs:numberFromState(data,'hybridIbsRate')},
  buyer:{profile:data?.priceBuyerProfile||'b2c',currentCredit:numberFromState(data,'priceCurrentBuyerCredit'),usePct:numberFromState(data,'priceBuyerCreditPct',100)}
 };
}

function revenueInputFromState(data){
 return {
  regime:data?.revTaxRegime||'presumido',
  amount:numberFromState(data,'revCurrentRevenue'),
  currentRates:{
   pis:numberFromState(data,'revPisRate'),cofins:numberFromState(data,'revCofinsRate'),
   icms:numberFromState(data,'revIcmsRate'),iss:numberFromState(data,'revIssRate'),ipi:numberFromState(data,'revIpiRate')
  },
  simple:{annex:data?.revSnAnnex||'III',rbt12:numberFromState(data,'revSnRbt12')},
  future:{mode:data?.revRateMode||'rtav',reduction:numberFromState(data,'revRateReduction'),cbs:numberFromState(data,'revCbsRate'),ibs:numberFromState(data,'revIbsRate')},
  hybridFuture:{mode:data?.revHybridRateMode||'rtav',reduction:numberFromState(data,'revHybridReduction'),cbs:numberFromState(data,'revHybridCbsRate'),ibs:numberFromState(data,'revHybridIbsRate')},
  purchases:{creditablePct:numberFromState(data,'revCreditablePurchasesPct'),usePct:numberFromState(data,'revPurchaseCreditUsePct',100)}
 };
}

function compareNamedScenario(kind){
 const saved=selectedNamedScenario(kind);
 const panel=$(kind==='price'?'priceScenarioCompare':'revenueScenarioCompare');
 if(!saved||!panel) return;

 if(kind==='price'){
  const year=Number($('priceYear')?.value||2027);
  const current=RTAV_ENGINE.futurePriceScenario(priceEngineInput(),year);
  const other=RTAV_ENGINE.futurePriceScenario(priceInputFromState(saved.data),year);
  panel.innerHTML='<div class="scenario-compare-grid">'+
   compareItem('Preço',other.price,current.price)+
   compareItem('Tributos',other.taxes,current.taxes)+
   compareItem('Valor líquido',other.net,current.net)+
   compareItem('Custo comprador',other.buyerCost??other.price,current.buyerCost??current.price)+
  '</div><div class="rate-note">Comparação em '+year+' · cenário salvo: '+xmlEsc(saved.name)+'.</div>';
 }else{
  const year=Number($('revYear')?.value||2027);
  const current=RTAV_ENGINE.futureRevenueScenario(revenueEngineInput(),year);
  const other=RTAV_ENGINE.futureRevenueScenario(revenueInputFromState(saved.data),year);
  panel.innerHTML='<div class="scenario-compare-grid">'+
   compareItem('Faturamento',other.revenue,current.revenue)+
   compareItem('Tributos brutos',other.taxes,current.taxes)+
   compareItem('Carga líquida',other.netTax??other.taxes,current.netTax??current.taxes)+
   compareItem('Líquido econômico',other.economicNet??other.net,current.economicNet??current.net)+
  '</div><div class="rate-note">Comparação em '+year+' · cenário salvo: '+xmlEsc(saved.name)+'.</div>';
 }
}

function compareItem(label,saved,current){
 const delta=effectPct(saved,current);
 return '<div class="scenario-compare-item"><small>'+label+'</small><b>'+money(current)+'</b><span>Salvo: '+money(saved)+' · '+effectText(delta)+'</span></div>';
}

function resetSimulation(kind){
 try{localStorage.removeItem(stateKey(kind));}catch(e){}
 location.reload();
}

$('taxRegime')?.addEventListener('change',function(){applyRegimeUI({preset:true});});
$('snAnnex')?.addEventListener('change',function(){updateSnSummary();calcIntegrated();});
$('snRbt12')?.addEventListener('input',function(){updateSnSummary();calcIntegrated();});
$('priceYear')?.addEventListener('change',applyYearPreset);
$('exportPriceExcelBtn')?.addEventListener('click',exportPriceExcel);
$('priceQuickPreset')?.addEventListener('change',function(){applyQuickPreset('price');});
$('pricePresentationBtn')?.addEventListener('click',function(){togglePresentation('price');});
$('pricePrintBtn')?.addEventListener('click',function(){printTaxReport('price');});
$('resetPriceSimulation')?.addEventListener('click',function(){resetSimulation('price');});
$('savePriceScenario')?.addEventListener('click',function(){saveNamedScenario('price');});
$('loadPriceScenario')?.addEventListener('click',function(){loadNamedScenario('price');});
$('comparePriceScenario')?.addEventListener('click',function(){compareNamedScenario('price');});
$('priceBuyerProfile')?.addEventListener('change',calcIntegrated);
$('priceCurrentBuyerCredit')?.addEventListener('input',calcIntegrated);
$('priceBuyerCreditPct')?.addEventListener('input',calcIntegrated);

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
$('revenueQuickPreset')?.addEventListener('change',function(){applyQuickPreset('revenue');});
$('revenuePresentationBtn')?.addEventListener('click',function(){togglePresentation('revenue');});
$('revenuePrintBtn')?.addEventListener('click',function(){printTaxReport('revenue');});
$('resetRevenueSimulation')?.addEventListener('click',function(){resetSimulation('revenue');});
$('saveRevenueScenario')?.addEventListener('click',function(){saveNamedScenario('revenue');});
$('loadRevenueScenario')?.addEventListener('click',function(){loadNamedScenario('revenue');});
$('compareRevenueScenario')?.addEventListener('click',function(){compareNamedScenario('revenue');});
$('revCreditablePurchasesPct')?.addEventListener('input',revCalcIntegrated);
$('revPurchaseCreditUsePct')?.addEventListener('input',revCalcIntegrated);

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


$('practiceSearch')?.addEventListener('input',renderPracticeGrid);
$('practiceRegimeFilter')?.addEventListener('change',renderPracticeGrid);
$('practiceSectorFilter')?.addEventListener('change',renderPracticeGrid);
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

const priceRestored=restoreSimulation('price');
const revenueRestored=restoreSimulation('revenue');

if(priceRestored) applyRegimeUI({preset:false});
else calcIntegrated();

if(revenueRestored) revApplyUI({preset:false});
else revCalcIntegrated();

bindAutosave('price');
bindAutosave('revenue');
renderScenarioOptions('price');
renderScenarioOptions('revenue');

let initialTool='price';
try{initialTool=localStorage.getItem('jaguar-rtav-active-tool')||'price';}catch(e){}
showTaxTool(initialTool==='revenue'?'revenue':'price');
calcLP();
