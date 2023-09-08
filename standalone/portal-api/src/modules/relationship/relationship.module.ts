import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaborationRelationshipEntity } from './models/collaboration.relationship.entity';
import { PaymentExperienceEntity } from './models/payment.experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CollaborationRelationshipEntity,
      PaymentExperienceEntity,
    ]),
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class RelationshipModule {}
