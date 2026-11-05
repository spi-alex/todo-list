"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { Task } from "@/types/task";
import { setTaskCompleted } from "@/server/tasks/actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteTaskDialog } from "@/components/tasks/delete-task-dialog";
import { EditTaskDialog } from "@/components/tasks/edit-task-dialog";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Fortaleza",
});

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const [isPending, startTransition] = useTransition();

  function handleToggle(checked: boolean) {
    startTransition(async () => {
      const result = await setTaskCompleted(task.id, checked);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Card size="sm">
      <CardContent className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggle}
          disabled={isPending}
          aria-label={task.completed ? "Reabrir tarefa" : "Concluir tarefa"}
          className="mt-1"
        />

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={cn(
                "font-medium break-words",
                task.completed && "text-muted-foreground line-through",
              )}
            >
              {task.title}
            </p>
            <Badge variant={task.completed ? "secondary" : "outline"}>
              {task.completed ? "Concluída" : "Pendente"}
            </Badge>
          </div>

          {task.description && (
            <p className="text-sm break-words text-muted-foreground">
              {task.description}
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Criada em {dateFormat.format(task.createdAt)}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          <EditTaskDialog task={task} />
          <DeleteTaskDialog task={task} />
        </div>
      </CardContent>
    </Card>
  );
}
