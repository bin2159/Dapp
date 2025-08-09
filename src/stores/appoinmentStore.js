import { create } from 'zustand'

export const useAppointmentStore = create((set) => ({
  selectedAppointment: null,
  setSelectedAppointment: (appt) => set({ selectedAppointment: appt }),
}))
