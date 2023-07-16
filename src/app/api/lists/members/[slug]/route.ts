import { NextResponse } from 'next/server';
import * as ListMembersModel from '@/models/ListMembers';
import * as AccountsModel from '@/models/Accounts';

const resBuilder = (data: any, status: number = 200) => {
  if (status === 200) {
    return NextResponse.json(data, { status });
  }
  return NextResponse.json({ error: data }, { status });
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const count = searchParams.get('countOnly');
  const listId = params.slug;

  if (!listId) {
    return resBuilder('Missing list id', 400);
  }

  const members = await ListMembersModel.getMembersFromList(listId);

  if (!members || members.length === 0) {
    return resBuilder('List not found', 404);
  }

  const accountInfoPromises = members.map(async (member) => {
    const accountInfo = await AccountsModel.getAccountInfo(member.twitterId);
    return { ...member, accountInfo };
  });

  const membersWithAccountInfo = await Promise.all(accountInfoPromises);
  console.log('count:', count);
  if (count) {
    return resBuilder({ count: members.length });
  }
  return resBuilder({ members: membersWithAccountInfo, count: members.length });
}
