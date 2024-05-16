import {createStore, useStore as useZustandStore} from 'zustand'

// Definios la estructura del estado nuestro formulario
export interface ConferenceForm {
    title: string
    conferenceType: string
    description: string
    creationDate: Date | string
    startDate: Date | string
    finishDate: Date | string
    mainArea: string
    secondaryArea: string

    // actions
    stepOne: (title: string, description: string) => void
}

// definimos la estructura de la store principal
export interface MainStore {
    conferenceForm: ConferenceForm
}

// definimosla funcion encarga de cargar los datos por defecto(para evitar errores de hidratación)
export const getDefaultInitialState = () =>{
    //"as const" significa que el objeto solo puede ser tratado como "read-only"
    return {
        conferenceForm: {
            title: 'Titulode ejemplo',
            conferenceType: '',
            description: '',
            creationDate:'',
            startDate: '',
            finishDate: '',
            mainArea: '',
            secondaryArea: '',
        }
    } as const
}

// el tipo será lo que la funcion intializeStore retorne.
export type MainStoreType = ReturnType<typeof initializeStore>

export const initializeStore = () =>{
    return createStore<MainStore>((set,get)=>({
            conferenceForm:{
                ...getDefaultInitialState().conferenceForm,
                stepOne: (t: string, desc: string) => set((state) => ({
                        conferenceForm:{
                            ...state.conferenceForm,
                            title: t,
                            description: desc,
                        }
                }))
            }

    }))
}