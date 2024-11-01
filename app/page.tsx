"use client";

import { useState } from "react";
import { generate } from "./api/chat/action";
import { readStreamableValue } from "ai/rsc";

export const runtime = "edge";
export const preferredRegion = "home";

export default function App() {
  const [generation, setGeneration] = useState<string>("");
  const [rangeValue, setRangeValue] = useState<string>("20");

  const areas = [
    { value: "back" },
    { value: "neck" },
    { value: "arms" },
    { value: "legs" },
  ];

  const [state, setState] = useState({
    area: "back",
    time: "20",
  });

  const handleAreaChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
    target.checked = true;
  };

  const handleTimeChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
    target.checked = true;
    setRangeValue(target.value);
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="text-xl mt-4 mx-auto p-2">Daily stretch</h2>
      <p className="mb-4 mx-auto">
        Get a personalised stretching routine in seconds
      </p>

      <div className="bg-sky-700/75 rounded my-4 p-2">
        <fieldset className="flex flex-col items-center my-2 p-2">
          <legend className="font-semibold">
            What would you like to stretch?
          </legend>
          {areas.map(({ value }, index) => (
            <div key={value}>
              <input
                id={value}
                type="radio"
                value={value}
                name="area"
                onChange={handleAreaChange}
                defaultChecked={index == 0 ? true : false}
              />
              <label htmlFor={value} className="pl-2">
                {`${value.charAt(0).toUpperCase()}${value.substring(1)}`}
              </label>
            </div>
          ))}
        </fieldset>
      </div>

      <div className="bg-sky-700/75 rounded my-4 p-2">
        <fieldset className="flex flex-col items-center my-2 p-2 text-center">
          <legend className="font-semibold">
            How long would you like to stretch?
          </legend>
          <div>
            <input
              type="range"
              id="time"
              name="time"
              min="10"
              max="60"
              step="5"
              value={rangeValue}
              onChange={handleTimeChange}
            />
            <br />
            <output id="rangeValue">{rangeValue} mins</output>
          </div>
        </fieldset>
      </div>

      <button
        className="bg-sky-950	rounded p-4 text text-white font-semibold"
        onClick={async () => {
          const { output } = await generate(
            `Generate me a stretching plan focused on the ${state.area} that will take around ${state.time} minutes`
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

      <div className="overflow-auto w-9/12 whitespace-pre-wrap">
        {generation}
      </div>
    </main>
  );
}
