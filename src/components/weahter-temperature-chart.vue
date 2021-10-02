<template>
	<div class="weather-temperature-chart chart-container">
		<div class="chart-container__title">{{ title }}</div>

		<canvas ref="weather-temperature-chart"></canvas>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart, { ChartItem } from 'chart.js/auto';

export default Vue.extend({
	props: {
		minData: {
			type: Array as () => Array<number>,
			required: true,
			default: () => [],
		},

		minLabel: {
			type: String,
			required: true,
		},

		currentData: {
			type: Array as () => Array<number>,
			required: true,
			default: () => [],
		},

		currentLabel: {
			type: String,
			required: true,
		},

		maxData: {
			type: Array as () => Array<number>,
			required: true,
			default: () => [],
		},

		maxLabel: {
			type: String,
			required: true,
		},

		title: {
			type: String,
			required: true,
		},

		labels: {
			type: Array as () => Array<string>,
			required: true,
			default: () => [],
		},
	},

	mounted: function () {
		const canvasEl = this.$refs[
			'weather-temperature-chart'
		] as HTMLCanvasElement;
		if (!canvasEl) return;

		new Chart(canvasEl.getContext('2d') as ChartItem, {
			type: 'line',

			data: {
				labels: this.labels,

				datasets: [
					{
						label: this.minLabel,
						data: this.minData,
						borderColor: 'rgb(75, 192, 192)',
						backgroundColor: 'rgba(75, 192, 192, 1)',
						fill: true,
					},

					{
						label: this.currentLabel,
						data: this.currentData,
						borderColor: 'rgb(54, 162, 235)',
						backgroundColor: 'rgba(54, 162, 235, 1)',
						fill: true,
					},

					{
						label: this.maxLabel,
						data: this.maxData,
						borderColor: 'rgb(255, 99, 132)',
						backgroundColor: 'rgba(255, 99, 132, 1)',
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
