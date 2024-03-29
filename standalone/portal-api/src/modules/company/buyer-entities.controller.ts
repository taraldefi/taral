import { FormDataRequest, MemoryStoredFile } from '@modules/multipart';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateEntityDto } from './dto/request/create-entity.dto';
import { UpdateEntityDto } from './dto/request/update-entity.dto';
import { GetEntityDetailsResponse } from './dto/response/get-entity-details-response.dto';
import { BuyerCompanyEntityService } from './services/buyer-entity.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserEntity } from '../auth/entity/user.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('Entities')
@Controller({
  path: 'entities',
  version: '1',
})
export class BuyerEntityController {
  constructor(private readonly entityService: BuyerCompanyEntityService) {}

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
          format: 'string',
        },

        beneficialOwner: {
          type: 'string',
          format: 'string',
        },

        abbreviation: {
          type: 'string',
          format: 'string',
        },

        nationality: {
          type: 'string',
          format: 'string',
        },

        headquarters: {
          type: 'string',
          format: 'string',
        },

        industryType: {
          type: 'string',
          format: 'string',
        },

        coreBusiness: {
          type: 'string',
          format: 'string',
        },

        incorporationDate: {
          type: 'string',
          format: 'date',
        },

        legalForm: {
          type: 'string',
          format: 'string',
        },
      },
    },
  })
  @FormDataRequest({ storage: MemoryStoredFile })
  @Post()
  async createEntity(
    @GetUser() user: UserEntity,
    @Body() entity: CreateEntityDto,
  ): Promise<GetEntityDetailsResponse> {
    return await this.entityService.createBuyerEntity(user.id, entity);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          format: 'string',
        },

        beneficialOwner: {
          type: 'string',
          format: 'string',
        },

        abbreviation: {
          type: 'string',
          format: 'string',
        },

        nationality: {
          type: 'string',
          format: 'string',
        },

        headquarters: {
          type: 'string',
          format: 'string',
        },

        industryType: {
          type: 'string',
          format: 'string',
        },

        coreBusiness: {
          type: 'string',
          format: 'string',
        },

        incorporationDate: {
          type: 'string',
          format: 'date',
        },

        legalForm: {
          type: 'string',
          format: 'string',
        },

        logo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('/:id')
  @FormDataRequest({ storage: MemoryStoredFile })
  async updateEntity(
    @Param('id') id,
    @Body() entity: UpdateEntityDto,
  ): Promise<GetEntityDetailsResponse> {
    return await this.entityService.updateBuyerEntity(id, entity);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          format: 'string',
        },

        beneficialOwner: {
          type: 'string',
          format: 'string',
        },

        abbreviation: {
          type: 'string',
          format: 'string',
        },

        nationality: {
          type: 'string',
          format: 'string',
        },

        headquarters: {
          type: 'string',
          format: 'string',
        },

        industryType: {
          type: 'string',
          format: 'string',
        },

        coreBusiness: {
          type: 'string',
          format: 'string',
        },

        incorporationDate: {
          type: 'string',
          format: 'date',
        },

        legalForm: {
          type: 'string',
          format: 'string',
        },

        logo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/:id')
  @FormDataRequest({ storage: MemoryStoredFile })
  async updateEntityByForm(
    @Param('id') id,
    @Body() entity: UpdateEntityDto,
  ): Promise<GetEntityDetailsResponse> {
    return await this.entityService.updateBuyerEntity(id, entity);
  }

  @Delete('/:id')
  async deleteEntity(@Param('id') id) {
    await this.entityService.deleteBuyerEntity(id);
  }

  @Get('/:id')
  async getEntity(@Param('id') id) {
    return await this.entityService.getBuyerEntity(id);
  }

  @Get()
  async getAllEntity(
    @GetUser() user: UserEntity
  ) {
    return await this.entityService.getAllBuyerEntity(user.id);
  }
}
