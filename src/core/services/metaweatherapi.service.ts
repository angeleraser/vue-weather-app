import { AllowCorsServiceResponse } from '../api/metaweather.api';
import { Coordinates } from '../domain/entities/coordinates.entity';
import { getLocalizationSearchArgument } from '../utils';
import { Localization } from '../domain/entities/localization.entity';
import { LocalizationQueries } from '../domain/services/weather.service';
import { LocalizationType } from '../constants/localization-type.constant';
import { MetaweatherLocalization } from '../api/metaweather.api';
import { MetaweatherOnEarthLocalization } from '../api/metaweather.api';
import { OnEarthLocalization } from '../domain/entities/on-earth-localization.entity';
import { Weather } from '../domain/entities/weather.entity';
import { WeatherService } from '../domain/services/weather.service';
import { WeatherServiceErrorMessages } from '../constants/errors-messages.constant';
import { WeatherState } from '../domain/entities/weather-state.entity';
import { WeatherStateAbbr } from '../constants/weather-state-abbr.constant';
import { WeatherStateName } from '../constants/weather-state.constat';
import { WeatherTemperature } from '../domain/entities/weather-temperature.entity';
import { WeatherWind } from '../domain/entities/weather-wind.entity';
import HttpService from './http.service';
import WeatherServiceError from '../errors/weather.service.error';

class MetaweatherService implements WeatherService {
	private readonly api_url: string;

	constructor() {
		this.api_url = 'https://www.metaweather.com/api';
	}

	public findLocalizations = async (
		params: LocalizationQueries,
	): Promise<Localization[]> => {
		const searchArguments = getLocalizationSearchArgument(params);

		const url = `/location/search/?${searchArguments}`;

		const response = await this.http.get(url);

		const data = (await response.json()) as AllowCorsServiceResponse;

		const contents = JSON.parse(data.contents) as MetaweatherLocalization[];

		if (contents.length === 0) {
			throw new WeatherServiceError({
				message: WeatherServiceErrorMessages.EMPTY_SEARCH,
			});
		}

		return contents.map(
			localization =>
				new Localization({
					title: localization.title,
					oeid: localization.woeid,
					coordinates: new Coordinates({
						...Coordinates.getFromStr(localization.latt_long),
					}),
					type: localization.location_type as LocalizationType,
				}),
		);
	};

	public getOnEarthLocalization = async (
		woeid: number,
	): Promise<OnEarthLocalization> => {
		const url = `/location/${woeid}`;

		const response = await this.http.get(url);

		const data = (await response.json()) as AllowCorsServiceResponse;

		const contents = JSON.parse(
			data.contents,
		) as MetaweatherOnEarthLocalization;

		return new OnEarthLocalization({
			coordinates: new Coordinates({
				...Coordinates.getFromStr(contents.latt_long),
			}),
			time: contents.time,
			title: contents.title,
			type: contents.location_type as LocalizationType,
			weathers: contents.consolidated_weather.map(
				weather =>
					new Weather({
						air_pressure: weather.air_pressure,
						applicable_date: weather.applicable_date,
						humidity: weather.humidity,
						id: weather.id,
						predictability: weather.predictability,

						state: new WeatherState({
							name: weather.weather_state_name as WeatherStateName,
							abbr: weather.weather_state_abbr as WeatherStateAbbr,
							icon: this.getWeatherImgUrl(
								weather.weather_state_abbr as WeatherStateAbbr,
							),
						}),

						temperature: new WeatherTemperature({
							min: weather.min_temp,
							current: weather.the_temp,
							max: weather.max_temp,
							unity: 'celcius',
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
				coordinates: new Coordinates({
					...Coordinates.getFromStr(contents.parent.latt_long),
				}),
				type: contents.parent.location_type as LocalizationType,
				title: contents.parent.title,
				oeid: contents.parent.woeid,
			}),
		});
	};

	private get http() {
		return new HttpService({
			apiUrl: this.api_url,
			headers: new Headers(),
			use_allow_cors: true,
		});
	}

	private getWeatherImgUrl = (state: WeatherStateAbbr): string => {
		return `https://www.metaweather.com/static/img/weather/${state}.svg`;
	};
}

export default MetaweatherService;
