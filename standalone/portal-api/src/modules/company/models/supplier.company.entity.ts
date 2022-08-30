import { Allow } from "class-validator";
import { SupplierEntity } from "src/modules/supplier/models/supplier.entity";
import { ChildEntity, OneToOne } from "typeorm";
import { CompanyEntity } from "./company.entity";

@ChildEntity()
export class SupplierCompanyEntity extends CompanyEntity {
    @OneToOne(() => SupplierEntity, (supplier) => supplier.company, {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @Allow()
    supplier: SupplierEntity;
}