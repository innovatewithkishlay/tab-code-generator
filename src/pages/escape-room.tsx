import React from "react";
import { motion, Variants } from "framer-motion";

const escapeRoomTasks = [
  "Find the hidden key in the code snippet.",
  "Decode the encrypted message.",
  "Solve the JavaScript puzzle.",
  "Unlock the CSS secret door.",
  "Complete the maze of functions.",
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    textDecoration: "underline",
    transition: { duration: 0.25 }
  },
  tap: { scale: 0.95 },
};

const EscapeRoom: React.FC = () => (
  <motion.div
    className="app-content min-h-screen p-6 pt-20 bg-inherit font-sans"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.h1
      variants={itemVariants}
      className="texty mb-6 text-3xl font-semibold text-gray-900 dark:text-white tracking-tight"
    >
      Escape Room
    </motion.h1>
    <motion.ul
      variants={containerVariants}
      className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300"
      aria-label="Escape Room Tasks"
    >
      {escapeRoomTasks.map((task, idx) => (
        <motion.li
          key={idx}
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          className="cursor-pointer texty"
          tabIndex={0}
        >
          {task}
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
);

export default EscapeRoom;
