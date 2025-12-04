import { time } from "console";
import type { AppState, Choices, Task } from "../types.js";
import { selectFilter, selectTask } from "../ui/selects.js";
import type { Choice } from "prompts";

export default async function seeTasks(tasks: Task[]): Promise<AppState> {
  // NOTE this shouldn't happen
  if (!tasks.some(t => t.active))
    return { tasks, message: "No hay tareas" };

  const answer = await selectFilter({
    toDo: !tasks.some((t) => t.active && t.status === "to do"),
    inProgress: !tasks.some((t) => t.active && t.status === "in progress"),
    done: !tasks.some((t) => t.active && t.status === "done"),
    cancelled: !tasks.some((t) => t.active && t.status === "cancelled")
  });

  if (answer.filter === "back")
    return ({ tasks, message: "Volver" })

  const filter = answer.filter;

  const filteredTasks = (filter !== "all")
    ? tasks.filter((t) => t.status == filter)
    : tasks;

  const selectedTask = await selectTask(filteredTasks.map(
    (t): Choice => ({ title: t.title, value: t })
  ));

  

  return { tasks, message: "" };
}
