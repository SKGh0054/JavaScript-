// 得到伪数组  伪数组不是数组  而是对象
// 真数组: ["a", "b", "c"]    伪数组: { 0: "a", 1: "b", 2: "c" }
// let li_arr = document.getElementsByTagName("li")
// console.log(Array.isArray(li_arr));  // false

// 一个真实的DOM元素, 本质就是一个对象
// 这个对象中的属性非常多, 操作这个对象, 性能就非常低
// jQuery死了, jQuery操作的是原生的DOM元素, 操作DOM元素性能就低
// vue react操作的是虚拟DOM元素, 虚拟DOM中的属性少，性能就好




// 创建对象方法
// 一、使用字面量创建多个对象  缺点:  重复创建空间造成内存浪费且不直观
let obj1_0 = { names: "www" }
let obj1_1 = { names: "why" }
let obj1_2 = { names: "wrj" }

// 二、使用工厂函数创建多个对象  缺点:  多个属于Object对象的实例，内存浪费且不直观
function Fn(names, age, address) {
    let p = {}
    p.names = names
    p.age = age
    p.address = address
    return p
}
let obj2_0 = Fn("www", 18, "北京")
let obj2_1 = Fn("why", 15, "上海")
let obj2_2 = Fn("wrj", 20, "浙江")

// 三、使用构造函数(构造器)创建多个对象  缺点:  多个属于Person对象的实例，内存浪费且不直观
function Person(names, age, address) {
    this.names = names
    this.age = age
    this.address = address
}
let obj3_0 = new Person("www", 18, "北京")
let obj3_1 = new Person("why", 15, "上海")
let obj3_2 = new Person("wrj", 20, "浙江")

// 四、使用原型对象创建多个对象
function Person(names, age, address) {
    this.names = names
    this.age = age
    this.address = address
}
Person.prototype.running = function () {
    console.log(`姓名:${this.names}, 年龄:${this.age}, 地址:${this.address}.`);
}
let obj4_0 = new Person("www", 18, "北京")
let obj4_1 = new Person("why", 15, "上海")
let obj4_2 = new Person("wrj", 20, "浙江")

// this为隐式绑定
obj4_0.running()  // 姓名:www, 年龄:18, 地址:北京.
obj4_1.running()  // 姓名:why, 年龄:15, 地址:上海.
obj4_2.running()  // 姓名:wrj, 年龄:20, 地址:浙江.