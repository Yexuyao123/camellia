import { Elysia, t } from "elysia";
// import { PrismaClient } from "@prisma/client";
import { cors } from "@elysiajs/cors";
import taskRoutes from "@/src/routers/task";
import swagger from "@elysiajs/swagger";
import { logger } from "@bogeychan/elysia-logger";
import { GenericError, ValidationError } from "@/lib/errors";

const PORT = process.env.PORT || 3000;
const app = new Elysia()
  .error({ ValidationError, GenericError })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "ValidationError":
        set.status = 422;
        return { field: error.field, message: error.message };
      case "GenericError":
        return { message: error.message };
      default:
        break;
    }
  })
  .use(
    logger({
      level: "error",
      transport: {
        target: "pino-pretty",
        options: { colorize: true },
      },
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "Camellia",
          description: "API Documentation",
          version: "1.0.0",
        },
        tags: [{ name: "Plan", description: "Plan endpoints" }],
      },
    })
  )
  .use(cors())
  .use(taskRoutes)
  .get("/", () => ({ app: "Camellia API" }), {
    response: t.Object({
      app: t.String(),
    }),
    detail: {
      description: "The root endpoint",
      tags: ["App"],
    },
  })
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
