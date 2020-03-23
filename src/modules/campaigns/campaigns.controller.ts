import { Controller, Param, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CampaignsService } from './campaigns.service';
import { GetCampaignsQueryDto, GetCampaignParamsDto } from './campaigns.dto';

@Controller('campaigns')
export class CampaignsController {
	constructor(private campaignsService: CampaignsService) {}

	@Get()
	async getCampaigns(@Query() query: GetCampaignsQueryDto) {
		const campaigns = await this.campaignsService.getCampaigns(query);
		return campaigns;
	}

	@Get('/:id')
	async getCampaign(@Param() params: GetCampaignParamsDto, @Res() response: Response) {
		const campaign = await this.campaignsService.getCampaignById(params.id);

		if (!campaign) {
			return response.status(HttpStatus.NOT_FOUND).send();
		}

		return response.status(HttpStatus.OK).json(campaign);
	}
}
