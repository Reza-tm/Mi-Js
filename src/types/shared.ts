import { Todo } from "./todo";

export type State = {
  todos: Todo[];
  currentFilter: "All" | "Active" | "Completed";
};

export type Events = {
  deleteItem: (i: number) => void;
  addItem: (t: string) => void;
};
