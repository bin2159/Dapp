import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import api from "@/lib/api"
export const {handlers, signIn, signOut} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(profile) {
      try {
        const { data } = await api.post("/api/auth/google", profile)
        if (data) {
          return true
        }
        return true
      } catch (error) {
        return false
      }
    },
  },
})