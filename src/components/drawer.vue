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
			<render-component
				:loading="
					isFetchingOnEarthLocalization || isFetchingCurrentLocationData
				"
			>
				<template #loading>
					<spinner />
				</template>

				<template #content>
					<drawer-weather-section
						:temperature="{ value: 50, unity: 'C' }"
						current-location="Caracas"
						date="Friday, Jun 3"
						state-img="https://www.metaweather.com/static/img/weather/t.svg"
						state="Shower"
					/>
				</template>
			</render-component>
		</div>

		<drawer-weather-nav
			:is-fetching-localization="isFetchingLocalization"
			:is-fetching-on-earth-localization="isFetchingOnEarthLocalization"
			:request-error="requestError"
			:results="results"
			@close="toggleShowDrawerNav"
			@search-item-click="handleGetOnEarth"
			@search="handleSearchLocalizations"
			v-model="showDrawerNav"
		/>
	</div>
</template>

<script lang="ts">
import { Localization } from '@/core/domain/entities/localization.entity';
import DrawerWeatherNav from './drawer-weather-nav.vue';
import DrawerWeatherSection from './drawer-weather-section.vue';
import GpsFixedIcon from './icons/gps-fixed-icon.vue';
import RenderComponent from './render-component.vue';
import Spinner from './spinner.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';
import WeatherService from '@/core/services/weather.service';
import WeatherServiceError from '@/core/errors/weather.service.error';

export default Vue.extend({
	props: {
		weather: {
			required: true,
		},
	},

	components: {
		VBtn,
		GpsFixedIcon,
		DrawerWeatherSection,
		DrawerWeatherNav,
		Spinner,
		RenderComponent,
	},

	methods: {
		toggleShowDrawerNav: function () {
			this.showDrawerNav = !this.showDrawerNav;

			if (this.showDrawerNav) document.body.classList.add('no-scroll');
			else document.body.classList.remove('no-scroll');
		},

		handleSearchLocalizations: async function (searchQuery: string) {
			const { searchLocalizations } = WeatherService;

			try {
				this.isFetchingLocalization = true;
				this.requestError = null;
				this.results = [];

				const results = await searchLocalizations({
					query: searchQuery,
				});

				this.results = [...results];
			} catch (error) {
				this.requestError = error as WeatherServiceError;
			} finally {
				this.isFetchingLocalization = false;
			}
		},

		handleGetOnEarth: async function (oeid: number) {
			const { getOnEarthLocalization } = WeatherService;

			try {
				this.$emit('is-fetching-on-earth-localization', true);
				this.isFetchingOnEarthLocalization = true;

				const onEarthLocalization = await getOnEarthLocalization(oeid);

				this.$emit('get-on-earth-localization', onEarthLocalization);
			} catch (error) {
				this.$emit('request-error', error.message);
			} finally {
				this.isFetchingOnEarthLocalization = false;
				this.$emit('is-fetching-on-earth-localization', false);
			}
		},

		handleSearchCurrentLocation: async function () {
			const { searchLocalizations } = WeatherService;

			try {
				this.$emit('is-fetching-current-location-data', true);
				this.isFetchingCurrentLocationData = true;

				const results = await searchLocalizations({
					query: 'san',
				});

				const [currentLocation] = results;

				await this.handleGetOnEarth(currentLocation.oeid);
			} catch (error) {
				this.$emit('request-error', error as WeatherServiceError);
			} finally {
				this.$emit('is-fetching-current-location-data', false);
				this.isFetchingCurrentLocationData = false;
			}
		},
	},

	created: async function () {
		await this.handleSearchCurrentLocation();
	},

	data: function () {
		return {
			isFetchingCurrentLocationData: false,
			isFetchingLocalization: false,
			isFetchingOnEarthLocalization: false,
			requestError: null as null | WeatherServiceError,
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
