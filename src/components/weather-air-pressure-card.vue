<template>
	<weather-today-hightlight-card
		class="weather-air-pressure-card"
		title="Air pressure"
	>
		<div class="strong value">
			{{ value }} <span class="unity">{{ unity }}</span>
		</div>
	</weather-today-hightlight-card>
</template>

<script lang="ts">
import Vue from 'vue';
import WeatherTodayHightlightCard from './weather-today-hightlight-card.vue';

export default Vue.extend({
	components: { WeatherTodayHightlightCard },

	props: {
		value: {
			type: String,
			required: true,
		},

		unity: {
			type: String,
			required: true,
		},
	},
});
</script>

<style lang="scss"></style>
