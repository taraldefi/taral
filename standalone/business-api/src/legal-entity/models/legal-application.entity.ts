import { Allow } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LegalEntity } from "./legal-entity.entity";


@Entity({ name: 'applications' })
export class LegalApplicationEntity extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Allow()
    title: string;

    @Column({ type: 'timestamptz' }) // Recommended
    @Allow()
    issuanceDate: Date;
        
    @ManyToOne(() => LegalEntity, {
        eager: true,
    })
    legalEntity: LegalEntity;
}