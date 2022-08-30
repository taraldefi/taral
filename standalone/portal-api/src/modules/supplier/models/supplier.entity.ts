import { CompanyEntity } from 'src/modules/company/models/company.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Suppliers' })
export class SupplierEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

//   @OneToOne(() => CompanyEntity, (company) => company.supplier)
//   @JoinColumn()
//   company: CompanyEntity;
}
