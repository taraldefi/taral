import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from '@modules/transaction';
import validationOptions from './utils/validation-options';
import config from 'config';
import fs from 'fs';

async function bootstrap() {
  require('tsconfig-paths/register');

  initializeTransactionalContext(); // Initialize cls-hooked
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const options = new DocumentBuilder()
    .setTitle('Taral API')
    .setDescription('Taral API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;

  const document = SwaggerModule.createDocument(app, options);
  if (process.env.NODE_ENV === 'development')
  {
    fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  }

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`Application listening in port: ${port}`);
}

void bootstrap();
