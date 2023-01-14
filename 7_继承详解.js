// 不使用继承代码重复，臃肿
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHello = function () { console.log("开始说话..."); }

function Student(name, age, className) {
    this.name = name;
    this.age = age;
    this.className = className;
}
Student.prototype.sayHello = function () { console.log("开始说话..."); }

function Worker(name, age, companyName) {
    this.name = name;
    this.age = age;
    this.companyName = companyName;
}
Worker.prototype.sayHello = function () { console.log("开始说话..."); }



//--------------------------------------------------------------------------------------------------



// 继承一: 原型链继承  =>  改变子类的原型对象
//      核心: Student1.prototype = new Person1()  // 继承父类上的公有属性
//      缺点: 如果在父类上的私有属性存在引用数据类型 且某一个子类改变了该引用数据类型的内部值 就会影响后续创建的子类

function Person1(name, age) {  // 父类
    this.name = name;
    this.age = age;
}
Person1.prototype.sayHello = function () { console.log("开始说话..."); }

function Student1(name, age, className) {  // 子类一
    this.name = name;
    this.age = age;
    this.className = className;
}
// new 一个Person1 里面有name(私有), age(私有), sayHello(公有)
Student1.prototype = new Person1()  // 继承公有属性
Student1.prototype.constructor = Student1  // 手动修改constructor指向

Student1.prototype.study = function () {
    console.log("开始学习...");
}
let std = new Student1("wrj", 18, "1206")
console.log(std);  // Student1 { name: 'wrj', age: 18, className: '1206' }
std.sayHello()  // 开始说话...
std.study()  // 开始学习...





//--------------------------------------------------------------------------------------------------


// 继承二: 组合继承  =>  改变子类的原型对象 & 在子类中改变父类中的this指向
//      核心: Student2.prototype = new Person2()  // 继承父类上的公有属性
//            Person2.call(this, name, age)  // 继承父类上的私有属性
//      缺点: 如果在父类上的私有属性存在引用数据类型 且某一个子类改变了该引用数据类型的内部值 就会影响后续创建的子类
//            Person2.call(this, name, age)  // 会让父类Person2多执行一次

function Person2(name, age) {  // 父类
    this.name = name;
    this.age = age;
}
Person2.prototype.sayHello = function () { console.log("开始说话..."); }

function Student2(name, age, className) {  // 子类一
    Person2.call(this, name, age)  // 改变Person2中this的指向 指向this this就是new出来的对象也就是std2
    this.className = className;
}

Student2.prototype = new Person2()
Student2.prototype.constructor = Student2

let std2 = new Student2("www", 18, "1222");
console.log(std2.name, std2.age, std2.className);




//--------------------------------------------------------------------------------------------------


// 继承三: 寄生组合继承  =>  改变子类的原型对象 & 在子类中改变父类中的this指向 & 使用Object.create(原型对象)方法创建一个对象
//      核心: Student3.prototype = Object.create(Person3.prototype)  // 继承父类上的公有属性
//            Person3.call(this, name, age)  // 继承父类上的私有属性
//      缺点: 如果在父类上的私有属性存在引用数据类型 且某一个子类改变了该引用数据类型的内部值 就会影响后续创建的子类
//            Person3.call(this, name, age)  // 会让父类Person3多执行一次

function Person3(name, age) {  // 父类
    this.name = name;
    this.age = age;
}
Person3.prototype.sayHello = function () { console.log("开始说话..."); }

function Student3(name, age, className) {  // 子类一
    Person3.call(this, name, age)  // 改变Person3中this的指向 指向this this就是new出来的对象也就是std3
    this.className = className;
}

Student3.prototype = Object.create(Person3.prototype)
Student3.prototype.constructor = Student3

let std3 = new Student3("www", 18, "1222");
console.log(std3.name, std3.age, std3.className);



//--------------------------------------------------------------------------------------------------


// 继承四: ES6继承  =>  优雅一致
//      核心: class, extends....

class Person4 {  // 父类
    constructor(names, age) {  // 构造器new这个类的时候会自动的调用构造器，参数也放在构造器中
        this.names = names
        this.age = age
    }
    sayHello() {
        console.log("hello");
    }
}

class Student4 extends Person4 {  // 子类Student4 继承 父类Person4
    constructor(names, age, address) {
        super(names, age)  // 调用父类中的constructor()
        this.address = address
    }
    sayBay() {
        console.log("Bay");
    }
}
let std4 = new Student4("www", 18, "浙江省")
console.log(std4);  // Student4 { names: 'www', age: 18, address: '浙江省' }
std4.sayHello()  // hello
std4.sayBay()  // Bay