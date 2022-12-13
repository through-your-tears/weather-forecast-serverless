import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		open_weather_url: 'https://functions.yandexcloud.net/d4egumqsb4olg4vandga?',
		accu_weather_url: 'https://functions.yandexcloud.net/d4eiq0cc52fgiofr51b4?',
		cache_url: 'https://functions.yandexcloud.net/d4eqpap5v5a5hn3puesn?'
	}
});

export default app;