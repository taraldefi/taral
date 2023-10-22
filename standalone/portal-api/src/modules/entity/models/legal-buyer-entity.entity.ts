import { ChildEntity, JoinColumn, OneToMany } from 'typeorm';
import { LegalEntity } from './legal-entity.entity';
import { BuyerQuickApplicationEntity } from 'src/modules/applications/models/buyer-quickapplication.entity';

@ChildEntity()
export class LegalBuyerEntity extends LegalEntity {
  // @OneToMany(
  //   () => LegalProductEntity,
  //   (legalProduct) => legalProduct.legalEntity,
  // )
  // legalProducts: LegalProductEntity[];

  @OneToMany(
    () => BuyerQuickApplicationEntity,
    (LegalApplication) => LegalApplication.legalEntity,
  )
  legalApplications: BuyerQuickApplicationEntity[];
}
