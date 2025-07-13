import Square from "./Square";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Board = ({ mode }) => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const navigate = useNavigate();

  const checkWinner = (board = state) => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of winnerLogic) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isWinner = checkWinner();
  const isDraw = !isWinner && state.every((cell) => cell !== null);

  const handelclick = (index) => {
    if (state[index] || isWinner) return;

    if (mode === "single") {
      if (!isXTurn) return;
      const copy = [...state];
      copy[index] = "X";
      setState(copy);
      setIsXTurn(false);
    } else if (mode === "multi") {
      const copy = [...state];
      copy[index] = isXTurn ? "X" : "O";
      setState(copy);
      setIsXTurn(!isXTurn);
    }
  };

  useEffect(() => {
    if (mode === "single" && !isXTurn && !isWinner && !isDraw) {
      const timeout = setTimeout(() => {
        const bestMove = getBestMove(state);
        const copy = [...state];
        copy[bestMove] = "O";
        setState(copy);
        setIsXTurn(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isXTurn, state, isWinner, isDraw, mode]);

  const getBestMove = (board) => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (board.every((cell) => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="board-container">
      {isWinner ? (
        <div className="winner-container">
          <h2 className="winner-heading">{isWinner} Won The Game</h2>
          <div className="button-container">
            <button onClick={handleReset} className="allbuttons">Play Again</button>
            <button onClick={() => navigate("/")} className="allbuttons">
              Home
            </button>
          </div>
        </div>
      ) : isDraw ? (
        <div className="winner-container">
          <h2 className="winner-heading">It's a Draww!!</h2>
          <div className="button-container">
            <button onClick={handleReset} className="allbuttons">
              Play Again
            </button>
            <button onClick={() => navigate("/")} className="allbuttons">
              Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="player-turn">
            {mode === "single"
              ? isXTurn
                ? "Your Turn (X)"
                : "Computer's Turn (O)"
              : isXTurn
              ? "Player X's Turn"
              : "Player O's Turn"}
          </h4>
          <div className="board-row">
            <Square onClick={() => handelclick(0)} value={state[0]} />
            <Square onClick={() => handelclick(1)} value={state[1]} />
            <Square onClick={() => handelclick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handelclick(3)} value={state[3]} />
            <Square onClick={() => handelclick(4)} value={state[4]} />
            <Square onClick={() => handelclick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handelclick(6)} value={state[6]} />
            <Square onClick={() => handelclick(7)} value={state[7]} />
            <Square onClick={() => handelclick(8)} value={state[8]} />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
