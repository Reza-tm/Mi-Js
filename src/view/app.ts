import { Events } from "../types/shared";

let app: HTMLTemplateElement;

const createAppElement = () => {
  if (!app) {
    app = document.getElementById("todo-app") as HTMLTemplateElement;
  }

  return app.content?.firstElementChild?.cloneNode(true)!;
};

const addEvent = (target: HTMLElement, events: Events) => {
  const element = target.querySelector("#new-todo") as HTMLInputElement;
  element.addEventListener("keypress", (e) => {
    let value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter" && value.trim().length > 0) {
      events.addItem(value);
      (e.target as HTMLInputElement).value = "";
    }
  });

  const completeAllBtn = target.querySelector("#mark-all") as HTMLButtonElement;
  completeAllBtn.addEventListener("click", () => events.completeAll());

  const clearCompletedBtn = target.querySelector("#clear-completed") as HTMLButtonElement;
  clearCompletedBtn.addEventListener("click", events.clearCompleted);
};

const appView = (targetElement: HTMLElement, _, events: Events) => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  newApp.innerHTML = "";
  newApp.appendChild(createAppElement());
  addEvent(newApp, events);

  return newApp;
};

export default appView;
