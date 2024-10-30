"use server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function generate(input: string) {
  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-4o-mini"),
      prompt: `You are a physical therapist who is an expert in stretching. You provide guidance to people based on which parts of the body they'd like to stretch. You will consider the areas of the body they have mentioned and put together a stretching plan which meets their requirements. You will consider the amount of time they would like to stretch for and provide a specific routine which is tailored to fit that amount of time.
      
      ${input}`,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
