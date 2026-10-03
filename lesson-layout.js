/* Lesson visuals render the complete source, without excerpting calculations. */
const JaguarLessons=(()=>{
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clean=s=>s.trim().replace(/^[-*•]\s*/,'');
 const lines=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
 const overview={
  '01':[['IVA Dual','A estrutura coordenada da tributação do consumo.'],['CBS e IBS','Separe as competências dos dois tributos.'],['Neutralidade','Conecte débitos, créditos e valor adicionado.']],
  '02':[['Destino','Identifique onde a operação é considerada consumida.'],['Local da operação','Observe os critérios de localização.'],['IBS','Relacione o destino ao tributo da operação.']],
  '03':[['Fornecimento','Identifique o momento da entrega ou prestação.'],['Antecipação','Separe o pagamento anterior ao fornecimento.'],['Ajuste final','Confronte o débito definitivo e as antecipações.']],
  '04':[['Valor da operação','Identifique os componentes da base.'],['Cálculo por fora','Separe o valor líquido e os tributos.'],['Imposto Seletivo','Observe sua relação com a base de IBS/CBS.']],
  '05':[['Crédito elegível','Verifique os requisitos antes de apropriar.'],['Débitos e créditos','Controle cada tributo separadamente.'],['Custo efetivo','Compare o preço pago e os créditos admitidos.']],
  '06':[['Saldo credor','Identifique a origem do saldo a recuperar.'],['Ressarcimento e ajustes','Diferencie os procedimentos aplicáveis.'],['Cashback','Separe a devolução à família do crédito empresarial.']],
  '07':[['Regra da operação','Identifique o tratamento antes de calcular.'],['Redução e alíquota zero','Leia a matriz com as premissas do exemplo.'],['Diferenciado × específico','Reconheça quando a própria apuração muda.']],
  '08':[['Enquadramento setorial','Identifique o regime específico.'],['DeRE','Observe os dados e eventos exigidos.'],['Apuração assistida','Conecte declaração, apuração e conferência.']],
  '09':[['Importação','Identifique base, destino e tratamento do item.'],['Exportação','Observe comprovação, condições e créditos.'],['Áreas incentivadas','Valide o enquadramento territorial.']],
  '10':[['Teste e implantação','Situe a operação no início da transição.'],['Convivência','Separe os tributos novos e remanescentes.'],['Modelo integral','Acompanhe a conclusão do calendário em 2033.']],
  '11':[['Simples padrão','Observe a parcela de IBS/CBS dentro do DAS.'],['Regime regular','Compare a opção de recolhimento separado.'],['Efeito na cadeia','Analise créditos e custo para o cliente.']],
  '12':[['Tributação da renda','Analise IRPJ, CSLL e os ajustes fiscais.'],['Tributação do consumo','Separe a análise de IBS e CBS.'],['Comparação de cenários','Avalie as bases, despesas e premissas.']],
  '13':[['Preço atual','Separe a carga embutida na simulação.'],['Créditos e custos','Recalcule o custo econômico da operação.'],['Preço e DRE','Confronte faturamento, deduções e margem.']],
  '14':[['Cadastro','Revise classificação e enquadramento.'],['Documento fiscal','Confira campos, destino e leiaute.'],['Apuração assistida','Confronte os dados com os controles da empresa.']],
  '15':[['Liquidação','Observe a operação e o meio de pagamento.'],['Segregação','Analise o mecanismo quando for aplicável.'],['Conciliação','Vincule documento, relatório de pagamento e banco.']],
  '16':[['Diagnóstico','Conheça o perfil e os dados do cliente.'],['Simulação','Separe regras, premissas e cenários.'],['Plano de ação','Registre conclusões condicionadas e próximos passos.']]
 };
 function inline(raw){
  const s=clean(raw),at=s.indexOf(':');
  return at>0&&at<105?'<strong>'+esc(s.slice(0,at+1))+'</strong> '+esc(s.slice(at+1).trim()):esc(s);
 }
 function paragraph(raw){
  const s=clean(raw);
  if(/^[DC]\s*[—–-]/.test(s)){
   const pair=s.split(/\s*\.{3,}\s*/);
   if(pair.length===2)return '<p class="lesson-ledger-line"><span>'+esc(pair[0])+'</span><b>'+esc(pair[1])+'</b></p>';
  }
  const analysis=/^(Análise|Conclusão|Conciliação Tripla|Conexão Estrutural)/i.test(s);
  return '<p'+(analysis?' class="lesson-analysis"':'')+'>'+inline(s)+'</p>';
 }
 function text(raw){
  const items=Array.isArray(raw)?raw:lines(raw);let out='',list=[];
  const flush=()=>{if(list.length){out+='<ul class="lesson-reading-list">'+list.map(x=>'<li>'+inline(x)+'</li>').join('')+'</ul>';list=[];}};
  items.forEach(x=>{if(/^[-*•]\s/.test(x)){list.push(x);return;}flush();out+=paragraph(x);});flush();return out;
 }
 function figure(kind,label,body){return '<figure class="lesson-story lesson-layout lesson-story-'+kind+'" aria-label="'+esc(label)+'"><figcaption class="lesson-visual-label">'+esc(label)+'</figcaption>'+body+'</figure>';}
 function compare(b){
  const parts=lines(b.x),cut=parts.findIndex(x=>/^(COMO É AGORA|CENÁRIO DIDÁTICO COM SPLIT)/.test(x));
  if(cut<0)return '';
  const oldLabel=parts[0],newLabel=parts[cut];
  return figure('compare','Compare as duas situações','<div class="lesson-compare-grid"><section><h4>'+esc(oldLabel)+'</h4>'+text(parts.slice(1,cut))+'</section><section><h4>'+esc(newLabel)+'</h4>'+text(parts.slice(cut+1))+'</section></div>');
 }
 function regimes(b){
  const lead=[],groups=[];
  for(const raw of lines(b.x)){
   const s=clean(raw),match=s.match(/^(Simples Nacional[^:]*|Lucro Presumido|Lucro Real):\s*(.*)$/i);
   if(match)groups.push({title:match[1],body:[match[2]]});
   else if(groups.length)groups.at(-1).body.push(raw);else lead.push(raw);
  }
  if(!groups.length)return '';
  return text(lead)+figure('regimes','O efeito em cada regime','<div class="lesson-regime-grid">'+groups.map(g=>'<section><h4>'+esc(g.title)+'</h4>'+text(g.body)+'</section>').join('')+'</div>');
 }
 function matrix(b){
  const src=lines(b.x),at=src.findIndex(x=>/^(Categoria \/ Hipótese Legal|Ano de Competência)$/.test(x));
  if(at<0)return '';
  const headers=src.slice(at,at+5),cells=[],notes=[];
  let ended=false;
  src.slice(at+5).forEach(x=>{
   if(/^(Conexão|Conclusão|Análise)/.test(x))ended=true;
   if(ended)notes.push(x);
   else if(/^\(/.test(x)&&cells.length)cells[cells.length-1]+=' '+x;
   else cells.push(x);
  });
  if(cells.length%5!==0)return '';
  const rows=[];for(let i=0;i<cells.length;i+=5)rows.push(cells.slice(i,i+5));
  const table='<div class="lesson-matrix-wrap"><table class="lesson-matrix"><caption>'+esc(b.t)+'</caption><thead><tr>'+headers.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map((cell,i)=>i===0?'<th scope="row">'+esc(cell)+'</th>':'<td data-label="'+esc(headers[i])+'">'+esc(cell)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  return figure('matrix',b.k==='EXEMPLO NUMÉRICO'?'Premissas e resultados do exemplo':'Quadro de referência',text(src.slice(0,at))+table+text(notes));
 }
 function steps(b){
  const lead=[],groups=[];let conclusion=[];
  const marker=/^(?:\d+[.)]\s|(?:Etapa|Fase)\s+\d+|(?:Cliente|Proposta|Cenário)\s+[A-Z0-9]\b|Cenário Atual\b|Aplicação da Reprecificação\b|Nova DRE\b|Liquidação Financeira\b|\/\/\s*\d+[.)])/i;
  for(const raw of lines(b.x)){
   const s=clean(raw);
   if(/^(Análise|Conclusão|Conciliação Tripla|Conexão Estrutural)/i.test(s)){conclusion.push(raw);continue;}
   if(conclusion.length){conclusion.push(raw);continue;}
   if(marker.test(s)){
    const heading=s.replace(/^\/\/\s*/,''),at=heading.indexOf(':');
    const split=at>0&&heading.slice(at+1).trim();
    groups.push({title:split?heading.slice(0,at+1):heading,body:split?[heading.slice(at+1).trim()]:[]});
   }
   else if(groups.length)groups.at(-1).body.push(raw);else lead.push(raw);
  }
  if(!groups.length)return '';
  return figure('example',/EXEMPLO|NUMÉRICO/.test(b.k)?'Exemplo completo':'Sequência de aplicação',text(lead)+'<div class="lesson-step-list">'+groups.map(g=>'<section class="lesson-step-item"><h4>'+esc(g.title)+'</h4>'+text(g.body)+'</section>').join('')+'</div>'+text(conclusion));
 }
 function render(m,b,index){
  if(index===0){
   const src=lines(b.x),cards=overview[m.id]||[];
   const map='<figure class="lesson-story lesson-layout lesson-story-focus" aria-label="Mapa visual do módulo"><div class="lesson-story-heading"><div><span class="lesson-story-kicker">MAPA DO MÓDULO '+esc(m.id)+'</span><h3>Os pontos que vamos conectar</h3></div></div><div class="lesson-overview-grid">'+cards.map((c,i)=>'<section><span class="lesson-overview-number">'+String(i+1).padStart(2,'0')+'</span><h4>'+esc(c[0])+'</h4><p>'+esc(c[1])+'</p></section>').join('')+'</div></figure>';
   return '<div class="lesson-opening">'+text(src.slice(0,1))+'</div>'+map+text(src.slice(1));
  }
  if(b.k==='PRÓXIMA ETAPA'||b.k==='SÍNTESE')return text(b.x);
  if(/COMPARATIVO/.test(b.k)){const html=compare(b);if(html)return html;}
  if(/REGIMES/.test(b.k)){const html=regimes(b);if(html)return html;}
  const table=matrix(b);if(table)return table;
  const ordered=steps(b);if(ordered)return ordered;
  if(/EXEMPLO|CASO PRÁTICO|PROCESSO|CRONOGRAMA|CONFORMIDADE|INTEGRAÇÃO|CONCILIAÇÃO/.test(b.k))return figure('reading',/EXEMPLO|CASO PRÁTICO/.test(b.k)?'Aplicação do conceito':'Leitura do processo',text(b.x));
  return text(b.x);
 }
 return Object.freeze({render,text});
})();
