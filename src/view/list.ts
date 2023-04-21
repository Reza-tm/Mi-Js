import { Todo } from "../types/todo";

type ListViewProps = {
  todos: Todo[];
};

const createTodoElement = ({ completed, text }: Todo) => `
    <li class=" ${completed ? "completed" : null}  mb-4">
        <div class="w-fit flex gap-4">
            <input 
            ${completed ? "checked" : ""}
            class="toggle" 
            type="checkbox">
            <label>${text}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}">
    </li>
`;

const listView = (targetElement: HTMLUListElement, { todos }: ListViewProps) => {
  const newList = targetElement.cloneNode(true) as HTMLUListElement;
  const todoElements = todos.map(createTodoElement).join("");
  newList.innerHTML = todoElements;
  return newList;
};

export default listView;
