import type { Rank, Suit } from "@card-games/standard-cards";
import clubs02 from "./clubs_02.png";
import clubs03 from "./clubs_03.png";
import clubs04 from "./clubs_04.png";
import clubs05 from "./clubs_05.png";
import clubs06 from "./clubs_06.png";
import clubs07 from "./clubs_07.png";
import clubs08 from "./clubs_08.png";
import clubs09 from "./clubs_09.png";
import clubs10 from "./clubs_10.png";
import clubsAce from "./clubs_ace.png";
import clubsJack from "./clubs_jack.png";
import clubsKing from "./clubs_king.png";
import clubsQueen from "./clubs_queen.png";
import diamonds02 from "./diamonds_02.png";
import diamonds03 from "./diamonds_03.png";
import diamonds04 from "./diamonds_04.png";
import diamonds05 from "./diamonds_05.png";
import diamonds06 from "./diamonds_06.png";
import diamonds07 from "./diamonds_07.png";
import diamonds08 from "./diamonds_08.png";
import diamonds09 from "./diamonds_09.png";
import diamonds10 from "./diamonds_10.png";
import diamondsAce from "./diamonds_ace.png";
import diamondsJack from "./diamonds_jack.png";
import diamondsKing from "./diamonds_king.png";
import diamondsQueen from "./diamonds_queen.png";
import hearts02 from "./hearts_02.png";
import hearts03 from "./hearts_03.png";
import hearts04 from "./hearts_04.png";
import hearts05 from "./hearts_05.png";
import hearts06 from "./hearts_06.png";
import hearts07 from "./hearts_07.png";
import hearts08 from "./hearts_08.png";
import hearts09 from "./hearts_09.png";
import hearts10 from "./hearts_10.png";
import heartsAce from "./hearts_ace.png";
import heartsJack from "./hearts_jack.png";
import heartsKing from "./hearts_king.png";
import heartsQueen from "./hearts_queen.png";
import spades02 from "./spades_02.png";
import spades03 from "./spades_03.png";
import spades04 from "./spades_04.png";
import spades05 from "./spades_05.png";
import spades06 from "./spades_06.png";
import spades07 from "./spades_07.png";
import spades08 from "./spades_08.png";
import spades09 from "./spades_09.png";
import spades10 from "./spades_10.png";
import spadesAce from "./spades_ace.png";
import spadesJack from "./spades_jack.png";
import spadesKing from "./spades_king.png";
import spadesQueen from "./spades_queen.png";

export const INDIVIDUAL_CARD_IMAGES: Record<Suit, Record<Rank, string>> = {
  C: {
    "2": clubs02,
    "3": clubs03,
    "4": clubs04,
    "5": clubs05,
    "6": clubs06,
    "7": clubs07,
    "8": clubs08,
    "9": clubs09,
    "10": clubs10,
    J: clubsJack,
    Q: clubsQueen,
    K: clubsKing,
    A: clubsAce,
  },
  D: {
    "2": diamonds02,
    "3": diamonds03,
    "4": diamonds04,
    "5": diamonds05,
    "6": diamonds06,
    "7": diamonds07,
    "8": diamonds08,
    "9": diamonds09,
    "10": diamonds10,
    J: diamondsJack,
    Q: diamondsQueen,
    K: diamondsKing,
    A: diamondsAce,
  },
  H: {
    "2": hearts02,
    "3": hearts03,
    "4": hearts04,
    "5": hearts05,
    "6": hearts06,
    "7": hearts07,
    "8": hearts08,
    "9": hearts09,
    "10": hearts10,
    J: heartsJack,
    Q: heartsQueen,
    K: heartsKing,
    A: heartsAce,
  },
  S: {
    "2": spades02,
    "3": spades03,
    "4": spades04,
    "5": spades05,
    "6": spades06,
    "7": spades07,
    "8": spades08,
    "9": spades09,
    "10": spades10,
    J: spadesJack,
    Q: spadesQueen,
    K: spadesKing,
    A: spadesAce,
  },
};
