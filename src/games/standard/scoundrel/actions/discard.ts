import { StandardPlayingCard } from "../../cards";
import { ScoundrelState } from "../types";

export function discardCard(
  state: ScoundrelState,
  card: StandardPlayingCard,
): void {
  state.discardPile.push(card);
}
