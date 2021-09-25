import { GeoIpifyApiResponse } from '@/core/api/geo-ipify.api';

interface GeoIpifyService {
	getCurrentLocation: () => Promise<GeoIpifyApiResponse>;
}

export { GeoIpifyService };
