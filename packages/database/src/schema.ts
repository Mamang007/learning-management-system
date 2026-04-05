import { pgTable, text, timestamp, pgEnum, primaryKey, integer, jsonb } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["USER", "SUPERADMIN"]);
export const productTypeEnum = pgEnum("product_type", ["DIGITAL_DOWNLOAD", "WEBINAR", "COURSE"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").default("USER").notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

// Base Product Table
export const products = pgTable("product", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  type: productTypeEnum("type").notNull(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: jsonb("description"), // Rich-text JSON
  price: integer("price").notNull(), // Store in cents
  coverImage: text("cover_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Digital Downloads Extension
export const digitalDownloads = pgTable("digital_download", {
  productId: text("product_id").primaryKey().references(() => products.id, { onDelete: "cascade" }),
});

export const productResources = pgTable("product_resource", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
});

// Webinars Extension
export const webinars = pgTable("webinar", {
  productId: text("product_id").primaryKey().references(() => products.id, { onDelete: "cascade" }),
  scheduledAt: timestamp("scheduled_at").notNull(),
});

// Courses Extension
export const courses = pgTable("course", {
  productId: text("product_id").primaryKey().references(() => products.id, { onDelete: "cascade" }),
});

export const courseSections = pgTable("course_section", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  courseId: text("course_id").notNull().references(() => courses.productId, { onDelete: "cascade" }),
  title: text("title").notNull(),
  order: integer("order").notNull(),
});

export const courseLessons = pgTable("course_lesson", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sectionId: text("section_id").notNull().references(() => courseSections.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: jsonb("description"),
  videoUrl: text("video_url"),
  order: integer("order").notNull(),
});
