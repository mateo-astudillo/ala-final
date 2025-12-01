import { selectAction, selectFilter, selectTask } from "./selects.js";
import { getTask, getWord } from "./gets.js";
import { toggleEdit } from "./toggles.js";
import type { Action, DisabledStatus, Filter } from "../types.js";
import { Task, type TaskDTO } from "../tasks/task.js";
import { toChoices } from "./utils.js";


export interface TUI {
  selectAction(this: TUI, areTasks: boolean): Promise<Action>;
  selectFilter(this: TUI, disabled: DisabledStatus): Promise<Filter>;
  selectTask(this: TUI, tasks: Task[]): Promise<Task | false>;

  getWord(this: TUI): Promise<string | false>;
  getTask(this: TUI, titles: string[]): Promise<TaskDTO | false>;
  editTask(this: TUI, titles: string[], task: TaskDTO): Promise<TaskDTO | false>;

  show(this: TUI, message: string): Promise<void>;

  toggleEdit(this: TUI): Promise<boolean>;
};

interface TUIConstructor {
  new(): TUI;
}

export const TUIFn = function(this: TUI) {
};

TUIFn.prototype.selectAction = async function(this: TUI, areTask: boolean): Promise<Action> {
  const answer = await selectAction(areTask);
  if (!answer.action)
    return "cancel";
  return answer.action;
};

TUIFn.prototype.selectFilter = async function(this: TUI, ds: DisabledStatus): Promise<Filter> {
  const answer = await selectFilter(ds);
  if (!answer.filter)
    return "back";
  return answer.filter;
};

TUIFn.prototype.selectTask = async function(this: TUI, tasks: Task[]) {
  const choices = toChoices(tasks);
  choices.push({ title: "Volver", value: false, description: "al menú principal" });

  const answer = await selectTask(choices);

  if (!answer.task)
    return false;

  return answer.task;
}

TUIFn.prototype.show = async function(this: TUI, message: string) {
  console.clear();
  console.log(message);
  await new Promise(resolve => setTimeout(resolve, 2200));
};

TUIFn.prototype.getWord = async function(this: TUI): Promise<string | false> {
  const answer = await getWord("Ingrese una palabra");
  if (!answer.word)
    return false;
  return answer.word;
};

TUIFn.prototype.getTask = async function(this: TUI, taskTitles: string[]) {
  try {
    return await getTask(taskTitles);
  } catch {
    return false;
  }
};

TUIFn.prototype.editTask = async function(this: TUI, taskTitles: string[], task: TaskDTO) {
  try {
    const answer = await getTask(taskTitles, task);
    if (!answer || answer === undefined || !answer.title)
      return false;
    return answer;
  } catch {
    return false
  }
};

TUIFn.prototype.toggleEdit = async function(this: TUI): Promise<boolean> {
  const answer = await toggleEdit();
  if (!answer.edit)
    return false;
  return answer.edit;
}

export const TUI = TUIFn as unknown as TUIConstructor;
