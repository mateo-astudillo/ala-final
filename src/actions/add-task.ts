import type { AppState } from "../types.js";
import { getTitles, type TaskRepository } from "../application/TaskRepository.js";
import { getTask } from "../ui/gets.js";

export default async function addTask(taskRepository: TaskRepository): Promise<AppState> {
  const answer = await getTask(getTitles(taskRepository))
  console.log(answer);
  return { taskRepository, message: "Tarea editada" };
}
