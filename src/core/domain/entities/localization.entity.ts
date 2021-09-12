import { LocalizationType } from '@/core/constants/localization-type.constant';
import { CoordinatesModel } from '../models/coordinates.model';
import { LocalizationModel } from '../models/localization.model';

class Localization implements LocalizationModel {
	readonly type: LocalizationType;
	readonly title: string;
	readonly woeid: number;
	readonly coordinates: CoordinatesModel;

	constructor({
		coordinates,
		type,
		title,
		woeid,
	}: {
		coordinates: CoordinatesModel;
		type: LocalizationType;
		title: string;
		woeid: number;
	}) {
		this.coordinates = coordinates;
		this.type = type;
		this.title = title;
		this.woeid = woeid;
	}
}

export { Localization };
