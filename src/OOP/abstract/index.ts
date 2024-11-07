// 只是抽象概念，并不存在
abstract class Chess {
  //父类并不知道name,子类必须赋值
  abstract readonly name: string;
  move() {
    this.overScreen() && this.hasMyChess() && this.rule();
  }
  protected overScreen() {
    console.log("边界判断");
    return true;
  }

  protected hasMyChess() {
    console.log("是否有我方棋子");
    return true;
  }

  abstract rule(): boolean;
}

class soldier extends Chess {
  name: string = "兵";
  //  move(): void {
  //       // 重复
  //       this.overScreen() && this.hasMyChess() && this.rule()
  //  }
  rule(): boolean {
    return true;
  }
}
class king extends Chess {
  get name() {
    return "帅";
  }
  // move(): void {
  //     // 重复
  //     this.overScreen() && this.hasMyChess() && this.rule()
  // }
  rule(): boolean {
    return true;
  }
}
