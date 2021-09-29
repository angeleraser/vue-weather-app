import { Localization } from '../domain/entities/localization.entity';
import { OnEarthLocalization } from '../domain/entities/on-earth-localization.entity';
import { LocalizationQueries } from '../domain/services/weather.service';
import LocalMetaweatherService from './local.metaweatherapi.service';
// import MetaweatherService from './metaweatherapi.service';

const MetaweatherServiceInstansce = new LocalMetaweatherService();

class WeatherService {
	public searchLocalizations = async (
		params: LocalizationQueries,
	): Promise<Localization[]> => {
		return await MetaweatherServiceInstansce.findLocalizations(params);
	};

	public getOnEarthLocalization = async (
		localizationId: number,
	): Promise<OnEarthLocalization> => {
		return await MetaweatherServiceInstansce.getOnEarthLocalization(
			localizationId,
		);
	};

	public getCurrentOnEarthLocalization = async (
		params: LocalizationQueries,
	) => {
		return await MetaweatherServiceInstansce.getCurrentOnEarthLocalization(
			params,
		);
	};
}

export default new WeatherService();
