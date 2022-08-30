import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyStatus } from '../enums/company.status.enum';
import { CompanyType } from '../enums/company.type.enum';

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
    default: CompanyType.UNKNOWN
  })
  @Allow()
  type: CompanyType

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    default: CompanyStatus.UNKNOWN
  })
  @Allow()
  status: CompanyStatus
}
