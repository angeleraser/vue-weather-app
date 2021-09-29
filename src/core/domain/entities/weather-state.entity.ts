import { WeatherStateAbbr } from '@/core/constants/weather-state-abbr.constant';
import { WeatherStateName } from '@/core/constants/weather-state.constat';
import { WeatherStateModel } from '../models/weather-state.model';

class WeatherState implements WeatherStateModel {
	readonly name: WeatherStateName;
	readonly abbr: WeatherStateAbbr;
	readonly icon: string;

	constructor({
		name,
		abbr,
		icon,
	}: {
		name: WeatherStateName;
		abbr: WeatherStateAbbr;
		icon: string;
	}) {
		this.name = name;
		this.abbr = abbr;
		this.icon = icon;
	}
}

export { WeatherState };
