import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/common/config';
import { BootstrapModule } from 'src/modules/bootstrap/bootstrap.module';
import { CampaignsModule } from 'src/modules/campaigns/campaigns.module';
import { StatsModule } from 'src/modules/stats/stats.module';

@Module({
	imports: [
		ConfigModule.forRoot({ load: [config] }),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('database.uri'),
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}),
			inject: [ConfigService],
		}),
		BootstrapModule,
		CampaignsModule,
		StatsModule,
	],
})
export class AppModule {}
