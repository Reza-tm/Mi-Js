import { Todo } from "./todo";

export type State = {
  todos: Todo[];
  currentFilter: "All" | "Active" | "Completed";
};
