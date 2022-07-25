import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { SignatureVerificationModel } from 'src/files/models/signature-verification.model';
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
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            signature: 'incorrect-signature',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return signatureResult;
  }
}
