import { Events, State } from "../types/shared";
import { type Todo } from "../types/todo";

const getTodosCount = (todos: Todo[]) => {
  if (!todos.length) return "there is no item";

  const notCompleted = todos.filter((t) => !t.completed);

  const { length } = notCompleted;

  return `${length} Item left`;
};

const counterView = (targetElement: HTMLElement, { todos }: State, events: Events) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = getTodosCount(todos);
  return newCounter as HTMLElement;
};

export default counterView;
