import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedConstants } from './shared/shared-constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SharedConstants.portNumber);
}
bootstrap();
