import { Localization } from '../domain/models/localization.model';
import {
	MetaweatherApiResponse,
	MetaweatherLocalization,
	MetaweatherOnEarthLocalization,
} from '../domain/models/metaweather.api';
import { OnEarthLocalization } from '../domain/models/on-earth-localization.model';

import {
	LocalizationQueries,
	MetaweatherApiService,
} from '../domain/services/metaweatherapi.service';

import {
	formatMetaweatherApiLocalizationData,
	formatMetaweatherApiOnEarthLocalizationData,
	getLocalizationSearchArgument,
	getUnlockedURL,
} from '../utils';

class MetaweatherService implements MetaweatherApiService {
	readonly api_url: string;

	constructor() {
		this.api_url = 'https://www.metaweather.com/api';
	}

	getLocalization = async (
		params: LocalizationQueries,
	): Promise<Localization[]> => {
		const searchArguments = getLocalizationSearchArgument(params);

		const url = `${this.api_url}/location/search/?${searchArguments}`;

		const response = await fetch(getUnlockedURL(url));

		const data = (await response.json()) as MetaweatherApiResponse;

		const contents = JSON.parse(data.contents) as MetaweatherLocalization[];

		return contents.map(localization =>
			formatMetaweatherApiLocalizationData(localization),
		);
	};

	getOnEarthLocalization = async (
		woeid: number,
	): Promise<OnEarthLocalization> => {
		const url = `${this.api_url}/location/${woeid}`;

		const response = await fetch(getUnlockedURL(url));

		const data = (await response.json()) as MetaweatherApiResponse;

		const contents = JSON.parse(
			data.contents,
		) as MetaweatherOnEarthLocalization;

		return formatMetaweatherApiOnEarthLocalizationData(contents);
	};
}

export default MetaweatherService;
