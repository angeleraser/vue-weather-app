import { WeatherState } from './weather-state.model';
import { WeatherTemperature } from './weather-temperature.model';
import { WeatherWind } from './weather-wind.model';

interface Weather {
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
}

export { Weather };
