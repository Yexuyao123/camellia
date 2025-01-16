import Elysia, { t } from "elysia";
import {
  createTask,
  updateTask,
  getTask,
  getTasks,
  deleteTask,
} from "@/lib/db/task";
import { ERRORS } from "@/lib/errors";

export default new Elysia({ prefix: "/tasks" })
  .get(
    "/",
    async ({ query }) => {
      const page = query.page || 1;
      const pageSize = query.pageSize || 10;

      return await getTasks({
        page,
        pageSize,
      });
    },
    {
      query: t.Object({
        page: t.Optional(t.Numeric()),
        pageSize: t.Optional(t.Numeric()),
        dateSort: t.Optional(t.String()),
        statusFilter: t.String(),
      }),
    }
  )
  .get(
    "/:id",
    async ({ params: { id } }) => {
      return getTask(id);
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ body, params: { id } }) => {
      const data = await getTask(id);
      if (!data?.title) {
        throw new Error(ERRORS.PLAN_TASK.INVALID_TASK_ID);
      }
      return updateTask(id, body);
    },
    {
      body: t.Partial(
        t.Object({
          title: t.Optional(t.String()),
          completed: t.Optional(t.Boolean()),
        })
      ),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post(
    "/create",
    async ({ body }) => {
      const { title } = body;
      const completed: boolean =
        String(body.completed) === "undefined" ||
        typeof body.completed === "undefined"
          ? false
          : body.completed;

      return await createTask({ title, completed });
    },
    {
      body: t.Object({
        title: t.String(),
        completed: t.Optional(t.Boolean()),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const data = await getTask(id);
      if (!data?.title) {
        throw new Error(ERRORS.PLAN_TASK.INVALID_TASK_ID);
      }
      return deleteTask(id);
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
