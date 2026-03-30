import { RANK, type Rank } from "@card-games/standard-cards";

/**
 * Each `Pocket_{suit}.png` strip: one row, thirteen columns — ranks left→right
 * in the same order as `RANK` (2 … A).
 */
export const POCKET_FACE_STRIP = {
  columns: RANK.length,
  rows: 1,
} as const;

const rankCol = Object.fromEntries(
  RANK.map((rank, index) => [rank, index]),
) as Record<Rank, number>;

/** CSS to show one face from a per-suit horizontal strip. */
export function getCardFaceSpriteStyle(rank: Rank): string {
  const { columns, rows } = POCKET_FACE_STRIP;
  const col = rankCol[rank];
  const xPct = columns <= 1 ? 0 : (col / (columns - 1)) * 100;
  const yPct = 0;
  const w = columns * 100;
  const h = rows * 100;
  return [
    `background-size: ${w}% ${h}%`,
    `background-position: ${xPct}% ${yPct}%`,
    "background-repeat: no-repeat",
  ].join("; ");
}
