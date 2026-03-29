import type { ScoundrelState } from "../types";

const ROOM_SIZE = 4;

export function drawRoom(state: ScoundrelState): void {
  const cardsToDraw = ROOM_SIZE - state.room.length;
  state.room.push(...state.dungeon.drawCards(cardsToDraw));
}

export function runFromRoom(state: ScoundrelState): void {
  if (!state.canRunFromRoom)
    throw new Error("Cannot run from room if canRunFromRoom is false");
  placeRoomOnBottomOfDungeon(state);
  resetRunFromRoom(state);
}

export function resetRoom(state: ScoundrelState): void {
  drawRoom(state);
  state.canRunFromRoom = true;
  state.potionUsedInCurrentRoom = false;
}

function placeRoomOnBottomOfDungeon(state: ScoundrelState): void {
  state.dungeon.addCardsToBottom(state.room);
  state.room = [];
}

function resetRunFromRoom(state: ScoundrelState): void {
  drawRoom(state);
  state.canRunFromRoom = false;
}
