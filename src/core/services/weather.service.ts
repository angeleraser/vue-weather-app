import { Localization } from '../domain/models/localization.model';
import { LocalizationQueries } from '../domain/services/metaweatherapi.service';
import { OnEarthLocalization } from '../domain/models/on-earth-localization.model';
import { WeatherService } from '../domain/services/weather.service';
import MetaweatherService from './metaweatherapi.service';

const MetaweatherApiService = new MetaweatherService();

class ApplicationWeatherService implements WeatherService {
	public getLocalization = async (
		params: LocalizationQueries,
	): Promise<Localization[]> => {
		return await MetaweatherApiService.getLocalization(params);
	};

	public getOnEarthLocalization = async (
		woeid: number,
	): Promise<OnEarthLocalization> => {
		return await MetaweatherApiService.getOnEarthLocalization(woeid);
	};
}

export default ApplicationWeatherService;
