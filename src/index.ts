import applyDiff from "./helpers/applyDiff";
import { getTodos } from "./helpers/getTodos";
import { addRegistry, renderRoot } from "./helpers/registry";
import "./public/styles.css";
import { type State } from "./types/shared";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import listView from "./view/list";

addRegistry("todos", listView);
addRegistry("counter", counterView);
addRegistry("filters", filtersView);

const state: State = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  requestAnimationFrame(() => {
    const main = document.getElementById("todoapp");
    if (main) {
      const newMain = renderRoot(main, state);
      applyDiff(document.body, main, newMain);
    } else {
      throw new Error("todoapp not found");
    }
  });
};

render();
