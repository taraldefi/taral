import { Allow } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'products' })
export class LegalProduct extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Allow()
    title: string;

    @Column({ type: 'timestamptz' }) // Recommended
    @Allow()
    issuanceDate: Date;


    @Column({ type: 'timestamptz' }) // Recommended
    @Allow()
    maturityDate: Date;

    @Allow()
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    amount: number;
}