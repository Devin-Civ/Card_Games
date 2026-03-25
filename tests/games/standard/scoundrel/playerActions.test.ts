import { it, describe, expect, beforeEach } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import {
  usePotion,
  drawRoom,
  equipWeapon,
  destroyEquippedWeapon,
} from "../../../../src/games/standard/scoundrel/actions";
import { std } from "./cards.test";
import {
  addMonsterToWeapon,
  createEquippedWeapon,
} from "../../../../src/games/standard/scoundrel/weapons";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";

describe("PlayerActions", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = createScoundrelState();
  });

  describe("usePotion", () => {
    it("can apply a potion to the player", () => {
      const card = std("9", "H");
      state.player.health = 10;
      usePotion(state, card);
      expect(state.player.health).toBe(19);
    });

    it("throws an error if a non-potion card is attempted to be applied", () => {
      const card = std("A", "S");
      expect(() => usePotion(state, card)).toThrow(
        "applyPotion expected a potion card",
      );
    });

    it("discards the potion card after it is applied", () => {
      const card = std("9", "H");
      state.player.health = 10;
      usePotion(state, card);
      expect(state.discardPile).toContain(card);
    });

    it("doesn't increase player health beyond max health", () => {
      state.player.health = 10;
      state.player.maxHealth = 10;
      usePotion(state, std("9", "H"));
      expect(state.player.health).toBe(10);
      state.potionUsedInCurrentRoom = false;
      state.player.maxHealth = 15;
      usePotion(state, std("9", "H"));
      expect(state.player.health).toBe(15);
    });

    it("only allows one health potion per room", () => {
      state.player.health = 1;
      usePotion(state, std("2", "H"));
      expect(() => usePotion(state, std("3", "H"))).toThrow(
        "Only one health potion can be used per room",
      );
    });

    it("allows using a potion again in a new room", () => {
      state.player.health = 1;
      usePotion(state, std("2", "H"));
      drawRoom(state);
      expect(() => usePotion(state, std("3", "H"))).not.toThrow();
    });
  });

  describe("equipWeapon", () => {
    it("can equip a weapon to a player", () => {
      equipWeapon(state, std("7", "D"));
      expect(state.player.equippedWeapon).toEqual(
        createEquippedWeapon(std("7", "D")),
      );
    });

    it("throws an error if a non-weapon card is attempted to be equipped", () => {
      expect(() => equipWeapon(state, std("A", "S"))).toThrow(
        "equipWeapon expected a weapon card",
      );
    });

    it("discards the previously equipped weapon when a new weapon is equipped", () => {
      equipWeapon(state, std("7", "D"));
      expect(state.discardPile).not.toContainEqual(std("7", "D"));
      equipWeapon(state, std("8", "D"));
      expect(state.discardPile).toContainEqual(std("7", "D"));
    });
  });
  describe("destoryWeapon", () => {
    it("can destroy a weapon, discarding all slain monsters and the weapon card", () => {
      equipWeapon(state, std("7", "D"));
      addMonsterToWeapon(state.player.equippedWeapon!, std("A", "S"));
      addMonsterToWeapon(state.player.equippedWeapon!, std("8", "S"));
      destroyEquippedWeapon(state);
      expect(state.discardPile).toContainEqual(std("7", "D"));
      expect(state.discardPile).toContainEqual(std("A", "S"));
      expect(state.discardPile).toContainEqual(std("8", "S"));
      expect(state.player.equippedWeapon).toBeNull();
    });

    it("throws an error if a weapon is not equipped", () => {
      expect(() => destroyEquippedWeapon(state)).toThrow(
        "destroyEquippedWeapon expected a equipped weapon",
      );
    });
  });
});
