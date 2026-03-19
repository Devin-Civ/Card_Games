import { ScoundrelState } from "./state";

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
