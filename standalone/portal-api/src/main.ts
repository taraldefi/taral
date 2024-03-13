import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'src/common/transaction/common';
import validationOptions from './utils/validation-options';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { UnprocessableExceptionFilter } from './common/filters/unprocessable-entity.filter';
import { EntityNotFoundFilter } from './common/filters/entity-not-found.filter';
import { CommonExceptionFilter } from './common/exception/exception-filter';
import { I18nService } from 'nestjs-i18n';
import { UnauthorizedExceptionFilter } from './common/filters/unauthorized.filter';
import { Configuration } from './configuration';
import helmet from 'helmet';
import CoreLoggerService from './common/logging/CoreLoggerService';
import { LoggingInterceptor } from './common/logging/LoggingInterceptor';

async function bootstrap() {
  require('tsconfig-paths/register');

  initializeTransactionalContext(); // Initialize cls-hooked
  const app = await NestFactory.create(AppModule, { cors: true });
  // const configService = app.get(ConfigService);
  const i18n = app.get(I18nService);

  const loggerService = app.get(CoreLoggerService);

  app.use(helmet())
  app.enableShutdownHooks();
  
  app.setGlobalPrefix(Configuration.app.apiPrefix, {
    exclude: ['/'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(loggerService)
  );

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.useGlobalFilters(
    new CommonExceptionFilter(loggerService, i18n),
    new UnauthorizedExceptionFilter(loggerService),
    new UnprocessableExceptionFilter(loggerService),
    new EntityNotFoundFilter(loggerService),
  );

  app.use(cookieParser());

  // const options = new DocumentBuilder()
  //   .setTitle('Taral Marketplace API')
  //   .setDescription('Taral Marketplace API docs')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // if (process.env.NODE_ENV === 'development') {
  //   fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  // }

  // SwaggerModule.setup('docs', app, document);

  await app.listen(Configuration.app.port);
  loggerService.log(`Application listening in port: ${Configuration.app.port}, started at ${new Date().toISOString()}`);
}

void bootstrap();
