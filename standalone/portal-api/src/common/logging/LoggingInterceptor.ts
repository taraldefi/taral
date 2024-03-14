/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import {tap} from "rxjs";
import CoreLoggerService from "./CoreLoggerService";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: CoreLoggerService) {}
    intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();

        const response = context.switchToHttp().getResponse();

        const {originalUrl, method, params, query, body} = request;

        // this.logger.log(`Request ${originalUrl}`, {
        //     type: "REQUEST",
        //     originalUrl,
        //     method,
        //     params,
        //     query,
        //     `${JSON.stringify(
        //         body,
        //       )}`,
        // });

        const message = `${method} ${originalUrl} 
        Request params: ${JSON.stringify(params, null, 2)}
        Request query: ${JSON.stringify(query, null, 2)}
        Request body: ${JSON.stringify(body, null, 2)}`;

        this.logger.log(message);

        return next.handle().pipe(
            tap((data) =>
                this.logger.log(`Response ${originalUrl}`, {
                    type: "RESPONSE",
                    originalUrl,
                    method,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    status: response?.status,
                    responseBody: data || undefined,
                })
            )
        );
    }
}
