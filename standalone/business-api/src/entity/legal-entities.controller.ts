import { FormDataRequest, MemoryStoredFile } from "@modules/multipart";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreateEntityDto } from "./dto/request/create-entity.dto";
import { UpdateEntityDto } from "./dto/request/update-entity.dto";
import { GetEntityDetailsResponse } from "./dto/response/get-entity-details-response.dto";
import { EntityService } from "./services/entity.service";

@ApiTags('Entities')
@Controller({
  path: 'entities',
  version: '1',
})
export class EntityController {
  constructor(
    private readonly entityService: EntityService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },

        name: {
          type: 'string',
          format: 'string'
        },

        beneficialOwner: {
          type: 'string',
          format: 'string'
        },

        abbreviation: {
          type: 'string',
          format: 'string'
        },

        nationality: {
          type: 'string',
          format: 'string'
        },

        headquarters: {
          type: 'string',
          format: 'string'
        },

        industryType: {
          type: 'string',
          format: 'string'
        },

        coreBusiness: {
          type: 'string',
          format: 'string'
        },

        incorporationDate: {
          type: 'string',
          format: 'date'
        },

        legalForm: {
          type: 'string',
          format: 'string'
        },
      },
    },
  })
  @FormDataRequest({ storage: MemoryStoredFile })
  @Post()
  async createEntity( @Body() entity: CreateEntityDto ): Promise<GetEntityDetailsResponse> {
    return await this.entityService.createEntity(entity);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          format: 'string'
        },

        beneficialOwner: {
          type: 'string',
          format: 'string'
        },

        abbreviation: {
          type: 'string',
          format: 'string'
        },

        nationality: {
          type: 'string',
          format: 'string'
        },

        headquarters: {
          type: 'string',
          format: 'string'
        },

        industryType: {
          type: 'string',
          format: 'string'
        },

        coreBusiness: {
          type: 'string',
          format: 'string'
        },

        incorporationDate: {
          type: 'string',
          format: 'date'
        },

        legalForm: {
          type: 'string',
          format: 'string'
        },
      },
    },
  })

  @Patch('/:id')
  async updateEntity(@Param('id') id,  @Body() entity: UpdateEntityDto): Promise<GetEntityDetailsResponse> {
    return await this.entityService.updateEntity(id, entity);
  }

  @Delete('/:id')
  async deleteEntity(@Param('id') id) {
    await this.entityService.deleteEntity(id);
  }

  @Get('/:id')
  async getEntity(@Param('id') id) {
    return await this.entityService.getEntity(id);
  }
}