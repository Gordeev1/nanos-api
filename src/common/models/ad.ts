import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { CampaignStatus } from 'src/common/types/campaign';
import { Platforms } from 'src/common/types/platforms';
import { Audience } from 'src/common/models/audience';
import { Creative } from 'src/common/models/creative';
import { Stat } from 'src/common/models/stat';

export interface Ad extends Base {}

@modelOptions({
	schemaOptions: {
		versionKey: false,
	},
})
export class Ad extends TimeStamps {
	@prop({ required: true, enum: Platforms })
	platform_name: Platforms;

	@prop({ required: true, enum: CampaignStatus })
	status: CampaignStatus;

	@prop({ required: true })
	total_budget: number;

	@prop({ required: true })
	remaining_budget: number;

	@prop({ required: true })
	start_date: number;

	@prop({ required: true })
	end_date: number;

	@prop({ ref: 'Audience', required: true })
	target_audiance?: Ref<Audience>;

	@prop({ ref: 'Creative', required: true })
	creatives?: Ref<Creative>;

	@prop({ ref: 'Stat', required: true })
	insights?: Ref<Stat>;
}
