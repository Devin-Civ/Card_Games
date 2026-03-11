class NotEnoughCardsError extends Error {
  constructor(
    public readonly remaining: number,
    public readonly requested: number,
  ) {
    super(
      `Not enough cards in the deck. Requested ${requested} cards, but only ${remaining} remaining.`,
    );
    this.name = "NotEnoughCardsError";
  }
}

export { NotEnoughCardsError };
