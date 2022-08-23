import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Forgot } from './entities/forgot.entity';

@Injectable()
export class ForgotService {
  constructor(
    @InjectRepository(Forgot)
    private forgotRepository: Repository<Forgot>,
  ) {}

  async findOne(options: FindOptionsWhere<Forgot>) {
    return this.forgotRepository.findOne({
      where: options,
    });
  }

  async findMany(options: FindOptionsWhere<Forgot>) {
    return this.forgotRepository.find({
      where: options,
    });
  }

  async create(data: DeepPartial<Forgot>) {
    return this.forgotRepository.save(this.forgotRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.forgotRepository.softDelete(id);
  }
}
