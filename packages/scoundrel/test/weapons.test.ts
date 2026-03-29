import { describe, expect, it } from "vitest";
import {
  canSlayMonster,
  createEquippedWeapon,
  addMonsterToWeapon,
} from "../src/weapons";
import type { EquippedWeapon, WeaponCard } from "../src/types";
import { weapon, monster } from "./helpers";

describe("Weapons", () => {
  describe("createEquippedWeapon", () => {
    it("can equip a weapon card and view it as a weapon", () => {
      const weaponCard: WeaponCard = weapon("7", "D");
      const currentWeapon: EquippedWeapon = createEquippedWeapon(weaponCard);
      expect(currentWeapon.baseCard).toEqual(weaponCard);
      expect(currentWeapon.slainMonsters).toEqual([]);
      expect(currentWeapon.upgradeBonus).toBe(0);
    });
  });

  describe("canSlayMonster", () => {
    it("can check if a clean weapon can slay a monster", () => {
      const currentWeapon: EquippedWeapon = createEquippedWeapon(
        weapon("7", "D"),
      );
      expect(canSlayMonster(currentWeapon, monster("A", "S"))).toBe(true);
      expect(canSlayMonster(currentWeapon, monster("8", "S"))).toBe(true);
    });
    it("can check if a weapon with a slain monster can slay a monster", () => {
      const equippedWeapon: EquippedWeapon = createEquippedWeapon(
        weapon("7", "D"),
      );
      addMonsterToWeapon(equippedWeapon, monster("A", "S"));
      expect(canSlayMonster(equippedWeapon, monster("A", "C"))).toBe(false);
      expect(canSlayMonster(equippedWeapon, monster("8", "C"))).toBe(true);
    });
  });

  describe("addMonsterToWeapon", () => {
    it("can add a monster to a weapon", () => {
      const equippedWeapon: EquippedWeapon = createEquippedWeapon(
        weapon("7", "D"),
      );
      addMonsterToWeapon(equippedWeapon, monster("A", "S"));
      expect(equippedWeapon.slainMonsters).toEqual([monster("A", "S")]);
    });

    it("throws an error if a higher ranked monster than last slain is attempted to be added to a weapon", () => {
      const equippedWeapon: EquippedWeapon = createEquippedWeapon(
        weapon("7", "D"),
      );
      addMonsterToWeapon(equippedWeapon, monster("8", "S"));
      expect(() =>
        addMonsterToWeapon(equippedWeapon, monster("9", "C")),
      ).toThrow(/expected a lower ranked monster than last slain/);
      expect(() =>
        addMonsterToWeapon(equippedWeapon, monster("8", "S")),
      ).toThrow(/expected a lower ranked monster than last slain/);
    });
  });
});
