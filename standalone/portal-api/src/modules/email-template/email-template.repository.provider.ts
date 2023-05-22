import { getRepositoryToken } from "@nestjs/typeorm";
import { EmailTemplateEntity } from "./entities/email-template.entity";
import { Connection } from "typeorm";
import { EmailTemplateEntityRepository } from "./email-template.repository";

export const EmailTemplateEntityRepositoryToken = getRepositoryToken(EmailTemplateEntity);

export const RefreshTokenEntityRepositoryProvider = {
    provide: EmailTemplateEntityRepositoryToken,
    useFactory: (connection: Connection) => connection.getCustomRepository(EmailTemplateEntityRepository),
    inject: [Connection]
};