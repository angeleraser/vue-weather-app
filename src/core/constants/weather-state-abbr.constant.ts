enum WeatherStateAbbrEnum {
	Snow = 'sn',
	Sleet = 'sl',
	Hail = 'h',
	Thunderstorm = 't',
	HeavyRain = 'hr',
	LightRain = 'lr',
	Showers = 's',
	HeavyCloud = 'hc',
	LightCloud = 'lc',
	Clear = 'c',
}

type WeatherStateAbbr =
	| 'sn'
	| 'sl'
	| 'h'
	| 't'
	| 'hr'
	| 'lr'
	| 's'
	| 'hc'
	| 'lc'
	| 'c';

export { WeatherStateAbbr, WeatherStateAbbrEnum };
