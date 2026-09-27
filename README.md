# Jaguar × RTAV

Plataforma estática da Jaguar Assessoria Contábil para estudo, simulação e apresentação da Reforma Tributária do Consumo.

## O que existe hoje

- 12 módulos de estudo técnico e didático
- casos práticos com filtros por regime e setor
- linha do tempo 2026–2033
- calculadora de preço de venda
- calculadora de faturamento
- análise B2B/B2C
- estimativa de créditos das aquisições
- gráficos da transição
- memória de cálculo
- cenários nomeados e comparação
- autosave no navegador
- exportação XLSX
- relatório para impressão/PDF
- fontes oficiais e premissas RTAV identificadas separadamente

## Arquitetura

- `index.html` — interface e estilos
- `content-v2.js` — módulos, casos, FAQ, linha do tempo e fontes
- `tax-rules.js` — base versionada de regras e premissas
- `tax-engine.js` — motor puro de cálculo, sem dependência do DOM
- `app-v2.js` — integração da interface com o motor, armazenamento e relatórios
- `tests/tax-engine.test.js` — testes unitários do motor
- `tests/browser.spec.js` — teste de navegação e interação real
- `.github/workflows/quality.yml` — validação automática no GitHub Actions

## Critério de cálculo

A aplicação diferencia:

- **regra oficial**
- **premissa didática RTAV**
- **premissa editável do usuário**

Números de referência usados no treinamento não são apresentados como alíquota universal definitiva.

## Testes

Motor tributário:

```bash
node tests/tax-engine.test.js
```

Teste de navegador:

```bash
npm install
npx playwright install chromium
npx playwright test
```

## Publicação

O site é estático e publicado pelo GitHub Pages a partir da branch `main`.

## Observação

A plataforma é ferramenta de estudo, planejamento e simulação. Operações reais devem ser validadas de acordo com o regime, período, destino, enquadramento, documentação e legislação aplicável.
