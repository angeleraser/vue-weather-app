<template>
	<div class="drawer-weather-section font-raleway">
		<div class="drawer-weather-section__img">
			<weather-state-img
				width="150"
				height="174"
				:src="stateImg"
				alt="Weather icon"
				aria-label="Weather state represantive image"
			/>
		</div>

		<div class="drawer-weather-section__details">
			<span class="drawer-weather-section__details__temperature">
				{{ temperature.current
				}}<span class="drawer-weather-section__details__temperature__unity">
					{{ temperature.unity }}
				</span>
			</span>
			<span class="drawer-weather-section__details__state-name">
				{{ state }}
			</span>

			<span class="drawer-weather-section__details__date">
				<span>Today</span>{{ date }}</span
			>

			<span class="drawer-weather-section__details__location">
				<place-icon /> {{ location }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PlaceIcon from './icons/place-icon.vue';
import WeatherStateImg from './weather-state-img.vue';

export default Vue.extend({
	props: {
		state: {
			type: String,
			required: true,
		},

		stateImg: {
			type: String,
			required: true,
		},

		date: {
			type: String,
			required: true,
		},

		location: {
			type: String,
			required: true,
		},

		temperature: {
			type: Object,
			required: true,
		},
	},

	components: { PlaceIcon, WeatherStateImg },
});
</script>

<style WeatherStateImg lang="scss">
.drawer-weather-section {
	color: var(--foreground-color-1);
	margin: auto 0;
	width: 100%;

	&__img {
		margin: 32px 0 64px;
	}

	&,
	&__details {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: $text-semibold;
		font-size: 1.125rem;
		letter-spacing: 0.6px;

		&__date {
			span {
				display: inline-flex;
				align-items: center;
				font-weight: $text-medium;

				&::after {
					display: inline-block;
					content: '';
					width: 4px;
					height: 4px;
					border-radius: 50%;
					background-color: $v-gray-primary;
					margin: 0 16px;
				}
			}
		}

		&__temperature {
			font-size: 8rem;
			color: var(--foreground-color-2);
			margin-bottom: 32px;

			&__unity {
				color: $v-gray-primary;
				font-size: 3rem;
			}
		}

		&__state-name {
			font-size: 32px;
			margin-bottom: 48px;
		}

		&__location {
			display: flex;
			align-items: center;
			margin-top: 24px;

			svg {
				margin-right: 6px;
			}
		}
	}

	@media screen and (min-width: $breakpoint) {
		&__img {
			margin: 80px 0 0;
		}

		&__details {
			margin: 80px 0 0;

			&__state-name {
				margin: 72px 0;
			}

			&__location {
				margin-top: 32px;
			}
		}
	}
}
</style>
