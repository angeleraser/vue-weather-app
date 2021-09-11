import { Localization } from '../models/localization.model';
import { OnEarthLocalization } from '../models/on-earth-localization.model';
import { LocalizationQueries } from './metaweatherapi.service';

interface WeatherService {
	getLocalization: (params: LocalizationQueries) => Promise<Localization[]>;

	getOnEarthLocalization: (woeid: number) => Promise<OnEarthLocalization>;
}

export { WeatherService };
