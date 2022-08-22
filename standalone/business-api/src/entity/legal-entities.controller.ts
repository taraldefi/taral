import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
}