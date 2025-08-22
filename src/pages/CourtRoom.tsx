import React from "react";
import { motion, Variants } from "framer-motion";

const courtTasks = [
  "Review the case files carefully.",
  "Examine the evidence presented.",
  "Listen to witness testimonies.",
  "Analyze legal precedents.",
  "Prepare your closing argument.",
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
    transition: { duration: 0.25 },
  },
  tap: { scale: 0.95 },
};

const CourtRoom: React.FC = () => (
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
      Court Room
    </motion.h1>
    <motion.ol
      variants={containerVariants}
      className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300"
      aria-label="Court Room Tasks"
    >
      {courtTasks.map((task, idx) => (
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
    </motion.ol>
  </motion.div>
);

export default CourtRoom;
