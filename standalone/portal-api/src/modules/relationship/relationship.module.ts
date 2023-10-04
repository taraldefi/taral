import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaborationRelationshipEntity } from './models/collaboration.relationship.entity';
import { BuyersModule } from '../buyer/buyers.module';
import { SuppliersModule } from '../supplier/suppliers.module';
import { CompaniesModule } from '../company/company.module';
import { EntityMappingService } from './services/mapping.service';

@Module({
  imports: [
    CompaniesModule,
    BuyersModule,
    SuppliersModule,
    TypeOrmModule.forFeature([CollaborationRelationshipEntity])
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService, EntityMappingService],
})
export class RelationshipModule {}
