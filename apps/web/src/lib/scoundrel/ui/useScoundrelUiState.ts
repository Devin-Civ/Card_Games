import {
  getAvailableActionsForCard,
  getAvailableCommandTypes,
  handleGameCommand,
  startScoundrel,
  type CardAction,
  type GameCommand,
  type ScoundrelState,
} from "@card-games/scoundrel";

export type GameResultStatus = "victory" | "defeated" | null;

export type ScoundrelUiState = {
  game: ScoundrelState;
  dungeonCount: number;
  discardCount: number;
  canRunFromRoom: boolean;
  availableRoomActions: CardAction[][];
  lastResult: string;
  lastResultStatus: GameResultStatus;
};

export function createScoundrelUiState(): ScoundrelUiState {
  const game = startScoundrel();
  return {
    game,
    dungeonCount: game.dungeon.count,
    discardCount: game.discardPile.length,
    canRunFromRoom: getAvailableCommandTypes(game).includes("runFromRoom"),
    availableRoomActions: game.room.map((card) =>
      getAvailableActionsForCard(game, card),
    ),
    lastResult: "",
    lastResultStatus: null,
  };
}

export function runUiCommand(
  state: ScoundrelUiState,
  command: GameCommand,
): void {
  const result = handleGameCommand(state.game, command);
  if (result.type === "gameOver") {
    const isDefeated = result.score < 0;
    state.lastResultStatus = isDefeated ? "defeated" : "victory";
    state.lastResult = `${isDefeated ? "DEFEATED" : "VICTORY!"} - Score: ${result.score}`;
  } else {
    state.lastResult = "";
    state.lastResultStatus = null;
  }
  refreshDerivedUiState(state);
}

export function resetUiGame(state: ScoundrelUiState): void {
  state.game = startScoundrel();
  state.lastResult = "";
  state.lastResultStatus = null;
  refreshDerivedUiState(state);
}

export function refreshDerivedUiState(state: ScoundrelUiState): void {
  state.dungeonCount = state.game.dungeon.count;
  state.discardCount = state.game.discardPile.length;
  state.canRunFromRoom = getAvailableCommandTypes(state.game).includes(
    "runFromRoom",
  );
  state.availableRoomActions = state.game.room.map((card) =>
    getAvailableActionsForCard(state.game, card),
  );
}
