import { Color, Mark } from "./enum";
import { Deck, Joker, NormalCard } from "./types";

function creatDeck(): Deck {
  const deck: Deck = [];
  const colors = Object.values(Color);
  const marks = Object.values(Mark);

  for (const i of colors) {
    for (const m of marks) {
      const card: NormalCard = {
        color: i,
        mark: m,
        getName() {
          return this.color + this.mark;
        },
      };
      //赋值子结构辨型
      deck.push(card);
    }
  }

  const bigJoker: Joker = {
    type: "big",
    getName() {
      return "Joker";
    },
  };
  const smallJoker: Joker = {
    type: "small",
    getName() {
      return "joker";
    },
  };
  deck.push(bigJoker, smallJoker);
  return deck;
}

function printDeck(deck: Deck) {
  let res = "";
  deck.forEach((c, i) => {
    console.log(c.getName());
    res += c.getName() + "\t";
    if ((i + 1) % 6 === 0) res += "\n";
  });
  console.log(res);
}

export { printDeck, creatDeck };
