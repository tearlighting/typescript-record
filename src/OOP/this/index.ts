// 1.全局调用
//#region
function func() {
  //@ts-ignore
  console.log(this);
}
// func()
const test = {
  func() {
    console.log(this);
  },
};
const f = test.func;
// f()
//#endregion

//Object.func调用
//#region
// test.func()
//#endregion
//箭头函数声明时确定this指向
const func1 = () => {
  // @ts-ignore
  console.log(this);
};

// func1()

test.func = func1;
// test.func()
// func1.call(test)

function func2(this: typeof test) {
  console.log(this);
}
func2.bind(test)();
