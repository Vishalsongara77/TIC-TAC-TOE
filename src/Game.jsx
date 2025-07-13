import { useSearchParams } from "react-router-dom";
import Board from "./Board";

const Game = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <div className="game relative z-20">
        <Board mode={mode}/>
    </div>
  );
}

export default Game;