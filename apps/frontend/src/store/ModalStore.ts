// ModalStore.ts
import { atom } from "jotai";

export const TalModalAtom = atom<boolean>(false);
export const FormModalAtom = atom<boolean>(false);
export const EditFormModalAtom = atom<boolean>(false);
export const DeleteModalAtom = atom<boolean>(false);
export const ApplicationModalAtom = atom<boolean>(false);
export const LockSuccessModalAtom = atom<boolean>(false);
export const YieldModalAtom = atom<boolean>(false);
export const StakeSuccessModalAtom = atom<boolean>(false);
export const SettingsModalAtom = atom<boolean>(false);
export const NotificationModalAtom = atom<boolean>(false);
export const EntityModalAtom = atom<boolean>(false);
export const networkDialogIsOpenAtom = atom<boolean>(false);
