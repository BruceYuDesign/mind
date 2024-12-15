'use client';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';


interface ModalContextType {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
};

interface ModalProviderProps {
  children: ReactNode;
};


const ModalContext = createContext<ModalContextType|null>(null);


export function ModalProvider(props: ModalProviderProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <ModalContext.Provider
      value={{ activeModal, setActiveModal }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};


export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within an ModalProvider');
  }
  return context;
};