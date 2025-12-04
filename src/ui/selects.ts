import type { Choice } from "prompts";
import type { Action, DisabledStatus, Filter, Task } from "../types.js";
import { runPrompt } from "./tui.js";

interface AnswerAction {
  action: Action;
};

export async function selectAction(disabled = false) {
  return await runPrompt<AnswerAction>({
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
  });
}

interface AnswerFilter {
  filter: Filter & "back";
};

export async function selectFilter(ds: DisabledStatus = { toDo: false, inProgress: false, done: false, cancelled: false }) {
  return await runPrompt<AnswerFilter>({
    type: "select",
    name: "filter",
    message: "¿Qué tareas deseas ver?",
    choices: [
      { title: "Todas", value: "all" },
      { title: "Pendientes", value: "to do", disabled: ds.toDo },
      { title: "En curso", value: "in progress", disabled: ds.inProgress },
      { title: "Terminadas", value: "done", disabled: ds.done },
      { title: "Canceladas", value: "cancelled", disabled: ds.cancelled },
      { title: "Volver", value: "back" }
    ],
    warn: "No hay tareas en este estado"
  });
}

interface AnswerTask {
  task: Task;
};

export function selectTask(choices: Choice[]) {
  return runPrompt<AnswerTask>({
    type: "select",
    name: "task",
    message: "Selecciona una tarea",
    choices,
  });
}

