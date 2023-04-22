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
    if (e.key === "Enter") {
      events.addItem((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = "";
    }
  });
};

const appView = (targetElement: HTMLElement, _, events: Events) => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  newApp.innerHTML = "";
  newApp.appendChild(createAppElement());
  addEvent(newApp, events);

  return newApp;
};

export default appView;
