import type { AppState } from "../types.js";
import type { Choice } from "prompts";
import { selectFilter, selectTask } from "../ui/selects.js";
import { getActiveTasks, type TaskRepository } from "../application/TaskRepository.js";

export default async function seeTasks(taskRepository: TaskRepository): Promise<AppState> {
  const tasks = getActiveTasks(taskRepository)
  // NOTE this shouldn't happen
  if (!tasks.some(t => t.active))
    return { taskRepository, message: "No hay tareas" };

  const answer = await selectFilter({
    toDo: !tasks.some((t) => t.active && t.status === "to do"),
    inProgress: !tasks.some((t) => t.active && t.status === "in progress"),
    done: !tasks.some((t) => t.active && t.status === "done"),
    cancelled: !tasks.some((t) => t.active && t.status === "cancelled")
  });

  if (answer.filter === "back")
    return ({ taskRepository, message: "Volver" })

  const filter = answer.filter;

  const filteredTasks = (filter !== "all")
    ? tasks.filter((t) => t.status == filter)
    : tasks;

  const selectedTask = await selectTask(filteredTasks.map(
    (t): Choice => ({ title: t.title, value: t })
  ));

  console.log(selectedTask.task);

  return { taskRepository, message: "" };
}
