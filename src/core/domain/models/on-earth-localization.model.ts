import { LocalizationType } from '@/core/constants/localization-type.constant';
import { LocalizationModel } from './localization.model';
import { WeatherModel } from './weather.model';

interface OnEarthLocalizationModel {
	parent: LocalizationModel;
	time: string;
	weathers: Array<WeatherModel>;
	latitude_longitude: string;
	type: LocalizationType;
	title: string;
}

export { OnEarthLocalizationModel };
