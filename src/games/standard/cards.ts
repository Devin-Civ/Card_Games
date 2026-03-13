export const RANK = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
] as const;

export const SUIT = ["H", "D", "C", "S"] as const;

export type Rank = (typeof RANK)[number];
export type Suit = (typeof SUIT)[number];

export type StandardPlayingCard = {
  kind: "standard";
  rank: Rank;
  suit: Suit;
}  | {
  kind: "joker";
  color: "red" | "black";
};
