import { Injectable, Scope } from '@nestjs/common';
import { SignatureVerificationModel } from '../../models/signature-verification.model';
import { triggerError } from '../../utils/trigger.errror';
import { SignatureService } from './signature.service';

@Injectable({
  scope: Scope.DEFAULT,
})
export class AuthenticationService {
  constructor(private signatureService: SignatureService) {}

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
