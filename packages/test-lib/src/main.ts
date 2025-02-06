import { createToolbar } from '../src/componenets/toolbar';
import { createEditor } from '../src/componenets/editor';
// import { MenuItem } from './src/types/menutypes';
import { ToolbarButtons } from '../src/types/toobar-types';
import { ToolBarData } from '../src/data/toolbar-data';
// import { jsonToHtml } from '../src/utils.ts/jsonto-html';

// interface EditorOptions {
//   toolbarData?: ToolbarButtons[][];
//   onDataChange?: (json: any[]) => void;
// }

function createTextEditor(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found.`);
  }

  const uniqueId = containerId;
  container.className = 'border border-gray-300 flex flex-col';

  const toolbarData: ToolbarButtons[][] = ToolBarData || [
    [
      {
        label: '',
        command: 'bold',
        toolTipDesc: 'tooltip desc',
        svg: '<b>B</b>',
      },
      {
        label: '',
        command: 'italic',
        toolTipDesc: 'tooltip desc',
        svg: '<i>I</i>',
      },
      {
        label: '',
        command: 'underline',
        toolTipDesc: 'tooltip desc',
        svg: '<u>U</u>',
      },
    ],
  ];

  const execCommand = (commandId: string, value: any) => {
    document.execCommand(commandId, false, value);
  };

  // Set default paragraph to <p>
  execCommand('defaultParagraphSeparator', 'p');
  execCommand('styleWithCSS', false);

  const toolbar = createToolbar(toolbarData, uniqueId);
  container.insertAdjacentElement('beforebegin', toolbar);

  let currentJsonData: any[] = [];
  const editor = createEditor(uniqueId, updateJsonData);

  function updateJsonData() {
    // currentJsonData = json;
    // if (options.onDataChange) {
    //   options.onDataChange(json); // Notify user via callback
    // }
    // json: any[]
  }

  container.appendChild(toolbar);
  container.appendChild(editor);

  const testBtn = document.createElement('button');
  testBtn.className = 'py-2 px-3 text-base';
  testBtn.innerText = 'test';

  return {
    getContent: () => editor.innerHTML,
    setContent: (content: string) => {
      editor.innerHTML = content;
    },
    getjson: () => currentJsonData,
  };
}

export { createTextEditor };

// EXAMPLE USE
// const display = document.createElement('div');
// display.className = `p-4`;

// createTextEditor('testId');

// Optionally, you can still get the current data manually
// const data = ourEditor.getjson();
