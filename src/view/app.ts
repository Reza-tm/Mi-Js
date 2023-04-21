import { type State } from "../types/shared";
import counterView from "./counter";
import filtersView from "./filters";
import listView from "./list";

const appView = (target: HTMLElement, state: State) => {
  const elementDoc = target.cloneNode(true) as Document;

  const list = elementDoc.querySelector("#todo-list") as HTMLUListElement;
  list.replaceWith(listView(list, state));

  const counter = elementDoc.querySelector("#todo-count") as HTMLSpanElement;
  counter.replaceWith(counterView(counter, state));

  const filters = elementDoc.querySelector("#filters") as HTMLUListElement;
  filters.replaceWith(filtersView(filters, state));

  return elementDoc;
};

export default appView;
