import { Elysia, t } from "elysia";
import { db, products, webinars, courses, digitalDownloads, courseSections, courseLessons, productResources } from "../../db";
import { eq } from "drizzle-orm";

export const catalogueModule = new Elysia({ prefix: '/catalogue' })
  .get('/', async () => {
    return await db.select().from(products);
  }, {
    detail: {
      summary: 'List all products',
      tags: ['Public', 'Catalogue']
    }
  })
  .get('/:slug', async ({ params, set }) => {
    const { slug } = params;
    
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug));

    if (!product) {
      set.status = 404;
      return { error: 'Product not found' };
    }

    let details: any = { ...product };

    if (product.type === 'WEBINAR') {
      const [webinar] = await db
        .select()
        .from(webinars)
        .where(eq(webinars.productId, product.id));
      details.webinar = webinar;
    } else if (product.type === 'COURSE') {
      const sections = await db
        .select()
        .from(courseSections)
        .where(eq(courseSections.courseId, product.id))
        .orderBy(courseSections.order);
      
      const sectionsWithLessons = await Promise.all(
        sections.map(async (section) => {
          const lessons = await db
            .select()
            .from(courseLessons)
            .where(eq(courseLessons.sectionId, section.id))
            .orderBy(courseLessons.order);
          return { ...section, lessons };
        })
      );
      details.sections = sectionsWithLessons;
    } else if (product.type === 'DIGITAL_DOWNLOAD') {
      const resources = await db
        .select()
        .from(productResources)
        .where(eq(productResources.productId, product.id));
      details.resources = resources;
    }

    return details;
  }, {
    params: t.Object({
      slug: t.String()
    }),
    detail: {
      summary: 'Get product detail by slug',
      tags: ['Public', 'Catalogue']
    }
  });
