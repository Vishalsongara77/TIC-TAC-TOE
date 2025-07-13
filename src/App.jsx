import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";
import Particles from "./Particles";

const App = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Particles
        particleCount={300}
        particleColors={["#ffffff", "#ffffff"]}
        speed={0.1}
        particleSpread={10}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        particleHoverFactor={1.5}
        alphaParticles={false}
        disableRotation={false}
      />

      <div className="relative z-10">
        <BrowserRouter basename="/Tic-Tac-Toe"> {/* ✅ This line fixes it */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
