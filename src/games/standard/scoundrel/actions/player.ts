import { StandardPlayingCard } from "../../cards";
import { validateIsPotion, validateIsWeapon, rankToValue } from "../cards";
import { ScoundrelState } from "../types";
import {
  createEquippedWeapon,
  validatePlayerHasEquippedWeapon,
} from "../weapons";
import { discardCard } from "./discard";

export function equipWeapon(
  state: ScoundrelState,
  weaponCard: StandardPlayingCard,
): void {
  validateIsWeapon(weaponCard);
  if (state.player.equippedWeapon) destroyEquippedWeapon(state);
  state.player.equippedWeapon = createEquippedWeapon(weaponCard);
}

export function destroyEquippedWeapon(state: ScoundrelState): void {
  validatePlayerHasEquippedWeapon(state);
  discardAllMonstersSlainWithWeapon(state);
  discardCard(state, state.player.equippedWeapon!.baseCard);
  state.player.equippedWeapon = null;
}

export function usePotion(
  state: ScoundrelState,
  card: StandardPlayingCard,
): void {
  validatePotionCanBeUsed(state);
  applyPotion(state, card);
  discardCard(state, card);
  state.potionUsedInCurrentRoom = true;
}

export function discardPotion(
  state: ScoundrelState,
  card: StandardPlayingCard,
): void {
  validateIsPotion(card);
  discardCard(state, card);
}

function applyPotion(state: ScoundrelState, card: StandardPlayingCard): void {
  validateIsPotion(card);
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
