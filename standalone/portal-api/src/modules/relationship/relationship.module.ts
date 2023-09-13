import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaborationRelationshipEntity } from './models/collaboration.relationship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollaborationRelationshipEntity])],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class RelationshipModule {}
