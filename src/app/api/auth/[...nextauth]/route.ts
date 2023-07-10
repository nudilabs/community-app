import NextAuth, { NextAuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
// import axios from 'axios';
// import ENV from '@/utils/ENV';
import { env } from '@/env.mjs';

// Helper to obtain a new access_token from a refresh token.
async function refreshAccessToken(token: any) {
  console.log('refreshAccessToken', token);
  try {
    const queryParams = new URLSearchParams({
      client_id: env.TWITTER_CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
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
    const data = await response.json();
    if (response.status !== 200) {
      throw data;
    }
    const refreshedTokens = data;
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
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
    async jwt({ token, account }) {
      // Initial sign in
      if (account && account.expires_at) {
        // console.log('jwt', { token, account });
        const user = {
          id: account.providerAccountId,
          name: token.name,
          image: token.picture,
        };
        return {
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + account.expires_at),
          refresh_token: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (token && Date.now() < Number(token.expires_at) * 1000) {
        // console.log('not refresh token');
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
        session.error = token.error;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
