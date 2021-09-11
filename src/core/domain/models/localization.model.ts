import { LocalizationType } from '@/core/constants/localization-type.constant';

interface LocalizationModel {
	latitude_longitude: string;
	type: LocalizationType;
	title: string;
	woeid: number;
}

export { LocalizationModel };
