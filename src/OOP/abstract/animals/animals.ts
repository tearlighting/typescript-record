import { IDraw, IFireShow } from "./interfaces";
enum EAnimals {
  Lion = "狮子",
  Tiger = "泰哥",
  Monkey = "king",
}
// 1.动物们具有相同的属性，可以抽象出一个抽象类

abstract class Animal {
  //种类强约束，子类必须实现
  abstract type: EAnimals;
  constructor(
    public name: string,
    public age: number,
  ) {}
  sayHello() {
    console.log(
      `my Name is ${this.name}, ${this.age} years old.i am a ${this.type}`,
    );
  }
}
const fireShow: IFireShow = {
  singleCircle() {
    console.log(`${this.name} can cross single circle`);
  },
  doubleCircle(): void {
    console.log(`${this.name} can cross double circle`);
  },
};

//2. 实现能力
class Lion extends Animal implements IFireShow {
  singleCircle(): void {
    console.log(`${this.name} can cross single circle`);
  }
  doubleCircle(): void {
    console.log(`${this.name} can cross double circle`);
  }
  type = EAnimals.Lion;
  //  constructor(name: string, age: number, public type = EAnimals.Lion){
  //     super(name,age)
  //  }
}

class Monkey extends Animal implements IFireShow, IDraw {
  type: EAnimals = EAnimals.Monkey;
  singleCircle(): void {
    console.log(`${this.name} can cross single circle`);
  }
  doubleCircle(): void {
    console.log(`${this.name} can cross double circle`);
  }
  draw(): void {
    console.log(`${this.name} can draw`);
  }
}

class Tiger extends Animal implements IFireShow {
  type: EAnimals = EAnimals.Tiger;
  singleCircle = fireShow.singleCircle;
  doubleCircle = fireShow.doubleCircle;
}

export { Tiger, Monkey, Lion, Animal };
