import { WeatherState } from './weather-state.entity';
import { WeatherTemperature } from './weather-temperature.entity';
import { WeatherWind } from './weather-wind.entity';

class Weather {
	readonly air_pressure: number;
	readonly applicable_date: string;
	readonly humidity: number;
	readonly id: number;
	readonly predictability: number;
	readonly state: WeatherState;
	readonly temperature: WeatherTemperature;
	readonly visibility: number;
	readonly wind: WeatherWind;

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
		state: WeatherState;
		temperature: WeatherTemperature;
		visibility: number;
		wind: WeatherWind;
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
