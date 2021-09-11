import { Weather } from './weather/weather.model';
import { Localization } from './localization.model';
import { LocalizationType } from '@/core/constants/localization-type.constant';

interface OnEarthLocalizationModel {
	parent: Localization;
	time: string;
	weathers: Array<Weather>;
	latitude_longitude: string;
	type: LocalizationType;
	title: string;
}

class OnEarthLocalization implements OnEarthLocalizationModel {
	readonly parent: Localization;
	readonly time: string;
	readonly weathers: Weather[];
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
