import { Allow } from 'class-validator';
import { LegalBuyerEntity } from 'src/modules/entity/models/legal-buyer-entity.entity';
import { OrderDetailEntity } from 'src/modules/order-detail/models/order-detail.entity';
import { ChildEntity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { QuickApplicationEntity } from './quickapplication.entity';

@ChildEntity()
export class BuyerQuickApplicationEntity extends QuickApplicationEntity {
  @OneToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.application)
  @JoinColumn()
  @Allow()
  orderDetails: OrderDetailEntity;

  @ManyToOne(
    () => LegalBuyerEntity,
    (legalEntity) => legalEntity.legalApplications,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  legalEntity: LegalBuyerEntity;
}
