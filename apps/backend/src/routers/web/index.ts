import { Elysia } from "elysia";
// import { auth } from "@/plugins/auth";
import planTasksRoutes from "../plan/task-controller";

export default new Elysia({ prefix: "/web", detail: { tags: ["Web"] } })
  // .use(auth({ adminOnly: true }))
  .use(planTasksRoutes);
