# Weather Forecast Cloudflare Worker

This project is a Cloudflare Worker that fetches weather forecast data using the OpenWeatherMap API.

## Setup

1. Clone this repository:
   ```
   git clone <repository-url>
   cd my-worker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your OpenWeatherMap API key:
   - Create a `.dev.vars` file in the project root with the following content:
     ```
     OPENWEATHERMAP_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with your actual OpenWeatherMap API key.

4. Configure your `wrangler.toml`:
   - Ensure your `wrangler.toml` file is correctly set up with your project details.

## Development

To run the worker locally:
