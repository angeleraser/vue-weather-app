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
			@close="toggleShowDrawerNav"
			@search-item-click="handleSearchItemClick"
			@search="handleSearch"
		/>
	</div>
</template>

<script lang="ts">
import { Localization } from '@/core/domain/entities/localization.entity';
import DrawerWeatherNav from './drawer-weather-nav.vue';
import DrawerWeatherSection from './drawer-weather-section.vue';
import GpsFixedIcon from './icons/gps-fixed-icon.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';
import ApplicationWeatherService from '@/core/services/weather.service';

const AppWeatherService = new ApplicationWeatherService();

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

		handleSearch: async function (query: string) {
			console.log(query);
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
			results: [] as Array<Localization>,
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
