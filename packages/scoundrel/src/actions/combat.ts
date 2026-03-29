import { rankToValue } from "../cards";
import type {
  EquippedWeapon,
  MonsterCard,
  ScoundrelPlayer,
  ScoundrelState,
} from "../types";
import {
  addMonsterToWeapon,
  validateCanSlayMonster,
  validatePlayerHasEquippedWeapon,
} from "../weapons";
import { discardCard } from "./player";

export function fightBarehanded(
  state: ScoundrelState,
  monster: MonsterCard,
): void {
  const damage = calculateMonsterDamageBarehanded(monster);
  applyDamageToPlayer(state.player, damage);
  discardCard(state, monster);
}

export function fightWithWeapon(
  state: ScoundrelState,
  monster: MonsterCard,
): void {
  validatePlayerHasEquippedWeapon(state);
  validateCanSlayMonster(state.player.equippedWeapon!, monster);
  const damage = calculateMonsterDamageWithWeapon(
    monster,
    state.player.equippedWeapon!,
  );
  applyDamageToPlayer(state.player, damage);
  addMonsterToWeapon(state.player.equippedWeapon!, monster);
}

export function applyDamageToPlayer(
  player: ScoundrelPlayer,
  damage: number,
): void {
  player.health -= damage;
}

function calculateMonsterDamageBarehanded(monster: MonsterCard): number {
  return rankToValue(monster);
}

function calculateMonsterDamageWithWeapon(
  monster: MonsterCard,
  weapon: EquippedWeapon,
): number {
  return Math.max(
    0,
    rankToValue(monster) - (rankToValue(weapon.baseCard) + weapon.upgradeBonus),
  );
}
