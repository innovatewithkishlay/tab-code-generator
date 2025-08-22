import React from "react";

const courtTasks = [
  "Review the case files carefully.",
  "Examine the evidence presented.",
  "Listen to witness testimonies.",
  "Analyze legal precedents.",
  "Prepare your closing argument.",
];

const CourtRoom: React.FC = () => {
  return (
    <div className="app-content min-h-screen p-6 pt-20 bg-inherit font-sans">
      <h1 className="mb-6 text-3xl">Court Room</h1>
      <ol className="list-decimal list-inside space-y-2">
        {courtTasks.map((task, idx) => (
          <li key={idx} className="cursor-pointer hover:underline">
            {task}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CourtRoom;
