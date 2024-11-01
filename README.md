# Personalised Stretching Plan Generator

This app provides users with a tailored, daily stretching routine based on their chosen body area and preferred session duration. Built with **NEXT.js** and powered by **OpenAI's API**, the app is designed to give users a seamless, interactive experience, making it quick and easy to access customised stretching plans with minimal input.

## Features

- **Targeted Body Area Selection**: Users can choose the body area they wish to focus on from four options: `back`, `neck`, `arms`, and `legs`.
- **Custom Duration**: Users set the duration of their stretching session (between 10 and 60 minutes) with a slider that dynamically displays the chosen time.
- **Real-Time Plan Generation**: A custom stretching plan is generated instantly upon request, with the app displaying instructions in real-time as they are received.
- **Expert Guidance Simulation**: The app leverages OpenAI's model to simulate a physical therapist’s guidance, ensuring each routine is specific, effective, and aligned with the user’s preferences.

## Tech Stack

- **NEXT.js**: Utilised for both the frontend and serverless function support, enabling fast performance and an optimal user experience.
- **OpenAI API (GPT Model)**: Powers the custom routine generation by simulating expert advice tailored to the selected body area and session duration.
- **Streamed Data Handling**: The app integrates streaming responses from OpenAI to provide an interactive experience, gradually building the stretching routine in real-time.

## How It Works

1. **Select Stretching Area**: Choose the specific body part you want to focus on from the available options.
2. **Set Session Duration**: Adjust the duration slider to set your desired session length, from 10 to 60 minutes.
3. **Generate Plan**: Click the "Generate Plan" button. The app sends a request to OpenAI’s API, asking for a custom stretching plan based on your selected area and time.
4. **View Customised Plan**: Watch as the stretching plan is streamed to you in real-time, providing a complete routine that you can follow immediately.

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/stretching-plan-generator.git
   cd stretching-plan-generator
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:

   Create a `.env.local` file in the project root and add your OpenAI API key:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

5. **Access the App**:

   Open your browser and navigate to `http://localhost:3000` to use the app.

## Code Overview

- **`page.tsx`**: Manages the main app interface. Users can select their preferred stretching area and time, and click to generate a personalised plan.
- **`action.ts`**: Contains the `generate` function, which sends a request to OpenAI with a prompt based on the user’s input, and handles streaming responses to gradually display the custom plan in real-time.

## Future Enhancements

- **Additional Body Areas**: Expand the selection to include more specific or combined body areas.
- **Saved Plans**: Allow users to save their favourite routines for quick access.
- **Enhanced Personalisation**: Add features such as fitness levels or flexibility goals to further refine the recommendations.
