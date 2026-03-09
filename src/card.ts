import { RANKS, SUITS, SUIT_SYMBOLS } from "./card.constants";
export class Card {
  private rank: string;
  private suit: string;
  constructor(rank: string, suit: string) {
    if (!this.validateRank(rank)) {
      throw new Error("Invalid rank");
    }
    if (!this.validateSuit(suit)) {
      throw new Error("Invalid suit");
    }
    this.rank = rank;
    this.suit = suit;
  }
  private validateRank(rank: string): boolean {
    return Object.keys(RANKS).includes(rank);
  }
  private validateSuit(suit: string): boolean {
    return Object.keys(SUITS).includes(suit);
  }
  getRank(): string {
    return this.rank;
  }
  getSuit(): string {
    return this.suit;
  }
  toVerboseString(): string {
    return `${RANKS[this.rank as string]} of ${SUITS[this.suit as string]}`;
  }
  toSymbolString(): string {
    return `${this.rank}${SUIT_SYMBOLS[this.suit as string]}`;
  }
}
