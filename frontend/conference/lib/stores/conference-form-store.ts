import { createStore } from "zustand/vanilla";

// estructura del formulario
export type NewConferenceFormState = {
  eventName: string;
  eventDescription: string;
  eventArea: string;
  startingDate: Date | null;
  finishingDate: Date | null;
  eventType: string;
  eventAddress: string;
  institutionId: string;
  documentAttempt: number;
};

// acciones que modifican el estado del formulario
export type NewConferenceFormActions = {
  updateStepOne: (
    eventName: string,
    eventDescription: string,
    eventArea: string,
  ) => void;
  updateStepTwo: (
    startingDate: Date,
    finishingDate: Date,
    eventType: string,
    eventAddress: string,
  ) => void;

  updateStepThree: (institutionName: string, paperAttempts: number) => void;
};

// Toma ambos types y los une en uno solo para conformar una store
export type NewConferenceFormStore = NewConferenceFormState &
  NewConferenceFormActions;

export const defaultStateValues: NewConferenceFormState = {
  eventAddress: "",
  eventArea: "",
  eventDescription: "",
  eventName: "",
  eventType: "",
  finishingDate: null,
  startingDate: null,
  institutionId: "",
  documentAttempt: 1,
};

export const initNewConferenceFormStore = (): NewConferenceFormState => {
  return defaultStateValues;
};

export const createNewConferenceFormStore = (
  initialState: NewConferenceFormState = defaultStateValues,
) => {
  return createStore<NewConferenceFormStore>()((set) => ({
    ...initialState,
    updateStepOne: (
      pEventName: string,
      pEventDescription: string,
      pEventArea: string,
    ) =>
      set((state) => ({
        eventName: pEventName,
        eventDescription: pEventDescription,
        eventArea: pEventArea,
      })),
    updateStepTwo: (
      pStartingDate: Date,
      pFinishingDate: Date,
      pEventType: string,
      pEventAddress: string,
    ) =>
      set((state) => ({
        startingDate: pStartingDate,
        finishingDate: pFinishingDate,
        eventType: pEventType,
        eventAddress: pEventAddress,
      })),
    updateStepThree: (pInstitutionName: string, pPaperAttemps: number) =>
      set((state) => ({
        institutionId: pInstitutionName,
        documentAttempt: pPaperAttemps,
      })),
  }));
};
