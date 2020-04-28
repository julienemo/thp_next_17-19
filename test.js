// string.substring(n)
// string.substring(m,n)
let myString = "da nan bian";
let mySub1 = myString.substring(1);
let mySub2 = myString.substring(2);
let mySub3 = myString.substring(3);
let mySub4 = myString.substring(1, 4);
let mySub5 = myString.substring(1, 99); // won't throw out of range error!

console.log(mySub1);
console.log(mySub2);
console.log(mySub3);
console.log(mySub4);
console.log(mySub5);
