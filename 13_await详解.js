// // await注意点:
// // (1)await必须写在async函数中
// // (2)await后面一般跟的是promise
// // (3)await左侧可以拿到promise成功后的结果, 如果是普通值则该普通值就是promise的结果
// async function foo() {
//     let res = await 123
//     console.log(res);  // 123

//     let res2 = new Promise((reslove, reject) => { reslove("foo成功了") })
//     console.log(res2);  // Promise { 'foo成功了' }
// }
// foo()

// await简单使用:
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("fn成功")
        }, 2000)
    })
}
async function fn_() {
    // 1.await前面是成功结果
    // 2.await后面是promise
    // 3.await下面的代码相当于.then

    let res = await fn()
    console.log(res);  // fn成功

    let res1 = await fn()
    console.log(res1);  // fn成功
}
fn_()

// await与try...catch配合使用
function fn1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("fn1成功")
            reject("fn1失败")
        }, 2000)
    })
}
async function fn1_() {
    try {  // 使用try...catch拿到失败结果
        let res = await fn1()
        console.log(res);
    } catch (err) {
        console.log(err);  // fn1失败
    }
}
fn1_()
