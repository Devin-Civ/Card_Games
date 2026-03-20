import { it, describe, expect, beforeEach } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import { drawRoom, avoidRoom } from "../../../../src/games/standard/scoundrel/actions";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";

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

    it("sets ranFromPreviousRoom to true when the player avoids the room", () => {
      drawRoom(state);
      expect(state.ranFromPreviousRoom).toBe(false);
      avoidRoom(state);
      expect(state.ranFromPreviousRoom).toBe(true);
    });

    it("doesn't let the player avoid the room if ranFromPreviousRoom is true", () => {
      drawRoom(state);
      const firstRoom = state.room;
      state.ranFromPreviousRoom = true;
      avoidRoom(state);
      expect(state.room).toBe(firstRoom);
    });
  });
});
