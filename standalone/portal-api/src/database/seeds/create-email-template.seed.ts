import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import templates from 'src/config/email-template.config';
import { EmailTemplateEntity } from 'src/modules/email-template/entities/email-template.entity';

export default class CreateEmailTemplateSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(EmailTemplateEntity)
      .values(templates)
      .orIgnore()
      .execute();
  }
}
