import type {
  CardAction,
  MonsterCard,
  PotionCard,
  ScoundrelCard,
  ScoundrelState,
  WeaponCard,
} from "./types";
import { fightBarehanded, fightWithWeapon } from "./actions/combat";
import { usePotion, equipWeapon } from "./actions/player";
import { discardPotion } from "./actions/player";
import { canSlayMonster } from "./weapons";

export function resolveCardSelection(
  state: ScoundrelState,
  cardIndex: number,
  action: CardAction,
): void {
  validateAction(state, cardIndex, action);
  applyAction(state, cardIndex, action);
  removeCardFromRoom(state, cardIndex);
  state.canRunFromRoom = false;
}

export function getAvailableActionsForCard(
  state: ScoundrelState,
  card: ScoundrelCard,
): CardAction[] {
  switch (card.type) {
    case "monster":
      return getAvailableMonsterActions(state, card);
    case "potion":
      return getAvailablePotionActions(state);
    case "weapon":
      return getAvailableWeaponActions();
  }
}

function applyAction(
  state: ScoundrelState,
  cardIndex: number,
  action: CardAction,
): void {
  const selectedCard: ScoundrelCard = state.room[cardIndex];

  switch (selectedCard.type) {
    case "monster":
      applyMonsterAction(state, selectedCard, action);
      break;
    case "potion":
      applyPotionAction(state, selectedCard, action);
      break;
    case "weapon":
      applyWeaponAction(state, selectedCard, action);
      break;
  }
}

function applyMonsterAction(
  state: ScoundrelState,
  card: MonsterCard,
  action: CardAction,
): void {
  switch (action) {
    case "fightBarehanded":
      fightBarehanded(state, card);
      break;
    case "fightWithWeapon":
      fightWithWeapon(state, card);
      break;
  }
}
function applyPotionAction(
  state: ScoundrelState,
  card: PotionCard,
  action: CardAction,
): void {
  switch (action) {
    case "usePotion":
      usePotion(state, card);
      break;
    case "discardPotion":
      discardPotion(state, card);
      break;
  }
}
function applyWeaponAction(
  state: ScoundrelState,
  card: WeaponCard,
  action: CardAction,
): void {
  switch (action) {
    case "equipWeapon":
      equipWeapon(state, card);
      break;
  }
}

function removeCardFromRoom(state: ScoundrelState, cardIndex: number): void {
  state.room.splice(cardIndex, 1);
}

function validateAction(
  state: ScoundrelState,
  cardIndex: number,
  action: CardAction,
): void {
  validateCardExists(state, cardIndex);
  validateActionIsAvailable(state, cardIndex, action);
}

function validateCardExists(state: ScoundrelState, cardIndex: number): void {
  if (!state.room[cardIndex]) {
    throw new Error(`Card at index ${cardIndex} is not in the room`);
  }
}

function validateActionIsAvailable(
  state: ScoundrelState,
  cardIndex: number,
  action: CardAction,
): void {
  if (
    !getAvailableActionsForCard(state, state.room[cardIndex]).includes(action)
  ) {
    throw new Error(
      `${action} is not a valid action for card at index ${cardIndex}`,
    );
  }
}

function getAvailableMonsterActions(
  state: ScoundrelState,
  monster: MonsterCard,
): CardAction[] {
  const weapon = state.player.equippedWeapon;
  if (weapon && canSlayMonster(weapon, monster)) {
    return ["fightBarehanded", "fightWithWeapon"];
  } else return ["fightBarehanded"];
}
function getAvailablePotionActions(state: ScoundrelState): CardAction[] {
  if (state.potionUsedInCurrentRoom) {
    return ["discardPotion"];
  } else return ["discardPotion", "usePotion"];
}
function getAvailableWeaponActions(): CardAction[] {
  return ["equipWeapon"];
}
