import { prop, modelOptions } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface Stat extends Base {}

@modelOptions({
	schemaOptions: {
		versionKey: false,
	},
})
export class Stat extends TimeStamps {
	@prop({ required: true })
	impressions: number;

	@prop({ required: true })
	clicks: number;

	@prop({ required: true })
	cost_per_click: number;

	@prop({ required: true })
	click_through_rate: number;

	@prop({ required: true })
	advanced_kpi_1: number;

	@prop()
	advanced_kpi_2?: number;

	@prop()
	nanos_score?: number;

	@prop()
	website_visits?: number;
}
