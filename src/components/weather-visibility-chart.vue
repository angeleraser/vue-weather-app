<template>
	<div class="weather-visibility-chart chart-container">
		<canvas ref="weather-visibility-chart"></canvas>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart, { ChartItem } from 'chart.js/auto';

export default Vue.extend({
	props: {
		data: {
			type: Array as () => Array<number>,
			required: true,
			default: () => [],
		},

		labels: {
			type: Array as () => Array<string>,
			required: true,
			default: () => [],
		},

		label: {
			type: String,
			required: true,
		},
	},

	mounted: function () {
		const canvasEl = this.$refs[
			'weather-visibility-chart'
		] as HTMLCanvasElement;
		if (!canvasEl) return;

		new Chart(canvasEl.getContext('2d') as ChartItem, {
			type: 'radar',

			data: {
				labels: this.labels,

				datasets: [
					{
						label: this.label,
						data: this.data,
						backgroundColor: ['rgba(54, 162, 235, 0.2)'],
						borderColor: ['rgb(54, 162, 235)'],
						borderWidth: 1,
					},
				],
			},

			options: {
				responsive: true,

				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	},
});
</script>
