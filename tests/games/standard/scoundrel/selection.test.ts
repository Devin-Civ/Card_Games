import { beforeEach, describe, expect, it } from "vitest";
import { monster, potion, weapon } from "./helpers";
import {
  getAvailableActionsForCard,
  resolveCardSelection,
} from "../../../../src/games/standard/scoundrel/selection";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";
import { equipWeapon } from "../../../../src/games/standard/scoundrel/actions/player";

describe("Selection", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = createScoundrelState();
    state.player.health = 15;
    state.player.maxHealth = 20;
    state.room = [monster("A", "S"), potion("8", "H"), weapon("9", "D")];
  });

  describe("getAvailableActionsForCard", () => {
    it("returns equipWeapon for weapons", () => {
      const actions = getAvailableActionsForCard(state, weapon("3", "D"));
      expect(actions).toEqual(["equipWeapon"]);
    });

    it("only returns fightBarehanded for combat if no weapon is equipped", () => {
      state.player.equippedWeapon = null;
      const actions = getAvailableActionsForCard(state, monster("4", "S"));
      expect(actions).toEqual(["fightBarehanded"]);
    });

    it("returns fightBarehanded and fightWithWeapon for combat if a weapon is equipped", () => {
      equipWeapon(state, weapon("3", "D"));
      const actions = getAvailableActionsForCard(state, monster("4", "S"));
      expect(actions).toEqual(["fightBarehanded", "fightWithWeapon"]);
    });

    it("returns discardPotion and usePotion for potions if no potion has been used in the current room", () => {
      state.potionUsedInCurrentRoom = false;
      const actions = getAvailableActionsForCard(state, potion("2", "H"));
      expect(actions).toEqual(["discardPotion", "usePotion"]);
    });

    it("returns discardPotion for potions if a potion has been used in the current room", () => {
      state.potionUsedInCurrentRoom = true;
      const actions = getAvailableActionsForCard(state, potion("2", "H"));
      expect(actions).toEqual(["discardPotion"]);
    });
  });
  describe("resolveCardSelection", () => {
    it("can apply a fightBarehanded action to a monster in the room", () => {
      resolveCardSelection(state, 0, "fightBarehanded");
      expect(state.player.health).toBe(1);
    });

    it("can choose a potion from the room to interact with", () => {
      resolveCardSelection(state, 1, "usePotion");
      expect(state.player.health).toBe(20);
    });

    it("can choose a weapon from the room to interact with", () => {
      resolveCardSelection(state, 2, "equipWeapon");
      expect(state.player.equippedWeapon?.baseCard).toEqual(weapon("9", "D"));
    });

    it("throws an error if a non-valid action is chosen", () => {
      expect(() => resolveCardSelection(state, 0, "usePotion")).toThrow(
        "usePotion is not a valid action for card at index 0",
      );
    });

    it("removes the card from the room after it is chosen", () => {
      resolveCardSelection(state, 0, "fightBarehanded");
      expect(state.room).toHaveLength(2);
    });

    it("sets canRunFromRoom to false after a card is chosen", () => {
      state.room = [monster("A", "S")];
      resolveCardSelection(state, 0, "fightBarehanded");
      expect(state.canRunFromRoom).toBe(false);
    });
  });
});
