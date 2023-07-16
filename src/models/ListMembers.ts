import { eq, and, sql, isNull, or, gt } from 'drizzle-orm';
import { listMembers } from '@/db/schema';
// import { NewAccount } from '@/types/DB';
import { db } from '@/db/';
import { aw } from 'drizzle-orm/column.d-aa4e525d';

export const getMembersFromList = async (twitterListId: string) => {
  const members: any[] = await db
    .select({
      twitterId: listMembers.twitterUserId,
      tokenId: listMembers.tokenId,
      updatedAt: listMembers.updatedAt,
    })
    .from(listMembers)
    .where(eq(listMembers.twitterListId, twitterListId));

  return members;
};

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
  twitterName: string,
  tokenId: string
) => {
  await db
    .insert(listMembers)
    .values({
      twitterListId,
      twitterUserId: twitterId,
      twitterName,
      tokenId,
    })
    .onDuplicateKeyUpdate({
      set: {
        twitterUserId: twitterId,
        twitterName: twitterName,
        updatedAt: sql`NOW()`,
      },
    });
};

//create function update row when duplicate key and insert new row
