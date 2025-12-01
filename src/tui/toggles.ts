import prompts from "prompts";

export function toggleEdit() {
  return prompts([
    {
      type: "toggle",
      name: "edit",
      message: "¿Desea editar la tarea?",
      initial: false,
      active: "sí",
      inactive: "no"
    } as const
  ]);
}

