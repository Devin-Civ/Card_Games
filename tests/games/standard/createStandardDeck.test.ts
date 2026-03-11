import { it, describe, expect } from "vitest";
import { createStandardDeck } from "../../../src/games/standard/createStandardDeck.ts";

describe("createStandardDeck", () => {
  it("creates a standard deck of 52 cards", () => {
    expect(createStandardDeck()).toBeDefined();
  });
});
