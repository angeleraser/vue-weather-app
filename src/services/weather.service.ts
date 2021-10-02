import { Localization } from '../core/domain/entities/localization.entity';
import { LocalizationQueries } from '../core/domain/services/weather.service';
import { OnEarthLocalization } from '../core/domain/entities/on-earth-localization.entity';
import MetaweatherService from '../core/services/metaweatherapi.service';

const MetaweatherServiceInstansce = new MetaweatherService();

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
