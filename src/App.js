import React, { useRef } from "react";
import "./App.css";
import ButtonRewind from "./ButtonRewind";
import Item from "./Item";
import useLocalStorage from "./useLocalStorage";

const initialBoard = [
  { id: 1, value: null },
  { id: 2, value: null },
  { id: 3, value: null },
  { id: 4, value: null },
  { id: 5, value: null },
  { id: 6, value: null },
  { id: 7, value: null },
  { id: 8, value: null },
  { id: 9, value: null },
];

function App() {
  const [board, setBoard] = React.useState(initialBoard);
  const [player_x, setPlayer] = React.useState(true);
  const [win, setWin] = React.useState(false);

  const moveNumber = React.useRef(0);
  const [moveNum, setMoveNum] = React.useState([]);
  const [prevValues, setItem] = useLocalStorage(initialBoard);

  const winner = player_x ? "O" : "X";

  const restart = () => {
    setBoard(initialBoard);
    setWin(false);
    moveNumber.current = 0;
    setMoveNum([]);
    localStorage.clear();
    setPlayer(true);
  };

  const checkForVictory = (array) => {
    if (
      array[0].value &&
      array[0].value == array[1].value &&
      array[0].value == array[2].value
    ) {
      setWin(true);
    } else if (
      array[3].value &&
      array[3].value == array[4].value &&
      array[3].value == array[5].value
    ) {
      setWin(true);
    } else if (
      array[6].value &&
      array[6].value == array[7].value &&
      array[6].value == array[8].value
    ) {
      setWin(true);
    } else if (
      array[0].value &&
      array[0].value == array[3].value &&
      array[0].value == array[6].value
    ) {
      setWin(true);
    } else if (
      array[1].value &&
      array[1].value == array[4].value &&
      array[1].value == array[7].value
    ) {
      setWin(true);
    } else if (
      array[2].value &&
      array[2].value == array[5].value &&
      array[2].value == array[8].value
    ) {
      setWin(true);
    } else if (
      array[0].value &&
      array[0].value == array[4].value &&
      array[0].value == array[8].value
    ) {
      setWin(true);
    } else if (
      array[2].value &&
      array[2].value == array[4].value &&
      array[2].value == array[6].value
    ) {
      setWin(true);
    } else {
      return;
    }
  };

  const clickHandler = (event) => {
    if (win) {
      return;
    } else {
      const squareId = event.target.id;
      board.forEach((el) => {
        if (el.id == squareId && !el.value) {
          updateBoard(event);
        }
      });
    }
  };

  const updateBoard = (event) => {
    const squareId = event.target.id;
    const newBoard = board.map((el) => {
      if (el.id == squareId && player_x) {
        return { id: el.id, value: "x" };
      } else if (el.id == squareId && !player_x) {
        return { id: el.id, value: "o" };
      } else {
        return { ...el };
      }
    });
    setBoard(newBoard);
    setPlayer((prevValue) => !prevValue);
    checkForVictory(newBoard);
    moveNumber.current++;
    const currentMove = moveNumber.current;
    const moves = moveNum;
    moves.push(currentMove);
    setMoveNum([...moves]);
    setItem(currentMove, newBoard);
  };

  const rewindGameHandler = (stepNumber) => {
    if (stepNumber === 1) {
      setBoard([...initialBoard]);
      moveNumber.current = 0;
      setMoveNum([]);
      localStorage.clear();
      setPlayer(true);
    } else {
      const lastState = prevValues(stepNumber);
      moveNumber.current--;
      setBoard([...lastState]);
      const moves = moveNum;
      moves.pop();
      setMoveNum([...moves]);
    }
  };

  return (
    <div className={win ? "winnerClass" : "App"}>
      <h1>Kółko i Krzyżyk</h1>

      <div className={win ? "winnerClass-board" : "game-container"}>
        {board.map((el) => (
          <Item
            key={el.id}
            id={el.id}
            value={el.value}
            onClick={clickHandler}
          />
        ))}
      </div>
      {win && <p className="message">Wygrywa {winner}</p>}
      {win && (
        <button type="button" className="restart-button" onClick={restart}>
          Zagraj jeszcze raz!
        </button>
      )}
      {!win && !board.find((el) => el.value === null) && (
        <button type="button" className="restart-button" onClick={restart}>
          Zagraj jeszcze raz!
        </button>
      )}
      <div className="buttons-container">
        {!win &&
          moveNum.map((el) => (
            <ButtonRewind
              key={el}
              id={el}
              moveNum={moveNum}
              onClick={() => rewindGameHandler(el)}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
