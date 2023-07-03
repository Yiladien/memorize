import React, { useState, useRef, useEffect } from "react";

import Form from "react-bootstrap/Form";

import {
  Pencil,
  PencilFill,
  Palette,
  PaletteFill,
  CheckLg,
} from "react-bootstrap-icons";

import { motion } from "framer-motion";

const BoxElement = ({
  id,
  showColorName = false,
  showHex = false,
  showBoxNum = false,
  boxnum = "",
  gameColor = { customName: false, name: "", hex: "" },
  gameInProgress = false,
  updateColor,
}) => {
  const nameRef = useRef(null);

  const [editColor, setEditColor] = useState({ ...gameColor });

  const [toggleNameEdit, setToggleNameEdit] = useState(false);

  useEffect(() => {
    if (toggleNameEdit) {
      nameRef.current.focus();
      nameRef.current.select();
    }
  }, [toggleNameEdit]);

  //   toggleEdit
  const toggleEdit = () => {
    setToggleNameEdit(!toggleNameEdit);
  };

  // handleFormChange
  const handleFormChange = (e1) => {
    const keyName = e1.target.name;
    const value =
      keyName === "hex" ? e1.target.value.toUpperCase() : e1.target.value;

    setEditColor({ ...editColor, [keyName]: value });
  };

  // handleFormChange
  const handleColorBlur = (e1) => {
    if (editColor.hex !== gameColor.hex) {
      updateColor(e1.target.dataset.boxnum, {
        customName: true,
        name: !editColor.customName
          ? `Custom ${e1.target.dataset.boxnum}`
          : editColor.customName,
        hex: editColor.hex,
      });

      setEditColor({
        ...editColor,
        customName: true,
        name: !editColor.customName
          ? `Custom ${e1.target.dataset.boxnum}`
          : editColor.name,
        hex: editColor.hex,
      });
    }

    setToggleNameEdit(!toggleNameEdit);
  };

  const handleNameBlur = (e1) => {
    if (editColor.name !== gameColor.name) {
      updateColor(e1.target.dataset.boxnum, {
        customName: true,
        name: editColor.name,
        hex: editColor.hex,
      });

      setEditColor({
        ...editColor,
        customName: true,
        name: editColor.name,
        hex: editColor.hex,
      });
    }

    setToggleNameEdit(!toggleNameEdit);
  };

  return (
    <motion.div
      id={id}
      style={{
        background: editColor.hex,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: ".5em",
        paddingBottom: ".5em",
        paddingLeft: ".5em",
        paddingRight: ".5em",
        color: "black",
        position: "relative",
        boxShadow: "inset 0px 0px 0px 1px white",
      }}
      className="box-element font-monospace"
      whileHover={gameInProgress ? { scale: 1.2 } : null}
      whileTap={gameInProgress ? { scale: 0.9 } : null}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* color pallette */}
      <div
        style={{
          position: "absolute",
          top: ".375em",
          left: ".375em",
          fontSize: ".875em",
        }}
        className="svg-button"
      >
        <PaletteFill
          style={{
            pointerEvents: "none",
          }}
        />
        <Form.Control
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
          title="Edit Color"
          data-boxnum={boxnum}
          className="flex-grow-0"
          type="color"
          value={editColor.hex}
          onChange={handleFormChange}
          onBlur={handleColorBlur}
          name={"hex"}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: ".375em",
          right: ".375em",
          fontSize: ".875em",
        }}
        className="svg-button"
      >
        <PencilFill
          name="edit"
          style={{
            transform: "translateX(-100%)",
          }}
          onClick={toggleEdit}
          title="Edit Name"
        />
      </div>
      <div>{boxnum + 1}</div>
      <div
        style={{
          fontSize: ".625em",
          wordWrap: "break-word",
          textAlign: "center",
          left: "-.5em",
          overflow: "hidden",
          boxShadow: "inset 0px 0px 0px 1px white",
        }}
      >
        <div
          style={{
            wordWrap: "break-word",
            textAlign: "center",
            position: "relative",
            boxShadow: "inset 0px 0px 0px 1px orange",
          }}
        >
          <Form.Control
            style={{
              boxShadow: "inset 0px 0px 0px 1px green",
            }}
            ref={nameRef}
            data-boxnum={boxnum}
            name={`name`}
            className={`${
              toggleNameEdit ? "plain-text-input pointer" : "pe-none"
            }`}
            plaintext
            readOnly={!toggleNameEdit}
            disabled={!toggleNameEdit}
            onChange={handleFormChange}
            onBlur={handleNameBlur}
            value={editColor.name.replace(/([a-z])([A-Z])/g, "$1 $2")}
          />
        </div>
        <div>{editColor.hex}</div>
      </div>
    </motion.div>
  );
};

export default BoxElement;
