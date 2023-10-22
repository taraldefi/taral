import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { RelationshipService } from './services/relationship.service';
import { CreateRelationshipRequest } from './dto/request/create-relationship.dto';
import { GetRelationshipResponse } from './dto/response/get-relationship-response.dto';
import { UpdateRelationshipRequest } from './dto/request/update-relationship.dto';
import { CollaborationRelationshipEntity } from './models/collaboration.relationship.entity';

@ApiTags('Relationships')
@Controller({
  path: 'relationships',
  version: '1',
})
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post('/:buyerId/:supplierId')
  async createEntity(
    @Param('buyerId') buyerId: string,
    @Param('supplierId') supplierId: string,
    @Body() entity: CreateRelationshipRequest,
  ): Promise<CollaborationRelationshipEntity> {
    return await this.relationshipService.createEntity(
      entity,
      buyerId,
      supplierId,
    );
  }

  @Put('/:id/:buyerId/:supplierId')
  async updateEntity(
    @Param('id') id: string,
    @Param('buyerId') buyerId: string,
    @Param('supplierId') supplierId: string,
    @Body() entity: UpdateRelationshipRequest,
  ): Promise<GetRelationshipResponse> {
    return await this.relationshipService.updateEntity(
      entity,
      id,
      buyerId,
      supplierId,
    );
  }

  @Patch('/:id/:buyerId/:supplierId')
  async patchEntity(
    @Param('id') id: string,
    @Param('buyerId') buyerId: string,
    @Param('supplierId') supplierId: string,
    @Body() entity: UpdateRelationshipRequest,
  ): Promise<GetRelationshipResponse> {
    return await this.relationshipService.updateEntity(
      entity,
      id,
      buyerId,
      supplierId,
    );
  }

  // @Get('/:id')
  // async getEntity(@Param('id') id: string): Promise<GetRelationshipResponse> {
  //   return await this.relationshipService.getEntity(id);
  // }

  @Get()
  async getAll(): Promise<GetRelationshipResponse[]> {
    return await this.relationshipService.getAll();
  }
}
