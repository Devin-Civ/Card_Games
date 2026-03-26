import { ScoundrelState } from "./types";
import { createScoundrelState } from "./state";
import { drawRoom } from "./actions/room";

export function startScoundrel(): ScoundrelState {
  const state = createScoundrelState();
  state.dungeon.shuffle();
  state.dungeon.cut();
  drawRoom(state);
  return state;
}
