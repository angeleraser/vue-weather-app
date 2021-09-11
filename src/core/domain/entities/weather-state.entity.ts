import { WeatherStateAbbr } from '@/core/constants/weather-state-abbr.constant';
import { WeatherStateName } from '@/core/constants/weather-state.constat';
import { WeatherStateModel } from '../models/weather-state.model';

class WeatherState implements WeatherStateModel {
	readonly name: WeatherStateName;
	readonly abbr: WeatherStateAbbr;

	constructor({
		name,
		abbr,
	}: {
		name: WeatherStateName;
		abbr: WeatherStateAbbr;
	}) {
		this.name = name;
		this.abbr = abbr;
	}
}

export { WeatherState };
