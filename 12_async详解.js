// // async 是一个关键字 用来声明一个函数是异步函数
// // 一个异步函数的返回值不论如何就是一个promise

// async function fn() {
//     console.log("fn~~~");
// }
// console.log(fn());  // Promise {<fulfilled>: undefined}  成功的promise

// // 一、异步函数的多种声明方式:
// // 第一种: 函数声明
// async function fn1() {
//     console.log("fn1~~~");
// }
// console.log(fn1());  // Promise {<fulfilled>: undefined}  成功的promise
// // 第二种: 变量声明
// let fn2 = async function () {
//     console.log("fn2~~~");
// }
// console.log(fn2());  // Promise {<fulfilled>: undefined}  成功的promise
// // 第三种: 箭头函数
// let fn3 = async () => {
//     console.log("fn3~~~");
// }
// console.log(fn3());  // Promise {<fulfilled>: undefined}  成功的promise
// // 第四种: 类中的函数
// class Fn {
//     async fn4() {
//         console.log("fn4~~~");
//     }
// }
// let fn4 = new Fn()
// console.log(fn4.fn4());  // Promise {<fulfilled>: undefined}  成功的promise
// // 第五种: 对象中的方法
// let obj = {
//     async fn5() {
//         console.log("fn5~~~");
//     }
// }
// console.log(obj.fn5());  // Promise {<fulfilled>: undefined}  成功的promise



// 二、异步函数的返回值:
// (1)异步函数可以有返回值, 但是不管返回什么普通值, 都会包裹在Pormise.resolve中
async function foo() { return 666 }
console.log(foo().then((res) => { console.log(res); }));  // 666

// 如果异步函数自己返回了promise, 得到的Promies状态由这个promise决定
async function foo1() { return Promise.resolve("成功") }
console.log(foo1().then(res => { console.log(res); }));  // 成功

// 如果我们异步函数返回值是一个对象并且实现thenable, 得到的Promies状态由then方法中做了什么才能决定
async function foo2() { return { then(resolve, reject) { reject("失败") } } }
console.log(foo2().then(res => { console.log(res); }).catch(err => { console.log(err); }));  // 失败

// 如果在async函数中抛出一个错误, 得到的promise是一个失败的promsie
async function foo3() { return new Error("失败了-有错误") }
console.log(foo3().then(res => { console.log(res); }).catch(err => { console.log(err); }));  // Error: 失败了-有错误
