<template>
	<div class="weather-content font-raleway">
		<div class="weather-content__call-to-actions">
			<div class="weather-content__call-to-actions__app-title">
				Vue Weather App

				<cloudy-icon />
			</div>

			<div class="weather-content__call-to-actions__buttons">
				<v-btn
					:color="temperatureUnity === 'celcius' ? 'pale-blue' : 'white'"
					@on-click="toggleTemperatureUnity('celcius')"
					round
					tooltip="Celcius"
				>
					°C
				</v-btn>

				<v-btn
					:color="temperatureUnity === 'fahrenheit' ? 'pale-blue' : 'white'"
					@on-click="toggleTemperatureUnity('fahrenheit')"
					round
					tooltip="Fahrenheit"
				>
					°F
				</v-btn>

				<toggle-theme-btn
					:mode="themeMode"
					@toggle="theme => $emit('toggle-theme', theme)"
				/>
			</div>
		</div>

		<div class="weather-content__weather-cards">
			<weather-mini-card
				:date="index === 0 ? 'Tomorrow' : weather.date"
				:key="index"
				:state-img="weather.state_img"
				:temperature="weather.temperature"
				v-for="(weather, index) in computedWeathers"
			/>
		</div>

		<div class="weather-content__today-highlights__container">
			<div class="weather-content__today-highlights__title">
				Today's Hightlights
			</div>

			<div class="weather-content__today-highlights">
				<weather-wind-status-card
					:orientation="displayedWeather.wind.direction_compass"
					:value="String(Math.round(displayedWeather.wind.speed))"
					unity="mph"
				/>

				<weather-humidity-card :value="String(displayedWeather.humidity)" />

				<weather-visibility-card
					:value="displayedWeather.visibility.toPrecision(2)"
					unity="miles"
				/>

				<weather-air-pressure-card
					:value="String(Math.round(displayedWeather.air_pressure))"
					unity="mb"
				/>
			</div>
		</div>

		<div class="weather-content__footer">
			Created by
			<a
				href="https://github.com/angeleraser"
				target="_blank"
				rel="noopener noreferrer"
				>@angeleraser</a
			>
		</div>
	</div>
</template>

<script lang="ts">
import { WeatherTemperature } from '@/core/domain/entities/weather-temperature.entity';
import VBtn from './v-btn.vue';
import Vue from 'vue';
import WeatherMiniCard from './weather-mini-card.vue';
import WeatherWindStatusCard from './weather-wind-status-card.vue';
import WeatherHumidityCard from './weather-humidity-card.vue';
import WeatherAirPressureCard from './weather-air-pressure-card.vue';
import WeatherVisibilityCard from './weather-visibility-card.vue';
import ToggleThemeBtn from './toggle-theme-btn.vue';
import CloudyIcon from './icons/cloudy-icon.vue';

export default Vue.extend({
	props: {
		computedWeathers: {
			type: Array,
		},

		displayedWeather: {
			required: true,
		},

		temperatureUnity: {
			type: String,
			required: true,
		},

		themeMode: {
			type: String,
			required: true,
		},
	},

	components: {
		VBtn,
		WeatherMiniCard,
		WeatherWindStatusCard,
		WeatherHumidityCard,
		WeatherAirPressureCard,
		WeatherVisibilityCard,
		ToggleThemeBtn,
		CloudyIcon,
	},

	methods: {
		toggleTemperatureUnity: function (value: WeatherTemperature['unity']) {
			this.$emit('toggle-temperature-unity', value);
		},
	},
});
</script>

<style lang="scss">
.weather-content {
	display: flex;
	flex-direction: column;
	padding: 24px 16px;
	height: 100%;
	width: 100%;
	max-width: 1140px;
	margin: 0 auto;

	& > *:not(:last-child) {
		margin-bottom: 68px;
	}

	&__call-to-actions {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		&__app-title {
			font-size: $text-l;
			font-weight: $text-bold;
			margin: 24px 0 40px;
			display: flex;
			align-items: center;

			svg {
				width: 1em;
				height: 1em;
				margin-left: 16px;
			}
		}

		&__buttons {
			display: flex;
		}

		.v-btn {
			font-weight: 700;

			&:not(:last-child) {
				margin-right: 16px;
			}
		}
	}

	&__weather-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 2fr));
		justify-content: center;
		justify-items: center;
		gap: 26px;
		width: 100%;
		max-width: 480px;
		margin: 0 auto;

		.weather-mini-card {
			width: 100%;
		}
	}

	&__today-highlights {
		display: grid;
		grid-template-columns: 1fr;
		justify-content: center;
		justify-items: center;
		gap: 26px;
		width: 100%;

		&__title {
			font-size: 24px;
			font-weight: $text-bold;
			margin-bottom: 24px;
			letter-spacing: 0.6px;
			text-align: center;
		}

		.weather-today-highlight-card {
			width: 100%;
			max-width: 480px;
		}
	}

	&__footer {
		width: 100%;
		text-align: center;
		font-weight: $text-medium;

		a {
			color: $v-blue;
			font-weight: $text-semibold;
		}
	}

	@media screen and (min-width: $breakpoint) {
		padding: 40px 48px;

		&__weather-cards {
			max-width: 100%;
		}

		&__today-highlights {
			grid-template-columns: minmax(100px, 360px) minmax(100px, 360px);
		}

		.weather-today-highlight-card {
			max-width: 100%;
		}
	}

	@media screen and (min-width: 1280px) {
		&__call-to-actions {
			flex-direction: row;
			justify-content: space-between;

			&__app-title {
				margin: 0;
				font-size: 56px;
			}
		}

		&__weather-cards {
			grid-template-columns: repeat(5, 140px);
			justify-content: space-between;
		}

		&__today-highlights {
			grid-template-columns: repeat(2, 1fr);
			gap: 48px;

			&__title {
				text-align: left;
			}
		}
	}
}
</style>
