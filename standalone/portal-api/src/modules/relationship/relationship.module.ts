import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationshipEntity } from './models/relationship.entity';
import { PaymentExperienceEntity } from './models/payment.experience.relationship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelationshipEntity, PaymentExperienceEntity]),
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class RelationshipModule {}
