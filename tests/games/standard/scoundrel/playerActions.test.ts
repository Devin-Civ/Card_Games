import { it, describe, expect, beforeEach } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import {
  usePotion,
  drawRoom,
  equipWeapon,
  calculateMonsterDamageBarehanded,
  calculateMonsterDamageWithWeapon,
  applyDamageToPlayer,
} from "../../../../src/games/standard/scoundrel/actions";
import { std } from "./cards.test";
import { createEquippedWeapon } from "../../../../src/games/standard/scoundrel/weapons";
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

  describe("calculateMonsterDamage", () => {
    it("fighting a monster barehanded reduces player health by the monster's value", () => {
      expect(calculateMonsterDamageBarehanded(std("4", "S"))).toBe(4);
      expect(calculateMonsterDamageBarehanded(std("5", "S"))).toBe(5);
      expect(calculateMonsterDamageBarehanded(std("6", "S"))).toBe(6);
    });

    it("throws an error if a non-monster card is attempted to be fought barehanded", () => {
      expect(() => calculateMonsterDamageBarehanded(std("A", "H"))).toThrow(
        "calculateMonsterDamageBarehanded expected a monster card",
      );
    });

    it("fighting a monster with a weapon reduces player health by monster - weapon value", () => {
      const weapon = createEquippedWeapon(std("3", "D"));
      expect(calculateMonsterDamageWithWeapon(std("4", "S"), weapon)).toBe(1);
      expect(calculateMonsterDamageWithWeapon(std("6", "S"), weapon)).toBe(3);
      expect(calculateMonsterDamageWithWeapon(std("2", "S"), weapon)).toBe(0);
    });

    it("throws an error if a non-monster card is attempted to be fought with a weapon", () => {
      const weapon = createEquippedWeapon(std("2", "D"));
      expect(() =>
        calculateMonsterDamageWithWeapon(std("A", "H"), weapon),
      ).toThrow("calculateMonsterDamageWithWeapon expected a monster card");
    });

    it("adds the weapon's upgrade bonus to its value", () => {
      const weapon = createEquippedWeapon(std("2", "D"));
      weapon.upgradeBonus = 3;
      expect(calculateMonsterDamageWithWeapon(std("8", "S"), weapon)).toBe(3);
      expect(calculateMonsterDamageWithWeapon(std("6", "S"), weapon)).toBe(1);
      expect(calculateMonsterDamageWithWeapon(std("4", "S"), weapon)).toBe(0);
    });
  });

  describe("applyDamageToPlayer", () => {
    it("reduces player health by the damage amount", () => {
      state.player.health = 10;
      applyDamageToPlayer(state.player, 5);
      expect(state.player.health).toBe(5);
    });
  });
});
