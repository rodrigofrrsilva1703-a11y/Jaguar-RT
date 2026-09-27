const STUDY_MODULES = [
{
 id:"01", title:"Mapa completo da Reforma", subtitle:"Entenda primeiro o desenho geral antes de entrar nos cálculos.",
 intro:"A Reforma Tributária do consumo troca uma arquitetura fragmentada por um IVA dual: CBS, de competência federal, e IBS, compartilhado por Estados, Municípios e Distrito Federal. O Imposto Seletivo é um tributo separado. A melhor forma de estudar é sempre responder cinco perguntas: o que é tributado, quando nasce o tributo, qual é a base, onde a operação é tributada e qual alíquota se aplica.",
 before:"Hoje convivem PIS/Pasep, Cofins, IPI, ICMS e ISS, cada um com bases, créditos, competências e regras próprias.",
 after:"A nova arquitetura concentra a tributação geral do consumo em CBS + IBS, com transição gradual até 2033 e manutenção de tratamentos diferenciados e regimes específicos.",
 blocks:[
  {t:"1. O que é tributado?",k:"REGRA OFICIAL",x:"IBS e CBS incidem, como regra, sobre operações onerosas com bens e serviços. A LC 214 trata bens de forma ampla, incluindo materiais, imateriais e direitos, e enquadra como serviços as demais operações que não sejam bens."},
  {t:"2. Quando nasce?",k:"REGRA OFICIAL",x:"A regra geral é o momento do fornecimento. Se houver pagamento antes do fornecimento, surgem antecipações sobre a parcela paga. O RTAV resume isso didaticamente como “pagamento/recebimento ou fornecimento: o que vier primeiro produz efeito tributário”."},
  {t:"3. Sobre qual base?",k:"REGRA OFICIAL",x:"A base geral é o valor da operação. IBS e CBS não integram a própria base. Por isso o material chama a nova lógica de tributação “por fora” ou de base limpa."},
  {t:"4. Para qual lugar?",k:"REGRA OFICIAL",x:"O sistema segue o princípio do destino, mas não existe uma única regra de endereço para tudo. A LC 214 define o local conforme a natureza da operação: entrega do bem, local do imóvel, local da prestação presencial, início do transporte, domicílio principal do adquirente em hipóteses residuais etc."},
  {t:"5. Quanto?",k:"ATENÇÃO",x:"A alíquota da operação resulta da CBS e das parcelas estadual/municipal do IBS aplicáveis. Porém, a alíquota-padrão geral futura não deve ser tratada como “28% fixos”. Os percentuais próximos de 26,5% a 28% usados no RTAV são estimativas/referências para simulação, não uma alíquota universal já definida para todas as operações."}
 ],
 qa:[
  ["A Reforma cria um único imposto?","Não. A tributação geral do consumo passa a usar principalmente dois tributos coordenados: CBS (federal) e IBS (Estados/Municípios/DF), além do Imposto Seletivo em hipóteses próprias."],
  ["Indústria, comércio e serviços pagarão exatamente a mesma coisa?","Não necessariamente. A arquitetura é comum, mas reduções, regimes específicos, destino, créditos, alíquotas dos entes e enquadramento da operação podem produzir cargas diferentes."]
 ],
 legal:"LC 214/2025, arts. 1º a 4º; material RTAV e Material de Estudo de 26/09/2026."
},
{
 id:"02", title:"Fato gerador e pagamentos antecipados", subtitle:"A diferença entre fornecimento, sinal, competência e split payment.",
 intro:"Este é um dos pontos em que o material do RTAV pode confundir se a frase-resumo for lida isoladamente. A lei usa o fornecimento como regra geral; o pagamento antecipado, porém, gera antecipação de IBS/CBS sobre a parcela paga.",
 before:"No exemplo didático do evento, ISS acompanha a prestação do serviço; ICMS acompanha a saída/circulação da mercadoria; PIS/Cofins se relacionam às regras de receita do regime aplicável.",
 after:"No IBS/CBS, a regra geral é o fornecimento. Se houver pagamento total ou parcial antes, a parcela antecipada gera antecipação tributária na data do pagamento, com ajuste definitivo no fornecimento.",
 blocks:[
  {t:"A frase do RTAV",k:"RTAV",x:"“Recebimento/pagamento ou fornecimento — o que acontecer primeiro.” Use essa frase como memória operacional, não como substituição da redação legal."},
  {t:"O que a lei efetivamente faz",k:"REGRA OFICIAL",x:"No pagamento anterior ao fornecimento, a base da antecipação é o valor de cada parcela paga. No fornecimento, calcula-se o valor definitivo sobre a operação inteira e ajusta-se o que já foi antecipado."},
  {t:"Exemplo 28/01 → 10/02",k:"EXEMPLO RTAV",x:"Pedido em 28/01, sinal de 10% e entrega em 10/02: o sinal produz antecipação de IBS/CBS sobre 10%. Na entrega, a operação é calculada definitivamente e os 90% restantes completam o tratamento tributário."},
  {t:"Impacto no caixa",k:"NA PRÁTICA",x:"Empresas que recebem sinal, adiantamento ou parcelas antes de entregar precisam integrar financeiro, faturamento e fiscal. O tributo pode aparecer antes da entrega física ou da conclusão do serviço."},
  {t:"Isso é split payment?",k:"RESPOSTA DIRETA",x:"Não. Fato gerador e antecipação respondem quando nasce/exige-se o tributo. Split payment é uma forma de segregação e recolhimento do IBS/CBS na liquidação financeira."}
 ],
 qa:[
  ["Se eu receber um sinal antes de entregar, posso ignorar até a nota final?","Não na lógica do IBS/CBS. O pagamento anterior ao fornecimento pode gerar antecipação tributária sobre a parcela paga, observadas as regras do documento fiscal e da apuração."],
  ["O pagamento sempre vira o fato gerador principal?","Não. A regra geral continua sendo o fornecimento; o pagamento antecipado cria antecipação. Em operações continuadas/fracionadas existem regras específicas."]
 ],
 legal:"LC 214/2025, art. 10, especialmente §4º; RTAV; Material de Estudo, págs. 1–3."
},
{
 id:"03", title:"Base de cálculo: por dentro × por fora", subtitle:"A lógica que muda a formação do preço.",
 intro:"Não basta trocar a alíquota. O método de cálculo também muda. O material chama isso de sair de uma cultura de tributo embutido para uma base mais limpa.",
 before:"Nos exemplos do RTAV, ICMS e ISS são tratados na formação do preço como tributos “por dentro”; PIS/Cofins também aparecem embutidos nos preços dos cenários atuais.",
 after:"Na regra geral, a base de IBS/CBS é o valor da operação e o próprio IBS/CBS não integra essa base. É a lógica de cálculo “por fora”.",
 blocks:[
  {t:"Fórmula por dentro",k:"FÓRMULA",x:"Preço bruto = preço líquido ÷ (1 − alíquota por dentro). Exemplo didático: líquido de R$ 800 e carga atual de 8,65% → R$ 800 ÷ 0,9135 = R$ 875,75."},
  {t:"Fórmula por fora",k:"FÓRMULA",x:"Preço com tributo por fora = base limpa × (1 + alíquota). Exemplo RTAV: R$ 800 × 1,2791 = R$ 1.023,28 usando 27,91% apenas como parâmetro estimado do exercício."},
  {t:"Transição",k:"TRANSIÇÃO",x:"Durante vários anos haverá convivência entre tributos antigos remanescentes e CBS/IBS. Por isso a reprecificação do evento segue a memória: primeiro limpe o preço, depois aplique o novo e, por último, embuta o velho que ainda restar."},
  {t:"Cuidado com “27,91%”",k:"ESTIMATIVA",x:"Esse percentual aparece no material para ensinar cálculo. A ferramenta do site deixa CBS e IBS editáveis justamente porque a alíquota aplicável depende do ano, da operação, de reduções, do destino e das alíquotas efetivamente fixadas."}
 ],
 qa:[
  ["Posso simplesmente pegar o preço de hoje e somar CBS/IBS?","Não é o método usado no RTAV. Isso pode criar efeito cascata porque o preço atual já contém tributos. Primeiro identifica-se o preço líquido-alvo."],
  ["IBS e CBS entram na própria base?","Não na regra geral. O montante de IBS e CBS incidente na operação não integra a própria base."],
 ],
 legal:"LC 214/2025, art. 12; Material de Estudo, págs. 3–4 e 8–9."
},
{
 id:"04", title:"Destino e alíquotas", subtitle:"Quem recebe o IBS e por que o endereço importa.",
 intro:"O princípio do destino é central, mas precisa ser aplicado com técnica. Dizer apenas “é o endereço do comprador” é simplificação excessiva.",
 before:"ICMS e ISS atuais usam diversas regras de origem, destino, local do estabelecimento, local da prestação, DIFAL e exceções.",
 after:"O IBS segue regras de destino definidas na LC 214. O local pode ser a entrega do bem, o imóvel, o local do serviço presencial, o início do transporte ou, em situações residuais, o domicílio principal do adquirente/destinatário.",
 blocks:[
  {t:"Bem móvel material",k:"REGRA OFICIAL",x:"Como regra do art. 11, considera-se o local da entrega ou disponibilização ao destinatário, com regras próprias para operações não presenciais."},
  {t:"Serviço presencial",k:"REGRA OFICIAL",x:"Serviço prestado fisicamente sobre pessoa ou fruído presencialmente segue o local da prestação. Eventos têm regra do local do evento."},
  {t:"Demais bens/serviços",k:"REGRA OFICIAL",x:"Para operações onerosas não enquadradas nas regras específicas, utiliza-se o domicílio principal do adquirente no País, com detalhamento cadastral próprio."},
  {t:"São Paulo → Guarulhos / Santo André",k:"RTAV",x:"O exemplo serve para mostrar que a parcela municipal do IBS pode variar conforme o destino definido legalmente. Não use o exemplo para concluir que toda operação se resolve apenas pelo endereço de cobrança."},
  {t:"Alíquota futura",k:"ATENÇÃO",x:"Cada ente fixará sua alíquota conforme a legislação. As alíquotas de referência são fixadas nos períodos previstos em lei. Em setembro de 2026, a alíquota-padrão geral de CBS de 2027 ainda não deve ser tratada como 9% oficial."}
 ],
 qa:[
  ["A cidade onde a empresa está deixa de importar totalmente?","Para o IBS, a arrecadação segue o destino da operação conforme as regras legais. A localização da empresa continua importante para logística, custos, mão de obra, licenças e outros tributos."],
  ["A mesma empresa pode ter IBS diferente conforme o cliente?","Sim, quando as alíquotas do destino aplicável forem diferentes. Por isso cadastro de endereço/destino e natureza da operação passam a ser críticos."]
 ],
 legal:"LC 214/2025, arts. 11, 14 a 16; RTAV."
},
{
 id:"05", title:"Transição 2026–2033", subtitle:"O calendário sem misturar taxa-teste, estimativa e alíquota definitiva.",
 intro:"Este módulo separa o que já está fixado em lei do que ainda será definido. Essa distinção é essencial para a ferramenta de preços.",
 before:"Até 2025, o sistema-base continua com PIS/Cofins, IPI, ICMS e ISS.",
 after:"A mudança ocorre em etapas: teste em 2026, CBS e IBS inicial em 2027–2028, redução gradual de ICMS/ISS entre 2029 e 2032 e vigência integral do novo modelo em 2033.",
 blocks:[
  {t:"2026",k:"OFICIAL",x:"CBS 0,9% e IBS 0,1% como alíquotas de teste, com compensação/dispensa nos termos legais e sem aplicação geral aos optantes do Simples Nacional."},
  {t:"2027–2028",k:"OFICIAL",x:"PIS/Cofins são extintos. IBS é 0,1% (0,05% estadual + 0,05% municipal). A CBS corresponde à alíquota de referência que vier a ser fixada, reduzida em 0,1 ponto percentual. O Imposto Seletivo entra em vigor; o IPI é reduzido a zero em grande parte das hipóteses, preservadas exceções legais."},
  {t:"2029",k:"OFICIAL",x:"ICMS/ISS ficam em 90% das alíquotas atuais e o IBS entra na proporção de transição prevista para o ano."},
  {t:"2030",k:"OFICIAL",x:"ICMS/ISS a 80%."},
  {t:"2031",k:"OFICIAL",x:"ICMS/ISS a 70%."},
  {t:"2032",k:"OFICIAL",x:"ICMS/ISS a 60%."},
  {t:"2033",k:"OFICIAL",x:"Conclusão da transição principal: ICMS e ISS são extintos e o novo modelo entra em vigência integral."},
  {t:"E os 9% de CBS do RTAV?",k:"ESTIMATIVA",x:"Use como premissa de simulação do evento, não como alíquota-padrão oficial já publicada. Na calculadora do site ela aparece identificada como estimativa e pode ser alterada."}
 ],
 qa:[
  ["Posso fazer preço de 2027 usando 9% como número definitivo?","Não. Você pode simular com 9% porque foi a premissa do RTAV, mas deve marcar como estimativa até a fixação oficial aplicável."],
  ["O 90/10 de 2029 significa que o IBS será exatamente 10%?","Não. Significa proporção de transição entre o sistema antigo e o IBS, não uma alíquota nominal universal de 10%."],
 ],
 legal:"LC 214/2025, arts. 343–349; EC 132/2023; Receita Federal — Entenda a RTC."
},
{
 id:"06", title:"Créditos e custo efetivo", subtitle:"Preço pago não é a mesma coisa que custo.",
 intro:"Uma das mensagens mais importantes do evento é olhar a cadeia. Para um comprador com direito a crédito, o que importa não é apenas o preço da nota, mas o custo depois dos créditos aproveitáveis.",
 before:"Hoje os créditos variam muito conforme ICMS, IPI, PIS/Cofins, regime e natureza da aquisição.",
 after:"No regime regular de IBS/CBS, a não cumulatividade é ampla, mas não é correto resumir como “todo imposto destacado vira crédito automaticamente”. A lei condiciona a apropriação ao documento fiscal idôneo e às regras de extinção do débito, com exceções específicas.",
 blocks:[
  {t:"Regra geral de crédito",k:"REGRA OFICIAL",x:"Contribuinte no regime regular pode apropriar créditos quando os débitos da operação antecedente forem extintos nas formas previstas em lei, com documento fiscal eletrônico idôneo, ressalvadas vedações e regras específicas."},
  {t:"Simples como fornecedor",k:"REGRA OFICIAL",x:"Se o fornecedor estiver no Simples e não optar pelo regime regular de IBS/CBS, o adquirente no regime regular pode ter crédito limitado ao IBS/CBS efetivamente devido via Simples, conforme a lei."},
  {t:"Custo efetivo",k:"FÓRMULA",x:"Custo efetivo = preço pago − créditos tributários aproveitáveis. O RTAV usa essa conta para mostrar que uma compra pode ficar mais barata mesmo com preço de nota maior."},
  {t:"Exemplo RTAV",k:"EXEMPLO",x:"Preço projetado R$ 104,15 e crédito CBS de R$ 7,05 → custo efetivo R$ 97,10. É um exemplo didático que desconsidera outros créditos para isolar o raciocínio."},
  {t:"O ponto comercial",k:"NA PRÁTICA",x:"Fornecedor e cliente precisam olhar juntos: preço de venda, crédito gerado para o comprador, custo efetivo, margem e poder de negociação."}
 ],
 qa:[
  ["Se a nota mostrar CBS/IBS, o comprador sempre se credita?","Não. É preciso verificar se o adquirente está no regime que permite crédito, se a operação é elegível e se os requisitos legais foram cumpridos."],
  ["Empresa do Simples nunca gera crédito ao cliente?","Essa frase também é simplificação. A lei admite crédito ao adquirente no regime regular em montante ligado ao IBS/CBS devido pelo fornecedor no Simples; se o optante escolher regime regular de IBS/CBS, a dinâmica muda."],
 ],
 legal:"LC 214/2025, arts. 47–57; RTAV e Material de Estudo, pág. 10."
},
{
 id:"07", title:"Reprecificação, DRE e negociação", subtitle:"Primeiro o novo, depois o velho.",
 intro:"A ferramenta de preço do site segue o método do material: preservar um alvo econômico, e não simplesmente somar percentuais.",
 before:"Preço atual já carrega tributos e custos. Aplicar uma nova alíquota diretamente sobre ele pode duplicar carga na simulação.",
 after:"A projeção limpa o preço atual, aplica CBS/IBS por fora e depois trata ICMS/ISS remanescentes durante a transição.",
 blocks:[
  {t:"Etapa 1 — limpar",k:"MÉTODO RTAV",x:"Preço líquido-alvo = preço atual − tributos atuais sobre a venda usados no cenário. É esse líquido que você decide preservar."},
  {t:"Etapa 2 — aplicar CBS + IBS",k:"MÉTODO RTAV",x:"Preço intermediário = preço líquido × (1 + CBS + IBS aplicáveis à operação)."},
  {t:"Etapa 3 — tributo antigo remanescente",k:"MÉTODO RTAV",x:"Preço projetado = preço intermediário ÷ (1 − percentual remanescente de ICMS/ISS embutido no cenário)."},
  {t:"Exemplo comércio R$ 100",k:"RTAV",x:"PIS 0,65 + Cofins 3 + ICMS 18 → líquido R$ 78,35. Com CBS de 9% como premissa do evento: R$ 85,40. Embutindo ICMS 18% no exemplo de 2027: aproximadamente R$ 104,15."},
  {t:"Três estratégias",k:"MATERIAL DE ESTUDO",x:"1) manter preço bruto; 2) manter receita líquida; 3) manter margem considerando custos e créditos. A decisão comercial pertence à empresa; a contabilidade entrega os números."},
  {t:"Banda de negociação",k:"EXEMPLO RTAV",x:"O material mostra um caso em que +1,27% preservava margem considerando créditos e +3,61% preservava receita líquida. Isso é resultado daquele caso, não faixa universal."}
 ],
 qa:[
  ["A reforma sempre aumenta preço?","Não. Dependendo do setor, crédito, carga atual, destino e estratégia, o preço que preserva o mesmo líquido pode subir, cair ou ficar próximo do atual."],
  ["Qual preço é o “correto”?","Não existe um único preço automático. O contador pode calcular o preço que preserva receita líquida e o preço que preserva margem; o empresário escolhe a estratégia comercial."],
 ],
 legal:"Método RTAV e Material de Estudo, págs. 8–11. As alíquotas da ferramenta são premissas editáveis."
},
{
 id:"08", title:"Simples Nacional em 2027", subtitle:"Puro, híbrido, crédito e decisão comercial.",
 intro:"O Simples Nacional continua existindo. A grande novidade é a possibilidade de a empresa permanecer no Simples para os demais tributos e escolher o regime regular para IBS/CBS.",
 before:"O DAS concentra os tributos do Simples e a alíquota efetiva depende de RBT12, faixa, alíquota nominal e parcela a deduzir.",
 after:"CBS e IBS passam a integrar o Simples, mas o optante pode, nos prazos regulamentados, escolher recolher IBS/CBS pelo regime regular fora do DAS.",
 blocks:[
  {t:"Simples “puro”",k:"REGRA OFICIAL",x:"A empresa mantém CBS/IBS dentro do recolhimento unificado do Simples. Para o primeiro semestre de 2027, se não houver opção pelo regime regular, essa é a sistemática aplicável."},
  {t:"Simples “híbrido”",k:"REGRA OFICIAL",x:"A empresa continua no Simples para os demais tributos, mas CBS e IBS são apurados no regime regular, fora da guia única."},
  {t:"Prazo 2027",k:"ATUALIZAÇÃO 2026",x:"Para o primeiro semestre de 2027, a Receita abriu a escolha em setembro de 2026. Há nova janela em março de 2027 para efeitos no segundo semestre."},
  {t:"Por que isso importa no B2B?",k:"NA PRÁTICA",x:"Crédito do cliente, preço, fluxo de caixa e competitividade podem mudar. O híbrido não é automaticamente melhor: precisa simular tributo próprio e efeito comercial na cadeia."},
  {t:"Alíquota efetiva do DAS",k:"FÓRMULA",x:"[(RBT12 × alíquota nominal) − parcela a deduzir] ÷ RBT12. O material usa RBT12 de R$ 1 milhão, nominal 16% e PD R$ 35.640, resultando em 12,436%."}
 ],
 qa:[
  ["O Simples acaba com a reforma?","Não."],
  ["Escolher IBS/CBS por fora tira a empresa do Simples?","Não. Ela pode permanecer no Simples para os demais tributos e apurar IBS/CBS no regime regular, conforme a opção permitida."],
  ["O híbrido sempre é melhor para quem vende a empresas?","Não. Pode melhorar o crédito do cliente, mas a decisão depende de carga própria, margem, compras, clientes, caixa e preço."],
 ],
 legal:"Receita Federal/CGSN, Resoluções de 2026; LC 214/2025; RTAV."
},
{
 id:"09", title:"Lucro Presumido × Lucro Real e LC 224", subtitle:"O Presumido não acaba: a comparação muda.",
 intro:"O material do evento enfatiza que a extinção de PIS/Cofins reduz uma diferença importante entre Presumido e Real na tributação do consumo. Isso não significa fim do Lucro Presumido nem que a escolha passa a depender de uma única conta.",
 before:"No Presumido, IRPJ/CSLL partem de percentuais legais de presunção; no Real, partem do lucro contábil ajustado. PIS/Cofins também diferem hoje entre os regimes.",
 after:"Com CBS/IBS, a análise deve separar tributação do consumo de IRPJ/CSLL. Margem efetiva, adicionais de IRPJ, despesas dedutíveis, créditos, sazonalidade e compliance continuam relevantes.",
 blocks:[
  {t:"LC 224 — o que mudou",k:"REGRA OFICIAL",x:"Nos regimes com base presumida, a LC 224 elevou em 10% os percentuais de presunção. No Lucro Presumido, esse acréscimo incide apenas sobre a parcela da receita bruta total que exceder R$ 5 milhões no ano-calendário, com regras de proporcionalidade."},
  {t:"32% não vira 42%",k:"RESPOSTA DIRETA",x:"32% × 1,10 = 35,2%. É aumento de 10% do percentual de presunção, não acréscimo de 10 pontos percentuais."},
  {t:"Exemplo R$ 10 milhões",k:"EXEMPLO",x:"R$ 5 mi × 32% = R$ 1,6 mi; excedente de R$ 5 mi × 35,2% = R$ 1,76 mi. Base simulada total: R$ 3,36 mi antes de calcular IRPJ/CSLL e adicional."},
  {t:"Real x Presumido",k:"MÉTODO",x:"Compare a DRE completa. O exemplo do material com receita de R$ 200 mil e lucro efetivo de 20% mostra uma base efetiva menor no Real do que a presunção de 32%, mas o exercício simplificado ignora o adicional de IRPJ e outras particularidades."},
  {t:"Não existe vencedor universal",k:"ATENÇÃO",x:"O RTAV aponta tendência de migração em certos perfis, mas isso é análise do palestrante. O regime deve ser decidido com dados reais da empresa."}
 ],
 qa:[
  ["Lucro Presumido vai acabar em 2027?","Não. O regime continua existindo. O que muda é o ambiente econômico e tributário usado para comparar Presumido e Real."],
  ["Se a margem real for menor que 32%, o Real sempre vence?","Não automaticamente. É um sinal importante para a base de IRPJ/CSLL, mas a decisão final exige adicional de IRPJ, adições/exclusões, benefícios, despesas, sazonalidade e custo operacional do regime."],
 ],
 legal:"LC 224/2025; RTAV e Material de Estudo, págs. 7–8."
},
{
 id:"10", title:"Reduções e regimes específicos", subtitle:"30%, 60%, zero e setores que não seguem a regra-padrão.",
 intro:"Nem toda operação usa a alíquota-padrão. A LC 214 contém regimes diferenciados e específicos. É essencial distinguir redução de alíquota de um regime que muda base, crédito ou forma de cálculo.",
 before:"Benefícios e tratamentos especiais estão espalhados entre vários tributos atuais.",
 after:"A nova legislação organiza reduções e regimes próprios dentro da estrutura de IBS/CBS, mas exige conferir atividade, operação, listas e requisitos legais.",
 blocks:[
  {t:"Redução de 30%",k:"REGRA OFICIAL",x:"Aplica-se a serviços de determinadas profissões intelectuais fiscalizadas por conselho profissional, observados os requisitos legais. Contabilistas estão entre as categorias previstas."},
  {t:"Redução de 60%",k:"REGRA OFICIAL",x:"Há hipóteses para educação, saúde, medicamentos, alimentos, agro, cultura e outros grupos definidos em lei e anexos."},
  {t:"Redução a zero",k:"REGRA OFICIAL",x:"Existem hipóteses de alíquota zero, como determinados medicamentos, produtos de saúde menstrual, hortícolas, frutas e ovos, entre outras previstas em lei."},
  {t:"Bares e restaurantes",k:"REGIME ESPECÍFICO",x:"O regime específico reduz as alíquotas em 40% para as operações enquadradas e veda crédito ao adquirente sobre alimentação/bebidas sujeitas a esse regime. A base também possui exclusões próprias em determinadas situações."},
  {t:"Hotelaria e parques",k:"REGIME ESPECÍFICO",x:"Também há redução de 40% nas alíquotas dentro do regime específico, com regras próprias de documento e crédito."},
  {t:"Fórmula de redução",k:"FÓRMULA",x:"Alíquota após redução = alíquota-padrão × (1 − redução). Ex.: estimativa de 28% com redução de 60% → 11,2%. O 28% continua sendo apenas premissa do exemplo."}
 ],
 qa:[
  ["Ter CNAE de saúde garante redução de 60%?","Não por si só. É preciso conferir a operação, a classificação/lista aplicável e os requisitos da legislação."],
  ["Redução de 40% em restaurantes significa pagar 40%?","Não. Significa reduzir em 40% a alíquota aplicável ao regime. Se a alíquota-base hipotética fosse 28%, 28% × 60% = 16,8%."],
 ],
 legal:"LC 214/2025; regulamentos de 2026; RTAV."
},
{
 id:"11", title:"Recolhimento, split payment e apuração assistida", subtitle:"Quando nasce o tributo é diferente de como ele é pago.",
 intro:"O evento menciona split payment, recolhimento pelo adquirente e apuração assistida. Eles não devem ser misturados com fato gerador.",
 before:"Hoje grande parte da rotina contábil reconstrói a apuração a partir de documentos, escriturações, pagamentos e declarações separadas.",
 after:"A nova arquitetura integra documentos fiscais eletrônicos, extinção dos débitos e apuração assistida. O split payment pode segregar IBS/CBS na liquidação financeira em hipóteses regulamentadas.",
 blocks:[
  {t:"Split payment",k:"REGRA OFICIAL",x:"Na sistemática prevista em lei, a segregação e o recolhimento podem ocorrer na liquidação financeira da transação. A implementação é gradual e depende de atos conjuntos e infraestrutura."},
  {t:"Recolhimento pelo adquirente",k:"REGRA OFICIAL",x:"Em determinadas condições, contribuinte do regime regular pode recolher IBS/CBS da operação quando o instrumento de pagamento não permitir a segregação prevista para split."},
  {t:"Apuração assistida",k:"REGRA OFICIAL",x:"RFB e Comitê Gestor do IBS podem apresentar apuração assistida baseada em documentos fiscais eletrônicos, informações de extinção dos débitos e outros dados."},
  {t:"O novo papel do contador",k:"NA PRÁTICA",x:"Menos reconstrução manual e mais parametrização, conferência, exceção, cadastro, conciliação, projeção e consultoria."},
  {t:"Documentos",k:"ATENÇÃO",x:"Nota correta passa a impactar débito, crédito e apuração de forma ainda mais direta. Cadastro de produto/serviço, destino, regime e natureza da operação deixa de ser detalhe operacional."}
 ],
 qa:[
  ["Split payment muda o fato gerador?","Não. Ele é mecanismo de recolhimento. O fato gerador e as antecipações seguem as regras próprias do art. 10."],
  ["A apuração assistida significa que o contador não precisa conferir?","Não. A própria lei prevê confirmação e ajustes. A qualidade dos dados e a revisão continuam essenciais."],
 ],
 legal:"LC 214/2025, arts. 31–36 e 45–48; orientações RFB/CGIBS."
},
{
 id:"12", title:"Planejamento e conversa com o cliente", subtitle:"Transformar regra em decisão.",
 intro:"A mensagem central do material é consultiva: conhecimento técnico só gera valor quando vira preço, margem, regime, fluxo de caixa e decisão para o empresário.",
 before:"Planejamento tributário muitas vezes é apresentado apenas como comparação de guias e percentuais.",
 after:"Na transição, a análise precisa ligar venda, compra, créditos, DRE, preço, fornecedores, clientes, contratos, localização, sistemas e fluxo de caixa.",
 blocks:[
  {t:"Diagnóstico",k:"MÉTODO",x:"Mapeie regime atual, faturamento, margem, produtos/serviços, carga atual, principais clientes, fornecedores, crédito, destino e recebimentos antecipados."},
  {t:"Prognóstico",k:"MÉTODO",x:"Projete 2027, 2028, 2029… 2033. Mostre preço que preserva receita líquida, preço que preserva margem e impacto sobre o custo do cliente."},
  {t:"DRE lado a lado",k:"RTAV",x:"A apresentação recomendada pelo material é DRE atual ao lado da DRE projetada, linha por linha, com os limites de preço que preservam o resultado."},
  {t:"Perguntas para o cliente",k:"NA PRÁTICA",x:"Quem compra? O cliente toma crédito? Quem fornece? Há sinal antes da entrega? O contrato permite reajuste? O destino muda a alíquota? Existe redução/regime específico?"},
  {t:"Plano de ação",k:"ENTREGA",x:"Não termine em “vai aumentar X%”. Termine com ações: preço, contrato, fornecedor, regime, cadastro, ERP, caixa, cronograma e data da próxima revisão."}
 ],
 qa:[
  ["O objetivo é prever exatamente o imposto até 2033?","Não. Parte das alíquotas futuras ainda será fixada. O objetivo é construir cenários transparentes e atualizáveis, deixando claro o que é regra, estimativa e premissa."],
  ["Quando recalcular?","Sempre que houver publicação de alíquota, mudança de regime, mudança relevante de mix, destino, fornecedor, contrato ou margem. Na transição, revisão anual será indispensável."],
 ],
 legal:"RTAV; Material de Estudo; legislação e orientações oficiais atualizadas."
}
];

const TIMELINE = {
 "2026":{label:"Teste",text:"CBS 0,9% + IBS 0,1% como alíquotas-teste, com compensação/dispensa conforme as regras legais. Não confundir com a carga futura plena."},
 "2027":{label:"CBS entra",text:"PIS/Cofins extintos; IBS 0,1%; CBS pela alíquota de referência a ser fixada, reduzida em 0,1 p.p.; início do Imposto Seletivo e redução do IPI nas hipóteses legais."},
 "2028":{label:"Fase inicial",text:"Mantém a estrutura de 2027; IBS 0,1% e CBS conforme a alíquota aplicável ao ano."},
 "2029":{label:"90 / 10",text:"ICMS/ISS passam a 90% das alíquotas; IBS avança na transição. As alíquotas de referência aplicáveis são fixadas segundo a legislação."},
 "2030":{label:"80 / 20",text:"ICMS/ISS a 80%."},
 "2031":{label:"70 / 30",text:"ICMS/ISS a 70%."},
 "2032":{label:"60 / 40",text:"ICMS/ISS a 60%."},
 "2033":{label:"Novo modelo",text:"Conclusão da transição principal, com extinção de ICMS e ISS e vigência integral do novo modelo."}
};

const SOURCES = [
 ["LC 214/2025 — texto atualizado","https://www2.camara.leg.br/legin/fed/leicom/2025/leicomplementar-214-16-janeiro-2025-796905-normaatualizada-pl.html","Lei principal do IBS, CBS e Imposto Seletivo, já com alterações posteriores."],
 ["Receita Federal — Entenda a RTC","https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/entenda","Resumo oficial da transição 2026–2033."],
 ["Receita — Simples e IBS/CBS em 2027","https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/setembro/receita-federal-alerta-comeca-hoje-o-prazo-para-opcao-pelo-simples-nacional-e-para-a-escolha-do-modelo-de-recolhimento-do-ibs-e-da-cbs-em-2027/","Orientação atual sobre Simples puro/híbrido e prazos."],
 ["LC 224/2025","https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp224.htm","Alterações relevantes para percentuais de presunção, inclusive limite anual de R$ 5 milhões."],
 ["Receita — Orientações da Reforma","https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/orientacoes-da-reforma-tributaria","Documentos fiscais, cronogramas e orientações operacionais."],
 ["RTAV + Material de Estudo 26/09/2026","#","Base didática do treinamento: exemplos, método de reprecificação, DRE e casos práticos. Exemplos e estimativas são identificados no conteúdo."]
];

const PRACTICES = [
 {title:"Sinal antes da entrega",tag:"FATO GERADOR",question:"Pedido em 28/01, sinal de 10% e entrega em 10/02. O que muda?",answer:"No exemplo atual de ICMS da mercadoria, a saída ocorre em fevereiro. No IBS/CBS, o sinal anterior ao fornecimento gera antecipação sobre os 10%; no fornecimento ocorre o cálculo definitivo e o ajuste da operação."},
 {title:"Preço de R$ 100 — comércio",tag:"REPRECIFICAÇÃO",question:"PIS 0,65%, Cofins 3% e ICMS 18%. Como reproduzir o exemplo do RTAV com CBS estimada de 9%?",answer:"Líquido: 100 − 21,65 = 78,35. Novo por fora: 78,35 × 1,09 = 85,40. ICMS do cenário por dentro: 85,40 ÷ 0,82 ≈ 104,15. Os 9% são premissa do evento, não alíquota oficial definitiva."},
 {title:"Preço de R$ 100 — serviços",tag:"REPRECIFICAÇÃO",question:"ISS 5%, PIS 1,65%, Cofins 7,6% e CBS estimada 9%.",answer:"Líquido: 85,75. Com CBS estimada: 93,47. Embutindo ISS de 5% no cenário: 93,47 ÷ 0,95 ≈ R$ 98,39."},
 {title:"Custo efetivo",tag:"CRÉDITO",question:"Preço R$ 104,15 e crédito aproveitável R$ 7,05.",answer:"Custo efetivo = 104,15 − 7,05 = R$ 97,10."},
 {title:"LC 224",tag:"LUCRO PRESUMIDO",question:"Serviço com R$ 10 milhões de receita anual e presunção de 32%.",answer:"No exemplo simplificado: R$ 5 mi × 32% = R$ 1,6 mi; excedente de R$ 5 mi × 35,2% = R$ 1,76 mi; base presumida simulada R$ 3,36 mi, antes de IRPJ/CSLL e adicional."},
 {title:"Redução de 60%",tag:"ALÍQUOTAS",question:"Se a alíquota-padrão usada no cenário for 28%, qual seria a alíquota após redução de 60%?",answer:"28% × 40% = 11,2%. O 28% é apenas premissa do cenário."}
];