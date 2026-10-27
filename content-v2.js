const STUDY_MODULES = [
  {
    "id": "01",
    "title": "Fundamentos da Reforma: IVA Dual, CBS, IBS e Neutralidade",
    "subtitle": "Entenda por que a Reforma criou CBS e IBS, como funciona o IVA Dual e o que significa neutralidade tributária.",
    "blocks": [
      {
        "t": "O que é o IVA Dual",
        "x": "Em linguagem simples: a Reforma troca vários tributos sobre o consumo por uma estrutura coordenada de CBS e IBS, com regras nacionais mais uniformes.\n\nO modelo tradicional de tributação sobre o consumo no Brasil caracterizava-se por uma profunda fragmentação de competências: a União arrecadava PIS, Cofins e IPI; os 26 Estados e o DF administravam legislações autônomas de ICMS; e mais de 5.500 Municípios disciplinavam suas respectivas leis do ISS. Essa multiplicidade gerava severa cumulatividade disfarçada (efeito cascata), insegurança jurídica estrutural e distorções concorrenciais.\nA Emenda Constitucional nº 132/2023 adotou a metodologia internacional do Imposto sobre Valor Agregado (IVA), estruturado sob a modalidade Dual. A dualidade preserva a autonomia do pacto federativo sem fragmentar as regras do tributo: a CBS (Contribuição sobre Bens e Serviços) é de competência federal (premissa didática de 9,21% neste curso), enquanto o IBS (Imposto sobre Bens e Serviços) é compartilhado entre Estados e Municípios (premissa didática de 18,70% neste curso), totalizando 27,91% na hipótese didática. Ambos compartilham idêntico fato gerador, base de cálculo, regimes específicos e regras de creditamento disciplinados pela Lei Complementar nº 214/2025. Complementarmente, foi instituído o Imposto Seletivo (IS), tributo federal de natureza extrafiscal com incidência monofásica, destinado a desestimular o consumo de bens e serviços nocivos à saúde ou ao meio ambiente.",
        "k": "ESTUDO",
        "id": "01-01"
      },
      {
        "t": "Sistema fragmentado × IVA Dual",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nCinco tributos distintos (PIS, Cofins, IPI, ICMS e ISS), cada um com sua própria lei, regulamento estadual ou código tributário municipal. A cumulatividade era frequente: o imposto pago em uma etapa integrava o custo da mercadoria na etapa seguinte, gerando tributação sobre tributo e bitributação de operações mistas (como mercadorias acompanhadas de prestação de serviços).\nExemplo Prático Antigo: Uma indústria de autopeças comprava maquinário ou pagava energia elétrica de sua sede administrativa e frequentemente via os créditos de ICMS ou PIS/Cofins serem glosados pelo Fisco, que alegava falta de contato físico direto com o produto fabril. O imposto virava custo embutido no preço da peça.\nCOMO É AGORA (REFORMA TRIBUTÁRIA)\nUnificação técnica em dois tributos coordenados (CBS federal e IBS subnacional) que obedecem a uma única Lei Complementar nacional. Vigora a Não Cumulatividade Plena (Crédito Financeiro): aquisições elegíveis podem gerar crédito conforme os requisitos legais, e o tributo incide estritamente sobre a riqueza adicionada em cada elo da cadeia produtiva.\nExemplo Prático Atual: A mesma indústria de autopeças fatura a peça usando a premissa didática de 27,91% e, nas aquisições que forem tributadas e creditáveis, pode aproveitar os créditos de IBS/CBS permitidos pela legislação. Assim, o exemplo mostra a lógica de tributação do valor adicionado sem sugerir crédito automático em toda despesa.",
        "k": "COMPARATIVO",
        "id": "01-02"
      },
      {
        "t": "Regras principais e Governança",
        "x": "* Governança atualizada: a LC 227/2026 instituiu e disciplinou o Comitê Gestor do IBS (CGIBS), inclusive processo administrativo e distribuição da arrecadação aos Estados, Municípios e DF. A LC 214/2025 permanece como marco central das regras do IBS/CBS, alterada por normas posteriores.\n* Regulamento federal: o Decreto nº 12.955/2026 regulamenta a CBS. A aplicação prática exige consultar o texto consolidado, inclusive alterações posteriores, além dos atos técnicos RFB/CGIBS.\n* Princípio da neutralidade: decisões econômicas não devem ser distorcidas artificialmente pela tributação, observadas as exceções e regimes específicos previstos em lei.\n* Atenção: as alíquotas CBS 9,21% e IBS 18,70% usadas nas ferramentas do JAGUAR RT são premissas ilustrativas, nunca instruções de emissão de documentos fiscais.",
        "k": "ESTUDO",
        "id": "01-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: Mantido na Constituição. A empresa continua no regime simplificado pelo DAS, mas ganha a prerrogativa de optar por apurar CBS e IBS no Regime Regular (fora do DAS), mantendo no Simples apenas os tributos federais e previdenciários (regime híbrido).\nExemplo: Pequena fábrica de ferragens faturando R$ 80.000,00/mês pode optar pelo regime regular de CBS/IBS para transferir créditos integrais a construtoras clientes.\n* Lucro Presumido: Perde o benefício do PIS/Cofins cumulativo a 3,65%. Na esfera do consumo, a entidade passa compulsoriamente a apurar CBS (9,21%) e IBS (18,70%) no Regime Regular, apropriando créditos de compras e destacando 27,91% nas vendas.\nExemplo: Clínica médica no Presumido com faturamento de R$ 200.000,00/mês apura o IVA Dual pelas regras gerais, mantendo a presunção legal de 32% apenas para IRPJ e CSLL.\n* Lucro Real: A lógica de crédito financeiro amplo reduz discussões do modelo antigo, mas cada aquisição ainda precisa cumprir os requisitos legais de creditamento. A premissa de 27,91% só vale, no curso, para operações integralmente tributadas pela alíquota didática.\nExemplo: Metalúrgica no Lucro Real credita-se de 27,91% sobre softwares de gestão, aluguéis de galpões, energia e consultorias corporativas.",
        "k": "REGIMES",
        "id": "01-04"
      },
      {
        "t": "A Não Cumulatividade do IVA Dual na Cadeia Produtiva",
        "x": "Cadeia produtiva entre Indústria e Distribuidor com agregação de valor comercial (Premissas didáticas: CBS = 9,21% | IBS = 18,70% | Alíquota Combinada = 27,91%):\n* Etapa 1 (Indústria): Venda de matéria-prima por R$ 10.000,00 líquidos.\n* Destaque de CBS (9,21%): R$ 921,00\n* Destaque de IBS (18,70%): R$ 1.870,00\n* Total da Nota Fiscal Emitida: R$ 12.791,00 (Total recolhido aos cofres públicos: R$ 2.791,00).\n* Etapa 2 (Distribuidor): Revenda com agregação de R$ 5.000,00 de valor comercial (preço líquido faturado de R$ 15.000,00).\n* Débito Bruto de CBS apurado (9,21% de R$ 15.000,00): R$ 1.381,50\n* Débito Bruto de IBS apurado (18,70% de R$ 15.000,00): R$ 2.805,00\n* Subtotal do Débito Bruto: R$ 4.186,50\n* (-) Crédito Financeiro Integral da Etapa 1: R$ 2.791,00 (CBS R$ 921,00 + IBS R$ 1.870,00)\n* Imposto Líquido Efetivo a Recolher: R$ 1.395,50.\nAnálise Técnica: O valor efetivamente recolhido pelo distribuidor (R$ 1.395,50) equivale exatamente a 27,91% sobre a riqueza nova de R$ 5.000,00 adicionada por ele (R$ 5.000,00 × 27,91% = R$ 1.395,50).",
        "k": "EXEMPLO NUMÉRICO",
        "id": "01-05"
      },
      {
        "t": "Próximo passo: Módulo 2",
        "x": "Estabelecido que o IVA Dual incide exclusivamente sobre o valor adicionado de cada etapa, torna-se necessário definir a sua dimensão espacial: a qual jurisdição política pertence o produto da arrecadação e como se determina a alíquota aplicável em operações interestaduais ou municipais? Esse é o objeto do Princípio do Destino.",
        "k": "PRÓXIMA ETAPA",
        "id": "01-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "02",
    "title": "Princípio do Destino: onde o IBS é devido",
    "subtitle": "Aprenda a identificar o local da operação e por que o destino do consumo influencia o IBS.",
    "blocks": [
      {
        "t": "O destino da operação",
        "x": "Em linguagem simples: o IBS segue a lógica do destino; primeiro descubra onde a operação é considerada consumida e só depois pense na alíquota.\n\nNo ordenamento revogado, a partilha tributária apoiava-se predominantemente no Princípio da Origem: o imposto pertencia ao Estado ou Município onde a mercadoria era fabricada ou de onde o serviço era despachado. Essa estrutura incentivava a guerra fiscal, caracterizada pela concessão unilateral de créditos presumidos e desonerações de ICMS para atrair investimentos fabris e centros de distribuição artificiais, descolados da logística de consumo.\nA Reforma consagrou o Princípio do Destino Pleno: a arrecadação pertence integralmente ao ente federativo onde ocorre o consumo efetivo do bem ou onde reside o tomador do serviço. A localização da fábrica ou a sede do prestador perde qualquer relevância para a fixação da alíquota e destinação da receita, extinguindo as vantagens competitivas baseadas em benesses fiscais.",
        "k": "ESTUDO",
        "id": "02-01"
      },
      {
        "t": "Origem × destino da operação",
        "x": "COMO ERA ANTES (SISTEMA ANTERIOR)\nNas operações interestaduais, ICMS pode envolver alíquota interestadual, DIFAL e regras específicas de partilha entre origem e destino. Exemplo: uma empresa de comércio eletrônico em São Paulo vende a consumidor de Salvador e precisa avaliar os tributos estaduais aplicáveis.\nCOMO FICA NO MODELO DA REFORMA\nO IBS segue o princípio do destino, com regras nacionais de local da operação e atribuição da receita ao Estado e Município de destino. A CBS tem competência federal. A alíquota depende do ano, ente tributante e hipótese legal, com transição até 2033; não existe orientação para destacar automaticamente CBS 9,21% e IBS 18,70% em toda NF-e.\nExemplo didático: no e-commerce, o sistema deve identificar corretamente o destino, a natureza da operação e as alíquotas aplicáveis na data. A dispensa de obrigações antigas só ocorre conforme seu cronograma de extinção, não imediatamente em 2026 ou 2027.",
        "k": "COMPARATIVO",
        "id": "02-02"
      },
      {
        "t": "Regras principais dos Critérios de Localização (Art. 11 da LC 214/2025)",
        "x": "* Bens Móveis Corpóreos: Local da entrega física ou disponibilização do bem ao destinatário final.\n* Bens Imóveis e Obras: Local da situação física do imóvel.\n* Serviços Presenciais e Eventos: Local da execução física presencial ou realização do evento.\n* Transporte de Cargas: Local da entrega da carga ao destinatário final.\n* Transporte de Passageiros: Local de início efetivo da viagem.\n* Serviços Digitais e Bens Imateriais: Domicílio principal do adquirente (para PJ, o estabelecimento tomador; para PF, a residência habitual).",
        "k": "ESTUDO",
        "id": "02-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: Para microempresas que vendem online para outros Estados, acaba a complexidade das guias GNRE de DIFAL interestaduais. No regime híbrido, o sistema emissor calcula diretamente o IBS do município do comprador.\nExemplo: Loja virtual no Simples sediada em Curitiba vendendo para Fortaleza aplica o IBS do Ceará e de Fortaleza automaticamente na nota fiscal.\n* Lucro Presumido: Prestadores de serviços encerram as disputas de bitributação entre a sede e o município tomador da LC 116/2003. A partilha é unificada pelo IBS.\nExemplo: Empresa de engenharia consultiva em SP prestando serviços remotos a uma mineradora em MG recolhe o IBS municipal diretamente para Belo Horizonte.\n* Lucro Real: Desmonte da logística artificial. Grandes companhias fecham centros de distribuição mantidos em locais remotos apenas por incentivos de ICMS e aproximam seus armazéns dos mercados consumidores.\nExemplo: Rede varejista reestrutura galpões logísticos baseando-se no custo de frete e prazo de entrega, não mais em renúncias fiscais estaduais.",
        "k": "REGIMES",
        "id": "02-04"
      },
      {
        "t": "Venda Interestadual de Serviços Digitais (SaaS)",
        "x": "Fornecedor de software em Florianópolis/SC comercializa licença mensal por R$ 1.000,00 líquidos para dois clientes com perfis distintos (Premissa didática combinada = 27,91%):\n* Cliente A: Pessoa Jurídica sediada em Belo Horizonte/MG\n* Critério Legal: Local do estabelecimento tomador corporativo (Belo Horizonte/MG).\n* Composição da Alíquota: CBS Federal (9,21%) + IBS Estadual MG (ex.: 15,50%) + IBS Municipal BH (ex.: 3,20%) = 27,91%.\n* Valor Faturado na Nota: R$ 1.000,00 (Líquido) + R$ 92,10 (CBS) + R$ 187,00 (IBS) = R$ 1.279,10.\n* Destino dos Recursos: R$ 92,10 para a União; R$ 155,00 para MG; R$ 32,00 para Belo Horizonte.\n* Cliente B: Pessoa Física residente em Salvador/BA\n* Critério Legal: Residência habitual do adquirente individual (Salvador/BA).\n* Composição da Alíquota: CBS Federal (9,21%) + IBS Estadual BA (ex.: 15,20%) + IBS Municipal Salvador (ex.: 3,50%) = 27,91%.\n* Valor Faturado na Nota: R$ 1.000,00 (Líquido) + R$ 92,10 (CBS) + R$ 187,00 (IBS) = R$ 1.279,10.\n* Destino dos Recursos: R$ 92,10 para a União; R$ 152,00 para a Bahia; R$ 35,00 para Salvador.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "02-05"
      },
      {
        "t": "Próximo passo: Módulo 3",
        "x": "Uma vez compreendidos os critérios espaciais e a fixação das alíquotas no destino, impõe-se a análise temporal: em qual momento jurídico exato a obrigação tributária se aperfeiçoa? Como a legislação disciplina adiantamentos financeiros e contratos continuados? Essas questões são respondidas no estudo do Fato Gerador e Temporalidade.",
        "k": "PRÓXIMA ETAPA",
        "id": "02-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "03",
    "title": "Fato Gerador: quando nasce o IBS/CBS",
    "subtitle": "Entenda em que momento surge o débito de IBS/CBS, inclusive em pagamentos antecipados e contratos continuados.",
    "blocks": [
      {
        "t": "Quando nasce o débito",
        "x": "Em linguagem simples: além de saber quanto cobrar de imposto, é preciso saber em que momento o débito nasce.\n\nNo cotidiano empresarial, a celebração de contratos, a transferência física de mercadorias e o fluxo financeiro de pagamentos frequentemente ocorrem em momentos temporais distintos. A legislação tributária precisa definir com precisão cirúrgica o marco em que a obrigação nasce, evitando tanto o diferimento indevido da arrecadação quanto a exigência prematura de tributo sobre negócios jurídicos não consolidados.\nNo regime de CBS e IBS, a regra geral ancora o fato gerador no fornecimento (tradição do bem móvel ou disponibilização do serviço). No entanto, quando há adiantamento financeiro anterior à entrega (como o pagamento de um sinal comercial), a lei reconhece a liquidez financeira do negócio e institui uma antecipação tributária proporcional. O ajuste definitivo ocorre no encerramento da operação, confrontando o imposto total com as antecipações recolhidas.",
        "k": "ESTUDO",
        "id": "03-01"
      },
      {
        "t": "Marcos separados × antecipação e ajuste",
        "x": "COMO ERA ANTES (SISTEMA ANTERIOR)\nICMS, ISS e contribuições federais possuíam marcos de incidência, regimes e regras distintas, exigindo conciliação entre faturamento, execução e recebimento.\nCOMO FUNCIONA A NOVA DISCIPLINA\nA LC 214/2025 prevê o fornecimento de bens/serviços como regra geral do momento de ocorrência do fato gerador, com tratamento para pagamentos antecipados, ajustes e situações especiais. A operacionalização do adiantamento exige observar os dispositivos aplicáveis, o documento fiscal pertinente e as alíquotas efetivas do ano.\nExemplo: indústria que recebe sinal por máquina sob encomenda registra o adiantamento, vincula o recebimento ao contrato e trata a antecipação de IBS/CBS conforme a norma. Em 2027, não cabe usar automaticamente IBS de 18,70%; o IBS transitório é de 0,1%, e a CBS deve observar a regra e a alíquota efetivamente aplicáveis.",
        "k": "COMPARATIVO",
        "id": "03-02"
      },
      {
        "t": "Regras principais (Art. 10 da LC 214/2025)",
        "x": "* Regra Geral de Fornecimento: O fato gerador ocorre na entrega do bem móvel material, transmissão do direito real ou conclusão do serviço.\n* Operações Continuadas (§ 3º): Em contratos de fornecimento contínuo (SaaS, telecomunicações, aluguéis, contabilidade), o fato gerador ocorre na exigibilidade da fatura ou no pagamento, o que vier primeiro.\n* Pagamentos Antecipados (§ 4º e § 5º): Pagamentos prévios disparam antecipação proporcional com a alíquota vigente na data do adiantamento.\n* Ajuste na Entrega Final: Confronto entre o imposto definitivo e as parcelas antecipadas. Distratos comerciais operam o estorno legal do tributo antecipado.",
        "k": "ESTUDO",
        "id": "03-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: o fim da opção pelo regime de caixa a partir de 2027 e as regras próprias de IBS/CBS devem ser analisados separadamente. Não presuma que cada recebimento represente automaticamente imposto integral devido pelo regime regular.\n* Lucro Presumido: o recebimento antecipado pode exigir tratamento tributário específico e emissão/ajuste documental; a alíquota efetiva de CBS/IBS depende do ano, operação e hipóteses legais, e não da soma didática de 27,91% em todos os casos.\n* Lucro Real: contratos com marcos de cobrança e entrega distintos exigem integração de financeiro, fiscal e ERP para identificar antecipações, fatos geradores, compensações e saldos efetivamente devidos.\nExemplo transversal: contrato com adiantamento de R$ 20.000,00 deve ser classificado e conciliado antes de definir documento, base e incidência, com revisão das regras de 2026–2033 aplicáveis na data.",
        "k": "REGIMES",
        "id": "03-04"
      },
      {
        "t": "Simulação de Pagamento Antecipado e Ajuste Final",
        "x": "EXEMPLO EXCLUSIVAMENTE DIDÁTICO PARA CENÁRIO HIPOTÉTICO DE 2033, com CBS 9,21% e IBS integral 18,70% (total 27,91%) assumidos pelo curso. Esses percentuais não são oficiais universais. Em 2027/2028, o IBS transitório é 0,1%; portanto, não replique este cálculo nesses anos.\nContrato sob encomenda de R$ 100.000,00, com antecipação de 30% (R$ 30.000,00) e entrega posterior, sem benefícios, créditos ou exceções.\nFase 1 — antecipação de R$ 30.000,00:\n* CBS didática: 9,21% × R$ 30.000,00 = R$ 2.763,00.\n* IBS didático: 18,70% × R$ 30.000,00 = R$ 5.610,00.\n* Montante ilustrativo associado à antecipação: R$ 8.373,00.\nFase 2 — fornecimento final de R$ 100.000,00:\n* CBS didática total: R$ 9.210,00; menos R$ 2.763,00 = R$ 6.447,00.\n* IBS didático total: R$ 18.700,00; menos R$ 5.610,00 = R$ 13.090,00.\n* Saldo ilustrativo restante: R$ 19.537,00.\nNa operação real, o tratamento do adiantamento depende de documentos, momento de incidência, compensações legalmente previstas, condições específicas e alíquotas aplicáveis. Este exemplo demonstra somente a mecânica aritmética de antecipação e abatimento.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "03-05"
      },
      {
        "t": "Próximo passo: Módulo 4",
        "x": "Compreendido o momento do fornecimento e o tratamento dos pagamentos antecipados, o próximo passo é identificar a base de cálculo e a alíquota efetivamente aplicáveis. O Módulo 4 diferencia preço, frete, descontos e Imposto Seletivo, utilizando exemplos didáticos sem tratar a premissa de 27,91% como taxa oficial universal.",
        "k": "PRÓXIMA ETAPA",
        "id": "03-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "04",
    "title": "Base de Cálculo: cálculo por fora e Imposto Seletivo",
    "subtitle": "Veja o que entra na base de cálculo, como funciona o cálculo por fora e onde o Imposto Seletivo interfere.",
    "blocks": [
      {
        "t": "Como identificar a base de cálculo",
        "x": "Em linguagem simples: antes de aplicar uma alíquota, descubra qual é a base correta; IBS e CBS são calculados por fora.\n\nO ordenamento tributário tradicional aplicava a sistemática de cálculo \"por dentro\" no ICMS e no ISS, integrando o próprio tributo na sua base de incidência. Essa técnica obscurecia o custo tributário real suportado pelo consumidor e exigia fórmulas matemáticas complexas de formação de preços (gross-up).\nA Reforma converteu o sistema para a metodologia internacional de cálculo \"por fora\": a base é o valor comercial da operação. Os tributos são adicionados de forma transparente sobre o valor líquido. O IBS e a CBS não integram a própria base de incidência. Por outro lado, o Imposto Seletivo (IS) compõe o valor da operação e, portanto, integra a base de cálculo do IBS e da CBS, caracterizando um encadeamento técnico legalmente previsto.",
        "k": "ESTUDO",
        "id": "04-01"
      },
      {
        "t": "Cálculo por dentro × cálculo por fora",
        "x": "COMO ERA ANTES (CÁLCULO POR DENTRO)\nDeterminados tributos podiam compor a própria base de cálculo. Exemplo meramente aritmético: para obter R$ 100,00 líquidos com taxa hipotética de 20% incluída no preço, o preço seria R$ 125,00 pela fórmula 100 ÷ (1 − 0,20).\nCOMO FUNCIONA O CÁLCULO POR FORA NO IVA DUAL\nA lógica da reforma busca destacar IBS/CBS de sua própria base conforme as regras legais. Em um cenário didático do modelo integral, com base de R$ 100,00 e alíquota combinada hipotética de 27,91% (CBS 9,21% + IBS 18,70%), o valor adicionado desses tributos seria R$ 27,91, totalizando R$ 127,91.\nOs valores não são alíquotas oficiais universais e não devem ser aplicados diretamente à emissão de NF-e/NFS-e sem considerar ano, base legal, tributos incluídos ou excluídos, destino e regras especiais.",
        "k": "COMPARATIVO",
        "id": "04-02"
      },
      {
        "t": "Regras principais (Art. 12 da LC 214/2025)",
        "x": "* Regra Geral: A base de cálculo é o valor total da operação de fornecimento.\n* Componentes que Integram a Base: Preço do bem ou serviço pactuado, fretes, seguros, despesas acessórias debitadas ao comprador, juros moratórios e descontos condicionais (dependentes de evento futuro).\n* Componentes que NÃO Integram a Base: O valor do próprio IBS e CBS, o IPI, os descontos incondicionais destacados no documento fiscal e, na transição (2026–2032), o ICMS, ISS e PIS/Cofins incidentes.\n* Incidência do Imposto Seletivo: O IS não está nas exclusões do art. 12. Portanto, o IS compõe o valor da operação e aumenta a base de cálculo de CBS e IBS.",
        "k": "ESTUDO",
        "id": "04-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: a formação do preço deve refletir se IBS/CBS são recolhidos dentro do DAS ou, por opção válida, no regime regular. Créditos e repasses dependem das regras vigentes; não basta multiplicar o preço pela alíquota didática.\n* Lucro Presumido: revisão de frete, descontos, local da operação e benefícios legais é essencial para calcular o preço e o valor líquido. Exemplo: prestadora de serviços avalia a base, classificação e eventual redução de alíquota antes de montar proposta comercial.\n* Lucro Real: atividades sujeitas ao Imposto Seletivo exigem classificação do produto, alíquota efetiva e tratamento legal da base de IBS/CBS. A hipótese CBS 9,21% + IBS 18,70% pode ajudar na simulação de 2033, mas não representa uma parametrização fiscal pronta para cada nota.\nConclusão: para qualquer regime, o cálculo por fora depende de base, alíquota da operação, ano e créditos legalmente admissíveis.",
        "k": "REGIMES",
        "id": "04-04"
      },
      {
        "t": "Formação do Faturamento da NF-e com Frete e Imposto Seletivo",
        "x": "EXERCÍCIO DIDÁTICO HIPOTÉTICO, NÃO UM MODELO DE NOTA FISCAL REAL. Pressupõe que a operação específica está sujeita a Imposto Seletivo hipotético de 10%, CBS didática de 9,21% e IBS didático integral de 18,70% (referência ilustrativa para o modelo integral, não para 2027). A incidência efetiva do IS depende do produto e da lei.\nParâmetros comerciais: mercadorias R$ 10.000,00; frete de R$ 800,00; desconto incondicional de R$ 500,00.\n1. Base comercial hipotética: R$ 10.000,00 + R$ 800,00 − R$ 500,00 = R$ 10.300,00.\n2. IS hipotético: 10% × R$ 10.300,00 = R$ 1.030,00.\n3. Para ilustrar a inclusão do IS na base considerada neste exercício: R$ 10.300,00 + R$ 1.030,00 = R$ 11.330,00.\n4. CBS didática: 9,21% × R$ 11.330,00 = R$ 1.043,49. IBS didático: 18,70% × R$ 11.330,00 = R$ 2.118,71.\n5. Total ilustrativo: R$ 10.300,00 + R$ 1.030,00 + R$ 1.043,49 + R$ 2.118,71 = R$ 14.492,20.\nO tratamento real deve ser refeito conforme produto, incidência do IS, composição legal da base, descontos, destino, ano, regimes e créditos. Não use este exercício para preencher campos de documentos fiscais.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "04-05"
      },
      {
        "t": "Próximo passo: Módulo 5",
        "x": "Compreendida a mensuração do débito gerado na emissão do documento fiscal, é fundamental examinar a contrapartida da operação: como o comprador apropria esses R$ 3.162,20 como crédito tributário? Quais os requisitos para o creditamento e como isso impacta o custo econômico das empresas? Essas regras estruturam o Módulo 5.",
        "k": "PRÓXIMA ETAPA",
        "id": "04-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "05",
    "title": "Créditos de IBS/CBS e Custo Efetivo das Compras",
    "subtitle": "Aprenda quando uma compra pode gerar crédito e como o crédito altera o custo econômico da aquisição.",
    "blocks": [
      {
        "t": "Crédito e custo econômico",
        "x": "Em linguagem simples: crédito reduz o custo econômico da compra, mas não nasce automaticamente em qualquer despesa.\n\nO modelo tradicional de créditos tributários no Brasil subordinava-se ao conceito de \"crédito físico\" ou vinculação estrita à industrialização ou revenda, vedando créditos sobre despesas gerais indispensáveis à atividade operacional (como material de expediente, telecomunicações e serviços administrativos). Isso gerava litígios tributários crônicos e cumulatividade de custos nas empresas.\nO IVA Dual adota uma não cumulatividade de base financeira ampla. Em regra, aquisições tributadas de bens e serviços vinculadas à atividade econômica podem gerar créditos de IBS e CBS, mas o aproveitamento depende dos requisitos legais aplicáveis, da idoneidade do documento fiscal, das vedações expressas e das regras de extinção do débito da operação anterior. Por isso, o imposto recuperável tende a deixar de compor o custo econômico da aquisição, sem que se possa presumir crédito automático em toda e qualquer compra.",
        "k": "ESTUDO",
        "id": "05-01"
      },
      {
        "t": "Crédito restritivo × crédito financeiro",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nO direito ao crédito dependia de intermináveis disputas sobre o conceito de \"insumo\". No ICMS, só gerava crédito a mercadoria para revenda ou matéria-prima que entrava em contato físico direto com o produto fabril. Gastos com materiais de escritório, telefonia, assessoria contábil, segurança privada e serviços de TI tinham crédito negado pelo Fisco, transformando-se em custo financeiro definitivo para a empresa.\nExemplo Prático Antigo: Uma empresa no Lucro Real pagava R$ 20.000,00 por mês em serviços de consultoria contábil e softwares de TI. O crédito de PIS/Cofins era questionado pela Receita Federal e o crédito de ICMS/ISS era zero. A empresa perdia 100% daquele montante tributário.\nCOMO É AGORA (REFORMA TRIBUTÁRIA)\nPrincípio do Crédito Financeiro Amplo: se a empresa realizar aquisição creditável e cumprir os requisitos legais, poderá apropriar os valores de IBS/CBS incidentes, conforme a alíquota aplicável, abatendo-o dos débitos de suas vendas.\nExemplo Prático Atual: Admitindo, para fins didáticos, que a consultoria e o software sejam aquisições tributadas e integralmente creditáveis à premissa padrão do curso, os R$ 20.000,00 podem gerar R$ 5.582,00 de créditos (CBS R$ 1.842,00 + IBS R$ 3.740,00), observados os requisitos legais de apropriação. O exemplo demonstra o efeito econômico do crédito, e não uma autorização automática para toda despesa.",
        "k": "COMPARATIVO",
        "id": "05-02"
      },
      {
        "t": "Regras principais (Arts. 41 a 57 da LC 214/2025)",
        "x": "* Método de Subtração Indireta: O contribuinte apropria créditos correspondentes ao montante exato de CBS e IBS destacado no documento fiscal eletrônico de aquisição.\n* Vedações Expressas de Crédito: Bens e serviços para uso pessoal de sócios/empregados, notas fiscais inidôneas e operações imunes/isentas sem previsão legal de manutenção.\n* Requisito de Extinção do Débito (Art. 48): Regra geral condiciona o crédito à extinção do débito na etapa anterior, com dispensa transitória até a consolidação do split payment.\n* Segregação Estrita: Crédito de CBS compensa exclusivamente CBS; crédito de IBS compensa exclusivamente IBS.",
        "k": "ESTUDO",
        "id": "05-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: No modelo padrão, o crédito transferível ao adquirente depende da parcela de IBS/CBS efetivamente devida dentro do Simples. Na opção pelo regime regular, os créditos seguem as regras gerais. Percentuais como 3,84% e 27,91% aparecem no curso apenas em hipóteses didáticas específicas.\nExemplo: Pequena gráfica com R$ 15.000 em papel e energia aproveita R$ 4.186,50 de créditos ao migrar para a opção híbrida.\n* Lucro Presumido: No regime regular de IBS/CBS, pode aproveitar créditos sobre aquisições tributadas e creditáveis conforme a legislação. A premissa de 27,91% é usada neste curso apenas quando a operação simulada estiver integralmente sujeita à alíquota padrão didática.\nExemplo: Transportadora no Presumido passa a creditar-se de 27,91% sobre combustíveis, pneus e peças de manutenção.\n* Lucro Real: A lógica financeira ampla reduz disputas sobre o antigo conceito de insumo, mas a empresa ainda precisa validar a natureza da operação, as vedações e os requisitos de cada crédito antes de sua apropriação no ERP.\nExemplo: Indústria multinacional encerra dezenas de processos tributários de discussão de insumos.",
        "k": "REGIMES",
        "id": "05-04"
      },
      {
        "t": "Análise Comparativa do Custo Efetivo de Aquisição",
        "x": "Uma indústria no Lucro Real (Regime Regular) cota serviços de consultoria técnica com valor líquido de R$ 10.000,00 perante dois fornecedores com regimes distintos:\nProposta A: Fornecedor enquadrado no Regime Regular (Lucro Real ou Presumido)\n* Preço líquido do serviço: R$ 10.000,00\n* Destaque de CBS (9,21%): R$ 921,00\n* Destaque de IBS (18,70%): R$ 1.870,00\n* Valor Bruto da Nota Fiscal: R$ 12.791,00\n* (-) Crédito financeiro integral recuperável pela indústria: R$ 2.791,00 (R$ 921 + R$ 1.870)\n* Custo Efetivo Real para a Indústria Compradora: R$ 12.791,00 − R$ 2.791,00 = R$ 10.000,00.\nProposta B: Fornecedor enquadrado no Simples Nacional (Regime Padrão Unificado)\n* Valor Total da Nota Fiscal cobrado: R$ 11.000,00\n* Crédito tributário transferível pelo DAS (hipótese didática de 3,84% para esta simulação; o percentual real depende da parcela de IBS/CBS efetivamente devida no Simples): R$ 11.000,00 × 3,84% = R$ 422,40\n* (-) Crédito recuperável pela indústria: R$ 422,40\n* Custo Efetivo Real para a Indústria Compradora: R$ 11.000,00 − R$ 422,40 = R$ 10.577,60.\nConclusão Técnica: Embora a nota fiscal do Fornecedor A aparente ser R$ 1.791,00 mais cara (R$ 12.791,00 vs R$ 11.000,00), o seu custo econômico final para o tomador PJ é R$ 577,60 MENOR em razão do crédito financeiro de 27,91%. Essa distinção redefine a competitividade nas relações comerciais entre empresas (B2B).",
        "k": "EXEMPLO NUMÉRICO",
        "id": "05-05"
      },
      {
        "t": "Saldo Credor, Compensação e Ressarcimento",
        "x": "Quando os créditos de IBS ou CBS superarem os débitos do período, o excesso não deve ser tratado como perda nem como autorização para compensar qualquer tributo. O saldo a recuperar permanece segregado por tributo e pode ser utilizado em períodos posteriores ou ser objeto de pedido de ressarcimento, observadas as regras, os controles e os prazos aplicáveis. A LC 214/2025 prevê que o contribuinte pode solicitar ressarcimento integral ou parcial; o valor não solicitado permanece como crédito para compensação ou ressarcimento futuro.\nNa prática, o escritório precisa conciliar o saldo fiscal com os documentos que deram origem aos créditos, acompanhar pedidos e evitar utilizar crédito de CBS para reduzir ICMS/ISS remanescente ou Imposto Seletivo.",
        "k": "APLICAÇÃO PRÁTICA",
        "id": "05-07"
      },
      {
        "t": "Próximo passo: Módulo 6",
        "x": "Depois de compreender como nasce o crédito, o passo seguinte é saber o que acontece quando ele supera os débitos, como funciona o ressarcimento, quais ajustes são exigidos em devoluções e como diferenciar crédito empresarial de cashback. Esse é o foco do Módulo 6.",
        "k": "PRÓXIMA ETAPA",
        "id": "05-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "06",
    "title": "Saldo Credor, Ressarcimento, Restituição e Cashback",
    "subtitle": "Entenda o que fazer quando os créditos superam os débitos e diferencie ressarcimento, restituição, ajustes e cashback.",
    "blocks": [
      {
        "t": "Saldo a recuperar e ressarcimento",
        "x": "Em linguagem simples: quando o crédito é maior que o débito, sobra um saldo que precisa ser controlado e tratado corretamente.\n\nNo regime regular, créditos e débitos de IBS e CBS são apurados de forma própria. Se ao final do período houver saldo a recuperar, a LC 214/2025 permite solicitar ressarcimento integral ou parcial. O valor que não for pedido permanece como crédito do contribuinte e pode ser utilizado em compensações futuras ou ser ressarcido posteriormente.\nIBS e CBS devem ser controlados separadamente. Um saldo credor de CBS não autoriza, por si só, reduzir ICMS, ISS, Imposto Seletivo ou qualquer outro tributo.",
        "k": "ESTUDO",
        "id": "06-01"
      },
      {
        "t": "Compensação, Ressarcimento e Restituição não são Sinônimos",
        "x": "Compensação é o uso de crédito admitido para extinguir débito conforme as regras do sistema. Ressarcimento é a devolução financeira de saldo a recuperar formado na apuração. Restituição normalmente se relaciona a valor pago indevidamente ou a maior e segue disciplina própria.\nO contador deve identificar a origem do valor antes de escolher o procedimento. Misturar esses conceitos pode gerar pedido incorreto ou conciliação errada.",
        "k": "CONCEITO",
        "id": "06-02"
      },
      {
        "t": "Devoluções, Cancelamentos e Ajustes",
        "x": "Uma devolução comercial, cancelamento ou ajuste posterior pode exigir correção do débito do fornecedor e do crédito do adquirente. O tratamento depende do documento fiscal, do evento correspondente e do momento da apuração.\nA regra operacional do escritório deve preservar rastreabilidade: documento original → evento de devolução/cancelamento → ajuste do débito → ajuste do crédito → reflexo na apuração e na conciliação financeira.",
        "k": "PROCESSO",
        "id": "06-03"
      },
      {
        "t": "Cashback de IBS e CBS",
        "x": "A Reforma criou devolução personalizada de CBS e IBS para famílias de baixa renda. O destinatário é o responsável pela unidade familiar enquadrada nas condições legais e cadastrada no CadÚnico, observados os demais requisitos da LC 214/2025. O cashback é um mecanismo voltado à pessoa física beneficiária e não deve ser confundido com crédito empresarial de IBS/CBS.\nOs sistemas fiscais e documentos de consumo são relevantes porque fornecem dados para a operacionalização da devolução.",
        "k": "CASHBACK",
        "id": "06-04"
      },
      {
        "t": "Exemplo de Controle",
        "x": "Uma empresa encerra o período com débito de CBS de R$ 40.000 e créditos admitidos de R$ 52.000. O saldo credor de CBS é R$ 12.000. Esse valor não reduz automaticamente o IBS ou o ICMS remanescente. A empresa deve mantê-lo na conta própria da CBS e decidir, conforme os requisitos aplicáveis, entre utilização futura e pedido de ressarcimento.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "06-05"
      },
      {
        "t": "Próximo passo: Módulo 7",
        "x": "Com os créditos, saldos e ajustes compreendidos, a próxima etapa é identificar quando a operação deixa de seguir a alíquota padrão e passa a receber redução, alíquota zero, crédito presumido ou outro tratamento diferenciado. Isso é estudado no Módulo 7.",
        "k": "PRÓXIMA ETAPA",
        "id": "06-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "07",
    "title": "Regimes Diferenciados e Reduções de Alíquota",
    "subtitle": "Aprenda a reconhecer reduções, alíquota zero e outros tratamentos diferentes da regra padrão.",
    "blocks": [
      {
        "t": "Tratamentos diferentes da regra padrão",
        "x": "Em linguagem simples: nem toda operação usa a alíquota padrão; algumas têm redução, alíquota zero ou outro tratamento previsto em lei.\n\nA aplicação indiscriminada de uma alíquota padrão uniforme sobre todos os bens e serviços penalizaria desproporcionalmente despesas de primeira necessidade e setores de relevância social básica (como saúde, educação e alimentação). Para mitigar essa regressividade sem comprometer a integridade do IVA, a legislação instituiu regimes diferenciados com reduções percentuais fixas sobre as alíquotas de referência.\nParalelamente, setores que apresentam peculiaridades operacionais (como serviços de alimentação, hotelaria e combustíveis) receberam regimes específicos. Nesses regimes, a lei reduz a alíquota, mas impõe vedações expressas ao aproveitamento de crédito pelo adquirente corporativo, evitando que despesas com consumo pessoal intermediadas por pessoas jurídicas erodam a base tributária.",
        "k": "ESTUDO",
        "id": "07-01"
      },
      {
        "t": "Benefícios regionais × tratamentos uniformes",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nMilhares de decretos estaduais e municipais concediam isenções parciais, reduções de base de cálculo e créditos presumidos sem critério nacional uniforme. Um produto farmacêutico tinha alíquota de 18% em um Estado, 12% em outro e isenção com estorno de crédito no terceiro. Profissionais liberais dependiam de regimes de ISS fixo municipal constantemente questionados nos tribunais.\nExemplo Prático Antigo: Um laboratório médico vendia medicamentos para hospitais em três Estados diferentes e enfrentava três regimes fiscais incompatíveis, com risco diário de autuação fiscal por glosa de crédito presumido de ICMS.\nCOMO É AGORA (REFORMA TRIBUTÁRIA)\nReduções fixadas diretamente pela Lei Complementar nº 214/2025 e válidas em todo o território nacional. Saúde e educação têm redução uniforme de 60% (alíquota efetiva de 11,164%); profissões regulamentadas (art. 127) têm redução de 30% (alíquota efetiva de 19,537%); e a cesta básica nacional tem alíquota zero. Bares, restaurantes e hotéis têm redução de 40%, mas a lei impede o comprador PJ de apropriar créditos tributários dessas despesas.\nExemplo Prático Atual: O mesmo medicamento possui a redução de 60% aplicada de forma idêntica em qualquer Estado da federação, eliminando a burocracia de parametrização regional.",
        "k": "COMPARATIVO",
        "id": "07-02"
      },
      {
        "t": "Regras principais (LC 214/2025)",
        "x": "* Redução de 60% (Art. 130): Saúde, medicamentos, dispositivos médicos, educação, insumos agropecuários e produções culturais. Alíquota efetiva: 11,164%.\n* Redução de 30% para Profissões Regulamentadas (Art. 127): 18 categorias fiscalizadas por conselhos de classe (contabilistas, advogados, médicos, engenheiros, etc.). Alíquota efetiva: 19,537%.\n* Alíquota Zero: Cesta básica nacional de alimentos essenciais.\n* Regimes Específicos com Trava de Crédito: Bares, restaurantes e hotelaria têm redução de 40% (alíquota efetiva de 16,746%), mas seus clientes corporativos são vedados por lei de tomar créditos sobre alimentação e hospedagem.",
        "k": "ESTUDO",
        "id": "07-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: Clínicas médicas e escritórios contábeis comparam os Anexos do Simples com a alíquota reduzida no regime regular (11,164% na saúde e 19,537% em serviços regulamentados), já que seus clientes B2B aproveitam créditos integrais.\nExemplo: Clínica odontológica no Simples pode adotar a opção híbrida para transferir crédito aos seus convênios empresariais.\n* Lucro Presumido: Sociedades de contadores, advogados e médicos faturam com a redução do art. 127 (19,537%), mantendo as presunções de 32% para o IRPJ e a CSLL.\nExemplo: Escritório contábil fatura honorários com CBS (6,447%) e IBS (13,090%), repassando 19,537% de crédito integral aos seus clientes PJ.\n* Lucro Real: Setores de controladoria devem travar o sistema contábil para bloquear a apropriação indevida de créditos sobre notas de restaurantes e hospedagem corporativa.\nExemplo: Bloqueio automático de crédito de notas fiscais de hotéis emitidas em viagens de trabalho de colaboradores.",
        "k": "REGIMES",
        "id": "07-04"
      },
      {
        "t": "Matriz das Alíquotas Efetivas Reduzidas",
        "x": "Cálculo exclusivamente didático de reduções sobre parâmetros hipotéticos do JAGUAR RT (CBS = 9,21% | IBS = 18,70% | total = 27,91%). Esses números NÃO constituem alíquotas legais universais: percentuais reais dependem da operação, da redução prevista em lei e do ano de transição:\nCategoria / Hipótese Legal\nDesoneração Legal\nCBS Efetiva\nIBS Efetivo\nAlíquota Total Efetiva\nAlíquota Padrão (Regra Geral)\nSem redução (100%)\n9,210%\n18,700%\n27,910%\nSaúde, Educação e Agropecuária\nRedução de 60%\n9,21% × 0,40 = 3,684%\n18,70% × 0,40 = 7,480%\n11,164%\nProfissões Regulamentadas (Art. 127)\n(Contabilistas, Médicos, Advogados, etc.)\nRedução de 30%\n9,21% × 0,70 = 6,447%\n18,70% × 0,70 = 13,090%\n19,537%\nBares, Restaurantes e Hotelaria\nRedução de 40%\n9,21% × 0,60 = 5,526%\n18,70% × 0,60 = 11,220%\n16,746%\nCesta Básica Nacional\nAlíquota Zero (100%)\n0,000%\n0,000%\n0,000%\nConexão Estrutural com o Módulo 10: Dominadas as bases de cálculo, o crédito amplo e a matriz de alíquotas nominais e reduzidas, surge a questão da implantação: como será o cronograma prático de convivência entre os tributos que saem e os que entram? Como se comportam PIS, Cofins, ICMS e ISS entre 2026 e 2033? Essa transição é detalhada no Módulo 10.\nObservação normativa (21/10/2026): a redução do art. aplicável não autoriza substituir a alíquota efetiva da operação pelas premissas do treinamento. Consulte a LC 214/2025 atualizada, a LC 227/2026 e o regulamento correspondente.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "07-05"
      },
      {
        "t": "Diferenciado não é a mesma coisa que Específico",
        "x": "Regime diferenciado normalmente preserva a arquitetura geral do IBS/CBS, mas altera a carga por redução de alíquota, alíquota zero, crédito presumido ou outro tratamento previsto em lei. Regime específico pode mudar a própria forma de apuração, a base de cálculo, as deduções, a documentação ou a lógica de crédito.\nPor isso, não é correto representar todo regime especial apenas com o campo “redução %”. Serviços financeiros, bens imóveis, planos de assistência à saúde, concursos de prognósticos, combustíveis e outras atividades possuem regras próprias que exigem identificação setorial antes do cálculo.",
        "k": "ALERTA",
        "id": "07-06"
      },
      {
        "t": "Próximo passo: Módulo 8",
        "x": "Depois de distinguir o regime padrão dos tratamentos diferenciados, é necessário aprofundar os setores cuja própria mecânica de apuração muda. O Módulo 8 trata dos regimes específicos, da DeRE e da tributação setorial.",
        "k": "PRÓXIMA ETAPA",
        "id": "07-07"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "08",
    "title": "Regimes Específicos e DeRE",
    "subtitle": "Entenda por que alguns setores têm forma própria de apuração e como a DeRE entra nesse processo.",
    "blocks": [
      {
        "t": "Por que existem regimes específicos",
        "x": "Em linguagem simples: alguns setores não cabem na fórmula padrão de débito menos crédito e precisam de regras e declarações próprias.\n\nAlguns setores não podem ser representados corretamente pela fórmula padrão preço × alíquota − créditos. A LC 214/2025 estabelece regimes específicos em que podem mudar a base de cálculo, as deduções, a forma de apuração, a alíquota, a documentação e o crédito do adquirente.\nEntre os temas setoriais relevantes estão serviços financeiros, planos de assistência à saúde, concursos de prognósticos, operações com bens imóveis, bares e restaurantes, hotelaria, agências de turismo, transporte de passageiros, combustíveis e outras hipóteses previstas em lei.",
        "k": "ESTUDO",
        "id": "08-01"
      },
      {
        "t": "DeRE — Declaração de Regimes Específicos",
        "x": "A DeRE foi criada para viabilizar a apuração de IBS/CBS em atividades cuja base não é obtida apenas pelo valor de cada nota fiscal. Ela alimenta o motor da apuração assistida com informações como margens, deduções e eventos próprios.\nNa implementação divulgada em 2026, a obrigação alcança, entre outros, prestadores de serviços financeiros, operadoras de planos de assistência à saúde e entidades que explorem concursos de prognósticos. O envio é consolidado pelo CNPJ raiz para os contribuintes abrangidos.",
        "k": "DeRE",
        "id": "08-02"
      },
      {
        "t": "Cronograma Operacional da DeRE",
        "x": "O cronograma oficial de implementação em 2026 foi dividido em fases: eventos de tabela, eventos periódicos mensais e demais eventos. Como leiautes e datas são passíveis de atualização, o escritório deve consultar a página oficial da Receita/SPED antes de implantar rotinas definitivas.\nA existência da DeRE não elimina automaticamente outras obrigações: receitas fora do regime específico e tributos antigos durante a transição podem exigir documentos fiscais próprios.",
        "k": "CRONOGRAMA",
        "id": "08-03"
      },
      {
        "t": "Exemplos Setoriais",
        "x": "Serviços financeiros podem utilizar bases formadas por receitas e deduções próprias; planos de assistência à saúde e concursos de prognósticos também possuem tratamento setorial. Operações imobiliárias possuem regime específico e documentação vinculada ao ecossistema cadastral de imóveis. Combustíveis têm hipóteses de tributação monofásica.\nA consequência prática é simples: antes de usar a calculadora padrão do JAGUAR RT, a equipe deve confirmar se a operação pertence ao regime regular ou a um regime específico.",
        "k": "SETORES",
        "id": "08-04"
      },
      {
        "t": "DeRE, Apuração Assistida e Cashback",
        "x": "As informações da DeRE alimentam a apuração assistida e ajudam a calcular corretamente operações em que a incidência depende de margem ou deduções. A documentação oficial também relaciona a DeRE à operacionalização do cashback em situações abrangidas pelos dados declarados.\nIsso reforça uma regra de governança: qualidade cadastral e qualidade da declaração são parte do cálculo tributário, não apenas uma obrigação posterior.",
        "k": "INTEGRAÇÃO",
        "id": "08-05"
      },
      {
        "t": "Próximo passo: Módulo 9",
        "x": "Dominados os principais regimes específicos internos, o curso avança para operações internacionais e territoriais incentivadas. O Módulo 9 aborda importações, exportações, Duimp, ZFM, ALC e ZPE.",
        "k": "PRÓXIMA ETAPA",
        "id": "08-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "09",
    "title": "Comércio Exterior e Áreas Incentivadas",
    "subtitle": "Veja como a Reforma alcança importações, exportações e operações com ZFM, ALC e ZPE.",
    "blocks": [
      {
        "t": "Importação no IVA Dual",
        "x": "Em linguagem simples: importação, exportação e áreas incentivadas têm regras próprias e devem ser enquadradas antes do cálculo.\n\nA importação de bens materiais, bens imateriais e serviços integra a arquitetura do IBS/CBS. Para bens materiais, a LC 214/2025 define regras próprias de local, base, alíquota e responsabilidade. A base pode incluir, além do valor aduaneiro, tributos e encargos previstos em lei, como Imposto de Importação, Imposto Seletivo e outras parcelas incidentes até a liberação.\nA alíquota aplicável ao bem importado, em regra, acompanha a tributação do bem correspondente no País, observadas as regras específicas.",
        "k": "ESTUDO",
        "id": "09-01"
      },
      {
        "t": "Exportações e Desoneração",
        "x": "As exportações recebem tratamento de desoneração previsto constitucionalmente e na LC 214/2025, preservando a lógica de não exportar tributos. A comprovação da exportação e o atendimento aos procedimentos aduaneiros são essenciais. Em operações com fim específico de exportação, a legislação prevê hipóteses de suspensão que podem se converter em alíquota zero após a efetiva exportação, desde que cumpridas as condições e prazos.\nCréditos relacionados a operações de exportação devem ser controlados conforme a disciplina legal de manutenção e ressarcimento.",
        "k": "EXPORTAÇÃO",
        "id": "09-02"
      },
      {
        "t": "Duimp e Documentação",
        "x": "A Duimp e a NF-e de importação têm cronograma próprio de adaptação à Reforma. O Ato Conjunto RFB/CGIBS nº 4/2026 estabeleceu marcos de obrigatoriedade de documentos fiscais em 2026 e 2027; publicação de leiaute e início de obrigação não são a mesma data.\nNa NFS-e, a Nota Técnica 009 v1.01 aprovada em outubro de 2026 trouxe campos de comércio exterior (fatura, contrato de câmbio, modalidades de consumo e ajuste específico de base de IBS/CBS), incluindo mudanças de nomenclatura para nDUIMP e nDUE.\nAntes de parametrizar importação de serviços, a equipe precisa conferir local de consumo, parte relacionada, conversão de moeda, base legal, versão do XML e ambiente efetivamente disponível. As evoluções divulgadas em 20/10/2026 estavam em produção restrita (testes), não necessariamente em produção.",
        "k": "CONFORMIDADE",
        "id": "09-03"
      },
      {
        "t": "Zona Franca de Manaus e Áreas Incentivadas",
        "x": "A Zona Franca de Manaus possui regime próprio para preservar sua competitividade. A LC 214/2025 prevê hipóteses de suspensão, isenção, alíquota zero e créditos presumidos, condicionadas à operação, ao tipo de bem, à habilitação e à comprovação de ingresso. O IPI também permanece em hipóteses relacionadas à proteção do diferencial competitivo da ZFM.\nÁreas de Livre Comércio e Zonas de Processamento de Exportação possuem tratamentos específicos e não devem ser simuladas como uma operação doméstica comum.",
        "k": "REGIME TERRITORIAL",
        "id": "09-04"
      },
      {
        "t": "Exemplo Prático",
        "x": "Uma empresa importa mercadoria para revenda. Antes de calcular IBS/CBS, a equipe deve identificar o valor aduaneiro, os acréscimos que integram a base, o destino da operação, eventual Imposto Seletivo e o tratamento do produto no mercado interno. Se a operação estiver ligada à ZFM, ALC, ZPE ou regime aduaneiro especial, a regra geral deve ser suspensa até que o enquadramento específico seja validado.",
        "k": "CASO PRÁTICO",
        "id": "09-05"
      },
      {
        "t": "Próximo passo: Módulo 10",
        "x": "Com as exceções de comércio exterior e regimes territoriais identificadas, é possível enxergar como todas essas regras entram gradualmente em vigor. O Módulo 10 organiza a transição de 2026 a 2033.",
        "k": "PRÓXIMA ETAPA",
        "id": "09-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "10",
    "title": "Transição 2026–2033: o que muda em cada ano",
    "subtitle": "Acompanhe a passagem do sistema atual para CBS e IBS, ano a ano, de 2026 a 2033.",
    "blocks": [
      {
        "t": "Como funciona a transição",
        "x": "Em linguagem simples: a Reforma não acontece de uma vez; entre 2026 e 2033 convivem regras novas e antigas.\n\nA transição de um sistema tributário complexo para um novo arcabouço normativo exige previsibilidade temporal. A substituição abrupta causaria choques inflacionários, desestruturação no fluxo financeiro das empresas e riscos de perda de arrecadação para os entes federativos.\nA Emenda Constitucional nº 132/2023 estruturou um calendário de transição em quatro etapas (2026 a 2033): inicia-se com um período de testes operacionais em 2026; promove-se a extinção imediata do PIS/Pasep e da Cofins com a entrada da CBS em 2027; executa-se a substituição escalonada de ICMS e ISS pelo IBS entre 2029 e 2032; e consolida-se a vigência plena definitiva a partir de 2033.",
        "k": "ESTUDO",
        "id": "10-01"
      },
      {
        "t": "Mudança abrupta × implantação gradual",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nHistoricamente, alterações tributárias no Brasil entravam em vigor de forma abrupta de um ano para o outro, gerando insegurança jurídica e enxurradas de ações judiciais (como ocorreu na criação do PIS não cumulativo em 2002 e da Cofins em 2003). As empresas não tinham período de homologação técnica.\nExemplo Prático Antigo: Em 2003, as empresas viram a alíquota da Cofins subir de 3% para 7,6% em poucos meses, tendo de reestruturar custos e precificação no susto, com enorme litigiosidade sobre insumos.\nCOMO É AGORA (REFORMA TRIBUTÁRIA)\nA transição é gradual e previsível: 2026 serve como ano teste digital com alíquota simbólica compensável (CBS 0,9% e IBS 0,1%); em 2027, PIS/Cofins são extintos e a CBS assume integralmente; e entre 2029 e 2032 opera a gangorra matemática (o ICMS/ISS diminui 10% ao ano e o IBS cresce 10% ao ano), atingindo 100% do novo modelo apenas em 2033.\nExemplo Prático Atual: Uma empresa de serviços projeta com segurança sua carga tributária ano a ano até 2033, sabendo exatamente que em 2029 pagará 90% do ISS e 10% do IBS, parametrizando seus sistemas antecipadamente.",
        "k": "COMPARATIVO",
        "id": "10-02"
      },
      {
        "t": "Regras principais das Fases de Transição",
        "x": "* 2026 — fase de teste: CBS 0,9% e IBS 0,1%, com disciplina legal de compensação ou dispensa do recolhimento mediante cumprimento das obrigações acessórias. As alíquotas de teste não se aplicam às operações dos optantes do Simples Nacional.\n* 2027 e 2028 — PIS/Cofins são extintos, CBS passa a incidir pela alíquota legal aplicável ao ano (com redução transitória de 0,1 ponto percentual) e IBS mantém alíquota de 0,1%. O Imposto Seletivo e o IPI seguem o cronograma e as exceções da legislação vigente, sujeito a alterações normativas futuras.\n* 2029–2032 — ICMS/ISS passam, respectivamente, a 90%, 80%, 70% e 60% das alíquotas anteriores; o IBS incorpora 10%, 20%, 30% e 40% da proporção de transição prevista, não uma alíquota fixa universal de 10% a 40%.\n* 2033 — vigência integral de CBS e IBS e extinção de ICMS e ISS.\n* Premissas de simulação do JAGUAR RT: CBS 9,21% e IBS integral estimado em 18,70% são valores didáticos, não alíquotas oficiais universais. Os números 1,87%, 3,74%, 5,61% e 7,48% resultam dessa hipótese ilustrativa de IBS, não substituem os percentuais legais aplicáveis à operação.",
        "k": "ESTUDO",
        "id": "10-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: Fica de fora dos testes de 2026. A partir de 2027, decide se continua no DAS unificado ou se adota o regime híbrido integral com CBS e IBS cheios.\nExemplo: Microempresa não sofre impacto em 2026, mas utiliza o ano para decidir se migra para o regime híbrido em 2027.\n* Lucro Presumido: A partir de 2027, a substituição de PIS/Cofins pela CBS altera a lógica de tributação do consumo e passa a exigir gestão de créditos. Nas simulações do JAGUAR RT, utiliza-se CBS de 9,21% como premissa didática até a parametrização das alíquotas oficiais definitivas do período.\nExemplo: Prestador no Presumido tem aumento na alíquota federal faturada em 2027, precisando mapear seus créditos de compras.\n* Lucro Real: Entre 2029 e 2032 terá de gerenciar uma escrituração dupla, apurando as regras decrescentes de ICMS/ISS concomitantes com as regras crescentes do IBS.\nExemplo: Indústria automotiva calcula débitos de CBS, IBS, ICMS residual e ISS residual em suas declarações fiscais mensais.",
        "k": "REGIMES",
        "id": "10-04"
      },
      {
        "t": "Evolução Anual da Carga Tributária sobre Serviços na Transição",
        "x": "Exercício didático de prestação de serviços com valor líquido de R$ 10.000,00 e ISS histórico hipotético de 5%. Não se trata de guia de tributos a recolher: as alíquotas finais dependem do ano, legislação aplicável, destino, enquadramento e créditos, e o recolhimento-teste de 2026 pode ser compensado ou dispensado conforme os requisitos.\nAno | ISS histórico remanescente | CBS ilustrativa | IBS ilustrativo | Soma aritmética bruta, sem créditos/compensação\n2026 | R$ 500,00 (5%) | R$ 90,00 (teste 0,9%) | R$ 10,00 (teste 0,1%) | R$ 600,00 (não representa recolhimento líquido)\n2028 | R$ 500,00 (5%) | R$ 921,00 (premissa 9,21%) | R$ 10,00 (0,1%) | R$ 1.431,00\n2029 | R$ 450,00 (90% do ISS antigo) | R$ 921,00 | R$ 187,00 (10% do IBS estimado) | R$ 1.558,00\n2030 | R$ 400,00 (80%) | R$ 921,00 | R$ 374,00 (20%) | R$ 1.695,00\n2031 | R$ 350,00 (70%) | R$ 921,00 | R$ 561,00 (30%) | R$ 1.832,00\n2032 | R$ 300,00 (60%) | R$ 921,00 | R$ 748,00 (40%) | R$ 1.969,00\n2033 | R$ 0,00 (ISS extinto) | R$ 921,00 | R$ 1.870,00 (IBS didático integral) | R$ 2.791,00\nA CBS de R$ 921,00 e o IBS integral de R$ 1.870,00 usam exclusivamente as premissas do curso: 9,21% e 18,70%. O exemplo não considera base efetiva, reduções, tributos 'por dentro', benefícios, créditos ou a apuração real. Para orçamento e preço, parametrize a operação concreta.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "10-05"
      },
      {
        "t": "Zona Franca de Manaus durante a Transição",
        "x": "A redução do IPI a zero a partir de 2027 não é absoluta. A legislação preserva hipóteses ligadas à competitividade da Zona Franca de Manaus, e a LC 214/2025 contém tratamentos próprios de IBS/CBS para operações com a ZFM e Áreas de Livre Comércio. Portanto, em operações incentivadas, não se deve aplicar automaticamente a regra geral da transição sem verificar origem, destino, habilitação e finalidade do bem.",
        "k": "EXCEÇÃO RELEVANTE",
        "id": "10-06"
      },
      {
        "t": "Próximo passo: Módulo 11",
        "x": "Entendido o cronograma de transição, o próximo passo é aplicar essas mudanças ao regime mais comum entre pequenas empresas. O Módulo 11 mostra as escolhas do Simples Nacional, inclusive o recolhimento regular de IBS/CBS e os novos efeitos operacionais.",
        "k": "PRÓXIMA ETAPA",
        "id": "10-07"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "11",
    "title": "Simples Nacional: padrão x IBS/CBS no regime regular",
    "subtitle": "Compare o Simples padrão com a opção de recolher IBS/CBS pelo regime regular e entenda os efeitos práticos.",
    "blocks": [
      {
        "t": "As escolhas de recolhimento no Simples",
        "x": "Em linguagem simples: a empresa pode continuar no Simples e, em determinadas condições, escolher recolher IBS/CBS pelas regras do regime regular.\n\nO Simples Nacional foi preservado pela Emenda Constitucional nº 132/2023, mantendo o tratamento diferenciado e favorecido para microempresas e empresas de pequeno porte. No entanto, o sistema inseriu uma bifurcação estratégica para evitar que a pequena empresa seja expulsa das cadeias produtivas de fornecimento corporativo.\nNo modelo padrão do Simples, o crédito transferível ao adquirente não corresponde automaticamente à alíquota cheia do regime regular; ele é limitado à parcela de IBS/CBS efetivamente devida no Simples, conforme as regras aplicáveis. Para operações em que isso seja relevante, existe a opção de recolher IBS e CBS pelo regime regular, mantendo as demais parcelas no Simples. Nas simulações do JAGUAR RT, quando a operação estiver sujeita à alíquota padrão didática, utiliza-se 9,21% de CBS + 18,70% de IBS = 27,91%.",
        "k": "ESTUDO",
        "id": "11-01"
      },
      {
        "t": "Simples padrão × opção pelo regime regular",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nNo sistema antigo, fornecedores do Simples podiam ser menos competitivos em algumas cadeias B2B porque o crédito disponível ao comprador era menor do que em determinadas operações fora do regime. Isso podia influenciar a escolha de fornecedores. Além disso, a empresa podia apurar seus impostos pelo Regime de Caixa, pagando o DAS somente quando o cliente quitava a fatura.\nExemplo Prático Antigo: Uma microempresa de usinagem no Simples cobrava R$ 10.000 por peças; a multinacional compradora só aproveitava R$ 300 de crédito. A multinacional preferia comprar de uma concorrente do Lucro Real que gerasse R$ 2.000 de crédito fiscal.\nCOMO É AGORA (REFORMA TRIBUTÁRIA)\nA pequena empresa pode optar por recolher IBS e CBS pelo regime regular, mantendo as demais parcelas no Simples. Nessa hipótese, os créditos e débitos desses dois tributos seguem as regras do regime regular. Para fins didáticos, quando a operação estiver integralmente sujeita à premissa padrão do curso, utiliza-se 27,91% (CBS 9,21% + IBS 18,70%). O regime de caixa mensal do Simples deixa de ser uma opção a partir de 01/01/2027.\nExemplo Didático: Admitindo uma operação integralmente tributada pela premissa padrão, a oficina fatura R$ 10.000 + 27,91% de IBS/CBS por fora; o adquirente no regime regular poderá apropriar o crédito correspondente, desde que cumpra os requisitos legais.",
        "k": "COMPARATIVO",
        "id": "11-02"
      },
      {
        "t": "Regras principais (Art. 41 da LC 214/2025)",
        "x": "* Simples Nacional preservado: pode manter IBS/CBS no DAS conforme a legislação ou, se elegível, optar por apurar esses dois tributos pelo regime regular, mantendo as demais parcelas no Simples.\n* Prazos para 2027 conforme Resolução CGSN nº 194/2026: ingresso/retorno ao Simples de 01/09 a 15/10/2026 (prazo já encerrado em 21/10/2026); regularização das pendências para ingresso até 30/10/2026, quando aplicável; opção pelo regime regular de IBS/CBS para janeiro a junho de 2027 de 01/09 a 30/10/2026 (prazo ainda aberto em 21/10/2026). São decisões distintas.\n* Cancelamento das opções: janela de 03/11 a 20/12/2026, conforme a disciplina divulgada pela Receita Federal. Para o segundo semestre de 2027, verificar o prazo próprio previsto na norma e eventuais atualizações.\n* Resoluções CGSN nº 190 e 191/2026: promovem adequações operacionais do Simples à reforma; a Resolução nº 191 fixou 01/11/2026 para a NFS-e nacional das ME/EPP prestadoras de serviços, enquanto as regras de IBS/CBS aplicáveis ao Simples passam a produzir efeitos a partir de 01/01/2027.\n* Atenção à data de consulta: prazos e regras podem receber atos supervenientes; valide o Portal do Simples Nacional antes de transmitir uma opção.",
        "k": "ESTUDO",
        "id": "11-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional Padrão vs. regime regular de IBS/CBS: no padrão, o crédito transferível é limitado à parcela de IBS/CBS devida no Simples. Na opção pelo regime regular, os créditos seguem as regras gerais; nas simulações padrão do curso, usa-se 27,91% apenas como premissa didática.\nExemplo: Fábrica de pallets no Simples opta pelo regime híbrido para manter contratos de fornecimento industrial.\n* Lucro Presumido: Empresas no teto do Simples (R$ 3,6M a R$ 4,8M) que sofriam com sublimites devem analisar se a transição para o Presumido ou Real não é mais vantajosa do que gerir a segregação híbrida.\n* Lucro Real: compradores B2B podem considerar o crédito tributário transferível na avaliação econômica de fornecedores, mas a escolha comercial não deve ser presumida automática.",
        "k": "REGIMES",
        "id": "11-04"
      },
      {
        "t": "Simulação de Competitividade B2B no Simples Nacional",
        "x": "Simulação **hipotética do modelo integral**, usando as premissas didáticas CBS 9,21% e IBS 18,70% (total 27,91%). NÃO aplique esses percentuais integralmente a 2027/2028, quando há alíquota transitória de IBS. Considere uma prestadora de manutenção industrial que fatura R$ 125.000,00 mensais para empresas no regime regular.\nCenário A — Simples com IBS/CBS no DAS: admita, apenas para exercício, alíquota DAS total de 13,5% e parcela de IBS/CBS efetivamente devida de 3,5% (hipótese, não percentual legal tabelado). O comprador elegível teria crédito ilustrativo de R$ 4.375,00, sujeito às regras legais; custo econômico ilustrativo: R$ 120.625,00 para preço de R$ 125.000,00.\nCenário B — Simples com opção pelo regime regular do IBS/CBS: admita DAS residual hipotético de 10%, sujeito à partilha real; IBS/CBS por fora de 27,91% sobre a base didática = R$ 34.887,50 de débito bruto. A dedução de créditos do fornecedor, se cabível, deve observar os requisitos legais. Para comprador em regime regular que possa creditar integralmente R$ 34.887,50, o custo líquido didático sobre preço total de R$ 159.887,50 seria R$ 125.000,00.\nA comparação não estabelece que a opção híbrida é sempre vantajosa. O preço contratado, natureza do serviço, ano, benefícios, créditos efetivamente admitidos e composição do DAS podem alterar completamente a decisão. Faça simulações por cliente e por período.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "11-05"
      },
      {
        "t": "Próximo passo: Módulo 12",
        "x": "Analisada a estratégia da micro e pequena empresa, torna-se necessário examinar as médias e grandes empresas: como se posicionam as organizações fora do Simples? Como fica o duelo histórico entre Lucro Presumido e Lucro Real sem o PIS/Cofins cumulativo e diante das novas regras da Lei Complementar nº 224/2025? Esse é o foco do Módulo 12.",
        "k": "PRÓXIMA ETAPA",
        "id": "11-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "12",
    "title": "Lucro Presumido x Lucro Real após a Reforma",
    "subtitle": "Aprenda a comparar Presumido e Real sem decidir apenas pela alíquota nominal ou pela margem contábil.",
    "blocks": [
      {
        "t": "Renda e consumo são análises diferentes",
        "x": "Em linguagem simples: depois da Reforma, a comparação entre Presumido e Real exige olhar principalmente IRPJ, CSLL, margem, despesas e ajustes fiscais.\n\nNo sistema revogado, a escolha entre Lucro Presumido e Lucro Real era fortemente condicionada pela tributação do faturamento: o Presumido permitia recolher PIS e Cofins à alíquota cumulativa de 3,65%, enquanto o Lucro Real exigia a apuração a 9,25%.\nNo regime regular de IBS/CBS, Lucro Presumido e Lucro Real tendem a seguir a mesma arquitetura de tributação do consumo, observadas as regras específicas da operação, créditos, regimes diferenciados e exceções legais. Por isso, a comparação entre Presumido e Real passa a depender ainda mais da tributação da renda (IRPJ e CSLL), da margem efetiva, da composição de despesas e dos ajustes fiscais. A LC 224/2025 deve ser considerada quando suas regras de presunção forem aplicáveis.",
        "k": "ESTUDO",
        "id": "12-01"
      },
      {
        "t": "Comparação de regimes antes e depois",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nA escolha era direcionada pelos tributos indiretos: muitas empresas preferiam o Lucro Presumido mesmo tendo baixa rentabilidade, apenas para se beneficiar da alíquota cumulativa de PIS/Cofins de 3,65% (contra 9,25% do Lucro Real). A presunção de IRPJ e CSLL era fixa (32% para serviços e 8% para comércio), independentemente do faturamento da empresa.\nExemplo Prático Antigo: Empresa de serviços com faturamento de R$ 10 milhões pagava 3,65% de PIS/Cofins no Presumido, gerando economia fiscal expressiva em relação aos 9,25% do Lucro Real.\nCOMO É AGORA (REFORMA TRIBUTÁRIA)\nO consumo foi 100% equalizado: tanto no Presumido quanto no Real a empresa apura 9,21% de CBS e 18,70% de IBS com créditos amplos. Para completar, a LC 224/2025 aumentou em 10% a presunção sobre a parcela da receita que exceder R$ 5 milhões anuais (serviços sobem de 32% para 35,2%). Se a margem efetiva for inferior à base presumida, isso é um sinal relevante para simular o Lucro Real, mas não permite concluir, isoladamente, que ele será necessariamente mais vantajoso: ajustes fiscais, despesas dedutíveis, adicionais e demais regras precisam ser avaliados.\nExemplo Didático: A mesma consultoria deve recalcular o Lucro Presumido com as regras aplicáveis e comparar o resultado com uma apuração completa do Lucro Real. Uma margem contábil menor que a base presumida é um sinal para aprofundar a simulação, não uma garantia de economia.",
        "k": "COMPARATIVO",
        "id": "12-02"
      },
      {
        "t": "Regras principais (A Majoração da LC 224/2025)",
        "x": "* Equalização do Consumo: Idênticas regras de débito e crédito de CBS e IBS para Lucro Presumido e Lucro Real.\n* Acréscimo de 10% na Presunção (LC 224/2025): Aplica-se sobre o percentual de presunção da parcela da receita bruta anual que ultrapassar R$ 5.000.000,00.\n* Cálculo do Percentual Majorado:\n* Serviços (Presunção padrão 32%): 32% × 1,10 = 35,2% sobre o excedente;\n* Comércio e Indústria (Presunção padrão 8%): 8% × 1,10 = 8,8% sobre o excedente.",
        "k": "ESTUDO",
        "id": "12-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: Faturamento limitado a R$ 4,8 milhões/ano, mantendo a empresa fora da presunção majorada da LC 224.\n* Lucro Presumido: Sofre aumento de tributação direta sobre faturamentos acima de R$ 5 milhões. Empresas de serviços com despesas dedutíveis estruturadas são estimuladas a migrar para o Lucro Real.\n* Lucro Real: Pode ganhar atratividade em empresas cuja base efetiva, após os ajustes fiscais aplicáveis, seja inferior à base presumida; a conclusão depende de simulação completa de IRPJ, CSLL e demais efeitos econômicos.",
        "k": "REGIMES",
        "id": "12-04"
      },
      {
        "t": "Comparativo Numérico de IRPJ/CSLL sob as Regras da LC 224/2025",
        "x": "Empresa de engenharia consultiva faturando R$ 8.000.000,00 anuais com despesas operacionais e custos comprovados de R$ 5.500.000,00 (Lucro Líquido Contábil Efetivo = R$ 2.500.000,00 / margem de lucro real de 31,25%):\nCenário A: Apuração no Lucro Presumido sob a LC 224/2025\n* Parcela da receita até R$ 5.000.000,00: Presunção padrão de 32% = R$ 1.600.000,00 de base;\n* Parcela da receita excedente a R$ 5M (R$ 3.000.000,00): Presunção majorada de 35,2% = R$ 1.056.000,00 de base;\n* Base de Cálculo Presumida Consolidada para IRPJ/CSLL: R$ 1.600.000,00 + R$ 1.056.000,00 = R$ 2.656.000,00.\nCenário B: Apuração no Lucro Real\n* Receita Operacional Bruta: R$ 8.000.000,00\n* (-) Despesas operacionais e custos dedutíveis: - R$ 5.500.000,00\n* Base de Cálculo Real Efetiva para IRPJ/CSLL: R$ 2.500.000,00.\nConclusão Didática: Neste exemplo simplificado, a base apresentada para o Lucro Real é R$ 156.000,00 inferior à base presumida (R$ 2.500.000,00 vs. R$ 2.656.000,00). Isso justifica aprofundar a simulação do Lucro Real, mas não constitui uma conclusão automática sobre o regime mais econômico. A decisão real exige calcular IRPJ, adicional, CSLL, ajustes fiscais, dedutibilidade e demais particularidades da empresa. Para IBS/CBS, o curso mantém a premissa didática de 9,21% + 18,70%, sem tratá-la como alíquota universal definitiva.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "12-05"
      },
      {
        "t": "Próximo passo: Módulo 13",
        "x": "Depois de comparar Lucro Presumido e Lucro Real, a análise passa do regime tributário para a formação econômica da operação. O Módulo 13 mostra como transformar tributos, créditos e margem em preço e faturamento projetados.",
        "k": "PRÓXIMA ETAPA",
        "id": "12-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "13",
    "title": "Formação de Preços, Reprecificação e DRE",
    "subtitle": "Veja como transformar tributos, créditos, custos e margem em uma simulação de preço e DRE.",
    "blocks": [
      {
        "t": "Do preço atual à nova simulação",
        "x": "Em linguagem simples: não basta somar IBS/CBS ao preço atual; primeiro é preciso separar tributos antigos, créditos, custos e margem.\n\nA reprecificação deve partir do custo e da margem desejada, distinguindo tributos atualmente embutidos, tratamento durante a transição, regime do fornecedor e crédito do comprador. A transição não autoriza adicionar uma taxa única de 27,91% a todo preço: esse percentual é apenas premissa didática do JAGUAR RT para certos cenários ilustrativos de modelo integral.\nÉ preciso revisar contratos, frete, devoluções, redução de alíquota, natureza da operação e exigências documentais. Quando IBS/CBS forem calculados por fora e o adquirente puder apropriar créditos, o preço bruto e o custo econômico poderão se comportar de modo diferente.\nExemplo: indústria deve projetar 2027/2028 com IBS transitório de 0,1% e anos posteriores com sua proporção legal; a CBS deve usar a alíquota realmente aplicável. Não concluir automaticamente que o valor final da nota diminuirá ou que todo cliente aproveitará crédito integral.",
        "k": "ESTUDO",
        "id": "13-01"
      },
      {
        "t": "Repassar tributos × recompor o preço",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nQuando o governo aumentava alíquotas de ICMS ou PIS/Cofins, os empresários simplesmente aumentavam a margem bruta ou somavam o percentual diretamente no preço de tabela final. Como o imposto era por dentro, o custo subia em efeito bola de neve, empurrando a inflação e distorcendo a concorrência.\nExemplo Prático Antigo: Se um produto era vendido por R$ 100,00 e o ICMS subia 2 pontos percentuais, a empresa aplicava o aumento sobre os R$ 100,00 brutos, pagando imposto novo sobre imposto antigo.\nCOMO É AGORA (REFORMA TRIBUTÁRIA)\nA reprecificação exige separar os tributos efetivamente embutidos no preço atual, recalcular os custos considerando apenas créditos legalmente aproveitáveis e aplicar, na projeção, a alíquota de IBS/CBS correspondente ao cenário. No exemplo didático deste módulo, utiliza-se uma carga antiga de 27,25% e a premissa RTAV de 27,91% para o novo sistema; esses percentuais não devem ser tratados como universais para qualquer empresa ou operação.\nExemplo Didático: Nesta simulação simplificada, um produto vendido hoje por R$ 100,00 tem R$ 72,75 de receita líquida após as premissas de tributos antigos. Aplicando 27,91% por fora sobre essa base, o novo valor da nota seria R$ 93,05. O exemplo preserva a receita líquida-alvo; o lucro só permanece igual se custos, créditos e demais premissas também permanecerem iguais.",
        "k": "COMPARATIVO",
        "id": "13-02"
      },
      {
        "t": "Metodologia Financeira Passo a Passo",
        "x": "1. Purgação dos Tributos Antigos por Dentro:\nReceita Líquida-Alvo = Preço Bruto Atual × [1 − (Alíquotas dos Tributos Antigos Embutidos)].\n2. Desoneração do Custo dos Produtos Vendidos (CPV/CMV): O custo pode ser reduzido pelos créditos de IBS/CBS efetivamente apropriáveis nas aquisições. A aplicação de 27,91% somente cabe às simulações em que a compra seja integralmente tributada e creditável pela premissa padrão do curso.\n3. Projeção da Nova Nota Fiscal Faturada:\nNovo Preço Faturado = Receita Líquida-Alvo × (1 + 0,2791).\n4. Estruturação da Nova DRE: Confronto entre a nova receita faturada e deduções para certificar a estabilidade da margem de contribuição.",
        "k": "ESTUDO",
        "id": "13-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: em operações B2B, compare Simples com IBS/CBS dentro do DAS e a opção pelo regime regular, respeitando o crédito efetivamente permitido e as parcelas que permanecem no DAS.\n* Lucro Presumido: analise vendas a outras empresas e a consumidor final separadamente. Nem todo serviço tem a mesma base ou alíquota e nem todo adquirente pode apropriar crédito integral; o exemplo didático de 27,91% não é regra de repasse automático.\n* Lucro Real: revise aquisição, crédito autorizado, composição de custo e margem por operação. Indústrias e atacadistas podem ganhar ou perder competitividade conforme a cadeia e a fase de transição, sem pressupor redução obrigatória de preço.\nExemplo: uma consultoria de tecnologia e um atacadista usam cenários de compras, crédito e tributos para projetar o custo efetivo do cliente e negociar contratos sem prometer compensação integral em qualquer situação.",
        "k": "REGIMES",
        "id": "13-04"
      },
      {
        "t": "Demonstração do Resultado (DRE) Comparativa Passo a Passo",
        "x": "Cenário Atual (Comércio Atacadista no Lucro Real com ICMS e PIS/Cofins):\n* Faturamento Bruto Atual faturado: R$ 100.000,00\n* (-) Tributos Antigos por dentro (ICMS 18% + PIS/Cofins 9,25% = 27,25%): - R$ 27.250,00\n* (=) Receita Operacional Líquida Atual: R$ 72.750,00\n* (-) Custo das Mercadorias Vendidas (CPV líquido de compras): - R$ 45.000,00\n* (=) Lucro Bruto Operacional Atual: R$ 27.750,00 (Margem Bruta de 38,14% sobre a receita líquida).\nAplicação da Reprecificação no Novo Sistema (Preservando a Receita Líquida de R$ 72.750,00):\n* Base Comercial Limpa do IBS/CBS: R$ 72.750,00\n* (+) CBS destacada por fora (9,21%): R$ 6.700,28\n* (+) IBS destacado por fora (18,70%): R$ 13.604,25\n* (=) Total dos Tributos do IVA Dual (27,91%): R$ 20.304,53\n* (=) Novo Preço Bruto da Nota Fiscal Faturada: R$ 72.750,00 + R$ 20.304,53 = R$ 93.054,53.\nNova DRE Estruturada no Novo Sistema:\n* Faturamento Bruto Faturado: R$ 93.054,53\n* (-) Deduções Tributárias (CBS R$ 6.700,28 + IBS R$ 13.604,25): - R$ 20.304,53\n* (=) Receita Operacional Líquida Preservada: R$ 72.750,00\n* (-) CPV Líquido (custo operacional mantido): - R$ 45.000,00\n* (=) Lucro Bruto Operacional Mantido: R$ 27.750,00.\nConclusão Didática: Neste cenário simplificado, o valor nominal da nota cai de R$ 100.000,00 para R$ 93.054,53 e a receita líquida-alvo permanece em R$ 72.750,00. O lucro bruto mostrado só permanece em R$ 27.750,00 porque o exemplo manteve o CPV em R$ 45.000,00. Na aplicação real, créditos, custos, mix de compras e margem precisam ser recalculados.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "13-05"
      },
      {
        "t": "Próximo passo: Módulo 14",
        "x": "Depois de formar preços e projetar margens, é preciso garantir que a operação seja documentada e apurada corretamente. O Módulo 14 trata de DF-e, cadastros, leiautes e apuração assistida.",
        "k": "PRÓXIMA ETAPA",
        "id": "13-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "14",
    "title": "Documentos Fiscais, Cadastros e Apuração Assistida",
    "subtitle": "Entenda como cadastros e documentos fiscais alimentam a apuração e por que a conferência continua essencial.",
    "blocks": [
      {
        "t": "O papel dos documentos fiscais",
        "x": "Em linguagem simples: o dado informado no documento fiscal passa a ter ainda mais peso, mas a automação não substitui a conferência do contador.\n\nO modelo contábil tradicional apoiava-se na escrituração fiscal retroativa: a empresa emitia notas ao longo do mês, enviava os arquivos ao escritório de contabilidade e este reconstruía a apuração por meio de escriturações acessórias complexas (como SPED Fiscal e EFD-Contribuições), com reconciliações manuais demoradas.\nNo novo ecossistema tributário, os documentos fiscais eletrônicos passam a ter papel central na formação das informações usadas pela administração tributária para apuração e controle de IBS/CBS. NF-e, NFC-e, NFS-e e demais DF-e alimentam os sistemas de débitos, créditos e conferência. A apuração assistida deve ser tratada como apoio automatizado ao contribuinte, que continua responsável por revisar cadastros, documentos, enquadramentos e divergências antes de concluir sua apuração.",
        "k": "ESTUDO",
        "id": "14-01"
      },
      {
        "t": "Escrituração posterior × apuração assistida",
        "x": "COMO ERA ANTES (SISTEMA ANTERIOR)\nDocumentos fiscais e escrituração eram frequentemente conciliados após a emissão, com obrigações fiscais fragmentadas entre União, Estados e Municípios. Sistemas, cadastros e notas apresentavam diferenças que exigiam conferência manual.\nCOMO FUNCIONA A IMPLANTAÇÃO DA REFORMA\nA transição aproxima documentos fiscais eletrônicos, identificação da operação e apuração de IBS/CBS. NF-e, NFC-e, NFS-e e demais DF-e terão dados padronizados conforme os leiautes e marcos de obrigatoriedade. A apuração assistida evolui conforme disponibilização oficial dos serviços; não é correto presumir captura instantânea, crédito automático ou prazo uniforme para toda operação.\nExemplo prático: ao receber NFS-e, o escritório confere cadastro do prestador/tomador, serviço/NBS, código de tributação e eventuais campos de IBS/CBS exigíveis naquela data. Divergências devem ser tratadas conforme os eventos e canais oficiais, sem presumir homologação automática.",
        "k": "COMPARATIVO",
        "id": "14-02"
      },
      {
        "t": "Regras principais",
        "x": "* NFS-e do Simples: a Resolução CGSN nº 191/2026 exige o Emissor Nacional a partir de 01/11/2026 para ME/EPP optantes prestadoras de serviços. Os efeitos das regras de IBS/CBS para optantes do Simples começam em 01/01/2027, conforme a regulamentação aplicável.\n* Atualização de outubro/2026: o Ato Técnico Conjunto RFB/CGIBS nº 7 aprovou a Nota Técnica NFS-e 009 v1.01 e a NT 010 (NFS-e Via). A NT 009 inclui ajustes de layout, validações cadastrais, comércio exterior, eventos e regras para determinados tipos de operação.\n* Em 20/10/2026, a documentação oficial informou testes (produção restrita) da reorganização dos campos CST e cClassTrib, fatos geradores 99.02–99.04 e grupo vAjusteBC. Não confunda ambiente de teste com implantação geral em produção.\n* NFS-e Via: a NT 010 introduz evento de manifestação do adquirente (aceite ou rejeição) e adaptações de leiaute, com publicação oficial de implantação em produção em 19/10/2026.\n* Apuração assistida: documentar versões, validações, eventos e integrações; o contribuinte segue responsável por conferir a proposta e as informações registradas.",
        "k": "ESTUDO",
        "id": "14-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: ajustar a emissão de serviços ao Emissor Nacional da NFS-e até a entrada da obrigatoriedade de 01/11/2026 (Res. CGSN 191/2026). Os campos/regras de IBS/CBS para optantes se aplicam conforme o marco legal de 01/01/2027.\n* Lucro Presumido: revisar NBS, código de serviço, CST, cClassTrib, dados do tomador e condições legais de eventual alíquota reduzida. Reduções dependem do serviço e da lei, não do regime Presumido isoladamente; não há autotributação universal obrigatória de 27,91%.\n* Lucro Real: revisar autorização e integridade dos XML, créditos admitidos, valores e eventos, respeitando os percentuais de transição em cada ano. CBS 9,21% e IBS 18,70% são hipóteses didáticas do JAGUAR RT, não percentuais gerais que devem ser automaticamente destacados em documentos reais.",
        "k": "REGIMES",
        "id": "14-04"
      },
      {
        "t": "Fluxo integrado da conformidade fiscal",
        "x": "1. Emissão qualificada: conferir natureza e local da operação, classificação NCM/NBS quando aplicável, CST, cClassTrib, dados do destinatário e campos IBS/CBS exigidos pelo leiaute vigente na data, sem usar automaticamente alíquotas didáticas.\n2. Validação do documento: consultar autorização, ambiente (produção ou testes), versão da nota técnica e regras de validação. As evoluções da NT 009 v1.01 incluem alterações de campos e eventos.\n3. Conciliação fiscal: reunir documentos emitidos e recebidos, créditos e débitos legalmente admitidos, ajustes e eventos; confrontar com os serviços oficiais de apuração quando disponíveis.\n4. Revisão humana e conclusão: identificar inconsistências, corrigir pelo procedimento aplicável e cumprir os prazos específicos de cada obrigação. A apuração assistida não dispensa conferência contábil/fiscal.",
        "k": "PROCESSO",
        "id": "14-05"
      },
      {
        "t": "Cronograma dos Novos Documentos e Declarações",
        "x": "Cronograma oficial RFB/CGIBS, divulgado em 31/07/2026 pelo Ato Conjunto nº 4/2026: obrigações de documentos fiscais são escalonadas, com marcos em 03/08/2026, 01/10/2026, 15/11/2026, 01/12/2026 e 01/01/2027. O marco obrigatório é distinto da previsão de publicação de leiautes, que pode mudar.\n* 01/11/2026: obrigação específica do Emissor Nacional da NFS-e para ME/EPP prestadoras de serviços optantes pelo Simples, conforme Res. CGSN 191/2026.\n* 01/01/2027: início dos efeitos de IBS/CBS para o Simples nas hipóteses aplicáveis, além de marcos do cronograma de NF-e/NFC-e/CT-e/NFS-e do Simples, Duimp, NF-e de importação, DeRE e combustíveis, conforme regras de cada documento.\n* 09/10/2026: Receita divulgou aprovação da NT 009 v1.01 e NT 010 para NFS-e, incluindo ajustes de comércio exterior e evento de manifestação do adquirente.\n* 19/10/2026: mudanças da NT 010/NFS-e Via e manifestação do adquirente disponibilizadas em produção segundo o Portal NFS-e.\n* 20/10/2026: release 1 da NT 009 disponibilizado para testes em produção restrita, com mudanças de CST/cClassTrib, novos fatos geradores e vAjusteBC; isso não significa produção geral.\nRotina recomendada: manter uma matriz por documento, versão de XML, ambiente, data de início, CST/cClassTrib, eventos e responsável pela homologação. Consulte o cronograma oficial sempre que for implantar mudanças no emissor.",
        "k": "CONFORMIDADE",
        "id": "14-07"
      },
      {
        "t": "Próximo passo: Módulo 15",
        "x": "Se o documento fiscal registra a dívida em tempo real, como ocorre a quitação financeira quando a transação é liquidada eletronicamente no sistema bancário? O que é o Split Payment? Como funciona a Plataforma Pública do Split Payment (PPSP) e como conciliar notas, bancos e contabilidade? Esses mecanismos são explorados no Módulo 15.",
        "k": "PRÓXIMA ETAPA",
        "id": "14-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "15",
    "title": "Split Payment e Conciliação Financeira",
    "subtitle": "Entenda como o split payment pode afetar o caixa e como conciliar documento fiscal, meio de pagamento e banco.",
    "blocks": [
      {
        "t": "O efeito do split payment no caixa",
        "x": "Em linguagem simples: quando o split payment for aplicável, parte do IBS/CBS pode ser segregada no pagamento antes de o dinheiro chegar ao caixa da empresa.\n\nNo sistema histórico de arrecadação, a empresa recebia a integralidade do valor faturado em sua conta bancária, utilizava esse montante como capital de giro ao longo do mês e recolhia os tributos em guia própria (DARF, DAE ou DAS) no mês subsequente. Essa dinâmica permitia o uso transitório do imposto para financiar operações correntes.\nO Split Payment pode alterar essa mecânica financeira ao permitir a segregação de IBS e CBS no momento da liquidação financeira, quando o mecanismo estiver implementado e for aplicável à operação e ao instrumento de pagamento. A LC 214/2025 prevê implementação gradual e admite hipóteses de adoção facultativa definidas em ato conjunto. Portanto, não se deve presumir que toda venda em cartão, Pix ou boleto já sofrerá retenção automática idêntica desde o primeiro dia.",
        "k": "ESTUDO",
        "id": "15-01"
      },
      {
        "t": "Recebimento integral × cenário com split payment",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nO cliente pagava R$ 10.000,00 na maquininha de cartão; a credenciadora descontava sua taxa e depositava o valor restante na conta corrente da empresa. A empresa utilizava esse dinheiro livremente para pagar folha de pagamento e fornecedores, e só no dia 20 do mês seguinte pagava a guia de ICMS, ISS ou PIS/Cofins. Se a empresa entrasse em crise financeira, deixava de pagar a guia tributária para cobrir o caixa operacional.\nExemplo Prático Antigo: Uma loja de varejo faturava R$ 100.000,00 no cartão em dezembro e utilizava o valor dos tributos (cerca de R$ 20.000,00) como capital de giro até o vencimento em janeiro.\nCENÁRIO DIDÁTICO COM SPLIT PAYMENT APLICÁVEL\nQuando o split payment estiver implementado para a operação e para o instrumento de pagamento, a liquidação poderá segregar IBS e CBS conforme as regras vigentes. Para visualizar o efeito financeiro, este curso utiliza a premissa de 9,21% de CBS e 18,70% de IBS. Isso não significa que todo cartão, Pix ou boleto esteja automaticamente sujeito à mesma retenção desde o primeiro dia.\nExemplo Didático: em uma operação-base de R$ 10.000,00 sujeita à premissa de 27,91%, a segregação hipotética seria de R$ 2.791,00, além da taxa de intermediação aplicável.",
        "k": "COMPARATIVO",
        "id": "15-02"
      },
      {
        "t": "Regras principais (Arts. 31 a 36 da LC 214/2025)",
        "x": "* Split payment não cria novo fato gerador: é técnica de recolhimento vinculada à liquidação financeira, quando o mecanismo estiver efetivamente implementado e for aplicável.\n* Ato Conjunto RFB/CGIBS nº 2/2026 autorizou a publicação do manual e Swagger da Plataforma Pública do Split Payment; o Ato Técnico Conjunto nº 4/2026 aprovou documentação operacional. Divulgação de API ou especificação técnica não equivale, por si só, à obrigatoriedade universal da segregação para todos os pagamentos.\n* Recolhimento pelo adquirente (LC 214/2025, art. 36): quando o instrumento de pagamento não permitir segregação, o adquirente contribuinte no regime regular pode ter a faculdade de recolher IBS/CBS nos termos da lei, sem transferência automática.\n* Capital de giro: simular a retenção/segregação somente nas operações sujeitas ao mecanismo na etapa efetiva de implantação. Conciliar XML, instituição de pagamento, recebimentos bancários e conta fiscal, respeitando estornos e diferenças.",
        "k": "ESTUDO",
        "id": "15-03"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: Na opção pelo regime regular de IBS/CBS, as operações poderão ficar sujeitas ao split payment conforme sua implementação e regras de abrangência. A premissa de 27,91% é usada apenas nas simulações de operações padrão do curso.\n* Lucro Presumido: deve projetar o fluxo de caixa considerando as operações que efetivamente vierem a ficar sujeitas à segregação, sem pressupor retenção universal.\n* Lucro Real: quando houver split payment, a conciliação entre DF-e, relatório do prestador de pagamento e extrato bancário ajuda a validar os valores segregados e as taxas.",
        "k": "REGIMES",
        "id": "15-04"
      },
      {
        "t": "Simulação Completa de Split Payment e Lançamentos Contábeis",
        "x": "Parâmetros da Venda Comercial com Cartão de Crédito:\n* Valor líquido da mercadoria: R$ 10.000,00\n* CBS destacada (9,21%): R$ 921,00\n* IBS destacado (18,70%): R$ 1.870,00\n* Valor Bruto da NF-e Faturada: R$ 12.791,00\n* Forma de Liquidação: Cartão de Crédito (Taxa da adquirente/credenciadora = 2% sobre a nota = R$ 255,82).\nLiquidação Financeira na Conta Bancária (cenário didático em que o Split Payment está implementado e é aplicável):\n* Total transacionado pelo comprador: R$ 12.791,00\n* (-) Retenção automática de CBS (recolhida direto à Conta Única da União): - R$ 921,00\n* (-) Retenção automática de IBS (recolhida direto ao Comitê Gestor do IBS): - R$ 1.870,00\n* (-) Taxa de Intermediação da Credenciadora (2%): - R$ 255,82\n* (=) Valor Efetivamente Creditado na Conta Corrente da Empresa: R$ 9.744,18.\nRegistro Contábil Estruturado no Plano de Contas:\n// 1. No Faturamento e Emissão da NF-e:\nD — Clientes a Receber / Adquirentes de Cartão (Ativo Circulante) ...... R$ 12.791,00\nC — Receita Bruta de Vendas (Conta de Resultado) ....................... R$ 10.000,00\nC — CBS a Recolher (Passivo Circulante) ................................ R$ 921,00\nC — IBS a Recolher (Passivo Circulante) ................................ R$ 1.870,00\n// 2. Na Liquidação Financeira pelo Split Payment:\nD — Banco Conta Movimento (Ativo Circulante) ........................... R$ 9.744,18 [Recurso líquido creditado]\nD — Despesas Financeiras com Taxas de Cartão (Resultado) ............... R$ 255,82 [Custo da adquirente]\nD — CBS a Recolher / Retenção Split Payment (Passivo Circulante) ....... R$ 921,00 [Baixa da obrigação tributária]\nD — IBS a Recolher / Retenção Split Payment (Passivo Circulante) ....... R$ 1.870,00 [Baixa da obrigação tributária]\nC — Clientes a Receber / Adquirentes de Cartão (Ativo Circulante) ...... R$ 12.791,00 [Baixa integral da duplicata]\nConciliação Tripla no exemplo: a equipe confronta o DF-e, o relatório do prestador de pagamento e o extrato bancário. Os três registros devem explicar o valor faturado, a parcela segregada, as taxas e o valor efetivamente creditado. Diferenças devem ser investigadas antes do fechamento.",
        "k": "EXEMPLO NUMÉRICO",
        "id": "15-05"
      },
      {
        "t": "Split Payment, Créditos e Saldo Credor",
        "x": "O split payment não elimina a necessidade de apuração. A segregação financeira é uma forma de extinção do débito quando aplicável, enquanto o direito ao crédito, o saldo credor e eventual ressarcimento seguem regras próprias. A conciliação deve vincular documento fiscal, liquidação, valor segregado, débito apurado e crédito do adquirente.\nUm erro comum seria concluir que valor retido pelo banco encerra qualquer obrigação do período. A empresa ainda precisa conferir documentos, ajustes, devoluções, créditos e diferenças entre a informação fiscal e financeira.",
        "k": "CONCILIAÇÃO",
        "id": "15-07"
      },
      {
        "t": "Próximo passo: Módulo 16",
        "x": "Com a emissão, apuração e liquidação financeira integradas, o último passo é transformar o conhecimento técnico em diagnóstico, planejamento e execução para os clientes. O Módulo 16 encerra a trilha com consultoria, automação e plano de ação.",
        "k": "PRÓXIMA ETAPA",
        "id": "15-06"
      }
    ],
    "fullCourse": true
  },
  {
    "id": "16",
    "title": "Consultoria, Automação e Plano de Ação",
    "subtitle": "Transforme o conteúdo técnico do curso em diagnóstico, automação, recomendação e plano de ação para clientes.",
    "blocks": [
      {
        "t": "Do diagnóstico ao plano de ação",
        "x": "Em linguagem simples: o objetivo final não é decorar a Reforma, mas transformar as regras em decisões, controles e ações para cada cliente.\n\nA ampliação da automação fiscal, da apuração assistida e dos mecanismos de recolhimento tende a reduzir parte das rotinas manuais e aumenta a importância da análise, da conferência e da consultoria contábil. O escritório de contabilidade deixa de ser um mero emissor de guias de pagamento e assume a posição de consultor estratégico de tomada de decisão.\nO empresariado nacional necessita de diagnósticos fundamentados: simulação da opção híbrida no Simples, análise de conveniência da migração para o Lucro Real perante a LC 224/2025, recomposição técnica de tabelas de preços e planejamento de tesouraria frente ao split payment. O domínio desses pontos consolida o contador como o parceiro corporativo mais estratégico da empresa.",
        "k": "ESTUDO",
        "id": "16-01"
      },
      {
        "t": "Rotina manual × análise e consultoria",
        "x": "COMO ERA ANTES (SISTEMA ANTIGO)\nGrande parte do trabalho contábil tradicional era concentrada em digitação, emissão de guias e conciliações manuais. Isso reduzia o tempo disponível para análise, planejamento e orientação do cliente.\nExemplo Prático Antigo: Equipes inteiras passavam semanas digitando extratos bancários e conferindo notas fiscais de compras para gerar o SPED Fiscal no final do mês.\nCOMO É AGORA (REFORMA TRIBUTÁRIA)\nCom o avanço da apuração assistida e, quando aplicável, do split payment, parte das rotinas pode ser automatizada. O contador continua responsável por validar exceções e ganha mais espaço para comparar regimes, revisar preços, acompanhar margens e automatizar conciliações de extratos e documentos fiscais.\nExemplo Prático Atual: O escritório utiliza rotinas de importação de extratos OFX/CSV e conciliação automatizada para reduzir retrabalho, direcionando a equipe às exceções, à validação dos dados e à consultoria tributária.",
        "k": "COMPARATIVO",
        "id": "16-02"
      },
      {
        "t": "Roteiro Executivo de Consultoria Tributária em 5 Etapas",
        "x": "1. Diagnóstico e Segmentação da Carteira: Classificar os clientes entre operações B2B (relevância dos créditos) e B2C (sensibilidade ao preço de gôndola), cruzando com os regimes tributários vigentes.\n2. Auditoria de Contratos de Longo Prazo: Revisar contratos de fornecimento continuado para inserir cláusulas de reequilíbrio econômico-financeiro frente à extinção dos tributos antigos.\n3. Reengenharia de Preços e Margens: Simular na prática a purgação dos tributos por dentro e aplicação da alíquota por fora para garantir a rentabilidade do cliente.\n4. Adequação de Tesouraria e Capital de Giro: Dimensionar o impacto da perda transitória do caixa de tributos decorrente do split payment.\n5. Saneamento Tecnológico e Homologação de Emissores: Auditar cadastros de NCM/NBS e homologar os sistemas emissores para a NFS-e nacional até 01/11/2026.",
        "k": "ESTUDO",
        "id": "16-03"
      },
      {
        "t": "Engenharia de Dados e Automação Contábil",
        "x": "* Normalização de Extratos Bancários (OFX e CSV): Utilização de rotinas inteligentes para padronizar e conciliar automaticamente extratos de múltiplas contas bancárias e relatórios de adquirentes de cartão;\n* Confronto Automatizado de XMLs: Cruzamento eletrônico em lote entre os XMLs capturados na base nacional fazendária e as integrações no software de contabilidade (como o Domínio Sistemas);\n* Parametrização Preventiva de Regras Fiscais: Configuração de históricos padronizados e regras de classificação contábil automática, direcionando a equipe técnica para a auditoria de divergências e análise gerencial.",
        "k": "ESTUDO",
        "id": "16-04"
      },
      {
        "t": "Como isso afeta cada regime",
        "x": "* Simples Nacional: Entrega de laudo comparativo entre o DAS padrão e a opção pelo regime híbrido (com simulação de créditos transferíveis a clientes B2B) e transição para o regime de competência antes de 01/01/2027.\n* Lucro Presumido: Apresentação de estudo comparativo oficial entre Lucro Presumido e Lucro Real, demonstrando o efeito da majoração de presunção da LC 224/2025 para receitas acima de R$ 5 milhões.\n* Lucro Real: Estruturação de serviço continuado de auditoria de apuração assistida, governança sobre créditos tributários e monitoramento preventivo de retenções de split payment.",
        "k": "REGIMES",
        "id": "16-05"
      },
      {
        "t": "Da formação tributária à atuação por departamento",
        "x": "Os módulos anteriores construíram a base técnica: IBS/CBS, créditos, tratamentos específicos, transição, documentos, preços e split payment. Agora o passo seguinte é distribuir o conhecimento entre os departamentos, com atribuições concretas e controles verificáveis.\nA Reforma muda diretamente a rotina do Fiscal e parte dos processos Contábeis, Financeiros e tecnológicos; já a Legalização, o RH/DP, o Jurídico e a Gestão precisam avaliar impactos cadastrais, contratuais, decisórios e operacionais conforme as características de cada cliente. O RH/DP, por exemplo, não deve confundir IBS/CBS com mudanças automáticas na folha, no FGTS ou no eSocial.\nAs próximas etapas trazem um mapa por área, um fluxo integrado, um caso de cliente e um checklist de preparação para o escritório.",
        "k": "ESTUDO",
        "id": "16-06"
      },
      {
        "t": "Padrão de Entrega Jaguar",
        "x": "Toda análise entregue ao cliente deve separar: regra legal vigente, premissa da simulação, dado fornecido pelo cliente e conclusão condicionada. O relatório deve registrar a data da legislação consultada, a origem dos dados, as exceções identificadas e as ações recomendadas.\nNo JAGUAR RT, CBS de 9,21% e IBS cheio de 18,70% permanecem premissas didáticas temporárias. Antes de uma decisão contratual ou tributária real, a equipe deve substituir a premissa pela alíquota efetivamente aplicável à operação e ao período.",
        "k": "PADRÃO JAGUAR",
        "id": "16-07"
      },
      {
        "t": "Impacto da Reforma em cada departamento do escritório",
        "x": "A Reforma Tributária do Consumo não é assunto exclusivo do setor Fiscal. Ela muda as informações que circulam entre oito áreas do escritório e das empresas clientes. O impacto não é igual em todas: algumas recebem obrigações legais diretas; outras precisam adaptar contratos, cadastros, decisões e controles.\n* Fiscal: documentos eletrônicos, classificação tributária, IBS/CBS, apuração, créditos, regimes específicos e cronograma de substituição dos tributos.\n* Contábil: conciliação entre lançamentos fiscais, débitos e créditos recuperáveis, extratos bancários, custos e demonstrações.\n* Legalização: dados cadastrais, atividade real, decisões de enquadramento e opções formais pelo Simples ou regime regular de IBS/CBS.\n* RH/Departamento Pessoal: principalmente impactos indiretos no custo e na contratação de benefícios e serviços. IBS/CBS não substituem automaticamente eSocial, INSS, FGTS ou IRRF da folha.\n* Financeiro/Tesouraria: previsão de caixa, recebíveis, créditos, ressarcimentos e split payment quando efetivamente aplicável.\n* Comercial e Compras: preço, custo efetivo do comprador, negociação de contratos e análise de créditos permitidos.\n* Tecnologia/ERP: cadastro NCM/NBS, CST/cClassTrib, leiautes, documentos, API, homologação, auditoria e contingência.\n* Jurídico/Gestão/Atendimento: cláusulas contratuais, riscos, comunicação ao cliente, decisões documentadas e treinamento.\nA regra do trabalho integrado é simples: o setor dono do processo prepara os dados, o Fiscal valida a incidência, o Contábil concilia o resultado e a Gestão aprova as ações sensíveis.",
        "k": "ESTUDO",
        "id": "16-08"
      },
      {
        "t": "Fiscal e Contábil: da nota fiscal ao lançamento e à conciliação",
        "x": "Fluxo recomendado entre departamentos:\n1. Fiscal identifica a operação: mercadoria ou serviço, cliente e destino, regime, NCM/NBS, CST, cClassTrib e documento fiscal exigido naquela data.\n2. Tecnologia valida o leiaute, o ambiente (produção ou teste) e os eventos eletrônicos, evitando rejeições e campos incorretos.\n3. Fiscal verifica débitos e créditos efetivamente admitidos de CBS/IBS, tributos antigos ainda existentes e ajustes por ano da transição.\n4. Contábil registra débitos, créditos recuperáveis e obrigações de acordo com a substância econômica, sem presumir direito de crédito por toda compra.\n5. Financeiro confere pagamentos, extrato, adquirentes, abatimentos, estornos e eventuais recolhimentos por split payment.\n6. Fiscal e Contábil reconciliam o saldo com as informações oficiais disponíveis e documentam diferenças, pendências e responsáveis.\nExemplo: compra de mercadoria com IBS/CBS indicado no XML não autoriza automaticamente um crédito. É necessário verificar hipótese legal, condições da operação, documento e tratamento na escrituração antes de reduzir o valor do tributo a recolher.\nControles mínimos: relatório de notas rejeitadas, conciliação de saldos por tributo e período, trilha de ajuste, documentação de crédito e aprovação da revisão.",
        "k": "PROCESSO",
        "id": "16-09"
      },
      {
        "t": "Legalização e RH/DP: o que muda e o que permanece",
        "x": "LEGALIZAÇÃO — IMPACTOS CADASTRAIS E DE ENQUADRAMENTO\n* O departamento deve acompanhar inscrições, atividade praticada, objeto social, CNAE, mudanças societárias e opções tributárias para assegurar consistência de dados usados nas apurações.\n* Nem toda empresa precisa alterar CNAE, CNPJ ou contrato social por causa da Reforma: a correção depende de divergência real ou de exigência específica.\n* Para os optantes do Simples, diferenciar a escolha de ingresso ou retorno ao regime da opção pelo recolhimento regular de IBS/CBS. A Resolução CGSN nº 194/2026 e orientações da Receita Federal devem ser verificadas para prazos e efeitos.\n* A decisão por regime regular de IBS/CBS deve ser baseada em simulação fiscal, impacto em crédito de cliente, fluxo de caixa e formalização do consentimento.\n\nRH E DEPARTAMENTO PESSOAL — IMPACTOS PREDOMINANTEMENTE INDIRETOS\n* A Reforma do Consumo não extingue eSocial, FGTS, contribuições previdenciárias nem IRRF sobre folha. Não prometa redução automática desses encargos.\n* O DP pode apoiar a revisão do custo dos contratos de alimentação, transporte, saúde, terceirização e tecnologia usados pelos colaboradores.\n* O tratamento de IBS/CBS e eventual direito de crédito em benefícios ou serviços depende de regras próprias; o RH deve fornecer os contratos e dados, enquanto o Fiscal avalia o enquadramento.\n* A equipe precisa de treinamento para explicar aos clientes a diferença entre Reforma do Consumo e legislação trabalhista/previdenciária.\n\nExemplo integrado: a empresa renegocia plano de saúde de funcionários. RH organiza contrato e beneficiários; Financeiro avalia desembolsos; Fiscal confere o tratamento aplicável; Contábil registra corretamente. Nenhum dos setores presume crédito ou redução da folha sem fundamento legal.",
        "k": "ESTUDO",
        "id": "16-10"
      },
      {
        "t": "Financeiro, Comercial, Tecnologia e Jurídico: decisões conjuntas",
        "x": "FINANCEIRO: projetar entradas e saídas por ano da transição; monitorar ressarcimento e créditos conforme requisitos legais; conciliar notas, bancos, adquirentes e valores eventualmente segregados quando o split payment estiver implementado para a operação.\nCOMERCIAL E COMPRAS: comparar fornecedores pelo custo efetivo e não apenas pelo valor da NF; simular preços de compra e venda por regime e ano; informar ao cliente que crédito não é automático nem universal.\nTECNOLOGIA: planejar atualização dos emissores e cadastros fiscais; distinguir nota técnica publicada, implantação em ambiente de testes e obrigatoriedade em produção; registrar evidências de homologação, rejeições e contingência.\nJURÍDICO: revisar contratos de longo prazo, cláusulas de preço, tributos, local da operação e responsabilidade por dados/documentos; não alterar automaticamente todos os contratos sem análise.\nGESTÃO E ATENDIMENTO: segmentar clientes por atividade e regime; documentar premissas, fontes e data da orientação; coordenar reuniões para explicar riscos e escolhas concretas.\nExemplo: em uma empresa comercial do Simples, a decisão sobre IBS/CBS no regime regular envolve Legalização (formalização), Fiscal (cenários), Compras (créditos na cadeia), Financeiro (caixa), Jurídico (contratos) e Atendimento (comunicação ao cliente).",
        "k": "ESTUDO",
        "id": "16-11"
      },
      {
        "t": "Caso prático: atendimento integrado a uma empresa do Simples",
        "x": "Situação: empresa de manutenção industrial optante pelo Simples atende clientes do Lucro Real, presta serviços em diferentes municípios e pretende renovar contratos para 2027.\nEtapa 1 — Legalização confirma enquadramento, atividade, inscrições e se existe prazo aberto e opção aplicável ao regime regular de IBS/CBS, utilizando os atos vigentes (inclusive Resolução CGSN nº 194/2026).\nEtapa 2 — Fiscal separa regras de 2026, 2027 e fase integral: em 2027–2028 o IBS transitório é de 0,1%; os percentuais didáticos 9,21%/18,70% NÃO substituem a alíquota legal de cada ano e operação.\nEtapa 3 — Comercial levanta preços e descontos e pergunta aos clientes quais créditos podem realmente ser aproveitados, sem prometer transferência integral pelo Simples padrão.\nEtapa 4 — Tecnologia verifica o emissor de NFS-e e o cronograma aplicável; para ME/EPP prestadora do Simples, observar a regra específica da NFS-e nacional a partir de 01/11/2026 e os efeitos de IBS/CBS a partir de 01/01/2027.\nEtapa 5 — Contábil e Financeiro montam cenários de custo, registros, créditos, recebimento e eventual mecanismo de pagamento segregado, quando aplicável.\nEtapa 6 — Jurídico revisa contratos e a Gestão entrega recomendação formal ao cliente, com premissas, riscos, prazo e responsáveis.\nPergunta de discussão: se a empresa tem o mesmo faturamento com vários clientes, a opção pelo IBS/CBS regular será sempre melhor? Não. Depende das compras, margens, créditos permitidos, perfil B2B/B2C, contrato, fluxo de caixa e regras legais.",
        "k": "CASO PRÁTICO",
        "id": "16-12"
      },
      {
        "t": "Checklist de preparação por área e evidências de conclusão",
        "x": "O escritório pode acompanhar oito entregas objetivas, com responsável, prazo e evidência:\n* Fiscal: matriz de operações e documentos (CST, cClassTrib, NCM/NBS e tributação aplicável); evidência: revisão de XML e rejeições resolvidas.\n* Contábil: plano de contas e conciliação por tributo e período; evidência: relatório de saldos e diferenças justificadas.\n* Legalização: cadastro e opções tributárias revisados; evidência: protocolo e decisão formal do cliente quando necessário.\n* RH/DP: inventário de benefícios e contratos sensíveis, sem supor alteração da folha; evidência: avaliação conjunta com Fiscal e Financeiro.\n* Financeiro: projeção de caixa e conciliação dos recebimentos; evidência: fluxo aprovado e teste de divergências.\n* Comercial/Compras: comparação de custo efetivo e preço por ano/regime; evidência: memória de cálculo e premissas.\n* Tecnologia: integrações e emissores homologados; evidência: testes em ambiente correto e plano de contingência.\n* Jurídico/Gestão: contratos priorizados e comunicação aos clientes; evidência: parecer/resumo e responsáveis pela execução.\nAcompanhamento: separar situação 'não iniciado', 'em análise', 'pronto para homologar' e 'concluído'; registrar a data e o texto legal consultado. Revisar obrigações quando houver novos atos da Receita, CGIBS, CGSN e municípios.",
        "k": "CONFORMIDADE",
        "id": "16-13"
      }
    ],
    "fullCourse": true
  }
];

const TIMELINE = {
  "2026": {
    "label": "Ano-teste",
    "text": "CBS 0,9% e IBS 0,1%. O recolhimento tem regras de compensação e pode ser dispensado quando cumpridas as obrigações acessórias; as alíquotas-teste não se aplicam às operações dos optantes do Simples Nacional."
  },
  "2027": {
    "label": "CBS + IBS inicial",
    "text": "PIS/Cofins são extintos; IBS de 0,1% (0,05% estadual + 0,05% municipal); CBS pela alíquota aplicável ao ano reduzida em 0,1 p.p.; Imposto Seletivo entra em vigor; IPI é reduzido a zero na maior parte das hipóteses."
  },
  "2028": {
    "label": "Fase inicial",
    "text": "Mantém a estrutura de IBS 0,1% e CBS conforme a alíquota aplicável. Não trate 9% como número oficial por definição."
  },
  "2029": {
    "label": "90 / 10",
    "text": "Começa a redução gradual de ICMS/ISS: 90% do sistema antigo e avanço do IBS na proporção de transição prevista."
  },
  "2030": {
    "label": "80 / 20",
    "text": "ICMS/ISS a 80%; IBS avança na transição."
  },
  "2031": {
    "label": "70 / 30",
    "text": "ICMS/ISS a 70%; IBS avança na transição."
  },
  "2032": {
    "label": "60 / 40",
    "text": "ICMS/ISS a 60%; último ano antes da vigência integral do novo modelo."
  },
  "2033": {
    "label": "Novo modelo",
    "text": "Vigência integral do novo modelo e extinção de ICMS/ISS. Permanecem CBS, IBS, Imposto Seletivo e IPI nas hipóteses residuais previstas."
  }
};

const SOURCES = [
  [
    "LC 214/2025 — texto atualizado",
    "https://www2.camara.leg.br/legin/fed/leicom/2025/leicomplementar-214-16-janeiro-2025-796905-normaatualizada-pl.html",
    "Lei principal de IBS, CBS e Imposto Seletivo, já incorporando alterações posteriores, inclusive da LC 227/2026."
  ],
  [
    "LC 227/2026",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/legislacao/principais-marcos-regulatorios",
    "Marco de 2026 que institui o CGIBS e altera pontos relevantes da implementação e da LC 214."
  ],
  [
    "Receita Federal — Entenda a RTC",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/entenda",
    "Resumo oficial da transição 2026–2033 e dos tributos que entram e saem."
  ],
  [
    "Receita — Simples puro e híbrido 2027",
    "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/setembro/receita-federal-alerta-comeca-hoje-o-prazo-para-opcao-pelo-simples-nacional-e-para-a-escolha-do-modelo-de-recolhimento-do-ibs-e-da-cbs-em-2027/",
    "Prazos e escolha entre IBS/CBS dentro do Simples ou no regime regular."
  ],
  [
    "Receita — fim do regime de caixa no Simples",
    "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/agosto/regime-de-caixa-deixa-de-ser-utilizado-na-apuracao-do-simples-nacional",
    "Mudança da base mensal do Simples a partir de 2027."
  ],
  [
    "Receita — NFS-e nacional para Simples",
    "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/agosto/simples-nacional-nfs-e-nacional-sera-obrigatoria-para-me-e-epp-a-partir-de-1o-de-novembro-de-2026",
    "Obrigatoriedade da NFS-e nacional e marco de CBS/IBS para optantes."
  ],
  [
    "Receita — Orientações da RTC",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/orientacoes-da-reforma-tributaria",
    "Cronogramas oficiais de documentos fiscais e atos conjuntos RFB/CGIBS."
  ],
  [
    "NFS-e — Nota Técnica 009/2026",
    "https://www.gov.br/nfse/pt-br/noticias/publicada-a-nota-tecnica-009-da-nfs-e",
    "Adequações do layout da NFS-e para IBS/CBS."
  ],
  [
    "LC 224/2025",
    "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp224.htm",
    "Acréscimo de 10% nos percentuais de presunção e regra do limite anual de R$ 5 milhões no Lucro Presumido."
  ],
  [
    "Decreto 12.955/2026 — Regulamento da CBS",
    "https://www2.camara.leg.br/legin/fed/decret/2026/decreto-12955-29-abril-2026-799019-normaatualizada-pe.html",
    "Regulamenta a CBS e detalha regras operacionais, inclusive reduções e tratamentos específicos."
  ],
  [
    "RFB/CGIBS — Atos Conjuntos",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/legislacao/atos-conjuntos/",
    "Inclui o Ato Conjunto nº 4/2026, com cronograma de início da obrigatoriedade de documentos fiscais eletrônicos."
  ],
  [
    "RFB/CGIBS — Atos Técnicos Conjuntos",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/legislacao/atos-tecnicos-conjuntos/",
    "Inclui o Ato Técnico Conjunto nº 4/2026, referente à documentação técnica da Plataforma Pública do Split Payment."
  ],
  [
    "Receita — Legislação da RTC (atualizada em outubro/2026)",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/legislacao",
    "Referências consolidadas da EC 132, LC 214, LC 227, regulamento da CBS e atos conjuntos RFB/CGIBS."
  ],
  [
    "Receita — Opções do Simples 2027 (Res. CGSN 194/2026)",
    "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/setembro/simples-nacional-2027-entenda-os-novos-prazos-e-faca-sua-escolha-com-consciencia-e-tranquilidade/",
    "Prazos de opção de 2027 e diferença entre o ingresso no Simples e o regime regular do IBS/CBS."
  ],
  [
    "NFS-e — NT 009 v1.01 e NT 010 (outubro/2026)",
    "https://www.gov.br/nfse/pt-br/noticias/publicado-o-ato-tecnico-conjunto-rfb-cgibs-no-7-aprovando-a-versao-1-01-da-nota-tecnica-009-nfs-e-e-a-nota-tecnica-010-da-nfs-e-via",
    "Ato Técnico Conjunto nº 7/2026, alterações de leiaute e manifestação do adquirente."
  ],
  [
    "NFS-e — Atualizações dos ambientes (20/10/2026)",
    "https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/atualizacoes-e-implantacoes",
    "Diferença entre alterações em produção restrita/testes e alterações efetivamente em produção."
  ],
  [
    "RFB — Cronograma DF-e da reforma",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/orientacoes-da-reforma-tributaria",
    "Datas escalonadas de obrigatoriedade, leiautes e programa de conformidade em 2026/2027."
  ],
  [
    "RTAV + Material de Estudo 26/09/2026",
    "#",
    "Base didática do treinamento. Exemplos, estimativas e opiniões do palestrante são identificados e não substituem a regra oficial."
  ],
  [
    "Receita Federal — Curso RTC 2026",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/curso/programacao",
    "Programação oficial com comércio internacional, ressarcimento/cashback, regimes específicos, ZFM, combustíveis e demais temas setoriais."
  ],
  [
    "SPED — Declaração de Regimes Específicos (DeRE)",
    "https://www.gov.br/sped/pt-br/assuntos/documentos-fiscais/dere",
    "Documentação e orientações da DeRE, sua relação com a apuração assistida e com regimes específicos."
  ],
  [
    "Receita — DeRE Perguntas Frequentes",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/perguntas-frequentes/sped/dere/dere",
    "Abrangência, obrigatoriedade, entrega consolidada pelo CNPJ raiz e coexistência com documentos fiscais."
  ],
  [
    "Receita — Duimp e Reforma Tributária",
    "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/despacho-de-importacao/sistemas/duimp/rtc/reforma-tributaria-do-consumo",
    "Orientações dos novos campos e do cálculo de IBS/CBS por item na importação."
  ],
  [
    "Receita — Materiais oficiais dos módulos RTC",
    "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/curso/material-de-apoio/modulos-do-curso",
    "Materiais técnicos do curso RFB/CFC, incluindo ZFM, combustíveis, Imposto Seletivo e outros temas setoriais."
  ]
];
