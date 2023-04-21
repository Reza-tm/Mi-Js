import { getTodos } from "./helpers/getTodos";
import "./public/styles.css";
import { type State } from "./types/shared";
import appView from "./view/app";

const main = document.getElementById("todoapp");

const state: State = {
  todos: getTodos(),
  currentFilter: "All",
};

if (main) {
  requestAnimationFrame(() => {
    const newMain = appView(main, state);
    main.replaceWith(newMain);
  });
} else {
  throw new Error("todoapp not found");
}
