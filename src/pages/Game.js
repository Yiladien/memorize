// import React from "react";
import React, { useState } from "react";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

import BoxElement from "../components/BoxElement";

// import { InfoCircleFill } from "react-bootstrap-icons";

// import { motion, useAnimate, useInView, stagger } from "framer-motion";

const Game = () => {
  const [gameSettings, setGameSettings] = useState({
    shape: "box",
    itemCount: 5,
    colors: [
      "blue",
      "red",
      "green",
      "yellow",
      "purple",
      "white",
      "black",
      "orange",
      "teal",
      "hotpink",
    ],
  });
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

  console.log(gameSettings);

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Memorize</Accordion.Header>
          <Accordion.Body>
            <Row className="d-flex justify-content-center flex-wrap g-2">
              {/* {gameSettings.colors.map((color, index) => ( */}
              {[...Array(gameSettings.itemCount)].map((e, index) => (
                <Col key={index} className="d-flex justify-content-center">
                  {gameSettings.shape === "box" ? (
                    <BoxElement color={gameSettings.colors[index]} />
                  ) : null}
                  {gameSettings.shape === "circle" ? (
                    <BoxElement color={gameSettings.colors[index]} />
                  ) : null}
                </Col>
              ))}
            </Row>
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
