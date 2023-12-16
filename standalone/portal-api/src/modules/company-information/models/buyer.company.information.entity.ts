import { Allow } from 'class-validator';
import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { CompanyInformationEntity } from './company.information.entity';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { Injectable } from '@nestjs/common';

@ChildEntity('BuyerCompanyInformation')
export class BuyerCompanyInformationEntity extends CompanyInformationEntity {
  @OneToOne(
    () => BuyerCompanyEntity,
    (buyerCompany) => buyerCompany.companyInformation,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @Allow()
  buyer: BuyerCompanyEntity;
}
