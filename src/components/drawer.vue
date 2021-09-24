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
			<drawer-weather-section
				:temperature="{ value: 50, unity: 'C' }"
				current-location="Caracas"
				date="Friday, Jun 3"
				state-img="https://www.metaweather.com/static/img/weather/t.svg"
				state="Shower"
			/>
		</div>

		<drawer-weather-nav
			:fetching-localization-error="fetchingLocalizationError"
			:is-fetching-localization="isFetchingLocalization"
			:is-fetching-on-earth-localization="isFetchingOnEarthLocalization"
			:results="results"
			:show-empty-results-message="isResultsEmpty"
			@close="toggleShowDrawerNav"
			@search-item-click="getOnEarthLocalization"
			@search="handleSearchInDrawerNav"
			v-model="showDrawerNav"
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
import WeatherService from '@/core/services/weather.service';

export default Vue.extend({
	props: {
		weather: {
			type: Object,
			required: true,
		},
	},

	components: {
		VBtn,
		GpsFixedIcon,
		DrawerWeatherSection,
		DrawerWeatherNav,
	},

	methods: {
		toggleShowDrawerNav: function () {
			this.showDrawerNav = !this.showDrawerNav;

			if (this.showDrawerNav) document.body.classList.add('no-scroll');
			else document.body.classList.remove('no-scroll');
		},

		getOnEarthLocalization: async function (oeid: number) {
			try {
				this.$emit('fetching-on-earth-localization', true);
				this.isFetchingOnEarthLocalization = true;

				const onEarthLocalization =
					await WeatherService.findOnEarthLocalization(oeid);

				this.$emit('get-on-earth-localization', onEarthLocalization);
			} catch (error) {
				this.$emit('error-fetching-on-earth-localization', error.message);
			} finally {
				this.isFetchingOnEarthLocalization = false;
				this.$emit('fetching-on-earth-localization', false);
			}
		},

		handleSearchInDrawerNav: async function (query: string) {
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

		searchCurrentLocationData: async function () {
			try {
				this.$emit('fetching-on-earth-localization', true);

				const [currentLocation] = await WeatherService.searchLocalizations({
					query: 'san',
				});

				const onEarthLocalization =
					await WeatherService.findOnEarthLocalization(currentLocation.oeid);

				this.$emit('get-on-earth-localization', onEarthLocalization);
			} catch {
				console.error('ERROR WHILE FECTHING CURRENT LOCATION');
			} finally {
				this.$emit('fetching-on-earth-localization', false);
			}
		},
	},

	created: function () {
		this.searchCurrentLocationData();
	},

	data: function () {
		return {
			fetchingLocalizationError: '',
			isFetchingLocalization: false,
			isFetchingOnEarthLocalization: false,
			isResultsEmpty: false,
			results: [] as Array<Localization>,
			showDrawerNav: false,
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
