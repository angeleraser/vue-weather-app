<template>
	<div class="notranslate" id="app">
		<application-layout>
			<template #drawer>
				<drawer
					:weather="displayedWeather"
					@get-on-earth-localization="handleGetOnEarth"
					@is-fetching-current-location-data="handleShowLoadingState"
					@is-fetching-on-earth-localization="handleShowLoadingState"
					@request-error="handleRequestError"
				/>
			</template>

			<template #content>
				<render-component
					:error="!isLoading && Boolean(requestError)"
					:loading="isLoading"
				>
					<template v-slot:loading> <spinner /> </template>

					<template v-slot:error>
						{{ requestError.message }}
					</template>

					<template v-slot:content>
						<pre>	{{ displayedWeather }}</pre>
					</template>
				</render-component>
			</template>
		</application-layout>
	</div>
</template>

<script lang="ts">
import { OnEarthLocalization } from './core/domain/entities/on-earth-localization.entity';
import { Weather } from './core/domain/entities/weather.entity';
import ApplicationLayout from './layouts/application-layout.vue';
import Drawer from './components/drawer.vue';
import RenderComponent from './components/render-component.vue';
import Spinner from './components/spinner.vue';
import Vue from 'vue';
import WeatherServiceError from './core/errors/weather.service.error';

export default Vue.extend({
	components: { ApplicationLayout, Drawer, RenderComponent, Spinner },

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
	},

	data: function () {
		return {
			onEarthLocalization: null as null | OnEarthLocalization,
			displayedWeather: null as Weather | null,
			isLoading: false,
			requestError: null as null | WeatherServiceError,
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
	min-width: 360px;
	min-height: 100vh;
	font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto,
		'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji', 'Segoe UI Symbol';
	background-color: $very-dark-blue;
	color: $light-gray;
}

body.no-scroll {
	overflow: hidden;
}
</style>
