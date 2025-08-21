import React from "react";

const escapeRoomTasks = [
  "Find the hidden key in the code snippet.",
  "Decode the encrypted message.",
  "Solve the JavaScript puzzle.",
  "Unlock the CSS secret door.",
  "Complete the maze of functions.",
];

const EscapeRoom: React.FC = () => {
  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-20 font-sans">
      <h1 className="text-3xl mb-6">Escape Room</h1>
      <ul className="list-decimal list-inside space-y-2">
        {escapeRoomTasks.map((task, index) => (
          <li key={index} className="hover:underline cursor-pointer">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EscapeRoom;
