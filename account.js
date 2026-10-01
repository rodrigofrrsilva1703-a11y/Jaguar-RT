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
async function api(action,data,extra={}){const r=await fetch(ENDPOINT,{method:'POST',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/json'},body:JSON.stringify({action,token,data,...extra})});const x=await r.json();if(!r.ok||x.error)throw Error(x.error||'Não foi possível conectar.');return x;}
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
function pendingKey(){return 'jaguarrt-unsynced:'+me.email;}
function preservePending(){
 if(!loaded||!me)return;
 try{localStorage.setItem(pendingKey(),JSON.stringify({state:snapshot(),attempts:attemptQueue,revision:crypto.randomUUID()}));}
 catch(e){status('Não foi possível guardar o progresso neste navegador. Mantenha a página aberta até sincronizar.');}
}
function schedule(){if(!loaded)return;me.state=snapshot();preservePending();render();clearTimeout(timer);timer=setTimeout(()=>flush(),600);}
async function flush(){
 if(!loaded||!me)return;
 const owner=me.email,sessionToken=token,key=pendingKey();
 saveChain=saveChain.catch(()=>{}).then(async()=>{
  if(!loaded||me?.email!==owner||token!==sessionToken)return;
  const data=snapshot(),revision=read(key,null)?.revision;
  try{
   for(const attempt of [...attemptQueue]){
    await api('attempt',attempt);
    attemptQueue=attemptQueue.filter(x=>x.id!==attempt.id);
    sessionStorage.setItem('jaguarrt-pending:'+owner,JSON.stringify(attemptQueue));
    const pending=read(key,null);if(pending){pending.attempts=attemptQueue;localStorage.setItem(key,JSON.stringify(pending));}
   }
   const result=await api('save',data);
   if(me?.email!==owner||token!==sessionToken)return;
   me={...result,state:snapshot()};
   if(read(key,null)?.revision===revision)localStorage.removeItem(key);
   status(read(key,null)?'Alterações aguardando sincronização':'Progresso salvo');render();
  }catch(e){status(e.message+' · alterações aguardando sincronização');}
 });return saveChain;
}
window.JaguarAccount={changed:schedule,attempt(s){if(!loaded)return;attemptQueue.push({id:crypto.randomUUID(),scope:s.scope,questions:s.questions.map(q=>({id:q.id,options:q.options})),answers:s.answers});sessionStorage.setItem('jaguarrt-pending:'+me.email,JSON.stringify(attemptQueue));schedule();}};
function readSessionAttempts(email){try{return JSON.parse(sessionStorage.getItem('jaguarrt-pending:'+email)||'[]');}catch{return [];}}
function date(v){return v?new Date(v).toLocaleString('pt-BR'):'—';}
function progress(state){const normalized=normalizeCourseState(state||{});let read=0,total=0,done=0;for(const m of STUDY_MODULES){const steps=new Set((normalized?.study?.[m.id]?.read||[]).filter(i=>Number.isInteger(i)&&i>=0&&i<m.blocks.length));read+=steps.size;total+=m.blocks.length;if(steps.size===m.blocks.length)done++;}return {pct:total?Math.round(read/total*100):0,done,state:normalized};}
function attemptsHtml(attempts){return attempts.length?attempts.slice(0,30).map(a=>`<li><span>${esc(a.scope==='all'?'Todos os módulos':'Módulo '+a.scope)}<small>${date(a.created_at)}</small></span><b>${a.score}/10</b></li>`).join(''):'<li>Nenhum teste finalizado.</li>';}
function render(){if(!me)return;by('accountEmail').textContent=me.email;const p=progress(me.state);me.state=p.state;const name=me.email.split('@')[0].split(/[._-]+/).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');if(by('homeGreeting'))by('homeGreeting').textContent='Olá, '+name;by('accountName').textContent=name;by('drawerName').textContent=name;by('drawerAvatar').textContent=name.split(' ').map(w=>w[0]).slice(0,2).join('');by('accountAvatar').textContent=name.split(' ').map(w=>w[0]).slice(0,2).join('');by('accountProgress').textContent=p.pct+'%';by('accountMiniFill').style.width=p.pct+'%';by('accountToggle').setAttribute('aria-label',name+', '+p.pct+'% estudado. Abrir meu percurso');by('accountContent').innerHTML=`<div class="account-summary"><strong>${p.pct}<small>%</small></strong><span>Seu progresso<small>${p.done} de ${STUDY_MODULES.length} módulos concluídos</small></span></div><progress max="100" value="${p.pct}"></progress><h3>Seus módulos</h3><ul class="account-list">${STUDY_MODULES.map(m=>{const n=new Set(me.state?.study?.[m.id]?.read||[]).size;return `<li class="${n===m.blocks.length?'module-done':n?'module-started':''}"><button type="button" class="account-module" data-module="${m.id}" aria-label="Abrir Módulo ${Number(m.id)}: ${esc(m.title)}"><span><i>${n===m.blocks.length?'✓':String(Number(m.id)).padStart(2,'0')}</i>Módulo ${Number(m.id)}</span><b>${n}/${m.blocks.length}</b></button></li>`;}).join('')}</ul><details class="account-tests"><summary>Resultados dos testes · ${(me.attempts||[]).length}</summary><ul class="account-list">${attemptsHtml(me.attempts||[])}</ul></details>`;by('adminSection').hidden=!me.admin;renderHomeDashboard();}
async function enter(x){token=x.token||token;persistToken(token);me=x;const pending=read(pendingKey(),null);const original=me.state||{};const remote=normalizeCourseState(original),local=pending?.state?normalizeCourseState(pending.state):null;
if(local){for(const m of STUDY_MODULES){const old=remote.study?.[m.id],next=local.study?.[m.id];if(old||next)local.study[m.id]={...old,...next,read:[...new Set([...(old?.read||[]),...(next?.read||[])])]};}}
const normalized=hydrate(local||remote);const migrated=JSON.stringify(normalized)!==JSON.stringify(original);me={...me,state:normalized};attemptQueue=pending?.attempts||readSessionAttempts(me.email);loaded=true;by('loginGate').hidden=true;if(by('authLoading'))by('authLoading').hidden=true;by('siteShell').inert=false;by('siteShell').hidden=false;by('accountToggle').hidden=false;render();const restored=window.JaguarRestoreNavigation?.({admin:!!me.admin})||'home';if(restored==='teamReports'&&me.admin)loadReports();status(migrated?'Progresso atualizado para a nova ordem':'Progresso sincronizado');if(migrated||pending||attemptQueue.length)schedule();}
by('loginForm').addEventListener('submit',async e=>{e.preventDefault();const button=by('loginSubmit');button.disabled=true;by('loginError').textContent='Entrando…';try{const x=await api('login',null,{email:by('loginEmail').value.trim(),password:by('loginPassword').value});by('loginPassword').value='';await enter(x);by('loginError').textContent='';}catch(e){by('loginError').textContent=e.message;}finally{button.disabled=false;}});
by('accountContent').addEventListener('click',e=>{const button=e.target.closest('[data-module]');if(!button)return;close();openModule(button.dataset.module);});
let priorFocus;
function close(){by('accountDrawer').hidden=true;by('accountBackdrop').hidden=true;by('accountToggle').setAttribute('aria-expanded','false');priorFocus?.focus();}
by('accountToggle').onclick=async()=>{priorFocus=document.activeElement;by('accountDrawer').hidden=false;by('accountBackdrop').hidden=false;by('accountToggle').setAttribute('aria-expanded','true');by('accountClose').focus();await flush();};
by('accountClose').onclick=close;by('accountBackdrop').onclick=close;
by('accountDrawer').addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Tab'){const els=[...by('accountDrawer').querySelectorAll('button,input,a,summary,select')].filter(x=>!x.hidden&&x.offsetParent);if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus();}}});
by('accountLogout').onclick=async()=>{await flush();try{await api('logout');}catch{status('Não foi possível encerrar no servidor. Tente novamente.');return;}loaded=false;token='';me=null;team=[];by('reportsList').innerHTML='';by('reportsSummary').innerHTML='';attemptQueue=[];persistToken('');try{localStorage.setItem('jaguar-rtav-navigation-v1',JSON.stringify({view:'home'}));}catch(e){}clearLocal();close();by('accountToggle').hidden=true;by('siteShell').hidden=true;by('siteShell').inert=true;by('loginGate').hidden=false;by('loginEmail').focus();};
let team=[];
function personName(email){return email.split('@')[0].split(/[._-]+/).map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');}
function reportMetrics(a){
 const p=progress(a.state),tests=a.attempts||[];
 const average=tests.length?tests.reduce((n,t)=>n+t.score,0)/tests.length:null;
 return {...p,tests,average,needsHelp:tests.length>0&&average<7};
}
function filteredTeam(){
 const search=by('reportsSearch').value.trim().toLowerCase(),filter=by('reportsFilter').value;
 const module=by('reportsModule').value,performance=by('reportsPerformance').value;
 return team.filter(a=>{
  const p=reportMetrics(a),m=STUDY_MODULES.find(m=>m.id===module);
  const moduleDone=!m||new Set(p.state.study?.[m.id]?.read||[]).size===m.blocks.length;
  return (a.email+' '+personName(a.email)).toLowerCase().includes(search)&&
   (filter==='all'||filter==='online'&&a.online||filter==='started'&&p.pct>0||filter==='unstarted'&&p.pct===0)&&moduleDone&&
   (performance==='all'||performance==='help'&&p.needsHelp||performance==='good'&&p.average!==null&&p.average>=7||performance==='untested'&&!p.tests.length);
 });
}
function renderReports(){
 const filtered=filteredTeam();
 const average=team.length?Math.round(team.reduce((sum,a)=>sum+progress(a.state).pct,0)/team.length):0;
 by('reportsSummary').innerHTML=[['Colaboradores',team.length],['Ativos recentemente',team.filter(a=>a.online).length],['Progresso médio',average+'%'],['Testes finalizados',team.reduce((n,a)=>n+(a.attempts||[]).length,0)],['Precisam de acompanhamento',team.filter(a=>reportMetrics(a).needsHelp).length]].map(([label,value])=>'<div><small>'+label+'</small><strong>'+value+'</strong></div>').join('');
 by('reportsCount').textContent=filtered.length+' de '+team.length+' colaboradores · Acompanhamento: média dos testes abaixo de 7.';
 by('reportsExport').disabled=!filtered.length;
 by('reportsList').innerHTML=filtered.length?filtered.map(a=>{
  const p=reportMetrics(a),tests=p.tests,avg=p.average===null?'—':p.average.toFixed(1).replace('.',',');
  return '<details class="report-person"><summary><span class="report-person-name"><b>'+esc(personName(a.email))+'</b><small>'+esc(a.email)+'</small>'+(p.needsHelp?'<small class="report-help">Precisa de acompanhamento</small>':'')+'</span><span class="report-progress"><b>'+p.pct+'%</b><span class="account-mini-track"><i style="width:'+p.pct+'%"></i></span><small>'+p.done+' módulos concluídos</small></span><span><b>'+tests.length+' testes</b><small>Média '+avg+(tests.length?'/10':'')+'</small></span><span class="report-presence">'+(a.online?'● Ativo recentemente':'Offline')+'<small>Último acesso: '+date(a.last_seen)+'</small></span><span class="report-expand">Detalhes ›</span></summary><div class="report-detail"><h3>Progresso por módulo</h3><ul class="report-modules">'+STUDY_MODULES.map(m=>'<li><span>Módulo '+Number(m.id)+'</span><b>'+new Set(p.state.study?.[m.id]?.read||[]).size+'/'+m.blocks.length+' etapas</b></li>').join('')+'</ul><h3>Histórico dos testes</h3><ul class="account-list">'+(tests.length?tests.map(t=>'<li><span>'+esc(t.scope==='all'?'Todos os módulos':'Módulo '+Number(t.scope))+'<small>'+date(t.created_at)+'</small></span><b>'+t.score+'/10</b></li>').join(''):'<li>Nenhum teste finalizado.</li>')+'</ul></div></details>';
 }).join(''):'<div class="empty">Nenhum colaborador encontrado para estes filtros.</div>';
}
function exportReports(){
 if(!me?.admin)return;
 if(!window.XLSX){by('reportsStatus').textContent='Exportação indisponível. Verifique sua conexão e tente novamente.';return;}
 const accounts=filteredTeam(),book=XLSX.utils.book_new();
 const summary=[['Nome','E-mail','Progresso (%)','Módulos concluídos','Testes finalizados','Média (0–10)','Acompanhamento','Último acesso']];
 const modules=[['Nome','E-mail','Módulo','Etapas lidas','Total de etapas','Concluído']];
 const tests=[['Nome','E-mail','Módulo','Nota (0–10)','Data']];
 accounts.forEach(a=>{
  const p=reportMetrics(a),name=personName(a.email);
  summary.push([name,a.email,p.pct,p.done,p.tests.length,p.average===null?'':Number(p.average.toFixed(2)),p.needsHelp?'Sim':'Não',date(a.last_seen)]);
  STUDY_MODULES.forEach(m=>{const n=new Set(p.state.study?.[m.id]?.read||[]).size;modules.push([name,a.email,'Módulo '+Number(m.id),n,m.blocks.length,n===m.blocks.length?'Sim':'Não']);});
  p.tests.forEach(t=>tests.push([name,a.email,t.scope==='all'?'Todos os módulos':'Módulo '+Number(t.scope),t.score,date(t.created_at)]));
 });
 for(const [name,rows] of [['Colaboradores',summary],['Módulos',modules],['Testes',tests]]){
  const sheet=XLSX.utils.aoa_to_sheet(rows);sheet['!cols']=rows[0].map((_,i)=>({wch:Math.min(45,Math.max(...rows.map(r=>String(r[i]??'').length))+2)}));
  sheet['!autofilter']={ref:sheet['!ref']};XLSX.utils.book_append_sheet(book,sheet,name);
 }
 XLSX.writeFile(book,'JAGUAR-RT-relatorios-'+new Date().toISOString().slice(0,10)+'.xlsx');
 by('reportsStatus').textContent='Relatório exportado com '+accounts.length+' colaboradores e os filtros atuais.';
}
async function loadReports(){if(!me?.admin)return;by('reportsStatus').textContent='Carregando relatórios…';by('reportsRefresh').disabled=true;try{const x=await api('admin');team=x.accounts;renderReports();by('reportsStatus').textContent='Atualizado em '+date(new Date())+' · Ativo recentemente: acesso nos últimos 2 minutos.';}catch(e){by('reportsStatus').textContent=e.message;}finally{by('reportsRefresh').disabled=false;}}
by('reportsOpen').onclick=async()=>{if(!me?.admin)return;close();go('teamReports');by('teamReports').scrollIntoView();await loadReports();};
by('reportsRefresh').onclick=loadReports;
by('reportsBack').onclick=()=>go('home');
by('reportsSearch').addEventListener('input',renderReports);
by('reportsFilter').addEventListener('change',renderReports);
by('reportsModule').innerHTML='<option value="all">Todos os módulos</option>'+STUDY_MODULES.map(m=>'<option value="'+m.id+'">Módulo '+Number(m.id)+' concluído</option>').join('');
by('reportsModule').addEventListener('change',renderReports);
by('reportsPerformance').addEventListener('change',renderReports);
by('reportsExport').onclick=exportReports;
setInterval(async()=>{if(!loaded||document.hidden)return;try{if(attemptQueue.length||read(pendingKey(),null)){await flush();return;}me=await api('state');render();}catch(e){status(e.message);}},60000);
window.addEventListener('online',()=>{if(loaded)flush();});
window.addEventListener('pagehide',()=>{if(loaded&&(read(pendingKey(),null)||attemptQueue.length))preservePending();});
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

