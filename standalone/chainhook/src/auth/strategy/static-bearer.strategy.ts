import * as _ from 'lodash';
import { Request } from 'express';
import { Strategy as PassportStrategy } from 'passport-strategy';
import { PassportStrategy as WrappingStrategy} from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

class BadRequestError implements Error {
    name: string;
    message: string;

    constructor(message: string) {
        this.name = 'BadRequestError';
        this.message = message;
    }
}

class InnerStaticBearerStrategy extends PassportStrategy {

    staticAuthorizationHeader: { header: string } = { header: 'Authorization' };
    name: string;
    verify: (apiKey: string, verified: (error: UnauthorizedException, success: boolean) => void) => void;
    passReqToCallback: boolean;

    constructor(verify: (apiKey: string, verified: (error: UnauthorizedException, success: boolean) => void) => void) {
        super();
        this.staticAuthorizationHeader.header = this.staticAuthorizationHeader.header.toLowerCase();

        this.name = 'static-bearer';
        this.verify = verify;
    }

    authenticate(req: Request, options?: Object): void {
        console.log('GOT A HIT');
        let apiKey: string = _.get(req.headers, this.staticAuthorizationHeader.header) as string;

        console.log(JSON.stringify(req.headers));
        if (!apiKey) {
            return this.fail(new BadRequestError('Missing static bearer key'), null);
        }

        let verified = (error: UnauthorizedException, success: boolean) => {
            if (error) {
                return this.error(error);
            }
            if (!success) {
                return this.fail({}, null);
            }
            this.success(true, {});
        };

        this.verify(apiKey, verified);
    }
}


@Injectable()
export class StaticBearerStrategy extends WrappingStrategy(InnerStaticBearerStrategy, 'static-bearer') {
  constructor(private configService: ConfigService) {
    super(async (apiKey: string, done: (arg0: UnauthorizedException, arg1: boolean) => void) => {
      if (this.validate(apiKey)) {
        done(null, true);
      }
      done(new UnauthorizedException(), null);
    });
  }

    validate(apiKey: string): boolean {
        const apiKeys: string[] = this.configService.get<string>('API_KEY')?.split(',') || ['demo-apikey'];
        return !!apiKeys.find((key) => apiKey == key || apiKey == `Bearer ${key}`);
    }
}