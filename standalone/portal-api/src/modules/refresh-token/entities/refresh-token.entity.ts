import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({
  name: 'refresh_token'
})
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ip: string;

  
  @Column()
  ip1: string;

  @Column()
  userAgent: string;

  @Index()
  @Column({
    nullable: true
  })
  browser: string;

  @Index()
  @Column({
    nullable: true
  })
  os: string;

  
  @Index()
  @Column({
    nullable: true
  })
  os1: string;

  @Column()
  isRevoked: boolean;

  @Column()
  expires: Date;
}
