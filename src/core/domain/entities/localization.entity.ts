import { LocalizationType } from '@/core/constants/localization-type.constant';
import { LocalizationModel } from '../models/localization.model';
import { Coordinates } from './coordinates.entity';

class Localization implements LocalizationModel {
	readonly type: LocalizationType;
	readonly title: string;
	readonly oeid: number;
	readonly coordinates: Coordinates;

	constructor({
		coordinates,
		type,
		title,
		oeid,
	}: {
		coordinates: Coordinates;
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
