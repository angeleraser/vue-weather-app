import { WeatherTemperatureModel } from '../models/weather-temperature.model';

class WeatherTemperature implements WeatherTemperatureModel {
	readonly min: number;
	readonly current: number;
	readonly max: number;
	readonly unity: WeatherTemperatureModel['unity'];

	constructor({
		min,
		current,
		max,
		unity,
	}: {
		min: number;
		current: number;
		max: number;
		unity: WeatherTemperatureModel['unity'];
	}) {
		this.min = min;
		this.current = current;
		this.max = max;
		this.unity = unity;
	}
}

export { WeatherTemperature };
