// import React from "react";
import React, { useState, useEffect } from "react";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import BoxElement from "../components/BoxElement";

// import { InfoCircleFill } from "react-bootstrap-icons";

import { motion } from "framer-motion";

const motionAnimations = {
  boardAnimateContainer: {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: -0.1,
        duration: 3.5,
      },
    },
  },
  boxAnimate: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: { y: 20, opacity: 1 },
  },
  start: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: { y: 20, opacity: 1 },
  },
};

const cssColors = [
  { name: "AliceBlue", hex: "#F0F8FF" },
  { name: "AntiqueWhite", hex: "#FAEBD7" },
  { name: "Aqua", hex: "#00FFFF" },
  { name: "Aquamarine", hex: "#7FFFD4" },
  { name: "Azure", hex: "#F0FFFF" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Bisque", hex: "#FFE4C4" },
  { name: "Black", hex: "#000000" },
  { name: "BlanchedAlmond", hex: "#FFEBCD" },
  { name: "Blue", hex: "#0000FF" },
  { name: "BlueViolet", hex: "#8A2BE2" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "BurlyWood", hex: "#DEB887" },
  { name: "CadetBlue", hex: "#5F9EA0" },
  { name: "Chartreuse", hex: "#7FFF00" },
  { name: "Chocolate", hex: "#D2691E" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "CornflowerBlue", hex: "#6495ED" },
  { name: "Cornsilk", hex: "#FFF8DC" },
  { name: "Crimson", hex: "#DC143C" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "DarkBlue", hex: "#00008B" },
  { name: "DarkCyan", hex: "#008B8B" },
  { name: "DarkGoldenRod", hex: "#B8860B" },
  { name: "DarkGray", hex: "#A9A9A9" },
  { name: "DarkGreen", hex: "#006400" },
  { name: "DarkKhaki", hex: "#BDB76B" },
  { name: "DarkMagenta", hex: "#8B008B" },
  { name: "DarkOliveGreen", hex: "#556B2F" },
  { name: "DarkOrange", hex: "#FF8C00" },
  { name: "DarkOrchid", hex: "#9932CC" },
  { name: "DarkRed", hex: "#8B0000" },
  { name: "DarkSalmon", hex: "#E9967A" },
  { name: "DarkSeaGreen", hex: "#8FBC8F" },
  { name: "DarkSlateBlue", hex: "#483D8B" },
  { name: "DarkSlateGray", hex: "#2F4F4F" },
  { name: "DarkTurquoise", hex: "#00CED1" },
  { name: "DarkViolet", hex: "#9400D3" },
  { name: "DeepPink", hex: "#FF1493" },
  { name: "DeepSkyBlue", hex: "#00BFFF" },
  { name: "DimGray", hex: "#696969" },
  { name: "DodgerBlue", hex: "#1E90FF" },
  { name: "FireBrick", hex: "#B22222" },
  { name: "FloralWhite", hex: "#FFFAF0" },
  { name: "ForestGreen", hex: "#228B22" },
  { name: "Fuchsia", hex: "#FF00FF" },
  { name: "Gainsboro", hex: "#DCDCDC" },
  { name: "GhostWhite", hex: "#F8F8FF" },
  { name: "Gold", hex: "#FFD700" },
  { name: "GoldenRod", hex: "#DAA520" },
  { name: "Gray", hex: "#808080" },
  { name: "Green", hex: "#008000" },
  { name: "GreenYellow", hex: "#ADFF2F" },
  { name: "HoneyDew", hex: "#F0FFF0" },
  { name: "HotPink", hex: "#FF69B4" },
  { name: "IndianRed", hex: "#CD5C5C" },
  { name: "Indigo", hex: "#4B0082" },
  { name: "Ivory", hex: "#FFFFF0" },
  { name: "Khaki", hex: "#F0E68C" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "LavenderBlush", hex: "#FFF0F5" },
  { name: "LawnGreen", hex: "#7CFC00" },
  { name: "LemonChiffon", hex: "#FFFACD" },
  { name: "LightBlue", hex: "#ADD8E6" },
  { name: "LightCoral", hex: "#F08080" },
  { name: "LightCyan", hex: "#E0FFFF" },
  { name: "LightGoldenRodYellow", hex: "#FAFAD2" },
  { name: "LightGray", hex: "#D3D3D3" },
  { name: "LightGreen", hex: "#90EE90" },
  { name: "LightPink", hex: "#FFB6C1" },
  { name: "LightSalmon", hex: "#FFA07A" },
  { name: "LightSeaGreen", hex: "#20B2AA" },
  { name: "LightSkyBlue", hex: "#87CEFA" },
  { name: "LightSlateGray", hex: "#778899" },
  { name: "LightSteelBlue", hex: "#B0C4DE" },
  { name: "LightYellow", hex: "#FFFFE0" },
  { name: "Lime", hex: "#00FF00" },
  { name: "LimeGreen", hex: "#32CD32" },
  { name: "Linen", hex: "#FAF0E6" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Maroon", hex: "#800000" },
  { name: "MediumAquaMarine", hex: "#66CDAA" },
  { name: "MediumBlue", hex: "#0000CD" },
  { name: "MediumOrchid", hex: "#BA55D3" },
  { name: "MediumPurple", hex: "#9370DB" },
  { name: "MediumSeaGreen", hex: "#3CB371" },
  { name: "MediumSlateBlue", hex: "#7B68EE" },
  { name: "MediumSpringGreen", hex: "#00FA9A" },
  { name: "MediumTurquoise", hex: "#48D1CC" },
  { name: "MediumVioletRed", hex: "#C71585" },
  { name: "MidnightBlue", hex: "#191970" },
  { name: "MintCream", hex: "#F5FFFA" },
  { name: "MistyRose", hex: "#FFE4E1" },
  { name: "Moccasin", hex: "#FFE4B5" },
  { name: "NavajoWhite", hex: "#FFDEAD" },
  { name: "Navy", hex: "#000080" },
  { name: "OldLace", hex: "#FDF5E6" },
  { name: "Olive", hex: "#808000" },
  { name: "OliveDrab", hex: "#6B8E23" },
  { name: "Orange", hex: "#FFA500" },
  { name: "OrangeRed", hex: "#FF4500" },
  { name: "Orchid", hex: "#DA70D6" },
  { name: "PaleGoldenRod", hex: "#EEE8AA" },
  { name: "PaleGreen", hex: "#98FB98" },
  { name: "PaleTurquoise", hex: "#AFEEEE" },
  { name: "PaleVioletRed", hex: "#DB7093" },
  { name: "PapayaWhip", hex: "#FFEFD5" },
  { name: "PeachPuff", hex: "#FFDAB9" },
  { name: "Peru", hex: "#CD853F" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Plum", hex: "#DDA0DD" },
  { name: "PowderBlue", hex: "#B0E0E6" },
  { name: "Purple", hex: "#800080" },
  { name: "RebeccaPurple", hex: "#663399" },
  { name: "Red", hex: "#FF0000" },
  { name: "RosyBrown", hex: "#BC8F8F" },
  { name: "RoyalBlue", hex: "#4169E1" },
  { name: "SaddleBrown", hex: "#8B4513" },
  { name: "Salmon", hex: "#FA8072" },
  { name: "SandyBrown", hex: "#F4A460" },
  { name: "SeaGreen", hex: "#2E8B57" },
  { name: "SeaShell", hex: "#FFF5EE" },
  { name: "Sienna", hex: "#A0522D" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "SkyBlue", hex: "#87CEEB" },
  { name: "SlateBlue", hex: "#6A5ACD" },
  { name: "SlateGray", hex: "#708090" },
  { name: "Snow", hex: "#FFFAFA" },
  { name: "SpringGreen", hex: "#00FF7F" },
  { name: "SteelBlue", hex: "#4682B4" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Teal", hex: "#008080" },
  { name: "Thistle", hex: "#D8BFD8" },
  { name: "Tomato", hex: "#FF6347" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Violet", hex: "#EE82EE" },
  { name: "Wheat", hex: "#F5DEB3" },
  { name: "White", hex: "#FFFFFF" },
  { name: "WhiteSmoke", hex: "#F5F5F5" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "YellowGreen", hex: "#9ACD32" },
];

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
  });

  //   const [deviceSettings, setDeviceSettings] = useState({
  //     orientation: "portrait",
  //   });

  const [boxBoard, setBoxBoard] = useState([]);

  function getUniqueColor(colorList, itemCount) {
    if (itemCount >= cssColors.length) {
      const randHex = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`.toUpperCase();
      if (
        Object.values(colorList).some((colorObj) => colorObj.hex === randHex)
      ) {
        return getUniqueColor(colorList, itemCount);
      }

      return { customName: false, name: `Hex ${randHex}`, hex: randHex };
    } else {
      const randIndex = Math.floor(Math.random() * cssColors.length);
      const randomCssColor = cssColors[randIndex];

      if (
        Object.values(colorList).some(
          (colorObj) => colorObj.hex === randomCssColor.hex
        )
      ) {
        return getUniqueColor(colorList);
      }

      return { customName: false, ...randomCssColor };
    }
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
    const generateBoxBoard = () => {
      let boxBoard = [];
      let boxRow = [];

      console.log(gameSettings.gameColors);
      // createing a box element for each item color in game.
      for (let j = 0; j < gameSettings.itemCount; j++) {
        console.log(gameSettings.gameColors);
        boxRow.push(
          <Col key={j} className="d-flex justify-content-center">
            <motion.div
              variants={motionAnimations.boxAnimate}
              // onAnimationComplete={handleAnimationCompletion}
            >
              {/* <motion.div variants={boxAnimate}> */}
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
          // animate={gameSettings.gameInProgress ? "exit" : "visible"}
          animate={gameData.animationStep}
          onAnimationComplete={handleAnimationCompletion}
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
  ]);

  // timer useEffect
  useEffect(() => {
    console.log("useEffect-Timer");
    let interval = null;

    console.log("timer", "gameInProgress:", gameSettings.gameInProgress);
    console.log("timer", "timer:", gameData.timer);

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

    setGameData({
      rounds: 1,
      attempts: 3,
      timer: Number(formValues.answerTime),
      gameSequence: [],
      userSequence: [],
      animationStep: "exit",
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

  const handleAnimationCompletion = (definition) => {
    console.log("handleAnimationCompletion", definition);

    if (gameSettings.gameInProgress && definition === "exit") {
      setGameData({ ...gameData, animationStep: "intro" });
    }
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
          {!gameSettings.gameInProgress ? (
            <Accordion.Item eventKey="0">
              <Accordion.Header>Game Settings</Accordion.Header>
              <Accordion.Body>
                <Dropdown
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
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          ) : null}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Memorize</Accordion.Header>
            <Accordion.Body>
              {gameSettings.gameInProgress ? (
                <Row
                  style={{ fontSize: ".875rem" }}
                  className="mb-3 border-bottom justify-content-between pb-2"
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
                  <Col
                    className="mx-1 mb-1 px-2 text-center text-light border rounded bg-secondary"
                    xs={12}
                  >
                    Time: {gameData.timer}
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
