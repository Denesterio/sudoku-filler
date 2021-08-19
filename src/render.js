const pasteInput = (parent) => {
  const input = document.createElement('input');
  input.classList.add('input_number');
  input.value = parent.textContent;
  parent.innerHTML = '';
  parent.append(input);
  input.focus();
};

const renderTableContent = (state, table) => {
  for (const row of table.rows) {
    for (const cell of row.cells) {
      if (cell.id === state.activeCell?.id) {
        pasteInput(cell);
      } else {
        cell.textContent = state.sudoku[row.rowIndex][cell.cellIndex];
      }
    }
  }
};

const renderAlert = (state) => {
  if (state.alert.length > 0) {
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = state.alert;
    document.body.prepend(alert);
    setTimeout(() => {
      alert.remove();
      state.alert = '';
    }, 3000);
  }
};

export { renderAlert, renderTableContent };
