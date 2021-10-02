<template>
	<div class="weather-wind-status-chart chart-container">
		<canvas ref="weather-wind-status-chart"></canvas>
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
			'weather-wind-status-chart'
		] as HTMLCanvasElement;
		if (!canvasEl) return;

		new Chart(canvasEl.getContext('2d') as ChartItem, {
			type: 'line',

			data: {
				labels: this.labels,

				datasets: [
					{
						label: this.label,
						data: this.data,
						borderColor: 'rgb(255, 206, 86)',
						backgroundColor: 'rgba(255, 206, 86, 0.1)',
						fill: true,
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
