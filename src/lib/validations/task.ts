import { z } from "zod";

// Usado no formulário (cliente) e de novo nas Server Actions (servidor).
export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "O título é obrigatório")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  // Descrição vazia vira null, para que ao editar seja possível apagá-la
  // (para o Prisma, undefined significaria "não alterar").
  description: z
    .string()
    .trim()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .nullish()
    .transform((val) => val || null),
});

/** Valores digitados no formulário (antes da validação). */
export type TaskFormValues = z.input<typeof taskFormSchema>;
/** Valores já validados, enviados para as Server Actions. */
export type TaskFormInput = z.output<typeof taskFormSchema>;

export const taskIdSchema = z.string().cuid("ID de tarefa inválido");
