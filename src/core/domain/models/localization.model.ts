import { LocalizationType } from '@/core/constants/localization-type.constant';

interface Localization {
	latitude_longitude: string;
	type: LocalizationType;
	title: string;
	woeid: number;
}

export { Localization };
