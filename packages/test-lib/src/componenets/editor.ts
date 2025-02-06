// import { TextAreaContent } from '../types/editor-types';
import { dataStore } from '../store/dataStore';
import { htmlToJson } from '../utils.ts/html-json';
import { jsonToHtml } from '../utils.ts/jsonto-html';
import { debounce } from 'lodash';
import { handleBtnCssToggle } from '../utils.ts/handle-toolcss';
import { defaultEditorValue } from '../data/default-value';

export function createEditor(
  uniqueId: string,
  getJsonData: (arg: any) => any
): HTMLElement {
  const editor = document.createElement('div');
  editor.id = `${uniqueId}-editor`;
  editor.className = `editor border-b-1 border-gray-100 p-2 overflow-y-scroll`;

  const editArea = document.createElement('div');
  editArea.id = `${uniqueId}-text-area`;
  ('');
  editArea.setAttribute('contenteditable', 'true');
  editArea.className = `w-full px-4 text-sm sm:text-base min-h-[200px] max-h-full`;
  editArea.style.outline = 'none';
  editArea.innerHTML = defaultEditorValue;

  // Output Section
  const josnRenderContainer = document.createElement('div');
  josnRenderContainer.id = `${uniqueId}-output`;
  josnRenderContainer.className = `output mt-4 p-2 border-t-2 border-gray-200  `;

  // Elements
  const code = document.createElement('pre');
  editor.appendChild(editArea);
  editor.appendChild(josnRenderContainer);
  editor.appendChild(code);

  // let textAreaContent: TextAreaContent[] = [];

  // Debounced version of the input event handler

  const debouncedInputHandler = debounce(() => {
    handleBtnCssToggle(uniqueId);
    const jsonedData = htmlToJson(editArea, uniqueId);
    dataStore.updateData(jsonedData);
    const storeJsonData = [...dataStore.getData()];
    getJsonData(jsonedData);
    console.log('josned data ', jsonedData);

    josnRenderContainer.innerHTML = '';
    const renderedContent = jsonToHtml(storeJsonData);
    code.innerText = JSON.stringify(jsonedData);
    josnRenderContainer.appendChild(renderedContent);
  }, 100);
  editor.addEventListener('paste', function (event) {
    event.preventDefault();

    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedHTML = clipboardData.getData('text/html');
      document.execCommand('insertHTML', false, pastedHTML);
    }
  });

  editArea.addEventListener('input', debouncedInputHandler);

  editArea.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
// Property 'tagName' does not exist on type 'EventTarget'. we got this issue cuz typescript desnt know that the target is html element so wee need to tell it that it is
    if (target.tagName.toLowerCase() === 'a') {
      const href = target.getAttribute('href');
      if (href) {
        window.open(href, '_blank', 'noopener');
      }
      event.stopPropagation();
      return;
    }
  });

  // OKAY REMOVE THE P THAT IS OUTSIDE RIGHT AFTER THERE IS A NEW  P TAG

  // function checkNodeTree(node, targetId) {
  //   if (!node) return false;
  //   if (node.id === targetId) {
  //     return false; // Stop if the targetId is reached
  //   }
  //   if (node.tagName === 'LI') {
  //     return true; // Found the <li> element
  //   }
  //   return checkNodeTree(node.parentNode, targetId);
  // }

  function hasTextContent(node: Node): boolean {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent?.trim() !== '';
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      return Array.from(element.childNodes).some(hasTextContent);
    }

    return false;
  }

  function cleanUpEditArea() {
    if (!hasTextContent(editArea)) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(editArea);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('delete');
      }
    }
  }

  editArea.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      setTimeout(() => cleanUpEditArea(), 0);
    }
  });

  editArea.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      cleanUpEditArea();
    }
  });

  return editor;
}
