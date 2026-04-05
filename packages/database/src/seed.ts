import { eq } from "drizzle-orm";
import { db } from "./db";
import { 
  users, 
  products, 
  webinars, 
  courses, 
  courseSections, 
  courseLessons, 
  digitalDownloads, 
  productResources 
} from "./schema";

async function seed() {
  // 1. Seed Superadmin
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    console.log(`🌱 Seeding SUPERADMIN: ${adminEmail}`);
    await db.update(users).set({ role: "SUPERADMIN" }).where(eq(users.email, adminEmail));
  }

  // 2. Seed Catalogue
  console.log("🌱 Seeding Product Catalogue...");

  try {
    // Clear existing products (optional, but good for clean seed)
    // await db.delete(products); 

    // --- DIGITAL DOWNLOAD ---
    const [downloadProduct] = await db.insert(products).values({
      type: "DIGITAL_DOWNLOAD",
      title: "Creator's Ultimate Toolkit",
      slug: "creators-ultimate-toolkit",
      description: {
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "A comprehensive set of templates and resources for modern creators." }] }]
      },
      price: 4900, // $49.00
      coverImage: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1000&auto=format&fit=crop",
    }).returning();

    await db.insert(digitalDownloads).values({ productId: downloadProduct.id });
    await db.insert(productResources).values([
      { productId: downloadProduct.id, title: "Social Media Calendar Template", url: "https://example.com/files/calendar.pdf" },
      { productId: downloadProduct.id, title: "Budgeting Spreadsheet", url: "https://example.com/files/budget.xlsx" },
    ]);

    // --- WEBINAR ---
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const [webinarProduct] = await db.insert(products).values({
      type: "WEBINAR",
      title: "Mastering Personal Branding 2026",
      slug: "mastering-personal-branding-2026",
      description: {
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "Join our live session to learn how to build a brand that lasts." }] }]
      },
      price: 2900, // $29.00
      coverImage: "https://images.unsplash.com/photo-1540575861501-7ad0582373f2?q=80&w=1000&auto=format&fit=crop",
    }).returning();

    await db.insert(webinars).values({
      productId: webinarProduct.id,
      scheduledAt: nextWeek,
    });

    // --- COURSE ---
    const [courseProduct] = await db.insert(products).values({
      type: "COURSE",
      title: "NextJS 16 Deep Dive",
      slug: "nextjs-16-deep-dive",
      description: {
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "From zero to hero in the latest version of NextJS." }] }]
      },
      price: 9900, // $99.00
      coverImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop",
    }).returning();

    await db.insert(courses).values({ productId: courseProduct.id });

    const [section1] = await db.insert(courseSections).values({
      courseId: courseProduct.id,
      title: "Getting Started",
      order: 1,
    }).returning();

    await db.insert(courseLessons).values([
      { sectionId: section1.id, title: "Introduction to NextJS 16", order: 1, videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ" },
      { sectionId: section1.id, title: "Environment Setup", order: 2, videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ" },
    ]);

    const [section2] = await db.insert(courseSections).values({
      courseId: courseProduct.id,
      title: "Advanced Routing",
      order: 2,
    }).returning();

    await db.insert(courseLessons).values([
      { sectionId: section2.id, title: "Parallel Routes", order: 1, videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ" },
      { sectionId: section2.id, title: "Intercepting Routes", order: 2, videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ" },
    ]);

    console.log("✅ Catalogue seeded successfully!");
  } catch (error) {
    console.error("❌ Error running seed script:", error);
  } finally {
    process.exit(0);
  }
}

seed();
