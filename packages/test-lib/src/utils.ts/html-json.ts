// import { Attribute } from '../types/json-types';
import { ElementNode } from '../types/json-types';

function filterStyles(inlineStyle: string): string {
  const allowedVariables = ['--primary-color', '--text-color'];
  const excludedProperties = ['font-family', 'font-size', 'line-height'];

  const isExcluded = (name: string, value: string) => {
    if (excludedProperties.includes(name)) {
      return true;
    }
    if (value.includes('var(')) {
      const variableName = value.match(/var\((--[\w-]+)\)/)?.[1];
      return variableName ? !allowedVariables.includes(variableName) : true;
    }
    return false;
  };

  // Filter the inline style
  return inlineStyle
    .split(';')
    .map((style) => style.trim()) // Clean up whitespace
    .filter((style) => {
      const [name, value] = style.split(':').map((s) => s.trim());
      return name && value && !isExcluded(name, value); // Exclude unwanted styles
    })
    .join('; '); // Rebuild the filtered style string
}

function processNode(node: HTMLElement | Text | ChildNode, parentId: string) {
  if (node.nodeType === Node.TEXT_NODE && node.textContent) {
    return {
      contain: node.textContent,
      attributes: [],
      style: '',
      tag: '',
    };
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
   let tagName = (node as HTMLElement).tagName.toLowerCase();
    // const allowedTags = [
    //   'ol',
    //   'ul',
    //   'br',
    //   'li',
    //   'img',
    //   'a',
    //   'b',
    //   'i',
    //   'u',
    //   'span',
    //   'strong',
    //   'code',
    // ];

    // if (!allowedTags.includes(tagName)) {
    //   tagName = 'p'; // Default to <p> for disallowed tags
    // }

    // Filter the inline style
    const rawStyle = (node as HTMLElement).getAttribute('style') || '';
    const filteredStyle = filterStyles(rawStyle);

    const attr: any[] = [];

    const result = {
      contain: '',
      attributes: attr,
      style: filteredStyle,
      tag: tagName,
      children: [],
    };
    if (tagName === 'a') {
      const href = (node as HTMLElement).getAttribute('href');
      if (href) {
        result.attributes.push({
          name: 'href',
          value: href,
        });
      }
    }
    if (tagName === 'img') {
      const src = (node as HTMLImageElement).getAttribute('src');
      if (src) {
        result.attributes.push({
          name: 'src',
          value: src,
        });
      }
    }
    const childNodes = node.childNodes;
    childNodes.forEach((child) => {
      const childResult = processNode(child, parentId);
      if (childResult) {
        result.children.push(childResult);
      }
    });

    // If no children, store the text content
    if (result.children.length === 0 && node.textContent.trim()) {
      result.contain = node.textContent;
    }

    return result;
  }

  return null;
}

export function htmlToJson(element: HTMLElement, parentId: string) {
  if (!element || element.nodeType !== 1) return null;
  type HtmlJson = ElementNode[];
  const result: HtmlJson = [];

  const childNodes = element.childNodes;
  childNodes.forEach((child: ChildNode | Text | HTMLElement) => {
    const childResult = processNode(child, parentId);
    if (childResult) {
      result.push(childResult);
    }
  });

  return result;
}
