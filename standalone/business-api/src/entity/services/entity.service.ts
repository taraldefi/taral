import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEntityDto } from "../dto/request/create-entity.dto";
import { LegalApplicationEntity } from "../models/legal-application.entity";
import { LegalEntity } from "../models/legal-entity.entity";
import { LegalProductEntity } from "../models/legal-product.entity";
import { LegalApplicationRepository } from "../repositories/legal-application.repository";
import { LegalEntityRepository } from "../repositories/legal-entity.repository";
import { LegalProductRepository } from "../repositories/legal-product.repository";
import { Storage } from '@modules/storage';
import { v4 as uuidv4 } from 'uuid';
import { runOnTransactionComplete, runOnTransactionRollback, Transactional } from "@modules/transaction";
import { GetEntityDetailsResponse } from "../dto/response/get-entity-details-response.dto";

@Injectable()
export class EntityService {

    constructor(
        @InjectRepository(LegalEntity)
        private entityRepository: LegalEntityRepository,

        @InjectRepository(LegalProductEntity)
        private entityProductRepository: LegalProductRepository,

        @InjectRepository(LegalApplicationEntity)
        private entityApplicationRepository: LegalApplicationRepository,
    ) {

    }

    @Transactional()
    public async createEntity(data: CreateEntityDto): Promise<GetEntityDetailsResponse> {
        runOnTransactionRollback((cb) =>
            console.log('Rollback error ' + cb.message),
        );

        runOnTransactionComplete((cb) => console.log('Transaction Complete'));

        const storage = Storage.disk('files');
        const onDiskFilename = `${uuidv4()}.png`;

        const storageResponse = await storage.put(
            onDiskFilename,
            data.logo.buffer
        );

        const entityProducts = await this.createProducts();
        const entityApplications = await this.createApplications();

        const entity = new LegalEntity();
        entity.abbreviation = data.abbreviation;
        entity.name = data.name;
        entity.beneficialOwner = data.beneficialOwner;
        entity.coreBusiness = data.coreBusiness;
        entity.headquaters = data.headquaters;
        entity.incorporationDate = data.incorporationDate;
        entity.industryType = data.industryType;
        entity.legalForm = data.legalForm;
        entity.nationality = data.nationality;
        entity.logo = storageResponse.path;
        
        entityProducts.forEach(product => product.legalEntity = entity);
        entityApplications.forEach(application => application.legalEntity = entity);

        entity.legalProducts = [...entityProducts];
        entity.legalApplications = [...entityApplications];

        var result = await this.entityRepository.save(entity);

        // return {
        //     abbreviation: result.abbreviation,
        //     applications: result.legalApplications.(app => {
        //         id: app.id,
        //         title: app.title,
        //         issuanceDate: app.issuanceDate
        //     })
        // };

        return null;
    }

    private async createApplications(): Promise<LegalApplicationEntity[]> {
        const result: LegalApplicationEntity[] = [];

        for (let i = 0; i < 10; i++) {
            const application = new LegalApplicationEntity();

            application.title = `Legal Product #${i}`;
            application.issuanceDate = new Date(2022, 1, 1, 16, 30);

            await this.entityApplicationRepository.save(application);

            result.push(application);
        }

        return result;
    }

    private async createProducts(): Promise<LegalProductEntity[]> {
        const result: LegalProductEntity[] = [];

        for (let i = 0; i < 10; i++) {
            const product = new LegalProductEntity();

            product.title = `Legal Product #${i}`;
            product.issuanceDate = new Date(2022, 1, 1, 16, 30);
            product.maturityDate = new Date(2022, 1, 1, 16, 30);
            product.amount = 650000

            await this.entityProductRepository.save(product);

            result.push(product);
        }

        return result;
    }
}