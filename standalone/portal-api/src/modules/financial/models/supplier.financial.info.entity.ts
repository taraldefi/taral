import { Allow } from "class-validator";
import { SupplierEntity } from "src/modules/supplier/models/supplier.entity";
import { ChildEntity, OneToOne } from "typeorm";
import { FinancialInformationEntity } from "./financial.info.entity";

@ChildEntity()
export class SupplierFinancialInformationEntity extends FinancialInformationEntity {
  @OneToOne(() => SupplierEntity, (supplier) => supplier.financials, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @Allow()
  supplier: SupplierEntity; 
}