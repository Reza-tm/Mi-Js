import { State } from "../types/shared";

const filtersView = (targetElement: HTMLElement, { currentFilter }: State) => {
  const newFilters = targetElement.cloneNode(true) as HTMLElement;
  Array.from(newFilters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });
  return newFilters;
};

export default filtersView;
