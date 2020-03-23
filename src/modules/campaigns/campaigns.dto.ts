import { IsEnum, IsOptional, IsMongoId, IsNumberString } from 'class-validator';
import { CampaignStatus } from 'src/common/types/campaign';
import { Types } from 'mongoose';

export class GetCampaignsQueryDto {
	@IsOptional()
	@IsEnum(CampaignStatus)
	status?: CampaignStatus;

	@IsOptional()
	@IsNumberString()
	limit?: string;

	@IsOptional()
	@IsNumberString()
	skip?: string;
}

export class GetCampaignParamsDto {
	@IsMongoId()
	id: Types.ObjectId;
}
