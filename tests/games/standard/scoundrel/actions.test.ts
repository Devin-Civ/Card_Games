import { it, describe, expect } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import {
  drawRoom,
  avoidRoom,
} from "../../../../src/games/standard/scoundrel/actions";
import { std } from "./cards.test";
import { discardCard } from "../../../../src/games/standard/scoundrel/actions";

describe("Actions", () => {
  it("draws enough cards to fill the room", () => {
    const state = createScoundrelState();
    expect(state.room.length).toBe(0);
    drawRoom(state);
    expect(state.room.length).toBe(4);
    state.room = [{ kind: "suited", rank: "A", suit: "S" }];
    drawRoom(state);
    expect(state.room.length).toBe(4);
  });

  it("lets a player avoid the current room", () => {
    const state = createScoundrelState();
    drawRoom(state);
    const firstRoom = state.room;
    avoidRoom(state);
    firstRoom.forEach((card) => {
      expect(state.room).not.toContain(card);
    });
    expect(state.room.length).toBe(4);
  });

  it("sets ranFromPreviousRoom to true when the player avoids the room", () => {
    const state = createScoundrelState();
    drawRoom(state);
    expect(state.ranFromPreviousRoom).toBe(false);
    avoidRoom(state);
    expect(state.ranFromPreviousRoom).toBe(true);
  });

  it("doesn't let the player avoid the room if ranFromPreviousRoom is true", () => {
    const state = createScoundrelState();
    drawRoom(state);
    const firstRoom = state.room;
    state.ranFromPreviousRoom = true;
    avoidRoom(state);
    expect(state.room).toBe(firstRoom);
  });

  it("can discard a card to the discard pile", () => {
    const state = createScoundrelState();
    const card = std("A", "S");
    discardCard(state, card);
    expect(state.discardPile).toContain(card);
  });
});
