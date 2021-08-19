import createTable from './createTable.js';
import { fillSudoku, validateSudoku } from './fillSudoku.js';
import { renderAlert, renderTableContent } from './render.js';

const copyArr = (arr) => {
  const copy = [];
  for (let i = 0; i < arr.length; i++) {
    copy.push([...arr[i]]);
  }
  return copy;
};

const writeCellValue = (state) => {
  const row = state.activeCell.parentElement.rowIndex;
  const col = state.activeCell.cellIndex;
  state.sudoku[row][col] = state.activeCell.firstElementChild.value;
  state.activeCell = null;
};

export default () => {
  const arr = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
  ];
  const state = {
    sudoku: copyArr(arr),
    activeCell: null,
    alert: '',
  };

  const table = createTable(9, 9);
  const container = document.querySelector('.container');
  container.prepend(table);
  const clearButton = document.getElementById('clear_button');
  const fillButton = document.getElementById('fill_button');

  document.addEventListener('click', function handler(event) {
    let isRenderNeeded = false;
    if (state.activeCell) {
      writeCellValue(state);
      isRenderNeeded = true;
    }
    if (event.target.tagName === 'TD') {
      state.activeCell = event.target;
      isRenderNeeded = true;
    }
    if (event.target.id === 'clear_button') {
      state.activeCell = null;
      state.sudoku = copyArr(arr);
      isRenderNeeded = true;
    }
    if (isRenderNeeded) renderTableContent(state, table);
    if (event.target.id === 'fill_button') {
      clearButton.disabled = true;
      fillButton.disabled = true;
      document.removeEventListener('click', handler);
      const error = validateSudoku(state.sudoku);
      if (error) {
        state.alert = error;
        renderAlert(state);
      } else {
        const isFilled = fillSudoku(state.sudoku);
        if (!isFilled) {
          state.alert = 'Решений нет';
          renderAlert(state);
        }
        renderTableContent(state, table);
      }
      clearButton.disabled = false;
      fillButton.disabled = false;
      document.addEventListener('click', handler);
    }
  });
};
