import { it, describe, expect, beforeEach } from "vitest";
import { createScoundrelState } from "../src/state";
import {
  usePotion,
  equipWeapon,
  destroyEquippedWeapon,
  resetRoom,
  discardPotion,
  discardCard,
} from "../src/actions";
import {
  addMonsterToWeapon,
  createEquippedWeapon,
} from "../src/weapons";
import type { ScoundrelState } from "../src/types";
import { monster, potion, weapon } from "./helpers";

describe("PlayerActions", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = createScoundrelState();
  });

  describe("discardCard", () => {
    it("can discard a card to the discard pile", () => {
      const card = monster("A", "S");
      discardCard(state, card);
      expect(state.discardPile).toContain(card);
    });
  });

  describe("usePotion", () => {
    it("can apply a potion to the player", () => {
      const card = potion("9", "H");
      state.player.health = 10;
      usePotion(state, card);
      expect(state.player.health).toBe(19);
    });

    it("discards the potion card after it is applied", () => {
      const card = potion("9", "H");
      state.player.health = 10;
      usePotion(state, card);
      expect(state.discardPile).toContain(card);
    });

    it("doesn't increase player health beyond max health", () => {
      state.player.health = 10;
      state.player.maxHealth = 10;
      usePotion(state, potion("9", "H"));
      expect(state.player.health).toBe(10);
      state.potionUsedInCurrentRoom = false;
      state.player.maxHealth = 15;
      usePotion(state, potion("9", "H"));
      expect(state.player.health).toBe(15);
    });

    it("only allows one health potion per room", () => {
      state.player.health = 1;
      usePotion(state, potion("2", "H"));
      expect(() => usePotion(state, potion("3", "H"))).toThrow(
        "Only one health potion can be used per room",
      );
    });

    it("allows using a potion again in a new room", () => {
      state.player.health = 1;
      usePotion(state, potion("2", "H"));
      resetRoom(state);
      expect(() => usePotion(state, potion("3", "H"))).not.toThrow();
    });
  });

  describe("discardPotion", () => {
    it("can discard a potion, discarding the potion card", () => {
      discardPotion(state, potion("2", "H"));
      expect(state.discardPile).toContainEqual(potion("2", "H"));
    });
  });

  describe("equipWeapon", () => {
    it("can equip a weapon to a player", () => {
      equipWeapon(state, weapon("7", "D"));
      expect(state.player.equippedWeapon).toEqual(
        createEquippedWeapon(weapon("7", "D")),
      );
    });

    it("discards the previously equipped weapon when a new weapon is equipped", () => {
      equipWeapon(state, weapon("7", "D"));
      expect(state.discardPile).not.toContainEqual(weapon("7", "D"));
      equipWeapon(state, weapon("8", "D"));
      expect(state.discardPile).toContainEqual(weapon("7", "D"));
    });
  });

  describe("destoryWeapon", () => {
    it("can destroy a weapon, discarding all slain monsters and the weapon card", () => {
      equipWeapon(state, weapon("7", "D"));
      addMonsterToWeapon(state.player.equippedWeapon!, monster("A", "S"));
      addMonsterToWeapon(state.player.equippedWeapon!, monster("8", "S"));
      destroyEquippedWeapon(state);
      expect(state.discardPile).toContainEqual(weapon("7", "D"));
      expect(state.discardPile).toContainEqual(monster("A", "S"));
      expect(state.discardPile).toContainEqual(monster("8", "S"));
      expect(state.player.equippedWeapon).toBeNull();
    });

    it("throws an error if a weapon is not equipped", () => {
      expect(() => destroyEquippedWeapon(state)).toThrow(
        /expected an equipped weapon/,
      );
    });
  });
});
