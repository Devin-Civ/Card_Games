export const RANKS: Record<string, string> = {
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Nine",
  "10": "Ten",
  J: "Jack",
  Q: "Queen",
  K: "King",
  A: "Ace",
};
export const SUITS: Record<string, string> = {
  H: "Hearts",
  D: "Diamonds",
  C: "Clubs",
  S: "Spades",
};
const SUIT_SYMBOLS: Record<string, string> = {
  H: "♥",
  D: "♦",
  C: "♣",
  S: "♠",
};
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
  validateRank(rank: string): boolean {
    return Object.keys(RANKS).includes(rank);
  }
  validateSuit(suit: string): boolean {
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
