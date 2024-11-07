import "./deck";
enum Gender {
  male = "男",
  famale = "女",
}

class User {
  //ts 使用属性列表定义成员，不允许之后添加
  // 配置 strictPropertyInitialization: true 检查初始化
  // name: string
  // age: number
  gender: Gender = Gender.male;
  pid?: string;
  readonly id: string;

  private _pulishableNum = 3;
  private _currentPublishNum = 0;
  // constructor(name: string,age: number){
  //     this.name = name
  //     this.age = age
  //     this.id = Math.random().toString()

  // }
  // 语法糖
  constructor(
    public name: string,
    public age: number,
    id?: string,
  ) {
    this.id = id || Math.random().toString();
  }

  get canPublish() {
    return this._pulishableNum > this._currentPublishNum;
  }

  publish(content: any) {
    if (this.canPublish) {
      console.log(content);
      this._currentPublishNum++;
    } else console.error("over limit");
  }
}

// const user = new User("1",1,"2")
// user.name = "1"
// console.log(user);

// user.publish("1")
// user.publish("1")
// user.publish("1")
// user.publish("1")
