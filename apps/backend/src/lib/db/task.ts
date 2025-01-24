// import { PlanTemplateTask, Prisma, ReleasePlanTemplate } from "@prisma/client";
import { Prisma } from "../prisma/generated/client";
import { type Task, PrismaClient } from "../prisma/generated/client";
import { prisma } from "../prisma";

export type CreateTaskPayload = Pick<Task, "title" | "completed">;

export const createTask = async ({
  title,
  completed,
  ...rest
}: CreateTaskPayload) => {
  return prisma.task.create({
    data: {
      ...rest,
      title,
      completed: typeof completed === "undefined" ? false : completed,
    },
  });
};

export const updateTask = async (
  id: number,
  { title, completed, ...rest }: Partial<CreateTaskPayload>
) => {
  return prisma.task.update({
    where: {
      id,
    },
    data: {
      ...rest,
      title,
      completed,
    },
  });
};

export const getTask = async (id: number) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      completed: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getTasks = async ({
  page = 1,
  pageSize = 10,
  filter,
  orderBy,
}: {
  page?: number;
  pageSize?: number;
  filter?: Prisma.TaskWhereInput;
  orderBy?:
    | Prisma.TaskOrderByWithRelationInput
    | Prisma.TaskOrderByWithRelationInput[];
}) => {
  const skip = (page - 1) * pageSize;

  const [totalCount, tasks] = await prisma.$transaction([
    prisma.task.count({ where: filter }),
    prisma.task.findMany({
      where: filter,
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: orderBy,
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    tasks,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize,
      totalCount,
    },
  };
};

export const deleteTask = async (id: number) => {
  return prisma.task.delete({
    where: {
      id,
    },
  });
};
