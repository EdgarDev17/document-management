import { createStore } from 'zustand/vanilla'

// estructura del formulario
export type NewConferenceFormState = {
	eventName: string
	eventDescription: string
	eventArea: string
	eventUrl: string
	startingDate: Date | null
	finishingDate: Date | null
	eventType: string
	eventAddress: string
	institutionId: string
	documentAttempt: number
	location: string
	urlConference: string
}

// acciones que modifican el estado del formulario
export type NewConferenceFormActions = {
	updateStepOne: (
		eventName: string,
		eventDescription: string,
		eventArea: string
	) => void
	updateStepTwo: (
		startingDate: Date,
		finishingDate: Date,
		eventUrl: string,
		eventAddress: string
	) => void

	updateStepThree: (institutionName: string) => void
	updateStepFour: (documentAttempt: number) => void
}

// Toma ambos types y los une en uno solo para conformar una store
export type NewConferenceFormStore = NewConferenceFormState &
	NewConferenceFormActions

export const defaultStateValues: NewConferenceFormState = {
	eventAddress: '',
	eventArea: '',
	eventDescription: '',
	eventName: '',
	eventType: '',
	eventUrl: '',
	finishingDate: null,
	startingDate: null,
	institutionId: '',
	location: '',
	urlConference: '',
	documentAttempt: 0,
}

export const initNewConferenceFormStore = (): NewConferenceFormState => {
	return defaultStateValues
}

export const createNewConferenceFormStore = (
	initialState: NewConferenceFormState = defaultStateValues
) => {
	return createStore<NewConferenceFormStore>()((set) => ({
		...initialState,
		updateStepOne: (
			pEventName: string,
			pEventDescription: string,
			pEventType: string
		) =>
			set((state) => ({
				eventName: pEventName,
				eventDescription: pEventDescription,
				eventType: pEventType,
			})),
		updateStepTwo: (
			pStartingDate: Date,
			pFinishingDate: Date,
			pEventUrl: string,
			pEventAddress: string
		) =>
			set((state) => ({
				startingDate: pStartingDate,
				finishingDate: pFinishingDate,
				eventUrl: pEventUrl,
				eventAddress: pEventAddress,
			})),
		updateStepThree: (pInstitutionName: string) =>
			set((state) => ({
				institutionId: pInstitutionName,
			})),
		updateStepFour: (pDocumentAttempt: number) =>
			set((state) => ({
				documentAttempt: pDocumentAttempt,
			})),
	}))
}
