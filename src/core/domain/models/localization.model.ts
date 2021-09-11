import { LocalizationType } from '@/core/constants/localization-type.constant';

interface LocalizationModel {
	latitude_longitude: string;
	type: LocalizationType;
	title: string;
	woeid: number;
}

class Localization implements LocalizationModel {
	readonly latitude_longitude: string;
	readonly type: LocalizationType;
	readonly title: string;
	readonly woeid: number;

	constructor({
		latitude_longitude,
		type,
		title,
		woeid,
	}: {
		latitude_longitude: string;
		type: LocalizationType;
		title: string;
		woeid: number;
	}) {
		this.latitude_longitude = latitude_longitude;
		this.type = type;
		this.title = title;
		this.woeid = woeid;
	}
}

export { Localization };
