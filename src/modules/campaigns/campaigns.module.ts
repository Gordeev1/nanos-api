import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign } from 'src/common/models/campaign';
import { Ad } from 'src/common/models/ad';

@Module({
	imports: [TypegooseModule.forFeature([Campaign, Ad])],
	controllers: [CampaignsController],
	providers: [CampaignsService],
})
export class CampaignsModule {}
