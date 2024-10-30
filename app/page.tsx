"use client";

import { useState } from "react";
import { generate } from "./api/chat/action";
import { readStreamableValue } from "ai/rsc";

export const runtime = "edge";
export const preferredRegion = "home";

export default function App() {
  const [generation, setGeneration] = useState<string>("");

  const areas = [
    { value: "back" },
    { value: "neck" },
    { value: "arms" },
    { value: "legs" },
  ];

  const [state, setState] = useState({
    area: "",
    time: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main>
      <div>
        <h2>Daily stretch</h2>
      </div>

      <div>
        <h3>What would you like to stretch?</h3>
        {areas.map(({ value }) => (
          <div key={value}>
            <input
              id={value}
              type="radio"
              value={value}
              name="area"
              onChange={handleChange}
            />
            <label htmlFor={value}>{`${value}`}</label>
          </div>
        ))}
      </div>

      <div>
        <h3>How long would you like to stretch?</h3>
        <div>
          <input
            type="range"
            id="time"
            name="time"
            min="10"
            max="60"
            step="5"
          />
          <label htmlFor="time">Time (mins)</label>
        </div>
      </div>

      <button
        onClick={async () => {
          const { output } = await generate(
            `Generate a stretching plan focused on the ${state.area} that will take around ${state.time} minutes`
          );
          setGeneration(() => "");
          for await (const delta of readStreamableValue(output)) {
            setGeneration(
              (currentGeneration) => `${currentGeneration}${delta}`
            );
          }
        }}
      >
        Generate Plan
      </button>

      <div>{generation}</div>
    </main>
  );
}
