// 普通map演示:
let arr1 = [10, 20, 30]
let newArr1 = arr1.map(function (item, index) {  // map函数: 对数组的每一个元素进行操作 并返回一个新数组
    console.log(index, item);
    return item * item
})
console.log(newArr1);  // [ 100, 400, 900 ]


// 手写map实现:
Array.prototype.myMap = function (fn) {  // 将myMap绑定到Array的原型对象上  fn为接收的函数
    let newArray = []
    for (let i = 0; i < this.length; i++) {  // 遍历原数组
        newArray.push(fn(this[i], i))  // 调用传进来的函数后 将return的结果push到新数组中
    }
    return newArray  // 返回一个新数组
}

let arr = [10, 20, 30]
let newArr = arr.myMap(function (item, index) {
    console.log(index, item);
    return item * 2
})
console.log(newArr);  // [ 20, 40, 60 ]