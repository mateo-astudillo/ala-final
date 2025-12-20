import type { Status } from "../types.js";
import type { Task } from "./Task.js";

export interface TaskRepository {
  filepath: string,
  tasks: Task[]
};

export function initializeTaskRepository(filepath: string = "./tasks.json"): TaskRepository {
  return {
    filepath,
    tasks: []
  };
};

export function addTask(taskRepository: TaskRepository, newTask: Task): TaskRepository {
  return {
    ...taskRepository,
    tasks: [...taskRepository.tasks, newTask]
  }
}

export function getActiveTasks(taskRepository: TaskRepository): Task[] {
  return taskRepository.tasks.filter(t => t.active);
};

export function isEmpty(taskRepository: TaskRepository) {
  return taskRepository.tasks.some(t => t.active);
}

export function filterByStatus(taskRepository: TaskRepository, status: Status): Task[] {
  return taskRepository.tasks.filter(t => t.status === status)
}

export function getTitles(taskRepository: TaskRepository): string[] {
  return taskRepository.tasks.map(t => t.title);
}
