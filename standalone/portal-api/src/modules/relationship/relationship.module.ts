import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationshipEntity } from './models/relationship.entity';
import { PaymentExperienceEntity } from './models/payment.experience.relationship.entity';
import { SupplierRelationshipWithBuyerEntity } from './models/buyer.relationship.entity';
import { BuyerRelationshipWithSupplierEntity } from './models/supplier.relationship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RelationshipEntity,
      PaymentExperienceEntity,
      SupplierRelationshipWithBuyerEntity,
      BuyerRelationshipWithSupplierEntity,
    ]),
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class RelationshipModule {}
