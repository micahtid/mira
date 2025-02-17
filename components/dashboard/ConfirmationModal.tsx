"use client";

import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import Modal from "./Modal";
import { IoWarningOutline } from "react-icons/io5";

const ConfirmationModal = () => {
    const { isOpen, message, onConfirm, onClose } = useConfirmationModal();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Modal 
            title="Confirmation" 
            isOpen={isOpen} 
            onChange={onChange}
        >
            <div className="flex flex-col items-center gap-y-6 px-2">
                {/* Warning Icon */}
                <div className="
                    w-16 h-16 
                    flex items-center justify-center 
                    bg-primary-50 rounded-full
                ">
                    <IoWarningOutline className="w-8 h-8 text-primary-500" />
                </div>

                {/* Message */}
                <p className="default-label text-gray-500 text-center">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-x-3 w-full">
                    <button 
                        onClick={onClose}
                        className="
                            flex-1 px-4 py-2.5
                            border border-gray-300
                            text-gray-700 font-medium
                            rounded-lg
                            hover:bg-gray-50
                            transition-colors duration-200
                        "
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="
                            flex-1 px-4 py-2.5
                            bg-primary-500 
                            text-white font-medium
                            rounded-lg
                            hover:bg-primary-600
                            transition-colors duration-200
                        "
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;