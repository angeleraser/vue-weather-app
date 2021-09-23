import { format } from 'date-fns';
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

const convertToDate = (dateStr: string /*yyyy-dd-mm*/): Date => {
	const [year, day, month] = dateStr.split('-').map(val => Number(val));

	return new Date(year, day, month);
};

const formatDate = (dateStr: string): string => {
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

export {
	getLocalizationSearchArgument,
	allowCors,
	convertToDate,
	formatDate,
	delay,
};
