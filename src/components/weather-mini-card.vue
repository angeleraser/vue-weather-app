<template>
	<div class="weather-mini-card">
		<div class="weather-mini-card__content">
			<div class="weather-mini-card__content__date">Sun, 7 Jun</div>

			<div class="weather-mini-card__content__img">
				<weather-state-img
					width="56"
					height="62"
					src="https://www.metaweather.com/static/img/weather/hr.svg"
					alt="Weather icon"
					aria-label="Weather state representative image"
				/>
			</div>

			<div class="weather-mini-card__content__temperature">
				<div class="weather-mini-card__content__temperature__current">16 C</div>
				<div class="weather-mini-card__content__temperature__min">11 C</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import WeatherStateImg from './weather-state-img.vue';

export default Vue.extend({
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
		font-size: 16px;

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
