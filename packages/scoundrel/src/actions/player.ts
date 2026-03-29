import { rankToValue } from "../cards";
import type {
  ScoundrelState,
  WeaponCard,
  ScoundrelCard,
  PotionCard,
} from "../types";
import {
  createEquippedWeapon,
  validatePlayerHasEquippedWeapon,
} from "../weapons";

export function discardCard(state: ScoundrelState, card: ScoundrelCard): void {
  state.discardPile.push(card);
}

export function equipWeapon(
  state: ScoundrelState,
  weaponCard: WeaponCard,
): void {
  if (state.player.equippedWeapon) destroyEquippedWeapon(state);
  state.player.equippedWeapon = createEquippedWeapon(weaponCard);
}

export function destroyEquippedWeapon(state: ScoundrelState): void {
  validatePlayerHasEquippedWeapon(state);
  discardAllMonstersSlainWithWeapon(state);
  discardCard(state, state.player.equippedWeapon!.baseCard);
  state.player.equippedWeapon = null;
}

export function usePotion(state: ScoundrelState, card: PotionCard): void {
  validatePotionCanBeUsed(state);
  applyPotion(state, card);
  discardCard(state, card);
  state.potionUsedInCurrentRoom = true;
}

export function discardPotion(state: ScoundrelState, card: PotionCard): void {
  discardCard(state, card);
}

function applyPotion(state: ScoundrelState, card: PotionCard): void {
  state.player.health = Math.min(
    state.player.health + rankToValue(card),
    state.player.maxHealth,
  );
}

function validatePotionCanBeUsed(state: ScoundrelState): void {
  if (state.potionUsedInCurrentRoom) {
    throw new Error("Only one health potion can be used per room");
  }
}

function discardAllMonstersSlainWithWeapon(state: ScoundrelState): void {
  state.player.equippedWeapon?.slainMonsters.forEach((monster) => {
    discardCard(state, monster);
  });
}
