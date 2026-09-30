(function(){
'use strict';
const ENDPOINT='https://dliycybiocnhvqilbrlj.supabase.co/functions/v1/jaguarrt';
const TOKEN_KEY='jaguarrt-session';
const KEYS=['jaguar-rtav-study-progress-v1','jaguar-rtav-quiz-history-v2','jaguar-rtav-quiz-session-v3'];
function savedToken(){
 try{return localStorage.getItem(TOKEN_KEY)||sessionStorage.getItem(TOKEN_KEY)||'';}catch(e){return sessionStorage.getItem(TOKEN_KEY)||'';}
}
function persistToken(value){
 try{if(value)localStorage.setItem(TOKEN_KEY,value);else localStorage.removeItem(TOKEN_KEY);}catch(e){}
 try{if(value)sessionStorage.setItem(TOKEN_KEY,value);else sessionStorage.removeItem(TOKEN_KEY);}catch(e){}
}
let token=savedToken(),me=null,loaded=false,timer,attemptQueue=[],saveChain=Promise.resolve();
const by=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))||fallback;}catch{return fallback;}};
async function api(action,data,extra={}){const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,token,data,...extra})});const x=await r.json();if(!r.ok||x.error)throw Error(x.error||'Não foi possível conectar.');return x;}
function status(text){by('accountStatus').textContent=text;}
function clearLocal(){KEYS.forEach(k=>localStorage.removeItem(k));quizSession=null;}
function normalizeCourseState(state={}){
 const study=typeof migrateStudyState==='function'?migrateStudyState(state.study||{}):(state.study||{});
 const history=typeof migrateQuizHistory==='function'?migrateQuizHistory(state.history||{}):(state.history||{});
 const quiz=typeof migrateQuizSession==='function'?migrateQuizSession(state.quiz||null):(state.quiz||null);
 return {...state,study,history,quiz};
}
function hydrate(state){
 const normalized=normalizeCourseState(state||{});
 clearLocal();
 if(normalized.study)localStorage.setItem(KEYS[0],JSON.stringify(normalized.study));
 if(normalized.history)localStorage.setItem(KEYS[1],JSON.stringify(normalized.history));
 if(normalized.quiz)localStorage.setItem(KEYS[2],JSON.stringify(normalized.quiz));
 quizSession=read(KEYS[2],null);
 renderModuleGrid();updateQuizStats();updateQuizResume();renderHomeResume();renderHomeDashboard();
 return normalized;
}
function snapshot(){return {study:read(KEYS[0],{}),history:read(KEYS[1],{}),quiz:read(KEYS[2],null)};}
function schedule(){if(!loaded)return;clearTimeout(timer);timer=setTimeout(()=>flush(),600);}
async function flush(){if(!loaded)return;const data=snapshot();saveChain=saveChain.catch(()=>{}).then(async()=>{try{for(const attempt of [...attemptQueue]){await api('attempt',attempt);attemptQueue=attemptQueue.filter(x=>x.id!==attempt.id);sessionStorage.setItem('jaguarrt-pending:'+me.email,JSON.stringify(attemptQueue));}me=await api('save',data);status('Progresso salvo');render();}catch(e){status(e.message+' · alterações aguardando sincronização');}});return saveChain;}
window.JaguarAccount={changed:schedule,attempt(s){if(!loaded)return;attemptQueue.push({id:crypto.randomUUID(),scope:s.scope,questions:s.questions.map(q=>({id:q.id,options:q.options})),answers:s.answers});sessionStorage.setItem('jaguarrt-pending:'+me.email,JSON.stringify(attemptQueue));schedule();}};
function date(v){return v?new Date(v).toLocaleString('pt-BR'):'—';}
function progress(state){const normalized=normalizeCourseState(state||{});let read=0,total=0,done=0;for(const m of STUDY_MODULES){const steps=new Set((normalized?.study?.[m.id]?.read||[]).filter(i=>Number.isInteger(i)&&i>=0&&i<m.blocks.length));read+=steps.size;total+=m.blocks.length;if(steps.size===m.blocks.length)done++;}return {pct:total?Math.round(read/total*100):0,done,state:normalized};}
function attemptsHtml(attempts){return attempts.length?attempts.slice(0,30).map(a=>`<li><span>${esc(a.scope==='all'?'Todos os módulos':'Módulo '+a.scope)}<small>${date(a.created_at)}</small></span><b>${a.score}/10</b></li>`).join(''):'<li>Nenhum teste finalizado.</li>';}
function render(){if(!me)return;by('accountEmail').textContent=me.email;const p=progress(me.state);me.state=p.state;const name=me.email.split('@')[0].split(/[._-]+/).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');if(by('homeGreeting'))by('homeGreeting').textContent='Olá, '+name;by('accountName').textContent=name;by('drawerName').textContent=name;by('drawerAvatar').textContent=name.split(' ').map(w=>w[0]).slice(0,2).join('');by('accountAvatar').textContent=name.split(' ').map(w=>w[0]).slice(0,2).join('');by('accountProgress').textContent=p.pct+'%';by('accountMiniFill').style.width=p.pct+'%';by('accountToggle').setAttribute('aria-label',name+', '+p.pct+'% estudado. Abrir meu percurso');by('accountContent').innerHTML=`<div class="account-summary"><strong>${p.pct}<small>%</small></strong><span>Seu progresso<small>${p.done} de ${STUDY_MODULES.length} módulos concluídos</small></span></div><progress max="100" value="${p.pct}"></progress><h3>Seus módulos</h3><ul class="account-list">${STUDY_MODULES.map(m=>{const n=new Set(me.state?.study?.[m.id]?.read||[]).size;return `<li class="${n===m.blocks.length?'module-done':n?'module-started':''}"><span><i>${n===m.blocks.length?'✓':String(Number(m.id)).padStart(2,'0')}</i>Módulo ${Number(m.id)}</span><b>${n}/${m.blocks.length}</b></li>`;}).join('')}</ul><details class="account-tests"><summary>Resultados dos testes · ${(me.attempts||[]).length}</summary><ul class="account-list">${attemptsHtml(me.attempts||[])}</ul></details>`;by('adminSection').hidden=me.email!=='rodrigo.silva@jaguarcontabil.com.br';renderHomeDashboard();}
async function enter(x){token=x.token||token;persistToken(token);me=x;const original=me.state||{};const normalized=hydrate(original);const migrated=JSON.stringify(normalized)!==JSON.stringify(original);me={...me,state:normalized};attemptQueue=JSON.parse(sessionStorage.getItem('jaguarrt-pending:'+me.email)||'[]');loaded=true;by('loginGate').hidden=true;if(by('authLoading'))by('authLoading').hidden=true;by('siteShell').inert=false;by('siteShell').hidden=false;by('accountToggle').hidden=false;render();const restored=window.JaguarRestoreNavigation?.({admin:!!me.admin})||'home';if(restored==='teamReports'&&me.admin)loadReports();status(migrated?'Progresso atualizado para a nova ordem':'Progresso sincronizado');if(migrated)schedule();}
by('loginForm').addEventListener('submit',async e=>{e.preventDefault();const button=by('loginSubmit');button.disabled=true;by('loginError').textContent='Entrando…';try{const x=await api('login',null,{email:by('loginEmail').value.trim(),password:by('loginPassword').value});by('loginPassword').value='';await enter(x);by('loginError').textContent='';}catch(e){by('loginError').textContent=e.message;}finally{button.disabled=false;}});
let priorFocus;
function close(){by('accountDrawer').hidden=true;by('accountBackdrop').hidden=true;by('accountToggle').setAttribute('aria-expanded','false');priorFocus?.focus();}
by('accountToggle').onclick=async()=>{priorFocus=document.activeElement;by('accountDrawer').hidden=false;by('accountBackdrop').hidden=false;by('accountToggle').setAttribute('aria-expanded','true');by('accountClose').focus();await flush();};
by('accountClose').onclick=close;by('accountBackdrop').onclick=close;
by('accountDrawer').addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Tab'){const els=[...by('accountDrawer').querySelectorAll('button,input,a')].filter(x=>!x.hidden&&x.offsetParent);if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus();}}});
by('accountLogout').onclick=async()=>{await flush();try{await api('logout');}catch{status('Não foi possível encerrar no servidor. Tente novamente.');return;}loaded=false;token='';me=null;team=[];by('reportsList').innerHTML='';by('reportsSummary').innerHTML='';attemptQueue=[];persistToken('');try{localStorage.setItem('jaguar-rtav-navigation-v1',JSON.stringify({view:'home'}));}catch(e){}clearLocal();close();by('accountToggle').hidden=true;by('siteShell').hidden=true;by('siteShell').inert=true;by('loginGate').hidden=false;by('loginEmail').focus();};
let team=[];
function personName(email){return email.split('@')[0].split(/[._-]+/).map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');}
function renderReports(){
 const search=by('reportsSearch').value.trim().toLowerCase(),filter=by('reportsFilter').value;
 const filtered=team.filter(a=>{const p=progress(a.state);return (a.email+' '+personName(a.email)).toLowerCase().includes(search)&&(filter==='all'||filter==='online'&&a.online||filter==='started'&&p.pct>0||filter==='unstarted'&&p.pct===0);});
 const average=team.length?Math.round(team.reduce((sum,a)=>sum+progress(a.state).pct,0)/team.length):0;
 by('reportsSummary').innerHTML=[['Colaboradores',team.length],['Ativos recentemente',team.filter(a=>a.online).length],['Progresso médio',average+'%'],['Testes finalizados',team.reduce((n,a)=>n+(a.attempts||[]).length,0)]].map(([label,value])=>`<div><small>${label}</small><strong>${value}</strong></div>`).join('');
 by('reportsList').innerHTML=filtered.length?filtered.map(a=>{const p=progress(a.state),state=p.state,tests=a.attempts||[],avg=tests.length?(tests.reduce((n,t)=>n+t.score,0)/tests.length).toFixed(1).replace('.',','):'—';return `<details class="report-person"><summary><span class="report-person-name"><b>${esc(personName(a.email))}</b><small>${esc(a.email)}</small></span><span class="report-progress"><b>${p.pct}%</b><span class="account-mini-track"><i style="width:${p.pct}%"></i></span><small>${p.done} módulos concluídos</small></span><span><b>${tests.length} testes</b><small>Média ${avg}${tests.length?'/10':''}</small></span><span class="report-presence">${a.online?'● Ativo recentemente':'Offline'}<small>Último acesso: ${date(a.last_seen)}</small></span><span class="report-expand">Detalhes ›</span></summary><div class="report-detail"><h3>Progresso por módulo</h3><ul class="report-modules">${STUDY_MODULES.map(m=>`<li><span>Módulo ${Number(m.id)}</span><b>${new Set(state?.study?.[m.id]?.read||[]).size}/${m.blocks.length} etapas</b></li>`).join('')}</ul><h3>Histórico dos testes</h3><ul class="account-list">${tests.length?tests.map(t=>`<li><span>${t.scope==='all'?'Todos os módulos':'Módulo '+Number(t.scope)}<small>${date(t.created_at)}</small></span><b>${t.score}/10</b></li>`).join(''):'<li>Nenhum teste finalizado.</li>'}</ul></div></details>`;}).join(''):'<div class="empty">Nenhum colaborador encontrado.</div>';
}
async function loadReports(){if(!me?.admin)return;by('reportsStatus').textContent='Carregando relatórios…';by('reportsRefresh').disabled=true;try{const x=await api('admin');team=x.accounts;renderReports();by('reportsStatus').textContent='Atualizado em '+date(new Date())+' · Ativo recentemente: acesso nos últimos 2 minutos.';}catch(e){by('reportsStatus').textContent=e.message;}finally{by('reportsRefresh').disabled=false;}}
by('reportsOpen').onclick=async()=>{if(!me?.admin)return;close();go('teamReports');by('teamReports').scrollIntoView();await loadReports();};
by('reportsRefresh').onclick=loadReports;
by('reportsBack').onclick=()=>go('home');
by('reportsSearch').addEventListener('input',renderReports);
by('reportsFilter').addEventListener('change',renderReports);
setInterval(async()=>{if(!loaded||document.hidden)return;try{if(attemptQueue.length){await flush();return;}me=await api('state');render();}catch(e){status(e.message);}},60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&loaded)flush();});
(async()=>{
 by('siteShell').inert=true;
 by('siteShell').hidden=true;
 by('loginGate').hidden=true;
 const loading=by('authLoading');
 if(loading)loading.hidden=false;
 if(!token){
  if(loading)loading.hidden=true;
  by('loginGate').hidden=false;
  by('loginEmail').focus();
  return;
 }
 try{
  await enter(await api('state'));
  if(loading)loading.hidden=true;
 }catch(e){
  token='';
  persistToken('');
  if(loading)loading.hidden=true;
  by('loginGate').hidden=false;
  by('loginError').textContent=e.message;
  by('loginEmail').focus();
 }
})();
})();
