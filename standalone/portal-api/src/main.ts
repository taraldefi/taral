import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'src/common/transaction/common';
import validationOptions from './utils/validation-options';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { UnprocessableExceptionFilter } from './common/filters/unprocessable-entity.filter';
import { EntityNotFoundFilter } from './common/filters/entity-not-found.filter';
import { CommonExceptionFilter } from './common/exception/exception-filter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { I18nService } from 'nestjs-i18n';
import { UnauthorizedExceptionFilter } from './common/filters/unauthorized.filter';
import { CustomHttpExceptionFilter } from './common/filters/custom-exception.filter';

async function bootstrap() {
  require('tsconfig-paths/register');

  initializeTransactionalContext(); // Initialize cls-hooked
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const logger = app.get(WINSTON_MODULE_PROVIDER);
  const i18n = app.get(I18nService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.useGlobalFilters(
    new CustomHttpExceptionFilter(logger),
    new UnauthorizedExceptionFilter(logger),
    new UnprocessableExceptionFilter(logger),
    new EntityNotFoundFilter(logger),
    new CommonExceptionFilter(logger, i18n)
  );

  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('Taral Marketplace API')
    .setDescription('Taral Marketplace API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // const document = SwaggerModule.createDocument(app, options);
  // if (process.env.NODE_ENV === 'development') {
  //   fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  // }

  // SwaggerModule.setup('docs', app, document);

  const port = configService.get('app.port');

  await app.listen(port);
  console.log(`Application listening in port: ${port}`);
}

void bootstrap();
