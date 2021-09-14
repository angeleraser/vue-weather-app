import { WeatherModel } from '../models/weather.model';
import { WeatherStateModel } from '../models/weather-state.model';
import { WeatherTemperatureModel } from '../models/weather-temperature.model';
import { WeatherWindModel } from '../models/weather-wind.model';

class Weather implements WeatherModel {
	readonly air_pressure: number;
	readonly applicable_date: string;
	readonly humidity: number;
	readonly id: number;
	readonly predictability: number;
	readonly state: WeatherStateModel;
	readonly temperature: WeatherTemperatureModel;
	readonly visibility: number;
	readonly wind: WeatherWindModel;

	constructor({
		air_pressure,
		applicable_date,
		humidity,
		id,
		predictability,
		state,
		temperature,
		visibility,
		wind,
	}: {
		air_pressure: number;
		applicable_date: string;
		humidity: number;
		id: number;
		predictability: number;
		state: WeatherStateModel;
		temperature: WeatherTemperatureModel;
		visibility: number;
		wind: WeatherWindModel;
	}) {
		this.air_pressure = air_pressure;
		this.applicable_date = applicable_date;
		this.humidity = humidity;
		this.id = id;
		this.predictability = predictability;
		this.state = state;
		this.temperature = temperature;
		this.visibility = visibility;
		this.wind = wind;
	}
}

export { Weather };
