export class Deck<TCard> {
  private _cards: TCard[];

  constructor(cards: Iterable<TCard>) {
    this._cards = Array.from(cards);
  }

  drawCards(numberOfCards: number = 1): TCard[] {
    if (this.count < numberOfCards)
      throw new Error(`Not enough cards (have ${this.count}, need ${numberOfCards})`);
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

  cut(index: number = randomIntegerUpToInclusive(this.count)): void {
    this._cards = [...this._cards.slice(index), ...this._cards.slice(0, index)];
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
