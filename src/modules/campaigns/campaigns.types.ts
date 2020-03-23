import { Campaign } from 'src/common/models/campaign';
import { Ad } from 'src/common/models/ad';
import { Platforms } from 'src/common/types/platforms';
import { Audience } from 'src/common/models/audience';
import { Creative } from 'src/common/models/creative';
import { Stat } from 'src/common/models/stat';

export type CampaignPlatformItem = Omit<
	Ad,
	'target_audiance' | 'creatives' | 'insights' | '_id' | 'createdAt' | 'updatedAt'
> & {
	target_audiance: Audience;
	creatives: Creative;
	insights: Stat;
};

type CampaignPlatforms = Record<Platforms, CampaignPlatformItem>;

export type IGetCampaignResponseItem = Pick<Campaign, '_id' | 'name' | 'goal' | 'status'> &
	Pick<Ad, 'total_budget'> & {
		platforms: CampaignPlatforms;
		platforms_names: Platforms[];
	};

export type IGetCampaignResponseListItem = Omit<IGetCampaignResponseItem, 'platforms'>;
