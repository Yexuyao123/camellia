const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // create new task
  const newTask = await prisma.task.create({
    data: {
      title: "Learn Prisma with Supabase",
    },
  });

  console.log("Created Task:", newTask);

  // query all task
  const allTasks = await prisma.task.findMany();
  console.log("All Tasks:", allTasks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
