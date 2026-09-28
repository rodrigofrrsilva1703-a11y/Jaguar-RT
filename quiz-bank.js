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
if(typeof module!=='undefined'&&module.exports)module.exports=QUIZ_BANK;
