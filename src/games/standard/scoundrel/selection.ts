import {
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
  card: ScoundrelCard,
): CardAction[] {
  if (card.type === "monster") {
    if (state.player.equippedWeapon) {
      return ["fightBarehanded", "fightWithWeapon"];
    }
    return ["fightBarehanded"];
  }
  if (card.type === "potion") {
    if (state.potionUsedInCurrentRoom) {
      return ["discardPotion"];
    }
    return ["discardPotion", "usePotion"];
  }
  if (card.type === "weapon") {
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
  const selectedCard = state.room[cardIndex];

  switch (action) {
    case "fightBarehanded":
      assertMonster(selectedCard);
      fightBarehanded(state, selectedCard);
      break;
    case "fightWithWeapon":
      assertMonster(selectedCard);
      fightWithWeapon(state, selectedCard);
      break;
    case "usePotion":
      assertPotion(selectedCard);
      usePotion(state, selectedCard);
      break;
    case "discardPotion":
      assertPotion(selectedCard);
      discardPotion(state, selectedCard);
      break;
    case "equipWeapon":
      assertWeapon(selectedCard);
      equipWeapon(state, selectedCard);
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

function assertMonster(card: ScoundrelCard): asserts card is MonsterCard {
  if (card.type !== "monster") {
    throw new Error("Expected monster card for combat action");
  }
}
function assertPotion(card: ScoundrelCard): asserts card is PotionCard {
  if (card.type !== "potion") {
    throw new Error("Expected potion card for potion action");
  }
}
function assertWeapon(card: ScoundrelCard): asserts card is WeaponCard {
  if (card.type !== "weapon") {
    throw new Error("Expected weapon card for equip action");
  }
}
