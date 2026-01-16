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
}

function createdUser(name: string): User {
  return { name, createdAt: new Date() }
}

function updateWallet(user: User, wallet: UserWallet) {

}

const Henry = updateWallet()

console.log(createdUser("Henry"));
