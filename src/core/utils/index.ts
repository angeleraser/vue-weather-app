import { format } from 'date-fns';
import { WeatherTemperature } from '../domain/entities/weather-temperature.entity';
import { LocalizationQueries } from '../domain/services/weather.service';

const getLocalizationSearchArgument = (params: LocalizationQueries): string => {
	if (!params.latt_long && !params.query) return ``;

	if (params.query && !params.latt_long) return `query=${params.query}`;

	if (params.latt_long && !params.query) return `lattlong=${params.latt_long}`;

	return `query=${params.query}`;
};

const allowCors = (url: string): string => {
	return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
};

const convertToDate = (dateStr: string /*yyyy-mm-dd*/): Date => {
	const [year, month, day] = dateStr.split('-').map(val => Number(val));

	return new Date(year, month - 1, day);
};

const formatDate = (dateStr: string): string => {
	console.log(dateStr);
	return format(convertToDate(dateStr), 'iii, dd MMM');
};

type FunctionOrNumber = ((...args: never) => never) | number;

async function delay(
	callbackOrDelayTime: (...args: never) => never,
	delayTime: number,
): Promise<void>;

async function delay(
	callbackOrDelayTime: number,
	delayTime?: number,
): Promise<void>;

async function delay(
	callbackOrDelayTime: FunctionOrNumber,
	delayTime?: number,
): Promise<void> {
	if (typeof callbackOrDelayTime === 'number') {
		return new Promise(resolve => {
			const timeout = setTimeout(() => {
				resolve();
				clearTimeout(timeout);
			}, callbackOrDelayTime);
		});
	}

	return new Promise(resolve => {
		const timeout = setTimeout(() => {
			resolve();
			callbackOrDelayTime();
			clearTimeout(timeout);
		}, delayTime);
	});
}

const celciusToFahrenheit = (celcius: number): number => {
	return (celcius * 9) / 5 + 32;
};

const getTemperatureObject = (
	weatherTemp: WeatherTemperature,
	unity: WeatherTemperature['unity'],
): WeatherTemperature => {
	const temp_fahrenheit = {
		min: Math.round(celciusToFahrenheit(weatherTemp.min)),
		current: Math.round(celciusToFahrenheit(weatherTemp.current)),
		max: Math.round(celciusToFahrenheit(weatherTemp.max)),
		unity: '°F' as WeatherTemperature['unity'],
	};

	const temp_celcius = {
		min: Math.round(weatherTemp.min),
		current: Math.round(weatherTemp.current),
		max: Math.round(weatherTemp.max),
		unity: '°C' as WeatherTemperature['unity'],
	};

	if (unity === 'celcius') return temp_celcius;

	if (unity === 'fahrenheit') return temp_fahrenheit;

	return temp_celcius;
};

export {
	getLocalizationSearchArgument,
	allowCors,
	convertToDate,
	formatDate,
	delay,
	celciusToFahrenheit,
	getTemperatureObject,
};
