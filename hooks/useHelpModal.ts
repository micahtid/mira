import { create } from 'zustand';

interface HelpModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useHelpModal = create<HelpModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));
