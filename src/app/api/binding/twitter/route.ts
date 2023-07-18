import { NextResponse, NextRequest } from 'next/server';
import { recoverMessageAddress } from 'viem';
import { getToken } from 'next-auth/jwt';
import * as AccountsModel from '@/models/Accounts';
import { env } from '@/env.mjs';
import * as z from 'zod';
import { getBaseUrl } from '@/lib/utils';

const schema = z.object({
  signature: z.string(),
});

export const runtime = 'edge';

export async function POST(req: NextRequest): Promise<NextResponse> {
  // console.log('POST bilding twitter');
  try {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
    if (!token) {
      const loginUrl = new URL('/signin', req.url);
      loginUrl.searchParams.set('from', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    const { user } = token;
    const body = await req.json();
    const { signature } = schema.parse(body);
    const address = await recoverMessageAddress({
      message: `Binding wallet with ID: ${user.id}`,
      signature: `0x${signature.slice(2)}`,
    });

    await AccountsModel.upsertAccount({
      twitterId: user.id,
      address,
    });
    return NextResponse.json({
      bindWallet: address,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 400 });
  }
}
