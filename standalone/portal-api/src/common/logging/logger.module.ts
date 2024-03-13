import {Module} from "@nestjs/common";
import CoreLoggerService from "./CoreLoggerService";
import {LoggingInterceptor} from "./LoggingInterceptor";

@Module({
    providers: [CoreLoggerService, LoggingInterceptor],
    exports: [CoreLoggerService, LoggingInterceptor],
})
export class LoggerModule {}
