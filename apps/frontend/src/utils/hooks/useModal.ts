// hooks/useModal.ts
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";

interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

function useModal(modalAtom: PrimitiveAtom<boolean>): ModalState {
  const [isOpen, setIsOpen] = useAtom(modalAtom);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return { isOpen, open, close };
}

export default useModal;
