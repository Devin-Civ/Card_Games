import { StandardPlayingCard } from "../cards";
import { isMonster, isPotion, isWeapon } from "./cards";
import { CardActionType, ScoundrelState } from "./types";
import { fightBarehanded, fightWithWeapon } from "./actions/combat";
import { usePotion, equipWeapon } from "./actions/player";

export function getAvailableActionsForCard(
  card: StandardPlayingCard,
): CardActionType[] {
  if (isMonster(card)) {
    return ["fightBarehanded", "fightWithWeapon"];
  }
  if (isPotion(card)) {
    return ["usePotion"];
  }
  if (isWeapon(card)) {
    return ["equipWeapon"];
  }
  throw new Error(
    "getAvailableActionsForCard expected a monster, weapon, or potion card",
  );
}

export function chooseCard(
  state: ScoundrelState,
  cardIndex: number,
  action: CardActionType,
): void {
  if (!state.room[cardIndex]) {
    throw new Error(`Card at index ${cardIndex} is not in the room`);
  }
  if (!getAvailableActionsForCard(state.room[cardIndex]).includes(action)) {
    throw new Error(
      `${action} is not a valid action for card at index ${cardIndex}`,
    );
  }
  applyAction(state, cardIndex, action);
  removeCardFromRoom(state, cardIndex);
}

function applyAction(
  state: ScoundrelState,
  cardIndex: number,
  action: CardActionType,
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
  }
}

function removeCardFromRoom(state: ScoundrelState, cardIndex: number): void {
  state.room.splice(cardIndex, 1);
}
