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

import BoxElement from "../components/BoxElement";

// import { InfoCircleFill } from "react-bootstrap-icons";

// import { motion, useAnimate, useInView, stagger } from "framer-motion";

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

const Game = () => {
  const [gameSettings, setGameSettings] = useState({
    shape: "box",
    itemCount: 5,
    itemCountArr: [...Array(5)],
    gameColors: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Red", hex: "#FF0000" },
      { name: "Yellow", hex: "#FFFF00" },
      { name: "Orange", hex: "#FFA500" },
      { name: "Green", hex: "#008000" },
      { name: "Purple", hex: "#800080" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#A52A2A" },
      { name: "Gray", hex: "#808080" },
      { name: "Aqua", hex: "#00FFFF" },
      { name: "Teal", hex: "#008080" },
      { name: "Pink", hex: "#FFC0CB" },
      { name: "Plum", hex: "#DDA0DD" },
      { name: "HotPink", hex: "#FF69B4" },
      { name: "RoyalBlue", hex: "#4169E1" },
      { name: "Tomato", hex: "#FF6347" },
      { name: "SkyBlue", hex: "#87CEEB" },
      { name: "YellowGreen", hex: "#9ACD32" },
      { name: "Olive", hex: "#808000" },
      { name: "DarkCyan", hex: "#008B8B" },
      { name: "DarkRed", hex: "#8B0000" },
      { name: "Chocolate", hex: "#D2691E" },
      { name: "Salmon", hex: "#FA8072" },
      { name: "Lime", hex: "#00FF00" },
      { name: "DarkViolet", hex: "#9400D3" },
    ],
    boxRows: 3,
    showItemIndex: true,
    showColorName: true,
  });

  //   const [deviceSettings, setDeviceSettings] = useState({
  //     orientation: "portrait",
  //   });

  const [boxBoard, setBoxBoard] = useState([]);

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

  // box game board shape
  useEffect(() => {
    const boxBoard = [];
    let boxRow = [];

    // function getRandomColors() {
    // let colorIndexList = [];
    //   const randomIndex = Math.floor(Math.random() * cssColors.length);
    //   if(colorIndexList.includes(randomIndex)) {
    //     return getRandomColors();
    // }
    // colorIndexList.push(randomIndex);

    // if (colorIndexList.length === gameSettings.itemCount) {
    //     const randomColorArray = [];

    //     colorIndexList.forEach(randIndex => {
    //         randomColorArray.push(cssColors[randIndex])
    //     });

    //     return randomColorArray;
    // } else {
    //     getRandomColors();
    // }

    // }

    // const colorArray = getRandomColors();

    for (let i = 0; i < gameSettings.itemCount; i++) {
      boxRow.push(
        <Col key={i} className="d-flex justify-content-center">
          <BoxElement
            itemIndex={gameSettings.showItemIndex ? i : ""}
            colorName={
              gameSettings.showColorName ? gameSettings.gameColors[i].name : ""
            }
            color={gameSettings.gameColors[i].hex}
          />
        </Col>
      );

      if (
        (i + 1) % gameSettings.boxRows === 0 ||
        i === gameSettings.itemCount - 1
      ) {
        boxBoard.push(
          <Row
            key={`row-${((i + 1) / gameSettings.boxRows).toFixed(1)}`}
            className="d-flex justify-content-center flex-wrap g-2 row-cols-auto"
          >
            {boxRow}
          </Row>
        );
        boxRow = [];
      }
    }

    setBoxBoard(boxBoard);
  }, [gameSettings.itemCount]);

  console.log(gameSettings);

  //  --- Form Handlers
  const handleDropdown = (e1) => {
    setGameSettings({ ...gameSettings, shape: e1 });
  };

  const handleChange = (e1, e2, e3) => {
    // console.log("e1", e1);
    // e2 && console.log("e2", e2);
    // e3 && console.log("e3", e3);
    const rows = Math.ceil(Math.sqrt(Number(e1.target.value)));
    e1 && console.log("rows", rows);

    setGameSettings({
      ...gameSettings,
      itemCount: e1.target.value,
      boxRows: rows,
    });
  };

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
      box-shadow: inset 0px 0px 0px 2px white;
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

      <Container fluid>
        <Row>
          <Col>
            <h1>Contact Me</h1>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        {/* <Row ref={scope}> */}
        <Row>
          <Col>
            <h1>Contact Me</h1>
          </Col>
        </Row>
      </Container>
      <Accordion defaultActiveKey="1" alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Game Settings</Accordion.Header>
          <Accordion.Body>
            <Dropdown data-bs-theme="dark" onSelect={handleDropdown}>
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
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text># of items</InputGroup.Text>
              <Form.Control
                aria-label="number-of-items"
                aria-describedby="number-of-items-to-memorize"
                value={gameSettings.itemCount}
                onChange={handleChange}
              />
              <Form.Range
                onChange={handleChange}
                value={gameSettings.itemCount}
              />
              {Array.from(
                { length: gameSettings.itemCount },
                (_, itemIndex) => (
                  <Form.Control
                    key={`color-${itemIndex}`}
                    type="color"
                    defaultValue={gameSettings.gameColors[itemIndex]}
                    title={`Color ${itemIndex}`}
                  />
                )
              )}
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
                # of items
              </InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
              <Form.Range />
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Memorize</Accordion.Header>
          <Accordion.Body>
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
