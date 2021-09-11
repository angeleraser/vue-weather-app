import { WeatherState } from './weather-state.model';
import { WeatherTemperature } from './weather-temperature.model';
import { WeatherWind } from './weather-wind.model';

interface WeatherModel {
	air_pressure: number;
	applicable_date: string;
	created: string;
	humidity: number;
	id: number;
	predictability: number;
	state: WeatherState;
	temperature: WeatherTemperature;
	visibility: number;
	wind: WeatherWind;
	img: string;
}

class Weather implements WeatherModel {
	readonly air_pressure: number;
	readonly applicable_date: string;
	readonly created: string;
	readonly humidity: number;
	readonly id: number;
	readonly predictability: number;
	readonly state: WeatherState;
	readonly temperature: WeatherTemperature;
	readonly visibility: number;
	readonly wind: WeatherWind;
	readonly img: string;

	constructor({
		air_pressure,
		applicable_date,
		created,
		humidity,
		id,
		predictability,
		state,
		temperature,
		visibility,
		wind,
		img,
	}: {
		air_pressure: number;
		applicable_date: string;
		created: string;
		humidity: number;
		id: number;
		predictability: number;
		state: WeatherState;
		temperature: WeatherTemperature;
		visibility: number;
		wind: WeatherWind;
		img: string;
	}) {
		this.air_pressure = air_pressure;
		this.applicable_date = applicable_date;
		this.created = created;
		this.humidity = humidity;
		this.id = id;
		this.predictability = predictability;
		this.state = state;
		this.temperature = temperature;
		this.visibility = visibility;
		this.wind = wind;
		this.img = img;
	}
}

export { Weather };
