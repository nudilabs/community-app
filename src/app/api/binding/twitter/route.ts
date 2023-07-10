// import { NextResponse, NextRequest } from 'next/server';
// import { recoverMessageAddress } from 'viem';
// import * as z from 'zod';

// export const runtime = 'edge';

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   console.log('POST bilding twitter');
//   // console.log("req", await req.json());
//   const schema = z.object({
//     signature: z.string().min(1),
//   });
//   try {
//     const { userId } = auth();
//     if (!userId) return NextResponse.redirect('/sign-in');
//     const body = await req.json();
//     const { signature } = schema.parse(body);
//     const userData = await clerkClient.users.getUser(userId);
//     const twitterId = userData.externalAccounts.find(
//       (account) => account.provider === 'oauth_twitter'
//     )?.externalId;
//     const address = await recoverMessageAddress({
//       message: `Binding wallet with ID: ${twitterId}`,
//       signature: `0x${signature.slice(2)}`,
//     });
//     console.log('twitterId', twitterId);
//     console.log('signature', signature);
//     console.log('address', address);

//     const param = {
//       publicMetadata: {
//         bindWallet: address,
//       },
//     };
//     const user = await clerkClient.users.updateUser(userId, param);
//     // console.log("Wallet address updated:", user.publicMetadata);

//     return NextResponse.json({
//       bindWallet: user.publicMetadata.bindWallet,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({}, { status: 400 });
//   }
// }
