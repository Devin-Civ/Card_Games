import { describe, expect, it } from "vitest";
import { std } from "./cards.test";
import {
  canSlayMonster,
  createEquippedWeapon,
} from "../../../../src/games/standard/scoundrel/weapons";
import { StandardPlayingCard } from "../../../../src/games/standard/cards";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import { equipWeapon } from "../../../../src/games/standard/scoundrel/weapons";
import { EquippedWeapon } from "../../../../src/games/standard/scoundrel/types";

describe("Weapons", () => {
  it("can equip a weapon card and view it as a weapon", () => {
    const weaponCard: StandardPlayingCard = std("7", "D");
    const currentWeapon: EquippedWeapon = createEquippedWeapon(weaponCard);
    expect(currentWeapon.baseCard).toEqual(weaponCard);
    expect(currentWeapon.slainMonsters).toEqual([]);
    expect(currentWeapon.upgradeBonus).toBe(0);
    expect(currentWeapon.disabled).toBe(false);
  });

  it("can check if a weapon can slay a monster", () => {
    const currentWeapon: EquippedWeapon = createEquippedWeapon(std("7", "D"));
    expect(canSlayMonster(currentWeapon, std("A", "S"))).toBe(true);
    expect(canSlayMonster(currentWeapon, std("8", "S"))).toBe(true);
    currentWeapon.slainMonsters.push(std("A", "S"));
    expect(canSlayMonster(currentWeapon, std("A", "C"))).toBe(false);
    expect(canSlayMonster(currentWeapon, std("8", "C"))).toBe(true);
  });

  it("can equip a weapon to a player", () => {
    const state = createScoundrelState();
    equipWeapon(state, std("7", "D"));
    expect(state.player.equippedWeapon).toEqual(
      createEquippedWeapon(std("7", "D")),
    );
  });

  it("throws an error if a non-weapon card is attempted to be equipped", () => {
    const state = createScoundrelState();
    expect(() => equipWeapon(state, std("A", "S"))).toThrow(
      "equipWeapon expected a weapon card",
    );
  });

  it("discards the previously equipped weapon when a new weapon is equipped", () => {
    const state = createScoundrelState();
    equipWeapon(state, std("7", "D"));
    expect(state.discardPile).not.toContainEqual(std("7", "D"));
    equipWeapon(state, std("8", "D"));
    expect(state.discardPile).toContainEqual(std("7", "D"));
  });
});
