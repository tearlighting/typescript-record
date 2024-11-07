import { Color, Mark } from "../enum/card/enum";
import type { Card, Joker, NormalCard } from "../enum/card/types";
class Deck {
  cards: Card[] = [];
  constructor(cards?: Card[]) {
    if (cards) this.cards = cards;
    else this.init();
  }
  private init() {
    const colors = Object.values(Color);
    const marks = Object.values(Mark);
    colors.forEach((v) => {
      marks.forEach((m) => {
        const card: NormalCard = {
          color: v,
          mark: m,
          getName() {
            return this.color + this.mark;
          },
        };
        this.cards.push(card);
      });
    });

    let joker: Joker = {
      type: "big",
      getName() {
        return "JO";
      },
    };
    this.cards.push(joker);
    joker = {
      type: "small",
      getName() {
        return "jo";
      },
    };
    this.cards.push(joker);
  }

  print() {
    let res = "";
    this.cards.forEach((v, i) => {
      res += v.getName() + "\t";
      if ((i + 1) % 6 === 0) {
        res += "\n";
      }
    });
    console.log(res);
  }
  //洗牌
  suffle() {
    this.cards.forEach((v, i, arr) => {
      const random = this.getRandomNumber(0, arr.length - 1);
      const tmp = arr[i];
      arr[i] = arr[random];
      arr[random] = tmp;
    });
  }
  //发牌
  emit() {
    return {
      p1: Deck.instance(this.take(17)),
      p2: Deck.instance(this.take(17)),
      p3: Deck.instance(this.take(17)),
      p4: this,
    };
  }
  private take(n: number) {
    const res: Card[] = [];
    while (n) {
      res.push(this.cards.shift()!);
      n--;
    }
    return res;
  }
  private getRandomNumber(min: number, max: number) {
    if (min > max) {
      throw new Error(`max<min`);
    }
    const s = max - min;
    return Math.floor(Math.random() * s + min);
  }
  static instance(cards?: Card[]) {
    return new Deck(cards);
  }
}
const deck = Deck.instance();
deck.print();
deck.suffle();
deck.print();
console.log(deck.emit());
