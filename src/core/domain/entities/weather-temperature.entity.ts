import { WeatherTemperatureModel } from '../models/weather-temperature.model';

class WeatherTemperature implements WeatherTemperatureModel {
	readonly min: number;
	readonly current: number;
	readonly max: number;

	constructor({
		min,
		current,
		max,
	}: {
		min: number;
		current: number;
		max: number;
	}) {
		this.min = min;
		this.current = current;
		this.max = max;
	}
}

export { WeatherTemperature };