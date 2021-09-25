import Vue from 'vue';
import App from './App.vue';
import { ApiGeoIpifyService } from './core/services/geo-ipify.service';
import store from './store';

Vue.config.productionTip = false;

async function TEST() {
	const service = new ApiGeoIpifyService();

	const resp = await service.getCurrentLocation();

	console.log(resp);
}

TEST();

new Vue({
	store,
	render: h => h(App),
}).$mount('#app');
