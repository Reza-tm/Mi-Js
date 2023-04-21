import { type Todo } from "../types/todo";

type CounterViewProps = {
  todos: Todo[];
};

const getTodosCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((t) => !t.completed);

  const { length } = notCompleted;
  return `${length + 1} Item left`;
};

const counterView = (targetElement: HTMLElement, { todos }: CounterViewProps) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = getTodosCount(todos);
  return newCounter;
};

export default counterView;
