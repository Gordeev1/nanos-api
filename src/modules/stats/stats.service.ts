import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Stat } from 'src/common/models/stat';
import { IStatsSummary } from './stats.types';

@Injectable()
export class StatsService {
	constructor(@InjectModel(Stat) private readonly statModel: ReturnModelType<typeof Stat>) {}

	async getSummary(): Promise<IStatsSummary> {
		const stats = await this.statModel
			.find()
			.select('impressions clicks cost_per_click')
			.lean()
			.exec();

		const summary = stats.reduce<IStatsSummary>(
			(result, item) => {
				Object.keys(result).forEach(key => {
					result[key] += item[key];
				});
				return result;
			},
			{ impressions: 0, clicks: 0, cost_per_click: 0 },
		);

		return {
			...summary,
			cost_per_click: summary.cost_per_click / stats.length,
		};
	}
}
