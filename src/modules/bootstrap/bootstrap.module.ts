import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BootstrapService } from './bootstrap.service';
import { Campaign } from 'src/common/models/campaign';
import { Ad } from 'src/common/models/ad';
import { Audience } from 'src/common/models/audience';
import { Creative } from 'src/common/models/creative';
import { Stat } from 'src/common/models/stat';

@Module({
	imports: [TypegooseModule.forFeature([Campaign, Ad, Audience, Creative, Stat])],
	providers: [BootstrapService],
})
export class BootstrapModule {}
