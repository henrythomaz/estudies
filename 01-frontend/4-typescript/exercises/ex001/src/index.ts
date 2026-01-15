// O typescript serve para melhorar o desenvolvimento em js
// Previni erros
// Adiciona tipagem
// Melhor auto cmplete
// ferramenta de desenvolvimento
// typescript == javascript

// 📝 Type anotations

const myName: string = "Henry";
const myNum: number = 1;
const myBool: boolean = true;
const myVar1: any = "MyVar1";
const myVar2: any = [myVar1, "myVar2"]
const variavel: string = "1";
const myNull: null = null;
const myUndefined: undefined = undefined;

console.log(myName);
console.log(myNum);
console.log(myBool);
console.log(myVar2);

// Inferência de tipos
const varString = "string";


function sum(a: number, b?: number): number {
  b = !b ? 0 : b;
  return a + b;
}

console.log(sum(2));
