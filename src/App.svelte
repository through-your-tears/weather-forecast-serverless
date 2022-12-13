<svelte:head>
	<!-- Fonts -->
	<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>

	<!-- Material Typography -->
	<link
			rel="stylesheet"
			href="https://unpkg.com/@material/typography@13.0.0/dist/mdc.typography.css"
	/>

	<!-- SMUI -->
	<link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
</svelte:head>

<script>
	export let open_weather_url;
	export let accu_weather_url;
	export let cache_url
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import Card from '@smui/card';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	let city_name = '';
	let hourly = [];
	let daily = [];
	let current_time = '';
	let current_temp = '';
	let button_clicked_redis = false;
	let button_clicked_openweather = false;
	let button_clicked_accu = false;
	async function clicked_openweather() {
		let response = await fetch(open_weather_url + new URLSearchParams({
			'name': city_name
		}))
		if(response.ok) {
			let weather_data = await response.json()
			current_time = weather_data.current_time;
			current_temp = Math.round(weather_data.temperature * 100) / 100;
			hourly = weather_data.hourly;
			daily = weather_data.daily;
			button_clicked_openweather = true;
		}
		else if (response.status === 404){
			alert('Город не найден')
			button_clicked_openweather = false;
		}
		else {
			alert('Непредвиденная ошибка')
			button_clicked_openweather = false;
		}
	}
	let hourly1 = [];
	let daily1 = [];
	async function clicked_accu() {
		let response = await fetch(accu_weather_url + new URLSearchParams({
			'name': city_name
		}))
		if(response.ok) {
			let weather_data = await response.json()
			hourly1 = weather_data.hourly;
			daily1 = weather_data.daily;
			button_clicked_accu = true;
		}
		else if (response.status === 404){
			alert('Город не найден')
			button_clicked_accu = false;
		}
		else {
			alert('Непредвиденная ошибка')
			button_clicked_accu = false;
		}
	}
	let accu = [];
	let open = [];
	async function clicked_redis() {
		let response = await fetch(cache_url)
		if(response.ok) {
			let cache_data = await response.json()
			accu = cache_data.accu_keys;
			open = cache_data.openweather_keys;
			button_clicked_redis = true;
		}
		else {
			alert('Непредвиденная ошибка')
			button_clicked_redis = false;
		}
	}
</script>



<main>
	<h1>Прогноз погоды!</h1>
	<h2>Введите название города</h2>
	<div>
		<Textfield bind:value={city_name} label="Название города">
<!--				<HelperText slot="helper">Введите название города</HelperText>-->
		</Textfield>
		<br><br>
		<Button on:click={clicked_openweather} variant="raised" class="button-shaped-round">
			<Label>Узнать погоду(OpenWeatherAPI)</Label>
		</Button>
		<Button on:click={clicked_accu} variant="raised" class="button-shaped-round">
			<Label>Узнать погоду(AccuWeather)</Label>
		</Button>
		<Button on:click={clicked_redis} variant="raised" class="button-shaped-round">
			<Label>Посмотреть кэш</Label>
		</Button>
		{#if button_clicked_openweather}
			<h2 class="status">Погода в городе {city_name}</h2>
			<p>Время в городе  {current_time}</p>
			<p>Температура сейчас  {current_temp}°C</p>
			<div class="accordion-container">
				<Accordion multiple>
					<Panel>
						<Header><h3>Почасовой прогноз погоды</h3></Header>
						<Content>
							<div class="card-display">
								{#each hourly as {dt, temp, weather}}
									<div class="card-container">
										<Card variant="outlined" padded>
											<p>Время: {dt}</p>
											<p>Температура: {Math.round(temp * 100) / 100}°C</p>
											<p>Погода: {weather}</p>
										</Card>
									</div>
								{/each}
							</div>
						</Content>
					</Panel>
					<Panel>
						<Header><h3>Прогноз погоды по дням</h3></Header>
						<Content>
							<div class="card-display">
								{#each daily as {dt, temp_day, temp_night, weather}}
									<div class="card-container">
										<Card variant="outlined" padded>
											<p>Время: {dt}</p>
											<p>Температура днём: {Math.round(temp_day * 100) / 100}°C</p>
											<p>Температура ночью: {Math.round(temp_night * 100) / 100}°C</p>
											<p>Погода: {weather}</p>
										</Card>
									</div>
								{/each}
							</div>
						</Content>
					</Panel>
				</Accordion>
			</div>
		{/if}
		{#if button_clicked_accu}
			<h2 class="status">Погода в городе {city_name}</h2>
			<div class="accordion-container">
				<Accordion multiple>
					<Panel>
						<Header><h3>Почасовой прогноз погоды</h3></Header>
						<Content>
							<div class="card-display">
								{#each hourly1 as {dt, temp, weather}}
									<div class="card-container">
										<Card variant="outlined" padded>
											<p>Время: {dt}</p>
											<p>Температура: {Math.round(temp * 100) / 100}°C</p>
											<p>Погода: {weather}</p>
										</Card>
									</div>
								{/each}
							</div>
						</Content>
					</Panel>
					<Panel>
						<Header><h3>Прогноз погоды по дням</h3></Header>
						<Content>
							<div class="card-display">
								{#each daily1 as {dt, temp_day, temp_night, weather}}
									<div class="card-container">
										<Card variant="outlined" padded>
											<p>Время: {dt}</p>
											<p>Температура днём: {Math.round(temp_day * 100) / 100}°C</p>
											<p>Температура ночью: {Math.round(temp_night * 100) / 100}°C</p>
											<p>Погода: {weather}</p>
										</Card>
									</div>
								{/each}
							</div>
						</Content>
					</Panel>
				</Accordion>
			</div>
		{/if}
		{#if button_clicked_redis}
			<h2>Кешировано в AccuWeather</h2>
			<ol>
				{#each accu as a}
					<li>
						{a}
					</li>
				{/each}
			</ol>
			<h2>Кешировано в OpenWeatherAPI</h2>
			<ol>
				{#each open as a}
					<li>
						{a}
					</li>
				{/each}
			</ol>
		{/if}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 640px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	h2 {
		color: #001bff;
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: 100;
	}

	h3 {
		color: #28e3e3;
		text-transform: uppercase;
		font-size: 1em;
		font-weight: 100;
	}

	.status {
		text-align: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}

		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}

		h2 {
			color: #001bff;
			text-transform: uppercase;
			font-size: 3em;
			font-weight: 100;
		}

		h3 {
			color: #28e3e3;
			text-transform: uppercase;
			font-size: 2em;
			font-weight: 100;
		}

		.status {
			text-align: center;
		}

	}
</style>