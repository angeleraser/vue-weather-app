<template>
	<div class="drawer">
		<div class="drawer__actions">
			<v-btn
				:disabled="isFetchingCurrentLocationData"
				@on-click="enableShowDrawerNav"
				color="gray"
			>
				Search for places
			</v-btn>

			<v-btn
				:disabled="isFetchingCurrentLocationData"
				class="drawer__actions__gps-btn"
				color="gray"
				round
				@on-click="handleSearchCurrentLocation"
			>
				<gps-fixed-icon />
			</v-btn>
		</div>

		<render-component
			:loading="isFetchingCurrentLocationData"
			:error="Boolean(fetchCurrentLocationDataError)"
		>
			<template #loading>
				<div class="drawer__clouds-spinner">
					<clouds-spinner />
				</div>
			</template>

			<template #error>
				<div class="drawer__error">
					<v-btn @on-click="handleSearchCurrentLocation" color="blue">
						Retry
					</v-btn>
				</div>
			</template>

			<template #content>
				<div class="drawer__content">
					<drawer-weather-section
						:date="computedWeather.date"
						:state-img="computedWeather.state_img"
						:state="computedWeather.state"
						:temperature="computedWeather.temperature"
						:location="localization"
					/>
				</div>

				<animated-clouds-background class="drawer__clouds-background" />
			</template>
		</render-component>

		<drawer-weather-nav
			:is-fetching-localization="isFetchingLocalization"
			:is-fetching-on-earth-localization="isFetchingOnEarthLocalization"
			:request-error="fetchLocalizationError"
			:results="results"
			@retry-fetch-localization="handleSearchLocalizations"
			@search-item-click="handleGetOnEarth"
			@search="handleSearchLocalizations"
			v-model="showDrawerNav"
		/>
	</div>
</template>

<script lang="ts">
import { Localization } from '@/core/domain/entities/localization.entity';
import { OnEarthLocalization } from '@/core/domain/entities/on-earth-localization.entity';
import DrawerWeatherNav from './drawer-weather-nav.vue';
import DrawerWeatherSection from './drawer-weather-section.vue';
import GpsFixedIcon from './icons/gps-fixed-icon.vue';
import RenderComponent from './render-component.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';
import WeatherService from '@/core/services/weather.service';
import WeatherServiceError from '@/core/errors/weather.service.error';
import AnimatedCloudsBackground from './animated-clouds-background.vue';
import CloudsSpinner from './spinners/clouds-spinner.vue';

export default Vue.extend({
	props: {
		computedWeather: {
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
		AnimatedCloudsBackground,
	},

	methods: {
		toggleBodyNoScrollClassname: function () {
			document.body.classList.toggle('no-scroll');
		},

		enableShowDrawerNav: function () {
			this.showDrawerNav = true;
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
				this.setIsFetchingOnEarthLocalization(true);
				this.setFetchOnEarthError(null);

				const onEarthLocalization = await getOnEarthLocalization(oeid);

				this.dispatchAfterGetOnEarth(onEarthLocalization);
			} catch (error) {
				this.setFetchOnEarthError(error as WeatherServiceError);
			} finally {
				this.setIsFetchingOnEarthLocalization(false);
			}
		},

		handleSearchCurrentLocation: async function () {
			const { getCurrentOnEarthLocalization } = WeatherService;

			try {
				this.setIsFetchingCurrentLocationData(true);
				this.setFetchCurrentLocationDataError(null);

				const onEarthLocalization = await getCurrentOnEarthLocalization({
					query: 'san',
				});

				await this.dispatchAfterGetOnEarth(onEarthLocalization);
			} catch (error) {
				this.setFetchCurrentLocationDataError(error as WeatherServiceError);
			} finally {
				this.setIsFetchingCurrentLocationData(false);
			}
		},

		dispatchAfterGetOnEarth: async function (
			onEarthLocalization: OnEarthLocalization,
		) {
			this.localization = onEarthLocalization.title;
			this.$emit('get-on-earth-localization', onEarthLocalization);
			this.setFetchCurrentLocationDataError(null);
		},

		setFetchCurrentLocationDataError: function (
			error: null | WeatherServiceError,
		) {
			this.fetchCurrentLocationDataError = error;
			this.$emit('fetch-current-location-data-error', error);
		},

		setFetchOnEarthError: function (error: null | WeatherServiceError) {
			this.fetchOnEarthError = error;
			this.$emit('fetch-on-earth-localization-error', error);
		},

		setIsFetchingCurrentLocationData: function (state: boolean) {
			this.$emit('is-fetching-current-location-data', state);
			this.isFetchingCurrentLocationData = state;
		},

		setIsFetchingOnEarthLocalization: function (state: boolean) {
			this.$emit('is-fetching-on-earth-localization', state);
			this.isFetchingOnEarthLocalization = state;
		},
	},

	computed: {
		drawerError: function (): WeatherServiceError | null {
			const { fetchCurrentLocationDataError, fetchOnEarthError } = this;

			return fetchCurrentLocationDataError || fetchOnEarthError;
		},
	},

	watch: {
		showDrawerNav: function () {
			this.toggleBodyNoScrollClassname();
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
			localization: '',
			isFetchingCurrentLocationData: false,
			isFetchingLocalization: false,
			isFetchingOnEarthLocalization: false,
			results: [] as Array<Localization>,
			showDrawerNav: false,
			oter: false,
		};
	},
});
</script>

<style lang="scss">
.drawer {
	display: flex;
	flex-direction: column;
	padding: 24px 16px;
	height: 100%;
	min-height: 100vh;
	position: relative;

	& > .render-component--loading,
	& > .render-component--error,
	&__content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 100%;
		z-index: 50;
	}

	&__clouds-spinner {
		margin: auto;
	}

	&__actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 50;

		.drawer__actions__gps-btn {
			svg {
				fill: $white;
			}
		}
	}

	&__clouds-background {
		position: absolute;
		top: 68px;
		left: 0;
		font-size: 105px;
		width: 100%;
		z-index: 10;
	}

	@media screen and (min-width: $breakpoint) {
		padding: 40px 48px;

		&__clouds-background {
			top: 100px;
			font-size: 125px;
		}

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
