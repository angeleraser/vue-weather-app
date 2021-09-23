import Vue from 'vue';
import App from './App.vue';
import WeatherService from './core/services/weather.service';
import store from './store';

async function SERVICE_TEST() {
	const Localizations = await WeatherService.searchLocalizations({
		query: 'san',
	});

	const OnEarthLocalization = await WeatherService.findOnEarthLocalization(
		Localizations[0].oeid,
	);

	console.log({ Localizations, OnEarthLocalization });
}

SERVICE_TEST();

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App),
}).$mount('#app');
