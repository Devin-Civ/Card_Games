import { Card } from "./card";
export class Deck {
  private size: number;
  constructor() {
    this.size = 52;
  }
  getSize(): number {
    return this.size;
  }
  drawCard() {
    this.size--;
    return new Card("A", "S");
  }
}
