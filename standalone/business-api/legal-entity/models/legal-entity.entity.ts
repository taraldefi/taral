import { Allow } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'legal-entity' })
export class LegalEntity extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Allow()
    name: string;

    @Column()
    @Allow()
    beneficialOwner: string;

    @Column()
    @Allow()
    abbreviation: string;

    @Column()
    @Allow()
    nationality: string;

    @Column()
    @Allow()
    headquaters: string;

    @Column()
    @Allow()
    industryType: string;

    @Column()
    @Allow()
    coreBusiness: string;

    @Column({ type: 'timestamptz' }) // Recommended
    @Allow()
    incorporationDate: Date;

    @Column()
    @Allow()
    legalForm: string;
}