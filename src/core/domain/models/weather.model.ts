import { WeatherStateAbbr } from '@/core/constants/weather-state-abbr.constant';
import { WeatherStateName } from '@/core/constants/weather-state.constat';

interface Weather {
	air_pressure: number;
	applicable_date: string;
	created: string;
	humidity: number;
	id: number;
	predictability: number;
	visibility: number;

	wind: {
		direction_compass: string;
		direction: number;
		speed: number;
	};

	temperature: {
		min: number;
		current: number;
		max: number;
	};

	state: {
		name: WeatherStateName;
		abbr: WeatherStateAbbr;
	};
}

export { Weather };
