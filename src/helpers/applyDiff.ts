const isNodeChanged = (node1: HTMLElement, node2: HTMLElement) => {
  const n1Attr = node1.attributes;
  const n2Attr = node2.attributes;

  if (n1Attr.length !== n2Attr.length) return true;

  const differentAttribute = Array.from(n1Attr).find((attr) => {
    const { name } = attr;
    const at1 = node1.getAttribute(name);
    const at2 = node2.getAttribute(name);

    return at1 !== at2;
  });

  if (differentAttribute) return true;

  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

const applyDiff = (parentNode: HTMLElement, realNode: HTMLElement, virtualNode: HTMLElement) => {
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i] as HTMLElement, virtualChildren[i] as HTMLElement);
  }
};

export default applyDiff;
