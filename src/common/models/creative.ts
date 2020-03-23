import { prop, modelOptions } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface Creative extends Base {}

@modelOptions({
	schemaOptions: {
		versionKey: false,
	},
})
export class Creative extends TimeStamps {
	@prop({ required: true })
	description: string;

	@prop({ required: true })
	url: string;

	@prop({ required: true })
	image: string;

	@prop()
	header?: string;

	@prop()
	header_1?: string;

	@prop()
	header_2?: string;
}
