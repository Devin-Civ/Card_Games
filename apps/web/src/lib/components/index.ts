/**
 * Game-agnostic card UI (backs, faces, piles, drag targets, etc.).
 * Add `.svelte` components and optional `*.test.ts` beside them as you grow this layer.
 */

export { default as CardSprite } from "./CardSprite/CardSprite.svelte";
export { default as RetroCardSprite } from "./CardSprite/RetroCardSprite.svelte";
export { POCKET_FACE_STRIP, getCardFaceSpriteStyle } from "./CardSprite/spriteData";
export { POCKET_SUIT_SHEETS } from "$lib/assets/cards/sheets";
