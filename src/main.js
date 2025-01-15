import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		open_weather_url: 'https://functions.yandexcloud.net/d4e56ndpfn2i6b48m7c2/?',
		accu_weather_url: 'https://functions.yandexcloud.net/d4e0j0ohqbqmattnn312/?',
		cache_url: 'https://functions.yandexcloud.net/d4encdck6aphnkb3gatm/?'
	}
});

export default app;