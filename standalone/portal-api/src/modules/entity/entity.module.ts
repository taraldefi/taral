import { MemoryStoredFile, NestjsFormDataModule } from '@modules/multipart';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityLogoController } from './entity-logo.controller';
import { EntityController } from './legal-entities.controller';
import {
  LegalBuyerEntity,
  LegalSupplierEntity,
} from './models/legal-entity.entity';
import { BuyerEntityService } from './services/entity.service';
import { LogoService } from './services/logo.service';
import { EntityMappingService } from './services/mapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LegalBuyerEntity, LegalSupplierEntity]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [EntityController, EntityLogoController],
  providers: [
    ConfigModule,
    ConfigService,
    BuyerEntityService,
    EntityMappingService,
    LogoService,
  ],
  exports: [BuyerEntityService],
})
export class EntitiesModule {}
