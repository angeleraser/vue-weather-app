import { Weather } from './weather/weather.model';
import { Localization } from './localization.model';
import { LocalizationType } from '@/core/constants/localization-type.constant';

interface OnEarthLocalization {
	parent: Localization;
	time: string;
	weathers: Array<Weather>;
	latitude_longitude: string;
	type: LocalizationType;
	title: string;
}

export { OnEarthLocalization };
