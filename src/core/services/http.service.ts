import { WeatherServiceErrorMessages } from '@/core/constants/errors-messages.constant';
import WeatherServiceError from '../errors/weather.service.error';
import { allowCors } from '../utils';

interface HttpServiceConfig {
	apiUrl: string;
	headers: HeadersInit;
	use_allow_cors?: boolean;
}

export default class HttpService {
	private api_url: string;
	private req_headers: HeadersInit;
	private use_allow_cors?: boolean;

	constructor({ apiUrl, headers, use_allow_cors }: HttpServiceConfig) {
		this.api_url = apiUrl;
		this.req_headers = headers;
		this.use_allow_cors = use_allow_cors || false;
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
		const url = this.use_allow_cors
			? allowCors(`${this.api_url}${endpoint}`)
			: `${this.api_url}${endpoint}`;

		try {
			return await fetch(url, options as RequestInit);
		} catch {
			if (!navigator.onLine) {
				throw new WeatherServiceError({
					message: WeatherServiceErrorMessages.NO_NETWORK_CONNECTION,
				});
			}

			throw new WeatherServiceError({
				message: WeatherServiceErrorMessages.UNKNOW,
			});
		}
	}
}
