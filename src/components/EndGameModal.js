import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// function EndGameModal({ score, rounds, onHide }) {
function EndGameModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="game-end-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="game-end-modal">Game Over!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Rounds Completed: {props.rounds}</p>
        <p>You were up to {props.score} memorized!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EndGameModal;
