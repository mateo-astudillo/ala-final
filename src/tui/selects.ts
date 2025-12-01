import prompts, { type Choice } from "prompts";
import { hint } from "./utils.js";
import type { DisabledStatus } from "../types.js";

export function selectAction(disabled = false) {
  return prompts([
    {
      type: "select",
      name: "action",
      message: "¿Qué deseas hacer?",
      choices: [
        { title: "Ver mis tareas", value: "seeTasks", disabled },
        { title: "Buscar una tarea", value: "searchTask", disabled },
        { title: "Agregar una tarea", value: "addTask" },
        { title: "Salir", value: "exit" },
      ],
      warn: "No hay tareas cargadas",
      hint
    } as const
  ])
}

export function selectFilter(ds: DisabledStatus = { toDo: false, inProgress: false, done: false }) {
  return prompts([
    {
      type: "select",
      name: "filter",
      message: "¿Qué tareas deseas ver?",
      choices: [
        { title: "Todas", value: "all" },
        { title: "Pendientes", value: "to do", disabled: ds.toDo },
        { title: "En curso", value: "in progress", disabled: ds.inProgress },
        { title: "Terminadas", value: "done", disabled: ds.done },
        { title: "Volver", value: "back" }
      ],
      hint,
      warn: "No hay tareas en este estado"
    } as const
  ]);
}

export function selectTask(choices: Choice[]) {
  return prompts([
    {
      type: "select",
      name: "task",
      message: "Selecciona una tarea",
      choices,
      hint
    } as const
  ]);
}

