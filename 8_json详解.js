// 序列化  ==>  把obj对象转成JSON串之后，再存储，这个过程，叫序列化
let obj = {
    names: "wrj",
    age: 20,
    address: "浙江"
}

let jsonStr = JSON.stringify(obj)
console.log(jsonStr);  // {"names":"wrj","age":20,"address":"浙江"}
console.log(typeof (jsonStr));  // string
window.localStorage.setItem("obj", obj)  // 向浏览器内存储数据 window.localStorage只能存储字符串


// 反序列化  ==>  拿到数据后，把JSON串转为js对象，叫序列化
let jsonStr2 = window.localStorage.getItem("obj")
console.log(typeof (jsonStr2)); // String
console.log(jsonStr2);  // {"names":"wrj","age":20,"address":"浙江"}

let js_obj = JSON.parse(jsonStr2)
console.log(js_obj);



// 通过JSON实现最简单的深拷贝  缺点: 会忽略方法
let obj1 = {
    names: "wrj",
    age: 20,
    address: "浙江",
    arr: [1, 2, 3, 4],
    sayHello() {
        console.log("hello");
    }
}
let newObj1 = JSON.parse(JSON.stringify(obj1))  // 会忽略掉方法
console.log(newObj1);  // { names: 'wrj', age: 20, address: '浙江', arr: [ 1, 2, 3, 4 ] }





// 浏览器StorageAPI

// 一、Local Storage  本地永久存储  没有时间限制的数据存储，第二天、第二周或一年之后，数据依然可用。
window.localStorage.setItem("key", "value")  // 存储变量名为key，值为value的变量
window.localStorage.getItem("key")  // 获取存储的变量key的值
window.localStorage.removeItem("key")  // 删除变量名为key的存储变量
window.localStorage.clear()  // 删除所有保存的数据
window.localStorage.key = "value"  // 不常用 存储变量名为key，值为value的变量

// 二、Session Storage  会话期内存储  针对一个session的数据存储，当用户关闭浏览器窗口后，数据会被删除。
window.sessionStorage.setItem("key", "value")  // 存储变量名为key，值为value的变量
window.sessionStorage.getItem("key")  // 获取存储的变量key的值
window.sessionStorage.removeItem("key")  // 删除变量名为key的存储变量
window.sessionStorage.clear()  // 删除所有保存的数据
window.sessionStorage.key = "value"  // 不常用 存储变量名为key，值为value的变量

// 三、cookie
// cookie是客户端与服务器端进行会话使用的一个能够在浏览器本地化存储的技术。
// 简言之，cookie是服务器端发给客户端的文本文件；目的是用于辨别用户身份。


// 1.cookie机制：
// 由浏览器所提供，将documen对象的cookie属性提供给JavaScript. 
// 可由JavaScript对其进行控制，但并不是JavaScript本身的性质。
// Cookie是存于硬盘的一个文件，通常对应于一个域名，当浏览器再次访问这个域名时，便使这个cookie可用。
// (cookie可以跨越一个域名下的多个网页，但不能跨越多个域名使用)，可作为全局变量。

