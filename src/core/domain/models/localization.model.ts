import { LocalizationType } from '@/core/constants/localization-type.constant';
import { CoordinatesModel } from './coordinates.model';

interface LocalizationModel {
	coordinates: CoordinatesModel;
	type: LocalizationType;
	title: string;
	oeid: number;
}

export { LocalizationModel };
