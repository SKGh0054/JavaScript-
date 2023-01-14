// 全局代码执行时，就会产生全局的执行上下文，叫Execution Context GLoble ===> ECG

// ECG:全局的执行上下文

// 每当调用一个函数，就产生一个局部的执行上下文，调用100个函数，就产生100个局部的EC. Execution Context ===> EC

// 执行上下文产生，都需要放到一个栈中，这个栈叫执行上下文栈，英文:Execution Context Stack ==> ECS

// 当函数调用完毕，函数的EC就要出栈的，当ECG执行完毕，ECG也要出栈



// EC的作用:给代码提供数据，代码中需要的数据，都从EC 中的找
// JS代码在执行时，会在堆内存中创建一个全局对象，GLobal 0bject GO
// 在浏览器中，这个GO，说白了，就是window
// 但是在node中，这个GO，是一个全局对象 => Object [global]
// console.log(globalThis);
/*
<ref *1> Object [global] {
  global: [Circular *1],
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
    ...
    ...
    ...
*/

// 声明的全局变量和在全局代码中写的函数，都会挂载到GO上
