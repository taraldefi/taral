/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import CoreLoggerService from "./CoreLoggerService";
import { Reflector } from "@nestjs/core";
import { PARSE_REQUEST_BODY_WHEN_LOGGING_KEY } from "./parseRequestBodyWhenLogging";
import { plainToInstance } from "class-transformer";
import { tap } from "rxjs";

const SHOULD_LOG_RESPONSE: boolean = false;

export type Constructor<T, Arguments extends unknown[] = any[]> = new (...arguments_: Arguments) => T;

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CoreLoggerService, private readonly reflector: Reflector) { }

  private parseRequestBody(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const body: unknown = request.body;
    if (!body) {
      return;
    }

    if (body === null || typeof body !== 'object') {
      return body;
    }
    const requestBodyDto = this.reflector.getAllAndOverride<
      Constructor<unknown>
    >(PARSE_REQUEST_BODY_WHEN_LOGGING_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requestBodyDto) {
      return JSON.stringify(body);
    }
    const instance = plainToInstance(requestBodyDto, body);
    return JSON.stringify(instance, null, 2);
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const response = context.switchToHttp().getResponse();

    const { originalUrl, method, params, query } = request;
    const message = `${method} ${originalUrl} 
        Request params: ${JSON.stringify(params, null, 2)}
        Request query: ${JSON.stringify(query, null, 2)}
        Request body: ${this.parseRequestBody(context)}`;
        
    this.logger.log(message);

    if (!SHOULD_LOG_RESPONSE) {
      return next.handle();
    } else {
      return next.handle().pipe(
        tap((data) => {
          const message = `type: RESPONSE, ${method} ${originalUrl} Response body: ${JSON.stringify(data, null, 2)}`;

          if (response?.status >= 500) {
            this.logger.error(message);
          }

          if (response?.status >= 400) {
            this.logger.warn(message);
          }

          this.logger.log(message);
        })
      );
    }
  }
}
