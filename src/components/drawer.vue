<template>
	<div class="drawer">
		<div class="drawer__actions">
			<v-btn @on-click="toggleShowDrawerNav" color="gray">
				Search for places
			</v-btn>

			<v-btn class="drawer__actions__gps-btn" color="gray" round>
				<gps-fixed-icon />
			</v-btn>
		</div>

		<div class="drawer__content">
			<drawer-weather-section />
		</div>

		<drawer-weather-nav
			:class="drawerNavClassNames"
			:results="results"
			@on-close="toggleShowDrawerNav"
			@on-search-item-click="handleSearchItemClick"
		/>
	</div>
</template>

<script lang="ts">
import DrawerWeatherNav from './drawer-weather-nav.vue';
import DrawerWeatherSection from './drawer-weather-section.vue';
import GpsFixedIcon from './icons/gps-fixed-icon.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';

export default Vue.extend({
	components: { VBtn, GpsFixedIcon, DrawerWeatherSection, DrawerWeatherNav },

	methods: {
		toggleShowDrawerNav: function () {
			this.showDrawerNav = !this.showDrawerNav;

			if (this.showDrawerNav) document.body.classList.add('no-scroll');
			else document.body.classList.remove('no-scroll');
		},

		handleSearchItemClick: function (oeid: number) {
			console.log(oeid);
		},
	},

	computed: {
		drawerNavClassNames: function (): { [className: string]: boolean } {
			return {
				'drawer-weather-nav--visible': this.showDrawerNav,
			};
		},
	},

	data: function () {
		return {
			showDrawerNav: false,
			results: [
				{
					coordinates: {
						latitude: 37.777119,
						longitude: -122.41964,
					},
					type: 'City',
					title: 'San Francisco',
					oeid: 2487956,
				},
				{
					coordinates: {
						latitude: 32.715691,
						longitude: -117.16172,
					},
					type: 'City',
					title: 'San Diego',
					oeid: 2487889,
				},
				{
					coordinates: {
						latitude: 37.338581,
						longitude: -121.885567,
					},
					type: 'City',
					title: 'San Jose',
					oeid: 2488042,
				},
				{
					coordinates: {
						latitude: 29.42458,
						longitude: -98.494614,
					},
					type: 'City',
					title: 'San Antonio',
					oeid: 2487796,
				},
				{
					coordinates: {
						latitude: 36.974018,
						longitude: -122.030952,
					},
					type: 'City',
					title: 'Santa Cruz',
					oeid: 2488853,
				},
				{
					coordinates: {
						latitude: -33.463039,
						longitude: -70.647942,
					},
					type: 'City',
					title: 'Santiago',
					oeid: 349859,
				},
				{
					coordinates: {
						latitude: 36.406651,
						longitude: 25.45653,
					},
					type: 'City',
					title: 'Santorini',
					oeid: 56558361,
				},
				{
					coordinates: {
						latitude: 43.461498,
						longitude: -3.81001,
					},
					type: 'City',
					title: 'Santander',
					oeid: 773964,
				},
				{
					coordinates: {
						latitude: 35.170429,
						longitude: 128.999481,
					},
					type: 'City',
					title: 'Busan',
					oeid: 1132447,
				},
				{
					coordinates: {
						latitude: 28.46163,
						longitude: -16.267059,
					},
					type: 'City',
					title: 'Santa Cruz de Tenerife',
					oeid: 773692,
				},
				{
					coordinates: {
						latitude: 35.666431,
						longitude: -105.972572,
					},
					type: 'City',
					title: 'Santa Fe',
					oeid: 2488867,
				},
			],
		};
	},
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
