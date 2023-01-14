// this的绑定规则

// 1）默认绑定
// 独立函数调用就是所谓的默认绑定，独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用
function fn() {
    console.log(this);  //  Object [global]
}
function gn() {
    console.log(this);  //  Object [global]
    fn()  // 独立函数调用
}
function kn() {
    console.log(this);  //  Object [global]
    gn()  // 独立函数调用
}
kn()  // 独立函数调用

let obj = {
    names: "www",
    fn() {
        console.log(this);  //  Object [global]
    }
}
let hn = obj.fn
hn()  // 独立函数调用



// 2）隐式绑定
// 另外一种比较常见的调用方式是通过某个对象进行调用的，也就是它的调用位置中，是通过某个对象发起的函数调用

function fn1() {
    console.log(this);  // { names: 'www', fn: [Function: fn1] }
    // fn中的this表示什么，就看点前面是什么
    // 点前面是obj, this就是obj
}
let obj1 = {
    names: "www",
    fn: fn1
}
obj1.fn()




// 3）显示绑定
function fn2() {
    console.log(this);
}
// console.log(fn2);
// 以对象形式打印
console.dir(fn2)

// 对象中call，bind，apply方法需要掌握

// call()方法作用  (1)显式绑定this  (2)调用函数  (3)传参: fn.call(绑定对象, 参数一, 参数二)
let obj2 = { names: "www", age: 18 }
fn2.call(obj2, "参数一", "参数二")

// apply()方法作用  (1)显式绑定this  (2)调用函数  (3)传参: fn.apply(绑定对象, [参数一, 参数二])
let obj2_1 = { names: "wwqq", age: 11 }
fn2.apply(obj2_1, ["参数一", "参数二"])

// bind()方法作用  (1)显式绑定this  (2)不调用函数并且返回绑定this后的新函数  (3)传参: fn.bind(绑定对象, 参数一, 参数二)
let obj2_2 = { names: "wcc", age: 28 }
let newFun2 = fn2.bind(obj2, "参数一", "参数二")
newFun2()


function fn2_1() {
    console.log(this);
}
fn2_1.call("hello")  // [String: 'hello']  字符串会被包装成一个对象
fn2_1.call(undefined)  // Object [global]  全局对象
fn2_1.call(null)  // Object [global]  全局对象
fn2_1.call(NaN)  // [Number: NaN]  也会被包装成一个对象




// 4) new绑定
// 函数作为类(构造函数, 构造器)时
function Person() {
    console.log(this);  // Person {}
}
new Person()  // new的作用:  (1)在函数内部创建了一个对象  (2)把函数中的this绑定到这个对象上  (3)函数执行  (4)返回这个对象

function Person1(name, age) {
    this.name = name
    this.age = age
    console.log(this);
}
new Person1("www", 15)  // Person1 { name: 'www', age: 15 }
new Person1("wcc", 20)  // Person1 { name: 'wcc', age: 20 }



// 4) 内置函数绑定
setTimeout(function(){
    console.log(this);  // Object [global]  全局变量
},1000)

// 监听器的this来自事件源
let btn = document.querySelector("button")
btn.onclick = function(){
    console.log(this);  // <button>点我</button>  监听器的this来自事件源
}




// this绑定的优先级: 
// 隐式绑定  >  默认绑定
// 显式绑定  >  隐式绑定
// new绑定  >  显式绑定(bind)  new绑定无法与call与apply相比较