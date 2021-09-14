import { WeatherStateAbbr } from '@/core/constants/weather-state-abbr.constant';
import { WeatherStateName } from '@/core/constants/weather-state.constat';

interface WeatherStateModel {
	name: WeatherStateName;
	abbr: WeatherStateAbbr;
	icon: string;
}

export { WeatherStateModel };
