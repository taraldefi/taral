import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaborationRelationshipEntity } from './models/collaboration.relationship.entity';
import { BuyersModule } from '../buyer/buyers.module';
import { SuppliersModule } from '../supplier/suppliers.module';
import { CompaniesModule } from '../company/company.module';
import { EntityMappingService } from './services/mapping.service';
import { RelationshipService } from './services/relationship.service';
import { RelationshipController } from './relationship.controller';

@Module({
  imports: [
    CompaniesModule,
    BuyersModule,
    SuppliersModule,
    TypeOrmModule.forFeature([CollaborationRelationshipEntity]),
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
    TypeOrmModule.forFeature([CollaborationRelationshipEntity]),
  ],
})
export class RelationshipModule {}
