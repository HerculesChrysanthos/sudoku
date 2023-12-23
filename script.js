let initialState;
let solvedState;
let selectedCell;

let emptyCells = [];

function initializeEmptyCells() {
  const cells = document.querySelectorAll('#sudoku-board td');
  emptyCells = Array.from(cells).filter(
    (cell) => !cell.classList.contains('filled')
  );
}

function updateEmptyCells(cell) {
  const index = emptyCells.indexOf(cell);
  if (index !== -1) {
    emptyCells.splice(index, 1);

    // Check if it was the last empty cell
    if (emptyCells.length === 0) {
      console.log('The last empty cell was filled!');

      alert('Congratulations! You have successfully completed the Sudoku.');
      loadGame();
    }
  }
}

function renderTable(game) {
  const table = document.getElementById('sudoku-board');

  table.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('td');

      if (game[i][j] !== 0) {
        cell.textContent = game[i][j];
        cell.classList.add('filled');
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function loadGame() {
  const difficulty = document.getElementById('difficulty').value;

  fetch(`games/${difficulty}.json`)
    .then((response) => response.json())
    .then((data) => {
      initialState = data.initialState;
      solvedState = data.solvedState;

      renderTable(initialState);
      initializeEmptyCells();
      cellClickListeners();
      numberClickListeners();
    })
    .catch((error) => console.error('Error loading JSON:', error));
}

function loadNumbers() {
  const numbers = document.getElementById('numbers');

  const numberArray = [];
  for (let index = 0; index < 9; index++) {
    numberArray.push(index + 1);
  }

  const numbersHtml = `
 
      ${numberArray
        .map(
          (number) => `
              <p value="${number}">${number}</p>
          `
        )
        .join('')}
  
`;

  numbers.innerHTML = numbersHtml;
}

let selectedGeneralCell;

function cellClickListeners() {
  const cells = document.querySelectorAll('#sudoku-board td');
  cells.forEach((cell) => {
    cell.addEventListener('click', function () {
      if (!this.classList.contains('filled')) {
        if (selectedCell) {
          selectedCell.classList.remove('selected');
        }

        this.classList.add('selected');

        selectedCell = this;
      }
    });
  });
}

function numberClickListeners() {
  const numbers = document.getElementById('numbers').querySelectorAll('p');

  numbers.forEach((number) => {
    number.addEventListener('click', function (event) {
      const selectedLi = event.target;
      const selectedNumber = parseInt(selectedLi.getAttribute('value'));

      const row = selectedCell.parentNode.rowIndex;
      const cell = selectedCell.cellIndex;

      if (solvedState[row][cell] === selectedNumber) {
        if (!isNaN(selectedNumber) && selectedCell) {
          selectedCell.textContent = selectedNumber;
          selectedCell.classList.remove('incorrect');
          updateEmptyCells(selectedCell);
        }
      } else {
        selectedCell.classList.remove('selected');
        selectedCell.classList.add('incorrect');
        selectedCell.textContent = selectedNumber;
      }
    });
  });
}
