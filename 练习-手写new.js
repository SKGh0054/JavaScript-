// new 是一个运算符 手写new需要靠模拟函数实现

// 一、普通new演示: 使用new运算符
function Person(a, b, c) {
    this.a = a
    this.b = b
    this.c = c
}
Person.prototype.running = function () {
    console.log("写代码");
}
let person = new Person(1, 2, 3)
console.log(person);  // Person { a: 1, b: 2, c: 3 }




// 二、手写new实现: 使用函数替代new运算符
function Person_new(a, b, c) {
    this.a = a
    this.b = b
    this.c = c
}
Person_new.prototype.running = function () {
    console.log("写new代码");
}

function myNew(person_new, ...args) {
    let obj = {}  // 创建对象
    obj.__proto__ = person_new.prototype  // 改变obj的隐式原型 改为构造器Person_new的显式原型 这样就有同一个了
    person_new.apply(obj, args)  // 给构造器绑定this 并传参执行
    return obj  // 返回一个对象
}
let person_new = myNew(Person_new, 4, 5, 6)
console.log(person_new);  // Person_new { a: 4, b: 5, c: 6 }




// 三、手写new实现: 使用函数替代new运算符 细节考虑
function Animal(a, b, c) {
    this.a = a
    this.b = b
    this.c = c
    // return { a: 1, b: 2 }  // { a: 1, b: 2 }
    // return function () { console.log("fn..."); }  // [Function (anonymous)]
}
function _new(ctor, ...args) {
    if (!ctor.hasOwnProperty("prototype")) {
        throw new TypeError("ctor is not a constructor")  // TypeError: ctor is not a constructor
    }
    let obj = Object.create(ctor.prototype)
    let result = ctor.apply(obj, args)
    if (result !== null && (typeof result == "object" || typeof result == "function")) {
        return result
    }
    return obj
}
let p = _new(Animal, 8, 8, 9)
console.log(p);