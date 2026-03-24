import { StandardPlayingCard } from "../cards";
import { isMonster, rankToValue } from "./cards";
import type { EquippedWeapon } from "./types";

export function createEquippedWeapon(
  weaponCard: StandardPlayingCard,
): EquippedWeapon {
  return {
    baseCard: weaponCard,
    slainMonsters: [],
    upgradeBonus: 0,
    disabled: false,
  };
}

function lastSlainMonster(weapon: EquippedWeapon): StandardPlayingCard | null {
  return weapon.slainMonsters.length > 0
    ? weapon.slainMonsters[weapon.slainMonsters.length - 1]
    : null;
}

export function canSlayMonster(
  weapon: EquippedWeapon,
  monster: StandardPlayingCard,
): boolean {
  const lastMonster = lastSlainMonster(weapon);
  if (lastMonster === null) return true;
  else
    return !weapon.disabled && rankToValue(monster) < rankToValue(lastMonster);
}

export function addMonsterToWeapon(
  weapon: EquippedWeapon,
  monster: StandardPlayingCard,
): void {
  if (!isMonster(monster)) {
    throw new Error("addMonsterToWeapon expected a monster card");
  }
  if (lastSlainMonster(weapon) && !canSlayMonster(weapon, monster)) {
    throw new Error(
      "addMonsterToWeapon expected a lower ranked monster than last slain",
    );
  }
  weapon.slainMonsters.push(monster);
}
