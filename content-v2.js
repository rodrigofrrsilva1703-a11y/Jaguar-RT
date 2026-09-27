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
    "title": "Reprecificação, faturamento e DRE",
    "subtitle": "Como transformar mudança tributária em preço e receita sem confundir planejamento com apuração fiscal.",
    "intro": "O RTAV usa a reprecificação como ferramenta de planejamento. O raciocínio começa no valor líquido atual, reconstrói cada ano da transição e, em uma análise completa, pode avançar para compras, créditos e DRE. A calculadora do site separa duas visões: preço unitário e faturamento.",
    "before": "Um erro comum é pegar a nova alíquota e simplesmente somá-la ao preço ou ao faturamento atual.",
    "after": "A análise correta identifica o líquido de 2026, aplica CBS/IBS do período, trata os tributos antigos remanescentes e mede o efeito sobre preço ou faturamento bruto necessário para preservar o mesmo líquido.",
    "blocks": [
      {
        "t": "1. Descobrir o líquido de 2026",
        "k": "MÉTODO RTAV",
        "x": "Preço líquido-alvo = preço atual − tributos considerados no cenário atual. Na visão macro, faturamento líquido = faturamento bruto − tributos considerados."
      },
      {
        "t": "2. Aplicar o novo sistema",
        "k": "MÉTODO RTAV",
        "x": "Sobre a base limpa, aplique CBS e IBS conforme o ano, destino, redução e regime da operação. Se o exercício usar 9%, 27,91% ou 28%, marque como premissa didática."
      },
      {
        "t": "3. Tratar o velho remanescente",
        "k": "MÉTODO RTAV",
        "x": "Na transição, ICMS/ISS ainda podem permanecer na formação econômica. O RTAV usa a sequência 'primeiro o novo, depois o velho' para reconstruir o bruto."
      },
      {
        "t": "4. Repetir ano a ano",
        "k": "MÉTODO",
        "x": "2027 não representa 2029 ou 2032. Refaça a conta em cada ano porque a composição entre CBS, IBS e tributos antigos muda."
      },
      {
        "t": "5. Ferramenta de preço",
        "k": "NO SITE",
        "x": "A calculadora de preço mostra preço atual, tributos, valor líquido e o preço projetado de 2027 a 2033 para preservar o mesmo líquido por venda."
      },
      {
        "t": "6. Ferramenta de faturamento",
        "k": "NO SITE",
        "x": "A calculadora de faturamento faz a mesma lógica em escala: receita bruta, tributos, faturamento líquido e receita bruta projetada para preservar o líquido de 2026."
      },
      {
        "t": "7. DRE completa é uma etapa adicional",
        "k": "RTAV",
        "x": "Uma análise estratégica completa pode incluir compras, fornecedores, créditos, custos, despesas e margem. Isso vai além da calculadora tributária simplificada do site."
      },
      {
        "t": "8. Três estratégias ensinadas no material",
        "k": "MATERIAL RTAV",
        "x": "O evento compara manter preço bruto, preservar receita líquida ou preservar margem/resultado. São objetivos de decisão empresarial, não regras fiscais."
      },
      {
        "t": "9. Banda +1,27% a +3,61%",
        "k": "EXEMPLO RTAV",
        "x": "A faixa pertence a uma DRE específica apresentada no evento. Não é parâmetro geral para outros clientes."
      }
    ],
    "qa": [
      [
        "A Reforma sempre aumenta o preço?",
        "Não. A reconstrução pode indicar aumento, redução ou estabilidade, dependendo da carga atual e das regras do cenário futuro."
      ],
      [
        "A calculadora do site calcula margem?",
        "Não nesta versão. Ela foi intencionalmente simplificada para preço, faturamento, tributos e valor líquido."
      ],
      [
        "Posso aplicar 9% de CBS em qualquer cliente?",
        "Não como alíquota oficial. No RTAV, 9% é premissa didática de determinados exercícios."
      ],
      [
        "Preço projetado é preço comercial obrigatório?",
        "Não. É uma referência econômica da simulação; a decisão comercial pertence à empresa."
      ]
    ],
    "legal": "RTAV; Material de Estudo, págs. 8–11; LC 214/2025 para base, alíquotas, créditos e transição. A calculadora do site é didática e não substitui apuração fiscal."
  },
  {
    "id": "08",
    "title": "Simples Nacional em 2027",
    "subtitle": "Simples padrão, regime regular de IBS/CBS, prazos, créditos, regime de caixa e NFS-e.",
    "intro": "O Simples Nacional continua existindo. A grande novidade é que o optante pode permanecer com IBS/CBS dentro do Simples ou exercer a opção de apurá-los pelo regime regular, continuando no Simples para os demais tributos.",
    "before": "Até 2026, o Simples opera com sua estrutura atual e ainda admite regime de caixa para a base mensal nas condições então vigentes.",
    "after": "A partir de 2027, CBS e IBS passam a integrar a disciplina do Simples; existe opção pelo regime regular desses dois tributos; o regime de caixa mensal deixa de ser utilizado; e a documentação fiscal passa por novas exigências.",
    "blocks": [
      {
        "t": "1. Simples padrão",
        "k": "REGRA OFICIAL",
        "x": "Se a empresa permanecer com IBS/CBS dentro do Simples, esses tributos são recolhidos segundo as regras do regime unificado e a partilha aplicável ao Anexo/faixa."
      },
      {
        "t": "2. Opção pelo regime regular de IBS/CBS",
        "k": "REGRA OFICIAL",
        "x": "O art. 41, §3º, permite ao optante do Simples apurar e recolher IBS e CBS pelo regime regular, mantendo-se no Simples para os demais tributos."
      },
      {
        "t": "3. Primeiro semestre de 2027",
        "k": "PRAZO 2026",
        "x": "Para empresas já optantes que desejem IBS/CBS no regime regular no primeiro semestre de 2027, a janela informada pelo CGSN/RFB é de 1º a 30 de setembro de 2026."
      },
      {
        "t": "4. Segundo semestre de 2027",
        "k": "PRAZO 2027",
        "x": "Quem não fez a opção anterior pode exercer nova opção de 1º a 31 de março de 2027 para efeitos de julho a dezembro, conforme as regras publicadas pelo CGSN."
      },
      {
        "t": "5. Permanência no modelo escolhido",
        "k": "ATENÇÃO",
        "x": "A regulamentação prevê continuidade da opção pelo regime regular nos períodos seguintes, salvo renúncia nos prazos aplicáveis. Não trate a escolha como uma decisão mensal."
      },
      {
        "t": "6. Regime de caixa",
        "k": "REGRA 2027",
        "x": "A regulamentação publicada em 2026 extingue a opção pelo regime de caixa para a determinação da base mensal do Simples a partir de 1º de janeiro de 2027; a receita passa a seguir as novas regras de faturamento."
      },
      {
        "t": "7. NFS-e nacional",
        "k": "ATUALIZAÇÃO 2026",
        "x": "ME e EPP optantes do Simples sujeitas à NFS-e passam a usar o padrão nacional a partir de 1º de novembro de 2026. Os efeitos específicos de CBS/IBS para optantes começam em 1º de janeiro de 2027."
      },
      {
        "t": "8. Crédito para o adquirente",
        "k": "REGRA OFICIAL",
        "x": "Quando IBS/CBS são pagos dentro do Simples, o adquirente sujeito ao regime regular pode ter crédito equivalente ao valor desses tributos devido via Simples. No regime regular, aplicam-se as regras gerais de débito e crédito."
      },
      {
        "t": "9. 'DAS remanescente'",
        "k": "LINGUAGEM RTAV",
        "x": "O RTAV usa essa expressão para explicar a parcela que permanece no Simples quando IBS/CBS são apurados por fora. É recurso didático; a apuração real deve seguir PGDAS-D e regulamentação vigente."
      },
      {
        "t": "10. Sublimite",
        "k": "PONTO DE ATENÇÃO",
        "x": "O tratamento de ICMS/ISS e, na transição, do IBS em situações de sublimite exige análise própria. Não use uma conta simplificada para RBT12 acima dos limites relevantes sem conferir a regra aplicável."
      }
    ],
    "qa": [
      [
        "O Simples acaba em 2027?",
        "Não."
      ],
      [
        "Escolher IBS/CBS no regime regular tira a empresa do Simples?",
        "Não para os demais tributos, desde que ela continue atendendo aos requisitos do Simples."
      ],
      [
        "O híbrido é sempre melhor para empresa B2B?",
        "Não. É necessário comparar carga própria, crédito gerado ao cliente, fluxo de caixa, compliance e perfil comercial."
      ],
      [
        "O regime de caixa mensal continua em 2027?",
        "Não, segundo a regulamentação publicada em 2026 para a base de cálculo mensal do Simples."
      ],
      [
        "A NFS-e nacional obrigatória em novembro já exige CBS/IBS do Simples em novembro de 2026?",
        "Não. A Receita esclarece que os efeitos de CBS/IBS para optantes começam em 1º de janeiro de 2027."
      ]
    ],
    "legal": "LC 214/2025, art. 41 e art. 47, §9º; Resoluções CGSN nº 190 e nº 191/2026; orientações Receita Federal/CGSN de agosto e setembro de 2026; RTAV."
  },
  {
    "id": "09",
    "title": "Lucro Presumido × Lucro Real e LC 224",
    "subtitle": "Por que a comparação de regimes precisa sair da alíquota isolada e entrar na DRE.",
    "intro": "A Reforma do consumo não extingue o Lucro Presumido. O que muda é uma das premissas históricas de comparação: PIS/Cofins dão lugar à CBS e o regime regular de IBS/CBS passa a valer para empresas fora do Simples independentemente de IRPJ/CSLL serem apurados pelo Presumido ou Real.",
    "before": "No consumo, Presumido costuma usar PIS/Cofins cumulativo e Real o não cumulativo; IRPJ/CSLL seguem bases próprias de cada regime.",
    "after": "Com CBS/IBS no regime regular, a decisão entre Presumido e Real depende ainda mais de lucro efetivo, presunção, adicional de IRPJ, ajustes fiscais, benefícios, prejuízos fiscais e custo operacional.",
    "blocks": [
      {
        "t": "1. Lucro Presumido não foi extinto",
        "k": "REGRA",
        "x": "A Reforma Tributária do Consumo não elimina o regime de Lucro Presumido para IRPJ/CSLL."
      },
      {
        "t": "2. CBS/IBS não decidem sozinhos Presumido × Real",
        "k": "CONCEITO",
        "x": "Para empresas fora do Simples, a disciplina de IBS/CBS é a do regime regular. A escolha de IRPJ/CSLL continua exigindo comparação própria entre Presumido e Real."
      },
      {
        "t": "3. LC 224 — acréscimo nos percentuais de presunção",
        "k": "REGRA OFICIAL",
        "x": "A LC 224 prevê acréscimo de 10% nos percentuais de presunção aplicáveis à parcela da receita bruta total que exceder R$ 5 milhões no ano-calendário, com proporcionalidade por período e atividade."
      },
      {
        "t": "4. 32% vira 35,2%, não 42%",
        "k": "CÁLCULO",
        "x": "32% × 1,10 = 35,2%. O acréscimo é de 10% sobre o percentual de presunção, e não de 10 pontos percentuais."
      },
      {
        "t": "5. Exemplo de R$ 10 milhões",
        "k": "EXEMPLO DIDÁTICO",
        "x": "No exemplo simplificado de serviços: R$ 5 milhões × 32% = R$ 1,6 milhão; R$ 5 milhões × 35,2% = R$ 1,76 milhão; base total simulada = R$ 3,36 milhões."
      },
      {
        "t": "6. Limite do exemplo",
        "k": "ATENÇÃO",
        "x": "Essa conta isola a base presumida. Para decidir regime, ainda é necessário calcular IRPJ, CSLL, adicional, ajustes, benefícios e demais efeitos relevantes."
      },
      {
        "t": "7. Lucro efetivo abaixo da presunção",
        "k": "INDÍCIO, NÃO VEREDITO",
        "x": "Pode ser sinal de que o Lucro Real merece estudo, mas não prova que será melhor. A decisão exige comparação completa."
      },
      {
        "t": "8. Opinião do RTAV",
        "k": "SEPARAR DA LEI",
        "x": "A expectativa de migração de empresas do Presumido para o Real é análise estratégica do palestrante, não obrigação legal nem resultado garantido."
      }
    ],
    "qa": [
      [
        "O Lucro Presumido acaba em 2027?",
        "Não."
      ],
      [
        "Se minha margem real é menor que a presunção, o Lucro Real é automaticamente melhor?",
        "Não. É um sinal para simular, não uma conclusão automática."
      ],
      [
        "A LC 224 somou 10 pontos à presunção?",
        "Não. O acréscimo é de 10% sobre o percentual aplicável à parcela excedente."
      ],
      [
        "O limite de R$ 5 milhões é simplesmente dividido ao meio em qualquer empresa?",
        "Não. A lei prevê proporcionalidade por período de apuração e por atividade; o exemplo de R$ 10 milhões é simplificado."
      ]
    ],
    "legal": "LC 224/2025, art. 4º, §4º, VII, e §5º; LC 214/2025; RTAV; Material de Estudo, págs. 7–8."
  },
  {
    "id": "10",
    "title": "Reduções e regimes específicos",
    "subtitle": "Como aplicar benefícios corretamente sem confundir percentual de redução, CNAE e enquadramento legal.",
    "intro": "A alíquota-padrão não se aplica de forma idêntica a todas as operações. A LC 214 cria regimes diferenciados, com reduções sobre as alíquotas, e regimes específicos, que podem alterar base, alíquota, crédito e forma de apuração.",
    "before": "No sistema atual, benefícios estão espalhados entre legislações federais, estaduais e municipais.",
    "after": "No IBS/CBS, muitos tratamentos favorecidos são organizados na própria LC 214, mas o enquadramento continua dependendo da operação, da classificação e dos requisitos legais.",
    "blocks": [
      {
        "t": "1. Redução de 30% para profissões listadas",
        "k": "REGRA OFICIAL",
        "x": "O art. 127 reduz em 30% as alíquotas de IBS/CBS sobre serviços de profissionais listados, entre eles contabilistas. A redução exige o atendimento das condições legais aplicáveis à pessoa física ou jurídica."
      },
      {
        "t": "2. Escritório contábil não entra automaticamente",
        "k": "ATENÇÃO",
        "x": "A atividade estar relacionada à contabilidade não basta, por si só, para concluir o benefício. É necessário verificar habilitação, composição societária, atividade efetivamente prestada e demais requisitos do art. 127."
      },
      {
        "t": "3. Redução de 60%",
        "k": "REGRA OFICIAL",
        "x": "A LC 214 prevê redução de 60% para grupos como educação, saúde, dispositivos médicos, medicamentos, alimentos, certos produtos de higiene, agro, produções culturais, comunicação institucional e atividades desportivas, sempre conforme definições e listas legais."
      },
      {
        "t": "4. Alíquota zero",
        "k": "REGRA OFICIAL",
        "x": "Há hipóteses específicas de redução a zero. Não aplique alíquota zero por descrição genérica do produto; confirme NCM/NBS, anexo, registro e demais requisitos quando exigidos."
      },
      {
        "t": "5. Bares e restaurantes",
        "k": "REGIME ESPECÍFICO",
        "x": "O regime específico alcança as operações definidas nos arts. 273 e seguintes. As alíquotas são reduzidas em 40%; a base possui exclusões próprias, e o adquirente não pode apropriar crédito de IBS/CBS sobre alimentação e bebidas abrangidas pelo regime."
      },
      {
        "t": "6. Hotelaria, parques de diversão e temáticos",
        "k": "REGIME ESPECÍFICO",
        "x": "As alíquotas são reduzidas em 40%. O fornecedor pode apropriar créditos de suas aquisições conforme as regras gerais; o adquirente dos serviços abrangidos não apropria crédito de IBS/CBS da operação."
      },
      {
        "t": "7. Redução não é alíquota final",
        "k": "FÓRMULA",
        "x": "Alíquota final = alíquota aplicável × (1 − redução). Exemplo didático: referência de 28% com redução de 60% resulta em 11,2%."
      },
      {
        "t": "8. CNAE sozinho não resolve",
        "k": "ERRO COMUM",
        "x": "O enquadramento pode depender de NCM, NBS, anexo legal, natureza da operação, habilitação profissional, registro regulatório e requisitos societários. O CNAE é apenas uma informação do diagnóstico."
      },
      {
        "t": "9. Crédito também pode mudar",
        "k": "NA PRÁTICA",
        "x": "Alguns regimes preservam crédito das aquisições do fornecedor e restringem o crédito do adquirente. Sempre analise os dois lados da cadeia antes de comparar carga apenas pela alíquota."
      }
    ],
    "qa": [
      [
        "Todo escritório contábil tem redução de 30%?",
        "Não automaticamente. A profissão está listada, mas a prestação precisa atender aos requisitos legais."
      ],
      [
        "Redução de 60% significa pagar alíquota de 60%?",
        "Não. Significa aplicar apenas 40% da alíquota que seria utilizada sem a redução."
      ],
      [
        "Restaurante gera crédito ao cliente sobre a alimentação abrangida?",
        "A LC 214 veda ao adquirente a apropriação de crédito de IBS/CBS nessas operações abrangidas pelo regime específico."
      ],
      [
        "Hotel pode tomar crédito das próprias compras?",
        "A lei permite ao fornecedor de hotelaria/parques apropriar créditos de suas aquisições conforme as regras gerais, embora vede o crédito ao adquirente do serviço abrangido."
      ]
    ],
    "legal": "LC 214/2025, arts. 127 a 146 e arts. 273 a 283, texto atualizado pela LC 227/2026; Decreto 12.955/2026 para a CBS; RTAV."
  },
  {
    "id": "11",
    "title": "Recolhimento, documentos e apuração assistida",
    "subtitle": "Split payment, recolhimento pelo adquirente, DF-e e o novo fluxo de conferência.",
    "intro": "Fato gerador, documento fiscal, extinção do débito, crédito e pagamento são etapas diferentes. A nova arquitetura conecta essas etapas eletronicamente, mas a implantação é gradual e cada mecanismo possui regra própria.",
    "before": "Grande parte da rotina atual reconstrói a apuração depois da emissão, por meio de escriturações, declarações e conciliações.",
    "after": "IBS/CBS aproximam documento fiscal, apuração, pagamento e crédito. Isso aumenta a importância de cadastro, parametrização e conferência de dados na origem.",
    "blocks": [
      {
        "t": "1. Split payment",
        "k": "REGRA OFICIAL",
        "x": "Nas transações alcançadas, prestadores e operadores de sistemas de pagamento segregam e recolhem IBS/CBS na liquidação financeira. A LC 214 prevê procedimento padrão e procedimento simplificado."
      },
      {
        "t": "2. Não começa tudo de uma vez",
        "k": "REGRA OFICIAL",
        "x": "A própria LC 214 determina implementação gradual do split payment e admite hipóteses facultativas definidas em ato conjunto. Não afirme que toda transação estará sujeita ao mecanismo desde o primeiro dia."
      },
      {
        "t": "3. Recolhimento pelo adquirente",
        "k": "REGRA OFICIAL",
        "x": "É modalidade distinta do split payment. O adquirente sujeito ao regime regular pode recolher IBS/CBS da operação quando utilizar instrumento de pagamento que não permita a segregação prevista nos arts. 32 e 33, observadas as condições do art. 36."
      },
      {
        "t": "4. Apuração assistida",
        "k": "REGRA OFICIAL",
        "x": "RFB e CGIBS podem disponibilizar apuração assistida. O contribuinte pode confirmar ou ajustar; a falta de manifestação no prazo pode fazer presumir correto o saldo apresentado e constituir o crédito tributário."
      },
      {
        "t": "5. Documento fiscal idôneo",
        "k": "PONTO CENTRAL",
        "x": "O documento fiscal eletrônico é peça-chave para crédito e apuração. Cadastro do item, natureza da operação, destino, regime, classificação e campos de IBS/CBS precisam estar corretos na origem."
      },
      {
        "t": "6. Ato Conjunto nº 4/2026",
        "k": "CRONOGRAMA DF-e",
        "x": "O Ato Conjunto RFB/CGIBS nº 4, de 30/07/2026, estabelece datas de início da obrigatoriedade dos documentos fiscais eletrônicos abrangidos. Leiaute publicado e início da obrigatoriedade são marcos diferentes."
      },
      {
        "t": "7. Ato Técnico Conjunto nº 4/2026",
        "k": "SPLIT PAYMENT",
        "x": "É outro ato: o Ato Técnico Conjunto RFB/CGIBS nº 4, de 28/08/2026, aprova documentação técnica e padrões operacionais da Plataforma Pública do Split Payment. Não confunda com o Ato Conjunto do cronograma de DF-e."
      },
      {
        "t": "8. NFS-e",
        "k": "ATUALIZAÇÃO 2026",
        "x": "A Nota Técnica 009/2026 consolida adaptações do leiaute da NFS-e. Para ME/EPP optantes do Simples sujeitas à NFS-e, o padrão nacional torna-se obrigatório em 1º/11/2026; os efeitos de CBS/IBS começam em 1º/1/2027."
      },
      {
        "t": "9. O papel do contador",
        "k": "NA PRÁTICA",
        "x": "A tendência é deslocar trabalho de digitação/reconstrução para parametrização, conciliação, tratamento de exceções, validação de crédito, caixa e análise. A conferência humana continua necessária."
      }
    ],
    "qa": [
      [
        "Split payment é o fato gerador?",
        "Não. Fato gerador define quando ocorre a incidência; split payment é uma forma de recolhimento."
      ],
      [
        "Ato Conjunto nº 4 e Ato Técnico Conjunto nº 4 são a mesma coisa?",
        "Não. O primeiro trata do cronograma de obrigatoriedade de DF-e; o segundo da documentação técnica da plataforma de split payment."
      ],
      [
        "Apuração assistida elimina a responsabilidade do contribuinte?",
        "Não. Há possibilidade de confirmação/ajuste e efeitos legais para ausência de manifestação."
      ],
      [
        "Todos os documentos fiscais mudam na mesma data?",
        "Não. Existe cronograma por documento e operação; acompanhe as orientações oficiais."
      ]
    ],
    "legal": "LC 214/2025, arts. 27, 31 a 36, 44 a 48; Ato Conjunto RFB/CGIBS nº 4, de 30/07/2026; Ato Técnico Conjunto RFB/CGIBS nº 4, de 28/08/2026; Orientações RTC da Receita Federal; NT 009/2026 da NFS-e."
  },
  {
    "id": "12",
    "title": "Planejamento e conversa com o cliente",
    "subtitle": "Como transformar regra tributária em diagnóstico, cenário e plano de ação.",
    "intro": "O objetivo final do RTAV é sair da explicação abstrata da lei e chegar a uma decisão empresarial fundamentada. O contador precisa separar fatos, premissas e estimativas; projetar a transição; e comunicar o impacto em linguagem que o cliente consiga usar.",
    "before": "Planejamento tributário muitas vezes termina na comparação de alíquotas ou no valor de uma guia.",
    "after": "Na Reforma, o diagnóstico precisa integrar operação, destino, preço, faturamento, regime, clientes, fornecedores, crédito, documentos, contratos, sistemas e caixa.",
    "blocks": [
      {
        "t": "1. Comece pelo mapa do negócio",
        "k": "MÉTODO",
        "x": "Liste faturamento, regime, produtos/serviços, clientes, fornecedores, destinos, contratos, antecipações, benefícios, créditos, documentos e sistemas. Sem esse inventário, a projeção nasce incompleta."
      },
      {
        "t": "2. Classifique cada informação",
        "k": "MÉTODO",
        "x": "Marque claramente: REGRA OFICIAL, PREMISSA RTAV, ESTIMATIVA, PREMISSA DO CLIENTE ou PONTO PENDENTE. Isso impede que uma simulação de 9% ou 28% vire 'alíquota oficial' por repetição."
      },
      {
        "t": "3. Projete 2027–2033",
        "k": "MÉTODO",
        "x": "Monte cenários por ano. A transição muda a participação de ICMS/ISS e IBS, por isso um único cálculo não serve para todo o período."
      },
      {
        "t": "4. Analise preço e faturamento separadamente",
        "k": "NO SITE",
        "x": "Use a ferramenta de preço para uma venda individual e a ferramenta de faturamento para a visão macro. Ambas partem do líquido de 2026 e mostram a evolução tributária anual."
      },
      {
        "t": "5. Vá além quando o trabalho exigir",
        "k": "RTAV",
        "x": "Para uma consultoria completa, acrescente compras, créditos de fornecedores, custos, despesas e DRE. A ferramenta tributária simplificada não substitui esse diagnóstico econômico."
      },
      {
        "t": "6. Compare regimes corretamente",
        "k": "MÉTODO",
        "x": "No Simples, compare recolhimento dentro do regime e opção pelo regime regular de IBS/CBS quando aplicável. No Presumido x Real, use cálculo completo de IRPJ/CSLL e não apenas a margem presumida."
      },
      {
        "t": "7. Revise contratos",
        "k": "NA PRÁTICA",
        "x": "Mapeie preço, tributos, repasse, reajuste, antecipação, prazo, destino e cláusulas de reequilíbrio. O efeito econômico pode mudar mesmo sem alteração aparente no contrato."
      },
      {
        "t": "8. Prepare cadastro e sistema",
        "k": "NA PRÁTICA",
        "x": "Revise ERP, emissor, NCM/NBS, cadastro de destino, regime do cliente, regras de redução, documentos fiscais e integrações financeiras."
      },
      {
        "t": "9. Prepare o caixa",
        "k": "NA PRÁTICA",
        "x": "Antecipações, split payment, recolhimento pelo adquirente e momento de crédito podem alterar capital de giro. Simular carga sem olhar fluxo financeiro pode gerar decisão incompleta."
      },
      {
        "t": "10. Entregue uma análise explicável",
        "k": "COMUNICAÇÃO",
        "x": "Mostre 2026 como base e explique, ano a ano, o que muda em tributos, preço ou faturamento. O cliente precisa entender a causa da mudança, não apenas receber um percentual."
      },
      {
        "t": "11. Atualize o diagnóstico",
        "k": "ATENÇÃO",
        "x": "Alíquotas, atos operacionais, cadastro, mix, fornecedores e contratos podem mudar. Registre a data e as fontes de cada cenário e revise sempre que houver fato novo relevante."
      }
    ],
    "qa": [
      [
        "Posso prometer hoje a carga exata de todos os anos até 2033?",
        "Não. Parte das alíquotas futuras e dos atos operacionais é definida ao longo da implementação. Trabalhe com cenários identificados e atualizados."
      ],
      [
        "Qual é a prioridade do cliente em 2026?",
        "Depende do perfil, mas cadastro/documento, sistemas, Simples quando aplicável, entendimento do ano-teste e projeção para 2027 são frentes centrais."
      ],
      [
        "A calculadora substitui uma revisão fiscal completa?",
        "Não. Ela organiza a análise tributária de preço e faturamento; operações especiais exigem enquadramento próprio."
      ],
      [
        "O contador deve decidir o preço comercial do cliente?",
        "Não. O contador demonstra efeitos e cenários; a decisão comercial é da empresa."
      ]
    ],
    "legal": "RTAV; Material de Estudo; EC 132/2023; LC 214/2025 atualizada pela LC 227/2026; LC 224/2025; Decreto 12.955/2026; orientações RFB/CGIBS vigentes em setembro de 2026."
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
    "RTAV + Material de Estudo 26/09/2026",
    "#",
    "Base didática do treinamento. Exemplos, estimativas e opiniões do palestrante são identificados e não substituem a regra oficial."
  ]
];

const CLIENT_FAQ = [
  {
    "q": "Devo migrar do Simples para o regime regular de IBS/CBS em 2027?",
    "a": "Não existe resposta automática. Compare carga própria, créditos das aquisições, crédito gerado ao cliente, fluxo de caixa, compliance e perfil B2B/B2C. Use o Módulo 08 como roteiro."
  },
  {
    "q": "Meu preço obrigatoriamente vai subir com a Reforma?",
    "a": "Não. A projeção pode indicar aumento, redução ou estabilidade. O resultado depende dos tributos atuais, do ano da transição, do destino, de reduções e do regime."
  },
  {
    "q": "Venda para PJ muda a análise?",
    "a": "Sim. Um comprador no regime regular pode avaliar o custo efetivo depois dos créditos de IBS/CBS, e não apenas o preço bruto da nota. Veja o Módulo 06 e os casos P04 e P05."
  },
  {
    "q": "Posso usar 28% como alíquota padrão para todo cliente?",
    "a": "Não. Números como 27,91% ou 28% devem ser identificados como premissas ou referências didáticas. A alíquota aplicável depende do período, destino, redução e regime da operação."
  },
  {
    "q": "O que muda em contratos com sinal ou pagamento antecipado?",
    "a": "Pagamento anterior ao fornecimento pode gerar antecipação de IBS/CBS. Revise faturamento, documentos, fluxo de caixa e cláusulas de preço/tributo. Veja o Módulo 02."
  },
  {
    "q": "Uma simulação de 2027 serve até 2033?",
    "a": "Não. A composição entre CBS, IBS e ICMS/ISS muda ao longo da transição. A análise deve ser refeita ano a ano."
  }
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
    "source": "RTAV; Material de Estudo, págs. 1–2; LC 214/2025, art. 10.",
    "regimes": [
      "geral"
    ],
    "sector": "geral"
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
    "source": "RTAV; Material de Estudo, págs. 8–9 e exercício 1 das págs. 12–13.",
    "regimes": [
      "presumido"
    ],
    "sector": "comercio"
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
    "source": "Material de Estudo, págs. 9 e 12–13; RTAV.",
    "regimes": [
      "real"
    ],
    "sector": "servicos"
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
    "source": "Material de Estudo, pág. 10 e exercício 5 das págs. 12–13; RTAV.",
    "regimes": [
      "geral",
      "presumido",
      "real",
      "simples"
    ],
    "sector": "b2b"
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
    "source": "Transcrição 2 do RTAV; Receita Federal/CGSN 2026 sobre Simples puro e híbrido.",
    "regimes": [
      "simples",
      "real"
    ],
    "sector": "b2b"
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
    "source": "Slides e Material de Estudo do RTAV.",
    "regimes": [
      "simples"
    ],
    "sector": "servicos"
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
    "source": "RTAV; Material de Estudo, pág. 7; LC 224/2025.",
    "regimes": [
      "presumido"
    ],
    "sector": "servicos"
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
    "source": "Material de Estudo, págs. 6 e 12–13; RTAV.",
    "regimes": [
      "geral"
    ],
    "sector": "geral"
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
    "source": "Material de Estudo, pág. 11; RTAV.",
    "regimes": [
      "geral",
      "presumido",
      "real"
    ],
    "sector": "geral"
  }
];
