import React from "react";

const races = [
  "100m JavaScript Sprint",
  "CSS Styling Marathon",
  "Algorithm Challenge 5K",
  "React Relay Race",
  "Debugging Decathlon",
];

const CodingRaces: React.FC = () => {
  return (
    <div className="app-content min-h-screen p-6 pt-20 bg-inherit font-sans">
      <h1 className="mb-6 text-3xl">Coding Races</h1>
      <ul className="list-disc list-inside space-y-2">
        {races.map((race, idx) => (
          <li key={idx} className="cursor-pointer hover:underline">
            {race}
          </li> 
        ))}
      </ul> 
    </div>
  );
};

export default CodingRaces;
