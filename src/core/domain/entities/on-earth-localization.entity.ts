import { LocalizationType } from '@/core/constants/localization-type.constant';
import { CoordinatesModel } from '../models/coordinates.model';
import { LocalizationModel } from '../models/localization.model';
import { OnEarthLocalizationModel } from '../models/on-earth-localization.model';
import { WeatherModel } from '../models/weather.model';
import { Localization } from './localization.entity';
import { Weather } from './weather.entity';

class OnEarthLocalization implements OnEarthLocalizationModel {
	readonly parent: LocalizationModel;
	readonly time: string;
	readonly weathers: WeatherModel[];
	readonly type: LocalizationType;
	readonly title: string;
	readonly coordinates: CoordinatesModel;

	constructor({
		parent,
		time,
		weathers,
		type,
		title,
		coordinates,
	}: {
		parent: Localization;
		time: string;
		weathers: Array<Weather>;
		type: LocalizationType;
		title: string;
		coordinates: CoordinatesModel;
	}) {
		this.parent = parent;
		this.time = time;
		this.weathers = weathers;
		this.type = type;
		this.title = title;
		this.coordinates = coordinates;
	}
}

export { OnEarthLocalization };
