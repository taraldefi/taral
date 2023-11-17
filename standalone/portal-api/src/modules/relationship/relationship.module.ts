import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaborationRelationshipEntity } from './models/collaboration.relationship.entity';
import { CompaniesModule } from '../company/company.module';
import { EntityMappingService } from './services/mapping.service';
import { RelationshipService } from './services/relationship.service';
import { RelationshipController } from './relationship.controller';
import { BuyerCompanyEntity } from '../company/models/buyer.company.entity';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forFeature([
      CollaborationRelationshipEntity,
      BuyerCompanyEntity,
    ]),
  ],
  controllers: [RelationshipController],
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
