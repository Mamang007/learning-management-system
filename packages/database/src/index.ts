export * from "./db";
export * from "./schema";

import { users, accounts, sessions } from "./schema";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;
