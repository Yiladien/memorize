import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Game from "./pages/Game";
// import Test from "./pages/Test";
import EndGameModal from "./components/EndGameModal";

function App() {
  const [modalShow, setModalShow] = useState(false);

  const [endGameData, setEndGameData] = useState({
    score: 0,
    rounds: 0,
  });

  const showScore = (gameData) => {
    console.log("showScore", gameData);
    setModalShow(true);
  };

  return (
    <div className="text-white bg-dark min-vh-100" data-bs-theme="dark">
      <Game showScore={showScore} />
      {/* <Test /> */}
      <EndGameModal
        show={modalShow}
        score={endGameData.score}
        rounds={endGameData.rounds}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default App;
