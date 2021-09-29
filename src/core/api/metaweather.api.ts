interface MetaweatherLocalization {
	latt_long: string;
	location_type: string;
	title: string;
	woeid: number;
}

type getUrlWithCorsAnywhereServiceResponse = {
	contents: string; // JSON String

	status: {
		url: string;
		content_type: string;
		content_length: number;
		http_code: number;
		response_time: number;
	};
};

interface MetaweatherOnEarthLocalization {
	consolidated_weather: Array<MetaweatherConsolidatedWeather>;
	latt_long: string;
	location_type: string;
	parent: MetaweatherLocalization;
	sources: Array<unknown>;
	sun_rise: string;
	sun_set: string;
	time: string;
	timezone_name: string;
	timezone: string;
	title: string;
	woeid: number;
}

interface MetaweatherConsolidatedWeather {
	id: number;
	weather_state_name: string;
	weather_state_abbr: string;
	wind_direction_compass: string;
	created: string;
	applicable_date: string;
	min_temp: number;
	max_temp: number;
	the_temp: number;
	wind_speed: number;
	wind_direction: number;
	air_pressure: number;
	humidity: number;
	visibility: number;
	predictability: number;
}

export {
	MetaweatherLocalization,
	MetaweatherOnEarthLocalization,
	MetaweatherConsolidatedWeather,
	getUrlWithCorsAnywhereServiceResponse,
};
