import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null, // { name, email, role }
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))