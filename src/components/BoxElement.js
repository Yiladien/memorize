import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import {
  Pencil,
  PencilFill,
  Palette,
  PaletteFill,
  SaveFill,
  Save2Fill,
} from "react-bootstrap-icons";

import { motion } from "framer-motion";

const BoxElement = ({
  id,
  color,
  itemIndex = "",
  colorName = "",
  gameInProgress = false,
}) => {
  const [toggleNameEdit, setToggleNameEdit] = useState(false);

  const handleChange = (e1) => {
    console.log("handleChange", e1.target.value);
  };

  const toggleEdit = () => {
    console.log("toggleChange", `${toggleNameEdit} to ${!toggleNameEdit}`);

    setToggleNameEdit(!toggleNameEdit);
  };

  return (
    <motion.div
      id={id}
      style={{
        background: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: ".5em",
        paddingBottom: ".5em",
        color: "black",
        position: "relative",
      }}
      className="box-element font-monospace"
      whileHover={gameInProgress ? { scale: 1.2 } : null}
      whileTap={gameInProgress ? { scale: 0.9 } : null}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        style={{
          position: "absolute",
          top: ".325em",
          left: ".325em",
        }}
        className="svg-button"
      >
        <PaletteFill
          style={{
            pointerEvents: "none",
            //   top: ".325em",
            //   left: ".325em",
            //   border: "1px solid white",
          }}
        />
        <Form.Control
          // key={`color-${itemIndex}`}
          // data-index={itemIndex}
          style={{
            height: "1em",
            width: "1em",
            paddingTop: "0rem",
            paddingBottom: "0rem",
            paddingLeft: "0rem",
            paddingRight: "0rem",
            border: "none",
            borderRadius: "none",
            backgroundColor: "transparent",
          }}
          className="flex-grow-0"
          type="color"
          value={color}
          onChange={handleChange}
          // title={`Color ${itemIndex}`}
          // onChange={handleColorChange}
        />
      </div>
      <div>{itemIndex}</div>
      <div
        style={{
          maxWidth: "85%",
          maxHeight: "80%",
          fontSize: ".625em",
          wordWrap: "break-word",
          textAlign: "center",
          position: "relative",
          paddingLeft: "1em",
          left: "-.5em",
          overflow: "hidden",
          //   boxShadow: "inset 0px 0px 0px 1px white",
        }}
        className="hidden-hover"
      >
        <div
          style={{
            position: "absolute",
            left: ".15em",
            height: "100%",
            fontSize: ".75em",
            // textAlign: "left",
            // boxShadow: "inset 0px 0px 0px 1px white",
          }}
          className="svg-button "
        >
          {toggleEdit ? (
            <PencilFill
              name=""
              style={{
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={toggleEdit}
            />
          ) : (
            <SaveFill
              style={{
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={toggleEdit}
            />
          )}
        </div>
        <Form.Control
          className={`${!toggleNameEdit ? "plain-text-input" : ""}`}
          plaintext
          readOnly={toggleNameEdit}
          onChange={handleChange}
          value={colorName.replace(/([a-z])([A-Z])/g, "$1 $2")}
        />
        {/* {colorName.replace(/([a-z])([A-Z])/g, "$1 $2")} */}
      </div>
    </motion.div>
  );
};

export default BoxElement;
