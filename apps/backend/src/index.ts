import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { authMiddleware } from "./middleware/auth";
import { catalogueModule } from "./modules/catalogue/catalogue.controller";
import { usersModule } from "./modules/users/users.controller";
import { adminModule } from "./modules/admin/admin.controller";

const port = process.env.PORT || 3001;

const app = new Elysia()
  .use(openapi({
    path: '/docs',
    documentation: {
      info: {
        title: 'LMS API Documentation',
        version: '1.0.0',
        description: 'API for the Learning Management System'
      }
    }
  }))
  .use(authMiddleware)
  .group('/api', (app) => 
    app
      .use(catalogueModule)
      .use(usersModule)
      .use(adminModule)
  )
  .get("/", () => ({
    message: "LMS API is running",
    docs: "/docs"
  }))
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log(`📑 Documentation available at http://localhost:${port}/docs`);
