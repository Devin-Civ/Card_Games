import { it, describe, expect } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import { discardCard } from "../../../../src/games/standard/scoundrel/actions";
import { std } from "./cards.test";

describe("discardCard", () => {
  it("can discard a card to the discard pile", () => {
    const card = std("A", "S");
    const state = createScoundrelState();
    discardCard(state, card);
    expect(state.discardPile).toContain(card);
  });
});
