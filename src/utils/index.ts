import { MAX_COLS, MAX_ROWS, NUMBER_OF_BOMBS } from "../constants";
// import { Cell, CellState, CellValue } from "../types";
import { Cell, CellState} from "../types";

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        // value: CellValue.none,
        value: 0,
        state: CellState.visible
      });
    }
  }
  let bombsPlaced = 0;
  while (bombsPlaced < NUMBER_OF_BOMBS) {
      console.log('correct bombs', NUMBER_OF_BOMBS)
      console.log('placed', bombsPlaced)
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLS);

    const currentCell = cells[randomRow][randomCol];
    // if (currentCell.value !== CellValue.bomb) {
        if (currentCell.value !== 9) {
        console.log('in if')
      cells[randomRow][randomCol] = {
        ...cells[randomRow][randomCol],
        // value: CellValue.bomb,
        value: 9,
       
      };

      bombsPlaced++;

      const adjacentToBombArray = [
        { row: randomRow - 1, column: randomCol },
        { row: randomRow + 1, column: randomCol },
        { row: randomRow, column: randomCol - 1 },
        { row: randomRow, column: randomCol + 1 },
        { row: randomRow - 1, column: randomCol + 1 },
        { row: randomRow - 1, column: randomCol - 1 },
        { row: randomRow + 1, column: randomCol + 1 },
        { row: randomRow + 1, column: randomCol - 1 },
      ];

      for (let index = 0; index < adjacentToBombArray.length; index++) {
        if (
            adjacentToBombArray[index].row < MAX_ROWS &&
            adjacentToBombArray[index].row !== -1 &&
            adjacentToBombArray[index].column < MAX_COLS &&
            adjacentToBombArray[index].column !== -1
        ) {
          if (
            cells[adjacentToBombArray[index].row][
                adjacentToBombArray[index].column
            // ].value !== CellValue.bomb
        ].value !== 9
          ) {
            cells[adjacentToBombArray[index].row][
                adjacentToBombArray[index].column
            ] = {
              ...cells[adjacentToBombArray[index].row][
                adjacentToBombArray[index].column
              ],
              value: cells[adjacentToBombArray[index].row][
                adjacentToBombArray[index].column].value+1
            };
          }
        }
      }
    }

 
  }
  return cells;
};
