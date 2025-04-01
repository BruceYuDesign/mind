'use client';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';


interface ModalPageContextType {
  currentPageId: string | null;
  setCurrentPageId: (currentPageId: string | null) => void;
};


interface ModalPageProviderProps {
  children: ReactNode;
};


const ModalPageContext = createContext<ModalPageContextType>({
  currentPageId: null,
  setCurrentPageId: () => {},
});


export function isValidPageId(pageId: string) {
  return /^[A-Za-z0-9_]+$/.test(pageId) && pageId.length > 0;
};


export function ModalPageProvider(props: ModalPageProviderProps) {
  const [currentPageId, _setCurrentPageId] = useState<string | null>(null);

  const setCurrentPageId = (pageId: string | null) => {
    if (pageId === null) {
      _setCurrentPageId(null);
      return;
    }
    if (!isValidPageId(pageId)) {
      throw new Error(`Invalid page id: ${pageId}`);
    }
    _setCurrentPageId(pageId);
  };

  return (
    <ModalPageContext.Provider
      value={{ currentPageId, setCurrentPageId }}
    >
      {props.children}
    </ModalPageContext.Provider>
  );
};


export function useModalPage() {
  const context = useContext(ModalPageContext);
  if (context === null) {
    throw new Error('useModalPage must be used within a ModalPageProvider');
  }
  return context;
};