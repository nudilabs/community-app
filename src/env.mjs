import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    TWITTER_CLIENT_ID: z.string().min(1),
    TWITTER_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_ALCHEMY_ID: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,

    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  },
});
