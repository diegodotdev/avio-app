import { create } from "zustand";

interface ModalState {
  modalState: boolean;
  handleModalState: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalState: false,
  handleModalState: () => set((state) => ({ modalState: !state.modalState })),
}));
