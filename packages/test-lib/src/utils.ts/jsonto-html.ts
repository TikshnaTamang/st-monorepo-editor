// import { Attribute } from '../types/json-types';
// import { ElementNode } from '../types/json-types';


export function jsonToHtml(json) {
  function createElement(node) {
    if (!node || !node.tag) {
      return document.createTextNode(node?.contain || '');
    }

    const element = document.createElement(node.tag);

    node.attributes?.forEach((attr) =>
      element.setAttribute(attr.name, attr.value)
    );

    if (node.style) {
      element.setAttribute('style', node.style);
    }

    if (Array.isArray(node.children)) {
      node.children.forEach((child) => {
        const childElement = createElement(child);
        if (childElement) element.appendChild(childElement);
      });
    } else if (node.contain) {
      element.appendChild(document.createTextNode(node.contain));
    }

    return element;
  }

  const container = document.createDocumentFragment();
  let currentWrapper = document.createElement('p');

  json.forEach((node) => {
    if (['div', 'section', 'article', 'header', 'footer', 'aside', 'main', 'nav'].includes(node.tag.toLowerCase())) {
      if (currentWrapper.hasChildNodes()) {
        container.appendChild(currentWrapper);
      }
      container.appendChild(createElement(node));
      currentWrapper = document.createElement('p');
    } else {
      const childElement = createElement(node);
      if (childElement) currentWrapper.appendChild(childElement);
    }
  });

  if (currentWrapper.hasChildNodes()) {
    container.appendChild(currentWrapper);
  }

  return container;
}