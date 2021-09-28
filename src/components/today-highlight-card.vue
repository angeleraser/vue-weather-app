<template>
	<div class="today-highlight-card font-raleway">
		<div class="today-highlight-card__content">
			<div class="today-highlight-card__content__title">{{ title }}</div>

			<div class="today-highlight-card__content__slot">
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
.today-highlight-card {
	padding: 22px 48px;
	background-color: $dark-blue;

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: $light-gray;
		text-align: center;

		&__title {
			font-size: 14px;
			font-weight: $text-medium;
			margin-bottom: 32px;
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
				font-size: 64px;
			}

			.unity {
				font-size: $text-l;
				font-weight: $text-normal;
			}
		}
	}
}
</style>
