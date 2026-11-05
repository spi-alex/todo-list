"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TasksError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Não foi possível carregar as tarefas</CardTitle>
          <CardDescription>
            Verifique se o banco de dados está rodando e tente de novo.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={reset}>Tentar novamente</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
