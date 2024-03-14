import CoreLoggerService from 'src/common/logging/CoreLoggerService';
import { BaseService } from 'src/common/services/base.service';
import {
  ModulesPayloadInterface,
  PermissionPayload,
  RoutePayloadInterface,
  SubModulePayloadInterface,
} from 'src/config/permission.config';

export class LoadPermissionMisc extends BaseService {

  constructor(public logger: CoreLoggerService) {
    super(logger);
  }

  assignResourceAndConcatPermission(
    modules: ModulesPayloadInterface | SubModulePayloadInterface,
    permissionsList: RoutePayloadInterface[],
    resource: string,
    isDefault?: false,
  ) {
    if (modules.permissions) {
      for (const permission of modules.permissions) {
        permissionsList = this.concatPermissions(
          permission,
          permissionsList,
          resource,
          isDefault,
        );
      }
    }
    return permissionsList;
  }

  concatPermissions(
    permission: PermissionPayload,
    permissionsList: RoutePayloadInterface[],
    resource: string,
    isDefault: boolean,
  ) {
    const description = permission.name;
    for (const data of permission.route) {
      data.resource = data.resource || resource;
      data.description = data.description || description;
      data.isDefault = isDefault;
    }
    return permissionsList.concat(permission.route);
  }
}
