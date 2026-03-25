import { it, describe, expect, beforeEach } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";
import { std } from "./cards.test";
import {
  calculateMonsterDamageBarehanded,
  calculateMonsterDamageWithWeapon,
  applyDamageToPlayer,
  fightBarehanded,
  fightWithWeapon,
  equipWeapon,
} from "../../../../src/games/standard/scoundrel/actions";
import {
  addMonsterToWeapon,
  createEquippedWeapon,
} from "../../../../src/games/standard/scoundrel/weapons";

describe("CombatActions", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = createScoundrelState();
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

  describe("fightBarehanded", () => {
    it("reduces player health by the monster's value", () => {
      state.player.health = 10;
      fightBarehanded(state, std("4", "S"));
      expect(state.player.health).toBe(6);
    });

    it("discards the monster card after it is fought", () => {
      const card = std("4", "S");
      fightBarehanded(state, card);
      expect(state.discardPile).toContainEqual(card);
    });
  });

  describe("fightWithWeapon", () => {
    it("reduces player health by the monster's value", () => {
      state.player.health = 10;
      equipWeapon(state, std("3", "D"));
      fightWithWeapon(state, std("4", "S"));
      expect(state.player.health).toBe(9);
    });

    it("Adds the monster to the weapon's slain monsters list", () => {
      equipWeapon(state, std("3", "D"));
      const monster = std("4", "S");
      fightWithWeapon(state, monster);
      expect(state.player.equippedWeapon!.slainMonsters).toContainEqual(
        monster,
      );
    });

    it("throws an error if a weapon that cannot slay the monster is attempted to be used", () => {
      equipWeapon(state, std("3", "D"));
      addMonsterToWeapon(state.player.equippedWeapon!, std("8", "S"));
      expect(() => fightWithWeapon(state, std("8", "S"))).toThrow(
        "fightWithWeapon expected a weapon that can slay the monster",
      );
    });

    it("throws an error if a weapon is not equipped", () => {
      expect(() => fightWithWeapon(state, std("4", "S"))).toThrow(
        "fightWithWeapon expected a equipped weapon",
      );
    });
  });
});
