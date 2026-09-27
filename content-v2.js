const STUDY_MODULES = [
  {
    "id": "01",
    "title": "Mapa completo da Reforma",
    "subtitle": "A espinha dorsal para entender IBS, CBS, Imposto Seletivo e não se perder nos detalhes.",
    "intro": "Comece pela arquitetura, não pela alíquota. A EC 132/2023 criou a nova estrutura constitucional e a LC 214/2025, alterada pela LC 227/2026, disciplina IBS, CBS e Imposto Seletivo. Para estudar qualquer operação, siga sempre a mesma ordem: incidência → fato gerador → local → base → alíquota → crédito → recolhimento → documento → transição.",
    "before": "No sistema atual, PIS/Pasep, Cofins, IPI, ICMS e ISS possuem competências, bases, créditos e regras próprias. O resultado muda conforme atividade, produto, serviço, destino e regime.",
    "after": "O consumo passa a ter dois tributos gerais coordenados — CBS federal e IBS de competência compartilhada — além do Imposto Seletivo nas hipóteses legais. A arquitetura é comum, mas a carga efetiva não é automaticamente igual para todos os setores ou operações.",
    "blocks": [
      {
        "t": "1. Incidência — primeiro pergunte o que está sendo fornecido",
        "k": "REGRA OFICIAL",
        "x": "IBS e CBS incidem, como regra, sobre operações onerosas com bens e serviços. O conceito de bens inclui bens materiais, imateriais e direitos; operações não onerosas só são tributadas nas hipóteses expressamente previstas em lei."
      },
      {
        "t": "2. IVA dual — dois tributos, uma lógica coordenada",
        "k": "CONCEITO",
        "x": "CBS pertence à União. O IBS reúne as competências estadual e municipal do destino. Por isso não é correto dizer que a Reforma criou um único imposto sobre consumo."
      },
      {
        "t": "3. Neutralidade",
        "k": "REGRA OFICIAL",
        "x": "A LC 214 estabelece a neutralidade como princípio: IBS e CBS devem evitar distorcer decisões de consumo e de organização econômica, observadas as exceções constitucionais e legais."
      },
      {
        "t": "4. Imposto Seletivo",
        "k": "REGRA OFICIAL",
        "x": "É tributo federal separado de IBS/CBS e entra em vigor a partir de 2027. Incide nas hipóteses definidas em lei sobre bens e serviços prejudiciais à saúde ou ao meio ambiente."
      },
      {
        "t": "5. O que continua exigindo enquadramento",
        "k": "ATENÇÃO",
        "x": "Destino, redução de alíquota, alíquota zero, regime específico, Simples Nacional, classificação do item e natureza da operação continuam relevantes. 'Tudo vira 28%' não é uma regra jurídica."
      },
      {
        "t": "6. Roteiro mental Jaguar",
        "k": "MÉTODO",
        "x": "Para qualquer caso, responda: o que é a operação? quando ocorre? onde ocorre? qual a base? qual alíquota? existe redução ou regime específico? quais créditos? como será recolhido? qual documento? qual efeito na transição?"
      },
      {
        "t": "7. Regra oficial x premissa de aula",
        "k": "DIDÁTICA",
        "x": "Números como 9%, 27,91% e 28% aparecem no RTAV como premissas ou referências de exercício. Sempre marque no estudo o que é legislação vigente e o que é hipótese de simulação."
      }
    ],
    "qa": [
      [
        "A Reforma elimina todos os tributos atuais de uma vez?",
        "Não. A substituição ocorre por transição: PIS/Cofins saem antes, ICMS/ISS diminuem gradualmente de 2029 a 2032 e o novo modelo entra integralmente em 2033."
      ],
      [
        "CBS e IBS terão exatamente a mesma carga para indústria, comércio e serviços?",
        "Não necessariamente. A estrutura geral é comum, mas alíquota, destino, reduções, regimes específicos e créditos podem alterar a carga efetiva."
      ],
      [
        "O IBS é federal?",
        "Não. É de competência compartilhada entre Estados, Municípios e Distrito Federal. A CBS é federal."
      ],
      [
        "Posso usar 28% como alíquota padrão definitiva?",
        "Não. Use apenas como premissa identificada quando o exercício pedir. A alíquota aplicável depende das regras oficiais do período e da operação."
      ]
    ],
    "legal": "EC 132/2023; LC 214/2025, arts. 1º a 6º, texto atualizado pela LC 227/2026; Decreto 12.955/2026 para a CBS; Receita Federal — Entenda a RTC; RTAV."
  },
  {
    "id": "02",
    "title": "Fato gerador e pagamentos antecipados",
    "subtitle": "Fornecimento, execução continuada, sinal, parcelas e por que antecipação não é split payment.",
    "intro": "O atalho 'pagamento ou fornecimento, o que vier primeiro' ajuda em exercícios, mas não substitui a regra legal. O art. 10 parte do fornecimento, cria regra própria para operações continuadas/fracionadas e disciplina antecipações quando há pagamento antes do fornecimento.",
    "before": "Nos tributos atuais, o momento tributário depende da legislação de cada tributo. Um sinal comercial, por si só, não deve ser tratado como se todas as incidências atuais seguissem a mesma regra.",
    "after": "No IBS/CBS, o momento do fornecimento é a referência geral. Pagamento antecipado gera antecipação tributária; no fornecimento é feito o cálculo definitivo e o valor antecipado é ajustado.",
    "blocks": [
      {
        "t": "1. Regra geral",
        "k": "REGRA OFICIAL",
        "x": "O fato gerador ocorre no momento do fornecimento. Para serviços em geral, a lei considera o término do fornecimento, sem prejuízo das hipóteses específicas do art. 10."
      },
      {
        "t": "2. Execução continuada ou fracionada",
        "k": "REGRA OFICIAL",
        "x": "Nessas operações, o fato gerador ocorre na primeira entre: a exigibilidade da parte da contraprestação correspondente a cada pagamento e o pagamento da obrigação decorrente do fornecimento."
      },
      {
        "t": "3. Pagamento antes do fornecimento",
        "k": "REGRA OFICIAL",
        "x": "Cada pagamento integral ou parcial anterior ao fornecimento gera antecipação. A base da antecipação é o valor da parcela paga."
      },
      {
        "t": "4. Alíquota da antecipação",
        "k": "REGRA OFICIAL",
        "x": "Usa-se a alíquota vigente e aplicável na data do documento fiscal eletrônico correspondente ao pagamento ou na data do pagamento, o que ocorrer primeiro."
      },
      {
        "t": "5. Ajuste no fornecimento",
        "k": "REGRA OFICIAL",
        "x": "No fornecimento, calcula-se o valor definitivo sobre o total da operação com a alíquota vigente nessa data. Se a antecipação foi menor, surge diferença a débito; se foi maior, aplicam-se as regras de pagamento indevido ou a maior."
      },
      {
        "t": "6. Exemplo do RTAV",
        "k": "EXEMPLO DIDÁTICO",
        "x": "Sinal em 28/01 e entrega em 10/02: a parcela paga antes gera antecipação. Na entrega, a operação é recalculada integralmente e o antecipado é confrontado com o valor definitivo."
      },
      {
        "t": "7. Cancelamento",
        "k": "REGRA OFICIAL",
        "x": "Se o fornecimento não ocorrer, inclusive por distrato, aplicam-se as regras de cancelamento previstas na legislação."
      },
      {
        "t": "8. Não confunda com split payment",
        "k": "ERRO COMUM",
        "x": "Antecipação responde 'quando o débito nasce/é antecipado'. Split payment responde 'como o tributo é segregado e recolhido na liquidação financeira'. São camadas diferentes."
      }
    ],
    "qa": [
      [
        "Receber sinal antes da entrega pode gerar IBS/CBS?",
        "Pode gerar antecipação sobre a parcela paga, observadas as regras do art. 10."
      ],
      [
        "Pagamento posterior ao fornecimento muda o fato gerador geral?",
        "Não. Fora das regras específicas, o fornecimento continua sendo a referência."
      ],
      [
        "Execução continuada segue exatamente a mesma regra de uma venda única?",
        "Não. O §3º do art. 10 traz regra própria ligada à exigibilidade da parcela e ao pagamento."
      ],
      [
        "Antecipação e split payment são a mesma coisa?",
        "Não. Uma trata do momento tributário; a outra é modalidade de recolhimento."
      ]
    ],
    "legal": "LC 214/2025, art. 10, texto atualizado pela LC 227/2026; RTAV; Material de Estudo, págs. 1–3."
  },
  {
    "id": "03",
    "title": "Base de cálculo: por dentro × por fora",
    "subtitle": "Como limpar a base, identificar exclusões e entender o efeito no preço.",
    "intro": "A alíquota sozinha não explica a carga. O primeiro passo é saber sobre qual valor ela incide. A LC 214 adota como base geral o valor da operação e lista expressamente o que integra e o que não integra essa base.",
    "before": "No método do RTAV, tributos atuais são retirados do preço para descobrir o valor líquido usado como referência. ICMS e ISS aparecem nos exercícios como tributos tratados 'por dentro' na formação atual do preço.",
    "after": "IBS e CBS não integram a própria base. De 2026 a 2032, ICMS, ISS, PIS/Pasep e Cofins incidentes na operação também ficam excluídos da base de IBS/CBS, além das demais exclusões legais.",
    "blocks": [
      {
        "t": "1. Base geral",
        "k": "REGRA OFICIAL",
        "x": "A base de IBS/CBS é o valor da operação. Em regra, entram os valores cobrados pelo fornecedor a qualquer título, inclusive certos acréscimos, juros, encargos, transporte, seguros e outros componentes previstos no art. 12."
      },
      {
        "t": "2. Exclusões expressas",
        "k": "REGRA OFICIAL",
        "x": "Não integram a base, entre outros: o próprio IBS/CBS, IPI, descontos incondicionais e, de 2026 a 2032, ICMS, ISS, PIS/Pasep e Cofins incidentes na operação."
      },
      {
        "t": "3. Imposto Seletivo",
        "k": "PONTO TÉCNICO",
        "x": "O Imposto Seletivo não está entre as exclusões gerais do §2º do art. 12. Por isso, quando incidente e compondo o valor da operação, não deve ser retirado automaticamente da base de IBS/CBS; verifique a regra específica aplicável."
      },
      {
        "t": "4. Fórmula por fora",
        "k": "FÓRMULA DIDÁTICA",
        "x": "Em um exercício com somente tributo por fora: valor final = base limpa × (1 + alíquota). Essa é a lógica usada para ensinar CBS/IBS no RTAV."
      },
      {
        "t": "5. Fórmula por dentro",
        "k": "FÓRMULA DIDÁTICA",
        "x": "Quando o tributo está embutido no preço: preço bruto = líquido ÷ (1 − alíquota embutida). É fórmula de formação de preço, não substituto da apuração legal do tributo."
      },
      {
        "t": "6. Transição",
        "k": "MÉTODO RTAV",
        "x": "Entre 2027 e 2032, o exercício pode ter CBS/IBS no formato novo e ICMS/ISS ainda remanescentes. A sequência didática é: limpar a situação atual → aplicar o novo → embutir o velho que ainda resta."
      },
      {
        "t": "7. Erro mais comum",
        "k": "ERRO COMUM",
        "x": "Somar CBS/IBS diretamente sobre o preço atual pode produzir cascata econômica na simulação, porque o preço atual já contém tributos do sistema antigo."
      },
      {
        "t": "8. Relação inversa com ICMS/ISS",
        "k": "ATENÇÃO",
        "x": "O fato de ICMS/ISS não integrarem a base de IBS/CBS não resolve automaticamente o tratamento inverso durante a transição. O material do RTAV registra controvérsia; não apresente tese judicial como regra pacificada."
      }
    ],
    "qa": [
      [
        "IBS e CBS entram na própria base?",
        "Não. O art. 12 os exclui expressamente."
      ],
      [
        "ICMS e ISS entram na base de IBS/CBS durante toda a transição?",
        "De 2026 a 2032, os montantes incidentes na operação estão entre as exclusões previstas no art. 12."
      ],
      [
        "Desconto sempre reduz a base?",
        "Não. A exclusão é para desconto incondicional que atenda à definição legal."
      ],
      [
        "Posso aplicar a nova alíquota diretamente sobre o preço atual?",
        "Para reprecificação, não é o método recomendado pelo RTAV. Primeiro identifique a base/líquido que está sendo preservado."
      ]
    ],
    "legal": "LC 214/2025, art. 12, texto atualizado pela LC 227/2026; Decreto 12.955/2026; RTAV; Material de Estudo, págs. 3–4 e 8–9."
  },
  {
    "id": "04",
    "title": "Destino e alíquotas",
    "subtitle": "Como localizar a operação e montar CBS + IBS sem transformar estimativas em regra.",
    "intro": "Dizer apenas 'o imposto vai para o destino' é insuficiente. O art. 11 define o local da operação conforme o tipo de bem ou serviço; só depois de identificar esse local é possível determinar as alíquotas de IBS aplicáveis.",
    "before": "ICMS e ISS atuais usam regras próprias de origem, destino, estabelecimento, local da prestação e exceções específicas.",
    "after": "No IBS, o destino jurídico da operação define as parcelas estadual e municipal. A CBS é federal. As alíquotas de cada ente são fixadas por lei específica, usando-se a referência quando a legislação assim determinar.",
    "blocks": [
      {
        "t": "1. Bem móvel material",
        "k": "REGRA OFICIAL",
        "x": "Em regra, o local é o da entrega ou disponibilização ao destinatário. Em operação não presencial, a lei traz critérios para identificar o destino final informado ao fornecedor ou ao transportador."
      },
      {
        "t": "2. Imóveis",
        "k": "REGRA OFICIAL",
        "x": "Para bem imóvel, direito relacionado ao imóvel e serviços prestados fisicamente sobre ele, o local é onde o imóvel está situado."
      },
      {
        "t": "3. Serviço presencial",
        "k": "REGRA OFICIAL",
        "x": "Serviço prestado fisicamente sobre pessoa ou fruído presencialmente por pessoa física usa o local da prestação. Feiras, congressos, espetáculos e congêneres usam o local do evento."
      },
      {
        "t": "4. Transporte",
        "k": "REGRA OFICIAL",
        "x": "Transporte de passageiros usa o local de início. Transporte de carga usa o local da entrega ou disponibilização do bem ao destinatário indicado no documento fiscal."
      },
      {
        "t": "5. Regra residual",
        "k": "REGRA OFICIAL",
        "x": "Para operação onerosa não abrangida pelas regras específicas, usa-se, em regra, o domicílio principal do adquirente residente ou domiciliado no País; se ele estiver no exterior, pode ser usado o domicílio do destinatário residente no País."
      },
      {
        "t": "6. Domicílio principal não é qualquer endereço",
        "k": "ATENÇÃO",
        "x": "Para pessoa jurídica, a lei considera o estabelecimento para o qual o bem ou serviço é fornecido. Quando não houver cadastro regular, existem critérios combinados de endereço, pagamento e geolocalização."
      },
      {
        "t": "7. Como se forma o IBS",
        "k": "REGRA OFICIAL",
        "x": "A alíquota do IBS da operação corresponde à soma da alíquota do Estado de destino e da alíquota do Município de destino; no Distrito Federal, aplica-se a alíquota correspondente às competências acumuladas."
      },
      {
        "t": "8. Quem fixa as alíquotas",
        "k": "REGRA OFICIAL",
        "x": "União, Estados e Municípios fixam suas alíquotas por lei específica. Na ausência de lei própria, aplicam-se as alíquotas de referência da respectiva esfera, conforme a LC 214."
      },
      {
        "t": "9. Números do RTAV",
        "k": "PREMISSA DIDÁTICA",
        "x": "9%, 9,21%, 26,5%, 27,91% e 28% são referências ou estimativas usadas em exercícios do evento. Não devem ser cadastradas como alíquota universal de cliente."
      }
    ],
    "qa": [
      [
        "O endereço de cobrança sempre define o destino do IBS?",
        "Não. O art. 11 usa regras diferentes conforme o tipo de operação."
      ],
      [
        "Venda de mercadoria entregue em outro Estado usa qual referência de destino?",
        "Em regra, o local da entrega ou disponibilização ao destinatário, observadas as regras específicas da operação."
      ],
      [
        "A mesma atividade terá uma alíquota única em todo o Brasil?",
        "A CBS é federal, mas o IBS resulta das alíquotas estadual e municipal do destino, além das reduções e regimes previstos em lei."
      ],
      [
        "Posso usar 28% para qualquer município?",
        "Não. Esse número deve ser tratado como premissa de exercício, não como alíquota oficial universal."
      ]
    ],
    "legal": "LC 214/2025, arts. 11 e 14 a 18, texto atualizado pela LC 227/2026; Receita Federal — Entenda a RTC; RTAV."
  },
  {
    "id": "05",
    "title": "Transição 2026–2033",
    "subtitle": "O calendário oficial, separando alíquota-teste, alíquota nominal e percentual de transição.",
    "intro": "A transição mistura três conceitos diferentes: teste de 2026, IBS inicial de 2027–2028 e substituição gradual de ICMS/ISS pelo IBS de 2029 a 2032. Não confunda percentual de transição com alíquota nominal.",
    "before": "O sistema atual mantém PIS/Pasep, Cofins, IPI, ICMS e ISS, cada qual com suas regras.",
    "after": "CBS e IBS entram por etapas. PIS/Cofins saem em 2027; ICMS/ISS diminuem gradualmente a partir de 2029 e são extintos em 2033; o IPI permanece apenas nas hipóteses residuais previstas.",
    "blocks": [
      {
        "t": "2026 — ano de teste",
        "k": "REGRA OFICIAL",
        "x": "A fase de teste usa CBS de 0,9% e IBS total de 0,1%. Os valores seguem as regras legais de compensação/dispensa; a Receita informa que o recolhimento pode ser dispensado para contribuintes que cumpram as obrigações acessórias previstas."
      },
      {
        "t": "Simples em 2026",
        "k": "REGRA OFICIAL",
        "x": "As alíquotas-teste de 2026 não se aplicam às operações dos optantes do Simples Nacional, conforme a disciplina de transição."
      },
      {
        "t": "2027 e 2028",
        "k": "REGRA OFICIAL",
        "x": "PIS/Pasep e Cofins são extintos. Há IBS de 0,1% e CBS com a redução legal de 0,1 ponto percentual no período. O Imposto Seletivo entra em vigor e o IPI é reduzido a zero para quase todos os produtos, preservadas exceções legais."
      },
      {
        "t": "9% não é uma alíquota universal oficial",
        "k": "ATENÇÃO",
        "x": "O 9% usado no RTAV é uma premissa didática. A alíquota de referência da CBS é fixada segundo o mecanismo legal; não transforme a premissa da aula em cadastro fiscal definitivo."
      },
      {
        "t": "2029 — 90/10",
        "k": "REGRA OFICIAL",
        "x": "ICMS e ISS passam a 90% das alíquotas do sistema antigo e o IBS avança na proporção de 10% da transição. '10%' aqui é proporção de transição, não alíquota nominal de IBS."
      },
      {
        "t": "2030, 2031 e 2032",
        "k": "REGRA OFICIAL",
        "x": "2030: 80/20; 2031: 70/30; 2032: 60/40. A leitura correta é redução progressiva de ICMS/ISS e aumento progressivo da participação do IBS."
      },
      {
        "t": "2033",
        "k": "REGRA OFICIAL",
        "x": "O novo modelo entra integralmente em vigor e ICMS/ISS são extintos. Permanecem CBS, IBS, Imposto Seletivo e o IPI nas hipóteses residuais previstas."
      },
      {
        "t": "Como estudar a transição",
        "k": "MÉTODO",
        "x": "Monte uma linha para cada ano. Para cada linha, separe: tributo antigo remanescente, CBS, IBS, carga total, crédito e efeito no preço ou faturamento. Nunca replique 2027 como se fosse igual até 2033."
      }
    ],
    "qa": [
      [
        "10% de IBS em 2029 significa alíquota nominal de 10%?",
        "Não. É a proporção da transição naquele ano."
      ],
      [
        "2027 e 2028 já têm IBS?",
        "Sim, há IBS de 0,1% no período."
      ],
      [
        "O IPI acaba totalmente em 2027?",
        "Não. A regra geral é redução a zero para quase todos os produtos, com hipóteses residuais preservadas."
      ],
      [
        "Posso usar a mesma projeção de 2027 até 2033?",
        "Não. A composição tributária muda ano a ano."
      ]
    ],
    "legal": "LC 214/2025, regras de transição dos arts. 342 e seguintes, texto atualizado; Receita Federal — Entenda a RTC, atualização de 03/07/2026; RTAV."
  },
  {
    "id": "06",
    "title": "Créditos e custo efetivo",
    "subtitle": "Quando nasce o crédito, como ele é segregado e por que preço pago não é o mesmo que custo econômico.",
    "intro": "A não cumulatividade do novo IVA é ampla, mas não significa 'imposto destacado = crédito automático'. No regime regular, documento fiscal idôneo e extinção do débito da etapa anterior são elementos centrais, com exceções previstas na própria lei.",
    "before": "Hoje, ICMS, IPI e PIS/Cofins têm sistemas de crédito diferentes, com vedações e critérios próprios.",
    "after": "No regime regular de IBS/CBS, os créditos são apropriados separadamente por tributo e conectados ao documento fiscal e às formas legais de extinção do débito.",
    "blocks": [
      {
        "t": "1. Quem pode apropriar",
        "k": "REGRA OFICIAL",
        "x": "O contribuinte sujeito ao regime regular pode apropriar créditos de IBS e CBS nas aquisições, ressalvadas operações de uso ou consumo pessoal e demais vedações legais."
      },
      {
        "t": "2. Documento fiscal idôneo",
        "k": "REGRA OFICIAL",
        "x": "A operação precisa estar comprovada por documento fiscal eletrônico idôneo. Sem documentação correta, o crédito pode não ser apropriável."
      },
      {
        "t": "3. Extinção do débito",
        "k": "REGRA OFICIAL",
        "x": "Como regra, o crédito surge quando os débitos de IBS/CBS da operação anterior são extintos por uma das modalidades previstas na lei."
      },
      {
        "t": "4. Exceção enquanto certos mecanismos não estiverem implementados",
        "k": "REGRA OFICIAL",
        "x": "O art. 48 dispensa temporariamente o requisito de extinção se não tiver sido implementado nem o split payment nem o recolhimento pelo adquirente, condicionando o crédito ao destaque correto no documento fiscal."
      },
      {
        "t": "5. IBS e CBS são controles separados",
        "k": "REGRA OFICIAL",
        "x": "Crédito de IBS não compensa CBS e crédito de CBS não compensa IBS. A escrituração precisa manter os dois saldos segregados."
      },
      {
        "t": "6. Fornecedor do Simples",
        "k": "REGRA OFICIAL",
        "x": "Se o fornecedor recolher IBS/CBS dentro do Simples, ele não apropria créditos desses tributos. O adquirente no regime regular pode apropriar crédito equivalente ao IBS/CBS devido via Simples, observados os requisitos legais."
      },
      {
        "t": "7. Simples no regime regular",
        "k": "REGRA OFICIAL",
        "x": "Se o optante do Simples escolher apurar IBS/CBS pelo regime regular, esses tributos passam a seguir as regras gerais de débito e crédito da LC 214."
      },
      {
        "t": "8. Custo efetivo",
        "k": "MÉTODO RTAV",
        "x": "Para análise comercial: custo efetivo = preço pago − créditos efetivamente aproveitáveis. O crédito depende do regime e da operação, então duas empresas podem ter custos econômicos diferentes pagando a mesma nota."
      },
      {
        "t": "9. Exemplo R$ 104,15",
        "k": "EXEMPLO RTAV",
        "x": "No exercício, R$ 104,15 − R$ 7,05 = R$ 97,10. O exemplo isola determinados créditos e não deve ser tratado como apuração completa de qualquer empresa."
      }
    ],
    "qa": [
      [
        "Imposto destacado sempre vira crédito?",
        "Não. Verifique regime, documento fiscal, extinção do débito, vedações e regras específicas."
      ],
      [
        "Crédito de CBS pode quitar IBS?",
        "Não. A apropriação e a compensação são segregadas."
      ],
      [
        "Fornecedor do Simples nunca gera crédito ao cliente?",
        "Incorreto. O adquirente no regime regular pode ter crédito equivalente ao IBS/CBS devido pelo fornecedor via Simples, na forma da lei."
      ],
      [
        "Por que o crédito é importante na negociação?",
        "Porque altera o custo efetivo do comprador, mesmo quando o preço da nota é maior."
      ]
    ],
    "legal": "LC 214/2025, arts. 41 e 47 a 57, especialmente arts. 47 e 48, texto atualizado pela LC 227/2026; RTAV; Material de Estudo, pág. 10."
  },
  {
    "id": "07",
    "title": "Reprecificação, custo e DRE",
    "subtitle": "Como transformar a Reforma em preço, margem e decisão comercial sem confundir simulação com apuração fiscal.",
    "intro": "O método do RTAV é uma ferramenta de planejamento: primeiro descobre-se o líquido econômico atual; depois aplica-se o novo sistema conforme o ano; por fim, reconstrói-se a DRE e mede-se o efeito na cadeia.",
    "before": "É comum olhar apenas a guia tributária ou aplicar um percentual novo diretamente sobre o preço atual.",
    "after": "A análise passa a separar preço bruto, líquido, CBS/IBS, tributos antigos remanescentes, créditos de compra, custo efetivo e margem.",
    "blocks": [
      {
        "t": "Passo 1 — limpar o preço",
        "k": "MÉTODO RTAV",
        "x": "Preço líquido-alvo = preço atual menos os tributos considerados no cenário atual. O objetivo é descobrir qual valor econômico a empresa quer preservar."
      },
      {
        "t": "Passo 2 — aplicar o novo",
        "k": "MÉTODO RTAV",
        "x": "Sobre o líquido, aplique CBS e IBS conforme o ano, destino, redução e regime da operação. Quando o evento usa 9% de CBS, trate como premissa do exercício."
      },
      {
        "t": "Passo 3 — tratar o sistema antigo remanescente",
        "k": "MÉTODO RTAV",
        "x": "Na transição, ICMS/ISS ainda podem permanecer na formação do preço. O evento usa gross-up para reconstruir a parcela tratada por dentro."
      },
      {
        "t": "Passo 4 — repetir nas compras",
        "k": "MÉTODO RTAV",
        "x": "Recalcule fornecedores e créditos. Preço de venda isolado não mostra o impacto sobre margem."
      },
      {
        "t": "Passo 5 — reconstruir a DRE",
        "k": "NA PRÁTICA",
        "x": "Compare receita bruta, tributos sobre venda, receita líquida, custos, créditos, despesas e resultado. Faça cenários por ano da transição."
      },
      {
        "t": "Três estratégias de preço",
        "k": "MATERIAL DE ESTUDO",
        "x": "Manter preço bruto; manter receita líquida; ou manter margem/resultado considerando custos e créditos. A escolha final é comercial, não automática."
      },
      {
        "t": "Banda +1,27% a +3,61%",
        "k": "EXEMPLO RTAV",
        "x": "É um resultado específico de uma DRE apresentada no evento: +1,27% preservava margem considerando créditos e +3,61% preservava receita líquida. Não copie essa faixa para outro cliente."
      },
      {
        "t": "Limite do simulador",
        "k": "ATENÇÃO",
        "x": "A calculadora do site ensina o método e permite cenários. Ela não substitui motor fiscal, classificação de item, regras de base, benefícios, destino e alíquotas oficiais aplicáveis."
      }
    ],
    "qa": [
      [
        "A Reforma sempre aumenta preço?",
        "Não. Um cenário pode exigir aumento, redução ou manutenção, dependendo da carga atual, créditos, regime e margem."
      ],
      [
        "Qual é o preço correto?",
        "Há preços que preservam objetivos diferentes. O contador deve mostrar cenários e o empresário decide a estratégia comercial."
      ],
      [
        "Posso usar 9% de CBS em todos os clientes?",
        "Não como alíquota oficial. No RTAV, 9% é uma premissa de simulação."
      ]
    ],
    "legal": "RTAV; Material de Estudo, págs. 8–11; LC 214/2025 para regras reais de base, alíquota, crédito e transição."
  },
  {
    "id": "08",
    "title": "Simples Nacional em 2027",
    "subtitle": "Simples puro, híbrido, crédito, regime de caixa, NFS-e e o que realmente muda na rotina.",
    "intro": "O Simples Nacional continua existindo, mas 2027 muda sua relação com CBS/IBS, documentos e caixa. A empresa pode manter CBS/IBS dentro do regime único ou optar pelo regime regular desses dois tributos, permanecendo no Simples para os demais.",
    "before": "Hoje a empresa recolhe os tributos do Simples no DAS e pode, em determinadas condições, usar regime de caixa para a apuração mensal. A NFS-e ainda não é uniformemente nacional para todos os optantes.",
    "after": "CBS e IBS passam a integrar o Simples; existe a escolha entre modelo “puro” e “híbrido”; o regime de caixa deixa de ser utilizado para a base mensal a partir de 2027; e a NFS-e nacional se torna obrigatória para ME/EPP prestadoras de serviços a partir de 1º/11/2026.",
    "blocks": [
      {
        "t": "Simples puro",
        "k": "REGRA OFICIAL",
        "x": "CBS e IBS permanecem dentro do recolhimento unificado. Se a empresa não fizer a opção específica pelo regime regular de IBS/CBS, essa é a sistemática aplicável no período correspondente."
      },
      {
        "t": "Simples híbrido",
        "k": "REGRA OFICIAL",
        "x": "A empresa continua no Simples para os demais tributos, mas apura e recolhe IBS/CBS pelo regime regular, conforme a LC 214 e a regulamentação do CGSN."
      },
      {
        "t": "Janela para o 1º semestre de 2027",
        "k": "ATUALIZAÇÃO 2026",
        "x": "A Receita abriu a escolha em setembro de 2026, com efeitos de janeiro a junho de 2027. Empresas já optantes do Simples não precisam renovar a permanência no regime, mas precisam avaliar o modelo de IBS/CBS."
      },
      {
        "t": "Nova janela para o 2º semestre",
        "k": "ATUALIZAÇÃO 2026",
        "x": "Quem não escolheu o regime regular em setembro de 2026 pode fazer nova opção em março de 2027 para efeitos de julho a dezembro, conforme as regras publicadas pelo CGSN."
      },
      {
        "t": "Fim do regime de caixa",
        "k": "REGRA 2027",
        "x": "A regulamentação do Simples extinguiu a opção pelo regime de caixa para a base mensal. A receita passa a seguir as novas regras de faturamento, em geral vinculadas à emissão do documento fiscal."
      },
      {
        "t": "NFS-e nacional",
        "k": "ATUALIZAÇÃO 2026",
        "x": "Para ME e EPP do Simples sujeitas à NFS-e, o Emissor Nacional passa a ser obrigatório a partir de 1º de novembro de 2026. As regras de CBS/IBS no documento para optantes produzem efeitos a partir de 1º de janeiro de 2027."
      },
      {
        "t": "DAS remanescente",
        "k": "LINGUAGEM RTAV",
        "x": "O palestrante usa “DAS remanescente” para explicar o que continua no Simples quando IBS/CBS são recolhidos por fora. É uma expressão didática do evento; o cálculo precisa seguir a regulamentação efetiva do PGDAS-D."
      },
      {
        "t": "Crédito e competitividade B2B",
        "k": "NA PRÁTICA",
        "x": "A escolha do híbrido não deve ser feita apenas pela guia da empresa. É necessário medir o crédito gerado ao cliente, compras, margem, caixa, perfil B2B/B2C e custo de compliance."
      },
      {
        "t": "Alíquota efetiva do DAS",
        "k": "FÓRMULA",
        "x": "[(RBT12 × alíquota nominal) − parcela a deduzir] ÷ RBT12. No exercício do RTAV com RBT12 de R$ 1 milhão, 16% e PD de R$ 35.640, o resultado é 12,436%."
      }
    ],
    "qa": [
      [
        "O Simples acaba?",
        "Não."
      ],
      [
        "Escolher IBS/CBS por fora tira a empresa do Simples?",
        "Não. A empresa permanece no Simples para os demais tributos, desde que continue atendendo aos requisitos do regime."
      ],
      [
        "O regime híbrido é melhor para todo B2B?",
        "Não. Ele pode melhorar a cadeia de créditos, mas também altera carga, fluxo de caixa, documentos e controles."
      ],
      [
        "Regime de caixa continua em 2027?",
        "Não para a base de cálculo mensal do Simples, segundo as regras publicadas em 2026."
      ]
    ],
    "legal": "LC 214/2025, art. 41 e regras do Simples; Resoluções CGSN 190 e 191/2026; orientações RFB de agosto e setembro/2026; RTAV."
  },
  {
    "id": "09",
    "title": "Lucro Presumido × Lucro Real e LC 224",
    "subtitle": "O Presumido não acaba; muda a lógica de comparação e aumenta a importância da DRE.",
    "intro": "O RTAV chama atenção para uma mudança econômica: com o fim de PIS/Cofins e a entrada da CBS, desaparece uma diferença importante entre os regimes na tributação federal do consumo. Isso não significa que o Lucro Presumido perde validade nem que o Lucro Real será sempre melhor.",
    "before": "No consumo, Presumido costuma conviver com PIS/Cofins cumulativo e Real com não cumulativo. Para IRPJ/CSLL, Presumido usa percentuais legais e Real parte do lucro contábil ajustado.",
    "after": "Para empresas fora do Simples, CBS/IBS seguem a disciplina do regime regular independentemente de a empresa apurar IRPJ/CSLL pelo Presumido ou Real. A escolha passa a exigir DRE, margem real, adicional de IRPJ, adições/exclusões, benefícios e custo operacional.",
    "blocks": [
      {
        "t": "Lucro Presumido continua existindo",
        "k": "RESPOSTA DIRETA",
        "x": "A Reforma do consumo não extinguiu o Lucro Presumido. O que muda são premissas econômicas usadas para compará-lo ao Lucro Real."
      },
      {
        "t": "LC 224 — acréscimo de 10%",
        "k": "REGRA OFICIAL",
        "x": "Nos regimes de base presumida, a LC 224 prevê acréscimo de 10% nos percentuais de presunção. No Lucro Presumido, aplica-se sobre a parcela da receita bruta total que excede R$ 5 milhões no ano-calendário, com proporcionalidade por período e por atividade."
      },
      {
        "t": "32% vira 35,2%, não 42%",
        "k": "CÁLCULO",
        "x": "32% × 1,10 = 35,2%. O acréscimo é de 10% sobre o percentual de presunção, não de 10 pontos percentuais."
      },
      {
        "t": "Exemplo R$ 10 milhões",
        "k": "EXEMPLO RTAV",
        "x": "R$ 5 milhões × 32% = R$ 1,6 milhão; outros R$ 5 milhões × 35,2% = R$ 1,76 milhão; base simulada total de R$ 3,36 milhões antes do cálculo de IRPJ/CSLL e adicional."
      },
      {
        "t": "Por que a DRE é indispensável",
        "k": "MÉTODO",
        "x": "Lucro efetivo abaixo da presunção é um sinal para estudar o Real, mas não encerra a decisão. É preciso calcular IRPJ, CSLL, adicional, adições/exclusões, compensações, benefícios e efeitos operacionais."
      },
      {
        "t": "O que é opinião do palestrante",
        "k": "RTAV",
        "x": "A expectativa de migração forte do Presumido para o Real é uma análise estratégica do evento, não uma determinação legal."
      }
    ],
    "qa": [
      [
        "O Lucro Presumido acaba em 2027?",
        "Não."
      ],
      [
        "Margem real de 20% e presunção de 32% garantem que o Real seja melhor?",
        "Não automaticamente. A diferença de base é relevante, mas o regime precisa ser comparado por completo."
      ],
      [
        "A LC 224 aumentou a alíquota de IRPJ em 10 pontos?",
        "Não. A regra discutida aqui aumenta o percentual de presunção em 10% sobre a parcela excedente ao limite legal."
      ]
    ],
    "legal": "LC 224/2025, art. 4º, §4º, VII, e §5º; RTAV; Material de Estudo, págs. 7–8."
  },
  {
    "id": "10",
    "title": "Reduções e regimes específicos",
    "subtitle": "30%, 60%, alíquota zero, bares, restaurantes, hotelaria e por que CNAE sozinho não resolve.",
    "intro": "A alíquota-padrão é apenas o começo. A LC 214 traz regimes diferenciados, que reduzem alíquotas para operações enquadradas, e regimes específicos, que podem alterar alíquota, base e crédito.",
    "before": "Benefícios atuais estão espalhados entre diversos tributos, legislações e entes.",
    "after": "A LC 214 organiza reduções e regimes próprios dentro da estrutura de IBS/CBS, com listas, anexos, requisitos profissionais e tratamentos de crédito específicos.",
    "blocks": [
      {
        "t": "Redução de 30% — profissionais",
        "k": "REGRA OFICIAL",
        "x": "O art. 127 reduz em 30% as alíquotas para serviços de profissões listadas, entre elas contabilistas, desde que cumpridos os requisitos legais. Para pessoa jurídica há condições sobre sócios, atividade e prestação direta dos serviços."
      },
      {
        "t": "Redução de 60%",
        "k": "REGRA OFICIAL",
        "x": "A lei prevê redução de 60% para grupos como educação, saúde, dispositivos médicos, medicamentos, alimentos, certos produtos de higiene, agro, cultura, comunicação institucional e atividades desportivas, sempre conforme definições, listas e anexos."
      },
      {
        "t": "Alíquota zero",
        "k": "REGRA OFICIAL",
        "x": "Existem hipóteses específicas de redução a zero. Nunca aplique zero apenas porque o produto pertence genericamente a saúde, alimentos ou agro; confira a classificação e a hipótese legal."
      },
      {
        "t": "Bares e restaurantes",
        "k": "REGIME ESPECÍFICO",
        "x": "Alimentação enquadrada no regime tem redução de 40% das alíquotas. A base possui exclusões próprias, como certas gorjetas e valores de intermediação. O adquirente não pode se creditar do IBS/CBS sobre alimentação e bebidas abrangidas pelo regime."
      },
      {
        "t": "Hotelaria e parques",
        "k": "REGIME ESPECÍFICO",
        "x": "As alíquotas são reduzidas em 40%. O fornecedor pode apropriar créditos de suas aquisições conforme as regras gerais, mas o adquirente do serviço de hotelaria/parques não se credita do IBS/CBS da operação."
      },
      {
        "t": "Redução não é alíquota final",
        "k": "FÓRMULA",
        "x": "Alíquota final = alíquota aplicável × (1 − percentual de redução). Se a premissa do exercício for 28% e a redução for 60%, o resultado didático é 11,2%."
      },
      {
        "t": "CNAE não basta",
        "k": "ATENÇÃO",
        "x": "O enquadramento pode depender de NBS, NCM, Anexo, natureza da operação, habilitação profissional e requisitos societários. Classificar apenas pelo CNAE pode gerar conclusão errada."
      }
    ],
    "qa": [
      [
        "Todo escritório contábil recebe 30% de redução?",
        "Não automaticamente. A atividade de contabilista está listada, mas a prestação precisa atender aos requisitos do art. 127, inclusive os aplicáveis à pessoa jurídica."
      ],
      [
        "Restaurante toma crédito das compras?",
        "A vedação expressa do art. 276 é ao adquirente da alimentação/bebida. A análise dos créditos do próprio fornecedor deve seguir as regras do regime e das aquisições."
      ],
      [
        "Hotel gera crédito para uma empresa cliente?",
        "O art. 283 veda ao adquirente o crédito de IBS/CBS sobre os serviços de hotelaria, parques de diversão e parques temáticos abrangidos pelo regime."
      ]
    ],
    "legal": "LC 214/2025, arts. 127 a 146 e arts. 273 a 283, texto atualizado pela LC 227/2026; RTAV."
  },
  {
    "id": "11",
    "title": "Recolhimento, documentos e apuração assistida",
    "subtitle": "Split payment, recolhimento pelo adquirente, DF-e e por que a rotina fiscal muda.",
    "intro": "Fato gerador, crédito, documento e recolhimento são peças diferentes que passam a conversar em tempo quase real. O contador precisa entender cada camada para não chamar tudo de split payment.",
    "before": "A rotina atual muitas vezes reconstrói a apuração por escriturações e declarações depois da emissão e do pagamento.",
    "after": "A arquitetura de IBS/CBS conecta documento fiscal eletrônico, extinção do débito, crédito, liquidação financeira e apuração assistida. A implantação tecnológica é gradual e possui cronogramas próprios.",
    "blocks": [
      {
        "t": "Split payment",
        "k": "REGRA OFICIAL",
        "x": "Prestadores de serviços de pagamento e operadores de sistemas de pagamento deverão, nas condições legais, segregar e recolher IBS/CBS na liquidação financeira. A lei prevê procedimento padrão e simplificado."
      },
      {
        "t": "Implementação gradual",
        "k": "REGRA OFICIAL",
        "x": "A LC 214 determina que ato conjunto do CGIBS e da RFB estabeleça implementação gradual e pode prever hipóteses facultativas. Portanto, não se deve afirmar que todo pagamento terá split desde o primeiro dia."
      },
      {
        "t": "Recolhimento pelo adquirente",
        "k": "REGRA OFICIAL",
        "x": "É outra modalidade de extinção do débito prevista na lei e não deve ser confundida com split. Aplica-se nas hipóteses e condições próprias do art. 36."
      },
      {
        "t": "Apuração assistida",
        "k": "REGRA OFICIAL",
        "x": "CGIBS e RFB podem apresentar ao contribuinte a apuração assistida. O contribuinte pode confirmar ou ajustar; a ausência de manifestação dentro do prazo possui efeitos legais relevantes, por isso conferência continua indispensável."
      },
      {
        "t": "Documento fiscal eletrônico",
        "k": "NA PRÁTICA",
        "x": "O crédito é ligado a documento fiscal eletrônico idôneo. Cadastro, natureza da operação, destino, item, regime e campos de IBS/CBS passam a ser parte central da qualidade da apuração."
      },
      {
        "t": "Cronograma oficial de DF-e",
        "k": "ATUALIZAÇÃO 2026",
        "x": "RFB e CGIBS publicaram cronograma de obrigatoriedade e leiautes dos documentos fiscais, com marcos em 2026 e 2027. O site deve ser revisado quando esses marcos forem atualizados."
      },
      {
        "t": "NFS-e e NT 009",
        "k": "ATUALIZAÇÃO 2026",
        "x": "A Nota Técnica 009 consolidou adaptações do layout da NFS-e para a Reforma. Para optantes do Simples, a NFS-e nacional tornou-se obrigatória a partir de 1º/11/2026, e os efeitos de CBS/IBS no regime começam em 1º/1/2027."
      },
      {
        "t": "Novo papel do contador",
        "k": "RTAV",
        "x": "A direção é menos reconstrução manual e mais parametrização, conferência, exceções, conciliação, análise de caixa e consultoria. Isso não significa fim das obrigações nem ausência de revisão humana."
      }
    ],
    "qa": [
      [
        "Split payment é o fato gerador?",
        "Não."
      ],
      [
        "Apuração assistida elimina a conferência do escritório?",
        "Não. A lei prevê confirmação, ajustes e consequências para falta de manifestação."
      ],
      [
        "Todos os documentos mudam na mesma data?",
        "Não. Há cronogramas e leiautes por documento/operação; é preciso acompanhar as orientações oficiais."
      ]
    ],
    "legal": "LC 214/2025, arts. 27, 31 a 36, 45 a 48; Ato Conjunto RFB/CGIBS nº 4/2026; orientações RFB/CGIBS; NT 009 NFS-e."
  },
  {
    "id": "12",
    "title": "Planejamento e conversa com o cliente",
    "subtitle": "Do diagnóstico técnico ao plano de ação 2026–2033.",
    "intro": "O objetivo do treinamento não é transformar o contador em alguém que recita artigos. É transformar regra em decisão: preço, margem, regime, fornecedor, contrato, caixa e sistema. O material do RTAV chama isso de diagnóstico e prognóstico.",
    "before": "Planejamento muitas vezes termina na comparação de percentuais ou no valor de uma guia.",
    "after": "A transição exige cenário por cenário, com premissas explícitas e atualização contínua conforme alíquotas, regulamentos e dados reais do cliente.",
    "blocks": [
      {
        "t": "1. Diagnóstico do negócio",
        "k": "MÉTODO",
        "x": "Mapeie faturamento, regime, margem, produtos/serviços, clientes, fornecedores, destinos, antecipações, contratos, benefícios, créditos, documentos e sistemas."
      },
      {
        "t": "2. Separar regra de estimativa",
        "k": "MÉTODO",
        "x": "Em cada planilha ou apresentação, marque o que é REGRA OFICIAL, RTAV, ESTIMATIVA, AGUARDA REGULAMENTAÇÃO e PREMISSA DO CLIENTE. Isso evita que 9%, 27,91% ou 28% virem “verdades oficiais” por repetição."
      },
      {
        "t": "3. Projetar por ano",
        "k": "MÉTODO",
        "x": "Faça cenários de 2027 a 2033, porque ICMS/ISS, IBS e alíquotas de referência mudam ao longo da transição."
      },
      {
        "t": "4. Recalcular venda e compra",
        "k": "MÉTODO",
        "x": "Projete preço líquido, CBS/IBS, tributos remanescentes, crédito de compras e custo efetivo. Depois reconstrua a DRE."
      },
      {
        "t": "5. Analisar regime",
        "k": "MÉTODO",
        "x": "Para Simples, compare puro x híbrido; para Presumido x Real, use DRE completa. Não decida regime por uma única alíquota."
      },
      {
        "t": "6. Rever contratos",
        "k": "NA PRÁTICA",
        "x": "Mapeie cláusulas de preço, tributos, reajuste, repasse, antecipação, prazo, destino e reequilíbrio. A transição pode mudar custo mesmo sem mudança comercial aparente."
      },
      {
        "t": "7. Preparar sistemas e cadastros",
        "k": "NA PRÁTICA",
        "x": "Revise ERP, emissor, cadastro de item/serviço, NCM/NBS, endereço de destino, regime do cliente, regras de crédito, integração financeira e documentos fiscais."
      },
      {
        "t": "8. Preparar caixa",
        "k": "NA PRÁTICA",
        "x": "Antecipações, novos momentos de exigência, split/recolhimento pelo adquirente e mudança de crédito podem alterar capital de giro."
      },
      {
        "t": "9. Entregar cenários, não um palpite",
        "k": "RTAV",
        "x": "Mostre DRE atual x projetada, preço que preserva receita líquida, preço que preserva margem, custo efetivo do cliente e plano de ação."
      },
      {
        "t": "10. Revisar continuamente",
        "k": "ATENÇÃO",
        "x": "A legislação e os atos operacionais continuam evoluindo. Atualize o diagnóstico quando sair alíquota oficial, regulamentação, mudança de regime, mix, fornecedor, cliente ou contrato."
      }
    ],
    "qa": [
      [
        "Posso prometer ao cliente hoje qual será a carga exata até 2033?",
        "Não. Há alíquotas futuras e atos operacionais que ainda são fixados ao longo do processo. O correto é trabalhar com cenários identificados."
      ],
      [
        "Qual é a primeira urgência para 2026?",
        "Qualidade de cadastro e documento, decisão de Simples quando aplicável, entendimento do ano-teste, preparação de sistemas e projeção econômica para 2027."
      ],
      [
        "O contador deve dizer qual preço o empresário é obrigado a usar?",
        "Não. O contador calcula impactos e faixas; a decisão comercial pertence à empresa."
      ]
    ],
    "legal": "RTAV; Material de Estudo; EC 132/2023; LC 214/2025 atualizada pela LC 227/2026; LC 224/2025; orientações RFB/CGIBS de 2026."
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
    "RTAV + Material de Estudo 26/09/2026",
    "#",
    "Base didática do treinamento. Exemplos, estimativas e opiniões do palestrante são identificados e não substituem a regra oficial."
  ]
];

const PRACTICES = [
  {
    "id": "P01",
    "title": "Sinal antes da entrega — 28/01 → 10/02",
    "tag": "FATO GERADOR",
    "subtitle": "Entenda por que o sinal recebido antes da entrega muda o momento tributário no IBS/CBS.",
    "scenario": "Em 28/01 o cliente faz o pedido de uma mercadoria que ainda será preparada. Para garantir a operação, paga um sinal de 10%. A mercadoria é entregue em 10/02 e, nessa data, o cliente paga os 90% restantes.",
    "objective": "Separar três coisas que costumam ser confundidas: fato gerador, antecipação por pagamento e split payment.",
    "premises": [
      "O caso é o exemplo didático usado no RTAV.",
      "Na comparação atual, o foco é o ICMS da saída da mercadoria.",
      "Na LC 214, a regra geral é o fornecimento; pagamento anterior ao fornecimento gera antecipação sobre a parcela paga.",
      "O exemplo de documento de antecipação segue a explicação operacional do evento."
    ],
    "steps": [
      {
        "t": "1. O que acontece hoje no exemplo?",
        "calc": "28/01: sinal de 10% → sem saída da mercadoria.",
        "x": "No raciocínio do RTAV, o sinal não é tratado como o fato gerador do ICMS da futura saída. A saída/circulação ocorre em 10/02."
      },
      {
        "t": "2. O que muda com IBS/CBS?",
        "calc": "Pagamento antes do fornecimento → antecipação sobre a parcela paga.",
        "x": "A LC 214 usa o fornecimento como regra geral, mas disciplina o pagamento anterior. Por isso o RTAV resume a operação dizendo que pagamento/recebimento ou fornecimento, o que vier antes, produz efeito tributário."
      },
      {
        "t": "3. O que ocorre em 28/01?",
        "calc": "10% pagos → antecipação sobre esses 10%.",
        "x": "Segundo o exemplo da aula, emite-se documento de antecipação e a parcela recebida entra na apuração correspondente."
      },
      {
        "t": "4. O que ocorre em 10/02?",
        "calc": "Entrega + 90% restantes → cálculo definitivo da operação.",
        "x": "No fornecimento, calcula-se a operação e ajusta-se o que já foi antecipado. No exemplo, os 90% restantes completam a operação."
      },
      {
        "t": "5. Isso é split payment?",
        "calc": "Não.",
        "x": "Split payment trata da forma de segregação/recolhimento do IBS/CBS na liquidação financeira. Aqui o assunto é o momento tributário da operação."
      }
    ],
    "result": "O caixa pode sentir o tributo antes da entrega. Empresas que trabalham com sinal ou adiantamento precisam integrar comercial, financeiro, faturamento e fiscal.",
    "interpretation": "O ponto principal não é decorar uma data: é perceber que receber antes pode antecipar parte da tributação. Isso muda fluxo de caixa e emissão de documentos.",
    "error": "Chamar todo pagamento antecipado de split payment. O RTAV faz questão de separar os dois assuntos.",
    "client": "“Se você recebe sinal antes de entregar, precisamos mapear esse fluxo porque parte do IBS/CBS pode aparecer antes da entrega e afetar o caixa.”",
    "challenge": "Se não houver sinal em 28/01 e o cliente só pagar quando a mercadoria for entregue em 10/02, qual é o evento central do caso?",
    "challengeAnswer": "O fornecimento em 10/02. Sem pagamento anterior, não há a antecipação da parcela que existia no exemplo.",
    "source": "RTAV; Material de Estudo, págs. 1–2; LC 214/2025, art. 10."
  },
  {
    "id": "P02",
    "title": "Comércio — preço atual de R$ 100",
    "tag": "REPRECIFICAÇÃO",
    "subtitle": "Reproduza o exemplo completo do RTAV e entenda por que o preço chega a aproximadamente R$ 104,15.",
    "scenario": "Empresa comercial no Lucro Presumido vende por R$ 100. No exemplo: PIS 0,65%, Cofins 3% e ICMS 18%. Para a projeção didática de 2027, o RTAV usa CBS de 9%.",
    "objective": "Aprender o método de reprecificação do evento: limpar o preço atual, aplicar o novo por fora e depois embutir o tributo antigo remanescente.",
    "premises": [
      "CBS de 9% é premissa do RTAV, não alíquota-padrão oficial definitiva.",
      "O exercício reproduz o exemplo do evento e não pretende ser uma apuração fiscal completa de 2027.",
      "A meta é preservar o mesmo preço líquido econômico de R$ 78,35."
    ],
    "steps": [
      {
        "t": "1. Descobrir quanto do preço atual são tributos",
        "calc": "0,65 + 3,00 + 18,00 = 21,65",
        "x": "No exemplo, R$ 21,65 do preço de R$ 100 correspondem aos tributos considerados."
      },
      {
        "t": "2. Encontrar o preço líquido-alvo",
        "calc": "100,00 − 21,65 = R$ 78,35",
        "x": "R$ 78,35 é o valor que o método quer preservar. O RTAV chama isso de limpar o preço."
      },
      {
        "t": "3. Aplicar a CBS por fora",
        "calc": "78,35 × 9% = R$ 7,05",
        "x": "Como a CBS do exercício é tratada por fora, ela é calculada sobre a base limpa."
      },
      {
        "t": "4. Somar líquido + CBS",
        "calc": "78,35 + 7,05 = R$ 85,40",
        "x": "Este é o preço intermediário antes de recolocar o ICMS remanescente no cenário."
      },
      {
        "t": "5. Embutir ICMS de 18%",
        "calc": "85,40 ÷ (1 − 0,18) ≈ R$ 104,15",
        "x": "O ICMS do exemplo continua tratado por dentro. Por isso não basta somar 18%; usa-se o gross-up."
      },
      {
        "t": "6. Conferir",
        "calc": "104,15 − 18,75 − 7,05 ≈ R$ 78,35",
        "x": "A conferência mostra que o líquido econômico foi preservado."
      }
    ],
    "result": "Preço projetado do exemplo: aproximadamente R$ 104,15, aumento bruto de cerca de 4,15% frente aos R$ 100 atuais.",
    "interpretation": "O aumento de preço não é igual à soma das alíquotas. A mudança da base e do método de cálculo altera completamente a conta.",
    "error": "Pegar R$ 100 e simplesmente somar 9% de CBS. O preço atual já contém tributos e precisa ser limpo antes.",
    "client": "“Para manter o mesmo líquido deste exemplo, o preço iria de R$ 100 para cerca de R$ 104,15. Mas antes de reajustar precisamos olhar o crédito que esse novo preço gera para o comprador.”",
    "challenge": "Se o preço atual fosse R$ 200, mantendo exatamente as mesmas premissas do exercício, qual seria o preço projetado?",
    "challengeAnswer": "R$ 208,30. O material apresenta: líquido R$ 156,70 → com CBS estimada R$ 170,80 → gross-up de ICMS a 18% ≈ R$ 208,30.",
    "source": "RTAV; Material de Estudo, págs. 8–9 e exercício 1 das págs. 12–13."
  },
  {
    "id": "P03",
    "title": "Serviços — preço atual de R$ 100",
    "tag": "REPRECIFICAÇÃO",
    "subtitle": "Veja um caso em que preservar o mesmo líquido pode reduzir, e não aumentar, o preço bruto.",
    "scenario": "Empresa de serviços no exemplo do material vende por R$ 100. São considerados ISS 5%, PIS 1,65% e Cofins 7,6%. Para 2027, o exercício usa CBS estimada de 9%.",
    "objective": "Mostrar que a reforma não significa aumento automático de preço e que o resultado depende da carga atual e do método de cálculo.",
    "premises": [
      "O caso usa PIS/Cofins de 9,25% no cenário atual do Lucro Real.",
      "CBS de 9% é premissa didática do RTAV.",
      "ISS de 5% permanece no exercício de transição e é tratado por dentro."
    ],
    "steps": [
      {
        "t": "1. Somar os tributos atuais do exercício",
        "calc": "5,00 + 1,65 + 7,60 = 14,25",
        "x": "O exemplo considera R$ 14,25 de tributos dentro do preço atual de R$ 100."
      },
      {
        "t": "2. Encontrar o preço líquido",
        "calc": "100,00 − 14,25 = R$ 85,75",
        "x": "Esse é o alvo econômico a preservar."
      },
      {
        "t": "3. Aplicar CBS por fora",
        "calc": "85,75 × 9% = R$ 7,72",
        "x": "A CBS estimada é calculada sobre a base limpa."
      },
      {
        "t": "4. Formar o intermediário",
        "calc": "85,75 + 7,72 = R$ 93,47",
        "x": "Ainda falta tratar o ISS remanescente no cenário."
      },
      {
        "t": "5. Embutir ISS de 5%",
        "calc": "93,47 ÷ 0,95 ≈ R$ 98,39",
        "x": "O preço que preserva o mesmo líquido fica abaixo dos R$ 100 atuais."
      }
    ],
    "result": "Preço projetado do exemplo: aproximadamente R$ 98,39, queda de cerca de 1,61%.",
    "interpretation": "Uma alíquota nova aparentemente alta não permite concluir sozinha que o preço vai subir. É preciso comparar com os tributos que já estavam embutidos.",
    "error": "Dizer ao cliente “a reforma aumentará seu preço” sem reconstruir o preço líquido e os créditos.",
    "client": "“Neste cenário, o preço que preserva o mesmo líquido seria até menor. Reduzir ou não é decisão comercial; a contabilidade mostra a faixa possível.”",
    "challenge": "Se a empresa quiser manter um líquido de R$ 500 hoje, com ISS 5% + PIS/Cofins 3,65%, qual seria o preço bruto atual?",
    "challengeAnswer": "R$ 547,35, porque R$ 500 ÷ (1 − 0,0865) = R$ 547,35.",
    "source": "Material de Estudo, págs. 9 e 12–13; RTAV."
  },
  {
    "id": "P04",
    "title": "Custo efetivo — o mesmo preço para três compradores",
    "tag": "CRÉDITO",
    "subtitle": "Entenda por que preço pago e custo econômico podem contar histórias diferentes.",
    "scenario": "O fornecedor do exemplo passa de R$ 100 para R$ 104,15. O exercício considera apenas créditos de PIS/Cofins hoje e CBS em 2027, ignorando crédito de ICMS para isolar o raciocínio.",
    "objective": "Comparar como o mesmo fornecedor pode afetar clientes do Simples, Lucro Presumido e Lucro Real de maneira diferente.",
    "premises": [
      "CBS destacada/aproveitável no exemplo: R$ 7,05.",
      "O exercício deliberadamente ignora crédito de ICMS.",
      "No material, o custo atual do Lucro Real é R$ 90,75; a fala do evento arredonda para R$ 90 em alguns momentos."
    ],
    "steps": [
      {
        "t": "1. Comprador do Simples",
        "calc": "Hoje: 100 − 0 = 100 | 2027: 104,15 − 0 = 104,15",
        "x": "No exemplo simplificado, ele não aproveita o crédito usado na comparação. Paga mais e custa mais."
      },
      {
        "t": "2. Comprador no Lucro Presumido",
        "calc": "Hoje: 100 − 0 = 100 | 2027: 104,15 − 7,05 = 97,10",
        "x": "Este é o caso que gera a frase do RTAV: “paga mais, mas custa menos”."
      },
      {
        "t": "3. Comprador no Lucro Real",
        "calc": "Hoje: 100 − 9,25 = 90,75 | 2027: 104,15 − 7,05 = 97,10",
        "x": "Neste recorte do material, o comprador perde parte do benefício de crédito que tinha hoje."
      },
      {
        "t": "4. O que o contador deve enxergar?",
        "calc": "Custo efetivo = preço pago − crédito aproveitável",
        "x": "A análise comercial precisa olhar a cadeia e não apenas o preço da nota."
      }
    ],
    "result": "O mesmo reajuste de R$ 4,15 pode melhorar o custo de um comprador e piorar o de outro.",
    "interpretation": "É por isso que precificação e estratégia de clientes precisam ser estudadas juntas. Um reajuste aparentemente ruim pode ser aceitável se o crédito compensar; o inverso também é verdadeiro.",
    "error": "Comparar apenas preço de nota sem conferir o regime e os créditos realmente aproveitáveis pelo comprador.",
    "client": "“Não basta perguntar quanto você vai cobrar. Precisamos saber quanto seu cliente efetivamente vai gastar depois dos créditos.”",
    "challenge": "Um cliente compra por R$ 104,15 e pode aproveitar R$ 7,05 de crédito no exercício. Qual é o custo efetivo?",
    "challengeAnswer": "R$ 97,10.",
    "source": "Material de Estudo, pág. 10 e exercício 5 das págs. 12–13; RTAV."
  },
  {
    "id": "P05",
    "title": "Fornecedor do Simples vendendo para cliente do Lucro Real",
    "tag": "SIMPLES / B2B",
    "subtitle": "Um caso para entender por que a escolha entre Simples puro e regime regular pode virar questão comercial.",
    "scenario": "No exemplo do RTAV, um cliente do Lucro Real compra R$ 100 de um fornecedor do Simples. Hoje o palestrante usa crédito de PIS/Cofins de 9,25%. Para 2027, simula que o fornecedor no Simples puro tenha R$ 2 de CBS devida dentro do DAS.",
    "objective": "Entender a perda potencial de crédito do cliente B2B e por que o regime regular de IBS/CBS pode entrar na conversa.",
    "premises": [
      "Os R$ 2 de CBS são hipótese do evento, não alíquota geral do Simples.",
      "A regra oficial admite ao adquirente no regime regular crédito correspondente ao IBS/CBS devido pelo fornecedor do Simples, observados os requisitos legais.",
      "A empresa do Simples pode permanecer no Simples para os demais tributos e optar pelo regime regular de IBS/CBS."
    ],
    "steps": [
      {
        "t": "1. Custo do comprador no exemplo atual",
        "calc": "R$ 100 − 9,25 = R$ 90,75",
        "x": "O RTAV usa o crédito de PIS/Cofins para construir o custo efetivo atual do comprador no Lucro Real."
      },
      {
        "t": "2. Simples puro em 2027 — hipótese do evento",
        "calc": "R$ 100 − R$ 2 = R$ 98",
        "x": "Se o crédito disponível cair para R$ 2 no cenário hipotético, o custo do comprador aumenta fortemente."
      },
      {
        "t": "3. O problema comercial",
        "calc": "90,75 → 98,00",
        "x": "O cliente pode pressionar preço, procurar outro fornecedor ou exigir uma análise do regime do fornecedor."
      },
      {
        "t": "4. Onde entra o regime regular?",
        "calc": "Simples para os demais tributos + IBS/CBS pelo regime regular",
        "x": "A opção híbrida existe justamente para permitir que a empresa permaneça no Simples e trate IBS/CBS fora do DAS. Isso muda débito, crédito, compliance e caixa."
      },
      {
        "t": "5. Como decidir?",
        "calc": "Tributo próprio + crédito do cliente + margem + caixa + perfil B2B/B2C",
        "x": "Não existe resposta automática. Uma empresa B2B sensível a crédito pode ter urgência maior para simular o regime regular do que uma empresa B2C."
      }
    ],
    "result": "A escolha do regime deixa de ser apenas “quanto eu pago” e passa a incluir “quanto crédito eu gero para quem compra de mim”.",
    "interpretation": "Para clientes com compradores grandes no regime regular, a competitividade da cadeia pode ser tão importante quanto a guia tributária do próprio fornecedor.",
    "error": "Concluir que todo Simples deve ir para o regime regular. O RTAV usa o exemplo para mostrar um risco competitivo, não uma regra universal.",
    "client": "“Precisamos comparar o que você economiza no Simples puro com o impacto de crédito que seus principais clientes terão.”",
    "challenge": "Se o comprador paga R$ 100 e, no cenário hipotético, só consegue R$ 2 de crédito, qual é o custo efetivo?",
    "challengeAnswer": "R$ 98.",
    "source": "Transcrição 2 do RTAV; Receita Federal/CGSN 2026 sobre Simples puro e híbrido."
  },
  {
    "id": "P06",
    "title": "Simples Nacional — alíquota efetiva do exemplo",
    "tag": "SIMPLES",
    "subtitle": "Calcule a alíquota efetiva antes de discutir qualquer separação de CBS/IBS.",
    "scenario": "Empresa de serviços com RBT12 de R$ 1.000.000, alíquota nominal de 16% e parcela a deduzir de R$ 35.640, conforme exercício do material.",
    "objective": "Reforçar a fórmula da alíquota efetiva e evitar usar a alíquota nominal diretamente sobre a receita.",
    "premises": [
      "Este é um exercício didático do material do evento.",
      "A alíquota efetiva é calculada com RBT12, alíquota nominal e parcela a deduzir.",
      "A análise de Simples puro x híbrido exige etapas adicionais; este caso resolve apenas a alíquota efetiva de partida."
    ],
    "steps": [
      {
        "t": "1. Aplicar a alíquota nominal ao RBT12",
        "calc": "1.000.000 × 16% = R$ 160.000",
        "x": "Primeiro calcula-se o valor bruto da faixa."
      },
      {
        "t": "2. Subtrair a parcela a deduzir",
        "calc": "160.000 − 35.640 = R$ 124.360",
        "x": "A parcela a deduzir reduz o valor usado para encontrar a alíquota efetiva."
      },
      {
        "t": "3. Dividir pelo RBT12",
        "calc": "124.360 ÷ 1.000.000 = 0,12436",
        "x": "Convertendo para percentual, chegamos a 12,436%."
      },
      {
        "t": "4. Interpretar",
        "calc": "Alíquota efetiva = 12,436%",
        "x": "É essa alíquota efetiva — e não simplesmente os 16% nominais — que serve de base para a leitura do DAS no exemplo."
      }
    ],
    "result": "Alíquota efetiva do exercício: 12,436%.",
    "interpretation": "Antes de comparar regimes ou retirar parcelas de CBS/IBS, a base do Simples precisa estar corretamente calculada.",
    "error": "Aplicar diretamente 16% sobre a receita do mês e chamar isso de alíquota efetiva.",
    "client": "“Sua faixa nominal é 16%, mas a alíquota efetiva do exercício é 12,436%. É a partir dela que a análise precisa continuar.”",
    "challenge": "Com receita do mês de R$ 1.000.000 e alíquota efetiva de 12,436%, qual é o DAS simulado antes das separações do cenário?",
    "challengeAnswer": "R$ 124.360.",
    "source": "Slides e Material de Estudo do RTAV."
  },
  {
    "id": "P07",
    "title": "LC 224 — receita anual de R$ 10 milhões",
    "tag": "LUCRO PRESUMIDO",
    "subtitle": "Entenda por que “aumento de 10% na presunção” não significa somar 10 pontos percentuais.",
    "scenario": "Empresa de serviços no Lucro Presumido com R$ 10 milhões de receita anual e percentual de presunção de 32%. O exercício separa a parcela até R$ 5 milhões e o excedente.",
    "objective": "Calcular corretamente a nova base presumida do exemplo e entender o que efetivamente aumenta.",
    "premises": [
      "O cálculo abaixo isola a base presumida.",
      "Não inclui, nesta etapa, adicional de IRPJ, particularidades de período ou outros ajustes.",
      "O percentual de 32% passa a 35,2% no excedente porque 32% × 1,10 = 35,2%."
    ],
    "steps": [
      {
        "t": "1. Parcela até R$ 5 milhões",
        "calc": "5.000.000 × 32% = R$ 1.600.000",
        "x": "Essa parte permanece com o percentual original no exemplo."
      },
      {
        "t": "2. Calcular o percentual aumentado",
        "calc": "32% × 1,10 = 35,2%",
        "x": "Aumento de 10% sobre 32%, e não aumento de 10 pontos percentuais."
      },
      {
        "t": "3. Aplicar ao excedente",
        "calc": "5.000.000 × 35,2% = R$ 1.760.000",
        "x": "O segundo bloco de receita recebe o percentual aumentado."
      },
      {
        "t": "4. Somar as bases",
        "calc": "1.600.000 + 1.760.000 = R$ 3.360.000",
        "x": "Essa é a base presumida simulada antes do cálculo dos tributos sobre o lucro."
      },
      {
        "t": "5. Comparar com a regra antiga do exemplo",
        "calc": "10.000.000 × 32% = R$ 3.200.000",
        "x": "A base simulada aumenta R$ 160.000."
      }
    ],
    "result": "Base presumida simulada: R$ 3,36 milhões, contra R$ 3,2 milhões no cálculo uniforme de 32%.",
    "interpretation": "A LC 224 não transforma 32% em 42%. O acréscimo é percentual sobre a própria presunção e, no exemplo, atinge o excedente ao limite.",
    "error": "Somar 10 pontos: 32% + 10% = 42%. Isso não representa a regra usada no exercício.",
    "client": "“O aumento não é de dez pontos de imposto. Primeiro precisamos calcular como o percentual de presunção muda no excedente e depois medir IRPJ/CSLL.”",
    "challenge": "Qual é a diferença entre as duas bases presumidas deste exemplo?",
    "challengeAnswer": "R$ 160.000.",
    "source": "RTAV; Material de Estudo, pág. 7; LC 224/2025."
  },
  {
    "id": "P08",
    "title": "Redução de alíquota — 60% não significa pagar 60%",
    "tag": "ALÍQUOTAS",
    "subtitle": "Aprenda a aplicar corretamente uma redução percentual sobre uma alíquota de referência.",
    "scenario": "O exercício do material pergunta qual seria a alíquota final se a referência usada na simulação fosse 27% e a atividade tivesse redução de 60%.",
    "objective": "Evitar o erro comum de confundir percentual de redução com alíquota final.",
    "premises": [
      "27% é uma premissa do exercício, não alíquota universal.",
      "A redução só se aplica se a operação estiver legalmente enquadrada.",
      "Reduzir 60% significa manter 40% da alíquota original."
    ],
    "steps": [
      {
        "t": "1. Descobrir a parcela remanescente",
        "calc": "100% − 60% = 40%",
        "x": "Depois da redução, restam 40% da alíquota de referência."
      },
      {
        "t": "2. Aplicar sobre a referência",
        "calc": "27% × 40% = 10,8%",
        "x": "A alíquota final do exercício é 10,8%."
      },
      {
        "t": "3. Comparar com outro exemplo do material",
        "calc": "28% × 40% = 11,2%",
        "x": "Se a premissa fosse 28%, a mesma redução produziria 11,2%. Isso mostra por que a alíquota-base precisa estar correta."
      }
    ],
    "result": "No exercício com referência de 27%, a alíquota após redução de 60% é 10,8%.",
    "interpretation": "O benefício atua sobre a alíquota aplicável. Não basta conhecer o percentual de redução: primeiro é preciso confirmar enquadramento e alíquota-base.",
    "error": "Responder 60%, ou calcular 27% − 60 pontos percentuais.",
    "client": "“Sua atividade pode ter redução, mas precisamos confirmar a operação e aplicar a redução sobre a alíquota correta do período e destino.”",
    "challenge": "Se a referência hipotética fosse 28% e a redução fosse de 30%, qual seria a alíquota final?",
    "challengeAnswer": "19,6%, porque 28% × 70% = 19,6%.",
    "source": "Material de Estudo, págs. 6 e 12–13; RTAV."
  },
  {
    "id": "P09",
    "title": "DRE e banda de negociação",
    "tag": "DECISÃO ESTRATÉGICA",
    "subtitle": "Use a reforma para sair do “qual imposto vou pagar?” e chegar em “qual preço preserva meu resultado?”.",
    "scenario": "Em um caso apresentado no material, uma empresa tinha duas referências de reajuste para 2027: +3,61% para preservar a receita líquida e +1,27% para preservar a margem considerando créditos.",
    "objective": "Entender por que um único percentual de reajuste não responde à decisão comercial.",
    "premises": [
      "Os percentuais +1,27% e +3,61% pertencem a um caso específico do RTAV.",
      "Eles não são faixas gerais para outras empresas.",
      "O método compara DRE atual e DRE projetada."
    ],
    "steps": [
      {
        "t": "1. Cenário A — preservar receita líquida",
        "calc": "+3,61% no caso apresentado",
        "x": "A pergunta é: quanto preciso cobrar para que receita menos tributos sobre a venda permaneça igual?"
      },
      {
        "t": "2. Cenário B — preservar margem",
        "calc": "+1,27% no caso apresentado",
        "x": "Aqui entram também custos, fornecedores e créditos. Como os créditos podem melhorar o custo, a empresa pode precisar de reajuste menor."
      },
      {
        "t": "3. Formar a banda de negociação",
        "calc": "1,27% → 3,61%",
        "x": "No caso do evento, essa faixa representa espaço de decisão comercial entre preservar margem e preservar receita líquida."
      },
      {
        "t": "4. Levar para a DRE",
        "calc": "Receita → tributos → custos/créditos → margem → resultado",
        "x": "O contador não entrega apenas um imposto; entrega os efeitos econômicos de cada opção."
      },
      {
        "t": "5. Transformar em decisão",
        "calc": "Preço mínimo econômico ≠ preço comercial obrigatório",
        "x": "A empresa pode posicionar o preço dentro ou fora da faixa por estratégia, desde que entenda o impacto no resultado."
      }
    ],
    "result": "A prática termina com cenários, não com um único “preço correto”.",
    "interpretation": "A reforma transforma precificação em trabalho consultivo. O objetivo é mostrar ao empresário o preço que preserva líquido, o que preserva margem e o efeito para o cliente.",
    "error": "Copiar +1,27% ou +3,61% para outro cliente. Esses números só fazem sentido na DRE do caso apresentado.",
    "client": "“Eu não vou te entregar apenas quanto o imposto muda. Vou te mostrar qual preço preserva receita, qual preserva margem e qual espaço você tem para negociar.”",
    "challenge": "Se uma empresa tem duas metas diferentes — preservar receita líquida e preservar margem — é esperado que o reajuste calculado seja necessariamente igual?",
    "challengeAnswer": "Não. Créditos, custos e composição da DRE podem fazer o preço que preserva margem ser diferente do preço que preserva receita líquida.",
    "source": "Material de Estudo, pág. 11; RTAV."
  }
];
