/** 
 * 1. Stack.js (Pilha)
 * *Esta implementação utiliza um objeto JavaScript para armazenar os elementos, o que permite acesso direto e evita o custo de reindexação de arrays

/**
 * Implementação de Pilha baseada em objeto [1].
 * Segue o princípio LIFO (Last In, First Out).
 */
export class Stack {
  constructor() {
    this.count = 0; // Controla o topo da pilha [4]
    this.items = {}; // Armazenamento para eficiência O(1) [4]
  }

  // Adiciona um elemento no topo [5]
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // Remove e retorna o elemento do topo [6]
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count]; // Libera a memória [6]
    return result;
  }

  // Devolve o elemento no topo sem remover [7]
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  // Verifica se a pilha está vazia [8]
  isEmpty() {
    return this.count === 0;
  }

  // Retorna o número de elementos [8]
  size() {
    return this.count;
  }
}

/** 
 * 2. Queue.js (Fila)
 * A fila baseada em objetos utiliza dois ponteiros (count e lowestCount) para garantir que a remoção do primeiro elemento também seja uma operação de tempo constante O(1).
  
 /**
 * Implementação de Fila baseada em objeto [2].
 * Segue o princípio FIFO (First In, First Out).
 */
export class Queue {
  constructor() {
    this.count = 0; // Controla o final da fila [9]
    this.lowestCount = 0; // Controla o início da fila [10]
    this.items = {}; // Armazenamento para eficiência O(1) [9]
  }

  // Adiciona um elemento no final [11]
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // Remove e retorna o primeiro elemento [12]
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount]; // Remove do objeto [12]
    this.lowestCount++; // Move o ponteiro para o próximo [12]
    return result;
  }

  // Verifica se a fila está vazia [13]
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  // Retorna o tamanho da fila [14]
  size() {
    return this.count - this.lowestCount;
  }
}

/** 
 * 3. palindromo.js
 * Este arquivo contém a lógica principal, importando as classes e aplicando a normalização da string conforme solicitado nos requisitos do exercício.
import { Stack } from './Stack.js';
import { Queue } from './Queue.js';

/**
 * Função para verificar palíndromos utilizando Stack e Queue.
 * A combinação de LIFO e FIFO permite comparar a string original com sua inversa [16, 17].
 */
function isPalindrome(text) {
  // 1. Normalização: ignora espaços, pontuação e diferença de caixa [15]
  const cleanStr = text.toLowerCase().replace(/[\W_]/g, '');

  if (!cleanStr || cleanStr.length === 0) {
    return false;
  }

  const stack = new Stack();
  const queue = new Queue();

  // 2. Abastecimento das estruturas
  for (let i = 0; i < cleanStr.length; i++) {
    stack.push(cleanStr[i]);   // Para obter a ordem inversa (LIFO)
    queue.enqueue(cleanStr[i]); // Para obter a ordem original (FIFO)
  }

  let isEqual = true;

  // 3. Comparação lógica
  // Como a pilha desempilha do fim e a fila desenfileira do início,
  // se todos os caracteres forem iguais, a string é um palíndromo [18].
  while (!stack.isEmpty() && !queue.isEmpty()) {
    if (stack.pop() !== queue.dequeue()) {
      isEqual = false;
      break;
    }
  }

  return isEqual;
}

// --- CASOS DE TESTE ---
const testes = [
  "Ana",
  "O lobo ama o bolo",
  "Socorram-me, subi no ônibus em Marrocos",
  "JavaScript",
  "A cara rajada da jararaca"
];

testes.forEach(frase => {
  console.log(`"${frase}" é um palíndromo? ${isPalindrome(frase)}`);
});