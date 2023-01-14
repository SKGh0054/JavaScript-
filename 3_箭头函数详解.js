// 普通函数
let fn = function (num1, num2) {
    console.log(num1);  // 1
    console.log(num2);  // 2
}
fn(1, 2)

// 箭头函数
let fn1 = (num1, num2) => {
    console.log(num1, num2);  // 3 4
}
fn1(3, 4)

// 箭头函数简化:  只有一个参数则括号可以不写没有形参时小括号不能省略
let fn2 = num1 => {
    console.log(num1);  // 5
}
fn2(5)

// 箭头函数简化:  只有一个参数则括号可以不写  &  只有一条return语句或者没有return语句只有一条普通语句大括号也可以不写
let fn3 = num1 => num1 ** 2;
console.log(fn3(6));  // 36

let fn4 = num1 => console.log(num1);
fn4(7)  // 7

// 箭头函数特例:  只有一条return语句且返回的是一个对象可以省略return与大括号但是必须包一层小括号不然对象的大括号会被识别成函数的大括号
let fn5 = num1 => ({ name: num1 + "你好" })
console.log(fn5("WWW"));  // { name: 'WWW你好' }


// 箭头函数中的this
// 箭头函数的this指向于函数作用域所在的对象

// 使用箭头函数注意事项: (1)不可以当作构造函数  (2)不可以使用arguments对象，该对象在函数体内不存在


// 立即执行函数中的this指向window&Object [global] 
(function () {
    console.log(this);
})()