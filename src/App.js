
import { useState } from 'react';
import './App.css';

function App() {

  let initial = {
    player: 1,
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    gameOver: false,
    winner: undefined,
    steps: 0
  }

  let [boardState, setBoardState] = useState(initial)

  let gameLogin = (board, player, row, col) => {
    let rCount = 0;
    let cCount = 0;
    let lCount = 0;
    let drCount = 0;
    for (let r = 0; r < 3; r++) {
      if (board[r][col] === player) {
        rCount += 1;
      }
      if (board[row][r] === player) {
        cCount += 1;
      }
      if (board[r][r] === player) {
        lCount += 1;
      }
      if (board[r][2 - r] === player) {
        drCount += 1;
      }
    }
    return (rCount === 3 || cCount === 3 || lCount === 3 || drCount === 3) ? true : false;
  }

  return (
    <div className="App">
      {boardState.board.map((row, i) => {
        return (
          <div className="ticRow" key={i}>
            {row.map((item, cindex) => {
              return (
                <button
                  key={cindex}
                  className="tictacbtn"
                  disabled={boardState.gameOver}
                  onClick={() => {
                    let copyState = { ...boardState }
                    if (copyState.board[i][cindex] === 0) {
                      copyState.board[i][cindex] = copyState.player;
                      let result = gameLogin(copyState.board, copyState.player, i, cindex)
                      if (result) {
                        copyState.gameOver = true;
                        copyState.winner = copyState.player;
                      } else {
                        copyState.winner = 0;
                      }
                      copyState.steps += 1;
                      if (copyState.steps === 9) {
                        copyState.gameOver = true;
                        // copyState.winner = 0;
                      }
                      copyState.player = -copyState.player;
                      setBoardState(copyState)
                    }
                  }}
                >
                  {item === 0 ? undefined : item === 1 ? "O" : "X"}
                </button>
              )
            })
            }

          </div>
        )
      })}

      {!boardState.gameOver &&

        <h1>Current Move: Player {boardState.player === 1 ? "O" : "X"}</h1>
      }
      {boardState.gameOver && (
        <div>
          <h1>Winner is {boardState.winner === 1 ? "O" : "X"}</h1>
        </div>
      )}
      <button onClick={() => setBoardState(initial)} className="reset" >Reset</button>
    </div>
  );
}

export default App;
