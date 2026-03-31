import type { CardAction } from "@card-games/scoundrel";
import {
  checkIcon,
  fistIcon,
  runIcon,
  swordIcon,
  trashIcon,
} from "$lib/assets/icons";

export type ActionMeta = {
  label: string;
  icon: string;
  tooltip: string;
};

export const CARD_ACTION_META: Record<CardAction, ActionMeta> = {
  usePotion: {
    label: "Use potion",
    icon: checkIcon,
    tooltip: "Use potion",
  },
  discardPotion: {
    label: "Discard potion",
    icon: trashIcon,
    tooltip: "Discard potion",
  },
  equipWeapon: {
    label: "Equip weapon",
    icon: checkIcon,
    tooltip: "Equip weapon",
  },
  fightBarehanded: {
    label: "Fight barehanded",
    icon: fistIcon,
    tooltip: "Fight barehanded",
  },
  fightWithWeapon: {
    label: "Fight with weapon",
    icon: swordIcon,
    tooltip: "Fight with weapon",
  },
};

export const RUN_ACTION_META = {
  label: "Run from room",
  icon: runIcon,
  tooltip: "Run from room",
} as const;
