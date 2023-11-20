import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { ChildEntity, OneToOne } from 'typeorm';
import { RatingEntity } from './rating.entity';

@ChildEntity()
export class SupplierRatingEntity extends RatingEntity {
  @OneToOne(() => SupplierCompanyEntity, (supplier) => supplier.rating, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  supplier: SupplierCompanyEntity;
}
