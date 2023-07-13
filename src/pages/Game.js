// import React from "react";
import React, { useState, useEffect } from "react";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import BoxElement from "../components/BoxElement";
import SettingsForm from "../components/SettingsForm";

// import { InfoCircleFill } from "react-bootstrap-icons";

import { motion } from "framer-motion";
import Collapse from "react-bootstrap/esm/Collapse";

const motionAnimations = {
  boardAnimateContainer: {
    hidden: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: -0.1,
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
    intro: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  },
  boxAnimate: {
    hidden: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    intro: {
      y: 0,
      opacity: 1,
    },
  },
  game: {
    hidden: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    intro: {
      y: 0,
      opacity: 1,
    },
    default: {
      y: 0,
      opacity: 1,
    },
    idle: {
      y: 0,
      opacity: 1,
      filter: "brightness(80%)",
    },
    prompted: {
      y: 0,
      opacity: 1,
      filter: "brightness(100%)",
    },
    selected: {
      y: 0,
      opacity: 1,
      filter: "brightness(100%)",
    },
  },
  // start: {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //   },
  //   exit: { y: 20, opacity: 1 },
  // },
};

const Game = ({ showScore }) => {
  const [formValues, setFormValues] = useState({
    minItems: 1,
    maxItems: 100,
    itemCount: 5,
    minAnswerTime: 1,
    maxAnswerTime: 30,
    answerTime: 5,
    // answerTime: 15,
  });

  const [gameSettings, setGameSettings] = useState({
    gameInProgress: false,
    shape: "box",
    minItems: 1,
    maxItems: 100,
    itemCount: 5,
    gameColors: {
      0: {
        customName: false,
        name: "Blue",
        hex: "#0000FF",
      },
      1: { customName: false, name: "Red", hex: "#FF0000" },
      2: { customName: false, name: "Yellow", hex: "#FFFF00" },
      3: { customName: false, name: "Orange", hex: "#FFA500" },
      4: { customName: false, name: "Green", hex: "#008000" },
    },
    boxRows: 3,
    showItemIndex: true,
    showColorName: true,
    showNum: false,
    showName: false,
    showHex: false,
    answerTimer: true,
    minAnswerTime: 1,
    maxAnswerTime: 30,
    answerTime: 5,
  });

  const [gameData, setGameData] = useState({
    rounds: 1,
    attemptLimit: 3,
    attemptsMade: 0,
    timeLimit: formValues.answerTime,
    timer: 0,
    gameSequence: [],
    userSequence: [],
    animationStep: "visible",
    animationItemStep: "default",
  });

  //   const [deviceSettings, setDeviceSettings] = useState({
  //     orientation: "portrait",
  //   });

  const [boxBoard, setBoxBoard] = useState([]);

  function updateGameSettings(formSettings) {
    setGameSettings({ ...formSettings });
  }

  function getNextSequence() {
    return Math.floor(Math.random() * gameSettings.itemCount);
  }
  // device orientation
  //   useEffect(() => {
  //     setDeviceSettings({
  //       ...deviceSettings,
  //       orientation: window.matchMedia("(orientation: portrait)").matches
  //         ? "portrait"
  //         : "landscape",
  //     });

  //     window.addEventListener("resize", () =>
  //       setDeviceSettings({
  //         ...deviceSettings,
  //         orientation: window.matchMedia("(orientation: portrait)").matches
  //           ? "portrait"
  //           : "landscape",
  //       })
  //     );
  //   }, []);

  // boxBoard
  useEffect(() => {
    console.log("useEffect-boxBoard", gameSettings);
    const generateBoxBoard = () => {
      let boxBoard = [];
      let boxRow = [];

      // createing a box element for each item color in game.
      for (let j = 0; j < gameSettings.itemCount; j++) {
        gameSettings.gameColors[j];
        boxRow.push(
          <Col key={j} className="d-flex justify-content-center">
            <motion.div
              variants={motionAnimations.boxAnimate}
              // onAnimationComplete={handleGameAnimationCompletion}
            >
              <motion.div
                variants={
                  gameData.gameInProgress
                    ? motionAnimations.game
                    : motionAnimations.boxAnimate
                }
                initial={gameData.animationItemStep} // animate={gameData.gameSequence[]}
                onAnimationComplete={handleGameAnimationCompletion}
              >
                <BoxElement
                  id={`gamebox-${gameSettings.gameColors[j].hex.replace(
                    "#",
                    ""
                  )}`}
                  colorNum={j}
                  updateColor={handleColorChange}
                  // itemIndex={gameSettings.showItemIndex ? j : ""}
                  colorName={
                    gameSettings.showColorName
                      ? gameSettings.gameColors[j].name
                      : ""
                  }
                  color={gameSettings.gameColors[j].hex}
                  gameColor={gameSettings.gameColors[j]}
                  showNum={gameSettings.showNum}
                  showHex={gameSettings.showHex}
                  showName={gameSettings.showName}
                  gameInProgress={gameSettings.gameInProgress}
                />
              </motion.div>
            </motion.div>
          </Col>
        );

        //   to create a square-ish shape, adding a row after each group of boxes match the row count. (determined by the form handleChange function)
        if (
          (j + 1) % gameSettings.boxRows === 0 ||
          j === gameSettings.itemCount - 1
        ) {
          boxBoard.push(
            <Row
              key={`row-${((j + 1) / gameSettings.boxRows).toFixed(1)}`}
              className="d-flex justify-content-center flex-wrap g-2 row-cols-auto mb-2"
            >
              {boxRow}
            </Row>
          );
          boxRow = [];
        }
      }

      // optional for animation without breaking existing DOM elements
      boxBoard = (
        <motion.div
          variants={motionAnimations.boardAnimateContainer}
          initial="hidden"
          animate={gameData.animationStep}
          onAnimationComplete={handleGameAnimationCompletion}
        >
          {boxBoard}
        </motion.div>
      );

      setBoxBoard(boxBoard);
    };

    generateBoxBoard();
  }, [
    gameSettings.gameInProgress,
    // gameSettings.itemCount,
    gameSettings.boxRows,
    gameSettings.gameColors,
    gameSettings.showNum,
    gameSettings.showName,
    gameSettings.showHex,
    gameData.animationStep,
    gameData.animationItemStep,
  ]);

  // timer useEffect
  useEffect(() => {
    console.log("useEffect-Timer", gameData.timer);
    let interval = null;

    if (gameSettings.gameInProgress && gameData.timer > 0) {
      interval = setInterval(() => {
        setGameData({ ...gameData, timer: gameData.timer - 1 });
      }, 1000);
    } else if (
      (gameSettings.gameInProgress && gameData.timer === 0) ||
      gameData.attemptsMade === gameData.attemptLimit
    ) {
      clearInterval(interval);
      handleGameEnd();
    }

    return () => clearInterval(interval);
  }, [gameSettings.gameInProgress, gameData.timer]);

  useEffect(() => {
    console.log("color animation");
    if (gameData.animationStep === "start") {
    }
  }, [gameData.animationStep]);
  //  --- Form Handlers
  const handleDropdown = (e1) => {
    setGameSettings({ ...gameSettings, shape: e1 });
  };

  const handleSwitch = (e1, e2, e3) => {
    console.log("switch", e1.target.checked);
    console.log("switch", e1.target.name);
    e2 && console.log("switch", e2.target);
    e3 && console.log("switch", e3.target);

    setGameSettings({ ...gameSettings, [e1.target.name]: e1.target.checked });
  };

  const handleChange = (e1, minValue, maxValue) => {
    console.log(e1.target.name);
    console.log(minValue);
    console.log(maxValue);

    setFormValues({
      ...formValues,
      [e1.target.name]: e1.target.value,
    });

    if (e1.target.value < minValue || e1.target.value > maxValue) {
      return;
    } else {
      if (e1.target.name === "itemCount") {
        console.log("getting new color", e1.target.value);
        let colorList = { ...gameSettings.gameColors };
        console.log(colorList);

        // adding new colors if value increases as needed. Keeping old values to retain colors that may have already been accepted or changed by user

        for (let i = Object.keys(colorList).length; i < e1.target.value; i++) {
          colorList = {
            ...colorList,
            [i]: getUniqueColor(colorList, e1.target.value),
          };
        }
        console.log(colorList);

        const rows = Math.ceil(Math.sqrt(Number(e1.target.value)));
        e1 && console.log("rows", rows);

        setGameSettings({
          ...gameSettings,
          [e1.target.name]: e1.target.value,
          boxRows: rows,
          gameColors: colorList,
        });
      } else {
        setGameSettings({
          ...gameSettings,
          [e1.target.name]: e1.target.value,
        });
      }
    }
  };

  const handleColorChange = (colornum, colorObj) => {
    console.log(colornum);
    console.log(colorObj);
    // let updateList = {...gameSettings.gameColors};
    // updateList.splice(colornum, 1, colorObj);

    setGameSettings({
      ...gameSettings,
      gameColors: { ...gameSettings.gameColors, [colornum]: colorObj },
    });
  };

  const handleGameStart = (e1) => {
    console.log("handleGameStart", e1.target.name);
    console.log("handleGameStart", "answerTime:", formValues.answerTime);

    let sequenceList = gameData.gameSequence;

    if (sequenceList.length === 0) {
      for (let i = 0; i < 3; i++) {
        sequenceList.push(getNextSequence());
      }
    }

    console.log(sequenceList);

    setGameData({
      ...gameData,
      rounds: 1,
      attempts: 3,
      timer: Number(formValues.answerTime),
      gameSequence: sequenceList,
      userSequence: [],
      animationStep: "hidden",
    });
    setGameSettings({ ...gameSettings, gameInProgress: true });
  };

  const handleGameEnd = () => {
    console.log("handleGameEnd");

    showScore(gameData);

    setGameSettings({ ...gameSettings, gameInProgress: false });
    setGameData({
      ...gameData,
      rounds: 1,
      attemptLimit: 3,
      attemptsMade: 0,
      timeLimit: formValues.answerTime,
      timer: 0,
      gameSequence: [],
      userSequence: [],
      animationStep: "visible",
    });
  };

  const handleGameAnimationCompletion = (definition) => {
    console.log("handleGameAnimationCompletion", definition);

    if (gameSettings.gameInProgress && definition === "hidden") {
      setGameData({
        ...gameData,
        animationStep: "intro",
        animationItemStep: "idle",
      });
    }
  };

  const handleItemAnimationCompletion = (definition) => {
    console.log("handleItemAnimationCompletion", definition);
  };

  console.log("gameSettings", gameSettings);
  console.log("gameData", gameData);

  return (
    <>
      {/* testing area */}
      <style type="text/css">
        {`
    .container,
    .row, 
    .col, 
    .accordion, 
    .accordion-flush, 
    .accordion-item, 
    .accordion-header, 
    .accordion-collapse, 
    .accordion-body,
    h1, h2, h3, h4, h5, h6, div {
    //   background-color: purple;
    //   box-shadow: inset 0px 0px 0px 2px white;
    }

    .box-element {
        width: 5rem;
        height: 5rem;
        border-radius: 1rem;
        cursor: pointer;
      }
    `}
      </style>

      {/* end testing area */}

      <Container className="pt-5">
        <Accordion defaultActiveKey={["1"]} alwaysOpen flush>
          <Collapse in={!gameSettings.gameInProgress} unmountOnExit={true}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Game Settings</Accordion.Header>
              <Accordion.Body>
                <SettingsForm
                  gameSettings={gameSettings}
                  updateGameSettings={updateGameSettings}
                />
                {/* <Dropdown
                  data-bs-theme="dark"
                  className="mb-2 pb-2"
                  onSelect={handleDropdown}
                >
                  <Dropdown.Toggle
                    id="shape-dropdown"
                    variant="secondary"
                    className="text-capitalize"
                  >
                    {gameSettings.shape}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="box">Box</Dropdown.Item>
                    <Dropdown.Item eventKey="circle">Circle</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Label className="me-2 w-100">
                  How many to Memorize:
                </Form.Label>
                <InputGroup
                  variant="secondary"
                  size="sm"
                  className="mb-2 position-relative border-bottom"
                  hasValidation
                >
                  <Button variant="secondary" className="pe-none">
                    # of items
                  </Button>
                  <Form.Control
                    aria-label="number-of-items"
                    aria-describedby="number-of-items-to-memorize"
                    value={formValues.itemCount}
                    onChange={handleChange}
                    name="itemCount"
                    isInvalid={
                      formValues.itemCount < formValues.minItems ||
                      formValues.itemCount > formValues.maxItems
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {`Must be between ${formValues.minItems} and ${formValues.maxItems}`}
                  </Form.Control.Feedback>
                  <Form.Range
                    onChange={(event) =>
                      handleChange(
                        event,
                        formValues.minItems,
                        formValues.maxItems
                      )
                    }
                    value={formValues.itemCount}
                    name="itemCount"
                    min={formValues.minItems}
                    max={formValues.maxItems}
                  />
                </InputGroup>
                <Form.Group className="mb-2 border-bottom">
                  <Form.Label className="me-2 w-100">Display:</Form.Label>
                  <Form.Check
                    id="switch-num"
                    inline
                    label="Number"
                    name="showNum"
                    type="switch"
                    onChange={handleSwitch}
                    checked={gameSettings.showNum}
                  />
                  <Form.Check
                    id="switch-name"
                    inline
                    label="Name"
                    name="showName"
                    type="switch"
                    onChange={handleSwitch}
                    checked={gameSettings.showName}
                  />
                  <Form.Check
                    id="switch-hex"
                    inline
                    label="Hex"
                    name="showHex"
                    type="switch"
                    onChange={handleSwitch}
                    checked={gameSettings.showHex}
                  />
                </Form.Group>
                <Form.Group className="mb-2 border-bottom">
                  <Form.Label className="me-2 w-100">Timer:</Form.Label>
                  <Form.Check
                    id="switch-answer-timer"
                    inline
                    label="Time Limit"
                    name="answerTimer"
                    type="switch"
                    onChange={handleSwitch}
                    checked={gameSettings.answerTimer}
                  />
                  {gameSettings.answerTimer ? (
                    <InputGroup
                      variant="secondary"
                      size="sm"
                      className="mb-2 position-relative"
                      hasValidation
                    >
                      <Button variant="secondary" className="pe-none">
                        Seconds
                      </Button>
                      <Form.Control
                        aria-label="answer-time"
                        aria-describedby="time-to-answer-game"
                        value={formValues.answerTime}
                        onChange={handleChange}
                        name="answerTime"
                        isInvalid={
                          formValues.answerTime < formValues.minAnswerTime ||
                          formValues.answerTime > formValues.maxAnswerTime
                        }
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {`Must be between ${formValues.minAnswerTime} and ${formValues.maxAnswerTime}`}
                      </Form.Control.Feedback>
                      <Form.Range
                        onChange={(event) =>
                          handleChange(
                            event,
                            formValues.minAnswerTime,
                            formValues.maxAnswerTime
                          )
                        }
                        value={formValues.answerTime}
                        name="answerTime"
                        min={formValues.minAnswerTime}
                        max={formValues.maxAnswerTime}
                      />
                    </InputGroup>
                  ) : null}
                </Form.Group> */}
              </Accordion.Body>
            </Accordion.Item>
          </Collapse>
          {/* ) : 
          null} */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Memorize</Accordion.Header>
            <Accordion.Body>
              {gameSettings.gameInProgress ? (
                <Row
                  style={{ fontSize: ".875rem" }}
                  className="mb-3 border-bottom justify-content-center pb-2"
                >
                  <Col className="mx-1 mb-1 px-2 text-center text-light border rounded bg-secondary">
                    Round: 1
                  </Col>
                  <Col className="mx-1 mb-1 px-2 text-center text-light border rounded bg-secondary">
                    Count: 3
                  </Col>
                  <Col className="mx-1 mb-1 px-2 text-center text-light border rounded bg-secondary">
                    Chances: 3
                  </Col>
                  <Col className="mb-1 px-2" xs={12}>
                    <div className="mx-1 text-center text-light border rounded bg-secondary">
                      Time: {gameData.timer}
                    </div>
                  </Col>
                </Row>
              ) : null}
              {!gameSettings.gameInProgress ? (
                <Row className="mb-3 border-bottom justify-content-center pb-2">
                  <Col className="mx-1 px-2 d-grid">
                    <Button
                      variant="primary"
                      size="sm"
                      name="gameStart"
                      onClick={handleGameStart}
                    >
                      Start
                    </Button>
                  </Col>
                </Row>
              ) : null}
              {gameSettings.shape === "box" ? boxBoard : null}
              {/* {gameSettings.shape === "circle"
              ? gameSettings.itemCountArr.map((_, elIndex) => (
                  <Row className="d-flex justify-content-center flex-wrap g-2 row-cols-auto">
                    <Col
                      key={elIndex}
                      className="d-flex justify-content-center"
                    >
                      <BoxElement color={gameSettings.gameColors[elIndex]} />
                    </Col>
                  </Row>
                ))
              : null} */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

export default Game;

// - update accordian colors
// - add form parts
//  - # of items
//  - custom colors?
//  - custom timer
//  - # of wrong guesses
//  - shape
// - create circle shape
// - create timer element
// - add start button
// - game logic to create random pattern
// - store game pattern as the game progresses
// - store count
// - game logic to allow clicks only during timer
// - provide visual response of correct guesses
// - provide visual response of incorrect guesses
// - provide visual response of game over
// - stop clear timer
// - store game score and display
// - add reset button to reset form settings to default
// - add optional visuals for staggered animation and more
// - test as standalone pwa

//   const [hovered, setHovered] = useState({});

//   const [scope, animate] = useAnimate();
//   const isInView = useInView(scope);

//   const staggerIcons = stagger(0.3, { startDelay: 0.5 });

//   useEffect(() => {
//     animate(
//       ".icon-div",
//       isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 },
//       {
//         type: "spring",
//         stiffness: 400,
//         damping: 17,
//         duration: 0.2,
//         delay: isInView ? staggerIcons : 0,
//       }
//     );
//   }, [isInView, animate, staggerIcons]);

//   const toggleHovered = (event, value) => {
//     console.log(value);
//     const name = event.target.attributes.name.value;
//     setHovered({ [name]: value });
//   };
