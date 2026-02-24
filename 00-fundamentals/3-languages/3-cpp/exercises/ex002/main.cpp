#include <iostream>
#include <stack>
#include <queue>
#include <list>
#include <vector>
#include <iterator>
#include <algorithm>
#include <stdio.h>
#include <math.h>
#include <iomanip>
#include <bitset>

std::stack<int> pilha;
std::queue<int> fila;
std::list<char> lista1;
std::list<char> lista2;
std::list<int> lista3 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
std::vector<char> letras = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'};

struct Carro {
  std::string nome;
  std::string cor;
  int pot;
  int velMax;
  int vel;

  void inserir (std::string inome, std::string icor, int ipot, int ivelMax) {
    nome = inome;
    cor = icor;
    pot = ipot;
    velMax = ivelMax;
    vel=0;
  }

  void mostrar () {
    std::cout << "Nome.............: " << nome << "\n";
    std::cout << "Cor..............: " << cor << "\n";
    std::cout << "Potência.........: " << pot << "\n";
    std::cout << "Velocidade Atual.: " << vel << "\n";
    std::cout << "Velocidade Máxima: " << velMax << "\n";
  }
  void mudarVel(int newVel) {
    vel=newVel;

    if (vel > velMax) {
      vel=velMax;
    }
    if(vel < 0) {
      vel = 0;
    }
  } 
};


int main(int argc, char* argv[]) {
  // Using Stacks

  for (int i = 0; i <= 10; i+=2) {
    pilha.push(i);
  }

  std::cout << "Topo: " << pilha.top() << "\n";
  pilha.pop();
  std::cout << "Topo: " << pilha.top() << "\n";
  std::cout << "Tamanho da pilha: " << pilha.size() << "\n\n";

  // Using Queues

  for (int i = 0; i <= 10; i++) {
    fila.push(i);
  }
  if (!fila.empty()) {
    std::cout << "Frente: " << fila.front() << std::endl;
    std::cout << "Fundo: " << fila.back() << std::endl;
  }

  fila.pop();

  if (!fila.empty()) {
    std::cout << "Tamanho da fila: " << fila.size() << "\n\n";
  }
  
  // Using Lists
  
  for (int letra : letras) {
    lista1.push_back(letra);
    lista2.push_front(letra);
  }
  std::cout << "Frente: " << lista1.front() << std::endl;
  std::cout << "Fundo: " << lista1.back() << std::endl;

  lista1.push_front('>');
  lista1.push_back('<');

  std::cout << "Frente: " << lista1.front() << std::endl;
  std::cout << "Fundo: " << lista1.back() << std::endl;

  lista1.pop_front();
  lista1.pop_back();

  std::cout << "Frente: " << lista1.front() << std::endl;
  std::cout << "Fundo: " << lista1.back() << std::endl;

  lista1.reverse();
  lista2.reverse();

  for (char letra : lista1) {
    std::cout << letra << ", ";
  }

  std::cout << std::endl;

  for (char letra : lista2) {
    std::cout << letra << ", ";
  }

  std::cout << std::endl;

  lista1.sort();
  lista2.sort();
  lista1.merge(lista2);

  std::list<char>::iterator it = lista1.begin();
  std::advance(it, (lista1.size() / 2));
  lista1.insert(it, '-');

  for (char letra : lista1) {
    std::cout << letra << ", ";
  }

  lista1.remove('-');

  std::cout << std::endl;

  for (char letra : lista1) {
    std::cout << letra << ", ";
  }

  std::cout << std::endl;

  lista1.insert(it, '>');
  lista1.insert(it, '>');

  auto first = std::next(lista1.begin(), (lista1.size() /2) - 1);
  auto last = std::next(lista1.begin(), (lista1.size() / 2));

  lista1.erase(first, last);

  for (char letra : lista1) {
    std::cout << letra << ", ";
  }

  std::cout << std::endl;

  if (!lista1.empty()) {
    std::cout << "Tamanho da lista: " << lista1.size();
  }

  std::cout << std::endl;

  lista3.remove_if([](int n){return n % 2 != 0;});


  for (int n : lista3) {
    std::cout << n << ", ";
  }

  // Using Structs

  std::vector<Carro> carros(2);

  std::string nome, cor;
  int pot, velMax, velAtual;

  for(int i = 0; i < carros.size(); i++) {
    std::cout << "Digite as propriedades do carro " << i+1 << " (nome, cor, potência, valor Máximo): ";
    std::cin >> nome >> cor >> pot >> velMax;

    carros[i].inserir(nome, cor, pot, velMax);
    carros[i].mostrar();

    std::cout << "Velocidade atual: ";
    std::cin >> velAtual;
    carros[i].mudarVel(velAtual);
    carros[i].mostrar();
  }

  // Using Pointers
  //  End | Type | Value | Name
  // 1000 | int  | 4     | num
  // 1001 | int  | 5     | num2
  // 1002 | int  | 10     | num3
  
  // & é operador de enderenco
  // int *ponteiro = &num;
  // cout << ponteiro; -> imprime o enderenco de num
  // cout << *onteiro; -> imprime o valor que esta no enderenco apontado no caso o de num
  
  std::string veiculo = "Carro";
  std::string *pointeiroVeiculo = &veiculo;
  std::cout << pointeiroVeiculo << "\n\n";

  *pointeiroVeiculo = "Moto";
  std::cout << *pointeiroVeiculo << "\n" << veiculo;

  int *p;
  int vetor[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  p = &vetor[0];
  
  for (int i = 0; i < 10; i++) {
    std::cout << *p << "\n";
    *(p++);
  }

  // Using printf and scanf

  printf("Meu nome é Henry!\nCurso de C++");
  printf("\nAqui vem texto...\0 esse texto não vai porque o barrra 0 para a string.");

  int num0 = 123;
  int num1, num2, num3, num4;
  std::string myName;
  char lyric = 'a';
  double PI;


  num1 = 1;
  num2 = 2;
  num3 = 3;
  num4 = -10;

  myName = "Henry";

  printf("\nDigite o número PI: ");
  scanf("%lf", &PI);

  double *pointerToPI = &PI;

  // d, i - int; x, X - Hexadecimal; u - int sem sinal; s - string; c - char*; f - double; p - ponteiro;
  printf("\nValor da variavel num0: %d\n", num0);
  printf("\nValor das variaveis 1, 2 e 3: %d%d%d\n", num1, num2, num3);
  printf("\nThis's a positive number: %u ", num4);
  printf("\nPI is : %f", PI);
  printf("\nThis is the PI address: %p\n", pointerToPI);
  printf("\nNome: %s", myName.c_str());
  printf("\nMy lyric: %c\n", lyric);

  float Real_PI = M_PI;

  printf("\nValor de PI: %f", Real_PI);
  printf("\nValor de PI com apenas duas casas decimais: %.2f", Real_PI);
  printf("\nValor de PI: %07.2f", Real_PI);

  // Using cout
  
  int num5 = 10;

  std::cout << "Num value in dec: " << num5 << "\n";
  std::cout << "Num value in hex: " << std::hex << num5 << "\n";
  std::cout << "Num value in oct: " << std::oct << num5 << "\n";
  std::cout << "NUm value in oct again: " << std::setbase(8) << num5 << "\n";
  std::cout << "Num value in bits: " << std::bitset<4>(num5) << "\n";

  std::cout.precision(2);
  std::cout << "Still in PI value: " << std::setw(30) << Real_PI << "\n";
  std::cout.precision(4);
  std::cout << "Still in PI value: " << Real_PI << "\n";
  std::cout.precision(-1);
  std::cout << "Still in PI valueee: " << std::scientific << Real_PI << "\n";

  // Using Vector

  return 0;
}
