import { TaskForm } from "@/components/tasks/task-form";
import { TaskList } from "@/components/tasks/task-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTasks } from "@/server/tasks/queries";

export default async function TasksPage() {
  const tasks = await getTasks();

  const pending = tasks.filter((task) => !task.completed).length;
  const completed = tasks.length - pending;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 p-4 sm:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Minhas tarefas</h1>
        <p className="text-sm text-muted-foreground">
          {pending} pendente(s) · {completed} concluída(s)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nova tarefa</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm />
        </CardContent>
      </Card>

      <TaskList tasks={tasks} />
    </main>
  );
}
