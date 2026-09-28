const $=id=>document.getElementById(id);
const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const pct=v=>Number(v||0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:4})+'%';

function parseMoneyInput(value){
 const raw=String(value??'').trim().replace(/\s+/g,'').replace(/^R\$/i,'');
 if(!raw) return 0;
 let normalized=raw;
 if(raw.includes(',')) normalized=raw.replace(/\./g,'').replace(',','.');
 else if(/^-?\d{1,3}(\.\d{3})+$/.test(raw)) normalized=raw.replace(/\./g,'');
 const parsed=Number(normalized);
 return Number.isFinite(parsed)?parsed:0;
}
const num=id=>{
 const el=$(id);
 if(!el) return 0;
 return el.classList.contains('money-input')?parseMoneyInput(el.value):Number(el.value||0);
};
function formatMoneyInput(el){
 if(!el) return;
 const value=parseMoneyInput(el.value);
 el.value=value.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function formatPrimaryMoneyInputs(){
 ['priceNow','priceFutureQuote','priceCurrentRealCredit','priceCurrentPresumedCredit','priceFutureCredit','revCurrentRevenue'].forEach(function(id){
  if($(id)?.value.trim()) formatMoneyInput($(id));
 });
}
const signedMoney=(value,sign)=>sign+' '+money(value);

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

const courseEscape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function courseText(value){
 return String(value||'').split('\n').map(line=>{
  const safe=courseEscape(line);
  if(/^(COMO ERA ANTES|COMO É AGORA)/.test(line))return '<h3 class="course-subhead">'+safe+'</h3>';
  if(/^[-*•]\s/.test(line))return '<p class="course-bullet">'+safe.replace(/^[-*•]\s*/,'')+'</p>';
  return '<p>'+safe+'</p>';
 }).join('');
}

function renderHome(){
 if($('homeModules')) $('homeModules').innerHTML=STUDY_MODULES.slice(0,6).map(moduleCard).join('');
 if($('moduleGrid')) $('moduleGrid').innerHTML=STUDY_MODULES.map(moduleCard).join('');
 $('sourceGrid').innerHTML=SOURCES.map(s=>`<article class="source-card">
   <h3>${s[0]}</h3><p>${s[2]}</p>${s[1]==='#'?'<span class="source-note">Material interno do estudo</span>':`<a href="${s[1]}" target="_blank" rel="noopener">Abrir fonte oficial →</a>`}
 </article>`).join('');
 $('timeline').innerHTML=Object.entries(TIMELINE).map(([y,o])=>`<button class="year" onclick="pickYear('${y}')" data-year="${y}"><b>${y}</b><small>${o.label}</small></button>`).join('');
 pickYear('2027');
}

const QUIZ_HISTORY_KEY='jaguar-rtav-quiz-history-v2';
const QUIZ_SESSION_KEY='jaguar-rtav-quiz-session-v3';
let quizSession=null;
function quizRead(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback;}catch(e){return fallback;}}
function quizSave(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}}
function quizTitle(id){return id==='all'?'Todos os módulos':`Módulo ${id} · ${STUDY_MODULES.find(m=>m.id===id)?.title||''}`;}
function updateQuizStats(){
 const el=$('quizStats');if(!el)return;
 const key=$('quizModule')?.value||'all';
 const stats=quizRead(QUIZ_HISTORY_KEY,{results:{}}).results?.[key];
 el.textContent=stats?`${stats.attempts} tentativa${stats.attempts===1?'':'s'} · última nota ${stats.last}/10 · melhor nota ${stats.best}/10`:'Primeiro teste deste conteúdo · seu desempenho aparecerá aqui.';
}
function updateQuizResume(){
 if(!quizSession||!$('quizResume'))return;
 $('quizResume').innerHTML=`<button type="button" onclick="resumeQuiz()">${quizSession.finished?'Rever resultado':'Continuar teste'} · ${courseEscape(quizTitle(quizSession.scope))} →</button>`;
}

function initQuiz(){
 const select=$('quizModule');
 if(!select)return;
 select.innerHTML='<option value="all">Todos os módulos · 10 perguntas mistas</option>'+STUDY_MODULES.map(m=>`<option value="${m.id}">Módulo ${m.id} · ${courseEscape(m.title)}</option>`).join('');
 const saved=quizRead(QUIZ_SESSION_KEY,null);
 if(saved?.questions?.length===10&&saved.questions.every(q=>QUIZ_BANK[q.module])){
  const contexts=new Map(RTAV_QUIZ.pool(QUIZ_BANK).map(q=>[q.id,q.context]));
  saved.questions.forEach(q=>{q.context=contexts.get(q.id)||q.context;});
  quizSession=saved;
  select.value=saved.scope;
  updateQuizResume();
 }
 select.addEventListener('change',updateQuizStats);
 updateQuizStats();
}

function startQuiz(same=false,scope){
 if(same&&(!quizSession||quizSession.questions.length!==10))return;
 if(same){quizSession={...quizSession,answers:Array(10).fill(null),finished:false};}
 else{
  const selected=scope||$('quizModule').value;
  const history=quizRead(QUIZ_HISTORY_KEY,{seen:[],moduleCounts:{}});
  const previous=quizSession?.scope===selected?quizSession.questions.map(q=>q.id):[];
  const questions=RTAV_QUIZ.build(selected,QUIZ_BANK,history.seen||[],history.moduleCounts||{},previous);
  quizSession={scope:selected,questions,answers:Array(10).fill(null),finished:false};
  $('quizModule').value=selected;
 }
 quizSave(QUIZ_SESSION_KEY,quizSession);
 updateQuizResume();
 renderQuiz();
 go('quizPage');
}

function startModuleQuiz(id){startQuiz(false,id);}

function resumeQuiz(){if(quizSession){renderQuiz();go('quizPage');}}

function quizAnswer(index,option){
 if(!quizSession||quizSession.finished)return;
 quizSession.answers[index]=option;
 quizSave(QUIZ_SESSION_KEY,quizSession);
 const answered=quizSession.answers.filter(x=>x!==null).length;
 $('quizProgress').textContent=`${answered} de 10 respondidas`;
 $('quizProgressBar').style.width=`${answered*10}%`;
 $('quizError').textContent='';
}

function renderQuiz(){
 const s=quizSession;if(!s)return;
 if(s.finished){renderQuizResult();return;}
 const answered=s.answers.filter(x=>x!==null).length;
 $('quizPage').innerHTML=`<button class="back" onclick="go('quiz')">← Escolher teste</button>
  <span class="module-no">${courseEscape(quizTitle(s.scope))}</span><h1 class="page-title">Teste de conhecimento</h1>
  <p class="page-lead">Responda as 10 questões. O resultado e as explicações aparecem após a entrega.</p>
  <div class="quiz-progress"><span id="quizProgress">${answered} de 10 respondidas</span><div><i id="quizProgressBar" style="width:${answered*10}%"></i></div></div>
  <form id="quizForm" onsubmit="event.preventDefault();finishQuiz()">${s.questions.map((q,i)=>`
   <fieldset class="quiz-question" id="quiz-question-${i}"><legend><small>QUESTÃO ${String(i+1).padStart(2,'0')} · ${q.kind==='concept'?'INTERPRETAÇÃO':'CASO PRÁTICO'} · MÓDULO ${q.module} — ${courseEscape(STUDY_MODULES.find(m=>m.id===q.module)?.title||'')}</small><span class="quiz-context">${courseEscape(q.context||'')}</span><strong>${courseEscape(q.prompt)}</strong></legend>
   ${q.options.map((option,j)=>`<label class="quiz-option"><input type="radio" name="question-${i}" value="${j}" ${s.answers[i]===j?'checked':''} onchange="quizAnswer(${i},${j})"><span>${courseEscape(option)}</span></label>`).join('')}</fieldset>`).join('')}
   <p id="quizError" class="quiz-error" role="alert"></p><button class="quiz-primary quiz-submit" type="submit">Conferir respostas →</button></form>`;
}

function finishQuiz(){
 const s=quizSession;if(!s||s.finished)return;
 const missing=s.answers.findIndex(x=>x===null);
 if(missing!==-1){$('quizError').textContent=`Responda a questão ${missing+1} antes de conferir.`;$(`quiz-question-${missing}`).scrollIntoView({behavior:'smooth',block:'center'});return;}
 const history=quizRead(QUIZ_HISTORY_KEY,{seen:[],moduleCounts:{}});
 history.seen=[...new Set([...(history.seen||[]),...s.questions.map(q=>q.id)])];
 history.moduleCounts=history.moduleCounts||{};
 s.questions.forEach(q=>{history.moduleCounts[q.module]=(history.moduleCounts[q.module]||0)+1;});
 history.results=history.results||{};
 const prev=history.results[s.scope]||{attempts:0,best:0};
 const score=RTAV_QUIZ.grade(s.questions,s.answers).score;
 history.results[s.scope]={attempts:prev.attempts+1,last:score,best:Math.max(prev.best,score)};
 quizSave(QUIZ_HISTORY_KEY,history);
 updateQuizStats();
 s.finished=true;
 quizSave(QUIZ_SESSION_KEY,s);
 updateQuizResume();
 renderQuizResult();
 window.scrollTo({top:0,behavior:'smooth'});
}

function renderQuizResult(){
 const s=quizSession;if(!s)return;
 const result=RTAV_QUIZ.grade(s.questions,s.answers);
 $('quizPage').innerHTML=`<button class="back" onclick="go('quiz')">← Escolher teste</button>
  <span class="module-no">${courseEscape(quizTitle(s.scope))}</span>
  <div class="quiz-result"><small>RESULTADO DO TESTE</small><h1>${result.score} de ${result.total}</h1><p>${result.score===10?'Você acertou todas. Gere uma nova seleção para avançar.':'Veja as explicações abaixo e revise os módulos em que teve dúvida.'}</p></div>
  <div class="quiz-actions"><button class="quiz-primary" onclick="startQuiz(true)">Refazer este teste</button><button onclick="startQuiz(false,'${s.scope}')">Novo teste · ${s.scope==='all'?'todos os módulos':'módulo '+s.scope}</button></div>
  <div class="quiz-review">${s.questions.map((q,i)=>`<article class="quiz-review-item ${result.details[i].ok?'is-correct':'is-wrong'}">
   <small>QUESTÃO ${i+1} · MÓDULO ${q.module} · ${result.details[i].ok?'ACERTOU':'REVISAR'}</small><p class="quiz-review-context">${courseEscape(q.context||'')}</p><h2>${courseEscape(q.prompt)}</h2>
   <p>Sua resposta: <b>${courseEscape(q.options[s.answers[i]])}</b></p>
   ${result.details[i].ok?'':`<p>Resposta correta: <b>${courseEscape(q.options[q.correct])}</b></p>`}
   <div class="quiz-explanation">${courseEscape(q.explanation)}</div><button onclick="openModule('${q.module}')">Revisar módulo ${q.module} →</button>
  </article>`).join('')}</div>
  <div class="quiz-actions"><button class="quiz-primary" onclick="startQuiz(true)">Refazer as mesmas perguntas</button><button onclick="startQuiz(false,'${s.scope}')">Gerar perguntas novas →</button></div>`;
}

function openModule(id){
 const m=STUDY_MODULES.find(x=>x.id===id);
 if(!m)return;
 if(m.fullCourse){
  const index=STUDY_MODULES.indexOf(m);
  const blocks=m.blocks.map((b,i)=>`<section class="lesson-block course-block" id="course-${m.id}-${i+1}">
   <div class="lesson-top"><span class="step-no">${String(i+1).padStart(2,'0')}</span><span class="tag">${courseEscape(b.k)}</span></div>
   <h2>${courseEscape(b.t)}</h2><div class="course-text">${courseText(b.x)}</div>
  </section>`).join('');
  $('modulePage').innerHTML=`
   <button class="back" onclick="go('modules')">← Todos os estudos</button>
   <span class="module-no">MÓDULO ${m.id} DE ${STUDY_MODULES.length}</span>
   <h1 class="page-title">${courseEscape(m.title)}</h1>
   <p class="page-lead">${courseEscape(m.subtitle)}</p>
   <div class="course-note"><b>Premissas dos exemplos</b><p>Os valores de CBS 9,21% e IBS 18,70% são parâmetros didáticos deste curso. A alíquota efetiva e os créditos dependem do ano, do destino, do regime, da operação e dos requisitos legais. Confira as regras vigentes antes de aplicar um exemplo a uma empresa.</p></div>
   <nav class="course-toc" aria-label="Nesta aula">${m.blocks.map((b,i)=>`<a href="#course-${m.id}-${i+1}">${courseEscape(b.t)}</a>`).join('')}</nav>
   <div class="lesson-stack">${blocks}</div>
   <div class="course-quiz-callout"><div><b>Concluiu a leitura?</b><span>Confira o que aprendeu em 10 perguntas deste módulo.</span></div><button class="quiz-primary" onclick="startModuleQuiz('${m.id}')">Fazer teste do módulo ${m.id} →</button></div>
   <div class="course-navigation">${index>0?`<button onclick="openModule('${STUDY_MODULES[index-1].id}')">← Módulo anterior</button>`:'<span></span>'}${index<STUDY_MODULES.length-1?`<button onclick="openModule('${STUDY_MODULES[index+1].id}')">Próximo módulo →</button>`:`<button onclick="go('modules')">Ver todos os módulos →</button>`}</div>`;
  go('modulePage');
  return;
 }
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
 const company=regime();
 if($('simplesCurrentFields')) $('simplesCurrentFields').style.display='block';
 if($('regularFutureFields')) $('regularFutureFields').style.display='block';

 const credit=$('priceTakesCbsIbsCredit');
 if(credit){
  if(company==='simples'){
   credit.checked=false;
   credit.disabled=true;
  }else{
   credit.disabled=false;
   if(preset) credit.checked=true;
  }
 }
 updateSnSummary();
 applyYearPreset();
}

function applyYearPreset(){
 const y=Number($('priceYear')?.value||2027);
 const p=TRANSITION[y]||TRANSITION[2027];
 if($('rateMode')?.value==='rtav'){
  $('cbsRate').value=p.cbs;
  $('ibsRate').value=p.ibs;
 }
 updateSnSummary();

 if($('rateNote')){
  const company=regime();
  if(company==='simples'){
   $('rateNote').textContent='Simples Nacional padrão: a empresa compradora não toma crédito de IBS/CBS. Os quatro cenários de fornecedor são comparados sem abatimento de crédito.';
  }else if(company==='simples_hybrid'){
   $('rateNote').textContent='Simples Nacional híbrido: IBS/CBS são apurados fora do DAS pelo regime regular; em compras creditáveis, a empresa pode aproveitar os créditos correspondentes.';
  }else{
   $('rateNote').textContent=($('rateMode')?.value==='manual')
    ? 'Regime regular da empresa compradora. CBS e IBS foram informados manualmente; a compra só gera crédito quando o tique estiver marcado.'
    : 'Empresa compradora no regime regular. Quando a compra gera crédito, o custo efetivo desconta CBS/IBS conforme o regime de cada fornecedor.';
  }
 }
 calcIntegrated();
}

function priceEngineInput(){
 return {
  companyRegime:regime(),
  amount:Math.max(0,num('priceNow')),
  currentRates:{icms:num('icmsRate'),iss:num('issRate'),ipi:num('ipiRate')},
  simple:{annex:snAnnex(),rbt12:num('snRbt12')},
  future:{mode:$('rateMode')?.value||'rtav',reduction:num('rateReduction'),cbs:num('cbsRate'),ibs:num('ibsRate')},
  purchaseGeneratesCredit:!!$('priceTakesCbsIbsCredit')?.checked
 };
}

function buyerModelInput(input=priceEngineInput()){
 return {...input,supplierRegime:$('exampleSupplier')?.value,
  futurePrice:$('priceFutureQuote')?.value.trim()?num('priceFutureQuote'):null,
  currentRealCredit:num('priceCurrentRealCredit'),currentPresumedCredit:num('priceCurrentPresumedCredit'),
  futureCredit:$('priceFutureCredit')?.value.trim()?num('priceFutureCredit'):null};
}

function projectedPurchasePrice(year,input=priceEngineInput()){
 const quote=$('priceFutureQuote')?.value.trim();
 return quote?num('priceFutureQuote'):RTAV_ENGINE.supplierPriceProjection(buyerModelInput(input),year).projectedPrice;
}

function purchaseComparison(year=Number($('priceYear')?.value||2027),input=priceEngineInput()){
 return RTAV_ENGINE.supplierPurchaseComparison({...input,amount:projectedPurchasePrice(year,input)},year);
}

function renderBuyerExample(year,input){
 const model=RTAV_ENGINE.buyerPurchaseComparison(buyerModelInput(input),year);
 const p=model.projection;
 $('priceEquationMemory').innerHTML=model.quoteProvided
  ?'<b>Cotação informada:</b> '+money(model.futurePrice)+'. Projeção pela equação: '+money(p.projectedPrice)+'. O cálculo do custo usa a cotação informada.'
  :p.method==='formula_evento'
   ?'<b>Equação do evento:</b> ('+money(p.currentPrice)+' − '+money(p.currentTaxes)+') × (1 + '+pct(p.newRate*100)+')'+(year<2033?' ÷ (1 − '+pct(p.remainingRate*100)+')':'')+' = <b>'+money(p.projectedPrice)+'</b>. Tributos antigos remanescentes do ano no denominador.'
   :'<b>Projeção do fornecedor no '+(p.method==='simples_hibrido'?'Simples híbrido':'Simples padrão')+':</b> '+money(p.projectedPrice)+'. O cálculo segue o DAS e as parcelas de IBS/CBS desse regime.';
 const labels={simples:'Simples Nacional',presumido:'Lucro Presumido',real:'Lucro Real',simples_hybrid:'Simples híbrido'};
 $('buyerExample').innerHTML='<div class="buyer-example-head"><b>Fornecedor '+labels[model.supplierRegime]+'</b><span>Hoje '+money(model.currentPrice)+' · '+year+' '+money(model.futurePrice)+'</span></div>'+
  '<div class="buyer-example-grid">'+Object.entries(model.buyers).map(function([key,x]){
   const delta=x.changePct;
   return '<article class="buyer-example-card" data-buyer="'+key+'"><h4>Cliente '+labels[key]+'</h4>'+
    '<strong>Hoje</strong><div>Preço <b>'+money(x.currentPrice)+'</b></div><div>(−) Crédito <b>'+money(x.currentCredit)+'</b></div><div class="buyer-total">Custo efetivo <b>'+money(x.currentCost)+'</b></div>'+
    '<strong>'+year+'</strong><div>Preço <b>'+money(x.futurePrice)+'</b></div><div>(−) Crédito <b>'+money(x.credit)+'</b></div><div class="buyer-total">Custo efetivo <b>'+money(x.effectiveCost)+'</b></div>'+
    '<footer>Variação do custo <b class="'+(delta>0?'up':'down')+'">'+(delta>0?'+':'')+pct(delta)+'</b></footer></article>';
  }).join('')+'</div><p class="buyer-example-note">'+
  (model.creditOverridden?'Crédito futuro informado para esta simulação.':'Crédito futuro estimado pelas alíquotas e pelo regime do fornecedor.')+
  ' O crédito atual do Lucro Real e do Presumido é uma premissa ajustável; confirme os créditos efetivos da operação. O Simples padrão não apropria crédito de CBS/IBS.</p>';
}

function regimeExplanation(){
 const r=regime();
 if(r==='simples') return 'Sua empresa está no Simples Nacional padrão: ela não se apropria de créditos de CBS/IBS. Por isso, o crédito da compradora fica zerado em todos os fornecedores.';
 if(r==='simples_hybrid') return 'Sua empresa está no Simples Nacional híbrido: o Simples continua para os demais tributos, mas IBS/CBS são apurados pelo regime regular e podem gerar crédito nas aquisições creditáveis.';
 return 'Sua empresa está no regime regular: a mesma compra é comparada entre fornecedor no Lucro Presumido, Lucro Real, Simples Nacional padrão e Simples Nacional híbrido, com crédito quando a aquisição estiver marcada como creditável.';
}

function updateScenarioStrip(){
 const r=regime(),year=$('priceYear')?.value||'2027';
 if($('activeRegimeBadge')) $('activeRegimeBadge').textContent=REGIME_LABELS[r]||r;
 if($('activeYearBadge')) $('activeYearBadge').textContent=year;
 if($('resultYearLabel')) $('resultYearLabel').textContent=year;
}

function summaryRows(rows){
 return '<div class="tax-summary-list">'+rows.map(([label,value])=>`<div class="tax-summary-row"><span>${label}</span><b>${value}</b></div>`).join('')+'</div>';
}

const SUPPLIER_LABELS={
 presumido:'Fornecedor · Lucro Presumido',
 real:'Fornecedor · Lucro Real',
 simples:'Fornecedor · Simples Nacional',
 simples_hybrid:'Fornecedor · Simples Nacional híbrido'
};

function supplierCardHtml(key,item){
 const f=item.future||item;
 const sub=key==='presumido'||key==='real'
  ?'IBS/CBS no regime regular'
   :key==='simples_hybrid'
    ?SN_LABELS[snAnnex()]+' · híbrido · RBT12 '+money(num('snRbt12'))
    :SN_LABELS[snAnnex()]+' · padrão · RBT12 '+money(num('snRbt12'));
 return '<article class="supplier-card" data-supplier="'+key+'">'+
  '<div><h4>'+SUPPLIER_LABELS[key]+'</h4><div class="supplier-sub">'+sub+'</div></div>'+
  '<div class="supplier-cost"><small>Custo efetivo</small><b>'+money(item.effectiveCost)+'</b></div>'+
  '<div class="supplier-lines">'+
   '<div class="supplier-line"><span>Preço da compra</span><b>'+money(item.price)+'</b></div>'+
   '<div class="supplier-line"><span>CBS</span><b>'+money(item.cbs||0)+'</b></div>'+
   '<div class="supplier-line"><span>IBS</span><b>'+money(item.ibs||0)+'</b></div>'+
   '<div class="supplier-line"><span>Crédito para sua empresa</span><b>'+money(item.credit||0)+'</b></div>'+
   '<div class="supplier-line"><span>Tributos remanescentes</span><b>'+money(item.remnant||0)+'</b></div>'+
  '</div>'+
 '</article>';
}

function comparisonMemoryRows(comparison){
 const rows=[
  ['Regime da empresa',REGIME_LABELS[comparison.companyRegime]||comparison.companyRegime],
  ['Valor-base da compra',comparison.amount],
  ['Compra gera crédito',comparison.creditEnabled?'Sim':'Não']
 ];
 ['presumido','real','simples','simples_hybrid'].forEach(function(key){
  const x=comparison.suppliers[key];
  rows.push(
   [SUPPLIER_LABELS[key]+' · preço',x.price],
   [SUPPLIER_LABELS[key]+' · CBS',x.cbs],
   [SUPPLIER_LABELS[key]+' · IBS',x.ibs],
   [SUPPLIER_LABELS[key]+' · crédito',x.credit],
   [SUPPLIER_LABELS[key]+' · custo efetivo',x.effectiveCost]
  );
 });
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
 const y=Number($('priceYear')?.value||2027);
 const comparison=purchaseComparison(y,input);
 const messages=[];
 if(input.amount<=0) messages.push({level:'error',message:'Informe um valor de compra maior que zero.'});
 if($('priceFutureQuote')?.value.trim()&&num('priceFutureQuote')<=0) messages.push({level:'error',message:'O preço cotado precisa ser maior que zero.'});
 if(['presumido','real'].includes($('exampleSupplier')?.value)&&
  (num('icmsRate')+num('issRate')+num('ipiRate')+($('exampleSupplier').value==='real'?9.25:3.65))>=100)
  messages.push({level:'error',message:'A soma dos tributos atuais do fornecedor deve ser menor que 100%.'});
 if(num('priceCurrentRealCredit')>input.amount||num('priceCurrentPresumedCredit')>input.amount) messages.push({level:'error',message:'O crédito atual não pode superar o preço atual.'});
 if($('priceFutureCredit')?.value.trim()&&num('priceFutureCredit')>projectedPurchasePrice(y,input)) messages.push({level:'error',message:'O crédito CBS/IBS informado não pode superar o preço futuro.'});
 if(input.simple.rbt12<=0) messages.push({level:'error',message:'Informe o RBT12 do fornecedor do Simples.'});
 if(input.simple.rbt12>3600000) messages.push({level:'warning',message:'RBT12 do fornecedor do Simples acima de R$ 3,6 milhões exige validação específica do sublimite.'});
 if(input.simple.rbt12>4800000) messages.push({level:'error',message:'RBT12 acima de R$ 4,8 milhões: as tabelas automáticas do Simples desta ferramenta não se aplicam. Corrija o valor antes de comparar os fornecedores.'});
 if(input.companyRegime==='simples') messages.push({level:'info',message:'Empresa compradora no Simples padrão: não há apropriação de créditos de CBS/IBS nesta comparação.'});
 else if(!input.purchaseGeneratesCredit) messages.push({level:'info',message:'Compra marcada como não creditável: os quatro cenários de fornecedor serão comparados sem crédito de CBS/IBS.'});
 renderValidation('priceValidation',messages);
 if(messages.some(m=>m.level==='error')){
  $('buyerExample').innerHTML='';
  $('priceEquationMemory').innerHTML='';
  $('integratedKpis').innerHTML='';
  $('supplierComparisonGrid').innerHTML='';
  $('integratedExplanation').innerHTML='';
  renderMemory('priceMemory',[]);
  $('yearlyPriceStrip').innerHTML='';
  $('yearlyProjectionTable').innerHTML='';
  $('yearDetailPanel').innerHTML='';
  $('yearlyProjectionNote').textContent='Corrija os dados indicados acima para calcular a comparação.';
  yearlyRows=[];
  return;
 }
 renderBuyerExample(y,input);
 renderMemory('priceMemory',comparisonMemoryRows(comparison));

 $('resultSignal').textContent='4 CENÁRIOS';
 $('regimeResultNote').textContent=(REGIME_LABELS[regime()]||regime())+' · '+regimeExplanation();

 $('integratedKpis').innerHTML=
  '<div class="integrated-kpi dark"><small>Sua empresa</small><b>'+(REGIME_LABELS[comparison.companyRegime]||comparison.companyRegime)+'</b><span>Regime comprador</span></div>'+
  '<div class="integrated-kpi"><small>Compra-base</small><b>'+money(comparison.amount)+'</b><span>Mesmo valor para os 4 cenários</span></div>'+
  '<div class="integrated-kpi dark"><small>Ano analisado</small><b>'+y+'</b><span>Reforma</span></div>'+
  '<div class="integrated-kpi"><small>Crédito CBS/IBS</small><b>'+(comparison.creditEnabled?'Sim':'Não')+'</b><span>'+(comparison.regularBuyer?(input.purchaseGeneratesCredit?'Compra creditável':'Compra não creditável'):'Simples padrão')+'</span></div>';

 $('supplierComparisonGrid').innerHTML=['presumido','real','simples','simples_hybrid'].map(function(key){
  return supplierCardHtml(key,comparison.suppliers[key]);
 }).join('');

 $('integratedExplanation').innerHTML=
  '<b>Comparação da mesma compra entre quatro cenários de fornecedor.</b><p>'+
  'A empresa compradora está no regime <strong>'+(REGIME_LABELS[comparison.companyRegime]||comparison.companyRegime)+'</strong>. '+
  'O preço cotado é '+money(comparison.amount)+' em todos os cenários do ano escolhido. No Lucro Presumido e no Lucro Real, o crédito estimado é igual para a mesma compra e alíquota. '+
  'Os fornecedores do Simples usam '+SN_LABELS[snAnnex()]+' e o RBT12 informado. No Simples padrão, o crédito do comprador regular é limitado à parcela de IBS/CBS cobrada no DAS. No híbrido, IBS/CBS são apurados fora do DAS pelo regime regular. '+
  (comparison.creditEnabled
   ?'Como a empresa está no regime regular e a compra foi marcada como creditável, o custo efetivo desconta os créditos de CBS/IBS permitidos em cada cenário.'
   :'Nesta configuração, nenhum crédito de CBS/IBS é abatido do custo efetivo.')+
  '</p>';

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

function baseSupplierComparisonRow(){
 const amount=Math.max(0,num('priceNow'));
 const item={price:amount,cbs:0,ibs:0,remnant:0,credit:0,effectiveCost:amount};
 return {
  year:2026,
  comparison:{
   year:2026,
   companyRegime:regime(),
   regularBuyer:regime()!=='simples',
   creditEnabled:false,
   amount,
   suppliers:{presumido:{...item},real:{...item},simples:{...item},simples_hybrid:{...item}}
  }
 };
}

function renderYearDetail(year){
 if(!$('yearDetailPanel')||!yearlyRows.length) return;
 const row=yearlyRows.find(r=>r.year===Number(year))||yearlyRows[0];
 const c=row.comparison;

 $('yearDetailPanel').classList.add('visible');
 $('yearDetailPanel').innerHTML=
  '<div class="year-detail-top">'+
   '<div><span>EMPRESA '+(REGIME_LABELS[c.companyRegime]||c.companyRegime).toUpperCase()+'</span><h4>'+row.year+' · custo por fornecedor</h4></div>'+
   '<div class="year-detail-price"><small>COMPRA-BASE</small><b>'+money(c.amount)+'</b></div>'+
  '</div>'+
  '<div class="year-detail-grid tax-detail">'+
   ['presumido','real','simples','simples_hybrid'].map(function(key){
    const x=c.suppliers[key];
    return '<div class="year-detail-item"><small>'+SUPPLIER_LABELS[key]+'</small><b>'+money(x.effectiveCost)+'</b><span>Crédito '+money(x.credit||0)+'</span></div>';
   }).join('')+
  '</div>'+
  '<div class="tax-analysis-text"><b>Leitura do ano</b><p>'+
   (row.year===2026
   ?'2026 mostra o valor total informado, sem estimativa dos créditos tributários atuais. A comparação de CBS/IBS começa em 2027.'
    :'Os quatro valores acima mantêm o preço da compra fixo e descontam apenas o crédito de CBS/IBS permitido para sua empresa em cada regime de fornecedor.')+
  '</p></div>';
}

function renderYearlyProjection(){
 if(!$('yearlyProjectionTable')) return;
 const selectedYear=Number($('priceYear')?.value||2027);
 const rows=[baseSupplierComparisonRow()];
 for(let year=2027;year<=2033;year++){
  rows.push({year,comparison:purchaseComparison(year)});
 }
 yearlyRows=rows;

 if(yearDetailSelected===null||!rows.some(x=>x.year===yearDetailSelected)) yearDetailSelected=selectedYear;

 $('yearlyPriceStrip').innerHTML=rows.map(function(row){
  const c=row.comparison.suppliers;
  return '<button type="button" class="year-price-card '+(row.year===yearDetailSelected?'active':'')+'" onclick="selectYearDetail('+row.year+')">'+
   '<small>'+row.year+'</small><b>LP '+money(c.presumido.effectiveCost)+'</b><span>LR '+money(c.real.effectiveCost)+' · SN '+money(c.simples.effectiveCost)+' · Híb. '+money(c.simples_hybrid.effectiveCost)+'</span>'+
  '</button>';
 }).join('');

 $('yearlyProjectionTable').innerHTML=rows.map(function(row){
  const c=row.comparison.suppliers;
  const cls=row.year===2026?'current-year':(row.year===yearDetailSelected?'selected-year':'');
  return '<tr class="'+cls+'" onclick="selectYearDetail('+row.year+')">'+
   '<td>'+row.year+'</td>'+
   '<td><strong>'+money(c.presumido.effectiveCost)+'</strong></td>'+
   '<td><strong>'+money(c.real.effectiveCost)+'</strong></td>'+
   '<td><strong>'+money(c.simples.effectiveCost)+'</strong></td>'+
   '<td><strong>'+money(c.simples_hybrid.effectiveCost)+'</strong></td>'+
  '</tr>';
 }).join('');

 renderYearDetail(yearDetailSelected);

 let note='A tabela usa o preço cotado informado como hipótese constante nos anos futuros e compara os créditos estimados de CBS/IBS por regime do fornecedor. Informe uma nova cotação para outro preço.';
 if(regime()==='simples') note+=' Como a empresa compradora está no Simples padrão, os créditos de CBS/IBS não são apropriados nesta simulação.';
 else if($('priceTakesCbsIbsCredit')?.checked) note+=' Para a empresa no regime regular, a compra foi considerada creditável.';
 else note+=' A compra foi marcada como não creditável.';
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
   $('revRateNote').textContent='Simples híbrido: CBS/IBS ficam fora da base do DAS. O ICMS/ISS contido no DAS residual é excluído da base da CBS/IBS.';
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
  if(c.pis>0) rows.push(['PIS',signedMoney(c.pis,'−')]);
  if(c.cofins>0) rows.push(['Cofins',signedMoney(c.cofins,'−')]);
  if(c.icms>0) rows.push(['ICMS',signedMoney(c.icms,'−')]);
  if(c.iss>0) rows.push(['ISS',signedMoney(c.iss,'−')]);
  if(c.ipi>0) rows.push(['IPI',signedMoney(c.ipi,'−')]);
 }else rows.push(['DAS / tributos',signedMoney(base.taxes,'−')]);
 rows.push(['Faturamento líquido',money(base.net)]);
 return rows;
}

function revFutureRows(x){
 const rows=[['Faturamento bruto projetado',money(x.revenue)]];
 if(x.cbs>0) rows.push(['CBS',signedMoney(x.cbs,'−')]);
 if(x.ibs>0) rows.push(['IBS',signedMoney(x.ibs,'−')]);
 if(x.remnant>0) rows.push(['DAS / tributos remanescentes',signedMoney(x.remnant,'−')]);
 rows.push(['Total de tributos',signedMoney(x.taxes,'−')]);
 if((x.purchaseCredit||0)>0){
  rows.push(['Créditos estimados das aquisições',money(x.purchaseCredit)]);
  rows.push(['Carga líquida após créditos',signedMoney(x.netTax,'−')]);
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

function hybridBaseRows(x){
 if(x.params?.type!=='hybrid') return [];
 return [
  ['Base do DAS residual',money(x.residualBase)],
  [x.params.excludedLabel+' no DAS — excluído da base CBS/IBS',money(x.excludedTax)],
  ['Base da CBS/IBS',money(x.cleanBase)]
 ];
}

function exportPriceExcel(){
 if(!yearlyRows.length) renderYearlyProjection();
 const selectedYear=Number($('priceYear')?.value||2027);
 const selected=purchaseComparison(selectedYear);
 downloadSpreadsheet(
  'comparacao-custo-fornecedores-'+regime()+'-2026-2033.xlsx',
  ['Ano','Custo fornecedor LP','Crédito LP','Custo fornecedor LR','Crédito LR','Custo fornecedor Simples','Crédito Simples','Custo fornecedor Simples híbrido','Crédito Simples híbrido'],
  yearlyRows.map(function(row){
   const x=row.comparison.suppliers;
   return [row.year,x.presumido.effectiveCost,x.presumido.credit||0,x.real.effectiveCost,x.real.credit||0,x.simples.effectiveCost,x.simples.credit||0,x.simples_hybrid.effectiveCost,x.simples_hybrid.credit||0];
  }),
  [
   ['Regime da empresa',REGIME_LABELS[regime()]||regime()],
   ['Compra hoje',num('priceNow')],
   ['Preço projetado/cotado no ano escolhido',projectedPurchasePrice(selectedYear)],
   ['Compra gera crédito CBS/IBS',$('priceTakesCbsIbsCredit')?.checked?'Sim':'Não'],
   ['RBT12 fornecedor Simples',num('snRbt12')],
   ['Anexo fornecedor Simples',SN_LABELS[snAnnex()]||snAnnex()],
   ['Ano destacado',selectedYear]
  ],
  comparisonMemoryRows(selected)
 );
}

function exportRevenueExcel(){
 if(!revenueYearlyRows.length) revRenderYearly();
 downloadSpreadsheet(
  'analise-faturamento-'+revRegime()+'-2026-2033.xlsx',
  ['Ano','Regime','Sistema','Faturamento bruto','Tributos brutos','Carga bruta %','Faturamento líquido antes dos créditos','CBS','IBS','DAS / tributos remanescentes','Créditos estimados das aquisições','Carga líquida','Líquido após créditos','Base DAS residual','ICMS/ISS excluído da base CBS/IBS','Base CBS/IBS'],
  revenueYearlyRows.map(function(x){
   return [x.year,REGIME_LABELS[x.regime],x.system,x.revenue,x.taxes,x.revenue?x.taxes/x.revenue*100:0,x.net,x.cbs??0,x.ibs??0,x.remnant,x.purchaseCredit??0,x.netTax??x.taxes,x.economicNet??x.net,x.residualBase??'',x.excludedTax??'',x.cleanBase??''];
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
 for(const [tax,value] of Object.entries({pis:p.pis,cofins:p.cofins,icms:p.icms,iss:p.iss,ipi:p.ipi})){
  if($(ids[tax])) $(ids[tax]).value=value;
 }

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
 const model=RTAV_ENGINE.buyerPurchaseComparison(buyerModelInput(input),year);
 const labels={simples:'Simples Nacional',presumido:'Lucro Presumido',real:'Lucro Real',simples_hybrid:'Simples híbrido'};
 const supplierCards=['simples','presumido','real','simples_hybrid'].map(function(key){
  const x=model.buyers[key];
  return {
   title:'Cliente '+labels[key],
   rows:[
    ['Preço hoje',money(x.currentPrice)],['Crédito hoje',money(x.currentCredit)],
    ['Custo efetivo hoje',money(x.currentCost)],
    ['Preço '+year,money(x.futurePrice)],['Crédito '+year,money(x.credit)],
    ['Custo efetivo '+year,money(x.effectiveCost)],
    ['Variação do custo',(x.changePct>0?'+':'')+pct(x.changePct)]
   ]
  };
 });
 const tableRows=[
  ['Hoje',...['simples','presumido','real','simples_hybrid'].map(key=>money(model.buyers[key].currentCost))],
  [year,...['simples','presumido','real','simples_hybrid'].map(key=>money(model.buyers[key].effectiveCost))]
 ];

 return {
  title:'Custo efetivo por regime do comprador',
  subtitle:'Fornecedor '+labels[model.supplierRegime]+' · análise de '+year,
  kpis:[
   ['Fornecedor',labels[model.supplierRegime],'Regime da venda'],
   ['Preço hoje',money(model.currentPrice),'Cotação atual'],
   ['Preço '+year,money(model.futurePrice),'Cotação futura'],
   ['Crédito '+year,money(model.futureCredit),model.creditOverridden?'Informado':'Estimado']
  ],
  currentRows:[],
  futureRows:[],
  supplierCards,
  tableHeaders:['Período','Cliente Simples','Cliente LP','Cliente LR','Cliente híbrido'],
  tableRows,
  note:'Um fornecedor, o mesmo preço em cada período para os quatro compradores. Crédito futuro '+(model.creditOverridden?'informado':'estimado')+'. Créditos atuais dependem da operação e devem ser conferidos.'
 };
}

function buildRevenuePdf(client,year){
 const input=revenueEngineInput();
 const base=RTAV_ENGINE.currentRevenueScenario(input);
 const future=RTAV_ENGINE.futureRevenueScenario(input,year);
 const regimeLabel=REGIME_LABELS[input.regime]||input.regime;
 const period=$('revRevenuePeriod')?.value||'mensal';

 // Mantém no PDF a mesma leitura visual da tela:
 // valores de entrada/líquidos sem sinal e tributos/saídas com sinal negativo.
 const currentRows=revCurrentRows(base);
 const futureRows=[
  ['Faturamento projetado',money(future.revenue)]
 ];
 if((future.cbs||0)>0) futureRows.push(['CBS',signedMoney(future.cbs,'−')]);
 if((future.ibs||0)>0) futureRows.push(['IBS',signedMoney(future.ibs,'−')]);
 if((future.remnant||0)>0) futureRows.push(['DAS / tributos remanescentes',signedMoney(future.remnant,'−')]);
 futureRows.push(['Tributos brutos',signedMoney(future.taxes,'−')]);
 if((future.purchaseCredit||0)>0){
  futureRows.push(['Créditos estimados',money(future.purchaseCredit)]);
  futureRows.push(['Carga líquida',signedMoney(future.netTax,'−')]);
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
   ?[x.year,money(x.revenue),signedMoney(x.taxes,'−'),money(x.purchaseCredit||0),signedMoney(x.netTax??x.taxes,'−')]
   :[x.year,money(x.revenue),signedMoney(x.taxes,'−'),pct(x.revenue?x.taxes/x.revenue*100:0),money(x.net)];
 });

 return {
  title:'Relatório de faturamento',
  subtitle:regimeLabel+' · '+period+' · análise de '+year,
  kpis:[
   ['Faturamento atual',money(base.revenue),'2026 · '+period],
   ['Faturamento projetado',money(future.revenue),String(year)],
   ['Tributos brutos',signedMoney(future.taxes,'−'),pct(future.revenue?future.taxes/future.revenue*100:0)+' do faturamento'],
   [(future.purchaseCredit||0)>0?'Carga líquida':'Faturamento líquido',(future.purchaseCredit||0)>0?signedMoney(future.netTax,'−'):money(future.net),(future.purchaseCredit||0)>0?'Após créditos estimados':'Após tributos']
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
  '<section class="pdf-section"><div class="pdf-section-title"><h2>Comparação tributária</h2><span>'+year+'</span></div>'+
   (data.supplierCards
    ?'<div class="pdf-grid supplier-pdf-grid">'+data.supplierCards.map(function(card){return '<div class="pdf-card"><h3>'+xmlEsc(card.title)+'</h3>'+pdfRows(card.rows)+'</div>';}).join('')+'</div>'
    :'<div class="pdf-grid"><div class="pdf-card"><h3>2026 · Atual</h3>'+pdfRows(data.currentRows)+'</div><div class="pdf-card"><h3>'+year+' · Reforma</h3>'+pdfRows(data.futureRows)+'</div></div>')+
  '</section>'+
  '<section class="pdf-section"><div class="pdf-section-title"><h2>'+(price?'Hoje × '+year:'Evolução 2026–2033')+'</h2><span>Resumo</span></div>'+
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
 'taxRegime','priceNow','exampleSupplier','priceFutureQuote','icmsRate','issRate','ipiRate','priceCurrentRealCredit','priceCurrentPresumedCredit','priceFutureCredit','snRbt12','snAnnex',
 'priceYear','rateMode','rateReduction','cbsRate','ibsRate','priceTakesCbsIbsCredit','priceClientName'
];
const REVENUE_STATE_IDS=[
 'revTaxRegime','revCurrentRevenue','revRevenuePeriod','revPisRate','revCofinsRate','revIcmsRate','revIssRate','revIpiRate',
 'revSnRbt12','revSnAnnex','revYear','revRateMode','revRateReduction','revCbsRate','revIbsRate','revHybridRateMode',
 'revHybridReduction','revHybridCbsRate','revHybridIbsRate','revCreditablePurchasesPct','revPurchaseCreditUsePct','revenueQuickPreset','revenueClientName'
];

function stateKey(kind){return 'jaguar-rtav-'+kind+'-simulation-'+(kind==='price'?'v2':'v1');}

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
 formatPrimaryMoneyInputs();
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
 const raw=data?.[id];
 const v=(id==='priceNow'||id==='revCurrentRevenue')?parseMoneyInput(raw):Number(raw);
 return Number.isFinite(v)?v:fallback;
}

function priceInputFromState(data){
 return {
  companyRegime:data?.taxRegime||'presumido',
  amount:data?.priceFutureQuote?numberFromState(data,'priceFutureQuote'):RTAV_ENGINE.supplierPriceProjection({
   amount:numberFromState(data,'priceNow'),supplierRegime:data?.exampleSupplier||'presumido',
   currentRates:{icms:numberFromState(data,'icmsRate'),iss:numberFromState(data,'issRate'),ipi:numberFromState(data,'ipiRate')},
   simple:{annex:data?.snAnnex||'I',rbt12:numberFromState(data,'snRbt12')},
   future:{mode:data?.rateMode||'rtav',reduction:numberFromState(data,'rateReduction'),cbs:numberFromState(data,'cbsRate'),ibs:numberFromState(data,'ibsRate')}
  },Number($('priceYear')?.value||2027)).projectedPrice,
  simple:{annex:data?.snAnnex||'I',rbt12:numberFromState(data,'snRbt12')},
  future:{mode:data?.rateMode||'rtav',reduction:numberFromState(data,'rateReduction'),cbs:numberFromState(data,'cbsRate'),ibs:numberFromState(data,'ibsRate')},
  purchaseGeneratesCredit:!!data?.priceTakesCbsIbsCredit
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
  const current=purchaseComparison(year);
  const other=RTAV_ENGINE.supplierPurchaseComparison(priceInputFromState(saved.data),year);
  panel.innerHTML='<div class="scenario-compare-grid">'+
   compareItem('Custo · fornecedor LP',other.suppliers.presumido.effectiveCost,current.suppliers.presumido.effectiveCost)+
   compareItem('Custo · fornecedor LR',other.suppliers.real.effectiveCost,current.suppliers.real.effectiveCost)+
   compareItem('Custo · fornecedor Simples',other.suppliers.simples.effectiveCost,current.suppliers.simples.effectiveCost)+
   compareItem('Custo · fornecedor Simples híbrido',other.suppliers.simples_hybrid.effectiveCost,current.suppliers.simples_hybrid.effectiveCost)+
  '</div><div class="rate-note">Comparação em '+year+' · cenário salvo: '+xmlEsc(saved.name)+'. Regime atual da empresa: '+xmlEsc(REGIME_LABELS[current.companyRegime]||current.companyRegime)+'.</div>';
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
$('priceTakesCbsIbsCredit')?.addEventListener('change',function(){calcIntegrated();});
$('priceCurrentBuyerCredit')?.addEventListener('input',calcIntegrated);

$('rateMode')?.addEventListener('change',function(){
 const manual=$('rateMode').value==='manual';
 $('cbsRate').readOnly=!manual;$('ibsRate').readOnly=!manual;applyYearPreset();
});
$('hybridRateMode')?.addEventListener('change',function(){
 const manual=$('hybridRateMode').value==='manual';
 $('hybridCbsRate').readOnly=!manual;$('hybridIbsRate').readOnly=!manual;applyYearPreset();
});
['priceNow','priceFutureQuote','priceCurrentRealCredit','priceCurrentPresumedCredit','priceFutureCredit','exampleSupplier','pisRate','cofinsRate','icmsRate','issRate','ipiRate','rateReduction','cbsRate','ibsRate','hybridReduction','hybridCbsRate','hybridIbsRate'].forEach(function(id){
 $(id)?.addEventListener('input',calcIntegrated);
});
$('priceNow')?.addEventListener('blur',function(){formatMoneyInput(this);calcIntegrated();});
$('applyEventExample')?.addEventListener('click',function(){
 $('priceNow').value='100,00';$('priceFutureQuote').value='104,15';
 $('priceCurrentRealCredit').value='9,25';$('priceCurrentPresumedCredit').value='0,00';
 $('priceFutureCredit').value='7,05';$('exampleSupplier').value='presumido';$('priceYear').value='2027';
 applyYearPreset();saveSimulation('price');
});
['priceFutureQuote','priceCurrentRealCredit','priceCurrentPresumedCredit','priceFutureCredit'].forEach(function(id){
 $(id)?.addEventListener('blur',function(){if(this.value.trim()) formatMoneyInput(this);calcIntegrated();});
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
$('revCurrentRevenue')?.addEventListener('blur',function(){formatMoneyInput(this);revCalcIntegrated();});


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
initQuiz();
searchModules('');

updateSnSummary();
applyRegimeUI({preset:true});
revUpdateSnSummary();
revApplyUI({preset:true});

const priceRestored=restoreSimulation('price');
const revenueRestored=restoreSimulation('revenue');
formatPrimaryMoneyInputs();

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
