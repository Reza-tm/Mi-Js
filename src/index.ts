import applyDiff from "./helpers/applyDiff";
import { addRegistry, renderRoot } from "./helpers/registry";
import "./public/styles.css";
import { Events, Filters, type State } from "./types/shared";
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
  deleteItem: (idx: number) => {
    state.todos.splice(idx, 1);
    render();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false,
    });
    render();
  },
  completeAll: () => {
    state.todos.forEach((t) => {
      t.completed = true;
    });
    render();
  },
  toggleItemCompleted: (index) => {
    const { completed } = state.todos[index];
    state.todos[index].completed = !completed;
    render();
  },
  clearCompleted: () => {
    state.todos = state.todos.filter((t) => !t.completed);
    render();
  },
  changeFilter: (filter: Filters) => {
    state.currentFilter = filter;
    render();
  },
  updateItem: (index: number, text: string) => {
    state.todos[index].text = text;
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
