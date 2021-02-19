import React, { createContext } from 'react';
import { Modal } from '../../components/Modal';
import { useModal } from '../../hooks/useModal';

type ContextProps = {
  isOpen: boolean;
  open: (content: React.ReactNode) => void;
  close: () => void;
  content: React.ReactNode;
  callback: () => void;
};

export const ModalContext = createContext<Partial<ContextProps>>({});

export const ModalProvider: React.FC = ({ children }) => {
  const { isOpen, open, close, content } = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, open, close, content }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
