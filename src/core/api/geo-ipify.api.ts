interface GeoIpifyApiResponse {
	ip: string;

	location: {
		country: string;
		region: string;
		city: string;
		lat: number;
		lng: number;
		postalCode: string;
		timezone: string;
		geonameId: number;
	};

	domains: Array<string>;

	as: {
		asn: number;
		name: string;
		route: string;
		domain: string;
		type: string;
	};

	isp: string;

	proxy: {
		proxy: boolean;
		vpn: boolean;
		tor: boolean;
	};
}

export { GeoIpifyApiResponse };
