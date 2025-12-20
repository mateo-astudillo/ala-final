import type { Action, AppState } from "./types.js";
import searchTask from "./actions/search-task.js";
import seeTasks from "./actions/see-tasks.js";
import addTask from "./actions/add-task.js";
import { initializeTaskRepository, isEmpty } from "./application/TaskRepository.js";
import { selectAction } from "./ui/selects.js";

async function app({ taskRepository, message }: AppState) {
  console.clear();
  console.log(message + "\n");

  try {
    const answer = await selectAction(isEmpty(taskRepository));
    const action: Action = answer.action;
    switch (action) {
      case "seeTasks":
        return app(await seeTasks(taskRepository));
      case "searchTask":
        return app(await searchTask(taskRepository));
      case "addTask":
        return app(await addTask(taskRepository));
      case "exit":
        return;
    }
  } catch {
    return app({ taskRepository, message: "Cancel" })
  }
}

app({
  taskRepository: initializeTaskRepository(),
  message: "Hola Oliva"
});
