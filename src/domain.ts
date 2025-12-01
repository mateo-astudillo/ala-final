import type { Choice } from "prompts";

export type Status = "to do" | "in progress" | "done" | "cancelled";
export type Difficulty = "hard" | "medium" | "easy";
export type Choices = Choice[];
export type Action = "seeTasks" | "searchTask" | "addTask" | "exit" | "cancel";
export type Filter = Status | "all" | "back";

export interface TaskDTO {
    title: string;
    description?: string;
    difficulty?: Difficulty;
    status?: Status;
    dueDate: Date;
}

export interface Task {
  readonly id: string;
  readonly title: string; // less than 100
  readonly description: string; // less than 500
  readonly status: Status;
  readonly difficulty: Difficulty;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly dueDate: Date;
};

export type DisabledStatus = {
  toDo: boolean,
  inProgress: boolean,
  done: boolean
};

export type AppState = {
  readonly tasks: Task[];
  readonly message: string;
};


