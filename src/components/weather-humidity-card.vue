<template>
	<weather-today-hightlight-card class="weather-humidity-card" title="Humidity">
		<div class="strong value">{{ value }} <span class="unity">%</span></div>

		<div class="weather-humidity-card__progress-bar">
			<progress-bar :value="String(value)" />
		</div>
	</weather-today-hightlight-card>
</template>

<script lang="ts">
import Vue from 'vue';
import ProgressBar from './progress-bar.vue';
import WeatherTodayHightlightCard from './weather-today-hightlight-card.vue';

export default Vue.extend({
	components: { WeatherTodayHightlightCard, ProgressBar },

	props: { value: { type: String, required: true } },
});
</script>

<style lang="scss">
.weather-humidity-card {
	width: 100%;

	&__progress-bar {
		margin-top: 32px;
		width: 100%;
	}
}
</style>
