import { Events, State } from "../types/shared";
import { Todo } from "../types/todo";

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById("todo-item") as HTMLTemplateElement;
  }

  return template.content.children[0].cloneNode(true);
};

const getTodoElement = (todo: Todo, events: Events) => {
  const { completed, text, id } = todo;

  const element = createNewTodoNode() as HTMLTemplateElement;
  const input = element.querySelector("#edit") as HTMLInputElement;
  input.value = text;
  input.style.display = "none";

  const checkbox = element.querySelector("#toggle") as HTMLInputElement;
  checkbox.id = String(id);

  const label = element.querySelector("label") as HTMLLabelElement;
  label.textContent = text;
  label.htmlFor = String(id);

  const destroyBtn = element.querySelector("#destroyBtn");
  destroyBtn?.addEventListener("click", () => events.deleteItem(id));

  if (completed) {
    element.classList.add("completed");
    checkbox.checked = true;
  }

  return element;
};

const listView = (targetElement: HTMLElement, { todos }: State, events: Events): HTMLElement => {
  const newList = targetElement.cloneNode(true) as HTMLElement;
  newList.innerHTML = "";
  todos.map((todo) => getTodoElement(todo, events)).forEach((todo) => newList.appendChild(todo));
  return newList;
};

export default listView;
