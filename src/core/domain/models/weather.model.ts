import { WeatherStateModel } from './weather-state.model';
import { WeatherTemperatureModel } from './weather-temperature.model';
import { WeatherWindModel } from './weather-wind.model';

interface WeatherModel {
	air_pressure: number;
	applicable_date: string;
	created: string;
	humidity: number;
	id: number;
	img: string;
	predictability: number;
	state: WeatherStateModel;
	temperature: WeatherTemperatureModel;
	visibility: number;
	wind: WeatherWindModel;
}

export { WeatherModel };
