(function(){
'use strict';
const ENDPOINT='https://dliycybiocnhvqilbrlj.supabase.co/functions/v1/jaguarrt';
const TOKEN_KEY='jaguarrt-session';
const PROFILE_KEY='jaguarrt-profile';
const KEYS=['jaguar-rtav-study-progress-v1','jaguar-rtav-quiz-history-v2','jaguar-rtav-quiz-session-v3'];
function savedToken(){
 try{return localStorage.getItem(TOKEN_KEY)||sessionStorage.getItem(TOKEN_KEY)||'';}catch(e){return sessionStorage.getItem(TOKEN_KEY)||'';}
}
function persistToken(value){
 try{if(value)localStorage.setItem(TOKEN_KEY,value);else localStorage.removeItem(TOKEN_KEY);}catch(e){}
 try{if(value)sessionStorage.setItem(TOKEN_KEY,value);else sessionStorage.removeItem(TOKEN_KEY);}catch(e){}
}
let token=savedToken(),me=null,loaded=false,offlinePreview=false,timer,attemptQueue=[],saveChain=Promise.resolve();
let restoring=false,recoveryTimer,recoveryAttempt=0;
const by=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))||fallback;}catch{return fallback;}};
async function api(action,data,extra={}){
 const requestToken=extra.token||token;
 const r=await fetch(ENDPOINT,{method:'POST',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/json'},body:JSON.stringify({action,token,data,...extra})});
 let x;
 try{x=await r.json();}catch(e){
  if(r.status===401&&requestToken===token&&action!=='login'&&action!=='logout')endExpiredSession('Sessão expirada. Entre novamente.');
  throw Object.assign(Error('Não foi possível conectar. Tente novamente.'),{status:r.status});
 }
 if(!r.ok||x.error){
  if(r.status===401&&requestToken===token&&action!=='login'&&action!=='logout')endExpiredSession(x.error||'Sessão expirada. Entre novamente.');
  throw Object.assign(Error(x.error||'Não foi possível conectar.'),{status:r.status});
 }
 return x;
}
function cacheProfile(){
 try{localStorage.setItem(PROFILE_KEY,JSON.stringify({email:me.email,admin:!!me.admin,sessionPrefix:token.slice(0,12)}));}catch(e){}
}
function clearProfile(){try{localStorage.removeItem(PROFILE_KEY);}catch(e){}}
function finishPreview(){document.documentElement.classList.remove('has-saved-session');}
function showSessionPreview(){
 // Cached identity only paints this browser's last view; the server still authorizes all requests.
 const profile=read(PROFILE_KEY,null);
 by('loginGate').hidden=true;
 by('siteShell').hidden=false;
 by('siteShell').inert=true;
 if(profile?.email&&profile.sessionPrefix===token.slice(0,12)){
  me={email:profile.email,admin:false,state:normalizeCourseState(snapshot()),attempts:[]};
  attemptQueue=read(pendingKey(),null)?.attempts||readSessionAttempts(me.email);
  render();by('accountToggle').hidden=false;
  window.JaguarRestoreNavigation?.({admin:profile.admin===true});
 }else{
  // An existing session from an older site version has no cached profile yet.
  let savedNavigation;
  try{savedNavigation=localStorage.getItem('jaguar-rtav-navigation-v1');}catch(e){}
  window.JaguarRestoreNavigation?.({admin:false});
  if(savedNavigation){try{localStorage.setItem('jaguar-rtav-navigation-v1',savedNavigation);}catch(e){}}
 }
}
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
 renderModuleGrid();updateQuizStats();updateErrorReview();updateQuizResume();renderHomeResume();renderHomeDashboard();
 return normalized;
}
function mergeState(remote,local){
 const old=normalizeCourseState(remote||{}),next=normalizeCourseState(local||{});
 const study={...old.study,...next.study};
 for(const m of STUDY_MODULES){const a=old.study?.[m.id],b=next.study?.[m.id];if(a||b)study[m.id]={...a,...b,read:[...new Set([...(a?.read||[]),...(b?.read||[])])].sort((a,b)=>a-b)};}
 const history={...old.history,...next.history,seen:[...new Set([...(old.history?.seen||[]),...(next.history?.seen||[])])],results:{...old.history?.results},moduleCounts:{...old.history?.moduleCounts}};
 for(const [id,b] of Object.entries(next.history?.results||{})){const a=history.results[id]||{};history.results[id]={...a,...b,attempts:Math.max(a.attempts||0,b.attempts||0),best:Math.max(a.best||0,b.best||0)};}
 for(const [id,n] of Object.entries(next.history?.moduleCounts||{}))history.moduleCounts[id]=Math.max(history.moduleCounts[id]||0,n);
 return {...old,...next,study,history};
}
async function refreshState(){
 const owner=me?.email,sessionToken=token,x=await api('state');
 if(!loaded||me?.email!==owner||token!==sessionToken)return;
 const state=hydrate(mergeState(x.state,snapshot()));me={...x,state};render();
}
function snapshot(){return {study:read(KEYS[0],{}),history:read(KEYS[1],{}),quiz:read(KEYS[2],null)};}
function pendingKey(){return 'jaguarrt-unsynced:'+me.email;}
function preservePending(){
 if((!loaded&&!offlinePreview)||!me)return;
 try{localStorage.setItem(pendingKey(),JSON.stringify({state:snapshot(),attempts:attemptQueue,revision:crypto.randomUUID()}));}
 catch(e){status('Não foi possível guardar o progresso neste navegador. Mantenha a página aberta até sincronizar.');}
}
function schedule(){if(!loaded&&!offlinePreview)return;me.state=snapshot();preservePending();render();if(!loaded)return;clearTimeout(timer);timer=setTimeout(()=>flush(),600);}
async function flush(){
 if(!loaded||!me)return;
 const owner=me.email,sessionToken=token,key=pendingKey();
 saveChain=saveChain.catch(()=>{}).then(async()=>{
  if(!loaded||me?.email!==owner||token!==sessionToken)return;
  const pending=read(key,null),revision=pending?.revision;
  try{
   if(!pending&&!attemptQueue.length){await refreshState();return;}
   const remote=await api('state');
   if(!loaded||me?.email!==owner||token!==sessionToken)return;
   const data=mergeState(remote.state,snapshot());
   for(const attempt of [...attemptQueue]){
    await api('attempt',attempt);
    if(!loaded||me?.email!==owner||token!==sessionToken)return;
    attemptQueue=attemptQueue.filter(x=>x.id!==attempt.id);
    sessionStorage.setItem('jaguarrt-pending:'+owner,JSON.stringify(attemptQueue));
    const pending=read(key,null);if(pending){pending.attempts=attemptQueue;localStorage.setItem(key,JSON.stringify(pending));}
   }
   const result=await api('save',data);
   if(me?.email!==owner||token!==sessionToken)return;
   me={...result,state:hydrate(mergeState(result.state,snapshot()))};
   if(read(key,null)?.revision===revision)localStorage.removeItem(key);
   status(read(key,null)?'Alterações aguardando sincronização':'Progresso salvo');render();
  }catch(e){if(e.status!==401&&loaded&&token===sessionToken)status(e.message+' · alterações aguardando sincronização');}
 });return saveChain;
}
window.JaguarAccount={changed:schedule,attempt(s){if(!loaded&&!offlinePreview)return;attemptQueue.push({id:crypto.randomUUID(),scope:s.scope,questions:s.questions.map(q=>({id:q.id,options:q.options})),answers:s.answers});sessionStorage.setItem('jaguarrt-pending:'+me.email,JSON.stringify(attemptQueue));schedule();}};
function readSessionAttempts(email){try{return JSON.parse(sessionStorage.getItem('jaguarrt-pending:'+email)||'[]');}catch{return [];}}
function date(v){return v?new Date(v).toLocaleString('pt-BR'):'—';}
function progress(state){const normalized=normalizeCourseState(state||{});let read=0,total=0,done=0;for(const m of STUDY_MODULES){const steps=new Set((normalized?.study?.[m.id]?.read||[]).filter(i=>Number.isInteger(i)&&i>=0&&i<m.blocks.length));read+=steps.size;total+=m.blocks.length;if(steps.size===m.blocks.length)done++;}return {pct:total?Math.round(read/total*100):0,done,state:normalized};}
function attemptsHtml(attempts){return attempts.length?attempts.slice(0,30).map(a=>`<li><span>${esc(a.scope==='all'?'Todos os módulos':'Módulo '+a.scope)}<small>${date(a.created_at)}</small></span><b>${a.score}/10</b></li>`).join(''):'<li>Nenhum teste finalizado.</li>';}
function render(){if(!me)return;by('accountEmail').textContent=me.email;const p=progress(me.state);me.state=p.state;const name=me.email.split('@')[0].split(/[._-]+/).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');if(by('homeGreeting'))by('homeGreeting').textContent='Olá, '+name;by('accountName').textContent=name;by('drawerName').textContent=name;by('drawerAvatar').textContent=name.split(' ').map(w=>w[0]).slice(0,2).join('');by('accountAvatar').textContent=name.split(' ').map(w=>w[0]).slice(0,2).join('');by('accountProgress').textContent=p.pct+'%';by('accountMiniFill').style.width=p.pct+'%';by('accountToggle').setAttribute('aria-label',name+', '+p.pct+'% estudado. Abrir meu percurso');by('accountContent').innerHTML=`<div class="account-summary"><strong>${p.pct}<small>%</small></strong><span>Seu progresso<small>${p.done} de ${STUDY_MODULES.length} módulos concluídos</small></span></div><progress max="100" value="${p.pct}"></progress><h3>Seus módulos</h3><ul class="account-list">${STUDY_MODULES.map(m=>{const n=new Set(me.state?.study?.[m.id]?.read||[]).size;return `<li class="${n===m.blocks.length?'module-done':n?'module-started':''}"><button type="button" class="account-module" data-module="${m.id}" aria-label="Abrir Módulo ${Number(m.id)}: ${esc(m.title)}"><span><i>${n===m.blocks.length?'✓':String(Number(m.id)).padStart(2,'0')}</i>Módulo ${Number(m.id)}</span><b>${n}/${m.blocks.length}</b></button></li>`;}).join('')}</ul><details class="account-tests"><summary>Resultados dos testes · ${(me.attempts||[]).length}</summary><ul class="account-list">${attemptsHtml(me.attempts||[])}</ul></details>`;by('adminSection').hidden=!me.admin;renderHomeDashboard();}
async function enter(x){token=x.token||token;persistToken(token);me=x;const pending=read(pendingKey(),null);const original=me.state||{};const remote=normalizeCourseState(original),local=pending?.state?normalizeCourseState(pending.state):null;
const normalized=hydrate(local?mergeState(remote,local):remote);const migrated=JSON.stringify(normalized)!==JSON.stringify(original);me={...me,state:normalized};attemptQueue=pending?.attempts||readSessionAttempts(me.email);loaded=true;offlinePreview=false;by('sessionNotice').hidden=true;clearTimeout(recoveryTimer);recoveryAttempt=0;cacheProfile();by('loginGate').hidden=true;finishPreview();by('siteShell').inert=false;by('siteShell').hidden=false;by('accountToggle').hidden=false;render();const restored=window.JaguarRestoreNavigation?.({admin:!!me.admin})||'home';if(restored==='teamReports'&&me.admin)loadReports();status(migrated?'Progresso atualizado para a nova ordem':'Progresso sincronizado');if(migrated||pending||attemptQueue.length)schedule();}
by('loginForm').addEventListener('submit',async e=>{e.preventDefault();const button=by('loginSubmit');button.disabled=true;by('loginError').textContent='Entrando…';try{const x=await api('login',null,{email:by('loginEmail').value.trim(),password:by('loginPassword').value});by('loginPassword').value='';await enter(x);by('loginError').textContent='';}catch(e){by('loginError').textContent=e.message;}finally{button.disabled=false;}});
by('accountContent').addEventListener('click',e=>{const button=e.target.closest('[data-module]');if(!button)return;close();openModule(button.dataset.module);});
let priorFocus;
function close(){by('accountDrawer').hidden=true;by('accountBackdrop').hidden=true;by('accountToggle').setAttribute('aria-expanded','false');priorFocus?.focus();}
by('accountToggle').onclick=async()=>{priorFocus=document.activeElement;by('accountDrawer').hidden=false;by('accountBackdrop').hidden=false;by('accountToggle').setAttribute('aria-expanded','true');by('accountClose').focus();await flush();};
by('accountClose').onclick=close;by('accountBackdrop').onclick=close;
by('accountDrawer').addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Tab'){const els=[...by('accountDrawer').querySelectorAll('button,input,a,summary,select')].filter(x=>!x.hidden&&x.offsetParent);if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus();}}});
by('accountLogout').onclick=()=>{
 const oldToken=token;
 // Keep unsent work under this account, but always end access on this device immediately.
 preservePending();
 loaded=false;offlinePreview=false;clearTimeout(timer);clearTimeout(recoveryTimer);
 token='';me=null;team=[];by('reportsList').innerHTML='';by('reportsSummary').innerHTML='';attemptQueue=[];
 persistToken('');clearProfile();finishPreview();by('sessionNotice').hidden=true;
 try{localStorage.setItem('jaguar-rtav-navigation-v1',JSON.stringify({view:'home'}));}catch(e){}
 clearLocal();close();by('accountToggle').hidden=true;by('siteShell').hidden=true;by('siteShell').inert=true;
 by('loginGate').hidden=false;by('loginEmail').focus();
 api('logout',null,{token:oldToken}).catch(()=>{});
};
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
function reportTopics(accounts){
 const topics=new Map(STUDY_MODULES.map(m=>[m.id,{id:m.id,title:m.title,total:0,wrong:0,people:new Set()}]));
 accounts.forEach(a=>(a.attempts||[]).forEach(t=>(t.details||[]).forEach(q=>{
  const id=Number(t.order_version??t.orderVersion??2)===2?q.module:remapCourseId(q.module);
  const topic=topics.get(id);if(!topic||typeof q.ok!=='boolean')return;
  topic.total++;if(!q.ok){topic.wrong++;topic.people.add(a.email);}
 })));
 return [...topics.values()].filter(t=>t.total).sort((a,b)=>b.wrong/b.total-a.wrong/a.total||b.wrong-a.wrong);
}
function reportInsightHtml(accounts){
 const topics=reportTopics(accounts),help=accounts.filter(a=>reportMetrics(a).needsHelp);
 return '<section><h2>Onde reforçar o aprendizado</h2><p>Erros por módulo nos testes disponíveis, considerando os filtros atuais.</p>'+(topics.length?'<div class="comparison-scroll"><table class="comparison-table"><thead><tr><th>Módulo</th><th>Erros / respostas</th><th>Acertos</th><th>Pessoas com erros</th></tr></thead><tbody>'+topics.map(t=>'<tr><th>Módulo '+Number(t.id)+'<small>'+esc(t.title)+'</small></th><td>'+t.wrong+' / '+t.total+'</td><td>'+Math.round((t.total-t.wrong)/t.total*100)+'%</td><td>'+t.people.size+'</td></tr>').join('')+'</tbody></table></div>':'<div class="empty">Ainda não há respostas detalhadas para analisar os assuntos.</div>')+'</section><section><h2>Quem precisa de reforço</h2><p>Média inferior a 7 nos testes finalizados.</p>'+(help.length?'<ul class="reinforcement-list">'+help.map(a=>'<li><b>'+esc(personName(a.email))+'</b><span>Média '+reportMetrics(a).average.toFixed(1).replace('.',',')+'/10 · progresso '+reportMetrics(a).pct+'%</span></li>').join('')+'</ul>':'<div class="empty">Nenhum colaborador com média abaixo de 7 neste filtro.</div>')+'</section>';
}
function renderReports(){
 const filtered=filteredTeam();
 const sort=by('reportsSort').value;
 filtered.sort((a,b)=>sort==='progress'?reportMetrics(b).pct-reportMetrics(a).pct:sort==='performance'?(reportMetrics(a).average??11)-(reportMetrics(b).average??11):personName(a.email).localeCompare(personName(b.email),'pt-BR'));
 by('reportsInsights').innerHTML=reportInsightHtml(filtered);
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
 const topics=[['Módulo','Assunto','Respostas','Erros','Acertos (%)','Colaboradores com erros'],...reportTopics(accounts).map(t=>['Módulo '+Number(t.id),t.title,t.total,t.wrong,Math.round((t.total-t.wrong)/t.total*100),t.people.size])];
 for(const [name,rows] of [['Colaboradores',summary],['Módulos',modules],['Testes',tests],['Reforço por assunto',topics]]){
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
by('reportsSort').addEventListener('change',renderReports);
by('reportsExport').onclick=exportReports;
setInterval(async()=>{if(!loaded||document.hidden)return;try{if(attemptQueue.length||read(pendingKey(),null)){await flush();return;}await refreshState();}catch(e){status(e.message);}},60000);
window.addEventListener('online',()=>{if(loaded)flush();else if(token)restoreSession();});
window.addEventListener('pagehide',()=>{if((loaded||offlinePreview)&&(read(pendingKey(),null)||attemptQueue.length))preservePending();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)return;if(loaded)flush();else if(token)restoreSession();});
window.addEventListener('pageshow',e=>{if(e.persisted&&!loaded&&token)restoreSession();});
function endExpiredSession(message){
 if(loaded||offlinePreview)preservePending();
 clearTimeout(timer);clearTimeout(recoveryTimer);
 token='';loaded=false;offlinePreview=false;me=null;team=[];attemptQueue=[];
 by('reportsList').innerHTML='';by('reportsSummary').innerHTML='';close();by('sessionNotice').hidden=true;
 persistToken('');clearProfile();finishPreview();
 by('accountToggle').hidden=true;
 by('siteShell').hidden=true;by('siteShell').inert=true;
 by('loginGate').hidden=false;by('loginError').textContent=message;
 by('loginEmail').focus();
}
async function restoreSession(){
 if(restoring||!token)return;
 const requestedSession=token;
 restoring=true;clearTimeout(recoveryTimer);
 try{
  const x=await api('state');
  if(token!==requestedSession)return;
  await enter(x);
 }catch(e){
  if(token!==requestedSession)return;
  if(e.status===401){endExpiredSession(e.message);return;}
  // An interrupted mobile connection is not evidence that the saved session expired.
  loaded=false;offlinePreview=!!me;
  by('loginGate').hidden=true;by('siteShell').hidden=false;
  by('siteShell').inert=!offlinePreview;
  status('Sem conexão com o servidor. Seu acesso foi mantido; tentando reconectar.');
  if(offlinePreview){
   by('sessionNotice').textContent='Sem conexão. Você pode continuar o estudo; o progresso será sincronizado ao reconectar.';
  }else{
   by('sessionNotice').textContent='Conexão interrompida. Seu acesso salvo foi mantido; tentando reconectar.';
  }
  by('sessionNotice').hidden=false;
  const delays=[2000,5000,10000,30000];
  recoveryTimer=setTimeout(()=>{if(!document.hidden)restoreSession();},delays[Math.min(recoveryAttempt++,delays.length-1)]);
 }finally{restoring=false;}
}
(async()=>{
 by('siteShell').inert=true;
 if(!token){finishPreview();by('siteShell').hidden=true;by('loginGate').hidden=false;by('loginEmail').focus();return;}
 showSessionPreview();
 await restoreSession();
})();
})();
