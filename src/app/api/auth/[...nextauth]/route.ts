import NextAuth, { NextAuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { env } from '@/env.mjs';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: env.SESSION_SECRET,
  providers: [
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
      version: '2.0',
      authorization: {
        params: { scope: 'tweet.read users.read follows.read offline.access' },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      // Initial sign in
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        try {
          const queryParams = new URLSearchParams({
            client_id: env.TWITTER_CLIENT_ID,
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token,
          });

          const response = await fetch(
            'https://api.twitter.com/oauth2/token?' + queryParams,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          const tokens = await response.json();

          if (response.status !== 200) {
            throw tokens;
          }
          // const refreshedTokens = data;
          return {
            ...token,
            accessToken: tokens.access_token,
            accessTokenExpires: Date.now() + tokens.expires_in * 1000,
            refreshToken: tokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
          };
        } catch (error) {
          console.error('Error refreshing access token', error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
