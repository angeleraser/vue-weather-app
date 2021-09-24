<template>
	<div class="drawer-weather-section font-raleway">
		<div class="drawer-weather-section__img">
			<img width="150" height="174" lazy :src="stateImg" alt="Weather icon" />
		</div>

		<div class="drawer-weather-section__details">
			<span class="drawer-weather-section__details__temperature">
				{{ temperature.value }}
				<span class="drawer-weather-section__details__temperature__unity">
					{{ temperature.unity }}
				</span>
			</span>
			<span class="drawer-weather-section__details__state-name">
				{{ state }}
			</span>

			<span class="drawer-weather-section__details__date">{{ date }}</span>

			<span class="drawer-weather-section__details__location">
				<place-icon /> {{ currentLocation }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PlaceIcon from './icons/place-icon.vue';

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

		currentLocation: {
			type: String,
			required: true,
		},

		temperature: {
			type: Object,
			required: true,
		},
	},

	components: { PlaceIcon },
});
</script>

<style lang="scss">
.drawer-weather-section {
	color: $gray-1;
	margin-bottom: 72px;
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

		&__temperature {
			font-size: 8rem;
			color: $white;
			margin-bottom: 32px;

			&__unity {
				color: $gray-1;
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
