import "server-only";

import { auth } from "@clerk/nextjs/server";

// O userId sempre vem da sessão do Clerk, nunca de dados enviados pelo cliente.
export async function requireUserId(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Não autorizado: usuário não autenticado");
  }

  return userId;
}
