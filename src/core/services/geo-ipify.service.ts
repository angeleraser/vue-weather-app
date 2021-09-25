import { GeoIpifyApiResponse } from '../api/geo-ipify.api';
import { AllowCorsServiceResponse } from '../api/metaweather.api';
import { GeoIpifyService } from '../domain/services/geo-ipify.service';
import HttpService from './http.service';

class ApiGeoIpifyService implements GeoIpifyService {
	getCurrentLocation = async (): Promise<GeoIpifyApiResponse> => {
		const resp = await this.http.get(
			`?apiKey=${process.env.VUE_APP_GEOIPIFY_API_KEY}`,
		);

		const data = (await resp.json()) as AllowCorsServiceResponse;

		const geoIpifyData = JSON.parse(data.contents) as GeoIpifyApiResponse;

		return geoIpifyData;
	};

	private get http() {
		return new HttpService({
			apiUrl: 'https://geo.ipify.org/api/v1',
			headers: new Headers(),
		});
	}
}

export { ApiGeoIpifyService };
