import { Task } from "../tasks/task.js";
import type { Choices, Difficulty, Status } from "../types.js";

const STATUS_LABELS: Record<Status, number> = {
  "to do": 0,
  "in progress": 1,
  "done": 2,
  "cancelled": 3
}

export function statusIndex(status: Status = "to do") {
  return STATUS_LABELS[status];
}

const DIFFICULTY_LABELS: Record<Difficulty, number> = {
  "easy": 0,
  "medium": 1,
  "hard": 2
}

export function difficultyIndex(difficulty: Difficulty = "easy") {
  return DIFFICULTY_LABELS[difficulty];
}

export const hint = "Use las flechas para moverse y enter para elegir"

export function validateDescription(value: string) {
  const regex = /^(?:[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]+( [a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]+)*)?$/;
  if (value.length >= 500)
    return "Hasta 500 caracteres";
  if (!regex.test(value))
    return "Solo se permiten letras y números";
  return true;
}

export function validateTitle(value: string, taskTitles: string[] = []) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]+( [a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]+)*$/;
  if (value.length >= 100)
    return "Hasta 500 caracteres";
  if (!regex.test(value))
    return "Solo se permiten letras y números, no puede ser Vacío";
  if (taskTitles.some(t => t === value.toLocaleLowerCase()))
    return "Ya hay una tarea con ese nombre";
  if (value.toLocaleLowerCase() === "volver")
    return "Nombre reservado";
  return true;
}

export function validate(value: string) {
  const regex = /^(?:[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]+( [a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]+)*)?$/;
  if (!regex.test(value))
    return "Solo se permiten letras y números";
  return true;
}

export function toChoices(tasks: Task[]): Choices {
  // return tasks.map(t =>
  //   ({ title: t.title, value: t, description: t.description })
  // );
  const choices: Choices = [];

  for (const task of tasks)
    choices.push({ title: task.title, value: task, description: task.description });

  return choices;
}
