import { Allow } from 'class-validator';
import { ContractEntity } from 'src/modules/contract/models/contract.entity';
import { ServiceEntity } from 'src/modules/service/models/service.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Transactions' })
export class TransactionEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ServiceEntity, (service) => service.transaction)
  @JoinColumn()
  @Allow()
  goodsAndServices: ServiceEntity;

  @OneToOne(() => ContractEntity, (contract) => contract.transaction)
  @JoinColumn()
  @Allow()
  contract: ContractEntity;
}
