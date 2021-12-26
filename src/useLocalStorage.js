

function useLocalStorage(initialBoard) {
  const prevValues = (move) => {
    if (move === 1) {
      return initialBoard;
    } else {
      const prevMove = move - 1;
      const stringifiedState = JSON.stringify(prevMove);
      const resultStr = localStorage.getItem(stringifiedState);
      const currentBoardState = JSON.parse(resultStr);
      return currentBoardState;
    }
  };

  const setItem = (move, boardState) => {
    const stringifiedObj = JSON.stringify(boardState);
    const stringifiedState = JSON.stringify(move);
    localStorage.setItem(stringifiedState, stringifiedObj);
  };

  return [prevValues, setItem];
}

export default useLocalStorage;
