<template>
	<weather-today-highlight-card class="visibility-card" title="Visibility">
		<div class="strong value">
			{{ value }} <span class="unity">{{ unity }}</span>
		</div>
	</weather-today-highlight-card>
</template>

<script lang="ts">
import Vue from 'vue';
import WeatherTodayHighlightCard from './weather-today-highlight-card.vue';

export default Vue.extend({
	components: { WeatherTodayHighlightCard },

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
