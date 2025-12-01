import { Task, TaskDTO } from "../domain";
import { difficultyLabels, statusLabels } from "./utils";

// PURE
export function fromDTO(id: string, now: Date, taskDTO: TaskDTO): Task {
  return {
    id: id,
    title: taskDTO.title,
    description: taskDTO.description ?? "",
    difficulty: taskDTO.difficulty ?? "easy",
    status: taskDTO.status ?? "to do",
    createdAt: now,
    updatedAt: now,
    dueDate: taskDTO.dueDate ?? undefined,
  };
};

// PURE
export function toUpdatedTask(task: Task, taskDTO: TaskDTO): Task {
  return {
    id: task.id,
    title: taskDTO.title,
    description: taskDTO.description ?? task.description,
    difficulty: taskDTO.difficulty ?? task.difficulty,
    status: taskDTO.status ?? task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    dueDate: taskDTO.dueDate,
  };
};

// PURE
export function toDeletedTask(task: Task): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    difficulty: task.difficulty,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    dueDate: task.dueDate,
  };
};

// PURE
export function toString(task: Task): string {
  const lines = [
    `Título: ${task.title}`,
    task.description && `Descripción: ${task.description}`,
    `Estado: ${statusLabels(task.status)}`,
    `Dificultad: ${difficultyLabels(task.difficulty)}`,
    `Vencimiento: ${task.dueDate.toLocaleString("es-AR")}`,
    `Creación: ${task.createdAt.toLocaleString("es-AR")}`,
    `Modificación: ${task.updatedAt.toLocaleString("es-AR")}`
  ];

  return lines
    .filter(Boolean)
    .join('\n');
};

// PURE
export function toDTO(task: Task): TaskDTO {
  return {
    title: task.title,
    description: task.description,
    difficulty: task.difficulty,
    status: task.status,
    dueDate: task.dueDate
  };
};
