/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

interface Env {
	OPENWEATHERMAP_API_KEY: string;
}

async function fetchWeather(city: string, apiKey: string): Promise<any> {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const city = url.searchParams.get(' ') || 'London';

		try {
			const weatherData = await fetchWeather(city, env.OPENWEATHERMAP_API_KEY);
			const { main, weather } = weatherData;

			const forecast = {
				city,
				temperature: main.temp,
				description: weather[0].description,
				humidity: main.humidity,
			};

			return new Response(JSON.stringify(forecast), {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			console.error('Error fetching weather data:', error);
			return new Response(JSON.stringify({ error: 'Failed to fetch weather data' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
};
