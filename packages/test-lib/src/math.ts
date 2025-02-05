function add(a: number, b: number): number {
  return a + b;
}

export { add };

// Function to create and append a rich text editor
export function mypackage(id: string): void {
  // Find the container element by id
  const container = document.getElementById(id);
  console.log('stringgggggg ididididididididi', id);

  if (!container) {
    console.error(`Element with id ${id} not found`);
    return;
  }

  // Create the editor toolbar
  const toolbar = document.createElement('div');
  toolbar.style.borderBottom = '1px solid #ccc';
  toolbar.style.padding = '5px';
  toolbar.style.display = 'flex';
  toolbar.className = 'toolbar px-4 py-2 bg-gray-800 text-black';
  toolbar.style.gap = '10px';

  // Create the bold button
  const boldButton = document.createElement('button');
  boldButton.innerHTML = '<b>B</b>';
  boldButton.style.fontWeight = 'bold';
  boldButton.onclick = () => document.execCommand('bold');

  // Create the italic button
  const italicButton = document.createElement('button');
  italicButton.innerHTML = '<i>I</i>';
  italicButton.style.fontStyle = 'italic';
  italicButton.onclick = () => document.execCommand('italic');

  // Create the underline button
  const underlineButton = document.createElement('button');
  underlineButton.innerHTML = '<u>U</u>';
  underlineButton.style.textDecoration = 'underline';
  underlineButton.onclick = () => document.execCommand('underline');

  // Create the justify left button
  const leftButton = document.createElement('button');
  leftButton.innerHTML = 'L';
  leftButton.onclick = () => document.execCommand('justifyLeft');

  // Create the justify center button
  const centerButton = document.createElement('button');
  centerButton.innerHTML = 'C';
  centerButton.onclick = () => document.execCommand('justifyCenter');

  // Create the justify right button
  const rightButton = document.createElement('button');
  rightButton.innerHTML = 'R';
  rightButton.onclick = () => document.execCommand('justifyRight');

  // Append buttons to the toolbar
  toolbar.appendChild(boldButton);
  toolbar.appendChild(italicButton);
  toolbar.appendChild(underlineButton);
  toolbar.appendChild(leftButton);
  toolbar.appendChild(centerButton);
  toolbar.appendChild(rightButton);

  // Create the text editor area (contenteditable div)
  const editor = document.createElement('div');
  editor.contentEditable = 'true';
  editor.style.border = '1px solid #ccc';
  editor.style.padding = '10px';
  editor.style.minHeight = '200px';
  editor.style.marginTop = '10px';
  editor.style.overflowY = 'auto';

  // Append toolbar and editor to the container
  container.appendChild(toolbar);
  container.appendChild(editor);
}
