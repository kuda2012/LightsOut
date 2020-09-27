import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { cloneDeep, isEqual } from "lodash";
import userEvent from "@testing-library/user-event";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  let [gameOver, setGameOver] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        chanceLightStartsOn = Math.random() * 1 <= 0.5 ? true : false;
        row.push(chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon(checkBoard) {
    // TODO: check the board in state to determine whether the player has won.
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (checkBoard[i][j] == true) {
          return false;
        }
      }
    }
    return true;
  }
  function reset() {
    setBoard(createBoard());
    setGameOver(false);
  }

  function flipCellsAround(coord, gameOver) {
    if (!gameOver) {
      setBoard(() => {
        const [y, x] = coord;
        const flipCell = (y, x, boardCopy) => {
          // if this coord is actually on board, flip it
          boardCopy = cloneDeep(board);
          if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
            boardCopy[y][x] = !boardCopy[y][x];
            if (y + 1 < ncols) boardCopy[y + 1][x] = !boardCopy[y + 1][x];
            if (y - 1 >= 0) boardCopy[y - 1][x] = !boardCopy[y - 1][x];
            if (x + 1 < nrows) boardCopy[y][x + 1] = !boardCopy[y][x + 1];
            if (x - 1 >= 0) boardCopy[y][x - 1] = !boardCopy[y][x - 1];
          }
          return boardCopy;
        };

        // TODO: Make a (deep) copy of the oldBoard

        // TODO: in the copy, flip this cell and the cells around it

        // TODO: return the copy
        const newBoard = flipCell(y, x, board);
        const isWinner = hasWon(newBoard);
        if (isWinner) {
          setTimeout(() => {
            alert("Congrats you won!");
          }, 1000);
          setGameOver(true);
          return newBoard;
        }
        return newBoard;
      });
    }
  }

  return (
    <>
      <div className="Board">
        {board.map((column, i) => (
          <div className="Board-column">
            {column.map((cell, j) => (
              <div className="Board-cell">
                <Cell
                  flipCellsAroundMe={flipCellsAround}
                  isLit={cell}
                  coordinates={[i, j]}
                  gameOver={gameOver}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="Board-reset">
        <button onClick={() => reset()}>Reset</button>
      </div>
    </>
  );
  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
