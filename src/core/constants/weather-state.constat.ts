enum WeatherStateNameEnum {
	Snow = 'Snow',
	Sleet = 'Sleet',
	Hail = 'Hail',
	Thunderstorm = 'Thunderstorm',
	HeavyRain = 'HeavyRain',
	LightRain = 'LightRain',
	Showers = 'Snowers',
	HeavyCloud = 'HeavyCloud',
	LightCloud = 'LightCloud',
	Clear = 'Clear',
}

type WeatherStateName =
	| 'Snow'
	| 'Sleet'
	| 'Hail'
	| 'Thunderstorm'
	| 'Heavy Rain'
	| 'Light Rain'
	| 'Showers'
	| 'Heavy Cloud'
	| 'Light Cloud'
	| 'Clear';

export { WeatherStateName, WeatherStateNameEnum };
