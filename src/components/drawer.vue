<template>
	<div class="drawer">
		<div class="drawer__actions">
			<render-component :loading="isFetchingCurrentLocationData">
				<template #loading> Loading... </template>

				<template #content>
					<v-btn @on-click="toggleShowDrawerNav" color="gray">
						Search for places
					</v-btn>

					<v-btn class="drawer__actions__gps-btn" color="gray" round>
						<gps-fixed-icon />
					</v-btn>
				</template>
			</render-component>
		</div>

		<render-component
			:loading="isFetchingCurrentLocationData || isFetchingOnEarthLocalization"
			:error="Boolean(drawerError)"
		>
			<template #loading>
				<div class="drawer__clouds-spinner">
					<clouds-spinner />
				</div>
			</template>

			<template #content>
				<div class="drawer__content">
					<drawer-weather-section
						:temperature="{ value: 50, unity: 'C' }"
						current-location="Caracas"
						date="Friday, Jun 3"
						state-img="https://www.metaweather.com/static/img/weather/t.svg"
						state="Shower"
					/>
				</div>
			</template>

			<template #error>
				<v-btn
					@on-click="handleSearchCurrentLocation"
					color="blue"
					v-if="drawerError.retry_action"
				>
					Retry
				</v-btn>
			</template>
		</render-component>

		<drawer-weather-nav
			:is-fetching-localization="isFetchingLocalization"
			:is-fetching-on-earth-localization="isFetchingOnEarthLocalization"
			:request-error="fetchLocalizationError"
			:results="results"
			@close="toggleShowDrawerNav"
			@retry-fetch-localization="handleSearchLocalizations"
			@search-item-click="handleGetOnEarth"
			@search="handleSearchLocalizations"
			v-model="showDrawerNav"
		/>
	</div>
</template>

<script lang="ts">
import { Localization } from '@/core/domain/entities/localization.entity';
import CloudsSpinner from './clouds-spinner.vue';
import DrawerWeatherNav from './drawer-weather-nav.vue';
import DrawerWeatherSection from './drawer-weather-section.vue';
import GpsFixedIcon from './icons/gps-fixed-icon.vue';
import RenderComponent from './render-component.vue';
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
		RenderComponent,
		CloudsSpinner,
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
				this.fetchLocalizationError = null;
				this.results = [];

				const results = await searchLocalizations({
					query: searchQuery,
				});

				this.results = [...results];
			} catch (error) {
				this.fetchLocalizationError = error as WeatherServiceError;
			} finally {
				this.isFetchingLocalization = false;
			}
		},

		handleGetOnEarth: async function (oeid: number) {
			const { getOnEarthLocalization } = WeatherService;

			try {
				this.$emit('is-fetching-on-earth-localization', true);
				this.isFetchingOnEarthLocalization = true;
				this.fetchOnEarthError = null;

				const onEarthLocalization = await getOnEarthLocalization(oeid);

				this.$emit('get-on-earth-localization', onEarthLocalization);
			} catch (error) {
				this.fetchOnEarthError = error as WeatherServiceError;
				this.$emit('fetch-on-earth-localization-error', this.fetchOnEarthError);
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
				this.fetchCurrentLocationDataError = null;

				const results = await searchLocalizations({
					query: 'san',
				});

				const [currentLocation] = results;

				await this.handleGetOnEarth(currentLocation.oeid);
			} catch (error) {
				this.fetchCurrentLocationDataError = error as WeatherServiceError;

				this.$emit(
					'fetch-current-location-data-error',
					this.fetchCurrentLocationDataError,
				);
			} finally {
				this.$emit('is-fetching-current-location-data', false);
				this.isFetchingCurrentLocationData = false;
			}
		},
	},

	computed: {
		drawerError: function (): WeatherServiceError | null {
			const { fetchCurrentLocationDataError, fetchOnEarthError } = this;

			return fetchCurrentLocationDataError || fetchOnEarthError;
		},
	},

	created: async function () {
		await this.handleSearchCurrentLocation();
	},

	data: function () {
		return {
			fetchCurrentLocationDataError: null as null | WeatherServiceError,
			fetchLocalizationError: null as null | WeatherServiceError,
			fetchOnEarthError: null as null | WeatherServiceError,
			isFetchingCurrentLocationData: false,
			isFetchingLocalization: false,
			isFetchingOnEarthLocalization: false,
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
	min-height: 700px;
	height: 100%;
	position: relative;

	& > .render-component--loading,
	& > .render-component--error,
	&__content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 100%;
	}

	&__clouds-spinner {
		margin: auto;
	}

	&__actions {
		.render-component--content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.drawer__actions__gps-btn {
			svg {
				fill: $white;
			}
		}
	}

	@media screen and (min-width: $breakpoint) {
		padding: 40px 48px;
		height: 100%;

		.clouds-spinner {
			width: 280px;
		}
	}

	@media screen and (min-width: 480px) {
		.clouds-spinner {
			width: 280px;
		}
	}
}
</style>
