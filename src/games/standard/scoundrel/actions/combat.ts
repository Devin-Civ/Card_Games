import { StandardPlayingCard } from "../../cards";
import { isMonster, rankToValue } from "../cards";
import { EquippedWeapon, ScoundrelPlayer, ScoundrelState } from "../types";
import { addMonsterToWeapon, canSlayMonster } from "../weapons";
import { discardCard } from "./discard";

export function calculateMonsterDamageBarehanded(
  monster: StandardPlayingCard,
): number {
  if (!isMonster(monster)) {
    throw new Error("calculateMonsterDamageBarehanded expected a monster card");
  }
  return rankToValue(monster);
}

export function calculateMonsterDamageWithWeapon(
  monster: StandardPlayingCard,
  weapon: EquippedWeapon,
): number {
  if (!isMonster(monster)) {
    throw new Error("calculateMonsterDamageWithWeapon expected a monster card");
  }
  return Math.max(
    0,
    rankToValue(monster) - (rankToValue(weapon.baseCard) + weapon.upgradeBonus),
  );
}

export function applyDamageToPlayer(
  player: ScoundrelPlayer,
  damage: number,
): void {
  player.health -= damage;
}

export function fightBarehanded(
  state: ScoundrelState,
  monster: StandardPlayingCard,
): void {
  const damage = calculateMonsterDamageBarehanded(monster);
  applyDamageToPlayer(state.player, damage);
  discardCard(state, monster);
}

export function fightWithWeapon(
  state: ScoundrelState,
  monster: StandardPlayingCard,
): void {
  if (!state.player.equippedWeapon) {
    throw new Error("fightWithWeapon expected a equipped weapon");
  }
  if (!canSlayMonster(state.player.equippedWeapon, monster)) {
    throw new Error(
      "fightWithWeapon expected a weapon that can slay the monster",
    );
  }
  const damage = calculateMonsterDamageWithWeapon(
    monster,
    state.player.equippedWeapon,
  );
  applyDamageToPlayer(state.player, damage);
  addMonsterToWeapon(state.player.equippedWeapon, monster);
}
