import { TwitterApi } from 'twitter-api-v2';
import { env } from '@/env.mjs';

export const twitterClient = new TwitterApi({
  clientId: env.TWITTER_CLIENT_ID,
  clientSecret: env.TWITTER_CLIENT_SECRET,
});
