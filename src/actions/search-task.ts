import type { TaskRepository } from "../application/TaskRepository.js";
import type { AppState } from "../types.js";

export default async function searchTask(taskRepository: TaskRepository): Promise<AppState> {
  return { taskRepository, message: "Tarea editada" };
}
