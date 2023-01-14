// 普通filter演示:
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let res1 = arr1.filter(function (item) {  // filter方法 => 过滤掉不符合条件的元素
    return item > 6;
});
console.log(res1);  // [ 7, 8, 9, 10 ]




// 手写filter实现:
Array.prototype.myFilter = function (fn) {
    let newArray = []
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            newArray.push(this[i])
        }
    }
    return newArray
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let res = arr1.myFilter(function (item) {
    return item > 6;
});
console.log(res);  // [ 7, 8, 9, 10 ]