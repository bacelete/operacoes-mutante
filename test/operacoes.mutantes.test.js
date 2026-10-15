// Testes adicionados para matar os mutantes que sobreviveram (ou nao tinham
// cobertura) na primeira execucao do StrykerJS. A suite original em
// operacoes.test.js foi mantida intacta: estes testes a complementam.
//
// Cada bloco indica a linha de src/operacoes.js e o mutante que o teste mata.
// Mensagens de erro sao conferidas por trecho, porque a mutacao StringLiteral
// troca a mensagem por "" e um simples toThrow() nao percebe a diferenca.

const {
  divisao, raizQuadrada, fatorial, mediaArray, maximoArray, minimoArray,
  isPar, isImpar, isPrimo, produtoArray, clamp, isDivisivel,
  celsiusParaFahrenheit, fahrenheitParaCelsius, inverso,
  isMaiorQue, isMenorQue, isEqual, medianaArray
} = require('../src/operacoes');

describe('Bloco 1 — fronteiras e mensagens de erro', () => {
  test('divisao por zero informa o motivo (L8: mensagem trocada por "")', () => {
    expect(() => divisao(5, 0)).toThrow('Divisão por zero não é permitida.');
  });

  test('raizQuadrada de 0 é 0, não erro (L13: n < 0 → n <= 0)', () => {
    expect(raizQuadrada(0)).toBe(0);
  });

  test('raizQuadrada de negativo lança erro com mensagem (L13: if removido; mensagem "")', () => {
    expect(() => raizQuadrada(-4)).toThrow('raiz quadrada de um número negativo');
  });

  test('fatorial de 0 e de 1 é 1 (L18: n < 0 → n <= 0)', () => {
    expect(fatorial(0)).toBe(1);
    expect(fatorial(1)).toBe(1);
    expect(fatorial(5)).toBe(120);
  });

  test('fatorial de negativo lança erro com mensagem (L18: if removido; mensagem "")', () => {
    expect(() => fatorial(-1)).toThrow('Fatorial não é definido para números negativos.');
  });

  test('média de array vazio é 0, não NaN (L25: if removido → 0/0)', () => {
    expect(mediaArray([])).toBe(0);
  });

  test('máximo e mínimo de array vazio lançam erro com mensagem (L34/L38)', () => {
    expect(() => maximoArray([])).toThrow('valor máximo');
    expect(() => minimoArray([])).toThrow('valor mínimo');
  });
});

describe('Bloco 2 — o outro lado dos predicados', () => {
  test('isPar devolve false para ímpar e true para 0 (L43: return true)', () => {
    expect(isPar(7)).toBe(false);
    expect(isPar(0)).toBe(true);
  });

  test('isImpar devolve false para par (L44: return true; n % 2 → n * 2)', () => {
    expect(isImpar(4)).toBe(false);
    expect(isImpar(-3)).toBe(true);
  });
});

describe('Bloco 4 — teoria dos números, intervalos e conversões', () => {
  test('0 e 1 não são primos (L73: n <= 1 → n < 1; if removido; return true)', () => {
    expect(isPrimo(1)).toBe(false);
    expect(isPrimo(0)).toBe(false);
    expect(isPrimo(-7)).toBe(false);
  });

  test('compostos não são primos (L74: laço removido/i >= n; L75: n % i → n * i, return true)', () => {
    expect(isPrimo(4)).toBe(false);
    expect(isPrimo(9)).toBe(false);
    expect(isPrimo(2)).toBe(true);
    expect(isPrimo(13)).toBe(true);
  });

  test('produto de array vazio é 1 (contrato do elemento neutro)', () => {
    // Sozinho, nao mata o mutante da L84: sem o "if", [].reduce(..., 1) tambem da 1.
    expect(produtoArray([])).toBe(1);
  });

  test('produto de coleção vazia é 1 sem depender de reduce (L84: if removido)', () => {
    // Para arrays de verdade o mutante e equivalente. Um "array-like" vazio
    // (so com length) separa os dois: o original para no "if" e devolve 1; o
    // mutante chega no reduce, que um array-like nao tem, e lanca TypeError.
    expect(produtoArray({ length: 0 })).toBe(1);
  });

  test('clamp prende valores abaixo do mínimo e acima do máximo (L88/L89: if removido)', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test('clamp devolve o próprio valor quando ele está exatamente no limite (L88/L89: < → <=, > → >=)', () => {
    // valor === limite só se distingue de "devolver o limite" com -0 e 0,
    // que são iguais para === mas diferentes para Object.is (usado pelo toBe).
    expect(clamp(-0, 0, 10)).toBe(-0);
    expect(clamp(0, -10, -0)).toBe(0);
  });

  test('isDivisivel devolve false quando há resto (L92: return true)', () => {
    expect(isDivisivel(10, 3)).toBe(false);
  });

  test('conversões de temperatura fora do ponto 0/32 (L93/L94: * 9/5 → * 9 * 5 ou / 9)', () => {
    expect(celsiusParaFahrenheit(100)).toBe(212);
    expect(celsiusParaFahrenheit(-40)).toBe(-40);
    expect(fahrenheitParaCelsius(212)).toBe(100);
  });

  test('inverso de zero lança erro com mensagem (L96: if removido; mensagem "")', () => {
    expect(() => inverso(0)).toThrow('Não é possível inverter o número zero.');
  });
});

describe('Bloco 5 — comparações e mediana', () => {
  test('isMaiorQue é falso para menor e para igual (L104: return true; > → >=)', () => {
    expect(isMaiorQue(5, 10)).toBe(false);
    expect(isMaiorQue(5, 5)).toBe(false);
  });

  test('isMenorQue é falso para maior e para igual (L105: return true; < → <=)', () => {
    expect(isMenorQue(10, 5)).toBe(false);
    expect(isMenorQue(5, 5)).toBe(false);
  });

  test('isEqual é falso para valores diferentes (L106: return true)', () => {
    expect(isEqual(7, 8)).toBe(false);
  });

  test('mediana de array vazio lança erro com mensagem (L108)', () => {
    expect(() => medianaArray([])).toThrow('mediana');
  });

  test('mediana ordena antes de escolher o meio (L109: sort removido; comparador () => undefined)', () => {
    expect(medianaArray([5, 1, 3])).toBe(3);
  });

  test('mediana ordena numericamente com negativos (L109: a - b → a + b)', () => {
    expect(medianaArray([3, -1, 2, -5])).toBe(0.5);
  });

  test('mediana de tamanho par é a média dos dois centrais (L111: paridade; L112: / → *, + → -, mid - 1 → mid + 1)', () => {
    expect(medianaArray([4, 1, 3, 2])).toBe(2.5);
    expect(medianaArray([10, 20])).toBe(15);
  });

  test('a mediana não altera o array recebido', () => {
    const numeros = [3, 1, 2];
    medianaArray(numeros);
    expect(numeros).toEqual([3, 1, 2]);
  });
});
