// // 通过JSON实现最简单的深拷贝  缺点: 会忽略方法
// let obj1 = {
//     names: "wrj",
//     age: 20,
//     address: "浙江",
//     arr: [1, 2, 3, 4],
//     sayHello() {
//         console.log("hello");
//     }
// }
// let newObj1 = JSON.parse(JSON.stringify(obj1))  // 会忽略掉方法
// console.log(newObj1);  // { names: 'wrj', age: 20, address: '浙江', arr: [ 1, 2, 3, 4 ] }


// 手写深拷贝deepClone实现: 
function deepClone(target) {
    if (target == null) return target
    if (target instanceof Date) return new Date()
    if (target instanceof RegExp) return new RegExp(target)
    if (typeof target !== "object") return target

    let cloneTarget = new target.constructor // 创建一个对应类型的空对象
    for (let key in target) {  // 遍历原对象的key
        if (Object.hasOwn(target, key)) {  // 判断是否是私有属性 私有属性才克隆
            cloneTarget[key] = deepClone(target[key])  // 递归判断是否为引用数据类型
        }
    }
    return cloneTarget  // 返回该对象
}

let obj = {
    names: "www",
    age: 18,
    address: "上海",
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    sayHello() {
        console.log("hello, world");
    }
}

let newObj = deepClone(obj)
console.log(newObj);