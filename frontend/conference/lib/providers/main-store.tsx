'use client'

import React from 'react'

import { createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import {initializeStore, MainStoreType} from "@/lib/stores/store";

// paso 1: creamos un contexto, su estado inicial es null.
export const MainStoreContext =
	createContext<StoreApi<MainStoreType> | null>(null)

export const MainStoreProdiver = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const storeRef = useRef<MainStoreType>()

	// si no existe una store, vamos a crearla.
	if (!storeRef.current) {
		storeRef.current = initializeStore()
	}

	return (
		<MainStoreContext.Provider value={storeRef.current}>
			{children}
		</MainStoreContext.Provider>
	)
}

export const useMainStore = <T,>(
	selector: (store: MainStoreType) => T
): T => {
	const store = useContext(MainStoreContext)
	if (!store) {
		throw new Error(`useCounterStore must be use within CounterStoreProvider`)
	}

	return useStore(store, selector)
}

// TODO: aprender a fondo como funcionan las referencias en react: useRef.
// TODO: aprender a fondo como funciona el contexto en react.
