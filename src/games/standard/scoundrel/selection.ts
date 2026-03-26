import { StandardPlayingCard } from "../cards";
import { isMonster, isPotion, isWeapon } from "./cards";
import { CardAction, ScoundrelState } from "./types";
import { fightBarehanded, fightWithWeapon } from "./actions/combat";
import { usePotion, equipWeapon } from "./actions/player";
import { discardPotion } from "./actions/player";

export function applyActionToRoomCard(
  state: ScoundrelState,
  cardIndex: number,
  action: CardAction,
): void {
  validateAction(state, cardIndex, action);
  applyAction(state, cardIndex, action);
  removeCardFromRoom(state, cardIndex);
}

export function getAvailableActionsForCard(
  state: ScoundrelState,
  card: StandardPlayingCard,
): CardAction[] {
  if (isMonster(card)) {
    if (state.player.equippedWeapon) {
      return ["fightBarehanded", "fightWithWeapon"];
    }
    return ["fightBarehanded"];
  }
  if (isPotion(card)) {
    if (state.potionUsedInCurrentRoom) {
      return ["discardPotion"];
    }
    return ["discardPotion", "usePotion"];
  }
  if (isWeapon(card)) {
    return ["equipWeapon"];
  }
  throw new Error(
    "getAvailableActionsForCard expected a monster, weapon, or potion card",
  );
}

function applyAction(
  state: ScoundrelState,
  cardIndex: number,
  action: CardAction,
): void {
  switch (action) {
    case "fightBarehanded":
      fightBarehanded(state, state.room[cardIndex]);
      break;
    case "fightWithWeapon":
      fightWithWeapon(state, state.room[cardIndex]);
      break;
    case "usePotion":
      usePotion(state, state.room[cardIndex]);
      break;
    case "equipWeapon":
      equipWeapon(state, state.room[cardIndex]);
      break;
    case "discardPotion":
      discardPotion(state, state.room[cardIndex]);
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
