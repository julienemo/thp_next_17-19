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

let a = "2018-12-22";
let b = "2018-12-21";

console.log(a > b);

let c = [1, 2, 3, 4, 5, 6, 7];
let d = c.slice(0, 45); // won't throw out of range error!
let e = c.slice(0, 4);
console.log(d);
console.log(e);

var moment = require("moment");
let s = "2016-09-29T03:20:02Z";
let p = moment(s).format("YYYY/MM/DD");
console.log(p);
