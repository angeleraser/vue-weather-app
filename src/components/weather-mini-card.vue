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
	background-color: $dark-blue;

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;

		&__date {
			font-weight: $text-medium;
		}

		&__img {
			margin: 12px 0 26px;
		}

		&__temperature {
			display: flex;
			width: 100%;
			justify-content: space-between;
			font-weight: $text-semibold;

			&__current {
				color: $white;
				margin-right: 12px;
			}

			&__min {
				color: $gray-2;
			}
		}
	}
}
</style>
