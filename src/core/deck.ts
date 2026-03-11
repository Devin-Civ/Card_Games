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

  addCardsToTop(cards: Iterable<TCard>): void {
    this._cards.push(...cards);
  }

  addCardsToBottom(cards: Iterable<TCard>): void {
    this._cards.unshift(...cards);
  }

  shuffle(): void {
    fisherYatesShuffle(this._cards);
  }

  get count(): number {
    return this._cards.length;
  }
}

function fisherYatesShuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = randomIntegerUpToInclusive(i);
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomIntegerUpToInclusive(upperBound: number): number {
  return Math.floor(Math.random() * (upperBound + 1));
}
