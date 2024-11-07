import { Color, Mark } from "./enum";

// type NormalCard = {
//     color: Color
//     mark: Mark
// }
interface NormalCard extends Card {
  color: Color;
  mark: Mark;
}

type TColorKeys = keyof typeof Color;

interface Joker extends Card {
  type: "big" | "small";
}

// //1. 联合类型
// type Deck = Array<NormalCard|Joker>

//2. 接口继承

interface Card {
  getName(): string;
}
type Deck = Card[];
export { Deck, NormalCard, Joker, Card };
