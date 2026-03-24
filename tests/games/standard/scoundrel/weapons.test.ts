import { describe, expect, it } from "vitest";
import { std } from "./cards.test";
import {
  canSlayMonster,
  createEquippedWeapon,
  addMonsterToWeapon,
} from "../../../../src/games/standard/scoundrel/weapons";
import { StandardPlayingCard } from "../../../../src/games/standard/cards";
import { EquippedWeapon } from "../../../../src/games/standard/scoundrel/types";

describe("Weapons", () => {
  describe("createEquippedWeapon", () => {
    it("can equip a weapon card and view it as a weapon", () => {
      const weaponCard: StandardPlayingCard = std("7", "D");
      const currentWeapon: EquippedWeapon = createEquippedWeapon(weaponCard);
      expect(currentWeapon.baseCard).toEqual(weaponCard);
      expect(currentWeapon.slainMonsters).toEqual([]);
      expect(currentWeapon.upgradeBonus).toBe(0);
      expect(currentWeapon.disabled).toBe(false);
    });
  });

  describe("canSlayMonster", () => {
    it("can check if a clean weapon can slay a monster", () => {
      const currentWeapon: EquippedWeapon = createEquippedWeapon(std("7", "D"));
      expect(canSlayMonster(currentWeapon, std("A", "S"))).toBe(true);
      expect(canSlayMonster(currentWeapon, std("8", "S"))).toBe(true);
    });
    it("can check if a weapon with a slain monster can slay a monster", () => {
      const weapon: EquippedWeapon = createEquippedWeapon(std("7", "D"));
      addMonsterToWeapon(weapon, std("A", "S"));
      expect(canSlayMonster(weapon, std("A", "C"))).toBe(false);
      expect(canSlayMonster(weapon, std("8", "C"))).toBe(true);
    });
  });

  describe("addMonsterToWeapon", () => {
    it("can add a monster to a weapon", () => {
      const weapon: EquippedWeapon = createEquippedWeapon(std("7", "D"));
      addMonsterToWeapon(weapon, std("A", "S"));
      expect(weapon.slainMonsters).toEqual([std("A", "S")]);
    });

    it("throws an error if a non-monster card is attempted to be added to a weapon", () => {
      const weapon: EquippedWeapon = createEquippedWeapon(std("7", "D"));
      expect(() => addMonsterToWeapon(weapon, std("A", "H"))).toThrow(
        "addMonsterToWeapon expected a monster card",
      );
    });

    it("throws an error if a higher ranked monster than last slain is attempted to be added to a weapon", () => {
      const weapon: EquippedWeapon = createEquippedWeapon(std("7", "D"));
      addMonsterToWeapon(weapon, std("8", "S"));
      expect(() => addMonsterToWeapon(weapon, std("9", "C"))).toThrow(
        "addMonsterToWeapon expected a lower ranked monster than last slain",
      );
      expect(() => addMonsterToWeapon(weapon, std("8", "S"))).toThrow(
        "addMonsterToWeapon expected a lower ranked monster than last slain",
      );
    });
  });
});
