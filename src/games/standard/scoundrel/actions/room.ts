import { ScoundrelState } from "../types";

const ROOM_SIZE = 4;

export function drawRoom(state: ScoundrelState): void {
  const cardsToDraw = ROOM_SIZE - state.room.length;
  state.room.push(...state.dungeon.drawCards(cardsToDraw));
}

export function avoidRoom(state: ScoundrelState): void {
  if (state.ranFromPreviousRoom) return;
  state.dungeon.addCardsToBottom(state.room);
  state.room = [];
  drawRoom(state);
  state.ranFromPreviousRoom = true;
}

export function resetRoom(state: ScoundrelState): void {
  drawRoom(state);
  state.ranFromPreviousRoom = false;
  state.potionUsedInCurrentRoom = false;
}
