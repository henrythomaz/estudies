console.log("hello world!");
console.log("This is a typescript project.");

interface userWallet {
  coins?: number,
  credits?: number,
}

interface User {
  name: string,
  createdAt: Date,
  wallet?: userWallet,
}

interface User {
  talk(): void;
}

function createdUser(name: string): User {
    return { 
      name,
      createdAt: new Date(),
      talk() {
      console.log("Hi my name is", name);
    }
  };
}

function updateWallet(user: User, wallet: userWallet): void {
  user.wallet = { ...user.wallet, ...wallet };
}

const walletHenry = {
  coins: 10, credits: 10
};
const userHenry = createdUser("Henry");

const Henry = updateWallet(userHenry, walletHenry);

userHenry.talk();
console.log(userHenry);
