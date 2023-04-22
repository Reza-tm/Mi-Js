import { Todo } from "./todo";

export type Filters = "All" | "Active" | "Completed";

export type State = {
  todos: Todo[];
  currentFilter: Filters;
};

export type Events = {
  deleteItem: (i: number) => void;
  addItem: (t: string) => void;
  completeAll: () => void;
  clearCompleted: () => void;
  changeFilter: (f: Filters) => void;
  toggleItemCompleted: (i: number) => void;
  updateItem: (i: number, t: string) => void;
};
