import { Elysia } from "elysia";

export const authMiddleware = new Elysia({ name: 'middleware.auth' })
  .derive(({ headers }) => {
    const userId = headers['x-user-id'];
    const userRole = headers['x-user-role'] as 'USER' | 'SUPERADMIN' | undefined;

    return {
      user: userId ? { id: userId, role: userRole || 'USER' } : null,
    };
  });
