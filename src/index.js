module.exports = function solveSudoku(matrix) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] == 0) {
        for (let value = 1; value <= 9; value++) {
          if (canAddValue(matrix, i, j, value)) {
            matrix[i][j] = value;
            var copy = matrix.map(r => [...r]);
            var solveAttempt = solveSudoku(copy);
            if (isSolved(solveAttempt)) {
              return solveAttempt;
            }
          }
        }
      return matrix;    
      }
    }
  }
  return matrix;
}

function isSolved(matrix) {
  for (let i = 0; i < 9; i++) {
    if (matrix[i].includes(0)) {
      return false;
    }
  }
  return true;
}

function canAddValue(matrix, i, j, value) {
  return canAddToCell(matrix, i, j, value)
    && canAddToColumn(matrix, j, value)
    && canAddToRow(matrix, i, value);
}

function canAddToRow(matrix, i, value) {
  return !matrix[i].includes(value);
}

function canAddToColumn(matrix, j, value) {
  return !matrix.reduce((s,v)=>s.add(v[j]), new Set()).has(value);
}

function canAddToCell(matrix, i, j, value) {
  let [r,c] = [Math.floor(i / 3) * 3, Math.floor(j / 3) * 3];
  return !matrix.slice(r,r+3).reduce((s,v)=>v.slice(c,c+3).reduce((s,v)=>s.add(v),s), new Set()).has(value);
}
