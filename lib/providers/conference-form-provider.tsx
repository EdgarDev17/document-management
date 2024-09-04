// src/providers/counter-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type NewConferenceFormStore,
  createNewConferenceFormStore,
} from "@/lib/stores/conference-form-store";

export type NewConferenceStoreApi = ReturnType<
  typeof createNewConferenceFormStore
>;

export const NewConferenceStoreContext = createContext<
  NewConferenceStoreApi | undefined
>(undefined);

export interface NewConferenceProviderProps {
  children: ReactNode;
}

export const NewConferenceStoreProvider = ({
  children,
}: NewConferenceProviderProps) => {
  const storeRef = useRef<NewConferenceStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createNewConferenceFormStore();
  }

  return (
    <NewConferenceStoreContext.Provider value={storeRef.current}>
      {children}
    </NewConferenceStoreContext.Provider>
  );
};

export const useNewConferenceFormStore = <T,>(
  selector: (store: NewConferenceFormStore) => T,
): T => {
  const newConferenceStoreContext = useContext(NewConferenceStoreContext);

  if (!newConferenceStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(newConferenceStoreContext, selector);
};
