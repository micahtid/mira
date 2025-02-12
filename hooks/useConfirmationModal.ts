import { create } from 'zustand';

interface ConfirmationModalStore {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    setOnConfirm: (callback: () => void) => void;
    onOpen: (message: string, callback: () => void) => void;
    onClose: () => void;
}

export const useConfirmationModal = create<ConfirmationModalStore>((set) => ({
    isOpen: false,
    message: '',
    onConfirm: () => {},
    setOnConfirm: (callback: () => void) => set({ onConfirm: callback }),
    onOpen: (message: string, callback: () => void) => set({ 
        isOpen: true,
        message,
        onConfirm: callback
    }),
    onClose: () => set({ 
        isOpen: false,
        message: '',
        onConfirm: () => {}
    })
}));
