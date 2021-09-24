import { WeatherServiceErrorMessages } from '@/core/constants/errors-messages.constant';
import WeatherServiceError from '../errors/weather.service.error';
import { allowCors } from '../utils';

interface HttpServiceConfig {
	apiUrl: string;
	headers: HeadersInit;
}

export default class HttpService {
	private api_url: string;
	private req_headers: HeadersInit;

	constructor({ apiUrl, headers }: HttpServiceConfig) {
		this.api_url = apiUrl;
		this.req_headers = headers;
	}

	public async get(endpoint: string): Promise<Response> {
		const getOptions = {
			method: 'GET',
			headers: this.req_headers,
		};

		return this.fetchAction(endpoint, getOptions);
	}

	public async post(endpoint: string, body: unknown): Promise<Response> {
		const postOptions = {
			method: 'POST',
			headers: this.req_headers,
			body,
		};

		return await this.fetchAction(endpoint, postOptions);
	}

	public async put(endpoint: string, body?: unknown): Promise<Response> {
		const putOptions = {
			method: 'PUT',
			headers: this.req_headers,
			body,
		};

		return await this.fetchAction(endpoint, putOptions);
	}

	private async fetchAction(
		endpoint: string,
		options: unknown,
	): Promise<Response> {
		try {
			return await fetch(
				allowCors(`${this.api_url}${endpoint}`),
				options as RequestInit,
			);
		} catch (error) {
			throw new WeatherServiceError({
				message: WeatherServiceErrorMessages.UNKNOW,
			});
		}
	}
}
