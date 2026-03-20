import { StandardPlayingCard } from "../cards";
import { discardCard } from "./actions";
import { isWeapon, rankToValue } from "./cards";
import type { EquippedWeapon, ScoundrelPlayer, ScoundrelState } from "./types";

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

export function equipWeapon(
  state: ScoundrelState,
  weaponCard: StandardPlayingCard,
): void {
  if (!isWeapon(weaponCard)) {
    throw new Error("equipWeapon expected a weapon card");
  }
  if (state.player.equippedWeapon) {
    discardCard(state, state.player.equippedWeapon.baseCard);
  }
  state.player.equippedWeapon = createEquippedWeapon(weaponCard);
}
