import React, { useState, useRef, useEffect } from "react";

import Form from "react-bootstrap/Form";

import { PencilFill, PaletteFill } from "react-bootstrap-icons";

function getColorBrightness(hex) {
  if (hex === "") {
    return 0;
  }
  // Remove the '#' character if present
  hex = hex.replace("#", "");

  // Convert the hex value to RGB
  var r = parseInt(hex.substr(0, 2), 16);
  var g = parseInt(hex.substr(2, 2), 16);
  var b = parseInt(hex.substr(4, 2), 16);

  // Calculate the brightness using the following formula:
  // ((r * 299) + (g * 587) + (b * 114)) / 1000
  var brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness;
}

const BoxElement = ({
  id,
  showName = false,
  showHex = false,
  showNum = false,
  colorNum = "",
  gameColor = { customName: false, name: "", hex: "" },
  gameInProgress = false,
  updateColor,
}) => {
  const nameRef = useRef(null);

  const [editColor, setEditColor] = useState({ ...gameColor });

  const [toggleNameEdit, setToggleNameEdit] = useState(false);

  const [textColor, setTextColor] = useState(getColorBrightness(gameColor.hex));

  useEffect(() => {
    setTextColor(
      // 128 is default threshold. 178 seems ok for most colors.
      getColorBrightness(editColor.hex) > 178 ? "#000000" : "#FFFFFF"
    );
  }, [editColor]);

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
      updateColor(e1.target.dataset.colornum, {
        customName: true,
        name: !editColor.customName
          ? `Custom ${e1.target.dataset.colornum}`
          : editColor.customName,
        hex: editColor.hex,
      });

      setEditColor({
        ...editColor,
        customName: true,
        name: !editColor.customName
          ? `Custom ${e1.target.dataset.colornum}`
          : editColor.name,
        hex: editColor.hex,
      });
    }

    if (showName === true) {
      setToggleNameEdit(!toggleNameEdit);
    }
  };

  const handleNameBlur = (e1) => {
    if (editColor.name !== gameColor.name) {
      updateColor(e1.target.dataset.colornum, {
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
    <div
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
        // boxShadow: "inset 0px 0px 0px 1px white",
      }}
      className="box-element font-monospace"
      //   whileHover={gameInProgress ? { scale: 1.2 } : null}
      //   whileTap={gameInProgress ? { scale: 0.9 } : null}
      //   transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {!gameInProgress ? (
        <div>
          {/* color pallette */}
          <div
            style={{
              position: "absolute",
              top: ".5em",
              left: ".5em",
              fontSize: ".875em",
            }}
            className="svg-button"
          >
            <PaletteFill
              style={{
                pointerEvents: "none",
                fill: textColor,
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
              data-colornum={colorNum}
              className="flex-grow-0"
              type="color"
              value={editColor.hex}
              onChange={handleFormChange}
              onBlur={handleColorBlur}
              name={"hex"}
            />
          </div>
          {showName ? (
            <div
              style={{
                position: "absolute",
                top: ".5em",
                right: ".5em",
                fontSize: ".875em",
              }}
              className="svg-button"
            >
              <PencilFill
                id="svg-pencil"
                name="edit"
                style={{
                  // transform: "translateX(-100%)",
                  fill: textColor,
                }}
                onClick={toggleEdit}
                title="Edit Name"
              />
            </div>
          ) : null}

          <div
            style={{
              wordWrap: "break-word",
              textAlign: "center",
              overflow: "hidden",
              // boxShadow: "inset 0px 0px 0px 1px white",
            }}
          >
            {showNum ? (
              <div
                style={{
                  color: textColor,
                }}
              >
                {colorNum + 1}
              </div>
            ) : null}
            {showName ? (
              <div
                style={{
                  fontSize: ".625em",
                  wordWrap: "break-word",
                  textAlign: "center",
                  color: textColor,
                  // boxShadow: "inset 0px 0px 0px 1px orange",
                }}
              >
                <Form.Control
                  style={{
                    color: textColor,
                  }}
                  ref={nameRef}
                  data-colornum={colorNum}
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
            ) : null}
            {showHex ? (
              <div
                style={{
                  fontSize: ".625em",
                  wordWrap: "break-word",
                  textAlign: "center",
                  color: textColor,
                  // boxShadow: "inset 0px 0px 0px 1px orange",
                }}
              >
                {editColor.hex}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BoxElement;
