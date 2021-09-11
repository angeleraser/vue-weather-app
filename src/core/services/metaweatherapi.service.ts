import {
	MetaweatherApiResponse,
	MetaweatherLocalization,
	MetaweatherOnEarthLocalization,
} from '../domain/models/metaweather.api';

import {
	LocalizationQueries,
	MetaweatherApiService,
} from '../domain/services/metaweatherapi.service';

import { getLocalizationSearchArgument, getUnlockedURL } from '../utils';

class MetaweatherService implements MetaweatherApiService {
	readonly api_url: string;

	constructor() {
		this.api_url = 'https://www.metaweather.com/api';
	}

	getLocalization = async (
		params: LocalizationQueries,
	): Promise<MetaweatherLocalization[]> => {
		const searchArguments = getLocalizationSearchArgument(params);

		const url = `${this.api_url}/location/search/?${searchArguments}`;

		const response = await fetch(getUnlockedURL(url));

		const data = (await response.json()) as MetaweatherApiResponse;

		const contents = JSON.parse(data.contents) as MetaweatherLocalization[];

		return contents;
	};

	getOnEarthLocalization = async (
		woeid: number,
	): Promise<MetaweatherOnEarthLocalization> => {
		const url = `${this.api_url}/location/${woeid}`;

		const response = await fetch(getUnlockedURL(url));

		const data = (await response.json()) as MetaweatherApiResponse;

		const contents = JSON.parse(
			data.contents,
		) as MetaweatherOnEarthLocalization;

		return contents;
	};
}

export default MetaweatherService;
