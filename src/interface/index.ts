//约束对象
//#region
interface IUser {
  name: string;
  age: number;
  sayHellow(): void;
}

type TUser = {
  name: string;
  age: number;
  sayHellow: () => void;
};
//#endregion

//约束函数
//#region
type Tcallback<T> = (v: T) =>
  | boolean
  | {
      //定界符
      (v: T): boolean;
    };
interface Icallback<T> {
  //定界符
  (v: T): boolean;
}

function sum<T>(target: T[], callback: Tcallback<T> | Icallback<T>) {
  return target
    .filter((x) => callback(x))
    .reduce((pre, cur, index) => {
      pre = pre || cur;
      if (pre !== cur) {
        pre += cur as any;
      }
      return pre;
    }, null as T);
}

//#endregion

//继承
//#region
interface A {
  a: string;
}
interface B {
  b: number;
}
interface C extends A, B {
  c: boolean;
  // 接口“C”错误扩展接口“A”。
  //  a: number
}

const cInstance: C = {
  a: "a",
  b: 1,
  c: false,
};

type TA = { a: string };
type TB = { b: number };
type TC = {
  c: boolean;
  //交叉成了never
  // a: number
} & TA &
  TB; //交叉类型
const tc: TC = {
  a: "a",
  b: 1,
  c: false,
};
//#endregion

//修饰符
//#region
interface U {
  readonly a: string[];
}

//只读数组
const arr: readonly number[] | ReadonlyArray<number> = [1, 2];
// 类型“readonly number[]”上不存在属性“push”
// arr.push

const u: U = {
  a: ["1"],
};
//只是不能整体赋值
u.a.push("2");
//#endregion

//类型兼容
// 鸭子辨型法
interface Duck {
  sound: "gagaga";
  swin(): void;
}

const getLikeDuck = () => {
  const person = {
    name: "伪装鸭子的人",
    sound: "gagaga" as const,
    swin() {},
  };
  return person;
};

const duck: Duck = getLikeDuck();

//定义会执行严格判断
const duck2: Duck = {
  sound: "gagaga",
  swin: () => {},
  // 对象字面量只能指定已知属性，并且“name”不在类型“Duck”中
  // name
};
interface Icallback2<T> {
  //加了一个index
  (v: T, i: number): boolean;
}
function sum2<T>(target: T[], callback: Icallback2<T>) {
  return target
    .filter((x, i) => callback(x, i))
    .reduce(
      (pre, cur, cI) => {
        pre = pre || cur;
        if (cI) {
          pre += cur as any;
        }
        return pre;
      },
      <T>null,
    );
}
console.log(sum2([1, 2, 3], () => true));
//参数可以少,有返回值的需严格控制，没有可以返回任何值
