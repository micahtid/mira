import { create } from 'zustand';

interface NavModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNavModal= create<NavModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useNavModal;