import { StandardPlayingCard } from "../../cards";
import { isPotion, isWeapon, rankToValue } from "../cards";
import { ScoundrelState } from "../types";
import { createEquippedWeapon } from "../weapons";
import { discardCard } from "./discard";

function applyPotion(state: ScoundrelState, card: StandardPlayingCard): void {
  if (!isPotion(card)) {
    throw new Error("applyPotion expected a potion card");
  }
  state.player.health = Math.min(
    state.player.health + rankToValue(card),
    state.player.maxHealth,
  );
}

export function usePotion(
  state: ScoundrelState,
  card: StandardPlayingCard,
): void {
  if (state.potionUsedInCurrentRoom) {
    throw new Error("Only one health potion can be used per room");
  }
  applyPotion(state, card);
  discardCard(state, card);
  state.potionUsedInCurrentRoom = true;
}

export function discardPotion(
  state: ScoundrelState,
  card: StandardPlayingCard,
): void {
  if (!isPotion(card)) {
    throw new Error("discardPotion expected a potion card");
  }
  discardCard(state, card);
}

export function equipWeapon(
  state: ScoundrelState,
  weaponCard: StandardPlayingCard,
): void {
  if (!isWeapon(weaponCard)) {
    throw new Error("equipWeapon expected a weapon card");
  }
  if (state.player.equippedWeapon) {
    destroyEquippedWeapon(state);
  }
  state.player.equippedWeapon = createEquippedWeapon(weaponCard);
}

export function destroyEquippedWeapon(state: ScoundrelState): void {
  if (!state.player.equippedWeapon) {
    throw new Error("destroyEquippedWeapon expected a equipped weapon");
  }
  state.player.equippedWeapon.slainMonsters.forEach((monster) => {
    discardCard(state, monster);
  });
  discardCard(state, state.player.equippedWeapon.baseCard);
  state.player.equippedWeapon = null;
}
