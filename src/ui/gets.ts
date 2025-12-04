import prompts from "prompts";
import { statusIndex, difficultyIndex, validateDescription, validateTitle, hint, validate } from "./utils.js";
import type { TaskDTO } from "../types.js";

export function getTask(taskTitles: string[] = [], task: TaskDTO = {
  title: "Mi tarea",
  description: "",
  status: "to do",
  difficulty: "easy",
  dueDate: new Date()
}): Promise<TaskDTO> {
  return prompts([
    {
      type: "text",
      name: "title",
      message: "Título",
      initial: task.title,
      format: (value: string) => value.toLowerCase(),
      validate: value => validateTitle(value, taskTitles)
    },
    {
      type: "text",
      name: "description",
      message: "Descripción",
      initial: task.description,
      format: (value: string) => value.trim(),
      validate: value => validateDescription(value)
    },
    {
      type: "select",
      name: "status",
      message: "Estado",
      choices: [
        { title: "Pendiente", value: "to do" },
        { title: "En curso", value: "in progress" },
        { title: "Terminada", value: "done" },
        { title: "Cancelada", value: "cancelled" },
      ],
      initial: statusIndex(task.status),
      hint
    },
    {
      type: "select",
      name: "difficulty",
      message: "Dificultad",
      choices: [
        { title: "Fácil", value: "easy" },
        { title: "Medio", value: "medium" },
        { title: "Difícil", value: "hard" }
      ],
      initial: difficultyIndex(task.difficulty),
      hint
    },
    {
      type: "date",
      name: "dueDate",
      message: "Vencimiento",
      mask: "DD/MM/YYYY",
      validate: date => date > new Date().setHours(23, 59, 59) ? true : "Debe ser a partir de mañana",
      initial: task.dueDate
    },
  ] as const,
    {
      onCancel: () => { throw new Error("cancel") }
    }
  )
}

export function getWord(message: string) {
  return prompts([
    {
      type: "text",
      name: "word",
      message,
      format: value => value.trim().toLowerCase(),
      validate
    } as const
  ]);
}

