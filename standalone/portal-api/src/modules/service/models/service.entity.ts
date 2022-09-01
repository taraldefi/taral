import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Services' })
export class ServiceEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'bool'})
  @Allow()
  capitalGoods: string;

  @Column()
  @Allow()
  service: string;

  @Column()
  @Allow()
  serviceDescription: string;
}
