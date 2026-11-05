"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";

import type { Task } from "@/types/task";
import { TaskForm } from "@/components/tasks/task-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EditTaskDialogProps = {
  task: Task;
};

export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Editar tarefa" />
        }
      >
        <PencilIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>Altere o título ou a descrição.</DialogDescription>
        </DialogHeader>
        <TaskForm task={task} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
