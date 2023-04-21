import { faker } from "@faker-js/faker";
import { type Todo } from "../types/todo";

const createElement = (): Todo => ({
  text: faker.internet.userName(),
  completed: +faker.random.numeric() > 5 ? true : false,
});

const repeat = (elementFactory: () => Todo, count: number) => {
  let arr = [] as Todo[];
  for (let i = 0; i < count; i++) {
    arr.push(elementFactory());
  }
  return arr;
};

export const getTodos = () => {
  const count = faker.random.numeric();
  return repeat(createElement, +count);
};
