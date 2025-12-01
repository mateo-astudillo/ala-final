import { Status } from "../types";
import { Task } from "./task";

export interface TaskList {
  tasks: Task[]
};

// PURE
export function initializeTaskList(): TaskList {
  return {
    tasks: []
  };
};

// PURE
export function isEmpty(tasksList: TaskList) {
  return tasksList.tasks.length === 0;
}

// PURE
export function filterByStatus(taskList: TaskList, status: Status): TaskList {
  return {
    tasks: taskList.tasks.filter(t => t.status === status)
  }
}
