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

		<div :key="computedWeathers.length" class="weather-content__weather-cards">
			<weather-mini-card
				v-for="(weather, index) in computedWeathers"
				:key="index"
				:date="index === 0 ? 'Tomorrow' : weather.date"
				:state-img="weather.state_img"
				:temperature="weather.temperature"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { WeatherTemperature } from '@/core/domain/entities/weather-temperature.entity';
import Vue from 'vue';
import VBtn from './v-btn.vue';
import WeatherMiniCard from './weather-mini-card.vue';

export default Vue.extend({
	props: {
		computedWeathers: {
			type: Array,
		},

		temperatureUnity: {
			type: String,
			required: true,
		},
	},

	components: { VBtn, WeatherMiniCard },

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
		grid-template-columns: repeat(auto-fill, 124px);
		justify-content: center;
		justify-items: center;
		gap: 26px;
		width: 100%;
		max-width: calc(120px * 6);
		margin: 0 auto;

		.weather-mini-card {
			width: 100%;
		}
	}

	@media screen and (min-width: $breakpoint) {
		padding: 40px 48px;
	}

	@media screen and (min-width: 1280px) {
		&__call-to-actions {
			justify-content: flex-end;
		}

		&__weather-cards {
			grid-template-columns: repeat(5, 140px);
			justify-content: space-between;
			max-width: 100%;
		}
	}
}
</style>
