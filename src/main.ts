import Vue from 'vue';
import App from './App.vue';

import ApplicationWeatherService from './core/services/weather.service';
import router from './router';
import store from './store';

const service = new ApplicationWeatherService();

async function init() {
	const Localizations = await service.searchLocalizationByParams({
		query: 'san',
	});

	const OnEarthLocalization = await service.findOnEarthById(
		Localizations[0].oeid,
	);

	console.log({ Localizations, OnEarthLocalization });
}

init();

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
