import { Allow } from 'class-validator';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';
import { ChildEntity, OneToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';

@ChildEntity()
export class BuyerCompanyEntity extends CompanyEntity {
  @OneToOne(() => BuyerEntity, (buyer) => buyer.company, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Allow()
  buyer: BuyerEntity;
}
