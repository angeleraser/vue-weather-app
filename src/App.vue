<template>
	<div class="notranslate" id="app">
		<application-layout>
			<template #drawer>
				<drawer
					@fetching-on-earth-localization="handleFetchOnEarthLocalization"
					@get-on-earth-localization="handleGetOnEarthLocalization"
					:weather="displayedWeather"
				/>
			</template>
		</application-layout>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Drawer from './components/drawer.vue';
import { OnEarthLocalization } from './core/domain/entities/on-earth-localization.entity';
import { Weather } from './core/domain/entities/weather.entity';
import ApplicationLayout from './layouts/application-layout.vue';

export default Vue.extend({
	components: { ApplicationLayout, Drawer },

	methods: {
		handleFetchOnEarthLocalization: function (state: boolean) {
			console.log('Fetching on earth localization', state);
		},

		handleGetOnEarthLocalization: function (
			onEarthLocalization: OnEarthLocalization,
		) {
			this.onEarthLocalization = onEarthLocalization;

			const [todayWeather] = onEarthLocalization.weathers;

			this.displayedWeather = todayWeather;
			console.log(onEarthLocalization);
		},
	},

	data: function () {
		return {
			onEarthLocalization: null as null | OnEarthLocalization,
			displayedWeather: {} as Weather,
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
}

body.no-scroll {
	overflow: hidden;
}
</style>
