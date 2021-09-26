<template>
	<div class="drawer">
		<div class="drawer__actions">
			<v-btn
				:disabled="
					isFetchingCurrentLocationData || isFetchingOnEarthLocalization
				"
				@on-click="toggleShowDrawerNav"
				color="gray"
			>
				Search for places
			</v-btn>

			<v-btn
				:disabled="
					isFetchingCurrentLocationData || isFetchingOnEarthLocalization
				"
				class="drawer__actions__gps-btn"
				color="gray"
				round
				@on-click="handleSearchCurrentLocation"
			>
				<gps-fixed-icon />
			</v-btn>
		</div>

		<render-component
			:loading="isFetchingCurrentLocationData || isFetchingOnEarthLocalization"
			:error="fetchCurrentLocationDataError"
		>
			<template #loading>
				<div class="drawer__clouds-spinner">
					<clouds-spinner />
				</div>
			</template>

			<template #error>
				<div class="drawer__error">
					<v-btn
						@on-click="handleSearchCurrentLocation"
						color="blue"
						v-if="drawerError.retry_action"
					>
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
import { OnEarthLocalization } from '@/core/domain/entities/on-earth-localization.entity';
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
				this.localization = '';

				const onEarthLocalization = await getOnEarthLocalization(oeid);

				this.dispatchAfterGetOnEarth(onEarthLocalization);
			} catch (error) {
				this.fetchOnEarthError = error as WeatherServiceError;
				this.$emit('fetch-on-earth-localization-error', this.fetchOnEarthError);
			} finally {
				this.isFetchingOnEarthLocalization = false;
				this.$emit('is-fetching-on-earth-localization', false);
			}
		},

		handleSearchCurrentLocation: async function () {
			const { getCurrentOnEarthLocalization } = WeatherService;

			try {
				this.$emit('is-fetching-current-location-data', true);
				this.isFetchingCurrentLocationData = true;
				this.fetchCurrentLocationDataError = null;

				const onEarthLocalization = await getCurrentOnEarthLocalization({
					query: 'san',
				});

				await this.dispatchAfterGetOnEarth(onEarthLocalization);
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

		dispatchAfterGetOnEarth: async function (
			onEarthLocalization: OnEarthLocalization,
		) {
			this.localization = onEarthLocalization.title;
			this.$emit('get-on-earth-localization', onEarthLocalization);
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
			localization: '',
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
