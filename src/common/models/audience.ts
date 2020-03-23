import { arrayProp, modelOptions } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Gender } from 'src/common/types/gender';

export interface Audience extends Base {}

@modelOptions({
	schemaOptions: {
		versionKey: false,
	},
})
export class Audience extends TimeStamps {
	@arrayProp({ items: String, required: true })
	languages: string[];

	@arrayProp({ items: String, enum: Gender, required: true })
	genders: Gender[];

	@arrayProp({ items: Number, required: true })
	age_range: [number, number];

	@arrayProp({ items: String, required: true })
	locations: string[];

	@arrayProp({ items: String })
	interests?: string[];

	@arrayProp({ items: String })
	KeyWords?: string[];
}
