import React from "react";

import { motion } from "framer-motion";

const BoxElement = ({ color }) => {
  console.log(color);
  return (
    <motion.div
      style={{
        background: color,
      }}
      className="box-element"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    />
  );
};

export default BoxElement;
