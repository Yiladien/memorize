import React from "react";

import { motion } from "framer-motion";

const BoxElement = ({ color, itemIndex = "", colorName = "" }) => {
  return (
    <motion.div
      style={{
        background: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "90%",
        color: "black",
      }}
      className="box-element font-monospace"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div>{itemIndex}</div>
      <div>{colorName}</div>
    </motion.div>
  );
};

export default BoxElement;
