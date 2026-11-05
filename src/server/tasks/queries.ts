import "server-only";

import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Tarefas do usuário logado, mais novas primeiro.
export async function getTasks() {
  const userId = await requireUserId();

  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
