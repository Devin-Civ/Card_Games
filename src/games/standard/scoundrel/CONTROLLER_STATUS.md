# Scoundrel controller API — status

**Where we are:** Core rules live in actions + `resolveCardSelection`; `startScoundrel` shuffles/cuts and draws the first room. `GameCommand` and `GamePhase` exist; `getPhase` is derived from `canRunFromRoom` and game-over. `handleGameCommand` handles `runFromRoom` only.

**In the middle of:** A single controller entry point (`handleGameCommand`) with `isLegalCommand` drafted but not wired; `selectCard` is not dispatched yet (import exists unused).

**Left for a complete controller API:** Wire `selectCard` → `resolveCardSelection` (first pick commits the room—no separate “face” command). Enforce legality before mutating (use `isLegalCommand` or equivalent errors). After three room picks, advance the room (`resetRoom` / draw flow) and re-check game over. Optionally return a structured result (`ok` / `gameOver` / `finalScore` / errors) for UI. Expose “what can I do?” helpers (phase + per-card actions) without duplicating rule logic.
