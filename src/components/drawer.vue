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
			v-model="showDrawerNav"
			:fetching-localization-error="fetchingLocalizationError"
			:is-fetching-localization="isFetchingLocalization"
			:is-fetching-on-earth-localization="isFetchingOnEarthLocalization"
			:results="results"
			:show-empty-results-message="isResultsEmpty"
			@close="toggleShowDrawerNav"
			@search-item-click="handleFetchOnEarthLocalization"
			@search="handleSearchLocalization"
		/>
	</div>
</template>

<script lang="ts">
import { Localization } from '@/core/domain/entities/localization.entity';
import WeatherService from '@/core/services/weather.service';
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

		handleFetchOnEarthLocalization: async function (oeid: number) {
			try {
				this.isFetchingOnEarthLocalization = true;

				const onEarth = await WeatherService.findOnEarthLocalization(oeid);
				console.log(onEarth);
			} catch (error) {
				console.error(error.message);
			} finally {
				this.isFetchingOnEarthLocalization = false;
			}
		},

		handleSearchLocalization: async function (query: string) {
			try {
				this.isFetchingLocalization = true;
				this.isResultsEmpty = false;
				this.results = [];

				this.results = await WeatherService.searchLocalizations({
					query,
				});

				if (this.results.length === 0) this.isResultsEmpty = true;
			} catch (error) {
				this.fetchingLocalizationError = error.message;
			} finally {
				this.isFetchingLocalization = false;
			}
		},
	},

	data: function () {
		return {
			showDrawerNav: false,
			isFetchingLocalization: false,
			isFetchingOnEarthLocalization: false,
			fetchingLocalizationError: '',
			results: [] as Array<Localization>,
			isResultsEmpty: false,
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
