// Formato de retorno de todas as Server Actions de tarefas.
export type ActionResult<T = void> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };
