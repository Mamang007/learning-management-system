import { Elysia } from "elysia";

export const usersModule = new Elysia({ prefix: '/users' })
  .guard({
    beforeHandle: ({ user, set }) => {
      if (!user) {
        set.status = 401;
        return { error: 'Unauthorized' };
      }
    }
  }, (app) => 
    app.get('/me', ({ user }) => user, {
      detail: {
        summary: 'Get current logged-in user',
        tags: ['User', 'Profile']
      }
    })
  );
