import { WeatherStateAbbr } from '@/core/constants/weather-state-abbr.constant';
import { WeatherStateName } from '@/core/constants/weather-state.constat';

class WeatherState {
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
