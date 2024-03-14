import { Injectable, Scope } from '@nestjs/common';
import { SignatureVerificationModel } from '../../models/signature-verification.model';
import { triggerError } from '../../utils/trigger.errror';
import { SignatureService } from './signature.service';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable({
  scope: Scope.DEFAULT,
})
export class AuthenticationService extends BaseService {
  constructor(private signatureService: SignatureService, public logger: CoreLoggerService) {
    super(logger);
  }

  public guard(
    signature: string,
    signedMessage: string,
  ): SignatureVerificationModel {
    const signatureResult = this.signatureService.verifySignature(
      signature,
      signedMessage,
    );

    if (!signatureResult.isValid) {
      throw triggerError('incorrect-signature');
    }

    return signatureResult;
  }
}
