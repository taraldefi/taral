import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyStatus } from '../enums/company.status.enum';
import { CompanyType } from '../enums/company.type.enum';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';

@Entity({ name: 'Sectors' })
export class SectorEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  industryType: string;

  @Column({
    type: 'enum',
    enum: CompanyType,
    default: CompanyType.UNKNOWN,
  })
  @Allow()
  type: CompanyType;

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    default: CompanyStatus.UNKNOWN,
  })
  @Allow()
  status: CompanyStatus;

  @OneToOne(() => BuyerCompanyEntity, (buyer) => buyer.sector, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Allow()
  buyer: BuyerCompanyEntity;
}
