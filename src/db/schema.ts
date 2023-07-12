import {
  mysqlTable,
  serial,
  varchar,
  index,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
export const accounts = mysqlTable(
  'accounts',
  {
    id: serial('id').primaryKey(),
    twitterId: varchar('twitter_id', { length: 100 }).unique(),
    twitterName: varchar('twitter_name', { length: 255 }),
    address: varchar('address', { length: 42 }),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updateAt: timestamp('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (account) => ({
    twitterIdIdx: index('twitter_id_idx').on(account.twitterId),
  })
);
