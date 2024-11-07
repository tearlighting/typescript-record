class Tank {
  x: number = 20;
  name = "Tank";
  shoot() {}
  getName() {
    console.log(this.name);
  }
}

class PlayerTank extends Tank {
  // override 无论属性方法，但类型要批评
  // x = '30' 类型“PlayerTank”中的属性“x”不可分配给基类型“Tank”中的同一属性
  x = 30;
  name: string = "player tank";
  shoot() {
    return 1;
  }
}

const i: Tank = new PlayerTank(); //鸭子辨型
i.getName(); // this 动态分配
