<template>
	<weather-today-hightlight-card
		class="weather-wind-status-card"
		title="Wind Status"
	>
		<div class="strong value">
			{{ value }} <span class="unity">{{ unity }}</span>
		</div>

		<div class="weather-wind-status-card__orientation">
			<div class="orientation-icon"><near-me-icon /></div>
			{{ orientation }}
		</div>
	</weather-today-hightlight-card>
</template>

<script lang="ts">
import Vue from 'vue';
import NearMeIcon from './icons/near-me-icon.vue';
import WeatherTodayHightlightCard from './weather-today-hightlight-card.vue';

export default Vue.extend({
	components: { WeatherTodayHightlightCard, NearMeIcon },

	props: {
		value: {
			type: String,
			required: true,
		},

		unity: {
			type: String,
			required: true,
		},

		orientation: {
			type: String,
			required: true,
		},
	},
});
</script>

<style lang="scss">
.weather-wind-status-card {
	display: flex;
	align-items: center;
	flex-direction: column;

	&__orientation {
		display: flex;
		align-items: center;
		margin-top: 32px;

		.orientation-icon {
			background-color: $v-gray-tertiary;
			border-radius: 50%;
			height: 42px;
			padding: 8px;
			width: 42px;
			margin-right: 16px;

			svg {
				width: 100%;
				height: 100%;
				fill: $v-light-gray;
				transform: rotate(180deg);
			}
		}
	}
}
</style>
