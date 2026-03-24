import { StandardPlayingCard } from "../../cards";
import { isMonster, rankToValue } from "../cards";
import { EquippedWeapon, ScoundrelPlayer } from "../types";

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
