import type { Suit } from "@card-games/standard-cards";
import pocketClubs from "./Pocket_clubs.png";
import pocketDiamonds from "./Pocket_diamonds.png";
import pocketHearts from "./Pocket_hearts.png";
import pocketSpades from "./Pocket_spades.png";

/** One spritesheet per suit: 13 faces in rank order 2…A (same as `RANK`). */
export const POCKET_SUIT_SHEETS: Record<Suit, string> = {
  C: pocketClubs,
  D: pocketDiamonds,
  H: pocketHearts,
  S: pocketSpades,
};
