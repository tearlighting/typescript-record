const a = 3;
// a.IsNaN? 是不是很奇怪
// 我要判断isNaN 还要创建一个实例

Number.isNaN; //就是静态成员

class User {
  private static Users: User[] = [];
  constructor(
    public userName: string,
    private pwd: string,
  ) {
    User.Users.push(this);
  }
  async login(userName: string, pwd: string) {
    return Promise.resolve().then(() => {
      return new User(userName, pwd);
    });
  }
  static async login2(userName: string, pwd: string) {
    return this.Users.find((x) => x.userName === userName && pwd === x.pwd);
  }
}

//登录成功返回一个User
// 但是要先创建一个User实例才能调用
// new User("1","1")

// 单例模式
//不想让被人乱创建实例
class HttpHelper {
  get() {}
  post() {}

  private constructor() {}
  private static _instance?: HttpHelper;
  static get instantce() {
    if (!this._instance) {
      this._instance = new HttpHelper();
    }
    return this._instance;
  }

  // static instan
}

HttpHelper.instantce;
