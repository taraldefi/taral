import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailTemplateService } from 'src/modules/email-template/email-template.service';
import { EmailTemplateController } from 'src/modules/email-template/email-template.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { EmailTemplateEntity } from './entities/email-template.entity';
import { EmailTemplateEntityRepositoryProvider } from './email-template.repository.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailTemplateEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [EmailTemplateService],
  controllers: [EmailTemplateController],
  providers: [
    EmailTemplateService,
    UniqueValidatorPipe,
    EmailTemplateEntityRepositoryProvider,
  ],
})
export class EmailTemplateModule {}
