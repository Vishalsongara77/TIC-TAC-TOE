import {useNavigate} from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

  return (
    <div className="home-page realative z-20">
      <h1>Tic Tac Toe</h1>
      <div className='home-content'>
        <p>Choose Game Mode</p>
        <div className='button-container'>
          <button className='allbuttons' onClick={() => navigate("/game?mode=single")}> Single Player </button>
          <button className='allbuttons' onClick={() => navigate("/game?mode=multi")}> Two Player </button>
        </div>
      </div>
    </div>
  );
}
export default Home;