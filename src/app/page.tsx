import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { buttonVariants } from "@/components/ui/button";

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) {
    redirect("/tasks");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-xl flex-col items-center gap-8 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Organize suas tarefas
          </h1>
          <p className="text-muted-foreground">
            gerenciador de tarefas simples
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
            Criar conta
          </Link>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Entrar
          </Link>
        </div>
      </div>
    </main>
  );
}
