import { Localization } from '../domain/models/localization.model';
import { LocalizationQueries } from '../domain/services/weather.service';
import { OnEarthLocalization } from '../domain/models/on-earth-localization.model';
import MetaweatherService from './metaweatherapi.service';

const Service = new MetaweatherService();

class ApplicationWeatherService {
	public searchLocalizationByParams = async (
		params: LocalizationQueries,
	): Promise<Localization[]> => {
		return await Service.findLocalizations(params);
	};

	public findOnEarthById = async (
		localizationId: number,
	): Promise<OnEarthLocalization> => {
		return await Service.getOnEarthLocalization(localizationId);
	};
}

export default ApplicationWeatherService;
