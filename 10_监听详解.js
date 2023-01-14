// let obj = {
//     name: "wc",
//     age: 18,
//     address: { city: "bj" }
// };
// Object.keys(obj).forEach(key => {
//     let value = obj[key];
//     Object.defineProperty(obj, key, {
//         get() {
//             console.log(`监听到了obj对象的${key}属性被访问了`);
//             return value;
//         },
//         set(val) {
//             console.log(`监听到了obj对象的${key}属性被设置了==>${val}`);
//             value = val;
//         }
//     })
// })
// console.log(obj.address.city);

// 上面监听属性的不足：
//   1）Object.defineProperty 初衷是用来定义一个对象上的属性，并不是监听对象中的属性
//   2）如果是对象的非常复杂，嵌套的非常深，你需要递归进行尝试侦听，性能非常差
//   3）有的操作是监听不了的，只能监听到get和set，其它操作监听不了，如：删除操作，添加操作....



// 在ES6中，出现了一个叫Proxy的东西，功能非常强大
// Proxy类 目前共有13种监听器  MDN文档 ==> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
let obj1 = {
    names: "www",
    age: 18
}
// new 一个Proxy 得到一个代理对象  =>  new Proxy(原始对象, {配置项})
// obj1: 原始对象
let objProxy = new Proxy(obj1, {
    // 访问属性时走get => 获取值时的捕获器
    get(target, key) {  // target => 原始对象; key => 键
        console.log(`监听到obj对象的${key}属性被访问了`, target);
        return target[key]
    },

    // 设置属性时走set => 设置值时的捕获器
    set(target, key, newValue) {  // newValue => 新值
        console.log(`监听到obj对象的${key}属性被设置了`, target, newValue);
        target[key] = newValue  // 不会爆栈
    },

    // 删除属性时走deleteProperty => 删除属性时的捕获器
    deleteProperty(target, key) {
        console.log(`监听到obj对象的${key}属性被删除了`, target);
    },

    // in判断属性时走has => 监听in的捕获器
    has(target, key) {
        return key in target
    }
})

console.log(objProxy.names);  // 监听到obj对象的names属性被访问了 { names: 'www', age: 18 }        www
console.log(objProxy.age = 19);  // 监听到obj对象的age属性被设置了 { names: 'www', age: 18 }  19   19