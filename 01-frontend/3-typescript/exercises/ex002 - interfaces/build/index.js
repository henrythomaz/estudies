"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hello world!");
console.log("This is a typescript project.");
function createdUser(name) {
    return { name, createdAt: new Date() };
}
function updateWallet(user, wallet) {
    return { ...user, wallet };
}
const userHenry = createdUser("Henry");
const walletHenry = {
    coins: 10, credits: 10
};
const Henry = updateWallet(userHenry, walletHenry);
console.log(Henry);
