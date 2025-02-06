import { ToolbarButtons } from '../types/toobar-types';
import { infoIcon } from '../data/toolbar-data';
import { createLinkModal } from './link-modal';
import { handleBtnCssToggle } from '../utils.ts/handle-toolcss';

export function createToolbar(
  toolbarData: ToolbarButtons[][],
  uniqueId: string
): HTMLElement {
  const toolbar = document.createElement('div');

  toolbar.className = ` relative inset-0 min-h-8 gap-[0.3rem] py-1 flex flex-row max-w-full flex-wrap items-center border-b  border-gray-200 `;
  toolbar.id = `${uniqueId}-toolbar`;

  function handleBtnClick(command: string) {
    document.getElementById(`${uniqueId}-text-area`)?.focus();
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement;

    // Remove the format if it was already applied
    if (parentElement && parentElement.tagName.toLowerCase() === command) {
      const content = parentElement.innerHTML;
      parentElement.outerHTML = content;
    }
    if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
      const alignment =
        document.queryCommandValue('justifyLeft') ||
        document.queryCommandValue('justifyRight') ||
        document.queryCommandValue('justifyCenter') ||
        document.queryCommandValue('justifyFull');

      if (alignment !== 'left') {
        document.execCommand('justifyLeft');
      } else {
        return;
      }
    }

    const exculudedCmd = [
      'justifyLeft',
      'justifyRight',
      'justifyCenter',
      'justify',
      'justifyFull',
    ];
    const bulletinActive =
      document.queryCommandState('insertUnorderedList') ||
      document.queryCommandState('insertOrderedList');

    // if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
    //   validJustifyCommands.forEach((cmd) => {
    //     document.execCommand(cmd, false, false);
    //   });
    // }
    if (bulletinActive && exculudedCmd.some((cmd) => command.includes(cmd))) {
      handleBtnCssToggle(uniqueId);
      return;
    }
    document.execCommand(command);
    handleBtnCssToggle(uniqueId);
  }

  // tool tip functionality
  let hoverTimeout: number;
  type Action = 'show' | 'hide';
  function handleTooltip(id: string, action: Action) {
    const tooltip = document.getElementById(id);

    if (tooltip) {
      if (action === 'show') {
        tooltip.classList.remove('opacity-0');
        tooltip.classList.add('opacity-100');
      }
      if (action === 'hide') {
        tooltip.classList.remove('opacity-100');
        tooltip.classList.add('opacity-0');
      }
    }
  }

  const shortcutMap: Record<string, string> = {
    b: 'bold',
    i: 'italic',
    u: 'underline',
  };
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
      const command = shortcutMap[event.key.toLowerCase()];
      if (command) {
        event.preventDefault();
        const button = toolbar.querySelector(
          `button[data-command="${command}"]`
        );
        if (button) {
          // const btnId = button.id;
          handleBtnClick(command);
        }
      }
    }
  });

  // toolbar UI rendering with loop

  console.time('toolbarRendering');

  toolbarData.forEach((innerArray, sectionIndex) => {
    const toolbarSection = document.createElement('div');
    toolbarSection.className = `toolbar-section-${sectionIndex} order-${
      sectionIndex + 1
    } px-1 py-[1px] gap-[2px]  rounded-md flex justify-center`;

    // creating tools
    innerArray.forEach(({ label, command, btnTypes, toolTipDesc, svg }) => {
      const uniqueIds = `${Date.now()}_${Math.floor(Math.random() * 90) + 10}`;
      // creating tooltips
      const tooltip = document.createElement('div');
      const tooltipId = `${uniqueIds}-toolbarItem-toolTip`;
      tooltip.id = tooltipId;
      tooltip.className = `p-1 text-gray-500 text-[10px] opacity-0 pointer-events-none inline-flex gap-[2px] tracking-wider translate-y-[-10px] max:w-full transition-all duration-300 ease-in-out text-center rounded-sm leading-tight font-semibold !bg-gray-200 text- absolute top-12`;
      const infoicon: string = infoIcon;
      tooltip.innerHTML = `${toolTipDesc} ${infoicon}`;

      //creating tools
      if (btnTypes) {
        const toolBarContainer = document.createElement('div');
        const toolbarItem = document.createElement('input');
        toolbarItem.style.display = 'none';
        toolbarItem.type = btnTypes;
        // file upload functionality
        toolbarItem.onchange = function handleFileUpload(event) {
          // const file = event.target.files[0];
          // we were getting  event.target doesnt have property files since it diodnot know it was a  input element with type FILE SO :
          const input = event.target as HTMLInputElement; // Type assertion
          const file = input.files?.[0];
          const reader = new FileReader();

          reader.onload = function (e) {
            const img = document.createElement('img');
            if (typeof e.target?.result === 'string') {
              img.src = e.target.result;
              console.error('Unexpected result type', e.target.result);
            }
            const parent = document.getElementById(`${uniqueId}-text-area`);
            if (parent) {
              parent.appendChild(img);
            }
          };
          reader.readAsDataURL(file);
        };

        const btnId = `${uniqueId}-toolbarItem-${label}`;
        toolBarContainer.id = btnId;
        toolBarContainer.className = `flex items-center justify-center rounded-sm hover:cursor-pointer  hover:bg-gray-200 p-[2px] h-6 w-6 sm:h-auto sm:w-auto`;
        const svgElement = new DOMParser().parseFromString(
          svg,
          'image/svg+xml'
        ).documentElement;
        // console.log('svg elemenet', svgElement);

        svgElement.addEventListener('click', () => {
          toolbarItem.click();
        });
        toolBarContainer.appendChild(svgElement);
        toolBarContainer.appendChild(toolbarItem);
        toolbarSection.appendChild(toolBarContainer);
      } else {
        const btnTool = document.createElement('button');
        const btnHolder = document.createElement('div');
        btnHolder.className = `h-8 w-8 flex justify-center items-center`;
        btnHolder.id = `${uniqueId}-btnHolder-${label}`;

        btnTool.innerHTML = svg;
        btnTool.dataset.command = command;
        const btnId = `${uniqueId}-toolbarItem-${label}`;
        btnTool.id = btnId;
        btnTool.className = `flex items-center justify-center rounded-sm hover:cursor-pointer  hover:bg-gray-200 p-[2px] h-6 w-6 sm:h-auto sm:w-auto`;
        btnTool.onclick = (event) => {
          console.log('BTN TOOL LOGGED');

          const currentTarget = event.currentTarget as HTMLElement; // Type assertion
          if (currentTarget) {
            console.log('BTN TOOL LOGGED 2');

            if (currentTarget.id === `${uniqueId}-toolbarItem-link`) {
              console.log('BTN TOOL LOGGED 3');
              createLinkModal(uniqueId);
              const ourLinkModal = document.getElementById(
                `${uniqueId}-linkModal`
              );
              if (ourLinkModal) {
                ourLinkModal.classList.remove('hidden');
              }
            } else {
              handleBtnClick(command);
            }
          }
        };

        btnTool.addEventListener('mouseover', () => {
          hoverTimeout = setTimeout(function () {
            handleTooltip(tooltipId, 'show');
          }, 1500);
        });
        1;
        btnTool.addEventListener('mouseout', () => {
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
          }
          handleTooltip(tooltipId, 'hide');
        });
        // document.addEventListener('keydown', () => {
        //   debounceStyling(btnId, command);
        // });
        btnHolder.appendChild(btnTool);
        toolbarSection.appendChild(btnHolder);
      }

      toolbarSection.appendChild(tooltip);
    });

    const separator = document.createElement('span');
    separator.className = `mr-2`;

    toolbar.appendChild(toolbarSection);
    toolbar.appendChild(separator);
  });

  console.timeEnd('toolbarRendering');
  // const editArea = document.getElementById(`testId-text-area`);

  return toolbar;
}
