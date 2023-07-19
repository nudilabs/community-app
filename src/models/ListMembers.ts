import { eq, desc, and, sql } from 'drizzle-orm';
import { listMembers } from '@/db/schema';
// import { NewAccount } from '@/types/DB';
import { db } from '@/db/';

export const getMembersFromList = async (
  twitterListId: string,
  limit: number
) => {
  const members: any[] = await db
    .select()
    .from(listMembers)
    .where(eq(listMembers.twitterListId, twitterListId))
    .limit(limit);

  return members;
};

export const getTopLists = async (limit?: number) => {
  let query = db
    .select({
      twitterListId: listMembers.twitterListId,
      memberCount: sql<number>`COUNT(*)`,
    })
    .from(listMembers)
    .groupBy(listMembers.twitterListId)
    .orderBy(desc(sql`2`));

  if (limit) {
    query = query.limit(limit);
  }

  const lists = await query;

  return lists;
};

export const getRecentLists = async (limit?: number) => {
  let query = db
    .select({
      twitterListId: listMembers.twitterListId,
      createdAt: sql`MAX(${listMembers.createdAt})`,
    })
    .from(listMembers)
    .groupBy(listMembers.twitterListId)
    .orderBy(desc(sql`MAX(${listMembers.createdAt})`));

  if (limit) {
    query = query.limit(limit);
  }

  const lists = await query;

  return lists;
};

export const getRecentMembersFromList = async (
  twitterListId: string,
  limit: number
) => {
  const members: any[] = await db
    .select()
    .from(listMembers)
    .where(eq(listMembers.twitterListId, twitterListId))
    .orderBy(desc(listMembers.updatedAt))
    .limit(limit);
  return members;
};

export const getMembersCountFromList = async (twitterListId: string) => {
  const members: any[] = await db
    .select({
      count: sql<number>`count(twitter_user_id)`,
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
