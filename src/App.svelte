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
	export let url;
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
	let button_clicked = false;
	async function clicked() {
		button_clicked = true;
		let response = await fetch(url + new URLSearchParams({
			'name': city_name
		}))
		if(response.ok) {
			let weather_data = await response.json()
			current_time = weather_data.current_time;
			current_temp = Math.round(weather_data.temperature * 100) / 100;
			hourly = weather_data.hourly;
			daily = weather_data.daily;
		}
		else if (response.status === 404){
			alert('Город не найден')
		}
		else {
			alert('Непредвиденная ошибка')
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
		<Button on:click={clicked} variant="raised" class="button-shaped-round">
			<Label>Узнать погоду</Label>
		</Button>
		{#if button_clicked}
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