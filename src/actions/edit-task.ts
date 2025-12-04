import type { AppState, Task } from "../types.js";

export default async function editTask(tasks: Task[]): Promise<AppState> {
  return { tasks, message: "Tarea editada" };
}
