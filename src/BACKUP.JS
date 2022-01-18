import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [grid, setGrid] = useState(3);
  const [time, setTime] = useState(60);
  const [userPref, setUserPref] = useState(1);
  const [startGame, setStartGame] = useState(false);
  const intervalRef = useRef(null);

  let initial = {
    player: 1,
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    gameOver: false,
    winner: undefined,
    steps: 0
  };

  let [boardState, setBoardState] = useState(initial);

  const myfunction = (copyState, cindex, i) => {
    if (copyState.board[i][cindex] === 0) {
      copyState.board[i][cindex] = copyState.player;
      let result = gameLogin(copyState.board, copyState.player, i, cindex);
      if (result) {
        copyState.gameOver = true;
        copyState.winner = copyState.player;
        clearInterval(intervalRef.current);
        setStartGame(false);
      } else {
        copyState.winner = 0;
      }
      copyState.steps += 1;

      if (copyState.steps === 9) {
        if (!result) {
          copyState.winner = "Draw";
          clearInterval(intervalRef.current);
          setStartGame(false);
        }
        copyState.gameOver = true;
      }

      copyState.player = -copyState.player;
      setBoardState(copyState);
    }
  }

  const checkEmpty = () => {
    const row = Math.ceil(Math.random() * (3));
    const col = Math.ceil(Math.random() * (3));
    return { res: (boardState.board[row-1][col-1] === 0), row, col };
  }

  useEffect(() => {
    if (boardState.steps !== 0 && boardState.steps % 2 === 0) {

      do {
        var {res, row, col} = checkEmpty();
        if (res) {
          let copyState = { ...boardState };
          myfunction(copyState, [col-1][row-1]);
        }
      }
      while (res);
    }
  // eslint-disable-next-line
  }, [boardState]);

  useEffect(() => {
    if (startGame) {
      intervalRef.current = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [startGame]);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(intervalRef.current);
      alert("Match Draw");
      setBoardState(initial);
      setGrid(3);
      setTime(60);
      setStartGame(false);
    }
  // eslint-disable-next-line
  }, [time]);

  useEffect(
    () => {
      const board3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      const board4 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      const board5 = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      let a;
      if (grid === 3) {
        a = board3;
      } else if (grid === 4) {
        a = board4;
      } else if (grid === 5) {
        a = board5;
      }
      setBoardState({
        ...boardState,
        board: a
      });
    },
    // eslint-disable-next-line
    [grid]
  );

  const handleGridChange = (noGrid) => {
    setStartGame(false);
    clearInterval(intervalRef.current);
    setBoardState(initial)
    setGrid(noGrid);
    setTime(noGrid === 5 ? 120 : noGrid === 4 ? 90 : 60);
  }

  

  const handleClick = (cindex, i) => {
    setStartGame(true);
    let copyState = { ...boardState };
    myfunction(copyState, cindex, i);
  };

  let gameLogin = (board, player, row, col) => {
    let rCount = 0;
    for (let r = 0; r < grid; r++) {
      if (board[r][col] === player) {
        rCount += 1;
      }
    }
    if (rCount === grid) {
      return true;
    }

    let cCount = 0;
    for (let c = 0; c < grid; c++) {
      if (board[row][c] === player) {
        cCount += 1;
      }
    }
    if (cCount === grid) {
      return true;
    }

    let lCount = 0;
    for (let l = 0; l < grid; l++) {
      if (board[l][l] === player) {
        lCount += 1;
      }
    }
    if (lCount === grid) {
      return true;
    }

    let drCount = 0;
    for (let dr = 0; dr < grid; dr++) {
      if (board[dr][grid - 1 - dr] === player) {
        drCount += 1;
      }
    }
    if (drCount === grid) {
      return true;
    }

    return false;
  };

  return (
    <div className="App">


      <div>
        User Choise
        <button onClick={function() { setBoardState({...boardState, player: 1}); setUserPref(1);}}>O</button>
        <button onClick={function() { setBoardState({...boardState, player: -1}); setUserPref(-1); }}>X</button>
      </div>


      <div className="timer">
        {time}s
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => handleGridChange(3)}>3</button>
        <button onClick={() => handleGridChange(4)}>4</button>
        <button onClick={() => handleGridChange(5)}>5</button>
      </div>
      {boardState &&
        boardState.board.map((row, i) =>
          <div className="ticRow" key={i}>
            {row.map((item, cindex) => {
              return (
                <button
                  key={cindex}
                  className="tictacbtn"
                  disabled={boardState.gameOver}
                  onClick={() => handleClick(cindex, i)}
                >
                  {item === 0 ? undefined : item === 1 ? "O" : "X"}
                </button>
              );
            })}
          </div>
        )}
      {!boardState.gameOver &&
        <h1>
          Current Move: Player {boardState.player === 1 ? "O" : "X"}
        </h1>}
      {boardState.gameOver &&
        <div>
          <h1>
            {(boardState.winner === 1 && "Winner is O") ||
              (boardState.winner === -1 && "Winner is X") ||
              boardState.winner}
          </h1>
        </div>}
      <button onClick={() => setBoardState(initial)}>Reset</button>
    </div>
  );
}

export default App;
