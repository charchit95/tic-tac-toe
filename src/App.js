
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
    for (let r = 0; r < 3; r++) {
      if(board[r][col] === player) {
        rCount += 1;
      }
    }
    if (rCount === 3) {
      return true;
    }

    let cCount = 0;
    for (let c = 0; c < 3; c++) {
      if(board[row][c] === player) {
        cCount += 1;
      }
    }
    if (cCount === 3) {
      return true;
    }
    
    let lCount = 0;
    for (let l = 0; l < 3; l++) {
      if(board[l][l] === player) {
        lCount += 1;
      }
    }
    if (lCount === 3) {
      return true;
    }
    
    let drCount = 0;
    for (let dr = 0; dr < 3; dr++) {
      if(board[dr][2-dr] === player) {
        drCount += 1;
      }
    }
    if (drCount === 3) {
      return true;
    }

    return false;    

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
                    let copyState = {...boardState}
                    if (copyState.board[i][cindex] === 0) {
                      copyState.board[i][cindex] = copyState.player;
                      let result = gameLogin(copyState.board, copyState.player, i, cindex)
                      
                      if (result){
                        copyState.gameOver = true;
                        copyState.winner = copyState.player;
                      } else {
                        copyState.winner = 0;
                      }
                      copyState.steps +=1;
                      
                      if (copyState.steps === 9) {
                        copyState.gameOver = true;
                        // copyState.winner = 0;
                      }
                      
                      copyState.player = -copyState.player;
                      setBoardState(copyState)
                    }
                  }}
                >
                  {item === 0 ? undefined : item}
                </button>
              )
            })
            }

          </div>
        )
      })}
      {!boardState.gameOver &&

      <h1>Current Move: Player {boardState.player}</h1>
      }
      {boardState.gameOver && (
        <div>
          <h1>Winner is {boardState.winner}</h1>
        </div>
      )}
      <button onClick={() => setBoardState(initial)} >Reset</button>
    </div>
  );
}

export default App;
