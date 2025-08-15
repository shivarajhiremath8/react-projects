import { useState } from 'react';

function App() {
  const [color, setColor] = useState("gray");

  const nameMap = {
    red: { name: "Raju", relation: "best version" },
    black: { name: "Siddu", relation: "brother" },
    green: { name: "Suhas", relation: "motivator" },
    blue: { name: "Yashaswini", relation: "best friend" },
    yellow: { name: "Nishchitha", relation: "best friend" },
    brown: { name: "Pavan", relation: "Coding buddy" },
    maroon: { name: "Rakshith", relation: "close friend" },
    orange: { name: "Pruthvi", relation: "close friend" }
  };

  const isNishchitha = color === "yellow";

  return (
    <div
      className="w-full h-screen transition-colors duration-500"
      style={{ backgroundColor: color }}
    >
      <h1
        className={`text-center text-3xl font-bold pt-10 drop-shadow-lg ${isNishchitha ? "text-black" : "text-white"}`}
      >
        {color === "gray" ? (
          "Welcome to my circle!"
        ) : (
          <>
            Hi, I’m {nameMap[color].name}
            <br />
            Raju's {nameMap[color].relation}!
          </>
        )}
      </h1>

      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-4 py-2 rounded-3xl">
          <button onClick={() => setColor("red")} className="px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "red" }}>Raju</button>
          <button onClick={() => setColor("black")} className="px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "black" }}>Siddu</button>
          <button onClick={() => setColor("green")} className="px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "green" }}>Suhas</button>
          <button onClick={() => setColor("blue")} className="px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "blue" }}>Yashaswini</button>
          <button onClick={() => setColor("yellow")} className="px-4 py-1 rounded-full text-black shadow-lg" style={{ backgroundColor: "yellow" }}>Nishchitha</button>
          <button onClick={() => setColor("brown")} className="px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "brown" }}>Pavan</button>
          <button onClick={() => setColor("maroon")} className="px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "maroon" }}>Rakshith</button>
          <button onClick={() => setColor("orange")} className="px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "orange" }}>Pruthvi</button>
        </div>
      </div>
    </div>
  );
}

export default App;
