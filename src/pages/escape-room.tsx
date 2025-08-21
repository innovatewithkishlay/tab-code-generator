import React from "react";

const tasks = [
  "Find the hidden key in the code snippet.",
  "Decode the encrypted message.",
  "Solve the JavaScript puzzle.",
  "Unlock the CSS secret door.",
  "Complete the maze of functions.",
];

const EscapeRoom: React.FC = () => {
  return (
    <div className="min-h-screen p-6 pt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <h1 className="mb-6 text-3xl">Escape Room</h1>
      <ul className="list-decimal list-inside space-y-2">
        {tasks.map((task, idx) => (
          <li key={idx} className="cursor-pointer hover:underline">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EscapeRoom;
