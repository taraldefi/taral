import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EntityService } from "./services/entity.service";

@ApiTags('Logos')
@Controller({
  path: 'logo',
  version: '1',
})
export class EntityLogoController {
  constructor(
    private readonly entityService: EntityService,
  ) {}

  
}