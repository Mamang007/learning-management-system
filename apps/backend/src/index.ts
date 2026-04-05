import { Elysia } from "elysia";

const port = process.env.PORT || 3001;

const app = new Elysia()
  .derive(({ headers }) => {
    const userId = headers['x-user-id'];
    const userRole = headers['x-user-role'];
    return {
      user: userId ? { id: userId, role: userRole || 'USER' } : null,
    };
  })
  .get("/", () => "Hello Elysia")
  .get("/me", ({ user }) => user || { error: "Unauthorized" })
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
