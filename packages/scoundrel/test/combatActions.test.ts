import { it, describe, expect, beforeEach } from "vitest";
import { createScoundrelState } from "../src/state";
import type { ScoundrelState } from "../src/types";
import {
  applyDamageToPlayer,
  fightBarehanded,
  fightWithWeapon,
  equipWeapon,
} from "../src/actions";
import { addMonsterToWeapon } from "../src/weapons";
import { monster, weapon } from "./helpers";

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
      fightBarehanded(state, monster("4", "S"));
      expect(state.player.health).toBe(6);
      fightBarehanded(state, monster("5", "S"));
      expect(state.player.health).toBe(1);
    });

    it("discards the monster card after it is fought", () => {
      const card = monster("4", "S");
      fightBarehanded(state, card);
      expect(state.discardPile).toContainEqual(card);
    });
  });

  describe("fightWithWeapon", () => {
    it("reduces player health by the monster's value", () => {
      state.player.health = 10;
      equipWeapon(state, weapon("3", "D"));
      fightWithWeapon(state, monster("4", "S"));
      expect(state.player.health).toBe(9);
      state.player.equippedWeapon!.slainMonsters = [];
      fightWithWeapon(state, monster("A", "S"));
      expect(state.player.health).toBe(-2);
    });

    it("Adds the monster to the weapon's slain monsters list", () => {
      equipWeapon(state, weapon("3", "D"));
      const monsterToSlay = monster("4", "S");
      fightWithWeapon(state, monsterToSlay);
      expect(state.player.equippedWeapon!.slainMonsters).toContainEqual(
        monsterToSlay,
      );
    });

    it("throws an error if a weapon that cannot slay the monster is attempted to be used", () => {
      equipWeapon(state, weapon("3", "D"));
      addMonsterToWeapon(state.player.equippedWeapon!, monster("8", "S"));
      expect(() => fightWithWeapon(state, monster("8", "S"))).toThrow(
        /expected a lower ranked monster than last slain/,
      );
    });

    it("throws an error if a weapon is not equipped", () => {
      expect(() => fightWithWeapon(state, monster("4", "S"))).toThrow(
        /expected an equipped weapon/,
      );
    });

    it("adds the weapon's upgrade bonus to its value", () => {
      equipWeapon(state, weapon("2", "D"));
      state.player.equippedWeapon!.upgradeBonus = 3;
      state.player.health = 10;
      fightWithWeapon(state, monster("8", "S"));
      expect(state.player.health).toBe(7);
      fightWithWeapon(state, monster("6", "S"));
      expect(state.player.health).toBe(6);
      fightWithWeapon(state, monster("4", "S"));
      expect(state.player.health).toBe(6);
    });
  });
});
