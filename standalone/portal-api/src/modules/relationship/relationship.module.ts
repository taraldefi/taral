import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaborationRelationshipEntity } from './models/collaboration.relationship.entity';
import { CompaniesModule } from '../company/company.module';
import { EntityMappingService } from './services/mapping.service';
import { RelationshipService } from './services/relationship.service';
import { BuyerCompanyEntity } from '../company/models/buyer.company.entity';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forFeature([
      CollaborationRelationshipEntity,
      BuyerCompanyEntity,
    ]),
    LoggerModule
  ],
  controllers: [],
  providers: [
    ConfigModule,
    ConfigService,
    RelationshipService,
    EntityMappingService,
  ],
  exports: [
    RelationshipService,
    EntityMappingService,
    TypeOrmModule.forFeature([CollaborationRelationshipEntity]),
  ],
})
export class RelationshipModule {}
