import { LocalizationType } from '../constants/localization-type.constant';
import { WeatherStateAbbr } from '../constants/weather-state-abbr.constant';
import { WeatherStateName } from '../constants/weather-state.constat';
import { Localization } from '../domain/models/localization.model';
import {
	MetaweatherApiResponse,
	MetaweatherLocalization,
	MetaweatherOnEarthLocalization,
} from '../domain/models/metaweather.api';

import { OnEarthLocalization } from '../domain/models/on-earth-localization.model';
import { WeatherState } from '../domain/models/weather/weather-state.model';
import { WeatherTemperature } from '../domain/models/weather/weather-temperature.model';
import { WeatherWind } from '../domain/models/weather/weather-wind.model';
import { Weather } from '../domain/models/weather/weather.model';

import {
	LocalizationQueries,
	WeatherService,
} from '../domain/services/weather.service';

import { getLocalizationSearchArgument, getUnlockedURL } from '../utils';

class MetaweatherService implements WeatherService {
	private api_url: string;

	constructor() {
		this.api_url = 'https://www.metaweather.com/api';
	}

	public getLocalization = async (
		params: LocalizationQueries,
	): Promise<Localization[]> => {
		const searchArguments = getLocalizationSearchArgument(params);

		const url = `${this.api_url}/location/search/?${searchArguments}`;

		const response = await fetch(getUnlockedURL(url));

		const data = (await response.json()) as MetaweatherApiResponse;

		const contents = JSON.parse(data.contents) as MetaweatherLocalization[];

		return contents.map(
			localization =>
				new Localization({
					title: localization.title,
					woeid: localization.woeid,
					latitude_longitude: localization.latt_long,
					type: localization.location_type as LocalizationType,
				}),
		);
	};

	public getOnEarthLocalization = async (
		woeid: number,
	): Promise<OnEarthLocalization> => {
		const url = `${this.api_url}/location/${woeid}`;

		const response = await fetch(getUnlockedURL(url));

		const data = (await response.json()) as MetaweatherApiResponse;

		const contents = JSON.parse(
			data.contents,
		) as MetaweatherOnEarthLocalization;

		return new OnEarthLocalization({
			latitude_longitude: contents.latt_long,
			time: contents.time,
			title: contents.title,
			type: contents.location_type as LocalizationType,
			weathers: contents.consolidated_weather.map(
				weather =>
					new Weather({
						air_pressure: weather.air_pressure,
						applicable_date: weather.applicable_date,
						created: weather.created,
						humidity: weather.humidity,
						id: weather.id,
						predictability: weather.predictability,

						state: new WeatherState({
							name: weather.weather_state_name as WeatherStateName,
							abbr: weather.weather_state_abbr as WeatherStateAbbr,
						}),

						temperature: new WeatherTemperature({
							min: weather.min_temp,
							current: weather.the_temp,
							max: weather.max_temp,
						}),

						visibility: weather.visibility,

						wind: new WeatherWind({
							direction: weather.wind_direction,
							direction_compass: weather.wind_direction_compass,
							speed: weather.wind_speed,
						}),
					}),
			),
			parent: new Localization({
				latitude_longitude: contents.parent.latt_long,
				type: contents.parent.location_type as LocalizationType,
				title: contents.parent.title,
				woeid: contents.parent.woeid,
			}),
		});
	};
}

export default MetaweatherService;
