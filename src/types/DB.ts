import { InferModel } from 'drizzle-orm';
import { accounts } from '@/db/schema';
export type Account = InferModel<typeof accounts, 'select'>;
export type NewAccount = InferModel<typeof accounts, 'insert'>;
