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
 ['priceNow','revCurrentRevenue','revManualCbsCredit','revManualIbsCredit'].forEach(function(id){
  if($(id)?.value.trim()) formatMoneyInput($(id));
 });
}
const signedMoney=(value,sign)=>sign+' '+money(value);

function go(id){
 document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
 $(id)?.classList.add('active');
 document.querySelectorAll('[data-go]').forEach(b=>b.classList.toggle('active',b.dataset.go===id));
 if(id==='modules'){renderModuleGrid();renderLearningPath('learningPath');}
 if(id==='home'){renderHomeResume();renderHomeDashboard();renderLearningPath('homeLearningPath');}
 window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));

const STUDY_PROGRESS_KEY='jaguar-rtav-study-progress-v1';
const COURSE_ORDER_VERSION=2;
const COURSE_ID_MIGRATION=Object.freeze({
 '01':'01','02':'02','03':'03','04':'04','05':'05','14':'06','06':'07','16':'08',
 '15':'09','07':'10','09':'11','10':'12','08':'13','11':'14','12':'15','13':'16'
});
function remapCourseId(id){
 if(id==='all'||id==null)return id;
 const key=String(id).padStart(2,'0');
 return COURSE_ID_MIGRATION[key]||key;
}
function migrateStudyState(raw){
 if(!raw||typeof raw!=='object')return {__orderVersion:COURSE_ORDER_VERSION};
 if(raw.__orderVersion===COURSE_ORDER_VERSION)return raw;
 const next={__orderVersion:COURSE_ORDER_VERSION};
 for(const [oldId,value] of Object.entries(raw)){
  if(oldId.startsWith('__'))continue;
  const newId=remapCourseId(oldId);
  if(newId)next[newId]=value;
 }
 return next;
}
let studyFilter='all';
let activeCourse=null;
let courseAllVisible=false;
function studyProgress(){
 try{
  const raw=JSON.parse(localStorage.getItem(STUDY_PROGRESS_KEY))||{};
  const migrated=migrateStudyState(raw);
  if(migrated!==raw){localStorage.setItem(STUDY_PROGRESS_KEY,JSON.stringify(migrated));window.JaguarAccount?.changed();}
  return migrated;
 }catch(e){return {__orderVersion:COURSE_ORDER_VERSION};}
}
function saveStudyProgress(value){
 try{
  const next={...value,__orderVersion:COURSE_ORDER_VERSION};
  localStorage.setItem(STUDY_PROGRESS_KEY,JSON.stringify(next));window.JaguarAccount?.changed();
 }catch(e){}
}
function moduleProgress(m){const saved=studyProgress()[m.id]||{};return {read:Array.isArray(saved.read)?saved.read.filter(i=>Number.isInteger(i)&&i>=0&&i<m.blocks.length):[],step:Math.min(Math.max(Number(saved.step)||0,0),m.blocks.length-1)};}
function moduleStatus(m){const n=moduleProgress(m).read.length;return n===m.blocks.length?'Concluído':n?'Em andamento':'Começar';}
function moduleCard(m){
 const progress=moduleProgress(m), count=progress.read.length, status=moduleStatus(m);
 return `<button class="module-card" onclick="openModule('${m.id}')">
   <div><div class="module-card-top"><span class="module-no">MÓDULO ${m.id}</span><span class="module-status ${count===m.blocks.length?'done':''}">${status}</span></div><h3>${courseEscape(m.title)}</h3><p>${courseEscape(m.subtitle)}</p></div>
   <div><div class="module-card-progress" aria-label="${count} de ${m.blocks.length} etapas lidas"><i style="width:${100*count/m.blocks.length}%"></i></div><div class="card-foot"><span>${count} de ${m.blocks.length} etapas</span><span>${count?'Continuar':'Explorar aula'} →</span></div></div>
 </button>`;
}
function renderModuleGrid(){
 const grid=$('moduleGrid');if(!grid)return;
 const complete=STUDY_MODULES.filter(m=>moduleStatus(m)==='Concluído').length;
 $('studyProgressText').textContent=`${complete} de ${STUDY_MODULES.length} módulos concluídos`;
 $('studyProgressFill').style.width=`${100*complete/STUDY_MODULES.length}%`;
 document.querySelectorAll('[data-study-filter]').forEach(b=>b.classList.toggle('active',b.dataset.studyFilter===studyFilter));
 const modules=STUDY_MODULES.filter(m=>studyFilter==='all'||(studyFilter==='completed'?moduleStatus(m)==='Concluído':moduleStatus(m)==='Em andamento'));
 grid.innerHTML=modules.length?modules.map(moduleCard).join(''):'<div class="study-empty">Nenhum módulo nesta etapa ainda. Escolha “Todos” para começar.</div>';
}
function filterStudyModules(filter){studyFilter=filter;renderModuleGrid();}

const LEARNING_PHASES=Object.freeze([
 {label:'01 · FUNDAMENTOS',title:'Como o novo IVA funciona',modules:['01','02','03','04']},
 {label:'02 · CRÉDITOS',title:'Créditos e tratamentos',modules:['05','06','07','08']},
 {label:'03 · OPERAÇÕES',title:'Comércio exterior',modules:['09']},
 {label:'04 · TRANSIÇÃO',title:'Anos e regimes',modules:['10','11','12']},
 {label:'05 · APLICAÇÃO',title:'Preço e operação',modules:['13','14','15']},
 {label:'06 · ENTREGA',title:'Consultoria',modules:['16']}
]);
function renderLearningPath(id){
 const el=$(id);if(!el)return;
 el.innerHTML=LEARNING_PHASES.map(function(phase){
  const mods=phase.modules.map(function(mid){return STUDY_MODULES.find(function(m){return m.id===mid;});}).filter(Boolean);
  const done=mods.filter(function(m){return moduleStatus(m)==='Concluído';}).length;
  const started=mods.some(function(m){return moduleStatus(m)==='Em andamento';});
  const pctValue=mods.length?done/mods.length*100:0;
  return '<article class="learning-phase '+(done===mods.length?'complete':started?'active':'')+'">'+
   '<small>'+phase.label+'</small><b>'+phase.title+'</b>'+
   '<span>'+phase.modules.map(Number).join(' · ')+' · '+done+'/'+mods.length+' concluídos</span>'+
   '<div class="learning-phase-progress"><i style="width:'+pctValue+'%"></i></div></article>';
 }).join('');
}
function currentStudyTarget(){
 const active=STUDY_MODULES.find(function(m){return moduleStatus(m)==='Em andamento';});
 return active||STUDY_MODULES.find(function(m){return moduleStatus(m)!=='Concluído';})||STUDY_MODULES[STUDY_MODULES.length-1];
}
function renderHomeDashboard(){
 const el=$('homeDashboard');if(!el)return;
 const complete=STUDY_MODULES.filter(function(m){return moduleStatus(m)==='Concluído';}).length;
 const target=currentStudyTarget();
 const pctDone=Math.round(complete/STUDY_MODULES.length*100);
 let lastScore=null,lastScope=null;
 try{
  const saved=JSON.parse(localStorage.getItem('jaguar-rtav-quiz-session-v3')||'null');
  if(saved&&saved.finished&&Array.isArray(saved.questions)&&Array.isArray(saved.answers)){
   lastScore=RTAV_QUIZ.grade(saved.questions,saved.answers).score;
   lastScope=saved.scope;
  }
 }catch(e){}
 const targetProgress=target?moduleProgress(target):{read:[]};
 const targetLabel=target?('Módulo '+target.id+' · '+target.title):'Trilha concluída';
 const targetAction=target?("openModule('"+target.id+"')"):"go('quiz')";
 el.innerHTML=
  '<article class="home-dashboard-card primary"><small>PRÓXIMO PASSO</small><b>'+courseEscape(targetLabel)+'</b><span>'+(target?targetProgress.read.length+' de '+target.blocks.length+' etapas lidas':'Você concluiu os 16 módulos')+'</span><button type="button" onclick="'+targetAction+'">'+(target?'Continuar módulo':'Fazer revisão geral')+' →</button></article>'+
  '<article class="home-dashboard-card"><small>PROGRESSO DA TRILHA</small><strong>'+pctDone+'%</strong><span>'+complete+' de '+STUDY_MODULES.length+' módulos concluídos</span></article>'+
  '<article class="home-dashboard-card"><small>ÚLTIMO TESTE</small><strong>'+(lastScore===null?'—':lastScore+'/10')+'</strong><span>'+(lastScore===null?'Faça seu primeiro teste':lastScope==='all'?'Teste geral':'Módulo '+lastScope)+'</span></article>'+
  '<article class="home-dashboard-card"><small>ANÁLISE PRÁTICA</small><b>3 ferramentas</b><span>Compra · faturamento · diagnóstico</span><button type="button" onclick="openDiagnostic()">Abrir diagnóstico →</button></article>';
 if($('homePrimaryAction')&&target){
  $('homePrimaryAction').onclick=function(){openModule(target.id);};
  $('homePrimaryAction').innerHTML=(moduleStatus(target)==='Em andamento'?'Continuar módulo ':'Começar módulo ')+target.id+' <b>→</b>';
 }
}
function renderHomeResume(){
 const box=$('homeResume');if(!box)return;
 const active=STUDY_MODULES.find(m=>{const n=moduleProgress(m).read.length;return n>0&&n<m.blocks.length;});
 box.innerHTML=active?`<button type="button" onclick="openModule('${active.id}')"><span>CONTINUAR DE ONDE PAROU</span><b>Módulo ${active.id} · ${courseEscape(active.title)}</b><i>↗</i></button>`:'';
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
 renderHomeResume();
 renderHomeDashboard();
 renderLearningPath('homeLearningPath');
 renderLearningPath('learningPath');
 if($('homeModules')) $('homeModules').innerHTML=STUDY_MODULES.slice(0,6).map(moduleCard).join('');
 renderModuleGrid();
 $('sourceGrid').innerHTML=SOURCES.map(s=>`<article class="source-card">
   <h3>${s[0]}</h3><p>${s[2]}</p>${s[1]==='#'?'<span class="source-note">Material interno do estudo</span>':`<a href="${s[1]}" target="_blank" rel="noopener">Abrir fonte oficial →</a>`}
 </article>`).join('');
 $('timeline').innerHTML=Object.entries(TIMELINE).map(([y,o])=>`<button type="button" class="year" onclick="pickYear('${y}')" data-year="${y}" aria-pressed="false"><b>${y}</b><small>${courseEscape(timelineInfo(y).short)}</small></button>`).join('');
 pickYear('2027');
}

const QUIZ_HISTORY_KEY='jaguar-rtav-quiz-history-v2';
const QUIZ_SESSION_KEY='jaguar-rtav-quiz-session-v3';
let quizSession=null;
function remapQuestionId(id){
 if(typeof id!=='string')return id;
 return id.replace(/^(\d{2})(-[mcv]\d+)$/,(m,moduleId,suffix)=>remapCourseId(moduleId)+suffix);
}
function migrateQuizHistory(raw){
 if(!raw||typeof raw!=='object')return raw;
 if(raw.__orderVersion===COURSE_ORDER_VERSION)return raw;
 const next={...raw,__orderVersion:COURSE_ORDER_VERSION};
 if(raw.results&&typeof raw.results==='object'){
  next.results={};
  for(const [key,value] of Object.entries(raw.results))next.results[key==='all'?'all':remapCourseId(key)]=value;
 }
 if(raw.moduleCounts&&typeof raw.moduleCounts==='object'){
  next.moduleCounts={};
  for(const [key,value] of Object.entries(raw.moduleCounts))next.moduleCounts[remapCourseId(key)]=value;
 }
 if(Array.isArray(raw.seen))next.seen=raw.seen.map(remapQuestionId);
 return next;
}
function migrateQuizSession(raw){
 if(!raw||typeof raw!=='object'||raw.__orderVersion===COURSE_ORDER_VERSION)return raw;
 const next={...raw,__orderVersion:COURSE_ORDER_VERSION,scope:raw.scope==='all'?'all':remapCourseId(raw.scope)};
 if(Array.isArray(raw.questions))next.questions=raw.questions.map(q=>({...q,module:remapCourseId(q.module),id:remapQuestionId(q.id)}));
 return next;
}
function quizRead(key,fallback){
 try{
  const raw=JSON.parse(localStorage.getItem(key))||fallback;
  const migrated=key===QUIZ_HISTORY_KEY?migrateQuizHistory(raw):key===QUIZ_SESSION_KEY?migrateQuizSession(raw):raw;
  if(migrated&&migrated!==raw){localStorage.setItem(key,JSON.stringify(migrated));window.JaguarAccount?.changed();}
  return migrated||fallback;
 }catch(e){return fallback;}
}
function quizSave(key,value){
 try{
  const next=value&&typeof value==='object'?{...value,__orderVersion:COURSE_ORDER_VERSION}:value;
  localStorage.setItem(key,JSON.stringify(next));window.JaguarAccount?.changed();
 }catch(e){}
}
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
 window.JaguarAccount?.attempt(s);
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
  const progress=moduleProgress(m);
  activeCourse=m;
  courseAllVisible=false;
  const blocks=m.blocks.map((b,i)=>`<section class="lesson-block course-block" id="course-${m.id}-${i+1}">
   <div class="lesson-top"><span class="step-no">${String(i+1).padStart(2,'0')}</span><span class="tag">${courseEscape(b.k)}</span></div>
   <h2>${courseEscape(b.t)}</h2><div class="course-text">${courseText(b.x)}</div>
  </section>`).join('');
  $('modulePage').innerHTML=`
   <button class="back" onclick="go('modules')">← Todos os estudos</button>
   <header class="course-hero"><span class="module-no">MÓDULO ${m.id} DE ${STUDY_MODULES.length}</span><h1 class="page-title">${courseEscape(m.title)}</h1><p class="page-lead">${courseEscape(m.subtitle)}</p><div class="course-hero-progress"><strong id="courseProgressLabel"></strong><span class="study-progress-track"><i id="courseProgressFill"></i></span></div></header>
   <div class="course-note"><b>Premissas dos exemplos</b><p>Os valores de CBS 9,21% e IBS 18,70% são parâmetros didáticos deste curso. A alíquota efetiva e os créditos dependem do ano, do destino, do regime, da operação e dos requisitos legais. Confira as regras vigentes antes de aplicar um exemplo a uma empresa.</p></div>
   <div class="course-layout"><nav class="course-toc" aria-label="Etapas da aula"><div class="course-toc-head"><b>Nesta aula</b><span>${m.blocks.length} etapas</span></div>${m.blocks.map((b,i)=>`<button type="button" data-course-step="${i}" onclick="showCourseStep(${i})"><span class="course-step-number">${String(i+1).padStart(2,'0')}</span><span>${courseEscape(b.t)}</span><span class="course-step-check" aria-hidden="true">✓</span></button>`).join('')}<button type="button" class="course-view-all" id="courseViewAll" onclick="toggleCourseView()">Ver aula inteira</button></nav><div class="course-main"><div class="course-stage-label" id="courseStageLabel"></div><div class="lesson-stack">${blocks}</div><div class="course-controls"><button type="button" id="coursePrev" onclick="moveCourseStep(-1)">← Etapa anterior</button><button type="button" class="course-next" id="courseNext" onclick="moveCourseStep(1)">Próxima etapa →</button></div></div></div>
   <div class="course-quiz-callout"><div><b>Concluiu a leitura?</b><span>Confira o que aprendeu em 10 perguntas deste módulo.</span></div><button class="quiz-primary" onclick="startModuleQuiz('${m.id}')">Fazer teste do módulo ${m.id} →</button></div>
   <div class="course-navigation">${index>0?`<button onclick="openModule('${STUDY_MODULES[index-1].id}')">← Módulo anterior</button>`:'<span></span>'}${index<STUDY_MODULES.length-1?`<button onclick="openModule('${STUDY_MODULES[index+1].id}')">Próximo módulo →</button>`:`<button onclick="go('modules')">Ver todos os módulos →</button>`}</div>`;
  go('modulePage');
  showCourseStep(progress.step,false);
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

function showCourseStep(index,scroll=true){
 const m=activeCourse;if(!m)return;
 const step=Math.min(Math.max(index,0),m.blocks.length-1);
 const progress=moduleProgress(m),all=studyProgress();
 all[m.id]={...progress,step};saveStudyProgress(all);
 document.querySelectorAll('#modulePage .course-block').forEach((block,i)=>{block.hidden=!courseAllVisible&&i!==step;});
 document.querySelectorAll('#modulePage [data-course-step]').forEach((button,i)=>{
  button.classList.toggle('active',i===step);
  button.classList.toggle('read',progress.read.includes(i));
  if(i===step)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
 });
 $('courseProgressLabel').textContent=`${progress.read.length} de ${m.blocks.length} etapas lidas`;
 $('courseProgressFill').style.width=`${100*progress.read.length/m.blocks.length}%`;
 $('courseStageLabel').textContent=courseAllVisible?'AULA COMPLETA':`ETAPA ${String(step+1).padStart(2,'0')} DE ${String(m.blocks.length).padStart(2,'0')}`;
 $('coursePrev').disabled=step===0;
 $('courseNext').textContent=step===m.blocks.length-1?(progress.read.includes(step)?'Etapa concluída ✓':'Concluir módulo ✓'):'Marcar como lida e avançar →';
 $('courseNext').disabled=step===m.blocks.length-1&&progress.read.includes(step);
 $('courseViewAll').textContent=courseAllVisible?'Voltar à leitura por etapas':'Ver aula inteira';
 if(scroll)document.querySelector('.course-layout')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function moveCourseStep(direction){
 const m=activeCourse;if(!m)return;
 const progress=moduleProgress(m);
 if(direction>0){
  if(!progress.read.includes(progress.step))progress.read.push(progress.step);
  const all=studyProgress();all[m.id]=progress;saveStudyProgress(all);
 }
 showCourseStep(progress.step+direction);
}
function toggleCourseView(){courseAllVisible=!courseAllVisible;showCourseStep(moduleProgress(activeCourse).step,false);}

let activeTimelineYear='2027';
function timelineInfo(y){
 const change={2029:10,2030:20,2031:30,2032:40,2033:100}[y];
 if(change!==undefined)return {phase:y==='2033'?'Novo modelo':'Substituição gradual',short:y==='2033'?'Modelo integral':`ICMS/ISS ${100-change}% · IBS ${change}%`};
 if(y==='2026')return {phase:'Ano de teste',short:'Teste'};
 return {phase:'Implantação inicial',short:y==='2027'?'CBS + IBS':'IBS inicial'};
}
function pickYear(y){
 if(!TIMELINE[y]) return;
 activeTimelineYear=String(y);
 document.querySelectorAll('.year').forEach(b=>{const active=b.dataset.year===String(y);b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 const o=TIMELINE[y], info=timelineInfo(y);
 const years=Object.keys(TIMELINE);
 const idx=years.indexOf(String(y));
 $('timelinePanel').innerHTML=`<div class="transition-selected"><strong>${y}</strong><span>${courseEscape(info.phase)}</span></div><div class="transition-summary"><h3>${courseEscape(info.short)}</h3><p>${courseEscape(o.text)}</p>${Number(y)>=2029&&Number(y)<=2032?'<small class="transition-caveat">Os percentuais indicam a proporção da transição, não a alíquota final.</small>':''}<div class="transition-panel-actions"><button type="button" onclick="moveYear(-1)" ${idx===0?'disabled':''}>← Anterior</button><a href="https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/entenda" target="_blank" rel="noopener">Cronograma oficial ↗</a><button type="button" onclick="moveYear(1)" ${idx===years.length-1?'disabled':''}>Próximo →</button></div></div>`;
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

const SEGMENT_LABELS={
 comercio:'Comércio',
 industria:'Indústria',
 servicos:'Serviços',
 misto:'Misto'
};
const OPERATION_LABELS={
 mercadoria:'Mercadoria / revenda',
 industria:'Insumo / operação industrial',
 servico:'Serviço'
};
const PURCHASE_BUYER_LABELS={
 simples:'Simples Nacional',
 presumido:'Lucro Presumido',
 real:'Lucro Real',
 simples_hybrid:'Simples · IBS/CBS regular'
};
const SUPPLIER_LABELS={
 simples:'Simples Nacional — padrão',
 presumido:'Lucro Presumido',
 real:'Lucro Real',
 simples_hybrid:'Simples Nacional — IBS/CBS regular'
};
const PURCHASE_SUPPLIERS=['simples','presumido','real','simples_hybrid'];

function purchaseSegment(){return $('priceSegment')?.value||'comercio';}
function purchaseBuyerRegime(){return $('priceBuyerRegime')?.value||'presumido';}
function purchaseCreditUsePct(){
 const mode=$('priceCreditMode')?.value||'full';
 if(mode==='none') return 0;
 if(mode==='partial') return Math.max(0,Math.min(100,num('priceCreditUsePct')));
 return 100;
}
function syncPriceCreditMode(){
 const mode=$('priceCreditMode')?.value||'full';
 if($('priceCreditUseWrap')) $('priceCreditUseWrap').style.display=mode==='partial'?'block':'none';
 if($('priceCreditUsePct')){
  if(mode==='full') $('priceCreditUsePct').value=100;
  if(mode==='none') $('priceCreditUsePct').value=0;
 }
}

function selectedOperationType(){
 const segment=purchaseSegment();
 if(segment==='servicos') return 'servico';
 if(segment==='industria') return 'industria';
 if(segment==='misto') return $('priceOperationType')?.value||'mercadoria';
 return 'mercadoria';
}

function defaultSimpleAnnex(operation=selectedOperationType()){
 return operation==='mercadoria'?'I':operation==='industria'?'II':'III';
}

function syncSegmentFields(){
 const segment=purchaseSegment();
 const operation=selectedOperationType();
 if($('priceOperationTypeWrap')) $('priceOperationTypeWrap').style.display=segment==='misto'?'block':'none';
 if($('icmsRateWrap')) $('icmsRateWrap').style.display=operation==='servico'?'none':'block';
 if($('issRateWrap')) $('issRateWrap').style.display=operation==='servico'?'block':'none';
 if($('ipiRateWrap')) $('ipiRateWrap').style.display=operation==='industria'?'block':'none';

 const annex=$('snAnnex');
 if(annex){
  if(operation==='mercadoria'){
   annex.value='I';
   annex.disabled=true;
  }else if(operation==='industria'){
   annex.value='II';
   annex.disabled=true;
  }else{
   if(!['III','IV','V'].includes(annex.value)) annex.value='III';
   annex.disabled=false;
  }
 }
 if($('simpleSegmentNote')){
  $('simpleSegmentNote').textContent=
   operation==='mercadoria'
    ?'Comércio: Anexo I usado nos dois fornecedores do Simples.'
    :operation==='industria'
      ?'Indústria: Anexo II. IPI atual é opcional e deve ser informado apenas quando aplicável.'
      :'Serviços: escolha o Anexo III, IV ou V aplicável aos fornecedores do Simples.';
 }
}

function applyRegimeUI({preset=true}={}){
 syncSegmentFields();
 if($('simplesCurrentFields')) $('simplesCurrentFields').style.display='block';
 if($('regularFutureFields')) $('regularFutureFields').style.display='block';
 updateSnSummary();
 applyYearPreset();
}

function applyYearPreset(){
 const y=Number($('priceYear')?.value||2027);
 yearDetailSelected=y;
 const p=TRANSITION[y]||TRANSITION[2027];
 if($('rateMode')?.value==='rtav'){
  $('cbsRate').value=p.cbs;
  $('ibsRate').value=p.ibs;
 }
 updateSnSummary();
 const operation=selectedOperationType();
 const oldTax=operation==='servico'?'ISS':'ICMS';
 if($('rateNote')){
  const oldPct=Math.round((p.old??1)*100);
  $('rateNote').textContent=($('rateMode')?.value==='manual')
   ?'CBS e IBS informados manualmente. A comparação aplica a mesma premissa aos fornecedores regulares e ao Simples com IBS/CBS no regime regular.'
   :'Premissa da ferramenta: CBS '+String(p.cbs).replace('.',',')+'% · IBS '+String(p.ibs).replace('.',',')+'% · '+oldTax+' remanescente '+oldPct+'% da alíquota atual. O Simples padrão mantém IBS/CBS dentro do DAS; o Simples regular os apura fora do DAS.';
 }
 calcIntegrated();
}

function priceEngineInput(){
 return {
  amount:Math.max(0,num('priceNow')),
  segment:purchaseSegment(),
  operationType:selectedOperationType(),
  buyerRegime:purchaseBuyerRegime(),
  icmsRate:num('icmsRate'),
  issRate:num('issRate'),
  ipiRate:num('ipiRate'),
  simple:{annex:snAnnex(),rbt12:num('snRbt12')},
  future:{mode:$('rateMode')?.value||'rtav',reduction:num('rateReduction'),cbs:num('cbsRate'),ibs:num('ibsRate'),selective:num('selectiveTaxRate')},
  purchaseGeneratesCredit:purchaseCreditUsePct()>0,
  creditUsePct:purchaseCreditUsePct()
 };
}

function purchaseComparison(supplierRegime,year=Number($('priceYear')?.value||2027),input=priceEngineInput()){
 return RTAV_ENGINE.segmentedPurchaseComparison({...input,supplierRegime},year);
}

function purchaseSupplierModels(year=Number($('priceYear')?.value||2027),input=priceEngineInput()){
 return PURCHASE_SUPPLIERS.map(supplierRegime=>purchaseComparison(supplierRegime,year,input));
}

function buyerCurrentCreditText(x){
 const parts=[];
 if((x.currentCredits?.icms||0)>0) parts.push('ICMS '+money(x.currentCredits.icms));
 if((x.currentCredits?.pisCofins||0)>0) parts.push('PIS/Cofins '+money(x.currentCredits.pisCofins));
 return parts.length?parts.join(' · '):'Sem crédito';
}

function buyerFutureCreditText(x){
 const parts=[];
 if((x.futureCredits?.icms||0)>0) parts.push('ICMS '+money(x.futureCredits.icms));
 if((x.futureCredits?.cbs||0)>0) parts.push('CBS '+money(x.futureCredits.cbs));
 if((x.futureCredits?.ibs||0)>0) parts.push('IBS '+money(x.futureCredits.ibs));
 return parts.length?parts.join(' · '):'Sem crédito';
}

function segmentDisplay(model){
 const base=SEGMENT_LABELS[model.segment]||model.segment;
 return model.segment==='misto'?base+' · '+(OPERATION_LABELS[model.operationType]||model.operationType):base;
}

function supplierCardDetailed(model,buyerRegime,year){
 const x=model.buyers[buyerRegime];
 const remnant=model.oldTaxRemnant>0
  ?'<div>'+model.oldTaxName+' remanescente <b>'+money(model.oldTaxRemnant)+'</b></div>'
  :(model.dasRemnant>0?'<div>DAS remanescente <b>'+money(model.dasRemnant)+'</b></div>':'');
 return '<article class="buyer-example-card" data-supplier="'+model.supplierRegime+'">'+
  '<h4><small>FORNECEDOR</small>'+SUPPLIER_LABELS[model.supplierRegime]+'</h4>'+
  '<strong>Hoje</strong>'+
  '<div>Preço da compra <b>'+money(x.currentPrice)+'</b></div>'+
  '<div>Crédito do comprador <b>'+money(x.currentCredit)+'</b></div>'+
  '<div class="buyer-credit-detail">'+buyerCurrentCreditText(x)+'</div>'+
  '<div class="buyer-total">Custo efetivo <b>'+money(x.currentCost)+'</b></div>'+
  '<strong>'+year+'</strong>'+
  '<div>Preço novo <b>'+money(x.futurePrice)+'</b></div>'+
  '<div>CBS <b>'+money(model.cbs)+'</b></div>'+
  '<div>IBS <b>'+money(model.ibs)+'</b></div>'+
  remnant+
  '<div>Crédito do comprador <b>'+money(x.futureCredit)+'</b></div>'+
  '<div class="buyer-credit-detail">'+buyerFutureCreditText(x)+'</div>'+
  '<div class="buyer-total">Custo efetivo <b>'+money(x.futureCost)+'</b></div>'+
  '<footer>Variação do custo <b class="'+(x.changePct>0?'up':'down')+'">'+(x.changePct>0?'+':'')+pct(x.changePct)+'</b></footer>'+
 '</article>';
}

function renderBuyerExample(year,input){
 const buyerRegime=input.buyerRegime||purchaseBuyerRegime();
 const models=purchaseSupplierModels(year,input);
 const segment=models[0]?segmentDisplay(models[0]):SEGMENT_LABELS[input.segment];

 $('priceEquationMemory').innerHTML=
  '<b>Comprador:</b> '+PURCHASE_BUYER_LABELS[buyerRegime]+
  ' · <b>Segmento:</b> '+segment+
  ' · <b>Compra atual usada nos quatro fornecedores:</b> '+money(input.amount)+
  '. Cada card recalcula o preço futuro e os créditos conforme o regime do fornecedor.';

 $('buyerExample').innerHTML=
  '<div class="buyer-example-head"><b>Comprador · '+PURCHASE_BUYER_LABELS[buyerRegime]+'</b><span>Comparação entre 4 fornecedores · '+year+'</span></div>'+
  '<div class="buyer-example-grid">'+models.map(model=>supplierCardDetailed(model,buyerRegime,year)).join('')+'</div>'+
  '<p class="buyer-example-note">Leia os cards da esquerda para a direita como alternativas de fornecedor para a mesma empresa compradora. O custo efetivo desconta somente os créditos previstos na lógica da ferramenta para o regime comprador selecionado.</p>';
}

function updateScenarioStrip(){
 const buyer=purchaseBuyerRegime();
 const segment=purchaseSegment();
 const operation=selectedOperationType();
 const segmentText=segment==='misto'?(SEGMENT_LABELS[segment]+' · '+OPERATION_LABELS[operation]):SEGMENT_LABELS[segment];
 const year=$('priceYear')?.value||'2027';
 if($('activeSegmentBadge')) $('activeSegmentBadge').textContent=segmentText;
 if($('activeBuyerBadge')) $('activeBuyerBadge').textContent=PURCHASE_BUYER_LABELS[buyer]||buyer;
 if($('activeYearBadge')) $('activeYearBadge').textContent=year;
 if($('resultYearLabel')) $('resultYearLabel').textContent=year;
}

function comparisonMemoryRows(models,buyerRegime){
 const rows=[
  ['Segmento',models[0]?segmentDisplay(models[0]):SEGMENT_LABELS[purchaseSegment()]],
  ['Regime do comprador',PURCHASE_BUYER_LABELS[buyerRegime]],
  ['Preço atual informado',num('priceNow')]
 ];
 models.forEach(model=>{
  const x=model.buyers[buyerRegime];
  rows.push([SUPPLIER_LABELS[model.supplierRegime]+' · preço '+model.year,model.futurePrice]);
  rows.push([SUPPLIER_LABELS[model.supplierRegime]+' · crédito '+model.year,x.futureCredit]);
  rows.push([SUPPLIER_LABELS[model.supplierRegime]+' · custo efetivo '+model.year,x.futureCost]);
 });
 return rows;
}

function summaryRows(rows){
 return '<div class="tax-summary-list">'+rows.map(([label,value])=>`<div class="tax-summary-row"><span>${label}</span><b>${value}</b></div>`).join('')+'</div>';
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
 if(!$('buyerExample')) return;
 syncSegmentFields();
 updateScenarioStrip();
 const input=priceEngineInput();
 const y=Number($('priceYear')?.value||2027);
 const messages=[];
 const operation=input.operationType;
 const oldRate=operation==='servico'?input.issRate:input.icmsRate;

 if(input.amount<=0) messages.push({level:'error',message:'Informe um preço de compra maior que zero.'});
 if(oldRate<0||oldRate>=100) messages.push({level:'error',message:'Informe uma alíquota de '+(operation==='servico'?'ISS':'ICMS')+' entre 0% e menos de 100%.'});
 if(input.ipiRate<0||input.ipiRate>=100) messages.push({level:'error',message:'Informe uma alíquota de IPI entre 0% e menos de 100%.'});
 if((9.25+oldRate+(operation==='industria'?input.ipiRate:0))>=100)
  messages.push({level:'error',message:'A soma dos tributos do fornecedor no Lucro Real deve ser menor que 100% do preço.'});

 if(input.simple.rbt12<=0) messages.push({level:'error',message:'Informe o RBT12 usado nos fornecedores do Simples.'});
 if(input.simple.rbt12>3600000) messages.push({level:'warning',message:'RBT12 acima de R$ 3,6 milhões exige validação específica do sublimite.'});
 if(input.simple.rbt12>4800000) messages.push({level:'error',message:'RBT12 acima de R$ 4,8 milhões está fora do limite geral tratado pela ferramenta.'});

 renderValidation('priceValidation',messages);
 if(messages.some(m=>m.level==='error')){
  $('buyerExample').innerHTML='';
  $('priceEquationMemory').innerHTML='';
  $('yearlyPriceStrip').innerHTML='';
  $('yearlyProjectionTable').innerHTML='';
  $('yearDetailPanel').innerHTML='';
  $('yearlyProjectionNote').textContent='Corrija os dados indicados acima para calcular.';
  yearlyRows=[];
  return;
 }

 renderBuyerExample(y,input);
 $('resultSignal').textContent='4 FORNECEDORES';
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

function supplierResultForRow(row,supplierRegime){
 const model=row.models.find(x=>x.supplierRegime===supplierRegime);
 const buyer=row.buyerRegime;
 if(!model) return {cost:0,credit:0,price:0};
 const x=model.buyers[buyer];
 return row.year===2026
  ?{cost:x.currentCost,credit:x.currentCredit,price:x.currentPrice}
  :{cost:x.futureCost,credit:x.futureCredit,price:x.futurePrice};
}

function shortSupplierLabel(key){
 return {
  simples:'Simples',
  presumido:'Lucro Presumido',
  real:'Lucro Real',
  simples_hybrid:'Simples IBS/CBS'
 }[key]||key;
}

function supplierCostStats(row){
 const items=PURCHASE_SUPPLIERS.map(function(key){
  const result=supplierResultForRow(row,key);
  return {key,label:shortSupplierLabel(key),cost:result.cost,credit:result.credit,price:result.price};
 });
 const min=Math.min(...items.map(x=>x.cost));
 const max=Math.max(...items.map(x=>x.cost));
 const epsilon=.005;
 const best=items.filter(x=>Math.abs(x.cost-min)<=epsilon);
 return {items,min,max,spread:max-min,best};
}

function bestSupplierText(stats){
 if(stats.best.length===1) return stats.best[0].label;
 if(stats.best.length===2) return stats.best.map(x=>x.label).join(' + ');
 return stats.best.length+' fornecedores empatados';
}

function renderYearDetail(year){
 if(!$('yearDetailPanel')||!yearlyRows.length) return;
 const row=yearlyRows.find(r=>r.year===Number(year))||yearlyRows[0];
 const first=row.models[0];
 const stats=supplierCostStats(row);
 $('yearDetailPanel').classList.add('visible');
 $('yearDetailPanel').innerHTML=
  '<div class="year-detail-top">'+
   '<div><span>'+segmentDisplay(first).toUpperCase()+' · COMPRADOR '+PURCHASE_BUYER_LABELS[row.buyerRegime].toUpperCase()+'</span><h4>'+row.year+' · comparação dos fornecedores</h4></div>'+
   '<div class="year-detail-summary">'+
    '<div><small>Menor custo</small><b>'+money(stats.min)+'</b></div>'+
    '<div><small>Diferença entre extremos</small><b>'+money(stats.spread)+'</b></div>'+
   '</div>'+
  '</div>'+
  '<div class="year-detail-grid">'+
   PURCHASE_SUPPLIERS.map(function(key){
    const r=supplierResultForRow(row,key);
    const best=Math.abs(r.cost-stats.min)<=.005;
    return '<div class="year-detail-item '+(best?'is-best':'')+'">'+
     '<small>'+SUPPLIER_LABELS[key]+'</small>'+
     '<b>'+money(r.cost)+'</b>'+
     '<span>Preço da compra '+money(r.price)+'<br>Crédito '+money(r.credit)+'</span>'+
    '</div>';
   }).join('')+
  '</div>'+
  '<div class="year-detail-read"><span><b>Melhor resultado:</b> '+bestSupplierText(stats)+'</span><span>Todos os valores representam a mesma empresa compradora; muda apenas o tipo de fornecedor.</span></div>';
}

function renderYearlyProjection(){
 if(!$('yearlyProjectionTable')) return;
 const selectedYear=Number($('priceYear')?.value||2027);
 const buyerRegime=purchaseBuyerRegime();
 const input=priceEngineInput();
 const rows=[{year:2026,buyerRegime,models:purchaseSupplierModels(2027,input)}];
 for(let year=2027;year<=2033;year++){
  rows.push({year,buyerRegime,models:purchaseSupplierModels(year,input)});
 }
 yearlyRows=rows;

 if(yearDetailSelected===null||!rows.some(x=>x.year===yearDetailSelected)) yearDetailSelected=selectedYear;

 // Navegação compacta por ano.
 $('yearlyPriceStrip').innerHTML=rows.map(function(row){
  const phase=row.year===2026?'Atual':'Reforma';
  return '<button type="button" '+(row.year===2026?'disabled title="Base atual de comparação" ':'')+'class="year-price-card '+(row.year===yearDetailSelected?'active':'')+'" onclick="selectYearDetail('+row.year+')" aria-label="Ver detalhes de '+row.year+'">'+
   '<span class="year-nav-year">'+row.year+'</span>'+
   '<span class="year-nav-phase">'+phase+'</span>'+
  '</button>';
 }).join('');

 renderYearDetail(yearDetailSelected);

 // Matriz transposta: fornecedores nas linhas, anos nas colunas.
 const head=$('yearlyProjectionHead');
 if(head){
  head.innerHTML='<tr><th>Fornecedor</th>'+rows.map(function(row){
   const selected=row.year===yearDetailSelected?' selected-column':'';
   return '<th class="'+selected.trim()+'">'+row.year+'</th>';
  }).join('')+'</tr>';
 }

 $('yearlyProjectionTable').innerHTML=PURCHASE_SUPPLIERS.map(function(key){
  return '<tr>'+
   '<th scope="row"><div class="matrix-supplier"><span class="matrix-supplier-dot"></span><div>'+shortSupplierLabel(key)+'<small>'+SUPPLIER_LABELS[key]+'</small></div></div></th>'+
   rows.map(function(row){
    const stats=supplierCostStats(row);
    const r=supplierResultForRow(row,key);
    const best=Math.abs(r.cost-stats.min)<=.005;
    const selected=row.year===yearDetailSelected?' selected-column':'';
    return '<td class="'+(selected+(best?' cell-best':'')).trim()+'" onclick="selectYearDetail('+row.year+')"><strong>'+money(r.cost)+'</strong></td>';
   }).join('')+
  '</tr>';
 }).join('');

 $('yearlyProjectionNote').textContent='Comprador: '+PURCHASE_BUYER_LABELS[buyerRegime]+'. Selecione um ano acima ou clique em uma coluna da matriz para comparar os quatro fornecedores.';
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
   return '<div class="sn-auto-card"><small>'+year+'</small><b>DAS '+pct(sh.eff*100)+'</b><span>Recolhimento único pelo Simples</span></div>';
  }).join('');
 }

 if($('revHybridAutoSummary')){
  $('revHybridAutoSummary').innerHTML=[2027,2029,2033].map(function(year){
   const sh=revSnShares(year),rem=Math.max(0,sh.eff-sh.cbsEff-sh.ibsEff);
   return '<div class="sn-auto-card"><small>'+year+'</small><b>DAS rem. '+pct(rem*100)+'</b><span>CBS/IBS fora do DAS</span></div>';
  }).join('');
 }
}

function syncRevenueCreditMode(){
 const mode=$('revCreditMode')?.value||'estimate';
 if($('revEstimatedCreditFields')) $('revEstimatedCreditFields').style.display=mode==='estimate'?'block':'none';
 if($('revManualCreditFields')) $('revManualCreditFields').style.display=mode==='manual'?'block':'none';
}
function syncRevenueOperation(){
 const op=$('revOperationType')?.value||'mercadoria';
 if(op==='servico'){
  if($('revIcmsRate')) $('revIcmsRate').value=0;
  if($('revIpiRate')) $('revIpiRate').value=0;
 }else{
  if($('revIssRate')) $('revIssRate').value=0;
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
 revYearDetailSelected=y;
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
  operationType:$('revOperationType')?.value||'mercadoria',
  amount:Math.max(0,num('revCurrentRevenue')),
  currentRates:{pis:num('revPisRate'),cofins:num('revCofinsRate'),icms:num('revIcmsRate'),iss:num('revIssRate'),ipi:num('revIpiRate')},
  simple:{annex:revAnnex(),rbt12:revRbt12()},
  future:{mode:$('revRateMode')?.value||'rtav',reduction:num('revRateReduction'),cbs:num('revCbsRate'),ibs:num('revIbsRate'),selective:num('revSelectiveTaxRate')},
  hybridFuture:{mode:$('revHybridRateMode')?.value||'rtav',reduction:num('revHybridReduction'),cbs:num('revHybridCbsRate'),ibs:num('revHybridIbsRate'),selective:0},
  purchases:{mode:$('revCreditMode')?.value||'estimate',creditablePct:num('revCreditablePurchasesPct'),usePct:num('revPurchaseCreditUsePct'),
   cbsCredit:num('revManualCbsCredit'),ibsCredit:num('revManualIbsCredit')}
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

function revenueRemnantLabel(x){
 if(x.year===2026) return 'Tributos atuais';
 return x.params?.type==='regular'?'ICMS/ISS remanescente':'DAS remanescente';
}

function revFutureRows(x){
 const rows=[['Faturamento bruto projetado',money(x.revenue)]];
 if(x.regime==='simples'){
  rows.push(['DAS total',signedMoney(x.taxes,'−')],['Faturamento líquido',money(x.net)]);
  return rows;
 }
 if((x.selectiveTax||0)>0) rows.push(['Imposto Seletivo',signedMoney(x.selectiveTax,'−')]);
 if(x.cbs>0) rows.push(['CBS',signedMoney(x.cbs,'−')]);
 if(x.ibs>0) rows.push(['IBS',signedMoney(x.ibs,'−')]);
 if(x.remnant>0) rows.push([revenueRemnantLabel(x),signedMoney(x.remnant,'−')]);
 rows.push(['Total de tributos',signedMoney(x.taxes,'−')]);
 if((x.purchaseCredit||0)>0){
  if((x.cbsCredit||0)>0) rows.push(['Crédito CBS',money(x.cbsCredit)]);
  if((x.ibsCredit||0)>0) rows.push(['Crédito IBS',money(x.ibsCredit)]);
  rows.push(['Carga líquida após créditos',signedMoney(x.netTax,'−')]);
  if((x.creditBalance||0)>0) rows.push(['Saldo credor remanescente',money(x.creditBalance)]);
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
   '<div class="year-detail-item"><small>'+(x.regime==='simples'?'DAS total':'Total de tributos')+'</small><b>'+money(x.taxes)+'</b></div>'+
   '<div class="year-detail-item"><small>Carga</small><b>'+pct(x.revenue?x.taxes/x.revenue*100:0)+'</b></div>'+
   '<div class="year-detail-item"><small>Faturamento líquido</small><b>'+money(x.net)+'</b></div>'+
   (x.regime==='simples'?'':
   '<div class="year-detail-item"><small>CBS</small><b>'+(x.cbs===null?'—':money(x.cbs))+'</b></div>'+
   '<div class="year-detail-item"><small>IBS</small><b>'+(x.ibs===null?'—':money(x.ibs))+'</b></div>'+
   '<div class="year-detail-item"><small>'+revenueRemnantLabel(x)+'</small><b>'+money(x.remnant)+'</b></div>')+
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
  return '<button type="button" '+(x.year===2026?'disabled title="Base atual de comparação" ':'')+'class="year-price-card '+(x.year===revYearDetailSelected?'active':'')+'" onclick="revSelectYear('+x.year+')">'+
   '<span class="year-nav-year">'+x.year+'</span><span class="year-nav-phase">'+(x.year===2026?'Atual':'Reforma')+'</span></button>';
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
 const input=priceEngineInput();
 const buyer=input.buyerRegime;
 const models=purchaseSupplierModels(selectedYear,input);
 downloadSpreadsheet(
  'compra-comprador-'+buyer+'-fornecedores-2026-2033.xlsx',
  ['Ano','Custo fornecedor Simples','Crédito fornecedor Simples','Custo fornecedor LP','Crédito fornecedor LP','Custo fornecedor LR','Crédito fornecedor LR','Custo fornecedor Simples regular','Crédito fornecedor Simples regular'],
  yearlyRows.map(function(row){
   const values=[row.year];
   PURCHASE_SUPPLIERS.forEach(function(key){
    const r=supplierResultForRow(row,key);
    values.push(r.cost,r.credit);
   });
   return values;
  }),
  [
   ['Segmento',segmentDisplay(models[0])],
   ['Regime do comprador',PURCHASE_BUYER_LABELS[buyer]],
   ['Preço atual da compra',input.amount],
   ['ICMS atual %',input.icmsRate],
   ['ISS atual %',input.issRate],
   ['IPI atual %',input.ipiRate],
   ['Imposto Seletivo %',input.future.selective||0],
   ['Aproveitamento de créditos %',input.creditUsePct],
   ['Créditos',input.creditUsePct>0?'Conforme regime e percentual aproveitável informado':'Aquisição marcada sem direito a crédito'],
   ['RBT12 fornecedores Simples',input.simple.rbt12],
   ['Anexo fornecedores Simples',input.simple.annex],
   ['Ano destacado',selectedYear],
   ['CBS %',input.future.cbs],
   ['IBS %',input.future.ibs]
  ],
  comparisonMemoryRows(models,buyer)
 );
}

function exportRevenueExcel(){
 if(!revenueYearlyRows.length) revRenderYearly();
 if(revRegime()==='simples'){
  downloadSpreadsheet('analise-faturamento-simples-2026-2033.xlsx',
   ['Ano','Regime','Faturamento bruto','DAS total','Alíquota efetiva %','Faturamento líquido'],
   revenueYearlyRows.map(x=>[x.year,REGIME_LABELS[x.regime],x.revenue,x.taxes,x.revenue?x.taxes/x.revenue*100:0,x.net]),
   [['Regime',REGIME_LABELS.simples],['RBT12',revRbt12()],['Anexo',revAnnex()]],
   RTAV_ENGINE.revenueMemory(revenueEngineInput(),Number($('revYear')?.value||2027)));
  return;
 }
 downloadSpreadsheet(
  'analise-faturamento-'+revRegime()+'-2026-2033.xlsx',
  ['Ano','Regime','Sistema','Faturamento bruto','Tributos brutos','Carga bruta %','Faturamento líquido antes dos créditos','Imposto Seletivo','CBS','IBS','Tipo do tributo remanescente','Tributo remanescente','Crédito CBS','Crédito IBS','Carga líquida','Saldo credor','Líquido após créditos','Base DAS residual','ICMS/ISS excluído da base CBS/IBS','Base CBS/IBS'],
  revenueYearlyRows.map(function(x){
   return [x.year,REGIME_LABELS[x.regime],x.system,x.revenue,x.taxes,x.revenue?x.taxes/x.revenue*100:0,x.net,x.selectiveTax??0,x.cbs??0,x.ibs??0,revenueRemnantLabel(x),x.remnant,x.cbsCredit??0,x.ibsCredit??0,x.netTax??x.taxes,x.creditBalance??0,x.economicNet??x.net,x.residualBase??'',x.excludedTax??'',x.cleanBase??''];
  }),
  [
   ['Regime',REGIME_LABELS[revRegime()]],['Faturamento 2026',num('revCurrentRevenue')],
   ['Período',$('revRevenuePeriod')?.value||'mensal'],
   ['Tipo da operação',$('revOperationType')?.value||'mercadoria'],
   ['Modo dos créditos',$('revCreditMode')?.value||'estimate'],
   ['Base de aquisições creditáveis %',num('revCreditablePurchasesPct')],
   ['Aproveitamento estimado dos créditos %',num('revPurchaseCreditUsePct')],
   ['Crédito CBS informado',num('revManualCbsCredit')],['Crédito IBS informado',num('revManualIbsCredit')],
   ['PIS %',num('revPisRate')],['Cofins %',num('revCofinsRate')],['ICMS %',num('revIcmsRate')],
   ['ISS %',num('revIssRate')],['IPI %',num('revIpiRate')],['Imposto Seletivo %',num('revSelectiveTaxRate')]
  ],
  RTAV_ENGINE.revenueMemory(revenueEngineInput(),Number($('revYear')?.value||2027))
 );
}

const QUICK_PRESETS={
 commerce_lp:{regime:'presumido',operation:'mercadoria',pis:.65,cofins:3,icms:18,iss:0,ipi:0},
 services_lp:{regime:'presumido',operation:'servico',pis:.65,cofins:3,icms:0,iss:5,ipi:0},
 services_lr:{regime:'real',operation:'servico',pis:1.65,cofins:7.6,icms:0,iss:5,ipi:0}
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
 if(!price&&$('revOperationType')) $('revOperationType').value=p.operation||'mercadoria';
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
 const buyerRegime=input.buyerRegime;

 const annual=[{year:2026,buyerRegime,models:purchaseSupplierModels(2027,input)}];
 for(let y=2027;y<=2033;y++) annual.push({year:y,buyerRegime,models:purchaseSupplierModels(y,input)});

 const selected=annual.find(function(row){return row.year===year;})||annual.find(function(row){return row.year===2027;})||annual[0];
 const current=annual[0];
 const selectedStats=supplierCostStats(selected);
 const firstModel=selected.models[0];

 const detailRows=PURCHASE_SUPPLIERS.map(function(key){
  const currentResult=supplierResultForRow(current,key);
  const futureResult=supplierResultForRow(selected,key);
  const model=selected.models.find(function(x){return x.supplierRegime===key;});
  const change=currentResult.cost?((futureResult.cost-currentResult.cost)/currentResult.cost*100):0;
  const best=Math.abs(futureResult.cost-selectedStats.min)<=.005;
  return [
   SUPPLIER_LABELS[key],
   money(currentResult.cost),
   money(futureResult.price),
   money(futureResult.credit),
   money(futureResult.cost),
   (change>0?'+':'')+pct(change),
   best?'Menor custo':''
  ];
 });

 const matrixHeaders=['Fornecedor','2026','2027','2028','2029','2030','2031','2032','2033'];
 const matrixRows=PURCHASE_SUPPLIERS.map(function(key){
  return [
   SUPPLIER_LABELS[key],
   ...annual.map(function(row){return money(supplierResultForRow(row,key).cost);})
  ];
 });

 return {
  title:'Relatório de custo da compra',
  subtitle:segmentDisplay(firstModel)+' · comprador '+PURCHASE_BUYER_LABELS[buyerRegime]+' · ano selecionado '+year,
  kpis:[
   ['Segmento',segmentDisplay(firstModel),'Operação analisada'],
   ['Comprador',PURCHASE_BUYER_LABELS[buyerRegime],'Mesmo comprador nos 4 cenários'],
   ['Compra atual',money(input.amount),'Valor-base informado'],
   ['Menor custo em '+year,money(selectedStats.min),bestSupplierText(selectedStats)]
  ],
  priceDetailHeaders:['Fornecedor','Custo 2026','Preço '+year,'Crédito '+year,'Custo '+year,'Variação','Destaque'],
  priceDetailRows:detailRows,
  matrixHeaders,
  matrixRows,
  note:'A empresa compradora é a mesma em toda a análise. Cada linha representa um tipo de fornecedor. A matriz 2026–2033 mostra o custo efetivo da mesma compra ao longo da transição.'
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
 if(input.regime!=='simples'){
  if((future.cbs||0)>0) futureRows.push(['CBS',signedMoney(future.cbs,'−')]);
  if((future.ibs||0)>0) futureRows.push(['IBS',signedMoney(future.ibs,'−')]);
  if((future.remnant||0)>0) futureRows.push([revenueRemnantLabel(future),signedMoney(future.remnant,'−')]);
 }
 futureRows.push([input.regime==='simples'?'DAS total':'Tributos brutos',signedMoney(future.taxes,'−')]);
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

 const commonHead=
  '<div class="pdf-head">'+
   '<div><div class="pdf-brand">JAGUAR RT</div><h1>'+xmlEsc(data.title)+'</h1>'+
    '<p><strong>Cliente:</strong> '+xmlEsc(client)+'</p><p>'+xmlEsc(data.subtitle)+'</p></div>'+
   '<div class="pdf-stamp"><div>'+xmlEsc(now)+'</div><div>Motor '+xmlEsc(RTAV_ENGINE.version)+'</div><div>Regras '+xmlEsc(RTAV_ENGINE.rulesVersion)+'</div></div>'+
  '</div>'+
  '<section class="pdf-section"><div class="pdf-section-title"><h2>Resumo executivo</h2><span>Principais números</span></div>'+
   '<div class="pdf-kpis">'+data.kpis.map(function(k){return '<div class="pdf-kpi"><small>'+xmlEsc(k[0])+'</small><b>'+xmlEsc(k[1])+'</b><span>'+xmlEsc(k[2])+'</span></div>';}).join('')+'</div>'+
  '</section>';

 if(price){
  report.innerHTML=
   commonHead+
   '<section class="pdf-section price-pdf-selected"><div class="pdf-section-title"><h2>Comparação do ano selecionado</h2><span>'+year+'</span></div>'+
    pdfAnnualTable(data.priceDetailHeaders,data.priceDetailRows)+
   '</section>'+
   '<section class="pdf-section price-pdf-evolution"><div class="pdf-section-title"><h2>Evolução do custo 2026–2033</h2><span>Fornecedor × ano</span></div>'+
    pdfAnnualTable(data.matrixHeaders,data.matrixRows)+
   '</section>'+
   '<div class="pdf-note">'+xmlEsc(data.note)+'</div>'+
   '<div class="pdf-footer">Relatório de simulação para planejamento. Não substitui enquadramento fiscal, apuração tributária ou validação da legislação aplicável à operação.</div>';
 }else{
  report.innerHTML=
   commonHead+
   '<section class="pdf-section"><div class="pdf-section-title"><h2>Comparação tributária</h2><span>'+year+'</span></div>'+
    '<div class="pdf-grid"><div class="pdf-card"><h3>2026 · Atual</h3>'+pdfRows(data.currentRows)+'</div><div class="pdf-card"><h3>'+year+' · Reforma</h3>'+pdfRows(data.futureRows)+'</div></div>'+
   '</section>'+
   '<section class="pdf-section"><div class="pdf-section-title"><h2>Evolução 2026–2033</h2><span>Resumo</span></div>'+
    pdfAnnualTable(data.tableHeaders,data.tableRows)+'</section>'+
   '<div class="pdf-note">'+xmlEsc(data.note)+'</div>'+
   '<div class="pdf-footer">Relatório de simulação para planejamento. Não substitui enquadramento fiscal, apuração tributária ou validação da legislação aplicável à operação.</div>';
 }

 report.setAttribute('aria-hidden','false');
 setTimeout(function(){
  window.print();
  report.setAttribute('aria-hidden','true');
 },80);
}

const PRICE_STATE_IDS=[
 'priceSegment','priceOperationType','priceBuyerRegime','priceCreditMode','priceCreditUsePct','priceNow','icmsRate','issRate','ipiRate',
 'snRbt12','snAnnex','priceYear','rateMode','rateReduction','cbsRate','ibsRate','selectiveTaxRate','priceClientName'
];
const REVENUE_STATE_IDS=[
 'revTaxRegime','revOperationType','revCurrentRevenue','revRevenuePeriod','revPisRate','revCofinsRate','revIcmsRate','revIssRate','revIpiRate',
 'revSnRbt12','revSnAnnex','revYear','revRateMode','revRateReduction','revCbsRate','revIbsRate','revSelectiveTaxRate','revHybridRateMode',
 'revHybridReduction','revHybridCbsRate','revHybridIbsRate','revCreditMode','revCreditablePurchasesPct','revPurchaseCreditUsePct',
 'revManualCbsCredit','revManualIbsCredit','revenueQuickPreset','revenueClientName'
];

function stateKey(kind){return 'jaguar-rtav-'+kind+'-simulation-'+(kind==='price'?'v7':'v1');}

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
 const moneyIds=['priceNow','revCurrentRevenue','revManualCbsCredit','revManualIbsCredit'];
 const v=moneyIds.includes(id)?parseMoneyInput(raw):Number(raw);
 return Number.isFinite(v)?v:fallback;
}

function priceInputFromState(data){
 const segment=data?.priceSegment||'comercio';
 const operationType=segment==='misto'?(data?.priceOperationType||'mercadoria'):segment==='servicos'?'servico':segment==='industria'?'industria':'mercadoria';
 return {
  amount:numberFromState(data,'priceNow'),
  segment,
  operationType,
  buyerRegime:data?.priceBuyerRegime||'presumido',
  icmsRate:numberFromState(data,'icmsRate',18),
  issRate:numberFromState(data,'issRate',5),
  ipiRate:numberFromState(data,'ipiRate',0),
  simple:{annex:data?.snAnnex||defaultSimpleAnnex(operationType),rbt12:numberFromState(data,'snRbt12')},
  future:{mode:data?.rateMode||'rtav',reduction:numberFromState(data,'rateReduction'),cbs:numberFromState(data,'cbsRate'),ibs:numberFromState(data,'ibsRate'),selective:numberFromState(data,'selectiveTaxRate')},
  purchaseGeneratesCredit:(data?.priceCreditMode||'full')!=='none',
  creditUsePct:(data?.priceCreditMode||'full')==='partial'?numberFromState(data,'priceCreditUsePct',100):(data?.priceCreditMode==='none'?0:100)
 };
}

function revenueInputFromState(data){
 return {
  regime:data?.revTaxRegime||'presumido',
  operationType:data?.revOperationType||'mercadoria',
  amount:numberFromState(data,'revCurrentRevenue'),
  currentRates:{
   pis:numberFromState(data,'revPisRate'),cofins:numberFromState(data,'revCofinsRate'),
   icms:numberFromState(data,'revIcmsRate'),iss:numberFromState(data,'revIssRate'),ipi:numberFromState(data,'revIpiRate')
  },
  simple:{annex:data?.revSnAnnex||'III',rbt12:numberFromState(data,'revSnRbt12')},
  future:{mode:data?.revRateMode||'rtav',reduction:numberFromState(data,'revRateReduction'),cbs:numberFromState(data,'revCbsRate'),ibs:numberFromState(data,'revIbsRate'),selective:numberFromState(data,'revSelectiveTaxRate')},
  hybridFuture:{mode:data?.revHybridRateMode||'rtav',reduction:numberFromState(data,'revHybridReduction'),cbs:numberFromState(data,'revHybridCbsRate'),ibs:numberFromState(data,'revHybridIbsRate'),selective:0},
  purchases:{mode:data?.revCreditMode||'estimate',creditablePct:numberFromState(data,'revCreditablePurchasesPct'),usePct:numberFromState(data,'revPurchaseCreditUsePct',100),
   cbsCredit:numberFromState(data,'revManualCbsCredit'),ibsCredit:numberFromState(data,'revManualIbsCredit')}
 };
}

function compareNamedScenario(kind){
 const saved=selectedNamedScenario(kind);
 const panel=$(kind==='price'?'priceScenarioCompare':'revenueScenarioCompare');
 if(!saved||!panel) return;

 if(kind==='price'){
  const year=Number($('priceYear')?.value||2027);
  const currentInput=priceEngineInput();
  const savedInput=priceInputFromState(saved.data);
  const currentBuyer=currentInput.buyerRegime;
  const savedBuyer=savedInput.buyerRegime;
  const currentModels=purchaseSupplierModels(year,currentInput);
  const savedModels=PURCHASE_SUPPLIERS.map(key=>RTAV_ENGINE.segmentedPurchaseComparison({...savedInput,supplierRegime:key},year));
  panel.innerHTML='<div class="scenario-compare-grid">'+PURCHASE_SUPPLIERS.map(function(key){
   const current=currentModels.find(x=>x.supplierRegime===key).buyers[currentBuyer].futureCost;
   const old=savedModels.find(x=>x.supplierRegime===key).buyers[savedBuyer].futureCost;
   return compareItem('Fornecedor '+SUPPLIER_LABELS[key],old,current);
  }).join('')+'</div><div class="rate-note">Comparação em '+year+' · atual: comprador '+PURCHASE_BUYER_LABELS[currentBuyer]+' · salvo: comprador '+PURCHASE_BUYER_LABELS[savedBuyer]+'.</div>';
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

$('priceSegment')?.addEventListener('change',function(){syncSegmentFields();applyRegimeUI({preset:false});});
$('priceOperationType')?.addEventListener('change',function(){syncSegmentFields();applyRegimeUI({preset:false});});
$('priceBuyerRegime')?.addEventListener('change',calcIntegrated);
$('priceCreditMode')?.addEventListener('change',function(){syncPriceCreditMode();calcIntegrated();});
$('priceCreditUsePct')?.addEventListener('input',calcIntegrated);
$('snAnnex')?.addEventListener('change',function(){updateSnSummary();calcIntegrated();});
$('snRbt12')?.addEventListener('input',function(){updateSnSummary();calcIntegrated();});
$('priceYear')?.addEventListener('change',applyYearPreset);
$('exportPriceExcelBtn')?.addEventListener('click',exportPriceExcel);
$('pricePresentationBtn')?.addEventListener('click',function(){togglePresentation('price');});
$('pricePrintBtn')?.addEventListener('click',function(){printTaxReport('price');});
$('resetPriceSimulation')?.addEventListener('click',function(){resetSimulation('price');});
$('savePriceScenario')?.addEventListener('click',function(){saveNamedScenario('price');});
$('loadPriceScenario')?.addEventListener('click',function(){loadNamedScenario('price');});
$('comparePriceScenario')?.addEventListener('click',function(){compareNamedScenario('price');});

$('rateMode')?.addEventListener('change',function(){
 const manual=$('rateMode').value==='manual';
 $('cbsRate').readOnly=!manual;
 $('ibsRate').readOnly=!manual;
 applyYearPreset();
});
['priceNow','icmsRate','issRate','ipiRate','rateReduction','cbsRate','ibsRate','selectiveTaxRate'].forEach(function(id){
 $(id)?.addEventListener('input',calcIntegrated);
});
$('priceNow')?.addEventListener('blur',function(){formatMoneyInput(this);calcIntegrated();});

$('revTaxRegime')?.addEventListener('change',function(){revApplyUI({preset:true});});
$('revOperationType')?.addEventListener('change',function(){syncRevenueOperation();revCalcIntegrated();});
$('revCreditMode')?.addEventListener('change',function(){syncRevenueCreditMode();revCalcIntegrated();});
$('revManualCbsCredit')?.addEventListener('input',revCalcIntegrated);
$('revManualIbsCredit')?.addEventListener('input',revCalcIntegrated);
$('revManualCbsCredit')?.addEventListener('blur',function(){formatMoneyInput(this);revCalcIntegrated();});
$('revManualIbsCredit')?.addEventListener('blur',function(){formatMoneyInput(this);revCalcIntegrated();});
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
['revCurrentRevenue','revPisRate','revCofinsRate','revIcmsRate','revIssRate','revIpiRate','revRateReduction','revCbsRate','revIbsRate','revSelectiveTaxRate','revHybridReduction','revHybridCbsRate','revHybridIbsRate'].forEach(function(id){
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
syncPriceCreditMode();
applyRegimeUI({preset:true});
revUpdateSnSummary();
syncRevenueCreditMode();
revApplyUI({preset:true});

const priceRestored=restoreSimulation('price');
const revenueRestored=restoreSimulation('revenue');
formatPrimaryMoneyInputs();

if(priceRestored){syncPriceCreditMode();applyRegimeUI({preset:false});}
else calcIntegrated();

if(revenueRestored){syncRevenueCreditMode();revApplyUI({preset:false});}
else revCalcIntegrated();

bindAutosave('price');
bindAutosave('revenue');
renderScenarioOptions('price');
renderScenarioOptions('revenue');

let initialTool='price';
try{initialTool=localStorage.getItem('jaguar-rtav-active-tool')||'price';}catch(e){}
showTaxTool(initialTool==='revenue'?'revenue':'price');
calcLP();
