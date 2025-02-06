export const handleBtnCssToggle = (uniqueId) => {
  const toolbar = document.getElementById(`${uniqueId}-toolbar`);
  // const toolbarSelects = toolbar.querySelectorAll('select[data-command-id]');
  // for (const select of toolbarSelects) {
  //   const value = document.queryCommandValue(select.dataset.commandId);
  //   const option = Array.from(select.options).find(
  //     (option) => option.value === value
  //   );
  //   select.selectedIndex = option ? option.index : -1;
  // }

  const toolbarButtons = toolbar.querySelectorAll('button[data-command]');

  for (const button of toolbarButtons) {
    const active = document.queryCommandState(button.dataset.command);
    button.classList.toggle('bg-gray-200', active);
    button.classList.toggle('border', active);
    button.classList.toggle('border-gray-700', active);
  }

  const inputButtons = toolbar.querySelectorAll('input[data-command-id]');
  for (const input of inputButtons) {
    const value = document.queryCommandValue(input.dataset.command);
    input.value = rgbToHex(value);
  }
};