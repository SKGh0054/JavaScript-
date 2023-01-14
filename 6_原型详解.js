// 只要是对象就必定有一个属性:  __proto__  被称为隐式原型 其对应的值是一个对象
// 私有属性: 自己定义对象或者给对象加的属性
// 公有属性: 沿着隐式原型往下找的都是公有属性
// 以Object.属性名  这种方法来调用的时候都是先寻找 私有属性若没有 再去公有属性内寻找

// a.b => 作用域链:  找a => 先在自己的执行上下文EC找a, 如果找不到则去父的执行上下文EC找, 一直找到全局执行上下文ECG, 如果还找不到就报错
//     => 原型链:    找b => 先找a的私有属性, 如果找不到就去隐式原型__proto__中找公有属性, 如果还找不到就返回undefined
let obj = {
    names: "www",
    age: 18
}
// 隐式原型返回的也是一个对象,是对象就有一个隐式原型
console.log(obj.__proto__);  // [Object: null prototype] {}
// 只要一直找下去就能找到null
console.log(obj.__proto__.__proto__);  // null




// 每个对象身上都有一个__proto__属性
//      __proto__叫 隐式原型
// 每个构造器(类)上都有一个叫prototype属性
//      prototype叫 显示原型
function fn() {
    console.log("fn...");
}
console.dir(fn)

// 显式原型(prototype)与隐式原型(__proto__)指向同一个对象  prototype & __proto__  =>  该构造器的原型对象
// 原型对象中有一个属性constructor会指向构造器本身         constructor  =>  该构造器

function Person(name, age) {
    this.name = name
    this.age = age
}
let p = new Person("www", 18)
console.log(p.__proto__.constructor === Person);  // true