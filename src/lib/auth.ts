import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import authConfig from "./auth.config";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log('--- Auth Attempt ---');
                    console.log('Email:', credentials?.email);

                    const { email, password } = loginSchema.parse(credentials);

                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!user) {
                        console.log('User not found in DB');
                        return null;
                    }

                    console.log('User found, role:', user.role);
                    const isValidPassword = await bcrypt.compare(password, user.password);

                    if (!isValidPassword) {
                        console.log('Invalid password');
                        return null;
                    }

                    console.log('Auth successful!');
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error('Authorize error:', error);
                    return null;
                }
            },
        }),
    ],
});
