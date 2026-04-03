import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";

async function seed() {
  // Read the desired Superadmin email from environment variables
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error("❌ ADMIN_EMAIL environment variable is not set. Please add it to your .env file.");
    process.exit(1);
  }

  console.log(`🌱 Attempting to seed SUPERADMIN role for: ${adminEmail}`);

  try {
    // Forcefully update the user's role in the database
    // We update rather than create, because OAuth creation is complex
    const result = await db
      .update(users)
      .set({ role: "SUPERADMIN" })
      .where(eq(users.email, adminEmail))
      .returning();

    if (result.length > 0) {
      console.log(`✅ Success: User ${adminEmail} is now a SUPERADMIN.`);
    } else {
      console.log(`⚠️ User not found.`);
      console.log(`👉 You must log in via Google OAuth on the Frontend first to create the initial user record.`);
    }
  } catch (error) {
    console.error("❌ Error running seed script:", error);
  } finally {
    process.exit(0);
  }
}

seed();
