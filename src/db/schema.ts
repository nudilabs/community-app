import {
  mysqlTable,
  serial,
  varchar,
  int,
  datetime,
  decimal,
  boolean,
  index,
  timestamp,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const supportChains = mysqlTable(
  "support_chains",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (chain) => ({
    nameIdx: index("name_idx").on(chain.name),
  })
);
