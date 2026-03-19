import { it, describe, expect } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";

describe("ScoundrelState", () => {
  it("can create a new state with a deck of 44 cards", () => {
    const state = createScoundrelState();
    expect(state.dungeon.count).toBe(44);
  });

  it("initializes player health to 20", () => {
    const state = createScoundrelState();
    expect(state.player.health).toBe(20);
  });

  it("initializes player's max health to 20", () => {
    const state = createScoundrelState();
    expect(state.player.maxHealth).toBe(20);
  });

  it("initializes player's equipped weapon to null", () => {
    const state = createScoundrelState();
    expect(state.player.equippedWeapon).toBe(null);
  });

  it("initializes an empty room", () => {
    const state = createScoundrelState();
    expect(state.room).toEqual([]);
  });

  it("initializes an empty discard pile", () => {
    const state = createScoundrelState();
    expect(state.discardPile).toEqual([]);
  });
});
