import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModalWrapper } from '@/components/ModalWrapper';

type ModalContextType = {
    modalContent: ReactNode | null;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
};

const ModalContextForm = createContext<ModalContextType | undefined>(undefined);

export function ModalFormProvider({ children }: { children: ReactNode }) {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const openModal = (content: ReactNode) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    return (
        <ModalContextForm.Provider value={{ modalContent, openModal, closeModal }}>
            {children}
            {modalContent && (
                <ModalWrapper onClose={closeModal}>
                    {modalContent}
                </ModalWrapper>
            )}
        </ModalContextForm.Provider>
    );
}

export function useModal() {
    const ctx = useContext(ModalContextForm);
    if (!ctx) throw new Error("useModal must be inside ModalProvider");
    return ctx;
}
