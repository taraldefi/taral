import { ChildEntity, JoinColumn, OneToMany } from 'typeorm';
import { LegalEntity } from './legal-entity.entity';
import { SupplierQuickApplicationEntity } from 'src/modules/applications/models/supplier-quickapplication.entity';

@ChildEntity()
export class LegalSupplierEntity extends LegalEntity {
  // @OneToMany(
  //   () => LegalProductEntity,
  //   (legalProduct) => legalProduct.legalEntity,
  // )
  // legalProducts: LegalProductEntity[];

  @OneToMany(
    () => SupplierQuickApplicationEntity,
    (LegalApplication) => LegalApplication.legalEntity,
  )
  @JoinColumn()
  legalApplications: SupplierQuickApplicationEntity[];
}
