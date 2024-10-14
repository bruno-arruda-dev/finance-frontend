import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            console.log(user)
            console.log(account)
            console.log(profile)
            return true;
        },
        redirect: async ({ url, baseUrl }) => {
            if (url.startsWith('/dashboard')) {
                return url;
            }
            return baseUrl;
        },
    },
});
