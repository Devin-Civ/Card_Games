import { NotEnoughCardsError } from "./errors";

export class Deck<TCard> {
  private _cards: TCard[];

  constructor(cards: Iterable<TCard>) {
    this._cards = Array.from(cards);
  }

  drawCards(numberOfCards: number = 1): TCard[] {
    if (this.count < numberOfCards)
      throw new NotEnoughCardsError(this.count, numberOfCards);
    return this._cards.splice(-numberOfCards);
  }

  addCardsToBottom(cards: Iterable<TCard>) {
    this._cards.push(...cards);
  }

  get count(): number {
    return this._cards.length;
  }
}
