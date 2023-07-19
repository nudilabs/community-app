import { eq, and, sql, isNull, or, gt } from 'drizzle-orm';
import { listMembers } from '@/db/schema';
import { newMember } from '@/types/DB';
import { db } from '@/db/';

export const getMemberInfo = async (
  twitterListId: string,
  twitterId: string
) => {
  const member = await db
    .select()
    .from(listMembers)
    .where(
      and(
        eq(listMembers.twitterUserId, twitterId),
        eq(listMembers.twitterListId, twitterListId)
      )
    );
  return member[0];
};

export const getMemberInfoByTokenId = async (
  twitterListId: string,
  tokenId: string
) => {
  const member = await db

    .select()
    .from(listMembers)
    .where(
      and(
        eq(listMembers.tokenId, tokenId),
        eq(listMembers.twitterListId, twitterListId)
      )
    );
  return member[0];
};

export const upsertMembers = async (members: newMember[]) => {
  await db
    .insert(listMembers)
    .values(members)
    .onDuplicateKeyUpdate({
      set: {
        twitterUserId: sql`VALUES(twitter_user_id)`,
        twitterName: sql`VALUES(twitter_name)`,
        updatedAt: sql`NOW()`,
      },
    });
};

//create function update row when duplicate key and insert new row
