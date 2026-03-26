import { ScoundrelState } from "../types";

const ROOM_SIZE = 4;

export function drawRoom(state: ScoundrelState): void {
  const cardsToDraw = ROOM_SIZE - state.room.length;
  state.room.push(...state.dungeon.drawCards(cardsToDraw));
}

export function avoidRoom(state: ScoundrelState): void {
  if (!state.canRunFromRoom) return;
  placeRoomOnBottomOfDungeon(state);
  resetAvoidedRoom(state);
}

function placeRoomOnBottomOfDungeon(state: ScoundrelState): void {
  state.dungeon.addCardsToBottom(state.room);
  state.room = [];
}

function resetAvoidedRoom(state: ScoundrelState): void {
  drawRoom(state);
  state.canRunFromRoom = false;
}

export function resetRoom(state: ScoundrelState): void {
  drawRoom(state);
  state.canRunFromRoom = true;
  state.potionUsedInCurrentRoom = false;
}
