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
import { SupplierCompanyEntityService } from './services/supplier-entity.service';
import { CreateSupplierEntityDto } from './dto/request/create-supplier-entity.dto';
import { GetSupplierEntityDetailsResponse } from './dto/response/get-supplier-entity-response.dto';
import { UpdateSupplierEntityDto } from './dto/request/update-supplier-entity.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('SupplierEntities')
@Controller({
  path: 'supplier-entities',
  version: '1',
})
export class SupplierEntityController {
  constructor(private readonly entityService: SupplierCompanyEntityService) {}

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
    @Body() entity: CreateSupplierEntityDto,
  ): Promise<GetSupplierEntityDetailsResponse> {
    return await this.entityService.createSupplierEntity(entity);
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
    @Body() entity: UpdateSupplierEntityDto,
  ): Promise<GetSupplierEntityDetailsResponse> {
    return await this.entityService.updateSupplierEntity(id, entity);
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
    @Body() entity: UpdateSupplierEntityDto,
  ): Promise<GetSupplierEntityDetailsResponse> {
    return await this.entityService.updateSupplierEntity(id, entity);
  }

  @Delete('/:id')
  async deleteEntity(@Param('id') id) {
    await this.entityService.deleteSupplierEntity(id);
  }

  @Get('/:id')
  async getEntity(@Param('id') id) {
    return await this.entityService.getSupplierEntity(id);
  }

  @Get()
  async getAllEntities() {
    return await this.entityService.getAllSupplierEntities();
  }
}
