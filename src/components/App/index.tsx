import React, { useState, useEffect } from "react";
import NumberDisplay from "../NumberDisplay";
import { generateCells } from "../../utils";
import "./App.scss";
import Button from "../Button";
import { CellState, Face } from "../../types";
import { Cell } from "../../types";
import { MAX_COLS, MAX_ROWS } from "../../constants";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.observe);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.concern);
    };
    const handleMouseUp = (): void => {
      setFace(Face.observe);
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);
  const openCells = (rowParam: number, columnParam: number): void => {
    const adjacentToClickedCell = [
      { row: rowParam - 1, column: columnParam },
      { row: rowParam + 1, column: columnParam },
      { row: rowParam, column: columnParam - 1 },
      { row: rowParam, column: columnParam + 1 },
      { row: rowParam - 1, column: columnParam + 1 },
      { row: rowParam - 1, column: columnParam - 1 },
      { row: rowParam + 1, column: columnParam + 1 },
      { row: rowParam + 1, column: columnParam - 1 },
    ];
    const checkIndexNotVisibleAndValid = (index: number): boolean => {
      if (
        adjacentToClickedCell[index].row < MAX_ROWS &&
        adjacentToClickedCell[index].row !== -1 &&
        adjacentToClickedCell[index].column < MAX_COLS &&
        adjacentToClickedCell[index].column !== -1 &&
        cells[adjacentToClickedCell[index].row][
          adjacentToClickedCell[index].column
        ].state !== CellState.visible
      )
        return true;
      else return false;
    };
    const updateSells = (index: number): void => {
      const newCells = cells.slice();
      newCells[adjacentToClickedCell[index].row][
        adjacentToClickedCell[index].column
      ].state = CellState.visible;
      newCells[rowParam][columnParam].state = CellState.visible;

      setCells(newCells);
    };

    for (let index = 0; index < adjacentToClickedCell.length; index++) {
      const currentRow = adjacentToClickedCell[index].row;
      const currentColumn = adjacentToClickedCell[index].column;

      if (checkIndexNotVisibleAndValid(index)) {
        if (cells[currentRow][currentColumn].value === 9) return;

        if (cells[currentRow][currentColumn].value === 0) {
          updateSells(index);

          openCells(currentRow, currentColumn);
        }

        updateSells(index);
      }
    }
  };

  const handleCellClick =
    (rowParam: number, columnParam: number) => (): void => {
      if (!live) {
        setLive(true);
      }
      const currentCell = cells[rowParam][columnParam];
      const newCells = cells.slice();
      if (
        currentCell.state === CellState.visible ||
        currentCell.state === CellState.flagged
      ) {
        return;
      }

      if (currentCell.value === 9) {
        //TODO handle bomb  click
      } else if (currentCell.value === 0) {
        openCells(rowParam, columnParam);
      } else {
        newCells[rowParam][columnParam].state = CellState.visible;
        setCells(newCells);
      }
    };
  const handleCellContext =
    (rowParam: number, columnParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();
      if (!live) return;
      const currentCells = cells.slice();
      const currentCell = cells[rowParam][columnParam];
      if (currentCell.state === CellState.visible) return;
      else if (currentCell.state === CellState.hidden) {
        currentCells[rowParam][columnParam].state = CellState.flagged;
        setCells(currentCells);
        setBombCounter(bombCounter - 1);
      } else if (currentCell.state === CellState.flagged) {
        currentCells[rowParam][columnParam].state = CellState.hidden;
        setCells(currentCells);
        setBombCounter(bombCounter + 1);
      }
    };

  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
      setBombCounter(10);
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, columnIndex) => (
        <Button
          key={`${rowIndex}-${columnIndex}`}
          state={cell.state}
          value={cell.value}
          onClick={handleCellClick}
          row={rowIndex}
          column={columnIndex}
          onContext={handleCellContext}
        ></Button>
      ))
    );
  };
  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={bombCounter}></NumberDisplay>
        <div className="Face" onClick={handleFaceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={time}></NumberDisplay>
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
