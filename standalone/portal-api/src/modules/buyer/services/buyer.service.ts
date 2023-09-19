import { Injectable } from "@nestjs/common";
import { BuyerEntityRepository } from "../repositories/buyer.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { BuyerEntity } from "../models/buyer.entity";
import { triggerError } from "src/modules/entity/utils/trigger.error";
import { GetBuyerResponse } from "../dto/get-buyer-response.dto";
import { EntityMappingService } from "./mapping.service";

@Injectable()
export class BuyerService {
 constructor(
    @InjectRepository(BuyerEntity)
    private buyerEntityRepository: BuyerEntityRepository,

    private mappingService: EntityMappingService,
 ) {

 }

 public async deleteBuyer(id: string): Promise<void> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOneOrFail({
      relations: ['relationshipWithSuppliers'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    await this.buyerEntityRepository.delete({ id: id });
  }

  public async getBuyer(id: string): Promise<GetBuyerResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOne({
      relations: ['relationshipWithSuppliers'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    return this.mappingService.mapEntityDetails(entity);
  }
}