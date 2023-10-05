import { Allow } from 'class-validator';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { SectorEntity } from 'src/modules/sectors/models/sector.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Buyers' })
export class BuyerEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => BuyerCompanyEntity, (company) => company.buyer)
  @JoinColumn()
  @Allow()
  company: BuyerCompanyEntity;

  @OneToOne(() => SectorEntity, (sector) => sector.buyer)
  @JoinColumn()
  @Allow()
  sector: SectorEntity;

  @OneToMany(
    () => CollaborationRelationshipEntity,
    (collaborationRelationship) => collaborationRelationship.buyer,
  )
  @Allow()
  relationshipWithSuppliers: CollaborationRelationshipEntity[];
}
