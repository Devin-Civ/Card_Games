import { CommandResult, GameCommand, ScoundrelState } from "./types";
import {
  createScoundrelState,
  getAvailableCommandTypes,
  getFinalScore,
  getPhase,
  isGameOver,
  isRoomCleared,
} from "./state";
import { drawRoom, resetRoom, runFromRoom } from "./actions/room";
import { resolveCardSelection } from "./selection";

export function startScoundrel(): ScoundrelState {
  const state = createScoundrelState();
  state.dungeon.shuffle();
  state.dungeon.cut();
  drawRoom(state);
  return state;
}

export function handleGameCommand(
  state: ScoundrelState,
  command: GameCommand,
): CommandResult {
  if (!isLegalCommand(state, command))
    return { type: "error", message: "Invalid command for current phase" };
  try {
    switch (command.type) {
      case "runFromRoom":
        runFromRoom(state);
        break;
      case "selectCard":
        resolveCardSelection(state, command.cardIndex, command.action);
        break;
    }
  } catch (error) {
    return { type: "error", message: error.message };
  }
  if (isGameOver(state))
    return { type: "gameOver", score: getFinalScore(state) };
  if (isRoomCleared(state)) resetRoom(state);
  return { type: "ok" };
}

function isLegalCommand(state: ScoundrelState, command: GameCommand): boolean {
  return getAvailableCommandTypes(state).includes(command.type);
}
