import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Carrega a string de conexão do ambiente (ou usa o padrão local se não definida)
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://todo:todo@localhost:5432/todo_list?schema=public";

// 2. Configura o pool do PG e o adapter do Prisma
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Criando tarefa de teste...");

  const task = await prisma.task.create({
    data: {
      title: "Minha primeira tarefa no Docker",
      description: "Testando a integração da Fase 1",
      userId: "user_test_123", // ID de teste simulando o Clerk
    },
  });

  console.log("Tarefa criada com sucesso:");
  console.dir(task, { depth: null });

  const tasks = await prisma.task.findMany();
  console.log("\nTodas as tarefas atualmente no banco:");
  console.dir(tasks, { depth: null });
}

main()
  .catch((e) => {
    console.error("Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Fecha o pool do PG ao finalizar
  });