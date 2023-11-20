// import { ApiTags } from '@nestjs/swagger';
// import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
// import { SupplierService } from './services/supplier.service';
// import { CreateSupplierRequest } from './dto/request/create-supplier.dto';
// import { GetSupplierResponse } from './dto/response/get-supplier-response.dto';
// import { UpdateSupplierRequest } from './dto/request/update-supplier.dto';
// import { SupplierEntity } from './models/supplier.entity';

// @ApiTags('Suppliers')
// @Controller({
//   path: 'suppliers',
//   version: '1',
// })
// export class SuppliersEntityController {
//   constructor(private readonly supplierService: SupplierService) {}

//   @Post()
//   async createEntity(
//     @Body() entity: CreateSupplierRequest,
//   ): Promise<SupplierEntity> {
//     console.log(JSON.stringify(entity, null, 2));
//     return await this.supplierService.createEntity(entity);
//   }

//   // @Put('/:id')
//   // async updateEntity(
//   //   @Param('id') id: string,
//   //   @Body() entity: UpdateSupplierRequest,
//   // ): Promise<GetSupplierResponse> {
//   //   return await this.supplierService.updateEntity(id, entity);
//   // }

//   // @Patch('/:id')
//   // async patchEntity(
//   //   @Param('id') id: string,
//   //   @Body() entity: UpdateSupplierRequest,
//   // ): Promise<GetSupplierResponse> {
//   //   return await this.supplierService.updateEntity(id, entity);
//   // }

//   // @Get('/:id')
//   // async getEntity(@Param('id') id: string): Promise<GetSupplierResponse> {
//   //   return await this.supplierService.getEntity(id);
//   // }

//   @Get()
//   async getAll(): Promise<GetSupplierResponse[]> {
//     return await this.supplierService.getAll();
//   }
// }
