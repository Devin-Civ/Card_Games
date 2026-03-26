import { it, describe, expect, beforeEach } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import {
  drawRoom,
  avoidRoom,
  resetRoom,
} from "../../../../src/games/standard/scoundrel/actions";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";
import { std } from "./cards.test";

describe("RoomActions", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = createScoundrelState();
  });

  describe("drawRoom", () => {
    it("draws enough cards to fill the room", () => {
      expect(state.room.length).toBe(0);
      drawRoom(state);
      expect(state.room.length).toBe(4);
      state.room = [{ kind: "suited", rank: "A", suit: "S" }];
      drawRoom(state);
      expect(state.room.length).toBe(4);
    });
  });

  describe("avoidRoom", () => {
    it("lets a player avoid the current room", () => {
      drawRoom(state);
      const firstRoom = state.room;
      avoidRoom(state);
      firstRoom.forEach((card) => {
        expect(state.room).not.toContain(card);
      });
      expect(state.room.length).toBe(4);
    });

    it("sets canRunFromRoom to false when the player avoids the room", () => {
      drawRoom(state);
      expect(state.canRunFromRoom).toBe(true);
      avoidRoom(state);
      expect(state.canRunFromRoom).toBe(false);
    });

    it("doesn't let the player avoid the room if canRunFromRoom is false", () => {
      drawRoom(state);
      const firstRoom = state.room;
      state.canRunFromRoom = false;
      avoidRoom(state);
      expect(state.room).toBe(firstRoom);
    });
  });
  describe("resetRoom", () => {
    it("draws a new room and resets room flags", () => {
      state.room = [std("A", "S"), std("8", "H"), std("9", "D")];
      state.canRunFromRoom = false;
      state.potionUsedInCurrentRoom = true;
      resetRoom(state);
      expect(state.room.length).toBe(4);
      expect(state.canRunFromRoom).toBe(true);
      expect(state.potionUsedInCurrentRoom).toBe(false);
    });
  });
});
