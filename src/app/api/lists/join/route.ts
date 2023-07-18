import { NextResponse, NextRequest } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';
import { Community } from '@/types/community';
import { TwitterTokenResponse } from '@/types/API';
import { getToken } from 'next-auth/jwt';
import { conditionsValidator } from '@/lib/validate';
import { env } from '@/env.mjs';
import { get } from '@vercel/edge-config';
import { Redis } from '@upstash/redis';
import * as AccountsModel from '@/models/Accounts';
import * as ListMembersModel from '@/models/ListMembers';
import * as z from 'zod';
import { getBaseUrl } from '@/lib/utils';

// export const runtime = 'edge';

const resBuilder = (msg: string, status: number = 200) => {
  return NextResponse.json(
    {
      msg,
    },
    { status }
  );
};
const getTwitterClient = async (twiiterToken: TwitterTokenResponse) => {
  let twitterClient = new TwitterApi({
    clientId: env.TWITTER_CLIENT_ID,
    clientSecret: env.TWITTER_CLIENT_SECRET,
  });
  if (twiiterToken.expires_at * 1000 < Date.now()) {
    const {
      client: refreshedClient,
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn,
    } = await twitterClient.refreshOAuth2Token(twiiterToken.refresh_token);
    twitterClient = refreshedClient;
    // await redis.set(env.OAUTH_OFFICIAL_TWITTER_KEY, {
    await redis.json.set(
      env.OAUTH_OFFICIAL_TWITTER_KEY,
      '$',
      JSON.stringify({
        twitter_id: twiiterToken.twitter_id,
        expires_at: Date.now() / 1000 + expiresIn,
        access_token: accessToken,
        refresh_token: newRefreshToken,
      })
    );
  } else {
    // console.log('twitterClient access token', twiiterToken.access_token);
    twitterClient = new TwitterApi(twiiterToken.access_token);
  }
  return twitterClient;
};

const redis = new Redis({
  url: env.REDIS_URL,
  token: env.REDIS_TOKEN,
});

const schema = z.object({
  twitterListId: z.string(),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  // console.log('POST bilding twitter');
  try {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
    // console.log('token', token);
    if (!token) return NextResponse.redirect(getBaseUrl() + '/signin');
    const { user, expires_at, access_token } = token;
    if (Number(expires_at) * 1000 < Date.now())
      return NextResponse.redirect(getBaseUrl() + '/signin');

    const account = await AccountsModel.getAccountInfo(user.id);

    if (!account.address) {
      return resBuilder('You need to bind your wallet', 401);
    }

    const body = await req.json();
    const { twitterListId } = schema.parse(body);
    const community = await get<Community[]>('communities');

    const communityInfo = community?.find((c) => c.list === twitterListId);

    if (!communityInfo) return resBuilder('List not found', 404);

    // console.log('communityInfo', communityInfo);

    const member = await ListMembersModel.getMemberInfo(
      communityInfo.list,
      user.id
    );

    if (member) return resBuilder('You are already in the list', 400);

    let tokenId = undefined;
    for (let conditions of communityInfo.conditions) {
      const valid = await conditionsValidator(conditions, account.address);

      if (!valid.pass) {
        return resBuilder('You are not eligible for this list', 400);
      }

      if (valid.tokenId) {
        tokenId = valid.tokenId;
      }
    }
    // get access token from redis
    const twitterToken: TwitterTokenResponse = await redis.json.get(
      env.OAUTH_OFFICIAL_TWITTER_KEY
    );

    if (!twitterToken) return resBuilder('Something went wrong', 400);

    const twitterClient = await getTwitterClient(twitterToken);
    if (tokenId) {
      const prevMember = await ListMembersModel.getMemberInfoByTokenId(
        communityInfo.list,
        tokenId
      );

      if (prevMember && prevMember.twitterUserId) {
        const res = await twitterClient.v2.removeListMember(
          communityInfo.list,
          prevMember.twitterUserId
        );
        console.log('res', { res });
        if (res.errors) return resBuilder('Something went wrong', 400);
      }
      // else {
      // }
      // //TODO CASE ERC20:insert with out token id

      const res = await twitterClient.v2.addListMember(
        communityInfo.list,
        user.id
      );
      if (res.errors) return resBuilder('Something went wrong', 400);
      await ListMembersModel.upsertMember(
        communityInfo.list,
        user.id,
        user.name,
        tokenId
      );
    }

    return resBuilder(
      'Your application has been received, the process may take a while.',
      200
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: 'Something went wrong' }, { status: 400 });
  }
}
