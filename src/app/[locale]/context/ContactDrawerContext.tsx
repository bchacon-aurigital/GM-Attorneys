"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface ContactDrawerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactDrawerContext = createContext<ContactDrawerContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function ContactDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactDrawerContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactDrawerContext.Provider>
  );
}

export function useContactDrawer() {
  return useContext(ContactDrawerContext);
}
