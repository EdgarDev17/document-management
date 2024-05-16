import { StateCreator } from 'zustand'


 type ConferenceForm = {
	title: string
	conferenceType: string
	description: string
	creationDate: Date | string
	startDate: Date | string
	finishDate: Date | string
}

export type ConferenceFormSliceActions =   {
	addConference: () => void
}

export type ConferenceFormSlice = ConferenceForm & ConferenceFormSliceActions


export const initialConferenceFormState: ConferenceForm = {
	title: '',
	conferenceType: '',
	description: '',
	creationDate: '',
	startDate: '',
	finishDate: '',
}

export const createConferenceFormSlice: StateCreator<ConferenceFormSlice> = (
	set
) => ({
	...initialConferenceFormState,
	addConference: () => set((state) => ({ title: 'hola' })),
})
