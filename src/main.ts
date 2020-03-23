import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { join } from 'path';
import { AppModule } from 'src/app.module';
import { BootstrapService } from 'src/modules/bootstrap/bootstrap.service';
import { ConfigService } from '@nestjs/config';
import initialData from 'src/data.js';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useStaticAssets(join(__dirname, '..', 'static'));
	app.use(helmet());

	const bootstrapService = app.get(BootstrapService);
	await bootstrapService.prepareData(initialData);

	const configService = app.get(ConfigService);
	await app.listen(configService.get<string>('server.port'));
}
bootstrap();
