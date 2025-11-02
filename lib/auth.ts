import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      authorization: {
        params: {
          redirect_uri: process.env.AUTH_URL 
            ? `${process.env.AUTH_URL}/api/auth/callback/github`
            : undefined,
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user?.email) return false
        let org = await prisma.organization.findFirst()
        if (!org) {
          org = await prisma.organization.create({ data: { name: 'Default Org' } })
        }
        const existing = await prisma.user.findUnique({ where: { email: user.email } })
        if (!existing) {
          await prisma.user.create({
            data: { email: user.email, name: user.name ?? null, role: 'member', orgId: org.id },
          })
        }
        return true
      } catch (e) {
        return false
      }
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email
      return token
    },
    async session({ session, token }) {
      if (session.user && token?.email) {
        session.user.email = token.email as string
      }
      return session
    },
  },
})
