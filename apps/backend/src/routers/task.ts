import { Elysia } from "elysia";
// import { auth } from "@/plugins/auth";
import planTasksRoutes from "./plan/task-controller";

export default new Elysia({ prefix: "/plan", detail: { tags: ["Plan"] } })
  // .use(auth({ adminOnly: true }))
  .use(planTasksRoutes);
