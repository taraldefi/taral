import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LegalBuyerEntity } from 'src/modules/entity/models/legal-buyer-entity.entity';
import { CreateQuickApplicationRequest } from '../../dto/request/create-quick-application.dto';
import { CreateBuyerQuickApplicationResponse } from '../../dto/response/create-buyer-application-response.dto';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';

@Injectable()
export class BuyerQuickApplicationService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
  ) {}

  public async findApplicationById(
    id: string,
  ): Promise<BuyerQuickApplicationEntity> {
    const application = await this.buyerApplicationRepository.findOneOrFail(
      id,
      {
        relations: [
          'buyerInformation',
          'supplierInformation',
          'paymentTerms',
          'orderDetails',
          'security',
          'transactionDocuments',
        ],
      },
    );

    return application;
  }

  public async create(
    data: CreateQuickApplicationRequest,
    entity: LegalBuyerEntity,
  ): Promise<CreateBuyerQuickApplicationResponse> {
    // await this.checkActiveApplicationExists();

    const application = new BuyerQuickApplicationEntity();

    application.title = data.title;
    application.issuanceDate = new Date();
    application.status = 'ACTIVE';
    application.createdAt = new Date();

    const savedApplication = await this.buyerApplicationRepository.save(
      application,
    );

    entity.legalApplications = [...entity.legalApplications, savedApplication];
    await entity.save();

    return savedApplication;
  }

  public async markAsComplete(id: string): Promise<void> {
    const application = await this.findApplicationById(id);
    // const isComplete = await this.checkIfApplicationIsComplete(application);
    // if (!isComplete)
    //   throw new HttpException('Invalid application', HttpStatus.BAD_REQUEST);

    application.status = 'COMPLETED';
    application.save();
  }

  public async getActiveApplicationId(
    entityId: string,
  ): Promise<BuyerQuickApplicationEntity> {
    const application = await this.buyerApplicationRepository.findOneOrFail({
      where: { status: 'ACTIVE', legalEntity: { id: entityId } },
    });

    return application;
  }

  private async checkIfApplicationIsComplete(
    application: BuyerQuickApplicationEntity,
  ): Promise<boolean> {
    if (
      application.buyerInformation &&
      application.supplierInformation &&
      application.paymentTerms &&
      application.orderDetails &&
      application.security
      //application.transactionDocuments
    ) {
      return true;
    }

    return false;
  }

  private async checkActiveApplicationExists(): Promise<void> {
    const activeApplication = await this.buyerApplicationRepository.findOne({
      where: { status: 'ACTIVE' },
    });
    console.log('activeApplication', activeApplication.id);
    if (activeApplication.id) {
      throw new HttpException(
        'ACTIVE application exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
