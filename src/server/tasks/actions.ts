"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";
import { taskFormSchema, taskIdSchema } from "@/lib/validations/task";
import type { ActionResult } from "@/types/action-result";
import type { Task } from "@/types/task";
import type { TaskFormInput } from "@/lib/validations/task";

/**
 * Criar tarefa do usuário logado.
 */
export async function createTask(
  input: TaskFormInput
): Promise<ActionResult<Task>> {
  try {
    const userId = await requireUserId();

    // 1. Validar a entrada com Zod
    const validation = taskFormSchema.safeParse(input);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      return {
        success: false,
        error: "Dados inválidos fornecidos.",
        fieldErrors, // Passa diretamente o objeto do Zod (já está no formato correto)
      };
    }

    // 2. Persistir no banco de dados
    const task = await prisma.task.create({
      data: {
        title: validation.data.title,
        description: validation.data.description,
        userId,
      },
    });

    // 3. Revalidar a rota da listagem e retornar
    revalidatePath("/tasks");
    return {
      success: true,
      message: "Tarefa criada com sucesso!",
      data: task,
    };
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return {
      success: false,
      error: "Ocorreu um erro ao criar a tarefa. Tente novamente.",
    };
  }
}

/**
 * Atualizar título/descrição de uma tarefa do usuário logado.
 */
export async function updateTask(
  id: string,
  input: TaskFormInput
): Promise<ActionResult<Task>> {
  try {
    const userId = await requireUserId();

    // 1. Validar o ID e os dados da tarefa
    const idValidation = taskIdSchema.safeParse(id);
    const formValidation = taskFormSchema.safeParse(input);

    if (!idValidation.success || !formValidation.success) {
      return {
        success: false,
        error: "Dados inválidos para atualização.",
      };
    }

    // 2. Verificar existência da tarefa filtrando por id E userId
    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return {
        success: false,
        error: "Tarefa não encontrada.",
      };
    }

    // 3. Atualizar a tarefa
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: formValidation.data.title,
        description: formValidation.data.description,
      },
    });

    revalidatePath("/tasks");
    return {
      success: true,
      message: "Tarefa atualizada com sucesso!",
      data: updatedTask,
    };
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return {
      success: false,
      error: "Ocorreu um erro ao atualizar a tarefa.",
    };
  }
}

/**
 * Marcar como concluída (completed = true) ou reabrir (false).
 */
export async function setTaskCompleted(
  id: string,
  completed: boolean
): Promise<ActionResult<Task>> {
  try {
    const userId = await requireUserId();

    // 1. Validar o ID
    const idValidation = taskIdSchema.safeParse(id);
    if (!idValidation.success) {
      return {
        success: false,
        error: "ID de tarefa inválido.",
      };
    }

    // 2. Garantir que a tarefa pertence ao usuário antes de alterar
    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return {
        success: false,
        error: "Tarefa não encontrada.",
      };
    }

    // 3. Atualizar status
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed },
    });

    revalidatePath("/tasks");
    return {
      success: true,
      message: completed ? "Tarefa concluída!" : "Tarefa reaberta!",
      data: updatedTask,
    };
  } catch (error) {
    console.error("Erro ao alterar status da tarefa:", error);
    return {
      success: false,
      error: "Ocorreu um erro ao alterar o status da tarefa.",
    };
  }
}

/**
 * Excluir uma tarefa do usuário logado.
 */
export async function deleteTask(id: string): Promise<ActionResult> {
  try {
    const userId = await requireUserId();

    // 1. Validar o ID
    const idValidation = taskIdSchema.safeParse(id);
    if (!idValidation.success) {
      return {
        success: false,
        error: "ID de tarefa inválido.",
      };
    }

    // 2. Garantir que a tarefa pertence ao usuário antes de apagar
    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return {
        success: false,
        error: "Tarefa não encontrada.",
      };
    }

    // 3. Excluir a tarefa
    await prisma.task.delete({
      where: { id },
    });

    revalidatePath("/tasks");
    return {
      success: true,
      message: "Tarefa excluída com sucesso!",
      data: undefined,
    };
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    return {
      success: false,
      error: "Ocorreu um erro ao excluir a tarefa.",
    };
  }
}