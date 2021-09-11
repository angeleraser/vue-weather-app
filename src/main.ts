import Vue from 'vue';
import App from './App.vue';

import ApplicationWeatherService from './core/services/weather.service';
import router from './router';
import store from './store';

const service = new ApplicationWeatherService();

async function init() {
	const localizations = await service.getLocalization({ query: 'san' });

	const onEarthLocalization = await service.getOnEarthLocalization(
		localizations[0].woeid,
	);

	console.log({ localizations, onEarthLocalization });
}

init();

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
