import {
	MetaweatherLocalization,
	MetaweatherOnEarthLocalization,
} from '../models/metaweather.api';

export type LocalizationQueries = {
	query?: string;
	latt_long?: string;
};

interface MetaweatherApiService {
	readonly api_url: string;

	getLocalization: (
		params: LocalizationQueries,
	) => Promise<MetaweatherLocalization[]>;

	getOnEarthLocalization: (
		woeid: number,
	) => Promise<MetaweatherOnEarthLocalization>;
}

export { MetaweatherApiService };
