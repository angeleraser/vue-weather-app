import { LocalizationType } from '@/core/constants/localization-type.constant';
import { CoordinatesModel } from '../models/coordinates.model';
import { LocalizationModel } from '../models/localization.model';

class Localization implements LocalizationModel {
	readonly type: LocalizationType;
	readonly title: string;
	readonly oeid: number;
	readonly coordinates: CoordinatesModel;

	constructor({
		coordinates,
		type,
		title,
		oeid,
	}: {
		coordinates: CoordinatesModel;
		type: LocalizationType;
		title: string;
		oeid: number;
	}) {
		this.coordinates = coordinates;
		this.type = type;
		this.title = title;
		this.oeid = oeid;
	}
}

export { Localization };
