import { Events, Filters, State } from "../types/shared";
import { Todo } from "../types/todo";

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById("todo-item") as HTMLTemplateElement;
  }

  return template.content.children[0].cloneNode(true);
};

const getTodoElement = (todo: Todo, events: Events, idx: number) => {
  const { completed, text } = todo;
  const enableEdit = () => {
    label.style.display = "none";
    input.style.display = "inline";
  };
  const disableEdit = () => {
    label.style.display = "inline";
    input.style.display = "none";
  };

  const element = createNewTodoNode() as HTMLTemplateElement;

  const input = element.querySelector("#edit") as HTMLInputElement;
  input.value = text;
  input.style.display = "none";
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      disableEdit();
      events.updateItem(idx, (e.target as HTMLInputElement).value);
    }
  });
  input.addEventListener("blur", () => {
    disableEdit();
    input.value = text;
  });

  const checkbox = element.querySelector("#toggle") as HTMLInputElement;
  checkbox.id = String(idx);
  checkbox.addEventListener("click", () => events.toggleItemCompleted(idx));

  const label = element.querySelector("label") as HTMLLabelElement;
  label.textContent = text;
  label.htmlFor = String(idx);

  const destroyBtn = element.querySelector("#destroyBtn") as HTMLButtonElement;
  destroyBtn.addEventListener("click", () => {
    events.deleteItem(idx);
  });

  const editBtn = element.querySelector("#editBtn") as HTMLButtonElement;
  editBtn.addEventListener("click", () => {
    enableEdit();
    input.focus();
  });

  if (completed) {
    element.classList.add("completed");
    checkbox.checked = true;
  }

  return element;
};

const filterTodos = (todos: Todo[], filter: Filters) => {
  const isCompleted = (todo) => todo.completed;
  if (filter === "Active") {
    return todos.filter((t) => !isCompleted(t));
  }

  if (filter === "Completed") {
    return todos.filter(isCompleted);
  }

  return [...todos];
};

const listView = (
  targetElement: HTMLElement,
  { todos, currentFilter }: State,
  events: Events
): HTMLElement => {
  const newList = targetElement.cloneNode(true) as HTMLElement;
  newList.innerHTML = "";
  const tailwindStyled = "mb-4 flex flex-col border-2 w-fit p-5 rounded-lg";

  if (todos.length) {
    tailwindStyled.split(" ").forEach((e) => newList.classList.add(e));
  }

  const filteredTodos = filterTodos(todos, currentFilter);

  filteredTodos
    .map((todo, idx) => getTodoElement(todo, events, idx))
    .forEach((todo) => newList.appendChild(todo));
  return newList;
};

export default listView;
