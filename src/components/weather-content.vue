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

		<div class="weather-content__charts__conainter">
			<div class="weather-content__today-highlights__title">Charts</div>

			<weahter-temperature-chart
				:title="`Temperature (${temperatureUnity})`"
				:key="temperatureUnity"
				min-label="min"
				:min-data="
					getTempChartData([displayedWeather, ...computedWeathers]).min
				"
				current-label="current"
				:current-data="
					getTempChartData([displayedWeather, ...computedWeathers]).current
				"
				max-label="max"
				:max-data="
					getTempChartData([displayedWeather, ...computedWeathers]).max
				"
				:labels="chartLabels"
			/>

			<div class="weather-content__charts">
				<weather-wind-status-chart
					label="mph"
					:data="getWindStatusChartData(weathers)"
					:labels="chartLabels"
				/>

				<weather-humidity-chart
					label="percentage (%)"
					:data="getHumidityChartData(weathers)"
					:labels="chartLabels"
				/>

				<weather-visibility-chart
					label="miles"
					:data="getVisibilityChartData(weathers)"
					:labels="chartLabels"
				/>

				<weather-air-pressure-chart
					title="Air pressure (mb)"
					label="Air pressure"
					:data="getAirPressureChartData(weathers)"
					:labels="chartLabels"
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
import { ComputedWeather } from '@/App.vue';
import { convertToDate } from '@/core/utils';
import { Weather } from '@/core/domain/entities/weather.entity';
import { WeatherTemperature } from '@/core/domain/entities/weather-temperature.entity';
import CloudyIcon from './icons/cloudy-icon.vue';
import format from 'date-fns/format';
import ToggleThemeBtn from './toggle-theme-btn.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';
import WeahterTemperatureChart from './weahter-temperature-chart.vue';
import WeatherAirPressureCard from './weather-air-pressure-card.vue';
import WeatherAirPressureChart from './weather-air-pressure-chart.vue';
import WeatherHumidityCard from './weather-humidity-card.vue';
import WeatherHumidityChart from './weather-humidity-chart.vue';
import WeatherMiniCard from './weather-mini-card.vue';
import WeatherVisibilityCard from './weather-visibility-card.vue';
import WeatherVisibilityChart from './weather-visibility-chart.vue';
import WeatherWindStatusCard from './weather-wind-status-card.vue';
import WeatherWindStatusChart from './weather-wind-status-chart.vue';

export default Vue.extend({
	props: {
		computedWeathers: {
			type: Array,
		},

		weathers: {
			type: Array as () => Array<Weather>,
			required: true,
		},

		displayedWeather: {
			type: Object as () => ComputedWeather,
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
		WeatherWindStatusChart,
		WeatherHumidityChart,
		WeatherVisibilityChart,
		WeatherAirPressureChart,
		WeahterTemperatureChart,
	},

	computed: {
		chartLabels: function () {
			const dates = this.weathers
				.map(weather => convertToDate(weather.applicable_date))
				.map((date, index) => {
					if (index === 0) return 'Today';

					if (index === 1) return 'Tomorrow';

					return format(date, 'iii');
				});

			return dates;
		},
	},

	methods: {
		toggleTemperatureUnity: function (value: WeatherTemperature['unity']) {
			this.$emit('toggle-temperature-unity', value);
		},

		getWindStatusChartData: function (weathers: Weather[]) {
			return weathers.map(weather => {
				return Number(weather.wind.speed.toFixed(2));
			});
		},

		getHumidityChartData: function (weathers: Weather[]) {
			return weathers.map(weather => {
				return weather.humidity;
			});
		},

		getVisibilityChartData: function (weathers: Weather[]) {
			return weathers.map(weather => {
				return Number(weather.visibility.toFixed(2));
			});
		},

		getAirPressureChartData: function (weathers: Weather[]) {
			return weathers.map(weather => {
				return Number(weather.air_pressure);
			});
		},

		getTempChartData: function (weathers: ComputedWeather[]) {
			const min = weathers.map(weather => weather.temperature.min);
			const max = weathers.map(weather => weather.temperature.max);
			const current = weathers.map(weather => weather.temperature.current);

			return {
				min,
				max,
				current,
			};
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
			font-size: 32px;
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

	&__charts {
		display: grid;
		grid-template-columns: 1fr;
		gap: 26px;
		justify-items: center;
		width: 100%;
	}

	.chart-container {
		width: 100%;
		background-color: $white;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
			rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
		border-radius: 8px;
		padding: 18px 22px;

		&__title {
			font-weight: $text-bold;
			letter-spacing: 0.6px;
			margin-bottom: 12px;
			font-size: 18px;
			color: var(--foreground-color-2);
			text-decoration: underline;
		}

		canvas {
			width: 100%;
		}
	}

	.weather-temperature-chart {
		margin-bottom: 26px;
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

		&__today-highlights,
		&__charts {
			grid-template-columns: repeat(2, 1fr);
			gap: 48px;

			&__title {
				text-align: left;
			}

			.chart-container {
				max-width: 100%;
			}
		}

		.weather-temperature-chart {
			margin-bottom: 48px;
		}
	}
}
</style>
