<template>
	<div class="weather-mini-card">
		<div class="weather-mini-card__content">
			<div class="weather-mini-card__content__date">{{ date }}</div>

			<div class="weather-mini-card__content__img">
				<weather-state-img
					width="56"
					height="62"
					:src="stateImg"
					alt="Weather icon"
					aria-label="Weather state representative image"
				/>
			</div>

			<div class="weather-mini-card__content__temperature">
				<div class="weather-mini-card__content__temperature__current">
					{{ `${temperature.current}${temperature.unity}` }}
				</div>

				<div class="weather-mini-card__content__temperature__min">
					{{ `${temperature.min}${temperature.unity}` }}
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import WeatherStateImg from './weather-state-img.vue';

export default Vue.extend({
	props: {
		date: {
			type: String,
			required: true,
		},

		stateImg: {
			type: String,
			required: true,
		},

		temperature: {
			type: Object,
			required: true,
		},
	},

	components: { WeatherStateImg },
});
</script>

<style lang="scss">
.weather-mini-card {
	padding: 18px 22px;
	background-color: var(--card-bg-color);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
		rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
	border-radius: 8px;

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;

		&__date {
			font-weight: $text-medium;
			letter-spacing: 0.6px;
			text-align: center;
		}

		&__img {
			margin: 22px 0 36px;
		}

		&__temperature {
			display: flex;
			width: 100%;
			justify-content: space-between;
			font-weight: $text-semibold;

			&__current {
				color: var(--foreground-color-2);
				margin-right: 12px;
			}

			&__min {
				color: $v-gray-secondary;
			}
		}
	}
}
</style>
