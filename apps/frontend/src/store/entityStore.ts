import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Atoms that stores state of entity operations
// Used to pass as an dependency variable to refetch data from the servers
export const EntityEditedAtom = atom<string>("");
export const EntityDeletedAtom = atom<string>("");
export const EntityCreatedAtom = atom<string>("");

// Atom to store the selected entity
// Used to fetch entity data from the server in overview page
export const currentSelectedEntityAtom = atomWithStorage<string>(
  "currentEntity",
  ""
);
