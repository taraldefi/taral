import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryStoredFile, NestjsFormDataModule } from '@modules/multipart';
import { EntityController } from './legal-entities.controller';
import { LegalEntity } from './models/legal-entity.entity';
import { LegalProductEntity } from './models/legal-product.entity';
import { LegalApplicationEntity } from './models/legal-application.entity';
import { EntityService } from './services/entity.service';
import { EntityMappingService } from './services/mapping.service';
import { EntityLogoController } from './entity-logo.controller';
import { LogoService } from './services/logo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LegalEntity,
      LegalProductEntity,
      LegalApplicationEntity,
    ]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [EntityController, EntityLogoController],
  providers: [
    ConfigModule,
    ConfigService,
    EntityService,
    EntityMappingService,
    LogoService,
  ],
})
export class EntitiesModule {}
