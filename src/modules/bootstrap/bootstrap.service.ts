import { Injectable } from '@nestjs/common';
import { isNil, pick } from 'lodash';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Campaign } from 'src/common/models/campaign';
import { Ad } from 'src/common/models/ad';
import { Audience } from 'src/common/models/audience';
import { Creative } from 'src/common/models/creative';
import { Stat } from 'src/common/models/stat';

@Injectable()
export class BootstrapService {
	constructor(
		@InjectModel(Campaign) private readonly campaignModel: ReturnModelType<typeof Campaign>,
		@InjectModel(Ad) private readonly adModel: ReturnModelType<typeof Ad>,
		@InjectModel(Audience) private readonly audienceModel: ReturnModelType<typeof Audience>,
		@InjectModel(Creative) private readonly creativeModel: ReturnModelType<typeof Creative>,
		@InjectModel(Stat) private readonly statModel: ReturnModelType<typeof Stat>,
	) {}

	async prepareData(data: any[]) {
		await this.dropCollections();

		const tasks = data.map(async ({ name, goal, status, platforms }) => {
			const subTasks = Object.keys(platforms).map(async platform_name => {
				const platform = platforms[platform_name];

				const [target_audiance, creatives, insights] = await Promise.all([
					new this.audienceModel(
						this.filterEmptyValues(
							pick(platform.target_audiance, [
								'languages',
								'genders',
								'age_range',
								'locations',
								'interests',
								'KeyWords',
							]),
						),
					).save(),
					new this.creativeModel(
						this.filterEmptyValues(
							pick(platform.creatives, [
								'description',
								'url',
								'image',
								'header',
								'header_1',
								'header_2',
							]),
						),
					).save(),
					new this.statModel(
						this.filterEmptyValues(
							pick(platform.insights, [
								'impressions',
								'clicks',
								'cost_per_click',
								'click_through_rate',
								'advanced_kpi_1',
								'advanced_kpi_2',
								'nanos_score',
								'website_visits',
							]),
						),
					).save(),
				]);

				return new this.adModel({
					platform_name,
					target_audiance: target_audiance._id,
					creatives: creatives._id,
					insights: insights._id,
					...pick(platform, [
						'status',
						'total_budget',
						'remaining_budget',
						'start_date',
						'end_date',
					]),
				}).save();
			});

			const ads = (await Promise.all(subTasks)).map(ad => ad._id);

			return new this.campaignModel({
				name,
				goal,
				status,
				ads,
			}).save();
		});

		return Promise.all(tasks);
	}

	private filterEmptyValues = (object: Record<string, any>) =>
		Object.assign(
			{},
			...Object.entries(object)
				.filter(([_, value]) => !isNil(value))
				.map(([key, value]) => ({ [key]: value })),
		);

	private async dropCollections() {
		const tasks = [
			this.campaignModel.collection.deleteMany({}),
			this.adModel.collection.deleteMany({}),
			this.audienceModel.collection.deleteMany({}),
			this.creativeModel.collection.deleteMany({}),
			this.statModel.collection.deleteMany({}),
		];

		return Promise.all(tasks);
	}
}
