import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongo"

import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(clientPromise, {
    // Database name (default: 'next-auth')
    databaseName: 'main',
  }),

  callbacks: {
    async signIn({ account, profile }) {
        console.log(account)
        console.log(profile)

        return true
    }
  }
}

export default NextAuth(authOptions)