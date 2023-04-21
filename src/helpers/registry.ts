import { Events, State } from "../types/shared";

const registry = {};

const renderWrapper = (
  component: (target: HTMLElement, state: State, events: Events) => HTMLElement
) => {
  return (targetElement: HTMLElement, state: State, events: Events) => {
    const element = component(targetElement, state, events);
    const childComponents = element.querySelectorAll("[data-component]") as NodeListOf<HTMLElement>;
    Array.from(childComponents).forEach((component) => {
      const name = component.dataset.component;
      if (!name) return;

      const child = registry[name];
      if (!child) {
        return;
      }

      component.replaceWith(child(component, state, events));
    });

    return element;
  };
};

export const addRegistry = (
  name: string,
  component: (target: HTMLElement, state: State, events: Events) => HTMLElement
) => {
  registry[name] = renderWrapper(component);
};

export const renderRoot = (root: HTMLElement, state: State, events: Events) => {
  const cloneComponent = (root: HTMLElement) => {
    return root.cloneNode(true) as HTMLElement;
  };

  return renderWrapper(cloneComponent)(root, state, events);
};
