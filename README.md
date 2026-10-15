# Laboratório: Teste de Mutação com a "Calculadora Mutante"

Bem-vindo ao trabalho prático de Teste de Mutação. O objetivo deste projeto é usar a ferramenta StrykerJS para avaliar e fortalecer uma suíte de testes que, à primeira vista, parece boa.

## Resultado deste fork

| | Inicial | Final |
|---|---:|---:|
| Testes | 50 | 76 |
| Cobertura de linhas | 98,64% | 100% |
| Cobertura de branches | 58,82% | 100% |
| **Mutation score (StrykerJS)** | **73,71%** | **98,12%** |

```bash
npm install
npm test               # 76 testes
npm run coverage       # cobertura
npm run mutate         # StrykerJS -> reports/mutation/mutation.html
```

- Os testes novos ficam em [`test/operacoes.mutantes.test.js`](test/operacoes.mutantes.test.js), cada um anotado com a linha e o mutante que mata. A suíte original (`test/operacoes.test.js`) não foi alterada.
- A configuração do Stryker está em [`stryker.conf.json`](stryker.conf.json). Foi usada a versão 7, compatível com Node 16 ou mais recente.
- Os 4 mutantes restantes (linha 19, guarda `n === 0 || n === 1` do fatorial) são **equivalentes**: sem a guarda, o laço já devolve 1 para 0 e 1, então nenhum teste pode matá-los.
- O relatório da entrega está em [`docs/Relatorio_Teste_de_Mutacao.pdf`](docs/Relatorio_Teste_de_Mutacao.pdf). As evidências (saídas do Jest e do Stryker, relatórios HTML inicial e final, screenshots) estão em [`docs/`](docs/).

## Contexto

Este repositório contém uma biblioteca de cálculos simples. A suíte de testes inicial em `__tests__/` foi projetada para ter uma alta **cobertura de código**, mas esconde fraquezas que só o **teste de mutação** pode revelar.

Sua missão é atuar como um engenheiro de qualidade para encontrar essas fraquezas e escrever testes mais robustos para corrigi-las.

## Tarefas

1.  **Prepare o ambiente:** Clone o repositório e rode `npm install`.
2.  **Análise Inicial:**
    - Rode `npm test` para ver os testes passando.
    - Rode `npm run coverage` e anote o percentual de cobertura.
3.  **Análise de Mutação:**
    - Configure o StrykerJS (`npx stryker init`).
    - Execute a análise com `npx stryker run` (ou `npm run mutate` após configurar o script).
    - Abra o relatório HTML e analise os **mutantes que sobreviveram**.
4.  **Aprimore os Testes:**
    - Para cada mutante sobrevivente, entenda por que ele não foi "morto".
    - Adicione novos testes em `__tests__/operacoes.test.js` focados em asserções mais específicas para matar esses mutantes.
5.  **Validação Final:**
    - Rode o Stryker novamente e verifique se sua pontuação de mutação aumentou, idealmente para mais de 95%.

Siga as instruções do documento do trabalho para a entrega final. Boa sorte!
