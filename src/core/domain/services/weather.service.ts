import { Localization } from '../entities/localization.entity';
import { OnEarthLocalization } from '../entities/on-earth-localization.entity';

export type LocalizationQueries = {
	query?: string;
	latt_long?: string;
};

interface WeatherService {
	findLocalizations: (params: LocalizationQueries) => Promise<Localization[]>;
	getOnEarthLocalization: (woeid: number) => Promise<OnEarthLocalization>;
}

export { WeatherService };
