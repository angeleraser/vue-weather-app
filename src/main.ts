import Vue from 'vue';
import App from './App.vue';
import ApplicationWeatherService from './core/services/weather.service';
import store from './store';

const service = new ApplicationWeatherService();

async function SERVICE_TEST() {
	const Localizations = await service.searchLocalizationByParams({
		query: 'san',
	});

	const OnEarthLocalization = await service.findOnEarthById(
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
