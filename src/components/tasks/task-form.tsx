"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { Task } from "@/types/task";
import {
  taskFormSchema,
  type TaskFormInput,
  type TaskFormValues,
} from "@/lib/validations/task";
import { createTask, updateTask } from "@/server/tasks/actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TaskFormProps = {
  task?: Task;
  onSuccess?: () => void;
};

export function TaskForm({ task, onSuccess }: TaskFormProps) {
  const id = useId();

  const form = useForm<TaskFormValues, unknown, TaskFormInput>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
    },
  });
  const { errors, isSubmitting } = form.formState;

  async function onSubmit(values: TaskFormInput) {
    const result = task
      ? await updateTask(task.id, values)
      : await createTask(values);

    if (!result.success) {
      toast.error(result.error);
      for (const [field, messages] of Object.entries(
        result.fieldErrors ?? {},
      )) {
        form.setError(field as keyof TaskFormInput, { message: messages?.[0] });
      }
      return;
    }

    toast.success(result.message);
    if (!task) form.reset();
    onSuccess?.();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor={`${id}-title`}>Título</FieldLabel>
          <Input
            id={`${id}-title`}
            placeholder="Ex.: Estudar algo"
            aria-invalid={!!errors.title}
            {...form.register("title")}
          />
          <FieldError errors={[errors.title]} />
        </Field>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor={`${id}-description`}>
            Descrição (opcional)
          </FieldLabel>
          <Textarea
            id={`${id}-description`}
            placeholder="Detalhes da tarefa"
            aria-invalid={!!errors.description}
            {...form.register("description")}
          />
          <FieldError errors={[errors.description]} />
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting
          ? "Salvando..."
          : task
            ? "Salvar alterações"
            : "Adicionar tarefa"}
      </Button>
    </form>
  );
}
