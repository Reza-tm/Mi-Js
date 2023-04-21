import { State } from "../types/shared";
import { type Todo } from "../types/todo";

const getTodosCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((t) => !t.completed);

  const { length } = notCompleted;
  return `${length + 1} Item left`;
};

const counterView = (targetElement: HTMLElement, { todos }: State) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = getTodosCount(todos);
  return newCounter as HTMLElement;
};

export default counterView;
