export * from "./db";
export * from "./schema";

import { users, accounts, sessions, products, webinars, courses, digitalDownloads, courseSections, courseLessons, productResources } from "./schema";

// User Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;

// Product Types
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Webinar = typeof webinars.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type DigitalDownload = typeof digitalDownloads.$inferSelect;

// Relational Types
export type CourseSection = typeof courseSections.$inferSelect;
export type CourseLesson = typeof courseLessons.$inferSelect;
export type ProductResource = typeof productResources.$inferSelect;
