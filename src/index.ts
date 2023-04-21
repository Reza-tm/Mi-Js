import applyDiff from "./helpers/applyDiff";
import { addRegistry, renderRoot } from "./helpers/registry";
import "./public/styles.css";
import { Events, type State } from "./types/shared";
import appView from "./view/app";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import listView from "./view/list";

addRegistry("app", appView);
addRegistry("todos", listView);
addRegistry("counter", counterView);
addRegistry("filters", filtersView);

const state: State = {
  todos: [],
  currentFilter: "All",
};

const events: Events = {
  deleteItem: (id: number) => {
    const newTodos = state.todos.filter((e) => e.id !== id);
    state.todos = newTodos;
    render();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false,
      id: state.todos.length + 1,
    });
    render();
  },
};

const render = () => {
  requestAnimationFrame(() => {
    const main = document.getElementById("root");
    if (main) {
      const newMain = renderRoot(main, state, events);
      applyDiff(document.body, main, newMain);
    } else {
      throw new Error("todoapp not found");
    }
  });
};

render();
