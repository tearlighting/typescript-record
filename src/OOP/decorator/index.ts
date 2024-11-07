import "./user";
function d1() {
  console.log("d1");
  return function (target: new (...arg) => object) {
    console.log("d1 deco", target === User);
  };
}
function d2() {
  console.log("d2");
  return function (target: new (...arg) => object) {
    console.log("d2 deco");
  };
}
function m(target: any, propertyKey: string): void {
  false && console.log(target === User, propertyKey, target, typeof target);
}

function f(
  target: any,
  key: string,
  descriptor: PropertyDecorator | TypedPropertyDescriptor<(u: User) => void>,
) {
  false && console.log(target, key, descriptor);
}
// @d1()
// @d2()
class User {
  @m
  userName: string; //3-5个字符
  pwd: string; //匹配规则
  @m
  static prop: string;
  @f
  static validate(u: User) {
    if (u.userName.length > 3 && u.userName.length < 5) {
      //明明是定义的时候最清楚，但却要分开来验证
      //什么功能还没写, 但类里面可能已经多了很多方法
    }
  }
}

export { User };
