export const createLinkModal = (parentID: string) => {
  let modal = document.getElementById(`${parentID}-linkModal`);
  const selection = window.getSelection();
  let selectedText = selection?.toString();
  const range = selection?.getRangeAt(0);

  if (!modal) {
    modal = document.createElement('div');
    modal.id = `${parentID}-linkModal`;
  } else {
    modal.classList.remove('hidden');
  }

  const parent = document.getElementById(`${parentID}-btnHolder-link`);
  const rect = parent.getBoundingClientRect();
  // let selectedText = selection?.toString();
  // console.log('selcted text ', selectedText);
  let selectedRange = range;

  // const targetHeight = modal.offsetHeight;

  modal.style.position = 'absolute';
  modal.style.left = `${rect.left - 27}px`;
  modal.style.top = `${rect.bottom + 8}px`;
  modal.style.width = `${rect.width}px`;
  modal.style.height = `${rect.height}px`;

  modal.className = `border-gray-500 flex items-center justify-center h-auto w-auto  bg-opacity-90 rounded-md z-50 hidden backdrop-blur-xs`;

  let modalContent = modal.querySelector(`#${parentID}-modalContent`);
  if (!modalContent) {
    modalContent = document.createElement('div');
    modalContent.id = `${parentID}-modalContent`;
    modalContent.className = `bg-white border border-gray-200 p-1.5 rounded-lg shadow-lg`;

    const header = document.createElement('p');
    header.className = `text-xs font-bold p-1`;
    header.innerText = 'Add Link';

    const labelText = document.createElement('label');
    labelText.className = `block text-xs font-semibold text-gray-700 pt-2 pl-1`;
    labelText.setAttribute('for', `${parentID}link-text`);
    labelText.innerText = 'Link Address';

    const inputText = document.createElement('input');
    inputText.id = `${parentID}-link-text`;
    inputText.type = 'text';
    inputText.placeholder = 'Enter link address';
    inputText.className = `block text-xs p-1 py-1.5 border border-gray-300 rounded-md`;

    const buttonContainer = document.createElement('div');
    buttonContainer.className = `p-1 flex gap-1 mt-2 justify-end`;

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.className = `bg-gray-300 text-white p-1 px-1.5 text-xs hover:cursor-pointer rounded-xs mr-2 hover:bg-gray-400`;

    const okButton = document.createElement('button');
    okButton.innerText = 'Add';
    okButton.className = `bg-blue-500 text-white p-1 px-1.5 text-xs hover:cursor-pointer rounded-xs hover:bg-blue-600`;

    // cancelButton.replaceWith(cancelButton.cloneNode(true));
    // okButton.replaceWith(okButton.cloneNode(true));

    cancelButton.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });
    // inputText.addEventListener('focus', () => {
    //   if (window.getSelection) {
    //     window.getSelection().removeAllRanges();
    //   } else if (document.selection) {
    //     document.selection.empty();
    //   }
    // });
    inputText.addEventListener('focus', () => {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
    });
    okButton.addEventListener('click', () => {
      var sel = window.getSelection();
      var selDoc = document.getSelection();
      sel.removeAllRanges();
      selDoc?.removeAllRanges();

      if (selectedRange && selectedText) {
        insertLinkAtCursor(inputText.value, selectedText);
        modal?.classList.add('hidden');
      } else {
        alert('Please select text to create a link.');
      }
    });

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(okButton);
    modalContent.appendChild(header);
    modalContent.appendChild(labelText);
    modalContent.appendChild(inputText);
    modalContent.appendChild(buttonContainer);

    modal.appendChild(modalContent);
  }

  if (!document.getElementById(`${parentID}-toolbar`).contains(modal)) {
    document.getElementById(`${parentID}-toolbar`)?.appendChild(modal);
  }

  function insertLinkAtCursor(linkUrl: string, linkText: string) {
    selection.removeAllRanges();
    // selDoc?.removeAllRanges()

    if (linkText && linkUrl) {
      const linkElement = document.createElement('a');
      linkElement.href = linkUrl;
      linkElement.style.cursor = 'pointer';
      linkElement.style.color = 'blue';
      linkElement.target = '_blank';
      linkElement.contentEditable = 'false';
      linkElement.innerText = linkText;

      selectedRange.deleteContents();
      selectedRange.insertNode(linkElement);
      modal?.remove();

      const textNode = document.createTextNode('');
      const rangeAfterLink = document.createRange();
      rangeAfterLink.setStartAfter(linkElement);
      rangeAfterLink.setEndAfter(linkElement);
      rangeAfterLink.insertNode(textNode);
      const newRange = document.createRange();
      newRange.setStartAfter(textNode);
      newRange.setEndAfter(textNode);

      // Set the selection to the new range, which places the cursor after the link
      selection?.removeAllRanges();
      selection?.addRange(newRange);

      // Hide the modal after inserting the link
      modal?.remove();
    }
  }
};
