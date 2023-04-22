import { Events, State } from "../types/shared";
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

  const element = createNewTodoNode() as HTMLTemplateElement;
  const input = element.querySelector("#edit") as HTMLInputElement;
  input.value = text;
  input.style.display = "none";

  const checkbox = element.querySelector("#toggle") as HTMLInputElement;
  checkbox.id = String(idx);

  const label = element.querySelector("label") as HTMLLabelElement;
  label.textContent = text;
  label.htmlFor = String(idx);

  const destroyBtn = element.querySelector("#destroyBtn");
  destroyBtn?.addEventListener("click", () => {
    events.deleteItem(idx);
  });

  if (completed) {
    element.classList.add("completed");
    checkbox.checked = true;
  }

  return element;
};

const listView = (targetElement: HTMLElement, { todos }: State, events: Events): HTMLElement => {
  const newList = targetElement.cloneNode(true) as HTMLElement;
  newList.innerHTML = "";
  const tailwindStyled = "mb-4 flex flex-col border-2 w-fit p-5 rounded-lg";
  console.log(todos.length);
  if (todos.length) {
    tailwindStyled.split(" ").forEach((e) => newList.classList.add(e));
  }
  console.log(newList);
  todos
    .map((todo, idx) => getTodoElement(todo, events, idx))
    .forEach((todo) => newList.appendChild(todo));
  return newList;
};

export default listView;
