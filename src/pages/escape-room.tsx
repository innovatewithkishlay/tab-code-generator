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
    <div className="app-content min-h-screen p-6 pt-20 bg-inherit font-sans">
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
