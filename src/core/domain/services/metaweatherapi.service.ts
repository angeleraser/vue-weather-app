import { Localization } from '../models/localization.model';
import { OnEarthLocalization } from '../models/on-earth-localization.model';

export type LocalizationQueries = {
	query?: string;
	latt_long?: string;
};

interface MetaweatherApiService {
	readonly api_url: string;

	getLocalization: (params: LocalizationQueries) => Promise<Localization[]>;

	getOnEarthLocalization: (woeid: number) => Promise<OnEarthLocalization>;
}

export { MetaweatherApiService };
