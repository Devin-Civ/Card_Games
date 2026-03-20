import { StandardPlayingCard } from "../cards";
import { rankToValue } from "./cards";

export type EquippedWeapon = {
  baseCard: StandardPlayingCard;
  slainMonsters: StandardPlayingCard[];
  upgradeBonus: number;
  disabled: boolean;
};

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
