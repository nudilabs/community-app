import { eq, and, sql, isNull, or, gt } from 'drizzle-orm';
import { listMembers } from '@/db/schema';
// import { NewAccount } from '@/types/DB';
import { db } from '@/db/';
import { aw } from 'drizzle-orm/column.d-aa4e525d';

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

export const upsertMember = async (
  twitterListId: string,
  twitterId: string,
  tokenId: string
) => {
  await db
    .insert(listMembers)
    .values({
      twitterListId,
      twitterUserId: twitterId,
      tokenId,
    })
    .onDuplicateKeyUpdate({
      set: {
        twitterUserId: twitterId,
        updatedAt: sql`NOW()`,
      },
    });
};

//create function update row when duplicate key and insert new row
