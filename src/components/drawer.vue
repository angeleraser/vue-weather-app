<template>
	<div class="drawer">
		<div class="drawer__actions">
			<v-btn color="gray">Search for places</v-btn>

			<v-btn class="drawer__actions__gps-btn" round color="gray">
				<gps-fixed-icon />
			</v-btn>
		</div>

		<div class="drawer__content"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import GpsFixedIcon from './icons/gps-fixed-icon.vue';
import VBtn from './v-btn.vue';

export default Vue.extend({
	components: { VBtn, GpsFixedIcon },
});
</script>

<style lang="scss">
.drawer {
	display: flex;
	flex-direction: column;
	background-color: $dark-blue;
	padding: 18px 12px;

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
		padding: 42px 46px;
		height: 100%;
	}
}
</style>
