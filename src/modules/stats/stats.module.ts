import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Stat } from 'src/common/models/stat';

@Module({
	imports: [TypegooseModule.forFeature([Stat])],
	controllers: [StatsController],
	providers: [StatsService],
})
export class StatsModule {}
