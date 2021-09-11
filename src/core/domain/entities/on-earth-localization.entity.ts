import { LocalizationType } from '@/core/constants/localization-type.constant';
import { LocalizationModel } from '../models/localization.model';
import { OnEarthLocalizationModel } from '../models/on-earth-localization.model';
import { WeatherModel } from '../models/weather.model';
import { Localization } from './localization.entity';
import { Weather } from './weather.entity';

class OnEarthLocalization implements OnEarthLocalizationModel {
	readonly parent: LocalizationModel;
	readonly time: string;
	readonly weathers: WeatherModel[];
	readonly latitude_longitude: string;
	readonly type: LocalizationType;
	readonly title: string;

	constructor({
		parent,
		time,
		weathers,
		latitude_longitude,
		type,
		title,
	}: {
		parent: Localization;
		time: string;
		weathers: Array<Weather>;
		latitude_longitude: string;
		type: LocalizationType;
		title: string;
	}) {
		this.parent = parent;
		this.time = time;
		this.weathers = weathers;
		this.latitude_longitude = latitude_longitude;
		this.type = type;
		this.title = title;
	}
}

export { OnEarthLocalization };
