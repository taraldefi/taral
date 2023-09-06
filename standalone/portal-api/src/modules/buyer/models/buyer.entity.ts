import { Allow } from 'class-validator';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { RelationshipEntity } from 'src/modules/relationship/models/relationship.entity';
import { SectorEntity } from 'src/modules/sectors/models/sector.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Buyers' })
export class BuyerEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => BuyerCompanyEntity, (company) => company.buyer)
  @JoinColumn()
  @Allow()
  company: SupplierCompanyEntity;

  @OneToOne(() => SectorEntity, (sector) => sector.buyer)
  @JoinColumn()
  @Allow()
  sector: SectorEntity;

  @OneToOne(() => RelationshipEntity)
  @JoinColumn()
  @Allow()
  relationshipWithSupplier: RelationshipEntity;
}
