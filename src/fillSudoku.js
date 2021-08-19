const isCorrect = (arr, row, column, k) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[row][i] === k || arr[i][column] === k) {
      return false;
    }
  }
  const start = Math.floor(row / 3) * 3;
  const colStart = Math.floor(column / 3) * 3;
  for (let i = start; i < start + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (arr[i][j] === k) {
        return false;
      }
    }
  }
  return true;
};

const fillSudoku = (sudoku) => {
  for (let row = 0; row < sudoku.length; row++) {
    for (let col = 0; col < sudoku[row].length; col++) {
      if (sudoku[row][col] === '') {
        for (let k = 1; k < 10; k++) {
          if (isCorrect(sudoku, row, col, k)) {
            sudoku[row][col] = k;
            if (fillSudoku(sudoku)) {
              return true;
            } else {
              sudoku[row][col] = '';
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

const validateSudoku = (sudoku) => {
  const msg = 'Некорректные данные в поле судоку';
  for (let row = 0; row < sudoku.length; row++) {
    for (let col = 0; col < sudoku[row].length; col++) {
      if (sudoku[row][col] !== '') {
        sudoku[row][col] = parseInt(sudoku[row][col], 10);
        if (isNaN(sudoku[row][col]) || sudoku[row][col] < 1 || sudoku[row][col] > 9) {
          return msg;
        }
        const temp = sudoku[row][col];
        sudoku[row][col] = '';
        const isCuerrentValueCorrect = isCorrect(sudoku, row, col, temp);
        sudoku[row][col] = temp;
        if (!isCuerrentValueCorrect) {
          return msg;
        }
      }
    }
  }
};

export { fillSudoku, validateSudoku };
