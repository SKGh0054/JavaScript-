// 在ES6中, 提供一个类, Promise
// 在new Promise 时需要传入一个执行器, 执行器是立刻执行的
// 刚刚创建出来的Promise处于等待状态
// 执行器有两个参数 resolve & reject
// resolve是一个函数 调用此函数可以把等待的Promise变成 成功的Promise
// reject是一个函数 调用此函数可以把等待的Promise变成 失败的Promise

// 一般都在执行器中写异步代码
let p = new Promise((resolve, reject) => {
    console.log("hello Promise...");
})
console.log(p);  // Promise { <pending> }  // padding=>等待




// Promise只能从 等待=>成功 或者 等待=>失败
// 失败了就不能成功了, 成功了就不能失败了


// 1.成功:
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("成功-终值")
        console.log(p1);  // Promise {<fulfilled>: '成功-终值'}
    }, 3000)
})


// 2.失败:
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("失败-拒因")
        console.log(p2);  // Promise {<rejected>: '失败-拒因'}
    }, 3000)
})




//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------



// Promise的简单使用
function execCode(counter) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (counter > 0) {
                let t = 0
                for (let i = 0; i < counter; i++) {
                    t += i
                }
                // 成功的结果t
                resolve(t)
            } else {
                reject(`输入${counter}有误`)
            }
        }, 3000)
    })
    return promise
}

// promise是一个对象对象中有一个方法, 叫then
// 通过then方法, 就可以得到成功的或失败的结果then需要传递两个回调函数
// 如果promise成功了, 调用第1个回调函数
// 如果promise失败了, 调用第2个回调函数
// 调第1个, 这个回调函数的参数, 就是成功的结果
// 调第2个, 这个回调函数的参数, 就是失败的结果

let promise = execCode(-100)
promise.then((resolve_value) => {
    console.log("成功的结果: " + resolve_value);  // 成功的结果: 4950
}, (reject_reason) => {
    console.log("失败的原因: " + reject_reason);  // 失败的原因: 输入-100有误
})




//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------



// Promise中resolve的实参
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("promise1_成功!")
        // reject("promise1_失败!")
    }, 2000)
})
let promise2 = new Promise((resolve, reject) => {
    // (1) resolve, reject参数可以是基本数据类型也可以是引用数据类型
    // resolve({})

    // (2) resolve, reject参数可以是promise
    // resolve(promise1)  // promise2的成功与否取决于promise1的成功与否

    // (3) resolve, reject参数可以是 thenable => 是一个对象,该对象中有一个then函数 格式如下
    resolve({
        then(resolve, reject) {  // promise2的成功与否取决于该thenable的成功与否
            resolve("成功")
            reject("失败")
        }
    })
})
promise2.then(res => {
    console.log("终值:" + res);
}, err => {
    console.log("拒因:" + err);
})




//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------



// Promise中then的返回值
let promise3 = new Promise((resolve, reject) => {
    resolve("成功")
})
let promise3_return = promise3.then(res1 => {
    console.log("res1" + res1);
}, err1 => {
    console.log("err1" + err1);
})
// then返回一个新的promise, 与之前的promise无关！！！
console.log(Object.prototype.toString.call(promise3_return));  // [object Promise]
// 只要是promise就可以then
promise3.then(res2 => {
    console.log("res2" + res2);
    // (1)如果返回一个普通值, 新的promise就是一个成功的promise
    return 666  // 返回的普通值，就是新的promise的终值 如果什么也不返回 就是返回undefined 也是成功的 undefined就是新的promise的终值

    // (2)如果返回一个promise, 新的promise取决与该返回的promise成功与否
    // return new Promise((resolve, reject) = {reject("www")})

    // (3)如果返回一个thenable, 新的promise取决与该thenable中then方法的成功与否
    // reutrn { then(resolve, reject){ resolve("aaa") } }

    // (4)如果抛出了一个错误, 新的promise就是一个失败的promise
    // throw new Error("一个错误")
}, err2 => {
    console.log("err2" + err2);
}).then(res3 => {
    console.log("res3" + res3);
}, err3 => {
    console.log("err3" + err3);
})





//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------



// Promise中then的顺延
let promise4 = new Promise((resolve, reject) => {
    resolve("成功")
})
promise4.then(res1 => {
    console.log("res1" + res1);
    return 666
}, err1 => {
    console.log("err1" + err1);
}).then(null, err2 => {
    console.log("err2" + err2);
}).then(null, err3 => {
    console.log("err3" + err3);
}).then(res4 => {
    // 不管多少个then, 只要上面没有处理都可以往后面延续下去 => then的顺延
    console.log("res4" + res4);
}, err4 => {
    console.log("err4" + err4);
})

// then顺延的语法糖catch
// then:
let promise5 = new Promise((resolve, reject) => {
    reject("失败")
})
promise5.then(res => {  // 第二个参数可以不写, 写一个默认成功
    console.log("res: " + res);
}).then(null, err => {  // 第一个参数不可以省略
    console.log("err: " + err);
})
// catch: 
promise5.then(res => {  // 一般来说then中只写成功
    console.log("res: " + res);
}).catch(err => {  // catch语法糖最后捕获失败
    console.log("err: " + err);
})





//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------



// Promise-ES9中新增finally方法 ==> 不论成功还是失败都会执行
let promise6 = new Promise((resolve, reject) => {
    resolve("成功")
})
promise6.then(res => {
    console.log("res: " + res);
}).catch(err => {
    console.log("err" + err);
}).finally((final) => {
    console.log("不论如何都会执行" + final);  // 不论如何都会执行undefined
})



//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------




// Promise中的静态方法

// (1) resolve() 方法
let promise7 = Promise.resolve("成功")  // 直接创建一个成功的promise
promise7.then(res => {
    console.log("res: " + res);
}).catch(err => {
    console.log("err: " + err);
})

// (2) reject() 方法
let promise8 = Promise.reject("失败")  // 直接创建一个失败promise
promise8.then(res => {
    console.log("res: " + res);
}).catch(err => {
    console.log("err: " + err);
})

// (3) all() 方法
let pp1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 2000)
})
let pp2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 2000)
})
let pp3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("成功")
        // reject("失败")
    }, 1000)
})
// all表示所有的promise都成功后，得到所有的promise成功的结果  [ '成功', '成功', '成功' ]
// 如果有一个先失败，直接得到最先失败的promise的结果  失败
Promise.all([pp1, pp2, pp3]).then(res => {  // all方法参数为一个数组 传入一数组的promise
    console.log(res);
}).catch(err => {
    console.log(err);
})

// (4) allSettled() 方法
let pp4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 2000)
})
let pp5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 2000)
})
let pp6 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("成功")
        // reject("失败")
    }, 1000)
})
// allSettled()方法 ==> 得到数组所有promise的结果不管成功还是失败
Promise.allSettled([pp4, pp5, pp6]).then(res => {  // allSettled方法参数为一个数组 传入一数组的promise
    console.log(res);
}).catch(err => {
    console.log(err);
})
/*
    [
        { status: 'rejected', reason: '失败' },
        { status: 'rejected', reason: '失败' },
        { status: 'fulfilled', value: '成功' }
    ]
*/

// (5) race() 方法
let pp7 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 1500)
})
let pp8 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 2000)
})
let pp9 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("成功")
        // reject("失败")
    }, 1000)
})
// race()方法 ==> 获取第一个执行完毕的promise 不论该promise是成功还是失败
Promise.race([pp7, pp8, pp9]).then(res => {  // rcae方法参数为一个数组 传入一数组的promise
    console.log(res);
}).catch(err => {
    console.log(err);
})

// (6) any() 方法
let pp10 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 1500)
})
let pp11 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 2000)
})
let pp12 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("成功")
        reject("失败")
    }, 1000)
})
// any()方法 ==> (1)获取第一个执行完毕 且 成功的promise   (2)如果全部promise都失败了就获取到所有promise都失败的信息
Promise.any([pp10, pp11, pp12]).then(res => {  // any方法参数为一个数组 传入一数组的promise
    console.log(res);
}).catch(err => {
    console.log(err);
    /*
        [AggregateError: All promises were rejected] {
            [errors]: [ '失败', '失败', '失败' ]
        }
    */
})