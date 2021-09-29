import { CoordinatesModel } from '../models/coordinates.model';

class Coordinates implements CoordinatesModel {
	readonly latitude: number;
	readonly longitude: number;

	constructor({
		latitude,
		longitude,
	}: {
		latitude: number;
		longitude: number;
	}) {
		this.latitude = latitude;
		this.longitude = longitude;
	}

	static getFromStr = (
		str: string,
	): { latitude: number; longitude: number } => {
		const [latt, long] = str.split(',');

		return {
			latitude: Number(latt),
			longitude: Number(long),
		};
	};
}

export { Coordinates };
