import { Allow } from 'class-validator';
import { TransactionEntity } from 'src/modules/transaction/models/transaction.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Services' })
export class ServiceEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bool' })
  @Allow()
  capitalGoods: string;

  @Column()
  @Allow()
  service: string;

  @Column()
  @Allow()
  serviceDescription: string;

  @OneToOne(
    () => TransactionEntity,
    (transaction) => transaction.goodsAndServices,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  transaction: TransactionEntity;
}
