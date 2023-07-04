import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Game from "./pages/Game";
import EndGameModal from "./components/EndGameModal";

function App() {
  const [modalShow, setModalShow] = useState(false);

  const showScore = () => {
    console.log("showScore");
  };

  return (
    <div className="text-white bg-dark min-vh-100" data-bs-theme="dark">
      <Game />
      <EndGameModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default App;
