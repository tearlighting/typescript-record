import { Animal, Lion, Monkey, Tiger } from "./animals";
import { IDraw, IFireShow } from "./interfaces";

const animals: Animal[] = [];
animals.push(new Lion("lion", 3));
animals.push(new Monkey("monkey king", 2));
animals.push(new Tiger("狗", 2));
animals.push(new Tiger("cat", 3));

// 1.打招呼

animals.forEach((a) => a.sayHello());

//2. 会跳火圈的表演

//#region
//两种方法各有千秋
// const hasFireshow = (animal: any): animal is IFireShow=>{
//      if(animal.doubleCircle && animal.singleCircle)
//        return true
//     return false
// }

function isOfType<T>(target: any, ...arg: (keyof T)[]): target is T {
  return arg.every((p) => target[p]);
}

animals.forEach((a) => {
  //back end 可以这样写 a instanceof IFireshow, 但ts编译完了就没了，实现不了
  //使用js方法判断
  // if(hasFireshow(a)){

  // }
  if (isOfType<IFireShow>(a, "doubleCircle", "singleCircle")) {
    a.doubleCircle();
    a.singleCircle();
  }
});

//#endregion

// 3.会画画的画画
animals.forEach((a) => {
  if (isOfType<IDraw>(a, "draw")) {
    a.draw();
  }
});
