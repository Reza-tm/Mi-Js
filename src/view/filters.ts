import { Events, Filters, State } from "../types/shared";

const filtersView = (
  targetElement: HTMLElement,
  { currentFilter }: State,
  { changeFilter }: Events
) => {
  const newFilters = targetElement.cloneNode(true) as HTMLElement;
  Array.from(newFilters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }

    a.addEventListener("click", (e) => {
      e.preventDefault();
      changeFilter(a.textContent as Filters);
    });
  });
  return newFilters;
};

export default filtersView;
