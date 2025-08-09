"use server"
//Using NextAuth.js 
import { signIn, signOut } from '@/auth'

export const login = async (provider) => {
  await signIn(provider, { redirect: "/dashboard" });
}
export const logout = async () => {
  await signOut({ redirect: "/login" });
}