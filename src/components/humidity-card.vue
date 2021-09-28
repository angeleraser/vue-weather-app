<template>
	<today-highlight-card class="humidity-card" title="Humidity">
		<div class="strong value">{{ value }} <span class="unity">%</span></div>

		<div class="humidity-card__progress-bar">
			<progress-bar :value="String(value)" />
		</div>
	</today-highlight-card>
</template>

<script lang="ts">
import Vue from 'vue';
import ProgressBar from './progress-bar.vue';
import TodayHighlightCard from './today-highlight-card.vue';

export default Vue.extend({
	components: { TodayHighlightCard, ProgressBar },

	props: { value: { type: String, required: true } },
});
</script>

<style lang="scss">
.humidity-card {
	width: 100%;

	&__progress-bar {
		margin-top: 32px;
		width: 100%;
	}
}
</style>
