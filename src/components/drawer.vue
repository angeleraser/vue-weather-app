<template>
	<div class="drawer">
		<div class="drawer__actions">
			<v-btn color="gray">Search for places</v-btn>

			<v-btn class="drawer__actions__gps-btn" round color="gray">
				<gps-fixed-icon />
			</v-btn>
		</div>

		<div class="drawer__content">
			<drawer-weather-section />
		</div>
	</div>
</template>

<script lang="ts">
import DrawerWeatherSection from './drawer-weather-section.vue';
import GpsFixedIcon from './icons/gps-fixed-icon.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';

export default Vue.extend({
	components: { VBtn, GpsFixedIcon, DrawerWeatherSection },
});
</script>

<style lang="scss">
.drawer {
	display: flex;
	flex-direction: column;
	padding: 24px 16px;

	&__actions {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.drawer__actions__gps-btn {
			svg {
				fill: $white;
			}
		}
	}

	@media screen and (min-width: $breakpoint) {
		padding: 40px 48px;
		height: 100%;
	}
}
</style>
