import { Localization } from '../domain/entities/localization.entity';
import { OnEarthLocalization } from '../domain/entities/on-earth-localization.entity';
import { LocalizationQueries } from '../domain/services/weather.service';
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
