import { Elysia } from "elysia";
import { db, users, products } from "../../db";
import { count } from "drizzle-orm";

export const adminModule = new Elysia({ prefix: '/admin' })
  .guard({
    beforeHandle: ({ user, set }) => {
      if (user?.role !== 'SUPERADMIN') {
        set.status = 403;
        return { error: 'Forbidden: Superadmin only' };
      }
    }
  }, (app) => 
    app
      .get('/stats', async () => {
        const [userCount] = await db.select({ value: count() }).from(users);
        const [productCount] = await db.select({ value: count() }).from(products);
        
        return {
          totalUsers: userCount.value,
          totalProducts: productCount.value
        };
      }, {
        detail: {
          summary: 'Get platform statistics',
          tags: ['Admin', 'Stats']
        }
      })
      .get('/users', async () => {
        return await db.select().from(users);
      }, {
        detail: {
          summary: 'List all users',
          tags: ['Admin', 'Users']
        }
      })
  );
