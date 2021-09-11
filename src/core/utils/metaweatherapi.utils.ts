import { LocalizationType } from '../constants/localization-type.constant';
import { WeatherStateAbbr } from '../constants/weather-state-abbr.constant';
import { WeatherStateName } from '../constants/weather-state.constat';
import { Localization } from '../domain/models/localization.model';
import {
	MetaweatherConsolidatedWeather,
	MetaweatherLocalization,
	MetaweatherOnEarthLocalization,
} from '../domain/models/metaweather.api';
import { OnEarthLocalization } from '../domain/models/on-earth-localization.model';
import { Weather } from '../domain/models/weather/weather.model';

const formatMetaweatherApiLocalizationData = (
	data: MetaweatherLocalization,
): Localization => {
	return {
		title: data.title,
		woeid: data.woeid,
		latitude_longitude: data.latt_long,
		type: data.location_type as LocalizationType,
	};
};

const formatMetaweatherApiWeathers = (
	weathers: MetaweatherConsolidatedWeather[],
): Weather[] => {
	return weathers.map(
		(weather): Weather => ({
			air_pressure: weather.air_pressure,
			applicable_date: weather.applicable_date,
			created: weather.created,
			humidity: weather.humidity,
			id: weather.id,
			predictability: weather.predictability,
			state: {
				name: weather.weather_state_name as WeatherStateName,
				abbr: weather.weather_state_abbr as WeatherStateAbbr,
			},

			temperature: {
				min: weather.min_temp,
				current: weather.the_temp,
				max: weather.max_temp,
			},

			visibility: weather.visibility,

			wind: {
				direction: weather.wind_direction,
				direction_compass: weather.wind_direction_compass,
				speed: weather.wind_speed,
			},
		}),
	);
};

const formatMetaweatherApiOnEarthLocalizationData = (
	data: MetaweatherOnEarthLocalization,
): OnEarthLocalization => {
	return {
		latitude_longitude: data.latt_long,
		time: data.time,
		title: data.title,
		type: data.location_type as LocalizationType,
		weathers: formatMetaweatherApiWeathers(data.consolidated_weather),
		parent: formatMetaweatherApiLocalizationData(
			data.parent as MetaweatherLocalization,
		),
	};
};

export {
	formatMetaweatherApiLocalizationData,
	formatMetaweatherApiOnEarthLocalizationData,
	formatMetaweatherApiWeathers,
};
