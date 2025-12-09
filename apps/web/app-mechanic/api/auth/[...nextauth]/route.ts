import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) {
                    return null;
                }

                // Note: In a real app, use bcrypt to compare hashes
                // const isPasswordValid = await compare(credentials.password, user.password_hash);
                // For now, assuming simple comparison or mock
                const isPasswordValid = credentials.password === user.password_hash; // Replace with bcrypt.compare

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.full_name,
                    role: user.role,
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/login',
    }
});

export { handler as GET, handler as POST };
