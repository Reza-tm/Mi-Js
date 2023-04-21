let panel: HTMLElement;
let start = 0;
let frameCount = 0;

const create = () => {
  const element = document.createElement("div");
  const styles: Partial<CSSStyleDeclaration> = {
    position: "fixed",
    left: "0px",
    top: "0px",
    width: "50px",
    height: "50px",
    backgroundColor: "black",
    color: "white",
  };

  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key)) {
      element.style[key] = styles[key]!;
    }
  }

  return element;
};

const tick = () => {
  frameCount++;
  const now = performance.now();
  if (now >= start + 1000) {
    panel.innerText = String(frameCount);
    frameCount = 0;
    start = now;
  }
  window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
  panel = create();
  window.requestAnimationFrame(() => {
    start = performance.now();
    parent.appendChild(panel);
    tick();
  });
};

export default init;
