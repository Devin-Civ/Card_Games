import { describe, expect, it } from "vitest";
import { std } from "./cards.test";
import { getAvailableActionsForCard } from "../../../../src/games/standard/scoundrel/selection";

describe("Selection", () => {
  it.each([
    [0, ["fightBarehanded", "fightWithWeapon"]],
    [1, ["usePotion"]],
    [2, ["equipWeapon"]],
  ])(
    "can identify available actions for a given card in a room",
    (cardIndex: number, expectedActions: string[]) => {
      const room = [std("A", "S"), std("8", "H"), std("9", "D")];
      const actions = getAvailableActionsForCard(room[cardIndex]);
      expect(actions).toEqual(expectedActions);
    },
  );
});
