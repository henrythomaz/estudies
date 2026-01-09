#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Navio 
{
  string nome;
  int tamanho;
  bool destruido;
};

struct  Tabuleiro
{
  vector<vector<char>> grid;

  Tabuleiro(int linhas, int colunas) {
    grid = vector<vector<char>>(linhas, vector<char>(colunas, '.'));
  }
};

struct Jogo
{
  Tabuleiro tab(10, 10);
  bool rodando;
};

vector<Navio> navios;
int quantidadeNavios;

Jogo startGame() {
  
  Jogo jogo{
    true
  };
  
  cout << "Batalha Naval" << endl << endl;
  return jogo;
}
void input() {
  cout << "Quantos navios?" << endl;
  cin >> quantidadeNavios;
  navios.resize(quantidadeNavios);
  for (int navio = 0; navio < quantidadeNavios; navio++)
  {
    cout << "Digite o tamanho do navio:";
    cin >> navios[navio].tamanho;
    
    cout << "Digite o nome do navio:";
    cin >> navios[navio].nome;
  }
  cout << endl << endl;
  for (Navio navio : navios)
  {
    cout << "Navio - " << navio.nome << ": " << navio.tamanho << " ";
  }
  cout << endl << endl;  
}
// void update() {
  // }
  void render(const Tabuleiro& tab) {
    cout << "   ";

    for (int c = 1; c <= tab.grid[0].size(); c++)
    {
      cout << c << "  "; 
    }
    cout << endl;

    for (int l = 0; l < tab.grid.size(); l++)
    {
      cout << char('A' + l) << "  ";
      for (int c = 0; c < tab.grid[l].size(); c++)
      {
        cout << tab.grid[l][c] << " ";
      }
      cout << endl; 
    }
  }
    
int main() {
  Jogo jogo = startGame();

  while (jogo.rodando)
  {
    input(jogo);
    render(jogo);
  }
  
  
  return 0;
}
