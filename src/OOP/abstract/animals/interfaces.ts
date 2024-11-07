import { Animal } from "./animals";

/**
 * 跳火圈的能力
 */
interface IFireShow {
  singleCircle(this: Animal): void;
  doubleCircle(this: Animal): void;
}
/**
 * 画画的能力
 */
interface IDraw {
  draw(): void;
}

export type { IFireShow, IDraw };
