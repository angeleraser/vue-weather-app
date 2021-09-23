import { Localization } from '../domain/entities/localization.entity';
import { OnEarthLocalization } from '../domain/entities/on-earth-localization.entity';
import { LocalizationQueries } from '../domain/services/weather.service';
// import LocalMetaweatherService from './local.metaweatherapi.service';
import MetaweatherService from './metaweatherapi.service';

const MetaweatherServiceInstansce = new MetaweatherService();

class WeatherService {
	public searchLocalizations = async (
		params: LocalizationQueries,
	): Promise<Localization[]> => {
		return await MetaweatherServiceInstansce.findLocalizations(params);
	};

	public findOnEarthLocalization = async (
		localizationId: number,
	): Promise<OnEarthLocalization> => {
		return await MetaweatherServiceInstansce.getOnEarthLocalization(
			localizationId,
		);
	};
}

export default new WeatherService();
