import { StandardPlayingCard } from "../cards";
import { isMonster, isPotion, isWeapon } from "./cards";
import { CardActionType } from "./types";

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
