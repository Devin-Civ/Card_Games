import { it, describe, expect, beforeEach } from "vitest";
import { startScoundrel } from "../../../../src/games/standard/scoundrel/main";
import { createScoundrelDeck } from "../../../../src/games/standard/scoundrel/createScoundrelDeck";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";

describe("startScoundrel", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = startScoundrel();
  });

  it("shuffles (and cuts) the dungeon", () => {
    const state = startScoundrel();
    const unshuffledDeck = createScoundrelDeck();
    // This is flaky, but only at a 1/44! rate
    expect(state.dungeon).not.toEqual(unshuffledDeck);
  });

  it("begins a game with room drawn", () => {
    expect(state.room).not.toEqual([]);
    expect(state.dungeon.count).toBe(44 - state.room.length);
  });
});
