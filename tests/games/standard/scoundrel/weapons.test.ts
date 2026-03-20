import { describe, expect, it } from "vitest";
import { std } from "./cards.test";
import {
  canSlayMonster,
  createEquippedWeapon,
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
    it("can check if a weapon can slay a monster", () => {
      const currentWeapon: EquippedWeapon = createEquippedWeapon(std("7", "D"));
      expect(canSlayMonster(currentWeapon, std("A", "S"))).toBe(true);
      expect(canSlayMonster(currentWeapon, std("8", "S"))).toBe(true);
      currentWeapon.slainMonsters.push(std("A", "S"));
      expect(canSlayMonster(currentWeapon, std("A", "C"))).toBe(false);
      expect(canSlayMonster(currentWeapon, std("8", "C"))).toBe(true);
    });
  });
});
