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
 2026:{old:1,cbs:.9,ibs:.1,note:'2026 é ano-teste. CBS 0,9% e IBS 0,1% têm regras próprias de compensação/dispensa. Use como simulação, não como preço definitivo.'},
 2027:{old:1,cbs:9,ibs:.1,note:'IBS 0,1% é o parâmetro legal da fase inicial. CBS 9% é a premissa didática usada no RTAV e deve ser substituída pela alíquota oficial aplicável.'},
 2028:{old:1,cbs:9,ibs:.1,note:'IBS 0,1% na fase inicial. CBS 9% continua apenas como premissa RTAV neste modo.'},
 2029:{old:.9,cbs:9,ibs:1.891,note:'Projeção RTAV: CBS 9% + 10% de um IBS cheio estimado em 18,91%. Atualize quando houver alíquotas oficiais aplicáveis.'},
 2030:{old:.8,cbs:9,ibs:3.782,note:'Projeção RTAV: CBS 9% + 20% de IBS cheio estimado em 18,91%.'},
 2031:{old:.7,cbs:9,ibs:5.673,note:'Projeção RTAV: CBS 9% + 30% de IBS cheio estimado em 18,91%.'},
 2032:{old:.6,cbs:9,ibs:7.564,note:'Projeção RTAV: CBS 9% + 40% de IBS cheio estimado em 18,91%.'},
 2033:{old:0,cbs:9,ibs:18.91,note:'Projeção didática RTAV de 27,91% no total (9% CBS + 18,91% IBS). Não é alíquota universal oficial.'}
};

const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number(v)||0));
const effectPct=(before,after)=>before?((after/before)-1)*100:0;
const deltaMoney=(before,after)=>after-before;
const effectText=v=>`${v>=0?'+':''}${pct(v)}`;

function applyYearPreset(){
 const y=Number($('priceYear')?.value||2027);
 const p=TRANSITION[y]||TRANSITION[2027];
 if($('rateMode')?.value==='rtav'){
  $('cbsRate').value=p.cbs;
  $('ibsRate').value=p.ibs;
 }
 if($('rateNote')) $('rateNote').textContent=$('rateMode')?.value==='manual'
  ? 'Modo manual: informe CBS e IBS aplicáveis à operação e ao período. A redução informada abaixo será aplicada sobre essas alíquotas para fins de simulação.'
  : p.note;
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

function calcIntegrated(){
 if(!$('integratedKpis')) return;

 const price=Math.max(0,num('priceNow'));
 const pis=clamp(num('pisRate'),0,100);
 const cofins=clamp(num('cofinsRate'),0,100);
 const icms=clamp(num('icmsRate'),0,100);
 const iss=clamp(num('issRate'),0,100);
 const ipi=clamp(num('ipiRate'),0,100);
 const currentRate=pis+cofins+icms+iss+ipi;
 const currentTaxes=price*currentRate/100;
 const currentNet=Math.max(0,price-currentTaxes);

 const y=Number($('priceYear')?.value||2027);
 const preset=TRANSITION[y]||TRANSITION[2027];
 const reduction=clamp(num('rateReduction'),0,100);
 const reductionFactor=1-reduction/100;
 const cbsBaseRate=clamp(num('cbsRate'),0,100);
 const ibsBaseRate=clamp(num('ibsRate'),0,100);
 const cbsRate=cbsBaseRate*reductionFactor;
 const ibsRate=ibsBaseRate*reductionFactor;
 const newRate=(cbsRate+ibsRate)/100;
 const oldRate=((icms+iss)*preset.old)/100;

 let projected=0;
 let cleanBase=0;
 const strategy=$('priceStrategy')?.value||'net';

 if(strategy==='net'){
  cleanBase=currentNet;
  projected=(1-oldRate)>0?cleanBase*(1+newRate)/(1-oldRate):0;
 }else{
  projected=strategy==='gross'?price:Math.max(0,num('manualProjectedPrice'));
  cleanBase=(1+newRate)>0?projected*(1-oldRate)/(1+newRate):0;
 }

 const cbsValue=cleanBase*cbsRate/100;
 const ibsValue=cleanBase*ibsRate/100;
 const oldTaxValue=projected*oldRate;
 const projectedTaxes=cbsValue+ibsValue+oldTaxValue;
 const projectedNet=Math.max(0,projected-projectedTaxes);

 const currentCredit=Math.max(0,num('currentBuyerCredit'));
 const cbsCredit=cbsValue*clamp(num('cbsCreditPct'),0,100)/100;
 const ibsCredit=ibsValue*clamp(num('ibsCreditPct'),0,100)/100;
 const otherCredit=Math.max(0,num('otherProjectedCredit'));
 const projectedCredit=cbsCredit+ibsCredit+otherCredit;
 const currentCost=Math.max(0,price-currentCredit);
 const projectedCost=Math.max(0,projected-projectedCredit);

 const priceDelta=effectPct(price,projected);
 const costDelta=effectPct(currentCost,projectedCost);
 const netDelta=effectPct(currentNet,projectedNet);
 const creditDelta=deltaMoney(currentCredit,projectedCredit);

 let signal='EFEITO PRÓXIMO DO ATUAL';
 let headline='Preço e custo caminham de forma próxima neste cenário.';
 if(priceDelta>.05&&costDelta<-.05){
  signal='PAGA MAIS · CUSTA MENOS';
  headline='O crédito mais do que compensa o aumento do preço para o comprador.';
 }else if(priceDelta>.05&&costDelta>.05){
  signal='PAGA MAIS · CUSTA MAIS';
  headline='Os créditos não compensam integralmente o aumento do preço.';
 }else if(priceDelta<-.05&&costDelta<-.05){
  signal='PAGA MENOS · CUSTA MENOS';
  headline='Preço e custo efetivo caem neste cenário.';
 }else if(priceDelta<-.05&&costDelta>.05){
  signal='PAGA MENOS · CUSTA MAIS';
  headline='O preço cai, mas a perda/redução de créditos aumenta o custo efetivo.';
 }else if(Math.abs(priceDelta)<=.05&&costDelta<-.05){
  signal='PREÇO ESTÁVEL · CUSTO MENOR';
  headline='O preço fica praticamente igual, mas os créditos reduzem o custo.';
 }else if(Math.abs(priceDelta)<=.05&&costDelta>.05){
  signal='PREÇO ESTÁVEL · CUSTO MAIOR';
  headline='O preço fica praticamente igual, mas o custo aumenta por efeito de créditos.';
 }

 const reductionNote=reduction>0
   ? ` Foi aplicada redução de ${pct(reduction)}: CBS efetiva ${pct(cbsRate)} e IBS efetivo ${pct(ibsRate)}.`
   : '';
 const strategyLabel=strategy==='net'?'preservar a receita líquida atual':strategy==='gross'?'manter o preço bruto atual':'usar o preço projetado informado manualmente';
 const creditProfile=$('buyerCreditProfile')?.value||'full';
 const creditNote=creditProfile==='full'
   ? ' O cenário usa 100% da CBS/IBS calculada como crédito apenas para demonstrar o efeito econômico; confirme o direito real ao crédito.'
   : creditProfile==='none'
     ? ' O cenário considera que o comprador não aproveita crédito de CBS/IBS.'
     : ' O cenário usa os percentuais manuais de aproveitamento de crédito informados.';

 $('resultSignal').textContent=signal;
 $('integratedKpis').innerHTML=`
  <div class="integrated-kpi dark"><small>Preço projetado</small><b>${money(projected)}</b><span>${effectText(priceDelta)} vs. hoje</span></div>
  <div class="integrated-kpi"><small>CBS + IBS do cenário</small><b>${money(cbsValue+ibsValue)}</b><span>CBS ${money(cbsValue)} · IBS ${money(ibsValue)}</span></div>
  <div class="integrated-kpi"><small>Crédito projetado</small><b>${money(projectedCredit)}</b><span>CBS ${money(cbsCredit)} · IBS ${money(ibsCredit)}</span></div>
  <div class="integrated-kpi dark"><small>Custo efetivo do comprador</small><b>${money(projectedCost)}</b><span>${effectText(costDelta)} vs. hoje</span></div>
 `;

 const row=(label,before,after,effect,kind='pct')=>{
  const effectValue=kind==='money'?money(effect):effectText(effect);
  return `<tr><td><strong>${label}</strong></td><td>${money(before)}</td><td>${money(after)}</td><td class="${effect<0?'effect-down':'effect-up'}">${effectValue}</td></tr>`;
 };
 $('integratedTable').innerHTML=[
  row('Preço / valor pago',price,projected,priceDelta),
  row('Tributos considerados na venda',currentTaxes,projectedTaxes,projectedTaxes-currentTaxes,'money'),
  row('Crédito do comprador',currentCredit,projectedCredit,creditDelta,'money'),
  row('Custo efetivo do comprador',currentCost,projectedCost,costDelta),
  row('Receita líquida da venda',currentNet,projectedNet,netDelta)
 ].join('');

 $('integratedExplanation').innerHTML=`
   <b>${headline}</b>
   <p>A estratégia selecionada é <strong>${strategyLabel}</strong>. O preço projetado gera ${money(cbsValue)} de CBS e ${money(ibsValue)} de IBS no modelo didático; após o aproveitamento informado, o comprador recebe ${money(projectedCredit)} em créditos considerados e seu custo efetivo fica em ${money(projectedCost)}.${reductionNote}${creditNote}</p>
 `;
}

$('priceYear')?.addEventListener('change',applyYearPreset);
$('rateMode')?.addEventListener('change',()=>{
 const manual=$('rateMode').value==='manual';
 $('cbsRate').readOnly=!manual;
 $('ibsRate').readOnly=!manual;
 applyYearPreset();
});
$('priceStrategy')?.addEventListener('change',syncPriceStrategy);
$('buyerCreditProfile')?.addEventListener('change',syncCreditProfile);

[
 'priceNow','pisRate','cofinsRate','icmsRate','issRate','ipiRate','currentBuyerCredit',
 'rateReduction','cbsRate','ibsRate','manualProjectedPrice','cbsCreditPct','ibsCreditPct','otherProjectedCredit'
].forEach(id=>$(id)?.addEventListener('input',calcIntegrated));

['rbt12','snNominal','snDeduction','snRevenue'].forEach(id=>$(id)?.addEventListener('input',calcSimples));
function calcSimples(){
 if(!$('simplesResult')) return;
 const r=num('rbt12'),nom=num('snNominal')/100,pd=num('snDeduction'),rev=num('snRevenue');
 const eff=r?((r*nom-pd)/r):0;
 $('simplesResult').innerHTML=`<div><small>Alíquota efetiva</small><b>${pct(eff*100)}</b></div><div class="main-result"><small>DAS simulado</small><strong>${money(rev*eff)}</strong><span>Complemento do diagnóstico; não alimenta automaticamente a formação do preço.</span></div>`;
}

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
syncCreditProfile();
syncPriceStrategy();
applyYearPreset();
calcSimples();
calcLP();