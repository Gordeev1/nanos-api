import { prop, Ref, arrayProp, modelOptions } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Ad } from 'src/common/models/ad';
import { CampaignStatus } from 'src/common/types/campaign';

export interface Campaign extends Base {}

@modelOptions({
	schemaOptions: {
		versionKey: false,
	},
})
export class Campaign extends TimeStamps {
	@prop({ required: true })
	name: string;

	@prop({ required: true })
	goal: string;

	@prop({ required: true, enum: CampaignStatus })
	status: CampaignStatus;

	@arrayProp({ ref: 'Ad', required: true })
	ads: Ref<Ad>[];
}
