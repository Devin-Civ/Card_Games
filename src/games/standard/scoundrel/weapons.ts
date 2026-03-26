import { StandardPlayingCard } from "../cards";
import { validateIsMonster, rankToValue } from "./cards";
import type { EquippedWeapon, ScoundrelState } from "./types";

export function createEquippedWeapon(
  weaponCard: StandardPlayingCard,
): EquippedWeapon {
  return {
    baseCard: weaponCard,
    slainMonsters: [],
    upgradeBonus: 0,
  };
}

export function canSlayMonster(
  weapon: EquippedWeapon,
  monsterToSlay: StandardPlayingCard,
): boolean {
  const lastMonsterSlainWithWeapon = lastSlainMonster(weapon);
  if (lastMonsterSlainWithWeapon === null) return true;
  else
    return rankToValue(monsterToSlay) < rankToValue(lastMonsterSlainWithWeapon);
}

export function addMonsterToWeapon(
  weapon: EquippedWeapon,
  monster: StandardPlayingCard,
): void {
  validateIsMonster(monster);
  validateCanSlayMonster(weapon, monster);
  weapon.slainMonsters.push(monster);
}

export function validateCanSlayMonster(
  weapon: EquippedWeapon,
  monsterToSlay: StandardPlayingCard,
): void {
  if (lastSlainMonster(weapon) && !canSlayMonster(weapon, monsterToSlay)) {
    throw new Error(
      "validateCanSlayMonster expected a lower ranked monster than last slain",
    );
  }
}

export function validatePlayerHasEquippedWeapon(state: ScoundrelState): void {
  if (!state.player.equippedWeapon) {
    throw new Error(
      "validatePlayerHasEquippedWeapon expected an equipped weapon",
    );
  }
}

function lastSlainMonster(weapon: EquippedWeapon): StandardPlayingCard | null {
  return weapon.slainMonsters.length > 0
    ? weapon.slainMonsters[weapon.slainMonsters.length - 1]
    : null;
}
