import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		url: 'https://functions.yandexcloud.net/d4e6da788n94s2079r9s?'
	}
});

export default app;