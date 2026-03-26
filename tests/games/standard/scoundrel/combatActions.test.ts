import { it, describe, expect, beforeEach } from "vitest";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";
import { std } from "./cards.test";
import {
  applyDamageToPlayer,
  fightBarehanded,
  fightWithWeapon,
  equipWeapon,
} from "../../../../src/games/standard/scoundrel/actions";
import { addMonsterToWeapon } from "../../../../src/games/standard/scoundrel/weapons";

describe("CombatActions", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = createScoundrelState();
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
      fightBarehanded(state, std("5", "S"));
      expect(state.player.health).toBe(1);
    });

    it("discards the monster card after it is fought", () => {
      const card = std("4", "S");
      fightBarehanded(state, card);
      expect(state.discardPile).toContainEqual(card);
    });

    it("throws an error if a non-monster card is attempted to be fought barehanded", () => {
      expect(() => fightBarehanded(state, std("A", "H"))).toThrow(
        /expected a monster card/,
      );
    });
  });

  describe("fightWithWeapon", () => {
    it("reduces player health by the monster's value", () => {
      state.player.health = 10;
      const weapon = std("3", "D");
      equipWeapon(state, weapon);
      fightWithWeapon(state, std("4", "S"));
      expect(state.player.health).toBe(9);
      state.player.equippedWeapon!.slainMonsters = [];
      fightWithWeapon(state, std("A", "S"));
      expect(state.player.health).toBe(-2);
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
        /expected a lower ranked monster than last slain/,
      );
    });

    it("throws an error if a weapon is not equipped", () => {
      expect(() => fightWithWeapon(state, std("4", "S"))).toThrow(
        /expected an equipped weapon/,
      );
    });

    it("throws an error if a non-monster card is attempted to be fought with a weapon", () => {
      equipWeapon(state, std("2", "D"));
      expect(() => fightWithWeapon(state, std("A", "H"))).toThrow(
        /expected a monster card/,
      );
    });

    it("adds the weapon's upgrade bonus to its value", () => {
      equipWeapon(state, std("2", "D"));
      state.player.equippedWeapon!.upgradeBonus = 3;
      state.player.health = 10;
      fightWithWeapon(state, std("8", "S"));
      expect(state.player.health).toBe(7);
      fightWithWeapon(state, std("6", "S"));
      expect(state.player.health).toBe(6);
      fightWithWeapon(state, std("4", "S"));
      expect(state.player.health).toBe(6);
    });
  });
});
