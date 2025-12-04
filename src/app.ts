import seeTasks from "./actions/see-tasks.js";
import type { Action, AppState } from "./types.js";
import { selectAction } from "./ui/selects.js";

async function app(appState: AppState) {
  const { tasks, message } = appState;
  console.clear();
  console.log(message + "\n");

  try {
    // const answer = await selectAction()
    const answer = await selectAction(!appState.tasks.some(
      (t) => t.active)
    );
    const action: Action = answer.action;
    switch (action) {
      case "seeTasks":
        return app(await seeTasks(tasks));
      case "searchTask":
        return app({ tasks, message: "Buscar tarea" });
      case "addTask":
        return app({ tasks, message: "Agregar tarea" });
      case "exit":
        return;
    }
  } catch {
    return app({ tasks, message: "Cancel" })
  }
}

app({
  tasks: getByJson() ?? [],
  message: "Hola Oliva"
});

function getByJson(): import("./types.js").Task[] {
  return [];
}

