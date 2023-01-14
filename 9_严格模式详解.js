// ECMAScript5  JavaScript提出了严格模式的概念(Strict Mode)

// 第一种方式: (单文件严格模式) 在js文件中开启严格模式, 仅仅对这个JavaScript文件生效
//在JavaScript文件的首行加入"use strict"
"use strict"

// 第二种方式: (特定函数严格模式) 在函数的作用域内部单独开启严格模式, 仅仅对这个函数的内部生效
function foo() {
    "use strict";
    true.foo = "abc"//开启严格模式后，这里会报错
}
foo()




// 严格模式的限制

// 1. 禁止意外创建全局变量
message = "Hello World"  //在严格模式下这种未定义就赋值的写法是不被允许的
console.log(message)
function foo() {
    age = 20
    // 在严格模式下这种未定义就赋值的写法是不被允许的，而在非严格模式下会创建一个age全局变量
}
foo()
console.log(age)

// 2.不允许函数有相同的参数名称
function foo(x, y, x) {
    console.log(x, y, x)
}
foo(10, 20, 30)

// 3.静默错误
true.name = "abc"  //未定义就进行赋值
NaN = 123
var obj = {}
Object.defineProperty(obj, "name", {  //给obj创建一个name变量
    configurable: false,  // configurable 是否可配置 否
    writable: false,  // writable是否可写 否
})
console.log(obj.name)
obj.name = "kobe"  // 报错 只读不可写
delete obj.name  // 报错 不可配置```

// 4.不允许使用原先的八进制格式 => 以0开头的数字 如0777
var num = 0123
console.log(num)
// Es6下的进制是可编译的
var num = 0o123  // 八进制
var num2 = 0x123  // 十六进制
var num3 = 0b100  // 二进制
console.log(num, num2, num3)

// 5.with语句不允许使用
let obj = { names: "www" }
function fn() {
    names: "www";
    // with (obj) {
    //     console.log(names);
    // }
}
fn()

// 6.在严格模式下的this的指向
//      在严格模式下, 自执行函数(默认绑定)会指向undefined
//      之前编写的代码中, 自执行函数我们是没有使用过this直接去引用window
function foo() {
    console.log(this)
}
var obj = {
    name: "why",
    foo: foo
}
foo()  // undefined
obj.foo()  // { name: 'why', foo: [Function: foo] }
var bar = obj.foo
bar()  // undefined
// fn.apply(this = window)
setTimeout(function () {  // setTimeout的this => Timeout
    console.log(this)  // Timeout
}, 1000);

