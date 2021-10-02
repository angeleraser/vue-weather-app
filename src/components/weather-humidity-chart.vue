<template>
	<div class="weather-humidity-chart chart-container">
		<div class="chart-container__title">Humidity</div>
		<canvas ref="weather-humidity-chart"></canvas>
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
		const canvasEl = this.$refs['weather-humidity-chart'] as HTMLCanvasElement;
		if (!canvasEl) return;

		new Chart(canvasEl.getContext('2d') as ChartItem, {
			type: 'bar',

			data: {
				labels: this.labels,

				datasets: [
					{
						label: this.label,

						data: this.data,

						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(255, 205, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(201, 203, 207, 0.2)',
						],

						borderColor: [
							'rgb(255, 99, 132)',
							'rgb(255, 159, 64)',
							'rgb(255, 205, 86)',
							'rgb(75, 192, 192)',
							'rgb(54, 162, 235)',
							'rgb(153, 102, 255)',
							'rgb(201, 203, 207)',
						],

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
