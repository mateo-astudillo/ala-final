import type { Choice } from "prompts";
import type { TaskRepository } from "./application/TaskRepository.js";

export type Status = "to do" | "in progress" | "done" | "cancelled";
export type Difficulty = "hard" | "medium" | "easy";
export type Choices = Choice[];
export type Action = "seeTasks" | "searchTask" | "addTask" | "exit";
export type Filter = Status | "all";

export interface TaskDTO {
  title: string;
  description?: string;
  difficulty?: Difficulty;
  status?: Status;
  dueDate: Date;
}

export type DisabledStatus = {
  cancelled: boolean;
  toDo: boolean,
  inProgress: boolean,
  done: boolean
};

export type AppState = {
  taskRepository: TaskRepository,
  message: string
}
