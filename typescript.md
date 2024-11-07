# typescript js 的超集,强类型限定

## 1. 安装

    npm i typescript -g
    tsc -v

## 2. 默认假设

    1. 假设当前环境是 dom
    2. 如果没有 import/export,默认全局执行
    3. 编译目标是 ES3

## 3. 配置文件 tsconfig.json 直接创建/tsc -init

```json
{
  //编译配置
  "compilerOptions": {
    //目标 es7
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    //使用模块 commonjs/esnext
    "module": "commonjs" /* Specify what module code is generated. */,
    //使用库 这里面是ts自带的,如果想要安装,npm i @types/node.
    //也就是说也会自动读取node_modules/@type
    "lib": ["ES2016"] /* Specify a set of bundled library declaration files that describe the target runtime environment. */,
    //指定node_modules/@type下的package,不需要引用
    "types": ["node"] /* Specify type package names to be included without being referenced in a source file. */,
    //出口函数 默认./
    "outDir": "dist" /* Specify an output folder for all emitted files. */,
    "strictNullChecks": true /* When type checking, take into account 'null' and 'undefined'. */,
    //移出注释
    "removeComments": true,
    //非ES6模块使用与ES6模块交互(加一个default)
    "esModuleInterop": true,
    //报错不编译
    "noEmitOnError": true,
    //模块解析模式
    "moduleResolution": "node10",
    "experimentalDecorators": true /* Enable experimental support for legacy experimental decorators. */,
    //将ts的类型,通过metadata的方法注入到js  __metadata("design:type", String)
    "emitDecoratorMetadata": true /* Emit design-type metadata for decorated declarations in source files. */,
    //设置声明文件位置,设置之后，默认的node_modules/@types，"include":["./src"],下面的声明文件失效
    "typeRoots": [] /* Specify multiple folders that act like './node_modules/@types'. */
  },
  //只编译./src下面ts文件   **默认编译该项目下所有ts文件**
  "include": ["./src"],
  //手动确定要编译的入口函数
  "files": ["./src/index.ts"]
}
```

**注:使用配置文件后,直接 tsc,不能加文件名,否则会忽略配置文件**

## 4. 简化开发流程（热更新）

    1. 编译程序
       ts-node 将 ts 编译在内存中,同时完成运行
       npm i ts-node -g
       ts-node src/index.ts 会按照 tsconfig 执行
       但是不可能每次更改还要敲一次命令
    2. 检测文件更新
       nodemon 检测
       npm i nodemon -g
       nodemon --exec ts-node src/index.ts 变化就编译
       nodemon --watch src //src 目录 -e ts //只检测 ts 变化 --exec ts-node src/index.ts **太长了**

       通过脚本运行
       "script":{
       "dev": nodemon --watch src -e ts --exec ts-node src/index.ts
       }
       npm run dev

## 5. 类型约束

ts 是一个**可选的** **静态**类型系统
约束: **变量 参数 返回值**

**类型推断**

```ts
let a = 1
```

#### 基本类型

`number`
`string`
`boolean`
`Array/[]`
`Object`
`null`
`undefined`
**注: null 和 undefined 是所有类型的子集**
如果不想 let a:string = null
"strictNullChecks": true, /_ When type checking, take into account 'null' and 'undefined'. _/ ## 其他常用类型

#### 联合类型 | insection

#### void 函数无返回值

#### never 函数永远无法结束 never[]

字面量类型 你常用的 ArrayKey type ArrayKey<T extends any[]> = T extends Array<infer R>? R : never
Tuple 元组 [1,2]
any: 绕过类型约束
**类型保护**
let a:number|string
if(typeof a !== 'number')
ts 可以知道 a 的类型为 string ## 2. ## 函数相关约束
**函数重载**: 多种情况的声明 可以避免一些联合类型不必要的组合
function combine(a: string,b: string)
function combine(a: number,b: number)
function combine(a: number|string,,b: number|string)
**可选参数**
function combine(a: string,b?: string) 3. ## 扩展类型

        1.  ## 类型别名 type A = {}
        2.  ## **枚举** 约束变量的取值范围

            ## why

               <code>
                  type Gender = "男"|"女"
                  type User = {
                     gender: Gender
                  }
                  let user:User = {
                     gender: "男"
                  }
                  const setGender = (g: Gender)=>{
                     user.gender = g
                  }
                  setGender("女")

                  type Gender ==> "male"|"female" 逻辑没有变,但值变了

               </code>

            1)  逻辑与值混淆,会产生大量修改

            2)  不会进入编译结果 console.log(Gender). 想想你的ArrayKey
            ## 使用方法
               enum Gender{
                  male = "男",
                  female = "女"
               }
            ## 规则
             1. 字段值可以是string|number
             2. 数字枚举会自动自增,默认为0
             3. **被数字枚举约束的对象可以赋值成数字**
                  enum Gender{
                        male ,
                        female
                  }
                  const a: Gender = Gender.female || 1
             4. **数字枚举和字符串枚举编译结果不同**
                 字符串枚举
                     var Gender;
                     (function (Gender) {
                        Gender["male"] = "\u7537";
                        Gender["female"] = "\u5973";
                     })(Gender || (Gender = {}));
                     <==>
                      {
                        male:'',
                        female:''
                     }
                  数字枚举:
                    var Gender;
                     (function (Gender) {
                        Gender[Gender["male"] = 0] = "male";
                        Gender[Gender["female"] = 1] = "female";
                     })(Gender || (Gender = {}));
                     <==>
                     {
                        male:0,
                        female:1,
                        0:male,
                        1:female
                     }

            ## 实践

            尽量不要在一个枚举中同时出现 string number
            尽量使用逻辑名而非值

            ## 位枚举

            详见 access

        3.  ## interface 用于约束类, 对象,函数的标准

            ## 详见 src interface 在约束对象，函数与 type 无本质区别

            ## 继承与交叉类型

            接口继承不能覆盖
            交叉类型会交叉
            interface A { a: string }
            interface B { b: number }
            interface C extends A,B{
            c: boolean,
            // 接口“C”错误扩展接口“A”。
            // a: number
            }

            let cInstance:C = {
            a:'a',
            b:1,
            c:false
            }

            type TA = {a: string}
            type TB = {b: number}
            type TC = {
            c:boolean
            //交叉成了 never
            // a: number
            } & TA & TB //交叉类型
            let tc:TC ={
            a:'a',
            b:1,
            c:false
            }

            ## 修饰符

            ## readonly

            ## 类型兼容

            鸭子辨型法(子结构辨型法): 目标只要满足该特征
            基本类型 完全匹配
            对象 类型兼容 鸭子辨型法 **定义会执行严格判断,赋值子结构满足**
            函数 无比自然 参数可以少 [].forEach((v,i)=>{}) 想用几个用几个
            返回值 有返回值严格约束;无返回值随意 [].forEach((v,i)=>v)

        4.  ## class 类本质就是函数

            ## 属性

                  使用属性列表来描述类中属性
                 **strictPropertyInitialization:true** 严格继承

            ## 初始化

                 ## 位置
                    constructor
                    gender: Gender = Gender.male 属性默认值
                 ## 修饰符
                    readonly

                    public
                    private
                    protected

                    简写 constructor(public name: string, public age: number,id?: string)
                 ## 访问器 用函数 控制属性的读取与修改
                    get set

        5.  ## 泛型
            相当于类型变量

    4.  ## 模块化 建议使用 module:ES6

        1. ES6
           编译结果无差别
        2. Commonjs module:Commonjs
           编译结果:

           ```ts
           //exports.__esModule = true
           Object.defineProperty(exports, "__esModule", { value: true });
           moulde.exports = {
           //默认导出变成 default
           default:xxx,
           }

           **当导入非 ES 模块,但想使用默认导入"esModuleInterop": true**
           var __importDefault = (this && this.__importDefault) || function (mod) {
           return (mod && mod.__esModule) ? mod : { "default": mod };
           };
           Object.defineProperty(exports, "**esModule", { value: true });
           const fs_1 = \_\_importDefault(require("fs"));
            fs_1.default.readFileSync;
           ```

        3. **Ts 中的 Commonjs**
           不要使用 module.exports = {} 无法获得类型检查
           使用 export = {}
           如果使用了 esModuleInterop": true，就照常导入
           或 import xxx = require("xxx")

        4. **解析策略** "moduleResolution": "node",
           相对路径
            先找 index.ts
           再看 package.json 下面的 mian,有的话就找路径下的 main
           非相对路径
           node_modules

6.  ## 进阶

    1.  ## 面向对象 OOP Oriented(基于) Object **思维**
        面向过程: 以功能流程为思考切入点，不适合大型应用
        函数式: 以数学思考为切入点(碰撞 位移) （有点兴趣）
        面向对象: 以划分类为切入点 类是最小的功能单元
    2.  ## 类的继承 类的关系

        ```puml
        @startuml
           Tank <|-- PlayerTank
           Tank <|-- EnemyTank

        @enduml
        ```

        ## 特点

             ## override 重写: 子类可以重写父类(属性/方法),但不能改类型
             ## this是的动态: 子类调用父类方法,this是子类
             ## super: 调用父元素成员(这里的this还是动态的)
             ## 类型匹配: 父类 = 子类 鸭子辨型
                       面向对象中 里氏替换原则
                       使用 **instanceof** 判断具体子类类型
             ##  protected:只能在自己和子类中访问
             ##  **单根性和传递性**

    3.  ## 抽象类 abstract 抽象的概念, 实际中没用, 所以不能创建

        ## 抽象成员 子类中必须实现

        ## 设计思维 -- 模板模式

        流程一致 但部分逻辑不一致

        ```
                    abstract class Chess{
                       //父类并不知道name,子类必须赋值
                       abstract readonly name: string
                       move(){

                       }
                       protected overScreen(){
                          console.log("边界判断");
                          return true
                       }

                       protected hasMyChess(){
                          console.log("是否有我方棋子")
                          return true
                       }

                       abstract rule(): boolean


                    }

                    class soldier extends Chess{
                       name: string = '兵';
                       move(): void {
                             // 重复
                             this.overScreen() && this.hasMyChess() && this.rule()
                       }
                       rule(): boolean {
                             return true
                       }
                    }
                    class king extends Chess{
                       get name(){
                          return '帅'
                       }
                       move(): void {
                          // 重复
                          this.overScreen() && this.hasMyChess() && this.rule()
                       }
                       rule(): boolean {
                          return true
                       }
                    }
        ```

        改为
        将不一致的定义为抽象方法,父类参照流程调用

        ```
              abstract class Chess{
                    //父类并不知道name,子类必须赋值
                    abstract readonly name: string
                    move(){
                       this.overScreen() && this.hasMyChess() && this.rule()
                    }
                    protected overScreen(){
                       console.log("边界判断");
                       return true
                    }

                    protected hasMyChess(){
                       console.log("是否有我方棋子")
                       return true
                    }

                    abstract rule(): boolean


               }
        ```

    4.  ## 静态成员 附着在类上的成员(属于某个构造函数的成员)

        实例成员: 对象成员，属于实例对象
        静态成员：非实例成员，属于类
        **this**
        实例 this ： 实例对象
        静态方法 this: 当前类
        **单例模式**

        ````c
           class HttpHelper{
                    get(){

                    }
                    post(){

                    }

                    private constructor(){

                    }
                    private static _instance?:HttpHelper
                    static  get instantce(){
                       if(!this._instance){
                          this._instance = new HttpHelper()
                       }
                       return this._instance
                    }

              }
           ```
        ````

    5.  ## 接口与类

        OOP 中, 类可以 implements 接口, 表示某类是否具有某种**能力**

        例: 有一个马戏团，有老虎，狮子，猴子。这些动物都有名字，年龄，种类，还有一个共同方法自我介绍;
        他们有着不同的能力，老虎，狮子可以跳火圈，盒子可以画画, 且这些能力可以通过训练改变。

             1. 实现所有动物打招呼
             2. 会跳火圈的表演跳火圈
             3. 会画画的表演画画

             实现见代码

        **类型保护**

        ```
              function isOfType<T>(target: any,...arg: (keyof T)[]):target is T{
                    return arg.every(p=>target[p])
              }
        ```

    6.  ## 索引器

        ```
           interface B{

           }
           interface C extends B{
              c:''
           }
           interface A{
                 b:"B"
                 [k: string]: B
                 [k: number]: C
                 a:""
           }
        ```

        虽然索引可以是 string|number,但是**js 中索引全部是 string,number 会被转成 string**
        所以当出现两个索引器的时候,C 一定是 B 的子类,鸭子辨型法

        类中的索引必须再最上面,interface 无所谓
        class CC{
        // a = "1"
        [prop: string]:string
        a = "1"
        }

    7.  ## this 指向 "noImplicitThis": true /\* Enable error reporting when 'this' is given the type 'any'.

        1. 大部分时间, 取决于调用方式
           1. 全局调用 func() this 指向 global/window 或者 undefined //为什么 undefined? es6 的严格模式导致的
           2. Object.func() this 指向 Object
           3. dom 事件指向处理对象
        2. 特殊
           1. ()=>{} 声明时确定指向，指向当前位置
           2. bind,call,apply 手动绑定
           3. 静态函数的 this 指向类(构造函数)

        front end 是灵活的，自由的，我不想每次 this 都@ts-ignore!
        **ts 可以指定 this 指向**

        ```ts
        function func2(this: typeof test) {
          console.log(this)
        }
        func2.bind(test)()
        ```

    8.  ## 装饰器 decorator 本质就是函数 添加附加信息(meta data,描述数据的数据)

        ## 原因

              关注点分离
              代码重复
             **js中的装饰器就是一个函数, 参与运行**

        1. ## 类装饰器 (target: new (...arg)=>object) 类/构造函数本身

           1. 调用时间
              定义之后直接调用 函数会重上往下运行，但是\_decorate 里面的遍历是倒着的，所以装饰器是从下往上

              ```ts
                 function d1(){
                    console.log("d1");
                    return function (target: new (...arg)=>object){
                       console.log('d1 deco');
                    }
                 }
                 function d2(){
                    console.log("d2");
                    return function (target: new (...arg)=>object){
                       console.log('d2 deco');
                    }
                 }
                 @d1()
                 @d2()
                 class A{

                 }

                 =>
                 let A = class A{}
                 _decorate([
                    //装饰器数组
                    d1()
                    d2()
                 ],A)
              ```

           2. 返回值
              void 运行函数
              类 替换 但不建议用 类型检查会出问题

        2. ## 成员装饰器

           2. ## 属性 (target: new (...arg)=>object|prototype,key: string)
              target: 静态成员 new (...arg)=>object; 实例成员 类的 prototype 对象
           3. ## 方法 (target: new (...arg)=>object|prototype,key: string,target:any,key: string,descriptor: PropertyDecorator)
              descriptor: 属性描述符
              value: [Function: validate],
              writable: true,
              enumerable: false,
              configurable: true
           4. ## 参数 依赖注入

              ```ts
              class A {
                sum(a: number, @test b: number) {
                  return a + b
                }
              }
              function test(
                target: new (...arg) => object | prototype,
                key: string, //函数名
                index: number
              ) {}
              ```

    9.  ## 类型推演

        1. typeof 类的时候, 是返回类的构造函数
           ```ts
           class User {
             name: string
           }
           function creataUser(cls: typeof User): User {
             return new cls()
           }
           ```
        2. keyof 类、接口、类型别名的 key
        3. in 限定索引类型的取值范围

           ```ts 常用
           type Readonly<T> = { readonly [P in keyof T]: T[P] }
           type Partial<T> = { [P in keyof T]?: T[P] }

           /**
            * Make all properties in T required
            */
           type Required<T> = {
             [P in keyof T]-?: T[P]
           }

           type NonNullable<T> = T & {}
           type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
           type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any

           type FuncParam<T extends (...arg: any[]) => any> = T extends (...arg: (infer R)[]) => any ? R : never
           type MyExclude<T, U extends T> = T extends U ? never : T
           type MyExtract<T, U extends T> = T extends U ? T : U
           ```

7.  ## 开发原则
    1. 单一职能原则 每个类只做自己的事 高内聚，低耦合
    2. 开闭原则 扩展开放, 修改关闭
       基于此, 系统开发使用如下模式:
       **数据-界面分离模式**
       传统 back end 操作: 1.所有属性私有 2.使用公开方法访问
    3. 实战 俄罗斯方块
    4. Aop (aspect Oriented Programming)
       将功能块横向切分，分离关注点。比如装饰器的验证数据规则
