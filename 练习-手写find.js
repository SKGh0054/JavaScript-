// 普通find演示:
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let res1 = arr1.find(function (item) {  // find方法 => 返回满足条件的第1个元素
    return item > 6;
});
console.log(res1);  // 7




// 手写find实现:
Array.prototype.myFind = function (fn) {
    for (let i = 0; i < this.length; i++) {
        let res = fn(this[i])
        if (res) {
            return this[i]
        }
    }
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let res = arr1.myFind(function (item) {
    return item > 6;
});
console.log(res);  // 7