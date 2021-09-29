import { LocalizationType } from '@/core/constants/localization-type.constant';
import { CoordinatesModel } from './coordinates.model';
import { LocalizationModel } from './localization.model';
import { WeatherModel } from './weather.model';

interface OnEarthLocalizationModel {
	parent: LocalizationModel;
	time: string;
	weathers: Array<WeatherModel>;
	coordinates: CoordinatesModel;
	type: LocalizationType;
	title: string;
}

export { OnEarthLocalizationModel };
