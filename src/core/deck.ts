export class Deck<TCard> {
  private cards: TCard[];

  constructor(cards: TCard[]) {
    this.cards = cards;
  }

  drawCard(): TCard {
    const card = this.cards.pop();
    if (!card) throw new Error("Deck is empty");
    return card;
  }
}
