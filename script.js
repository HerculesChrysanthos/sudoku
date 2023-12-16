let initialState;
let solvedState;
let selectedCell;

function renderTable(game) {
  const table = document.getElementById('sudoku-board');

  for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr');
    // const row = table.insertRow(i);

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('td');
      //   const input = document.createElement('input');
      //   input.type = 'text';
      //   input.maxLength = 1;
      //   input.dataset.row = i;
      //   input.dataset.col = j;

      /**
       * Disable input for the pre defined cells
       */
      if (game[i][j] !== 0) {
        //   input.value = game[i][j];
        //   input.disabled = true;
        cell.textContent = game[i][j];
        cell.classList.add('filled');
      }

      //   if (row == 2 || row == 5) {
      //     tile.classList.add('horizontal-line');
      //   }
      //   if (cell == 2 || cell == 5) {
      //     tile.classList.add('vertical-line');
      //   }

      //cell.appendChild(input);
      row.appendChild(cell);

      //   console.log(cell);
    }
    table.appendChild(row);
  }
}

function loadGame() {
  const difficulty = document.getElementById('difficulty').value;
  //const sudokuBoard = document.getElementById('sudoku-board');

  fetch(`games/${difficulty}.json`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      initialState = data.initialState;
      solvedState = data.solvedState;

      renderTable(initialState);
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

function cellClickListeners() {
  const cells = document.querySelectorAll('#sudoku-board td');
  cells.forEach((cell) => {
    cell.addEventListener('click', function () {
      console.log('mpike');
      if (!this.classList.contains('filled')) {
        selectedCell = this;
        console.log('mpike2222');
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

      // selectedLi.classList.add('blurred');

      console.log(selectedCell, selectedLi, selectedNumber);
      console.log(selectedCell.parentNode.rowIndex, selectedCell.cellIndex);

      const row = selectedCell.parentNode.rowIndex;
      const cell = selectedCell.cellIndex;

      console.log(solvedState[row][cell]);
      if (solvedState[row][cell] === selectedNumber) {
        console.log('ok');

        if (!isNaN(selectedNumber) && selectedCell) {
          selectedCell.textContent = selectedNumber;
          selectedCell.classList.remove('incorrect');
        }
      } else {
        selectedCell.classList.add('incorrect');
        selectedCell.textContent = selectedNumber;
      }
    });
  });
}
