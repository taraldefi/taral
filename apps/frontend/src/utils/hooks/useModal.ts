// hooks/useModal.ts
import { selectedEntityModalAtom } from "@store/ModalStore";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";

interface ModalState {
  isOpen: boolean;
  entityId: string | undefined;
  open: (entityID?: string) => void;
  close: () => void;
}

function useModal(modalAtom: PrimitiveAtom<boolean>): ModalState {
  const [isOpen, setIsOpen] = useAtom(modalAtom);
  const [entityId, setEntityId] = useAtom(selectedEntityModalAtom); // Initialize entityId state

  function open(entityID?: string) {
    setEntityId(entityID);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return { isOpen, open, close, entityId };
}

export default useModal;
