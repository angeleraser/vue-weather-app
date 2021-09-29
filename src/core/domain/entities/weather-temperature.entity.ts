class WeatherTemperature {
	readonly min: number;
	readonly current: number;
	readonly max: number;
	readonly unity: 'celcius' | 'fahrenheit';

	constructor({
		min,
		current,
		max,
		unity,
	}: {
		min: number;
		current: number;
		max: number;
		unity: 'celcius' | 'fahrenheit';
	}) {
		this.min = min;
		this.current = current;
		this.max = max;
		this.unity = unity;
	}
}

export { WeatherTemperature };
