// 普通call演示:
let obj1 = { names: "wer", age: 19 }
function foo() {
    console.log(this);
}
foo()  // Object [global]
foo.call(obj1)  // { names: 'wer', age: 19 }



// 手写call实现:
(function () {  // 立即执行函数 执行myCall
    function myCall(context, ...args) {
        context = context ? Object(context) : globalThis  // 判断context是否有值如果没有就将全局变量赋给context
        context.f = this  // 将this赋给context中的f属性 此时谁调用了this, this就指向谁, 如果context为空则将globalThis赋给this
        let res = context.f(...args)  // 隐式绑定
        delete context.f  // 将绑定在context上的f属性删除
        return res
    }
    Function.prototype.myCall = myCall  // 将myCall挂载到Function的原型对象上  这样所有函数都可以调用了
})()
function fn(num1, num2) {
    console.log("函数this指向:  " + this);
    return num1 + num2
}
let obj = {
    names: "www",
    age: 18
}

fn(1, 2)              // 函数this指向:  [object global]
fn.myCall(obj, 3, 4)  // 函数this指向:  [object Object]