import { GameCommand, ScoundrelState } from "./types";
import { createScoundrelState, getPhase, isGameOver } from "./state";
import { drawRoom, runFromRoom } from "./actions/room";
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
): void {
  switch (command.kind) {
    case "runFromRoom":
      runFromRoom(state);
      break;
  }
}

function isLegalCommand(state: ScoundrelState, command: GameCommand): boolean {
  const phase = getPhase(state);
  switch (command.kind) {
    case "runFromRoom":
      return phase === "runOrFace";
    case "selectCard":
      return phase === "selectCard" || phase === "runOrFace";
    default:
      return false;
  }
}
