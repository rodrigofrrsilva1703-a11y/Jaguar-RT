// Perguntas autorais vinculadas aos 13 módulos. M: múltipla escolha; V: verdadeiro/falso.
const QUIZ_BANK = {
 '01': {
  m: [
   ['O que significa IVA dual na reforma?', ['CBS federal e IBS estadual/municipal','Dois impostos federais sobre renda','ICMS e ISS sem mudanças','Um único imposto municipal'], 0, 'A CBS pertence à União e o IBS reúne Estados e Municípios.'],
   ['Qual tributo possui finalidade extrafiscal sobre itens definidos em lei?', ['Imposto Seletivo','ITBI','IRPJ','IPTU'], 0, 'O Imposto Seletivo é separado da CBS e do IBS.'],
   ['Qual princípio busca reduzir distorções nas decisões econômicas?', ['Neutralidade','Anterioridade nonagesimal','Progressividade do IR','Territorialidade do ISS'], 0, 'A neutralidade orienta a estrutura do IBS e da CBS, com exceções legais.'],
   ['Como se relacionam CBS e IBS?', ['Tributos distintos com regras coordenadas','O IBS substitui a CBS','Ambos pertencem só à União','A CBS é municipal'], 0, 'A arquitetura é dual, com competências distintas.'],
   ['O que deve ser conferido antes de aplicar a alíquota de um exemplo?', ['Ano, operação, destino e regime','Somente o faturamento','Somente o CNPJ','A cor da nota fiscal'], 0, '9,21% e 18,70% são premissas didáticas do curso.']
  ],
  v: [
   ['A CBS é de competência federal.',true,'A CBS pertence à União.'],
   ['O IBS é exclusivamente municipal.',false,'O IBS reúne competências estaduais e municipais.'],
   ['O Imposto Seletivo é o mesmo tributo que o IBS.',false,'São tributos distintos.'],
   ['Neutralidade significa que nunca existirá qualquer exceção setorial.',false,'A Constituição e a lei preveem exceções.'],
   ['PIS/Cofins, ICMS e ISS têm regras próprias no sistema anterior.',true,'Essa fragmentação é parte da comparação do módulo.'],
   ['27,91% é alíquota universal definitiva para toda operação.',false,'É premissa didática; a alíquota aplicável varia.'],
   ['O IVA dual possui duas competências tributárias coordenadas.',true,'CBS federal e IBS compartilhado.'],
   ['Uma operação deve ser analisada sem considerar seu regime específico.',false,'Regimes e reduções podem alterar o resultado.'],
   ['O IBS substitui gradualmente ICMS e ISS na transição.',true,'A substituição ocorre por etapas.'],
   ['O Simples Nacional desaparece automaticamente com a reforma.',false,'O Simples permanece, com opção de regime regular para IBS/CBS.']
  ]
 },
 '02': {
  m: [
   ['No princípio do destino, qual local orienta a tributação?', ['O local definido para o consumo na operação','A sede do contador','Sempre a fábrica','O município de emissão do boleto'], 0, 'O art. 11 traz critérios específicos conforme a operação.'],
   ['Em bens imóveis, qual é a referência espacial?', ['Local do imóvel','Domicílio do vendedor','Local do banco','Local do servidor de emissão'], 0, 'A localização física do imóvel é central.'],
   ['No transporte de passageiros, qual critério é relevante?', ['Início da viagem','Fim da viagem em todos os casos','Sede da empresa','Endereço do veículo'], 0, 'O local de início da viagem orienta essa hipótese.'],
   ['Como se compõe o IBS na operação sujeita às alíquotas gerais?', ['Parcela estadual e parcela municipal do destino','Duas parcelas federais','Somente a parcela de origem','Apenas CBS'], 0, 'O IBS contempla as parcelas estadual e municipal.'],
   ['Por que o cadastro de destino importa?', ['Pode alterar o local e a alíquota aplicável','Define o IRPJ da empresa','Substitui a identificação do item','Elimina o documento fiscal'], 0, 'Dados incorretos do destinatário prejudicam o cálculo.']
  ],
  v: [
   ['O local da operação deve ser identificado conforme a natureza do fornecimento.',true,'Há critérios diferentes no art. 11.'],
   ['Todo serviço é tributado no município da sede do prestador.',false,'O critério varia conforme o tipo de serviço.'],
   ['A localização do imóvel é relevante para operações com imóveis.',true,'É uma regra espacial específica.'],
   ['O IBS pertence apenas ao Estado onde está a fábrica.',false,'A lógica geral é orientada pelo destino.'],
   ['O transporte de passageiros usa o início da viagem como critério.',true,'Essa é uma das hipóteses do art. 11.'],
   ['O destino pode exigir dados confiáveis do adquirente.',true,'O cadastro é essencial para a apuração.'],
   ['As alíquotas locais do IBS devem ser sempre idênticas em todo município.',false,'A composição depende das alíquotas aplicáveis ao destino.'],
   ['Bens móveis e imóveis seguem necessariamente o mesmo critério espacial.',false,'A lei diferencia as operações.'],
   ['O princípio do destino reduz incentivos à escolha artificial da origem.',true,'É parte da racionalidade econômica da reforma.'],
   ['O endereço do fornecedor sozinho resolve toda análise de destino.',false,'É preciso classificar o fornecimento e o adquirente.']
  ]
 },
 '03': {
  m: [
   ['Qual é o marco geral do fato gerador de IBS/CBS?', ['O fornecimento do bem ou serviço','A assinatura do contrato em todos os casos','O encerramento do exercício','A emissão da DRE'], 0, 'A regra geral se liga ao fornecimento.'],
   ['Como tratar um pagamento antecipado antes do fornecimento?', ['Apurar a antecipação prevista na lei e ajustar no fornecimento','Ignorar sempre o valor recebido','Tributar duas vezes sem ajuste','Registrar somente no ano seguinte'], 0, 'O ajuste final considera o que foi antecipado.'],
   ['Por que contratos continuados exigem atenção?', ['Fornecimento e pagamentos ocorrem em etapas','Nunca possuem fato gerador','Sempre são isentos','Não precisam de documento'], 0, 'A temporalidade depende da execução e das regras aplicáveis.'],
   ['Ao concluir operação com sinal já tributado, o que deve ser reconciliado?', ['Tributo total e antecipações','Somente o saldo bancário','A folha de pagamento','A alíquota de IRPJ'], 0, 'A antecipação compõe a apuração final.'],
   ['Qual evento não é necessariamente o mesmo que o fornecimento?', ['Assinatura do contrato','Entrega do bem','Disponibilização do serviço','Execução da prestação'], 0, 'Contratação e fornecimento podem ocorrer em datas distintas.']
  ],
  v: [
   ['Um sinal anterior ao fornecimento pode gerar antecipação tributária.',true,'A lei trata os pagamentos antecipados.'],
   ['O tributo antecipado deve ser somado de novo sem abatimento na entrega.',false,'A apuração final deve considerar a antecipação.'],
   ['Contrato, pagamento e fornecimento podem ocorrer em momentos diferentes.',true,'Essa distinção é o centro do módulo.'],
   ['Todo contrato se torna fato gerador integral na assinatura.',false,'A regra geral está ligada ao fornecimento.'],
   ['A documentação dos adiantamentos auxilia a reconciliação.',true,'É necessário controlar antecipações e ajuste final.'],
   ['A temporalidade é irrelevante em contratos de execução continuada.',false,'A execução em etapas requer atenção.'],
   ['O fato gerador geral se relaciona com o fornecimento.',true,'É a referência temporal básica.'],
   ['O recebimento financeiro e a entrega sempre ocorrem no mesmo dia.',false,'Podem ser separados.'],
   ['Um adiantamento não precisa ser considerado no ajuste da operação.',false,'Deve ser conciliado com o tributo final.'],
   ['Identificar a data correta ajuda a evitar antecipação ou postergação indevida.',true,'O enquadramento temporal afeta a apuração.']
  ]
 },
 '04': {
  m: [
   ['Na sistemática por fora, o IBS e a CBS incidem sobre qual grandeza?', ['Valor da operação sem os próprios tributos','Total acrescido dos próprios IBS/CBS','Sempre o lucro líquido','Somente o frete'], 0, 'Os próprios IBS/CBS não integram sua base.'],
   ['Qual desconto em regra reduz a base quando atende aos requisitos?', ['Desconto incondicional','Desconto sujeito a evento futuro','Juros moratórios','Frete cobrado do comprador'], 0, 'Descontos incondicionais destacados têm tratamento próprio.'],
   ['Como o Imposto Seletivo pode afetar a base de IBS/CBS?', ['Pode integrá-la conforme a regra legal','É sempre excluído como o próprio IBS','Zera automaticamente a CBS','Substitui o preço'], 0, 'O IS não figura entre as exclusões gerais mencionadas.'],
   ['Em exemplo didático com base de R$ 100 e alíquota por fora de 20%, qual é o total?', ['R$ 120','R$ 125','R$ 100','R$ 20'], 0, 'Por fora: 100 × (1 + 20%) = 120.'],
   ['Qual item cobrado do adquirente pode compor o valor da operação?', ['Frete acessório','O próprio IBS','O próprio CBS','Desconto incondicional'], 0, 'Fretes e despesas acessórias podem integrar a base.']
  ],
  v: [
   ['O IBS e a CBS não integram suas próprias bases.',true,'A sistemática geral é por fora.'],
   ['O preço por fora de R$ 100 com tributo de 20% é R$ 125.',false,'É R$ 120; R$ 125 exemplifica gross-up por dentro.'],
   ['Frete debitado ao comprador pode compor a base.',true,'É uma despesa acessória da operação.'],
   ['Todo desconto, mesmo condicionado, reduz automaticamente a base.',false,'Descontos condicionais exigem tratamento distinto.'],
   ['O Imposto Seletivo pode compor o valor da operação para IBS/CBS.',true,'A regra deve ser considerada na formação da base.'],
   ['IBS e CBS incidem sobre os próprios valores destacados de IBS/CBS.',false,'Os próprios tributos ficam fora da base.'],
   ['A classificação das despesas acessórias afeta a base.',true,'Frete, seguro e outras cobranças exigem análise.'],
   ['Uma alíquota por fora e uma alíquota por dentro têm sempre o mesmo preço final.',false,'As bases matemáticas são diferentes.'],
   ['O desconto incondicional deve ser examinado na documentação fiscal.',true,'O destaque e os requisitos importam.'],
   ['A base é sempre o lucro contábil da empresa.',false,'A regra geral é o valor da operação.']
  ]
 },
 '05': {
  m: [
   ['Qual condição geral deve ser verificada para crédito de IBS/CBS?', ['Aquisição elegível e requisitos legais','Somente pagamento em dinheiro','Somente regime de Lucro Real','Toda compra pessoal dos sócios'], 0, 'O direito a crédito não é universal para qualquer gasto.'],
   ['No Simples padrão, a adquirente se apropria dos créditos de suas compras?', ['Não, dentro do regime padrão','Sim, sempre pela alíquota cheia','Só de IBS, nunca CBS','Somente com boleto bancário'], 0, 'A apuração no DAS não dá o mesmo crédito de aquisições do regime regular.'],
   ['No Simples híbrido, como são tratados IBS/CBS?', ['Fora do DAS, pelo regime regular','Dentro do DAS sem opção','Como parte do IRPJ','Sem emissão de documento'], 0, 'A opção pelo regime regular altera a apuração de IBS/CBS.'],
   ['Como calcular custo efetivo em aquisição com crédito aproveitável?', ['Preço pago menos crédito permitido','Preço mais crédito','Preço menos todo o DAS do fornecedor','Preço dividido pelo faturamento'], 0, 'O crédito recuperável reduz o custo econômico da compra.'],
   ['O crédito de CBS pode compensar diretamente débito de IBS?', ['Não; os créditos são segregados','Sim, indistintamente','Só no Lucro Presumido','Somente se a compra for à vista'], 0, 'Cada tributo mantém sua própria apuração.']
  ],
  v: [
   ['O Simples padrão pode aproveitar integralmente créditos de IBS/CBS das compras no DAS.',false,'A apuração padrão não apropria esses créditos.'],
   ['O Simples híbrido pode se submeter ao regime regular de IBS/CBS.',true,'Essa é a característica da opção híbrida.'],
   ['Uma compra pessoal do sócio gera crédito empresarial automaticamente.',false,'Há vedações para uso e consumo pessoal.'],
   ['CBS e IBS exigem controle separado de créditos.',true,'Não se compensam indistintamente.'],
   ['O valor de crédito depende do tributo da operação e dos requisitos legais.',true,'Não se aplica 27,91% universalmente.'],
   ['O custo efetivo pode diminuir quando há crédito aproveitável.',true,'Preço menos crédito permitido.'],
   ['Uma nota inidônea gera crédito sem qualquer risco.',false,'A regularidade documental deve ser verificada.'],
   ['O comprador regular pode receber crédito limitado ao IBS/CBS devido pelo fornecedor do Simples padrão.',true,'A transferência de crédito tem limite próprio.'],
   ['Todo fornecedor do Simples transfere crédito cheio do regime regular.',false,'Isso depende da opção pelo regime regular.'],
   ['O requisito de extinção do débito anterior deve ser considerado.',true,'A lei disciplina essa condição e suas exceções.']
  ]
 },
 '06': {
  m: [
   ['Uma redução de 60% sobre alíquota didática de 27,91% deixa qual parcela?', ['40% da alíquota, ou 11,164%','60 pontos percentuais a menos','Alíquota zero','27,91% inalterados'], 0, '27,91% × 40% = 11,164%; é exemplo, não alíquota universal.'],
   ['O que deve ser conferido para aplicar redução setorial?', ['Enquadramento legal do item e operação','Apenas o nome comercial','Só o regime de IRPJ','A preferência do cliente'], 0, 'Classificação e hipótese legal determinam o tratamento.'],
   ['Alíquota zero e imunidade são o mesmo instituto?', ['Não, têm fundamentos distintos','Sim, sem distinção','Só no Lucro Real','Somente quando há exportação'], 0, 'A origem jurídica e os efeitos podem diferir.'],
   ['Qual documento ajuda a validar o tratamento fiscal do item?', ['Classificação e documento fiscal da operação','Somente extrato bancário','Folha de pagamento','Contrato social isolado'], 0, 'A natureza do item deve ser comprovada.'],
   ['Regime específico implica sempre crédito integral comum?', ['Não; é preciso seguir suas regras próprias','Sim, sem exceções','Só no Simples','Sempre alíquota zero'], 0, 'Regimes específicos podem alterar base, alíquota e crédito.']
  ],
  v: [
   ['Redução de 60% significa pagar 40% da alíquota de referência aplicável.',true,'É uma redução relativa, não de 60 pontos.'],
   ['Todo alimento recebe automaticamente a mesma redução.',false,'É necessário verificar o enquadramento legal.'],
   ['Uma operação com alíquota zero deve ser analisada quanto aos efeitos sobre créditos.',true,'Os efeitos variam conforme a hipótese legal.'],
   ['O nome informal do produto basta para classificar a alíquota.',false,'Classificação fiscal e operação importam.'],
   ['Regimes específicos podem ter regras próprias de crédito.',true,'Não se presume a regra geral sem análise.'],
   ['27,91% é parâmetro didático, não taxa efetiva obrigatória para todo setor.',true,'Ano, destino e enquadramento mudam a análise.'],
   ['Redução de 30% sobre 20% resulta em 14%.',true,'20% × 70% = 14%.'],
   ['Redução de 60% sobre 20% resulta em zero.',false,'Resulta em 8%.'],
   ['A destinação e a natureza da operação podem importar no enquadramento.',true,'O benefício não depende só do contribuinte.'],
   ['Basta escolher a menor alíquota em uma planilha para ter direito ao benefício.',false,'É necessária base legal e documentação.']
  ]
 },
 '07': {
  m: [
   ['Em que ano começa a redução gradual de ICMS/ISS na transição descrita?', ['2029','2026','2027','2033'], 0, 'A redução gradual se inicia em 2029.'],
   ['O que ocorre em 2026 no cronograma?', ['Fase de teste com regras próprias','Extinção completa do ICMS','IBS integral de 18,70%','Fim de todos os tributos anteriores'], 0, '2026 é tratado como ano de teste.'],
   ['Qual é a posição do IBS em 2027/2028 na transição?', ['Fase inicial de 0,1%','Alíquota cheia em todos os destinos','Alíquota zero em todas as operações','Substituição integral do IRPJ'], 0, 'Há uma fase inicial antes da progressão 2029–2032.'],
   ['Qual ano encerra a transição principal apresentada no curso?', ['2033','2027','2029','2030'], 0, '2033 marca o modelo integral.'],
   ['Por que projeções precisam ser calculadas ano a ano?', ['Tributos antigos e novos coexistem em proporções distintas','A alíquota é sempre fixa','Só muda o IRPJ','O destino não importa'], 0, 'A transição altera parcelas e regras.']
  ],
  v: [
   ['2026 é um ano de teste de IBS/CBS com regras próprias.',true,'Não corresponde ao sistema integral.'],
   ['ICMS e ISS desaparecem por completo em 2027.',false,'A retirada é gradual até 2033.'],
   ['A redução de ICMS/ISS começa em 2029.',true,'É o início da etapa gradual.'],
   ['O IBS já usa a parcela plena didática de 18,70% em 2027.',false,'2027 integra a fase inicial.'],
   ['Em 2033 a transição principal alcança o modelo integral.',true,'É o marco geral apresentado.'],
   ['Uma planilha de transição pode repetir a mesma carga em todos os anos sem justificativa.',false,'Os componentes mudam ao longo do período.'],
   ['2029 combina tributos antigos remanescentes e avanço do IBS.',true,'Há coexistência durante a transição.'],
   ['A projeção deve distinguir regras legais de premissas didáticas de alíquota.',true,'Os valores simulados não são universais.'],
   ['O Imposto Seletivo substitui o IRPJ em 2027.',false,'São tributos de naturezas diferentes.'],
   ['O ano analisado influencia o custo efetivo de uma compra.',true,'A composição dos tributos varia por ano.']
  ]
 },
 '08': {
  m: [
   ['Qual objetivo do exemplo de reprecificação do módulo?', ['Preservar o líquido econômico sob premissas definidas','Igualar preço bruto em todos os regimes','Eliminar a análise de margem','Aplicar 27,91% ao lucro'], 0, 'O exemplo compara preço e líquido sob a transição.'],
   ['Na análise da DRE, o que não deve ser confundido?', ['Faturamento bruto e receita líquida','CBS e IBS como o mesmo tributo','Custo e crédito como sinônimos','Todas as alternativas'], 3, 'Essas distinções importam; a alternativa reúne as três.'],
   ['Qual efeito um crédito aproveitável de compra pode ter?', ['Reduzir o custo efetivo','Aumentar automaticamente o preço do fornecedor','Extinguir o faturamento','Substituir toda a receita'], 0, 'O crédito pertence à análise econômica do adquirente.'],
   ['O preço da nota pode mudar sem alterar a margem no exemplo?', ['Sim, se as premissas preservarem líquido e custos','Não, jamais','Somente com alíquota zero','Apenas no Simples'], 0, 'Preço bruto e resultado líquido são grandezas diferentes.'],
   ['O que deve acompanhar uma simulação de preços?', ['Premissas de custos, tributos, créditos e margem','Apenas a alíquota de IBS','Só o CNPJ do fornecedor','Apenas o preço anterior'], 0, 'A leitura econômica depende dessas premissas.']
  ],
  v: [
   ['Preço bruto e receita líquida são sempre iguais.',false,'Tributos e demais deduções criam diferenças.'],
   ['Uma redução do preço bruto não prova queda do lucro.',true,'É preciso olhar receita líquida, custos e margem.'],
   ['O crédito de compra pode reduzir o custo efetivo do adquirente.',true,'Quando aproveitável, é recuperável economicamente.'],
   ['Basta somar uma taxa didática ao preço antigo para preservar margem.',false,'A formação depende de bases e tributos remanescentes.'],
   ['A DRE ajuda a comparar cenários antes e depois.',true,'Mostra receita, deduções, custos e resultado.'],
   ['Todo repasse tributário ao cliente é garantido pelo mercado.',false,'Aceitação comercial é uma premissa separada.'],
   ['Custo efetivo de aquisição e preço da nota podem diferir.',true,'O crédito recuperável explica parte da diferença.'],
   ['Simulações devem indicar claramente ano e regime.',true,'Ambos mudam o cálculo.'],
   ['A margem pode ser calculada sem escolher uma base de comparação.',false,'É preciso definir receita e custos usados.'],
   ['Alíquota didática não substitui a aplicável à operação real.',true,'Confirme enquadramento, ano e destino.']
  ]
 },
 '09': {
  m: [
   ['Qual alternativa descreve a opção híbrida do Simples?', ['IBS/CBS no regime regular e demais parcelas no DAS','Todo tributo fora do DAS','IBS/CBS sem apuração','Lucro Real obrigatório'], 0, 'A opção separa IBS/CBS das demais parcelas do Simples.'],
   ['No Simples padrão, a empresa compradora toma crédito pleno de suas aquisições?', ['Não','Sim, em toda aquisição','Apenas por ser B2B','Sempre 27,91%'], 0, 'O Simples padrão não usa os créditos de compra do regime regular.'],
   ['Por que a opção híbrida pode importar em vendas B2B?', ['Pode permitir créditos regulares ao adquirente e ao optante','Dispensa a nota fiscal','Elimina a CBS','Converte o cliente em fornecedor'], 0, 'O fluxo de créditos muda a comparação comercial.'],
   ['Qual comparação é necessária antes de optar?', ['DAS residual, IBS/CBS, créditos e clientes','Somente faturamento bruto','Somente taxa de cartão','Apenas folha do cliente'], 0, 'A decisão depende da cadeia de compras e vendas.'],
   ['O cliente regular de fornecedor no Simples padrão pode ter qual crédito?', ['Limitado à parcela de IBS/CBS devida no Simples','Sempre o crédito cheio didático','Nenhum em qualquer hipótese','Crédito de IRPJ'], 0, 'O crédito transferível tem limite específico.']
  ],
  v: [
   ['Simples padrão e Simples híbrido têm o mesmo tratamento de crédito de compras.',false,'No híbrido, IBS/CBS seguem o regime regular.'],
   ['A escolha pelo regime regular de IBS/CBS deve considerar a carteira de clientes.',true,'O efeito B2B pode ser relevante.'],
   ['No híbrido, todos os tributos saem obrigatoriamente do DAS.',false,'A separação é de IBS/CBS.'],
   ['O fornecedor do Simples padrão transfere sempre crédito integral da alíquota regular.',false,'A transferência é limitada à parcela devida no Simples.'],
   ['A opção híbrida altera a apuração de IBS/CBS.',true,'Eles passam a seguir o regime regular.'],
   ['Comparar apenas o valor do DAS basta para escolher a melhor opção.',false,'Créditos e preços também importam.'],
   ['A natureza B2B ou B2C da clientela pode mudar a decisão.',true,'Os créditos afetam a cadeia empresarial.'],
   ['Um optante padrão apropria créditos cheios das compras no DAS.',false,'Essa apropriação não ocorre no regime padrão.'],
   ['A opção do Simples precisa ser avaliada com dados da operação concreta.',true,'Faturamento, anexo, compras e clientes importam.'],
   ['O Simples Nacional deixa de existir por causa da opção híbrida.',false,'O Simples permanece para as demais parcelas.']
  ]
 },
 '10': {
  m: [
   ['Qual tributo continua relevante na comparação Lucro Presumido x Real?', ['IRPJ e CSLL','Somente IBS','Apenas ISS','Nenhum tributo'], 0, 'O regime de renda ainda diferencia as opções.'],
   ['No regime regular de consumo, LP e LR seguem qual lógica geral?', ['Apuração de IBS/CBS com créditos legais','DAS unificado','Isenção geral de IBS','Só ICMS antigo'], 0, 'A diferença de IRPJ/CSLL permanece separada.'],
   ['Qual base é usada no exemplo de presunção do Lucro Presumido?', ['Percentual legal sobre receita enquadrada','Toda compra da empresa','Somente saldo bancário','Crédito de IBS'], 0, 'A base presumida depende da atividade e regras legais.'],
   ['O que deve ser separado em uma comparação de regimes?', ['Tributos sobre renda e sobre consumo','Somente saldo de clientes','Folha e patrimônio sem receitas','Preço e código postal'], 0, 'A escolha de regime não se resume à CBS/IBS.'],
   ['A LC 224 é examinada no curso por qual possível efeito?', ['Alteração em percentuais de presunção sob condições legais','Extinção do IBS','Criação do ISS nacional','Fim da CBS'], 0, 'O módulo discute os reflexos na base presumida.']
  ],
  v: [
   ['O Lucro Presumido e o Lucro Real são idênticos em IRPJ/CSLL.',false,'As formas de apuração de renda diferem.'],
   ['O tratamento de IBS/CBS deve ser separado da apuração de IRPJ/CSLL.',true,'São dimensões tributárias diferentes.'],
   ['A escolha entre LP e LR pode depender de margem efetiva e créditos aplicáveis.',true,'A análise econômica é integrada.'],
   ['O percentual de presunção é sempre o mesmo para toda atividade.',false,'Depende da atividade e regra legal.'],
   ['Uma mudança legal na presunção deve ser considerada na simulação.',true,'O módulo discute essa hipótese.'],
   ['A CBS substitui diretamente o IRPJ no Lucro Presumido.',false,'CBS é tributo de consumo, IRPJ de renda.'],
   ['É útil comparar bases e carga de IRPJ/CSLL de ambos regimes.',true,'A escolha não se resolve apenas pelo IVA.'],
   ['Lucro Real é sempre mais barato independentemente dos dados.',false,'A resposta depende das condições da empresa.'],
   ['Lucro Presumido impede toda apropriação de crédito no regime regular de IBS/CBS.',false,'A lógica de crédito de consumo pode se aplicar.'],
   ['A receita e o enquadramento da atividade influenciam a base presumida.',true,'São dados essenciais do cálculo.']
  ]
 },
 '11': {
  m: [
   ['Qual é a função central do DF-e na reforma?', ['Registrar dados fiscais da operação','Substituir toda contabilidade','Determinar o lucro sozinho','Dispensar classificação fiscal'], 0, 'O documento alimenta a apuração e a conferência.'],
   ['O que é apuração assistida?', ['Proposta de apuração apoiada nos documentos eletrônicos','Cálculo sem documentos','Uma conta bancária obrigatória','Um anexo do Simples'], 0, 'O contribuinte precisa revisar os dados.'],
   ['Por que revisar NCM/NBS e cadastros?', ['Para evitar tratamento fiscal incorreto','Para alterar o nome da empresa','Para gerar IRPJ automaticamente','Para eliminar fornecedores'], 0, 'Classificação interfere em alíquota e enquadramento.'],
   ['Qual rotina reduz divergências na apuração assistida?', ['Conferir XMLs emitidos e recebidos','Ignorar notas rejeitadas','Somar apenas extratos','Conferir só no fim do ano'], 0, 'A qualidade da origem dos dados é decisiva.'],
   ['A apuração proposta pelo Fisco dispensa o contribuinte de revisão?', ['Não','Sim, sempre','Só no Lucro Real','Somente para compras'], 0, 'A conferência continua necessária.']
  ],
  v: [
   ['Documento fiscal eletrônico confiável é importante para débito e crédito.',true,'Os dados alimentam a apuração.'],
   ['Erro de cadastro pode levar a alíquota ou tratamento incorreto.',true,'A classificação fiscal é relevante.'],
   ['Apuração assistida elimina a necessidade de auditoria pelo contribuinte.',false,'A revisão é essencial.'],
   ['Apenas o extrato bancário substitui integralmente o XML fiscal.',false,'As informações têm funções distintas.'],
   ['NCM e NBS podem ser relevantes no enquadramento de itens.',true,'Servem à classificação da operação.'],
   ['Uma nota rejeitada deve ser tratada como documento autorizado sem revisão.',false,'A autorização precisa ser verificada.'],
   ['Saneamento de cadastro antes da emissão pode prevenir divergências.',true,'É uma medida de conformidade.'],
   ['A conferência pode comparar documentos emitidos e recebidos.',true,'O cruzamento revela inconsistências.'],
   ['Todos os itens têm sempre alíquota idêntica independentemente da classificação.',false,'Há regimes e reduções específicos.'],
   ['É preciso acompanhar leiautes e cronogramas oficiais dos documentos.',true,'Regras operacionais podem mudar.']
  ]
 },
 '12': {
  m: [
   ['O que descreve o split payment?', ['Segregação do tributo na liquidação financeira conforme regras aplicáveis','Parcelamento obrigatório de IRPJ','Desconto comercial do fornecedor','Crédito automático de folha'], 0, 'O mecanismo vincula pagamento e recolhimento de IBS/CBS.'],
   ['Quais três fontes aparecem na conciliação do módulo?', ['Documento fiscal, relatório financeiro e extrato bancário','DRE, currículo e contrato social','Folha, estoque e aluguel','Somente comprovante Pix'], 0, 'A conciliação cruza obrigação, retenção/taxa e caixa.'],
   ['Uma venda de R$ 12.791 com tributos de R$ 2.791 e taxa de R$ 255,82 gera qual líquido, no exemplo?', ['R$ 9.744,18','R$ 10.000,00','R$ 12.791,00','R$ 9.488,36'], 0, '12.791 − 2.791 − 255,82 = 9.744,18.'],
   ['Por que a empresa precisa revisar seu fluxo de caixa?', ['O tributo pode ser segregado na liquidação','A receita bruta sempre aumenta','O custo de estoque some','IRPJ deixa de existir'], 0, 'A disponibilidade imediata de caixa pode mudar.'],
   ['Qual divergência deve ser investigada?', ['Nota, retenção, taxa e crédito bancário não reconciliam','A nota tem data de emissão','Existe cliente identificado','A venda ocorreu no cartão'], 0, 'A trilha financeira precisa fechar.']
  ],
  v: [
   ['Split payment pode alterar o valor líquido que entra no banco.',true,'Tributos podem ser segregados na liquidação.'],
   ['O relatório da adquirente pode incluir taxas além da retenção tributária.',true,'Esses componentes precisam ser separados.'],
   ['O extrato bancário isolado demonstra todos os valores da nota.',false,'É necessário conciliar com documento e relatório financeiro.'],
   ['Uma retenção de IBS/CBS pode requerer baixa do passivo correspondente.',true,'A contabilidade deve acompanhar a liquidação.'],
   ['No exemplo do curso, R$ 12.791 menos R$ 2.791 menos R$ 255,82 é R$ 9.744,18.',true,'A reconciliação aritmética fecha.'],
   ['A taxa do cartão é o mesmo valor da CBS.',false,'São componentes distintos.'],
   ['Diferenças de centavos na conciliação devem ser ignoradas sempre.',false,'Precisam ser identificadas e tratadas.'],
   ['A nota fiscal e a liquidação podem ocorrer em momentos diferentes.',true,'Por isso há controle de valores a receber.'],
   ['O mecanismo de split payment dispensa toda apuração de IBS/CBS.',false,'A apuração e conciliação continuam necessárias.'],
   ['A implantação exige acompanhar as regras e o cronograma aplicável.',true,'O mecanismo não deve ser presumido idêntico para toda operação.']
  ]
 },
 '13': {
  m: [
   ['Qual é o primeiro passo de uma consultoria tributária baseada em dados?', ['Diagnóstico das operações e dados do cliente','Aplicar 27,91% a tudo','Trocar de regime sem análise','Apagar histórico fiscal'], 0, 'É preciso conhecer operações, compras, vendas e enquadramentos.'],
   ['Qual benefício da automação em dados fiscais?', ['Reduzir retrabalho e localizar divergências','Eliminar responsabilidade profissional','Substituir toda legislação','Garantir crédito de qualquer nota'], 0, 'Automação ajuda na conferência, sob supervisão.'],
   ['Qual indicador ajuda a medir impacto da reforma?', ['Custo efetivo de compras e margem por cenário','Somente número de funcionários','Cor do dashboard','Quantidade de logotipos'], 0, 'Créditos, preços e margem conectam regra e negócio.'],
   ['O que deve constar de um plano de ação para clientes?', ['Responsáveis, dados, prazos e validações','Apenas um slogan','Uma alíquota única sem premissas','Só nome do contador'], 0, 'O plano transforma diagnóstico em execução.'],
   ['Como apresentar uma simulação ao cliente?', ['Com premissas, resultado e limitações explícitas','Como garantia de imposto futuro','Sem memória de cálculo','Apenas com porcentagem final'], 0, 'A transparência permite revisão e decisão informada.']
  ],
  v: [
   ['Um diagnóstico deve mapear compras, vendas, regime e documentos.',true,'São insumos da análise consultiva.'],
   ['Automação dispensa a revisão humana de exceções fiscais.',false,'A supervisão continua necessária.'],
   ['Comparar custo efetivo e margem ajuda a priorizar clientes.',true,'Mostra onde o impacto pode ser maior.'],
   ['Todo cliente deve receber a mesma conclusão sem examinar seus dados.',false,'As operações e enquadramentos variam.'],
   ['Um plano de ação útil contém responsáveis e prazos.',true,'Isso torna as tarefas executáveis.'],
   ['Premissas da simulação devem ser documentadas.',true,'Permite auditoria e atualização.'],
   ['O relatório final deve omitir limitações para parecer mais seguro.',false,'Limitações precisam ser claras.'],
   ['A conferência de dados cadastrais faz parte da preparação.',true,'Qualidade de origem afeta os resultados.'],
   ['A decisão sobre regime pode ser tomada só pela alíquota nominal.',false,'Créditos, margem, atividade e clientes importam.'],
   ['O contador pode usar cenários para discutir efeitos com o cliente.',true,'Cenários apoiam planejamento fundamentado.']
  ]
 }
};
// Cada enunciado começa com uma situação que recupera o tema estudado.
// As cinco primeiras entradas acompanham as questões de escolha; as dez seguintes, as afirmações.
const QUIZ_CONTEXT = {
 '01': [
  'Uma empresa compra insumos em vários estados e vende para clientes de todo o país. O contador apresenta a estrutura dos novos tributos sobre consumo.',
  'Um cliente fabrica produtos que podem estar sujeitos a tratamento tributário adicional por seus efeitos sobre saúde ou meio ambiente.',
  'Dois fornecedores têm preços parecidos, mas um oferece vantagem baseada apenas em incentivo fiscal de localização.',
  'Ao montar um mapa de competências, a equipe precisa identificar quem administra cada parte da tributação do consumo.',
  'Uma planilha de aula usa CBS de 9,21% e IBS de 18,70% para exemplificar uma venda em 2033.',
  'Durante uma reunião, a equipe organiza os tributos pelo ente federativo responsável.',
  'Um empresário acredita que toda a parcela de IBS pertence à prefeitura de sua cidade.',
  'Ao revisar a proposta, alguém coloca o Imposto Seletivo na mesma linha do IBS.',
  'Uma rede varejista pergunta se a neutralidade impede qualquer tratamento diferenciado previsto em lei.',
  'O escritório compara a apuração antiga de comércio e serviços com a nova estrutura.',
  'Um cliente quer usar a porcentagem de uma simulação como alíquota definitiva em todas as vendas.',
  'Na apresentação da reforma, a equipe desenha as competências dos tributos gerais sobre consumo.',
  'Uma operação pode ter redução, regime específico e alíquota de destino própria.',
  'A equipe constrói uma linha do tempo de ICMS, ISS e IBS.',
  'Uma pequena empresa optante pergunta se precisa deixar o Simples por causa da reforma.'
 ],
 '02': [
  'Uma loja de São Paulo entrega mercadoria a um comprador de outro estado. É preciso decidir qual local orienta o IBS.',
  'Uma incorporadora vende um imóvel situado em município diferente do endereço de sua sede.',
  'Uma empresa de ônibus vende passagem entre cidades de estados diferentes.',
  'Uma nota fiscal de serviço informa o destino e exige separar a parcela estadual e municipal do IBS.',
  'Um cliente digital cadastrou endereço incompleto de um adquirente e precisa calcular o IBS.',
  'O escritório analisa mercadorias, imóveis, viagens e serviços digitais no mesmo mês.',
  'Um prestador atende clientes em vários municípios e propõe usar sempre o endereço de sua sede.',
  'Um imóvel está em cidade diferente daquela em que foi assinado o contrato de compra.',
  'Uma indústria vende a partir de seu centro de distribuição para consumidores em outros estados.',
  'Uma transportadora revisa a tributação de passagens emitidas em itinerários diferentes.',
  'Uma plataforma recebe dados cadastrais de compradores de diversos municípios.',
  'Uma rede compara operações em cidades que podem ter parcelas municipais distintas.',
  'Um mesmo contrato reúne fornecimento de imóvel e de bem móvel.',
  'Uma empresa escolhe local de instalação pensando apenas em incentivos de ICMS.',
  'O cadastro do fornecedor e o do adquirente mostram endereços diferentes.'
 ],
 '03': [
  'Uma fábrica assina contrato em janeiro e entrega o equipamento ao cliente em março.',
  'Um cliente paga parte do preço antes da entrega das mercadorias contratadas.',
  'Uma empresa fornece manutenção ao longo de vários meses e recebe parcelas em datas diferentes.',
  'Uma venda teve sinal em janeiro e entrega final em abril; a equipe precisa fechar a apuração.',
  'A proposta comercial é aceita hoje, mas a execução do serviço ocorrerá no próximo mês.',
  'Uma obra receberá adiantamento antes de uma etapa ser concluída.',
  'A controladoria prepara o cálculo final de operação que teve imposto antecipado.',
  'Contrato, recebimento e entrega constam em datas distintas no sistema.',
  'Um contrato de fornecimento futuro foi assinado, mas a prestação ainda não começou.',
  'O ERP registra sinais de clientes que deverão ser conciliados com futuras entregas.',
  'Uma assinatura mensal envolve prestações sucessivas.',
  'O contador compara os eventos registrados na agenda comercial e fiscal.',
  'A equipe precisa determinar o momento básico da incidência em uma venda.',
  'O sinal aparece no banco antes de a mercadoria sair do estoque.',
  'Uma empresa deseja evitar pagar cedo demais ou atrasar a apuração.'
 ],
 '04': [
  'Uma empresa vende um serviço por R$ 1.000 antes dos novos tributos e precisa emitir o documento fiscal.',
  'Uma loja concede desconto certo na nota e outro condicionado a uma meta futura.',
  'Um fabricante comercializa item que pode estar sujeito ao Imposto Seletivo.',
  'Em uma aula de precificação, o valor comercial antes do tributo é de R$ 100.',
  'O fornecedor cobra frete e seguro do comprador na mesma operação.',
  'Uma nota apresenta valor da operação e destaques separados de IBS e CBS.',
  'O comercial compara o preço por dentro do sistema antigo com o preço por fora.',
  'Um contrato inclui frete como cobrança acessória.',
  'A loja oferece abatimento condicionado ao pagamento antecipado.',
  'Um produto sujeito ao Seletivo também está no campo de IBS/CBS.',
  'O analista quer somar novamente IBS e CBS à base que já os excluiu.',
  'Uma venda inclui despesas acessórias faturadas ao cliente.',
  'A diretoria compara dois preços formados com alíquotas matematicamente distintas.',
  'Uma nota exibe um desconto concedido sem condição futura.',
  'A equipe tenta usar o lucro anual como base de uma venda específica.'
 ],
 '05': [
  'Uma indústria compra software, energia e serviços e quer determinar o crédito de cada documento.',
  'Uma empresa optante pelo Simples no DAS compra material para sua atividade.',
  'Uma pequena empresa considera recolher IBS/CBS pelo regime regular fora do DAS.',
  'Dois fornecedores apresentam preços de nota diferentes, e a compradora pode aproveitar crédito em uma cotação.',
  'O setor fiscal controla separadamente os débitos e créditos de CBS e IBS.',
  'Uma empresa do Simples padrão recebe nota de compra com tributos destacados.',
  'O optante analisa a opção híbrida antes de contratar novos fornecedores.',
  'O sócio apresenta uma compra pessoal como despesa da empresa.',
  'A equipe organiza duas contas de crédito para os novos tributos.',
  'Uma cotação foi feita com alíquota reduzida, enquanto outra usa a alíquota geral.',
  'O comprador compara o desembolso da nota com o custo depois de créditos.',
  'O sistema encontra uma nota cuja autorização fiscal é duvidosa.',
  'Uma compradora no regime regular adquire mercadoria de fornecedor no Simples padrão.',
  'Um fornecedor optante anuncia aos clientes o mesmo crédito cheio de um fornecedor regular.',
  'Uma nota de aquisição ainda exige conferência das condições legais de crédito.'
 ],
 '06': [
  'Um item elegível tem redução legal de 60%, e a aula usa uma alíquota combinada hipotética de 27,91%.',
  'Uma clínica e uma loja de produtos diversos consultam tratamentos reduzidos para itens distintos.',
  'A equipe compara duas hipóteses de desoneração com fundamentos jurídicos diferentes.',
  'Um produto foi cadastrado com descrição comercial genérica no ERP.',
  'Um cliente está sujeito a regime específico e quer aplicar automaticamente as regras gerais de crédito.',
  'Uma operação está corretamente enquadrada em benefício de redução.',
  'O comerciante tenta estender tratamento reduzido a todos os itens de sua loja.',
  'Um produto recebe alíquota zero e há créditos acumulados de compras.',
  'A nota fiscal contém nome abreviado do produto, mas falta sua classificação.',
  'Uma operação pertence a setor com regras especiais de apuração.',
  'Uma apresentação usa o percentual combinado do curso como hipótese de cálculo.',
  'O professor propõe redução relativa de 30% sobre uma alíquota de exemplo de 20%.',
  'Outra questão didática propõe redução de 60% sobre 20%.',
  'Um serviço pode ter destinação relevante para o tratamento tributário.',
  'O gerente escolhe a menor taxa disponível na planilha sem examinar a lei.'
 ],
 '07': [
  'Uma empresa projeta a tributação de operações entre 2026 e 2033.',
  'No primeiro ano da linha do tempo, o escritório prepara as obrigações de teste.',
  'Uma apresentação compara o IBS dos anos iniciais ao de 2033.',
  'A diretoria pede a data de conclusão da transição principal.',
  'Uma simulação usa o mesmo preço de compra para vários anos futuros.',
  'Em 2026, o sistema pede campos de CBS e IBS mesmo durante a fase de teste.',
  'Um cliente pergunta se deve parar de calcular ICMS e ISS já em 2027.',
  'O analista monta a transição gradual entre os tributos antigos e o IBS.',
  'Uma planilha aplica a parcela cheia estimada de IBS em todos os anos.',
  'O escritório compara o quadro tributário inicial com o modelo final.',
  'Em 2030, a equipe ainda precisa observar componentes antigos e novos.',
  'Um relatório mistura percentuais legais e hipóteses da aula sem identificá-los.',
  'O ano de 2029 aparece no calendário de redução de ICMS e ISS.',
  'Alguém confunde o Imposto Seletivo com tributo sobre renda.',
  'O comprador projeta a mesma aquisição para 2027, 2029 e 2033.'
 ],
 '08': [
  'Uma empresa quer comparar uma operação atual com uma venda futura preservando a receita líquida sob premissas fixas.',
  'O relatório de gestão apresenta preço de nota, tributos, receita líquida e custo em linhas distintas.',
  'O comprador analisa o crédito recuperável de uma aquisição usada na produção.',
  'Uma simulação mostra preço nominal menor, mas receita líquida e custos constantes.',
  'O gerente deseja alterar preço sem registrar os custos e as margens esperadas.',
  'O cliente vê na nota um valor diferente daquele que permanece após tributos.',
  'Uma proposta reduz o preço bruto e o dono teme perda automática de lucro.',
  'Duas cotações têm valores de nota parecidos, porém créditos distintos.',
  'Uma planilha simplesmente adiciona um percentual ao preço atual.',
  'O contador apresenta uma DRE de antes e depois da transição.',
  'O comercial supõe que qualquer aumento de custo será aceito pelo cliente.',
  'Uma aquisição pode dar crédito recuperável ao comprador.',
  'A equipe etiqueta cada coluna de projeção pelo ano e pelo regime.',
  'Um relatório exibe 38% de margem sem dizer sobre qual receita calculou.',
  'O curso usa taxas didáticas para comparar dois cenários de preço.'
 ],
 '09': [
  'Uma pequena empresa no Simples atende indústrias que valorizam créditos nas compras.',
  'Uma optante pelo Simples padrão compra materiais e recebe documentos fiscais.',
  'A empresa vende quase tudo a clientes no Lucro Real e considera a opção híbrida.',
  'O contador compara DAS residual, novos tributos e créditos sobre aquisições.',
  'Uma indústria regular adquire de fornecedor que permanece no Simples unificado.',
  'Duas empresas do Simples escolhem formas diferentes de apurar IBS/CBS.',
  'O comércio avalia o perfil dos clientes antes de exercer a opção.',
  'O sócio interpreta a opção híbrida como saída completa do Simples.',
  'Um fornecedor no DAS promete crédito cheio aos clientes corporativos.',
  'A equipe registra a apuração separada do IBS e da CBS no híbrido.',
  'O consultor compara só o valor mensal do DAS das duas alternativas.',
  'A carteira tem uma parcela grande de vendas para empresas.',
  'Uma optante padrão tenta registrar crédito regular em suas compras.',
  'A decisão envolve anexo, faturamento, compras e perfil do comprador.',
  'Uma pequena empresa pergunta se continuará optante do Simples no híbrido.'
 ],
 '10': [
  'Um cliente compara Lucro Presumido e Lucro Real para planejar o próximo exercício.',
  'Duas empresas fora do Simples apuram IBS/CBS sobre operações equivalentes.',
  'Um prestador estima base de IRPJ a partir da receita e da atividade.',
  'A planilha mistura efeitos sobre lucro com os tributos incidentes no consumo.',
  'O escritório estuda como uma regra de presunção pode afetar a base de cálculo.',
  'Uma diretoria compara os dois regimes para IRPJ e CSLL.',
  'O cliente analisa uma DRE junto à apuração de IBS/CBS.',
  'Uma empresa tem margem diferente da presumida e precisa simular alternativas.',
  'O analista usa um percentual de presunção único para serviços e comércio.',
  'Uma nova regra pode mudar a base de cálculo em situações específicas.',
  'O comercial sugere descontar CBS como se fosse IRPJ.',
  'O contador prepara cenários de apuração de renda.',
  'O cliente afirma que basta comparar as alíquotas do IVA.',
  'Uma empresa escolhe Lucro Real sem examinar margem e créditos.',
  'Um prestador no Presumido pergunta sobre créditos de IBS/CBS.'
 ],
 '11': [
  'O ERP emite NF-e e NFS-e que alimentam os dados de apuração dos novos tributos.',
  'Um cliente recebe proposta de apuração calculada a partir de documentos fiscais.',
  'O cadastro de produtos contém NCM e descrições incompletas.',
  'O escritório identifica diferença entre notas emitidas e recebidas no mês.',
  'A declaração preliminar apresenta saldo que não coincide com o controle interno.',
  'Uma empresa confere uma nota autorizada antes de registrar o crédito.',
  'Um item foi cadastrado na classificação errada.',
  'O sistema oferece apuração assistida, e o gerente cogita não conferir nada.',
  'A tesouraria possui extrato bancário, mas não localiza alguns XMLs.',
  'O setor fiscal revisa classificações de mercadorias e serviços.',
  'Um fornecedor enviou arquivo fiscal cuja autorização ainda não foi confirmada.',
  'A equipe saneia cadastros antes de transmitir novos documentos.',
  'O responsável compara o conjunto de notas de entrada e saída.',
  'O ERP sugere tratamento idêntico para itens de regimes distintos.',
  'O escritório acompanha comunicados de leiaute e prazos oficiais.'
 ],
 '12': [
  'Uma venda no cartão terá liquidação financeira com possível segregação de IBS/CBS.',
  'O contador precisa fechar valores entre nota, relatório da credenciadora e banco.',
  'No exemplo do curso, uma nota totaliza R$ 12.791, com tributos e taxa de cartão informados.',
  'A empresa costumava usar o valor integral das vendas até o recolhimento mensal.',
  'Uma conciliação mostra valores distintos no XML, no relatório de cartão e no extrato.',
  'Um cliente acompanha o valor que realmente entrou na conta após a venda.',
  'A adquirente apresenta retenção tributária e taxa de serviço em linhas próprias.',
  'A equipe olha apenas o crédito bancário, sem consultar a nota.',
  'Após uma retenção na liquidação, o passivo fiscal precisa ser conferido.',
  'O exemplo do módulo mostra nota, tributos, taxa e valor líquido no banco.',
  'O financeiro registra uma taxa de cartão e uma CBS da mesma venda.',
  'Ao fechar o mês, há diferença de centavos no relatório da adquirente.',
  'A emissão da nota e o pagamento do cliente ocorrem em dias diferentes.',
  'O gerente acha que retenção financeira elimina qualquer conferência tributária.',
  'Uma implantação do split payment será feita por etapas e regras aplicáveis.'
 ],
 '13': [
  'O escritório quer oferecer diagnóstico da reforma a um cliente com vários tipos de operações.',
  'Um contador recebe muitos XMLs e extratos e procura automatizar a conferência.',
  'Uma carteira de clientes possui margens e perfis de fornecedores distintos.',
  'A equipe precisa transformar o diagnóstico em tarefas com responsáveis.',
  'Uma reunião apresenta ao cliente projeções de custo e tributação futura.',
  'Antes de propor medidas, o contador recebe documentos de compras e vendas.',
  'Uma rotina automática identifica operações classificadas como exceção.',
  'O escritório busca ordenar o atendimento por possível impacto econômico.',
  'Uma apresentação pretende aplicar a mesma solução a toda a carteira.',
  'O gestor monta cronograma para saneamento de cadastros e simulações.',
  'A planilha contém percentuais usados em cenários de estudo.',
  'O relatório inclui premissas que podem mudar no futuro.',
  'Um consultor revisa um documento antes de entregá-lo ao cliente.',
  'Há erros recorrentes nos cadastros de produtos.',
  'A diretoria escolhe regime tributário com base em uma única taxa nominal.'
 ]
};

// Casos de aplicação: os dados do enunciado são necessários para chegar à resposta.
// Percentuais numéricos são explicitamente hipóteses didáticas, não alíquotas universais.
const QUIZ_CASES = {
 '01': [
  ['Uma indústria vende um bem por R$ 1.000 antes dos tributos. Em uma simulação didática, a CBS é 9,21% e o IBS é 18,70%.', 'Qual total da nota nesse exemplo por fora?', ['R$ 1.279,10','R$ 1.092,10','R$ 1.187,00','R$ 1.000,00'],0,'CBS de R$ 92,10 e IBS de R$ 187,00 somam R$ 279,10 ao valor da operação.'],
  ['Um cliente afirma que a reforma criou apenas um tributo chamado IBS. A empresa vende em vários estados.', 'Qual correção explica melhor a arquitetura?', ['Há CBS federal e IBS compartilhado, além do Seletivo nas hipóteses legais','A CBS é parcela municipal do IBS','O IBS é tributo federal de renda','O Seletivo substitui toda a CBS'],0,'O modelo é dual: CBS e IBS têm competências distintas.'],
  ['Uma fábrica cogita instalar um depósito longe dos consumidores apenas para obter incentivo na origem.', 'Qual princípio ajuda a avaliar a distorção dessa decisão?', ['Neutralidade','Progressividade do IR','Presunção de lucro','Regime de caixa'],0,'A neutralidade busca reduzir escolhas motivadas artificialmente por tributos.'],
  ['Um produtor vende item potencialmente nocivo à saúde. O ERP já apura CBS e IBS.', 'O que precisa ser examinado adicionalmente?', ['Se o item está sujeito ao Imposto Seletivo','Se o IBS vira IRPJ','Se a CBS é sempre zerada','Se a nota deixa de ser necessária'],0,'O Imposto Seletivo é tributo distinto nas hipóteses legais.'],
  ['Uma proposta usa 27,91% em todas as operações de uma rede, inclusive itens reduzidos e cidades diferentes.', 'Qual revisão deve ser feita antes de apresentar o resultado?', ['Verificar ano, destino, item e regime; 27,91% é premissa do exemplo','Manter a taxa porque é universal','Trocar tudo por 0,1%','Considerar somente o faturamento'],0,'A alíquota aplicável depende da operação e do período.']
 ],
 '02': [
  ['Uma loja em Campinas envia mercadoria para entrega ao comprador final em Recife.', 'Qual local deve ser examinado para a operação com bem móvel?', ['O local da entrega ao destinatário','Campinas por ser origem','A sede do contador','O banco que recebe o Pix'],0,'Para bem móvel corpóreo, a entrega ao destinatário é o critério legal relevante.'],
  ['Uma empresa sediada em Belo Horizonte vende imóvel situado em Salvador.', 'Qual localização é decisiva para essa operação?', ['Salvador, onde está o imóvel','Belo Horizonte, sede do vendedor','Local do cartório em qualquer caso','Local da conta bancária'],0,'A situação física do imóvel orienta o local da operação.'],
  ['Uma passagem leva o cliente de Curitiba até São Paulo.', 'Qual ponto deve ser verificado para o transporte de passageiros?', ['O início da viagem em Curitiba','O fim em São Paulo sempre','A sede da companhia','A residência do motorista'],0,'O transporte de passageiros possui regra espacial ligada ao início.'],
  ['Um prestador vende serviço digital a empresa com estabelecimento tomador em Fortaleza, embora o servidor esteja em São Paulo.', 'Qual dado exige validação para aplicar a regra de destino?', ['O estabelecimento adquirente/tomador em Fortaleza','Somente o servidor em São Paulo','O endereço do desenvolvedor','A cidade da adquirente de cartão'],0,'A localização do adquirente pode ser decisiva no serviço digital.'],
  ['Uma nota foi emitida para município errado; o IBS combina parcela estadual e municipal.', 'Qual risco direto aparece na apuração?', ['Aplicar destino e alíquotas incorretos','Alterar automaticamente a margem contábil','Converter IBS em IRPJ','Eliminar a CBS'],0,'O destino informado influencia a composição do IBS.']
 ],
 '03': [
  ['Uma máquina foi contratada em janeiro, entregue em março e paga no ato da entrega, sem adiantamento.', 'Qual evento se aproxima da regra geral do fato gerador?', ['O fornecimento em março','A assinatura em janeiro em todos os casos','O encerramento anual','A aprovação da DRE'],0,'A regra geral liga o fato gerador ao fornecimento.'],
  ['Em exercício didático, um cliente antecipa 30% de R$ 10.000 antes do fornecimento. Suponha taxa combinada hipotética de 27,91% sobre essa parcela.', 'Qual tributo antecipado resulta dessa premissa?', ['R$ 837,30','R$ 2.791,00','R$ 3.000,00','R$ 279,10'],0,'R$ 3.000 × 27,91% = R$ 837,30; a aplicação real segue as regras do ano.'],
  ['Uma operação do exercício gerou R$ 2.791 de tributo total e R$ 837,30 já foram antecipados.', 'Qual saldo aritmético resta no ajuste final?', ['R$ 1.953,70','R$ 3.628,30','R$ 837,30','R$ 2.791,00'],0,'2.791 − 837,30 = 1.953,70.'],
  ['Uma assinatura de manutenção é executada mensalmente e o cliente paga parcelas em datas diferentes.', 'Qual controle fiscal é mais útil?', ['Relacionar etapas fornecidas, pagamentos e documentos','Tributar o contrato inteiro sempre no primeiro dia','Ignorar recebimentos antecipados','Usar apenas o saldo bancário anual'],0,'A execução continuada requer conciliação temporal.'],
  ['O comercial registrou sinal em fevereiro e entrega em maio, mas o sistema apurou o tributo integral nos dois momentos.', 'Qual problema deve ser investigado?', ['Duplicidade por falta de ajuste da antecipação','Ausência de contrato social','Erro no IRPJ presumido','Falta de classificação NCM de folha'],0,'O ajuste final deve levar em conta o que foi antecipado.']
 ],
 '04': [
  ['Uma nota tem mercadoria de R$ 10.000, frete cobrado de R$ 800 e desconto incondicional destacado de R$ 500.', 'Qual base comercial resulta para o exemplo antes de outros tributos?', ['R$ 10.300','R$ 10.800','R$ 9.500','R$ 11.300'],0,'10.000 + 800 − 500 = 10.300.'],
  ['Na mesma operação, a base comercial é R$ 10.300 e o Imposto Seletivo hipotético é 10% dessa base; suponha que ele integre a base de IBS/CBS.', 'Qual base resulta para IBS/CBS?', ['R$ 11.330','R$ 10.300','R$ 1.030','R$ 12.360'],0,'IS de R$ 1.030 somado a R$ 10.300 resulta em R$ 11.330.'],
  ['Um serviço tem valor de R$ 2.000 antes dos novos tributos. Para o exercício, aplique 10% por fora, sem outros componentes.', 'Qual total da nota?', ['R$ 2.200','R$ 2.222,22','R$ 2.000','R$ 200'],0,'2.000 + 10% de 2.000 = 2.200.'],
  ['O comercial oferece abatimento de R$ 100 apenas se o cliente pagar até certa data.', 'Qual cautela na base de cálculo?', ['Analisar como desconto condicionado, sem dedução automática','Deduzir sempre como incondicional','Somar ao IBS destacado','Tratar como crédito de IRPJ'],0,'A condição futura impede tratá-lo automaticamente como desconto incondicional.'],
  ['O ERP calcula CBS sobre o valor da operação mais a própria CBS destacada.', 'Qual ajuste corresponde à lógica por fora?', ['Excluir a própria CBS da sua base','Somar IBS duas vezes','Usar lucro anual como base','Substituir a base pelo saldo bancário'],0,'Os próprios IBS/CBS não integram suas bases.']
 ],
 '05': [
  ['Uma compradora no regime regular recebe cotação com preço total de R$ 12.791; R$ 2.791 são créditos de IBS/CBS efetivamente aproveitáveis.', 'Qual custo efetivo da aquisição?', ['R$ 10.000','R$ 15.582','R$ 12.791','R$ 2.791'],0,'Custo efetivo = valor da nota − crédito aproveitável.'],
  ['A mesma cotação de R$ 12.791 é feita para compradora no Simples padrão, sem outros créditos considerados.', 'Qual custo de referência no comparador?', ['R$ 12.791','R$ 10.000','R$ 2.791','R$ 15.582'],0,'No Simples padrão, não se apropria o crédito regular dessas aquisições.'],
  ['Um fornecedor no Simples padrão vende por R$ 11.000. A hipótese didática admite R$ 422,40 de crédito transferível ao comprador regular.', 'Qual custo efetivo do comprador?', ['R$ 10.577,60','R$ 11.422,40','R$ 8.208,00','R$ 11.000,00'],0,'11.000 − 422,40 = 10.577,60.'],
  ['Uma optante pelo Simples quer creditar IBS/CBS de compras e transferir aos clientes os valores do regime regular.', 'Qual opção precisa avaliar?', ['Apurar IBS/CBS no regime regular (híbrido)','Permanecer no DAS padrão sem mudanças','Trocar CBS por IRPJ','Emitir nota sem tributos'],0,'O híbrido separa IBS/CBS do DAS e segue o regime regular para esses tributos.'],
  ['Um sistema tenta compensar crédito de CBS de R$ 500 com débito de IBS de R$ 700.', 'Qual correção deve ser feita?', ['Manter apurações e créditos segregados','Compensar sem restrição','Transformar ambos em ISS','Usar o saldo de IRPJ'],0,'CBS e IBS não têm créditos intercambiáveis.']
 ],
 '06': [
  ['Um produto elegível tem alíquota didática de 20% e redução legal de 60%.', 'Qual percentual resta neste exemplo?', ['8%','12%','20%','0%'],0,'20% × 40% = 8%.'],
  ['Outro item enquadrado tem alíquota didática de 20% e redução de 30%.', 'Qual taxa resultante?', ['14%','6%','30%','20%'],0,'20% × 70% = 14%.'],
  ['Uma farmácia vende dois itens com classificações fiscais diferentes. Um está em hipótese reduzida e o outro não.', 'Qual procedimento é adequado?', ['Enquadrar cada item na hipótese legal própria','Aplicar a menor taxa a toda a nota','Aplicar taxa da atividade do vendedor a tudo','Ignorar a classificação'],0,'O tratamento depende do item e da operação.'],
  ['Um cliente chama duas situações de “isentas”: uma é imunidade constitucional e outra é alíquota zero legal.', 'Qual conclusão é mais segura?', ['Separar fundamentos e efeitos sobre créditos','Tratar ambas como idênticas sem análise','Aplicar 27,91% em ambas','Usar somente o preço de venda'],0,'Institutos distintos podem ter efeitos distintos.'],
  ['Uma operação está em regime específico de tributação.', 'O que fazer antes de usar o crédito padrão da calculadora?', ['Conferir regras próprias de base, alíquota e crédito','Usar sempre crédito cheio','Zerar a nota','Tomar a taxa do fornecedor'],0,'Regimes específicos exigem enquadramento separado.']
 ],
 '07': [
  ['Uma empresa quer comparar 2027, 2029 e 2033 na mesma compra. A planilha mantém a composição de tributos fixa.', 'Qual falha metodológica existe?', ['Ignorar as etapas anuais da transição','Usar valor de compra positivo','Mostrar três anos','Calcular o custo efetivo'],0,'Os tributos antigos e novos mudam ao longo da transição.'],
  ['Um relatório afirma que ICMS e ISS foram totalmente extintos em 2027.', 'Qual ano marca o modelo integral no cronograma principal do curso?', ['2033','2027','2028','2029'],0,'A substituição é gradual, com marco geral em 2033.'],
  ['O ERP foi parametrizado para aplicar a parcela cheia hipotética de IBS em 2027 e 2028.', 'Qual correção é necessária?', ['Usar as regras da fase inicial aplicáveis a esses anos','Manter taxa cheia em todos os anos','Ignorar CBS','Trocar IBS por IRPJ'],0,'2027 e 2028 são anos iniciais, distintos da fase plena.'],
  ['A equipe projeta uma venda em 2029, quando começa a etapa gradual de ICMS/ISS.', 'Que componentes devem ser analisados?', ['Remanescentes antigos e avanço do IBS','Apenas IRPJ','Só o IBS integral de 2033','Nenhum imposto antigo'],0,'A transição combina componentes antigos e novos.'],
  ['Uma tabela usa CBS 9,21% e IBS 18,70% para exercícios e escreve “alíquota oficial obrigatória” no cabeçalho.', 'Qual ajuste de apresentação é correto?', ['Identificar esses valores como premissas didáticas','Remover o ano da simulação','Aplicar em todos os destinos sem ressalva','Somar 9,21 a 18,70 novamente'],0,'Os valores do projeto são hipóteses de simulação.']
 ],
 '08': [
  ['Uma venda atual de R$ 100.000 tem tributos e deduções didáticos de R$ 27.250.', 'Qual receita líquida de referência no exercício?', ['R$ 72.750','R$ 127.250','R$ 27.250','R$ 100.000'],0,'100.000 − 27.250 = 72.750.'],
  ['A receita líquida alvo é R$ 72.750 e os custos permanecem R$ 45.000.', 'Qual lucro bruto do exercício?', ['R$ 27.750','R$ 117.750','R$ 45.000','R$ 72.750'],0,'72.750 − 45.000 = 27.750.'],
  ['Um fornecedor cobra R$ 10.000, mas a compradora aproveita R$ 1.000 em créditos permitidos.', 'Qual custo efetivo para a compradora?', ['R$ 9.000','R$ 11.000','R$ 10.000','R$ 1.000'],0,'O crédito recuperável reduz o custo econômico.'],
  ['Uma simulação reduz o preço bruto da nota, preserva receita líquida e mantém os custos.', 'O que se pode concluir sobre o lucro bruto do exemplo?', ['Permanece igual sob essas premissas','Cai necessariamente na mesma proporção do preço','Zera automaticamente','Depende apenas do IBS'],0,'Lucro bruto = receita líquida − custos.'],
  ['A equipe apresenta 40% de margem sem indicar se a base é preço bruto ou receita líquida.', 'Qual dado falta para interpretar o percentual?', ['A base usada no cálculo da margem','O CEP da empresa','O banco do cliente','A cor do gráfico'],0,'Percentuais precisam de denominador definido.']
 ],
 '09': [
  ['Uma gráfica no Simples vende principalmente a indústrias que aproveitam créditos nas compras.', 'Qual alternativa merece comparação detalhada?', ['Simples padrão versus opção regular de IBS/CBS','Apenas cor do DAS','Só o ISS antigo','Desativar documentos fiscais'],0,'O perfil B2B pode mudar a competitividade das alternativas.'],
  ['Uma optante no DAS padrão recebeu nota de compra com CBS/IBS calculados.', 'Qual cuidado ao estimar seu custo?', ['Não presumir crédito regular das aquisições','Descontar sempre a alíquota cheia','Creditar apenas a CBS sem análise','Tratar nota como venda'],0,'O Simples padrão não apropria créditos de compra como o regime regular.'],
  ['Fornecedor no Simples padrão vende por R$ 1.000 e o crédito transferível hipotético ao comprador regular é R$ 30.', 'Qual custo efetivo do comprador?', ['R$ 970','R$ 1.030','R$ 1.000','R$ 30'],0,'1.000 − 30 = 970.'],
  ['Uma empresa opta pelo híbrido para IBS/CBS e permanece optante pelo Simples nas demais parcelas.', 'Qual configuração de apuração corresponde à escolha?', ['IBS/CBS regulares e DAS residual','Tudo exclusivamente no DAS','Todos os tributos fora do Simples','Somente IBS fora, sem CBS'],0,'A opção híbrida separa IBS/CBS do recolhimento unificado.'],
  ['Dois cenários têm DAS residual diferente, créditos de compra e preços de venda distintos.', 'Qual comparação ajuda a decidir?', ['Resultado completo com tributos, créditos e clientes','Só o valor nominal do DAS','Apenas a quantidade de empregados','Somente o ano de abertura'],0,'A escolha depende da cadeia e do resultado econômico.']
 ],
 '10': [
  ['Uma clínica no Lucro Presumido informa que a reforma mudou IBS/CBS, mas quer saber se IRPJ e CSLL desapareceram.', 'Qual resposta orienta a análise?', ['IRPJ/CSLL continuam e devem ser avaliados separadamente','CBS substitui automaticamente IRPJ','IBS substitui CSLL','Só resta o DAS'],0,'Tributos sobre renda não são substituídos pelo IVA dual.'],
  ['Uma empresa tem margem efetiva diferente da base presumida e considera migrar para o Lucro Real.', 'Que informação é essencial na comparação?', ['Lucro, base de IRPJ/CSLL e efeitos de créditos','Somente a CBS nominal','Só o endereço do cliente','A cor da DRE'],0,'A escolha requer análise econômica e fiscal ampla.'],
  ['Comércio e serviços possuem atividades distintas, mas a planilha usa um único percentual de presunção.', 'Qual revisão é necessária?', ['Identificar percentuais aplicáveis por atividade','Manter a taxa única sempre','Aplicar IBS no lugar da presunção','Ignorar a receita'],0,'A presunção depende do enquadramento legal da atividade.'],
  ['Duas empresas, uma no Presumido e outra no Real, compram insumo creditável no regime regular de IBS/CBS.', 'Qual ideia não deve ser confundida?', ['Regime de renda e regras de crédito de consumo são análises distintas','Só o Real pode ter qualquer crédito de IBS/CBS','O Presumido é o DAS','O crédito de IBS é IRPJ'],0,'A forma de apurar IRPJ não elimina por si a lógica regular de IBS/CBS.'],
  ['O consultor apresenta comparação LP x LR baseada apenas em 27,91% de IBS/CBS didáticos.', 'Qual dimensão foi omitida?', ['Apuração de IRPJ/CSLL, margens e condições legais','Apenas o logotipo','Só o CNPJ do contador','A cor da nota'],0,'A comparação de regimes precisa incluir tributos sobre renda.']
 ],
 '11': [
  ['Um XML de compra aparece no ERP, mas a autorização fiscal não foi confirmada.', 'Qual passo deve preceder o uso do documento na conferência de créditos?', ['Verificar validade/autorização e dados fiscais','Creditar imediatamente sem exame','Apagar a nota do fornecedor','Usar só o extrato'],0,'A qualidade do documento é requisito da apuração.'],
  ['Uma mercadoria foi cadastrada em NCM incorreta e a nota usa tratamento reduzido.', 'Qual risco a equipe deve avaliar?', ['Alíquota e crédito calculados a partir de classificação inadequada','Apenas alteração do nome fantasia','Fim automático do IRPJ','Nenhum efeito fiscal'],0,'A classificação fiscal afeta o enquadramento.'],
  ['O saldo proposto pela apuração assistida difere do controle de notas do escritório.', 'Qual ação é mais adequada?', ['Conciliar documentos e retificar dados necessários','Aceitar sem revisão','Comparar apenas extrato bancário','Ignorar notas recebidas'],0,'A proposta deve ser conferida pelo contribuinte.'],
  ['Uma empresa emite notas sem preencher corretamente dados do adquirente e do item.', 'Qual melhoria previne erros futuros?', ['Saneamento cadastral antes da emissão','Corrigir só a DRE anual','Alterar a alíquota manualmente em todas as notas','Deixar o campo em branco'],0,'Corrigir os dados na origem melhora a apuração.'],
  ['O escritório possui notas de saída e entrada autorizadas, mas não as cruza.', 'Qual controle simples é útil?', ['Reconciliar débitos, créditos e XMLs do período','Somar apenas receitas no banco','Excluir entradas da análise','Dispensar classificação'],0,'O cruzamento revela divergências da apuração assistida.']
 ],
 '12': [
  ['Nota de venda: R$ 12.791. Na liquidação, o exemplo considera R$ 2.791 de tributos segregados e R$ 255,82 de taxa.', 'Quanto deve aparecer como crédito líquido no banco?', ['R$ 9.744,18','R$ 10.000','R$ 12.535,18','R$ 12.791'],0,'12.791 − 2.791 − 255,82 = 9.744,18.'],
  ['A credenciadora informa retenção tributária e taxa de cartão no mesmo relatório.', 'Como a contabilidade deve tratar esses valores?', ['Separar baixa do tributo e despesa da taxa','Registrar tudo como CBS','Tratar tudo como faturamento novo','Ignorar o extrato'],0,'A retenção e a taxa têm naturezas diferentes.'],
  ['O XML registra R$ 5.000, mas o relatório de liquidação e o crédito bancário não fecham após taxas e tributos.', 'Qual ação vem primeiro?', ['Conciliar cada componente e investigar a diferença','Ajustar o banco para igualar a nota sem evidência','Excluir o XML','Considerar todo valor como desconto'],0,'A conciliação tripla localiza a diferença.'],
  ['Uma venda foi faturada hoje, mas o cartão liquida dois dias depois.', 'Qual conta ajuda a acompanhar o intervalo?', ['Clientes/adquirente a receber','IRPJ a recuperar por padrão','Estoque em trânsito','Somente caixa imediato'],0,'O recebível liga a nota à liquidação futura.'],
  ['Com parte do tributo segregada na liquidação, o cliente pergunta por que entrou menos dinheiro no banco.', 'Que relatório explica o fluxo?', ['Nota, retenção, taxa e valor líquido conciliados','Somente o total da nota','Apenas a DRE do ano','Só a cotação do dólar'],0,'É preciso decompor o valor bruto até o crédito bancário.']
 ],
 '13': [
  ['Um escritório atende comércio, indústria e serviços; quer priorizar revisão da reforma.', 'Qual diagnóstico inicial é mais útil?', ['Mapear operações, regimes, compras, vendas e dados fiscais','Aplicar uma alíquota única a todos','Escolher só o maior faturamento','Excluir clientes do Simples'],0,'O diagnóstico precede a recomendação.'],
  ['A equipe recebe 10 mil XMLs e detecta centenas de classificações inconsistentes.', 'Qual papel adequado da automação?', ['Triar divergências e encaminhar exceções para revisão','Aprovar todo crédito sem auditoria','Substituir a lei','Ocultar os dados de origem'],0,'A automação reduz retrabalho, mas não substitui julgamento.'],
  ['Uma carteira tem empresas com grandes compras B2B e outras só vendem a consumidores finais.', 'Qual indicador ajuda a segmentar a análise?', ['Créditos potenciais, custo efetivo e perfil dos clientes','Apenas número de notas','Só idade do sócio','Uma taxa nominal para todos'],0,'O impacto depende das cadeias de aquisição e venda.'],
  ['Um relatório lista 20 melhorias, mas não informa quem fará cada uma nem até quando.', 'O que falta no plano de ação?', ['Responsáveis, prazos e critérios de validação','Uma capa mais colorida','Mais siglas sem definição','Só o nome da reforma'],0,'Execução requer dono, prazo e evidência.'],
  ['O cliente recebeu simulação com alíquota didática, mas vai tomar decisão contratual real.', 'O que o contador deve explicitar?', ['Premissas, limitações e dados a validar na operação concreta','Que o resultado é garantido','Que não existe risco de mudança','Somente a porcentagem final'],0,'Cenários educacionais precisam de enquadramento antes do uso prático.']
 ]
};

for(const [module,contexts] of Object.entries(QUIZ_CONTEXT)){
 QUIZ_BANK[module].contexts={m:contexts.slice(0,5),v:contexts.slice(5)};
 QUIZ_BANK[module].c=QUIZ_CASES[module];
}
if(typeof module!=='undefined'&&module.exports)module.exports=QUIZ_BANK;
