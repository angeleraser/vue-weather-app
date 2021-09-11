import { LocalizationQueries } from '../domain/services/metaweatherapi.service';

const getLocalizationSearchArgument = (params: LocalizationQueries): string => {
	if (!params.latt_long && !params.query) return ``;

	if (params.query && !params.latt_long) return `query=${params.query}`;

	if (params.latt_long && !params.query) return `lattlong=${params.latt_long}`;

	return `query=${params.query}`;
};

const getUnlockedURL = (url: string): string => {
	return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
};

export { getLocalizationSearchArgument, getUnlockedURL };
