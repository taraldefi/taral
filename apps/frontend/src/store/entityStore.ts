import { EntityCardResponse } from "src/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const EntityEditedAtom = atom<string>("");
export const EntityDeletedAtom = atom<string>("");
export const EntitiesAtom = atomWithStorage<EntityCardResponse[]>(
  "entities",
  []
);
export const currentSelectedEntityAtom = atomWithStorage<string>(
  "currentEntity",
  ""
);
