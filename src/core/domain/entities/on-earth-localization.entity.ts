import { LocalizationType } from '@/core/constants/localization-type.constant';
import { Coordinates } from './coordinates.entity';
import { Localization } from './localization.entity';
import { Weather } from './weather.entity';

class OnEarthLocalization {
	readonly parent: Localization;
	readonly time: string;
	readonly weathers: Weather[];
	readonly type: LocalizationType;
	readonly title: string;
	readonly coordinates: Coordinates;

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
		coordinates: Coordinates;
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
