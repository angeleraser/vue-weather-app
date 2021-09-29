<template>
	<div class="weather-today-highlight-card font-raleway">
		<div class="weather-today-highlight-card__content">
			<div class="weather-today-highlight-card__content__title">
				{{ title }}
			</div>

			<div class="weather-today-highlight-card__content__slot">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		title: { type: String, required: true },
	},
});
</script>

<style lang="scss">
.weather-today-highlight-card {
	padding: 22px 48px;
	background-color: var(--drawer-bg-color);

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--foreground-color-2);
		text-align: center;

		&__title {
			font-size: 16px;
			font-weight: $text-medium;
			margin-bottom: 24px;
		}

		&__slot {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;

			.strong {
				font-weight: $text-bold;
			}

			.value {
				font-size: 84px;
			}

			.unity {
				font-size: $text-x;
				font-weight: $text-normal;
			}
		}
	}
}
</style>
