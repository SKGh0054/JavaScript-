// 一、普通的检测数据类型方法:

// 1.  typeof 方法
// 利用typeof检测基本类型和函数，非常准确
console.log(typeof 123);  // number
console.log(typeof NaN);  // number
console.log(typeof "hello");  // string
console.log(typeof true);  // boolean
console.log(typeof undefined);  // undefined
console.log(typeof function () { });  // function
// 检测其它的，结果都是object，不够准确
console.log(typeof null);  // object
console.log(typeof {});  // object
console.log(typeof []);   // object

// 2.  instanceof 方法
// instanceof 用来检测某个对象是否属于某个类的实例
console.log(123 instanceof Number);  // false   因为123不是对象
let num = new Number(123)
console.log(num instanceof Number);  // true
console.log({} instanceof Object);  // true
console.log([] instanceof Array);  // true
console.log(function () { } instanceof Function);  // true
console.log(function () { } instanceof Object);  // true
console.log([] instanceof Object);  // true
// instanceof 的不足：
//   1）可以检测引用数据类型，不能检测基本数据
//   2）所有的引用数据类型，都是Object的实例
//   3）可以人为修改原型链，导致检测的结果不准备

// 3.  constructor 方法
let n = new Number(110);
n.constructor = Array;  // 人为可以修改constructor指向 
console.log(n.constructor === Number);  // true
console.log({}.constructor === Number);  // false
console.log({}.constructor === Object);  // true
console.log([].constructor === Array);  // true
// console.log(123.constructor  === Number);  // 错误的
// constructor 的不足：
//   1）可以检测引用数据类型，不能检测基本数据类型
//   2）人为可以修改constructor指向 ，检测的结果就不准备

// 4.  Object.prototype.toString.call() 方法  (目前来说js内置最好的数据检测方式)
console.log(Object.prototype.toString.call(123)); // [object Number]
console.log(Object.prototype.toString.call("ok")); // [object String]
console.log(Object.prototype.toString.call(true)); // [object Boolean]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call({})); // [object Object]
console.log(Object.prototype.toString.call(function () { })); // [object Function]
function Person() { }; let p = new Person();
console.log(Object.prototype.toString.call(p)); // [object Object]
console.log(Object.prototype.toString.call(/abc/)); // [object RegExp]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
let d = new Date();
console.log(Object.prototype.toString.call(d)); // [object Date]
let s = Symbol();
console.log(Object.prototype.toString.call(s)); // [object Symbol]






// 二、手写检测数据类型方法(checkType):

function checkType(data) {
    let newdata = Object.prototype.toString.call(data)
    let res = newdata.slice(8, -1).toLowerCase()
    return res
}

// 简化:
const checkType = data => Object.prototype.toString.call(data).slice(8, -1).toLowerCase()

console.log(checkType(123));  // number
console.log(checkType(NaN));  // number
console.log(checkType("www"));  // string
console.log(checkType(null));  // null
console.log(checkType(undefined));  // undefined
console.log(checkType([]));  // array
console.log(checkType({}));  // object
console.log(checkType(function () { }));  // function
console.log(checkType(new Date()));  // date
console.log(checkType(new Map()));  // map