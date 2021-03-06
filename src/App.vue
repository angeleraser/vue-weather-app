<template>
	<div class="notranslate" id="app">
		<application-layout>
			<template #drawer>
				<weather-drawer
					:computed-weather="computedWeather"
					@fetch-current-location-data-error="handleRequestError"
					@get-on-earth-localization="handleGetOnEarth"
					@is-fetching-current-location-data="handleShowLoadingState"
				/>
			</template>

			<template #content>
				<render-component :error="Boolean(requestError)" :loading="isLoading">
					<template v-slot:content>
						<weather-content
							:computed-weathers="computedWeathers"
							:displayed-weather="displayedWeather"
							:key="displayedWeather.id"
							:temperature-unity="tempUnity"
							:theme-mode="appTheme"
							:weathers="onEarthLocalization.weathers"
							@toggle-temperature-unity="handleTemperatureToggle"
							@toggle-theme="handleToggleTheme"
							v-if="Boolean(displayedWeather)"
						/>
					</template>
				</render-component>
			</template>
		</application-layout>
	</div>
</template>

<script lang="ts">
import { formatDate, getTemperatureObject } from './core/utils';
import { OnEarthLocalization } from './core/domain/entities/on-earth-localization.entity';
import { Weather } from './core/domain/entities/weather.entity';
import { WeatherTemperature } from './core/domain/entities/weather-temperature.entity';
import ApplicationLayout from './layouts/application-layout.vue';
import WeatherDrawer from './components/weather-drawer.vue';
import RenderComponent from './components/render-component.vue';
import Vue from 'vue';
import WeatherContent from './components/weather-content.vue';
import WeatherServiceError from './core/errors/weather.service.error';

export interface ComputedWeather {
	temperature: WeatherTemperature;
	date: string;
	state: string;
	state_img: string;
}

export const getComputedWeather = (
	weather: Weather,
	options: { temp_unity: WeatherTemperature['unity'] },
): ComputedWeather => {
	return {
		date: formatDate(weather.applicable_date),
		state_img: weather.state.icon,
		state: weather.state.name,
		temperature: getTemperatureObject(weather.temperature, options.temp_unity),
	};
};

export default Vue.extend({
	components: {
		ApplicationLayout,
		WeatherDrawer,
		RenderComponent,
		WeatherContent,
	},

	methods: {
		handleShowLoadingState: function (state: boolean) {
			this.isLoading = state;
		},

		handleGetOnEarth: function (onEarth: OnEarthLocalization) {
			this.onEarthLocalization = onEarth;

			const [todayWeather] = onEarth.weathers;

			this.displayedWeather = todayWeather;
		},

		handleRequestError: function (error: WeatherServiceError) {
			this.requestError = error;
		},

		handleTemperatureToggle: function (value: WeatherTemperature['unity']) {
			this.tempUnity = value;
		},

		handleToggleTheme: function (mode: string) {
			this.appTheme = mode;

			if (mode === 'light') {
				document.body.classList.add('__app-light-theme');
				document.body.classList.remove('__app-dark-theme');
			} else {
				document.body.classList.remove('__app-light-theme');
				document.body.classList.add('__app-dark-theme');
			}
		},
	},

	computed: {
		computedWeather: function (): ComputedWeather | null {
			const weather = this.displayedWeather as Weather | null;

			if (!weather) return null;

			return getComputedWeather(weather, { temp_unity: this.tempUnity });
		},

		computedWeathers: function (): ComputedWeather[] {
			if (!this.onEarthLocalization) return [];

			const { weathers } = this.onEarthLocalization;

			const [, tomorrowWeather, ...rest] = weathers;

			const computedWeathers = [tomorrowWeather, ...rest].map(weather =>
				getComputedWeather(weather, { temp_unity: this.tempUnity }),
			);

			return computedWeathers;
		},
	},

	created: function () {
		document.body.classList.add(`__app-${this.appTheme}-theme`);
	},

	data: function () {
		return {
			displayedWeather: null as Weather | null,
			isLoading: false,
			onEarthLocalization: null as null | OnEarthLocalization,
			requestError: null as null | WeatherServiceError,
			tempUnity: 'celcius' as WeatherTemperature['unity'],
			appTheme: 'light',
		};
	},
});
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

html {
	font-size: $text-base;
}

#app {
	width: 100%;
	height: 100%;
	min-width: 375px;
	min-height: 100vh;
	font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto,
		'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji', 'Segoe UI Symbol';
	background-color: var(--app-bg-color);
	color: var(--foreground-color-2);
}

body.no-scroll {
	overflow: hidden;
}
</style>
