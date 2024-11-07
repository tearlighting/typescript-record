import { descriptor, printObj } from "./reflectMetadata";
const classDescriptor = (desc: string) => {
  return function (target: new (...arg: any[]) => object) {
    target.prototype.$classDescrip = desc;
  };
};

const propDescriptor = (desc: string) => {
  return function (target: (new (...arg: []) => object) | object, key: string) {
    let protoAlias: Record<string, any> & {
      $propDescrips: Map<string, string>;
    };
    if (typeof target === "function") {
      protoAlias = target.prototype;
    } else {
      protoAlias = target as any;
    }
    protoAlias.$propDescrips =
      protoAlias.$propDescrips || new Map<string, string>();
    !protoAlias.$propDescrips.has(key) &&
      protoAlias.$propDescrips.set(key, desc);
  };
};

@descriptor("用户")
// @classDescriptor('用户')
class User {
  // @propDescriptor('账号')
  @descriptor("账号")
  name: string;
  // @propDescriptor('密码')
  pwd: string;
  constructor(name, pwd) {
    this.name = name;
    this.pwd = pwd;
  }
  @descriptor("实例")
  static _instance: User;
  static instance() {
    if (!this._instance) {
      this._instance = new User("xxx", "12");
      return this.instance();
    }
    return this._instance;
  }
}

const print = (u: Object) => {
  const proto = Object.getPrototypeOf(u) as {
    $classDescrip: string;
    $propDescrips: Map<string, string>;
  };
  console.log(proto.$propDescrips.keys());
  const name = proto.$classDescrip || Object.getPrototypeOf(u).constructor.name;
  const props = proto.$propDescrips || new Map();
  const res = Object.keys(u)
    .filter((p) => (u as Object).hasOwnProperty(p))
    .map((p) => {
      return `${props.has(p) ? props.get(p) : p}: ${u[p]}`;
    })
    .join(",");
  console.log(`${name}:
                ${res}
        `);
};

const u = new User("xx", "123");
console.log(Object.keys(u.constructor));
// print(u)
printObj(u);

//这样做的缺点, 污染原型
//使用现有库Reflect-metadata

interface A {
  name: string;
}
// let a =1

type MyExclude<T, U extends T> = T extends U ? never : T;

type B = InstanceType<typeof User>;

type FuncParam<T extends (...arg: any[]) => any> = T extends (
  ...arg: (infer R)[]
) => any
  ? R
  : never;
export {};
