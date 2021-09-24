import { WeatherServiceErrorMessages } from '../constants/errors-messages.constant';

export default class WeatherServiceError extends Error {
	public retry_action?: boolean;

	constructor({
		message,
		retry_action,
	}: {
		message: WeatherServiceErrorMessages;
		retry_action?: boolean;
	}) {
		super();
		this.message = message;
		this.retry_action = retry_action || false;
		this.name = 'WeatherServiceError';
	}
}
