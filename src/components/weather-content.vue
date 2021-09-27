<template>
	<div class="weather-content font-raleway">
		<div class="weather-content__call-to-actions">
			<v-btn color="white" round> °C </v-btn>
			<v-btn color="pale-blue" round> °F </v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VBtn from './v-btn.vue';

export default Vue.extend({
	components: { VBtn },
});
</script>

<style lang="scss">
.weather-content {
	display: flex;
	flex-direction: column;
	padding: 24px 16px;
	height: 100%;
	width: 100%;

	&__call-to-actions {
		width: 100%;
		display: flex;
		justify-content: flex-end;

		.v-btn {
			font-weight: 700;

			&:first-child {
				margin-right: 16px;
			}
		}
	}

	@media screen and (min-width: $breakpoint) {
		padding: 40px 48px;
	}
}
</style>
