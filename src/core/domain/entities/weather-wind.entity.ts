import { WeatherWindModel } from '../models/weather-wind.model';

class WeatherWind implements WeatherWindModel {
	readonly direction_compass: string;
	readonly direction: number;
	readonly speed: number;

	constructor({
		direction,
		direction_compass,
		speed,
	}: {
		direction_compass: string;
		direction: number;
		speed: number;
	}) {
		this.direction = direction;
		this.direction_compass = direction_compass;
		this.speed = speed;
	}
}

export { WeatherWind };
