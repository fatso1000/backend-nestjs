import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get("PORT")
  const cors_url = configService.get("CORS_URL")
  app.use(helmet());
  app.enableCors({ origin: cors_url, optionsSuccessStatus: 200 });

  await app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}
bootstrap();
