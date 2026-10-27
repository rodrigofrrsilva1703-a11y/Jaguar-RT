/* Jaguar RT — impactos da Reforma Tributária do Consumo por departamento.
   Os itens de RH/DP, Legalização e gestão representam impactos operacionais
   indiretos quando não existir obrigação expressa no marco legal citado. */
(function(){
 'use strict';
 const areas=[
  {
   id:'fiscal',name:'Fiscal',short:'Fiscal',nature:'Impacto direto',module:'14',
   lead:'A rotina fiscal muda na emissão, recepção e conferência de documentos, na apuração de IBS/CBS, no controle de créditos e na convivência com os tributos anteriores.',
   tasks:['Mapear NCM/NBS, CST, cClassTrib, destino e os leiautes efetivamente obrigatórios para cada operação.','Conferir os XMLs e os valores de IBS/CBS por competência, com créditos e ajustes admitidos pela lei.','Preparar conciliação da apuração assistida, devoluções e regimes específicos, respeitando a transição de 2026 a 2033.'],
   watch:'O cronograma depende do documento e do regime. Não aplicar 9,21%/18,70% como alíquotas oficiais universais.',
   example:'Uma empresa de serviços passa a utilizar o Emissor Nacional da NFS-e quando obrigada; o Fiscal valida os campos, eventos e a legislação aplicável antes de considerar a nota correta.',
   partners:'Contábil, Tecnologia, Legalização'
  },
  {
   id:'contabil',name:'Contábil',short:'Contábil',nature:'Impacto direto e operacional',module:'05',
   lead:'A escrituração precisa representar corretamente débitos, créditos e saldos de IBS/CBS, sem confundir imposto destacado, crédito admitido, recolhimento e custo econômico.',
   tasks:['Revisar o plano de contas e a política de lançamentos para os novos tributos conforme a operação.','Conciliar documentos, fiscal, contas a receber/pagar, extratos bancários e créditos tributários recuperáveis.','Reavaliar custos, margens, estoques e demonstrações quando houver impactos materiais, mantendo documentação de suporte.'],
   watch:'Crédito contábil ou fiscal não surge automaticamente de toda despesa. O reconhecimento depende dos requisitos legais e da documentação.',
   example:'A nota de compra contém IBS/CBS, mas a Contabilidade só registra crédito recuperável após avaliar o tratamento fiscal e conciliar com a escrituração.',
   partners:'Fiscal, Financeiro, Compras'
  },
  {
   id:'legalizacao',name:'Legalização',short:'Legalização',nature:'Impacto cadastral e de enquadramento',module:'11',
   lead:'O setor de Legalização precisa acompanhar enquadramento tributário, atividade real, cadastros e opções formais dos clientes, especialmente no Simples Nacional.',
   tasks:['Conferir objeto social, CNAE, inscrições e dados da atividade; corrigir somente quando houver divergência real.','Controlar as opções pelo Simples Nacional e pelo regime regular de IBS/CBS, inclusive seus prazos e efeitos.','Alinhar alterações societárias, estabelecimentos, domicílio e atividades com os responsáveis Fiscal e Jurídico.'],
   watch:'A Reforma não exige alteração automática de CNAE, contrato social ou CNPJ de todas as empresas. Os prazos do Simples são específicos e podem mudar por ato posterior.',
   example:'Antes de fazer uma opção de IBS/CBS para cliente do Simples, Legalização confirma enquadramento, pendências, decisão formal e prazo; Fiscal simula o impacto.',
   partners:'Fiscal, Jurídico, Atendimento'
  },
  {
   id:'dp',name:'RH / Departamento Pessoal',short:'RH / DP',nature:'Impacto predominantemente indireto',module:'16',
   lead:'IBS/CBS reformam a tributação do consumo. Não substituem automaticamente INSS, FGTS, IRRF sobre a folha nem as obrigações do eSocial; RH e DP sofrem efeitos sobretudo nas compras, contratos e benefícios.',
   tasks:['Revisar contratos de benefícios e serviços terceirizados com Compras, Financeiro e Fiscal.','Mapear custos de vale-alimentação/refeição, transporte, plano de saúde, softwares e serviços de pessoal, sem pressupor crédito integral.','Capacitar a equipe e orientar clientes sobre o que mudou no consumo e o que permanece nas rotinas trabalhistas e previdenciárias.'],
   watch:'Evitar prometer redução de encargos da folha pela implantação de IBS/CBS. A incidência e o crédito de cada benefício dependem de regras próprias.',
   example:'Ao renovar o contrato de alimentação dos colaboradores, RH negocia as condições; Fiscal verifica o tratamento de IBS/CBS e Financeiro avalia o custo efetivo.',
   partners:'Fiscal, Compras, Financeiro'
  },
  {
   id:'financeiro',name:'Financeiro',short:'Financeiro',nature:'Impacto direto e de fluxo de caixa',module:'15',
   lead:'Recebimentos, pagamentos, capital de giro e conciliações podem mudar conforme o recolhimento dos novos tributos e a implantação do split payment nas operações alcançadas.',
   tasks:['Projetar fluxo de caixa por ano da transição e cenário de recolhimento, incluindo créditos e recuperações possíveis.','Conferir documentos fiscais, liquidação bancária, adquirentes de cartão e valores eventualmente segregados.','Revisar orçamento, prazos de recebimento, devoluções, adiantamentos e contratos financeiros com o Fiscal.'],
   watch:'Split payment não significa retenção universal imediata em todos os meios de pagamento; depende da implementação e das operações abrangidas.',
   example:'A tesouraria compara o valor da venda com o valor efetivamente recebido e investiga segregações, taxas de adquirência, estornos e diferenças.',
   partners:'Fiscal, Contábil, Tecnologia'
  },
  {
   id:'comercial',name:'Comercial e Compras',short:'Comercial / Compras',nature:'Impacto em preços e competitividade',module:'13',
   lead:'A Reforma pode alterar o custo efetivo de fornecedores, a formação do preço e a negociação com clientes — em especial nas operações entre empresas com diferentes regimes.',
   tasks:['Comparar propostas pelo custo líquido, considerando créditos permitidos, logística e tributação aplicável ao comprador.','Atualizar preços e contratos com cenários por ano, segmento, destino e regime tributário.','Preparar comunicação clara para clientes sobre o novo modelo sem prometer repasse ou crédito automático.'],
   watch:'Fornecedor do Simples padrão não transmite automaticamente crédito cheio de IBS/CBS; o regime regular depende de opção e de condições legais.',
   example:'Dois fornecedores cobram preços semelhantes, mas o custo final para o comprador pode divergir conforme créditos admissíveis e condições de aquisição.',
   partners:'Fiscal, Financeiro, Jurídico'
  },
  {
   id:'tecnologia',name:'Tecnologia e Cadastros',short:'Tecnologia / ERP',nature:'Impacto técnico e de integração',module:'14',
   lead:'Sistemas emissores, ERP, cadastro de produtos/serviços e integrações devem acompanhar novos campos e versões de leiautes de documentos fiscais.',
   tasks:['Homologar emissão e recepção em ambiente correto, versionando as notas técnicas e testando cenários reais.','Revisar cadastro de NCM/NBS, CST, cClassTrib, município de consumo e regras por operação.','Criar trilha de auditoria, alerta de rejeições, monitoramento de integração e plano de contingência.'],
   watch:'Publicação de nota técnica e liberação em ambiente de testes não equivalem à obrigatoriedade em produção.',
   example:'Antes da atualização da NFS-e, o time testa emissão, cancelamento, eventos e classificação junto ao Fiscal e documenta os resultados.',
   partners:'Fiscal, Atendimento, Contábil'
  },
  {
   id:'gestao',name:'Jurídico e Gestão',short:'Jurídico / Gestão',nature:'Impacto contratual e estratégico',module:'16',
   lead:'A liderança e o Jurídico precisam orientar os clientes na revisão de contratos, políticas internas, riscos, planejamento e comunicação das mudanças legais.',
   tasks:['Identificar contratos longos que precisem de revisão de cláusulas tributárias, preço, local de operação e reequilíbrio.','Criar responsáveis, prazos e matriz de riscos por cliente; separar obrigação legal de recomendação gerencial.','Organizar treinamento e orientações com data, fonte oficial, premissas e aprovação do cliente.'],
   watch:'A Reforma não altera automaticamente todos os contratos. Mudanças contratuais exigem análise da operação, das cláusulas e da lei aplicável.',
   example:'Um contrato de prestação continuada é analisado por Jurídico, Fiscal e Financeiro antes de qualquer renegociação do preço.',
   partners:'Direção, Fiscal, Comercial'
  }
 ];
 const sourceUrl='https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria-do-consumo/orientacoes-da-reforma-tributaria';
 let active='fiscal';
 const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
 function selectImpactArea(id,focusTab){
  const area=areas.find(a=>a.id===id);
  if(!area)return;
  active=id;
  const tabs=document.getElementById('impactAreaTabs');
  const panel=document.getElementById('impactAreaPanel');
  if(!tabs||!panel)return;
  tabs.querySelectorAll('button[data-impact]').forEach(btn=>{
   const chosen=btn.dataset.impact===id;
   btn.classList.toggle('is-active',chosen);
   btn.setAttribute('aria-selected',String(chosen));
   btn.tabIndex=chosen?0:-1;
   if(chosen&&focusTab)btn.focus({preventScroll:true});
  });
  panel.setAttribute('aria-labelledby','impact-tab-'+id);
  panel.innerHTML='<div class="impact-detail-head"><div><span class="impact-nature">'+esc(area.nature)+'</span><h4>'+esc(area.name)+'</h4><p>'+esc(area.lead)+'</p></div></div>'+
   '<div class="impact-detail-grid"><div><h5>O que preparar agora</h5><ol>'+area.tasks.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol></div>'+
   '<div class="impact-side"><div><h5>Atenção</h5><p>'+esc(area.watch)+'</p></div><div><h5>Exemplo no escritório</h5><p>'+esc(area.example)+'</p></div><p class="impact-partners">Integra com: '+esc(area.partners)+'</p></div></div>'+
   '<div class="impact-actions"><button type="button" data-impact-module="'+esc(area.module)+'">Abrir módulo relacionado <span aria-hidden="true">→</span></button><a href="'+sourceUrl+'" target="_blank" rel="noopener noreferrer">Cronograma oficial</a></div>';
 }
 function render(){
  const tabs=document.getElementById('impactAreaTabs');
  if(!tabs)return;
  tabs.innerHTML=areas.map(a=>'<button type="button" role="tab" id="impact-tab-'+a.id+'" data-impact="'+a.id+'" aria-controls="impactAreaPanel" aria-selected="false" tabindex="-1">'+esc(a.short)+'</button>').join('');
  tabs.addEventListener('click',e=>{
   const btn=e.target.closest('button[data-impact]');if(btn)selectImpactArea(btn.dataset.impact,false);
  });
  tabs.addEventListener('keydown',e=>{
   if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
   const cur=areas.findIndex(a=>a.id===active);
   let next=cur;
   if(e.key==='ArrowRight')next=(cur+1)%areas.length;
   if(e.key==='ArrowLeft')next=(cur-1+areas.length)%areas.length;
   if(e.key==='Home')next=0;
   if(e.key==='End')next=areas.length-1;
   e.preventDefault();
   selectImpactArea(areas[next].id,true);
  });
  document.getElementById('impactAreaPanel').addEventListener('click',e=>{
   const btn=e.target.closest('[data-impact-module]');
   if(btn&&typeof window.openModule==='function')window.openModule(btn.dataset.impactModule);
  });
  selectImpactArea(active,false);
 }
 window.openDepartmentImpacts=function(){
  if(typeof window.go==='function')window.go('modules',{scroll:false});
  requestAnimationFrame(()=>document.getElementById('departmentImpact')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
