import { StandardPlayingCard } from "../../cards";
import { rankToValue, validateIsMonster } from "../cards";
import { EquippedWeapon, ScoundrelPlayer, ScoundrelState } from "../types";
import {
  addMonsterToWeapon,
  validateCanSlayMonster,
  validatePlayerHasEquippedWeapon,
} from "../weapons";
import { discardCard } from "./discard";

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

function calculateMonsterDamageBarehanded(
  monster: StandardPlayingCard,
): number {
  validateIsMonster(monster);
  return rankToValue(monster);
}

function calculateMonsterDamageWithWeapon(
  monster: StandardPlayingCard,
  weapon: EquippedWeapon,
): number {
  validateIsMonster(monster);
  return Math.max(
    0,
    rankToValue(monster) - (rankToValue(weapon.baseCard) + weapon.upgradeBonus),
  );
}
