import { Weather } from './weather.model';
import { Localization } from './localization.model';

interface OnEarthLocalization extends Localization {
	parent: Localization;
	time: string;
	weathers: Array<Weather>;
}

export { OnEarthLocalization };
