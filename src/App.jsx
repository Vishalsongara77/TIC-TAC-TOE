import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";
import Particles from "./Particles.jsx";

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Particles
        particleCount={500}
        particleColors={["#ffffff","#fff"]}
        speed={0.05}
        particleBaseSize={200}
        moveParticlesOnHover={true}
        
        particleHoverFactor={1.5}
        alphaParticles={true}
      />
      <div className="relative z-10">
        <BrowserRouter>
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
