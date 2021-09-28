<template>
	<div class="weather-content font-raleway">
		<div class="weather-content__call-to-actions">
			<v-btn
				:color="temperatureUnity === 'celcius' ? 'white' : 'pale-blue'"
				@on-click="toggleTemperatureUnity('celcius')"
				round
			>
				°C
			</v-btn>

			<v-btn
				:color="temperatureUnity === 'fahrenheit' ? 'white' : 'pale-blue'"
				@on-click="toggleTemperatureUnity('fahrenheit')"
				round
			>
				°F
			</v-btn>
		</div>

		<div class="weather-content__weather-cards">
			<weather-mini-card
				v-for="(weather, index) in computedWeathers"
				:key="index"
				:date="index === 0 ? 'Tomorrow' : weather.date"
				:state-img="weather.state_img"
				:temperature="weather.temperature"
			/>
		</div>

		<div class="weather-content__today-highlights">
			<wind-status-card
				:orientation="displayedWeather.wind.direction_compass"
				:value="String(Math.round(displayedWeather.wind.speed))"
				unity="mph"
			/>

			<humidity-card :value="String(displayedWeather.humidity)" />

			<wind-status-card value="700" unity="mph" orientation="WSW" />

			<wind-status-card value="700" unity="mph" orientation="WSW" />
		</div>
	</div>
</template>

<script lang="ts">
import { WeatherTemperature } from '@/core/domain/entities/weather-temperature.entity';
import VBtn from './v-btn.vue';
import Vue from 'vue';
import WeatherMiniCard from './weather-mini-card.vue';
import WindStatusCard from './wind-status-card.vue';
import HumidityCard from './humidity-card.vue';

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
	},

	components: { VBtn, WeatherMiniCard, WindStatusCard, HumidityCard },

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

		.v-btn {
			font-weight: 700;

			&:first-child {
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

		.today-highlight-card {
			width: 100%;
			max-width: 480px;
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

		.today-highlight-card {
			max-width: 100%;
		}
	}

	@media screen and (min-width: 1280px) {
		&__call-to-actions {
			justify-content: flex-end;
		}

		&__weather-cards {
			grid-template-columns: repeat(5, 140px);
			justify-content: space-between;
		}

		&__today-highlights {
			grid-template-columns: repeat(2, 1fr);
			gap: 48px;
		}
	}
}
</style>
