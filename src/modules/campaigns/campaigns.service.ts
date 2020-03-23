import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { Campaign } from 'src/common/models/campaign';
import { Ad } from 'src/common/models/ad';
import { GetCampaignsQueryDto } from './campaigns.dto';
import { IGetCampaignResponseListItem, IGetCampaignResponseItem } from './campaigns.types';

@Injectable()
export class CampaignsService {
	constructor(
		@InjectModel(Campaign) private readonly campaignModel: ReturnModelType<typeof Campaign>,
		@InjectModel(Ad) private readonly adModel: ReturnModelType<typeof Ad>,
	) {}

	private computeMetaFromAds(
		ads,
	): Pick<IGetCampaignResponseListItem, 'total_budget' | 'platforms_names'> {
		const {
			platforms_names,
			total_budget,
		}: Pick<IGetCampaignResponseListItem, 'platforms_names' | 'total_budget'> = ads.reduce(
			(result, item) => {
				result.total_budget += item.total_budget;
				result.platforms_names.push(item.platform_name);
				return result;
			},
			{ platforms_names: [], total_budget: 0 },
		);
		return {
			platforms_names,
			total_budget,
		};
	}

	async getCampaigns({
		status,
		limit = '10',
		skip = '0',
	}: GetCampaignsQueryDto): Promise<IGetCampaignResponseListItem[]> {
		const campaigns = await this.campaignModel
			.find(status ? { status } : {}, '-updatedAt', {
				skip: parseInt(skip),
				limit: parseInt(limit),
				sort: '-createdAt',
			})
			.populate({
				path: 'ads',
				select: 'platform_name total_budget',
				options: { lean: true },
			})
			.lean()
			.exec();

		return campaigns.map(({ ads, createdAt, ...campaign }) => ({
			...campaign,
			...this.computeMetaFromAds(ads),
		}));
	}

	private transformAdsToPlatforms(ads) {
		return Object.assign({}, ...ads.map(ad => ({ [ad.platform_name]: ad })));
	}

	async getCampaignById(id: Types.ObjectId): Promise<IGetCampaignResponseItem | null> {
		const omitTimestamps = '-createdAt -updatedAt';
		const omitTimestampsAndId = `-_id ${omitTimestamps}`;
		const commonOptions = { lean: true, select: omitTimestampsAndId };

		const campaign = await this.campaignModel
			.findById(id, omitTimestamps)
			.populate({
				path: 'ads',
				select: omitTimestampsAndId,
				options: {
					populate: [
						{ path: 'target_audiance', ...commonOptions },
						{ path: 'creatives', ...commonOptions },
						{ path: 'insights', ...commonOptions },
					],
					lean: true,
				},
			})
			.lean()
			.exec();

		if (!campaign) {
			return null;
		}

		const { ads, ...others } = campaign;

		return {
			...this.computeMetaFromAds(ads),
			platforms: this.transformAdsToPlatforms(ads),
			...others,
		};
	}
}
