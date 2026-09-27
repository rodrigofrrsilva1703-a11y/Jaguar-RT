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
 $('homeModules').innerHTML=STUDY_MODULES.slice(0,6).map(moduleCard).join('');
 $('moduleGrid').innerHTML=STUDY_MODULES.map(moduleCard).join('');
 $('practiceGrid').innerHTML=PRACTICES.map((p,i)=>`<article class="practice-card">
   <span class="tag">${p.tag}</span><h3>${p.title}</h3><p>${p.question}</p>
   <details><summary>Ver resolução</summary><div class="answer">${p.answer}</div></details>
 </article>`).join('');
 $('sourceGrid').innerHTML=SOURCES.map(s=>`<article class="source-card">
   <h3>${s[0]}</h3><p>${s[2]}</p>${s[1]==='#'?'<span class="source-note">Material interno do estudo</span>':`<a href="${s[1]}" target="_blank" rel="noopener">Abrir fonte oficial →</a>`}
 </article>`).join('');
 $('timeline').innerHTML=Object.entries(TIMELINE).map(([y,o])=>`<button class="year" onclick="pickYear('${y}')" data-year="${y}"><b>${y}</b><small>${o.label}</small></button>`).join('');
 pickYear('2027');
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
$('searchInput').addEventListener('input',e=>searchModules(e.target.value));
$('heroSearch').addEventListener('keydown',e=>{
 if(e.key==='Enter'){ $('searchInput').value=e.target.value; searchModules(e.target.value); go('search'); }
});

const TRANSITION={
 2026:{old:1,cbs:.9,ibs:.1,note:'2026 é ano-teste. CBS 0,9% e IBS 0,1% possuem regras de compensação/dispensa; não use este resultado como “novo preço definitivo”.'},
 2027:{old:1,cbs:9,ibs:.1,note:'IBS 0,1% é oficial. CBS 9% é a premissa estimada usada no RTAV; a alíquota geral aplicável deve ser substituída pela oficial quando fixada.'},
 2028:{old:1,cbs:9,ibs:.1,note:'IBS 0,1% é oficial. CBS 9% permanece apenas premissa RTAV nesta simulação.'},
 2029:{old:.9,cbs:9,ibs:1.891,note:'Projeção didática: CBS 9% + 10% de um IBS cheio estimado em 18,91%. As alíquotas de referência reais devem ser atualizadas quando fixadas.'},
 2030:{old:.8,cbs:9,ibs:3.782,note:'Projeção didática: CBS 9% + 20% de IBS cheio estimado em 18,91%.'},
 2031:{old:.7,cbs:9,ibs:5.673,note:'Projeção didática: CBS 9% + 30% de IBS cheio estimado em 18,91%.'},
 2032:{old:.6,cbs:9,ibs:7.564,note:'Projeção didática: CBS 9% + 40% de IBS cheio estimado em 18,91%.'},
 2033:{old:0,cbs:9,ibs:18.91,note:'Projeção didática de carga-padrão total de 27,91% (9% CBS + 18,91% IBS). É estimativa RTAV, não alíquota universal oficial.'}
};

function applyYearPreset(){
 const y=Number($('priceYear').value);
 const p=TRANSITION[y];
 if($('rateMode').value==='rtav'){
  $('cbsRate').value=p.cbs;
  $('ibsRate').value=p.ibs;
 }
 $('rateNote').textContent=p.note;
 calcPrice();
}
$('priceYear').addEventListener('change',applyYearPreset);
$('rateMode').addEventListener('change',()=>{
 const manual=$('rateMode').value==='manual';
 $('cbsRate').readOnly=!manual;
 $('ibsRate').readOnly=!manual;
 if(!manual)applyYearPreset();
 else {$('rateNote').textContent='Modo manual: informe as alíquotas CBS e IBS aplicáveis à operação e ao período.';calcPrice();}
});
['priceNow','pisRate','cofinsRate','icmsRate','issRate','ipiRate','cbsRate','ibsRate'].forEach(id=>$(id).addEventListener('input',calcPrice));

function calcPrice(){
 const price=num('priceNow');
 const currentSum=num('pisRate')+num('cofinsRate')+num('icmsRate')+num('issRate')+num('ipiRate');
 const liquid=price*(1-currentSum/100);
 const cbs=num('cbsRate'),ibs=num('ibsRate');
 const cbsValue=liquid*cbs/100, ibsValue=liquid*ibs/100;
 const intermediate=liquid+cbsValue+ibsValue;
 const y=Number($('priceYear').value);
 const oldFactor=TRANSITION[y].old;
 const oldCurrent=(num('icmsRate')+num('issRate'))*oldFactor;
 const projected=oldCurrent<100?intermediate/(1-oldCurrent/100):0;
 const delta=price?((projected/price)-1)*100:0;
 $('priceResult').innerHTML=`
  <div><small>Preço líquido-alvo</small><b>${money(liquid)}</b></div>
  <div><small>CBS sobre base limpa</small><b>${money(cbsValue)}</b></div>
  <div><small>IBS sobre base limpa</small><b>${money(ibsValue)}</b></div>
  <div><small>ICMS/ISS remanescente no cenário</small><b>${pct(oldCurrent)}</b></div>
  <div class="main-result"><small>Preço projetado</small><strong>${money(projected)}</strong><span>${delta>=0?'+':''}${pct(delta)} vs. preço atual</span></div>`;
}

['costNow','creditNow','costFuture','cbsCredit','ibsCredit'].forEach(id=>$(id).addEventListener('input',calcCost));
function calcCost(){
 const now=num('costNow')-num('creditNow');
 const future=num('costFuture')-num('cbsCredit')-num('ibsCredit');
 const d=now?((future/now)-1)*100:0;
 $('costResult').innerHTML=`<div><small>Custo efetivo hoje</small><b>${money(now)}</b></div><div><small>Custo efetivo projetado</small><b>${money(future)}</b></div><div class="main-result"><small>Variação do custo</small><strong>${d>=0?'+':''}${pct(d)}</strong></div>`;
}

['rbt12','snNominal','snDeduction','snRevenue'].forEach(id=>$(id).addEventListener('input',calcSimples));
function calcSimples(){
 const r=num('rbt12'),nom=num('snNominal')/100,pd=num('snDeduction'),rev=num('snRevenue');
 const eff=r?((r*nom-pd)/r):0;
 $('simplesResult').innerHTML=`<div><small>Alíquota efetiva</small><b>${pct(eff*100)}</b></div><div class="main-result"><small>DAS simulado</small><strong>${money(rev*eff)}</strong></div>`;
}

['lpRevenue','lpPresumption'].forEach(id=>$(id).addEventListener('input',calcLP));
function calcLP(){
 const revenue=num('lpRevenue'),pres=num('lpPresumption')/100,limit=5000000;
 const before=revenue*pres;
 const normal=Math.min(revenue,limit);
 const excess=Math.max(0,revenue-limit);
 const newPres=pres*1.10;
 const after=normal*pres+excess*newPres;
 $('lpResult').innerHTML=`<div><small>Base sem acréscimo</small><b>${money(before)}</b></div><div><small>Presunção sobre excedente</small><b>${pct(newPres*100)}</b></div><div class="main-result"><small>Base com LC 224 (simulação)</small><strong>${money(after)}</strong><span>Diferença: ${money(after-before)}</span></div>`;
}

renderHome();
searchModules('');
applyYearPreset();
calcCost();
calcSimples();
calcLP();