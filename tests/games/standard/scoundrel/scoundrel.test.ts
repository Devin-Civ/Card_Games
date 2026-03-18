import { it, describe, expect, beforeEach } from "vitest";
import { isMonster, isWeapon, isPotion, rankToValue } from "../../../../src/games/standard/scoundrel/scoundrel.ts";
import { StandardPlayingCard } from "../../../../src/games/standard/cards.ts";
import { EquippedWeapon, createEquippedWeapon, canSlayMonster } from "../../../../src/games/standard/scoundrel/scoundrel.ts";

describe("Scoundrel", () => {
    it("identifies only black cards as monsters", () => {
        expect(isMonster({ kind: "standard", rank: "A", suit: "S" })).toBe(true);
        expect(isMonster({ kind: "standard", rank: "A", suit: "C" })).toBe(true);
        expect(isMonster({ kind: "joker", color: "red" })).toBe(false);
        expect(isMonster({ kind: "standard", rank: "A", suit: "H" })).toBe(false);
    });

    it("identifies only diamond ace and number cards as weapons", () => {
        expect(isWeapon({ kind: "standard", rank: "A", suit: "D" })).toBe(true);
        expect(isWeapon({ kind: "standard", rank: "10", suit: "D" })).toBe(true);
        expect(isWeapon({ kind: "joker", color: "red" })).toBe(false);
        expect(isWeapon({ kind: "standard", rank: "A", suit: "H" })).toBe(false);
    });

    it("identifies only heart number cards as potions", () => {
        expect(isPotion({ kind: "standard", rank: "10", suit: "H" })).toBe(true);
        expect(isPotion({ kind: "standard", rank: "2", suit: "H" })).toBe(true);
        expect(isPotion({ kind: "joker", color: "red" })).toBe(false);
        expect(isPotion({ kind: "standard", rank: "A", suit: "D" })).toBe(false);
    });

    it("converts a card's rank to a numeric value", () => {
        expect(rankToValue({ kind: "standard", rank: "A", suit: "S" })).toBe(14);
        expect(rankToValue({ kind: "standard", rank: "10", suit: "S" })).toBe(10);
        expect(rankToValue({ kind: "standard", rank: "J", suit: "S" })).toBe(11);
        expect(rankToValue({ kind: "standard", rank: "Q", suit: "S" })).toBe(12);
        expect(rankToValue({ kind: "standard", rank: "K", suit: "S" })).toBe(13);
        expect(rankToValue({ kind: "standard", rank: "2", suit: "D" })).toBe(2);
        expect(() => rankToValue({ kind: "joker", color: "red" })).toThrow();
        expect(() => rankToValue({ kind: "standard", rank: "A", suit: "H" })).toThrow();
    });

    it("can equip a weapon card and view it as a weapon", () => {
        const weaponCard: StandardPlayingCard = { kind: "standard", rank: "7", suit: "D" };
        const currentWeapon: EquippedWeapon = createEquippedWeapon(weaponCard);
        expect(currentWeapon.baseCard).toEqual(weaponCard);
        expect(currentWeapon.slainMonsters).toEqual([]);
        expect(currentWeapon.upgradeBonus).toBe(0);
        expect(currentWeapon.disabled).toBe(false);
    });

    it("can check if a weapon can slay a monster", () => {
        const weaponCard: StandardPlayingCard = { kind: "standard", rank: "7", suit: "D" };
        const currentWeapon: EquippedWeapon = createEquippedWeapon(weaponCard);
        expect(canSlayMonster(currentWeapon, { kind: "standard", rank: "A", suit: "S" })).toBe(true);
        expect(canSlayMonster(currentWeapon, { kind: "standard", rank: "8", suit: "S" })).toBe(true);
        currentWeapon.slainMonsters.push({ kind: "standard", rank: "A", suit: "S" });
        expect(canSlayMonster(currentWeapon, { kind: "standard", rank: "A", suit: "C" })).toBe(false);
        expect(canSlayMonster(currentWeapon, { kind: "standard", rank: "8", suit: "C" })).toBe(true);
    });
});
