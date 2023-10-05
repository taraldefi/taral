import TransportStream from "winston-transport";
import { FluentdTransportOptions } from './fluentd.transport.options';
import * as fluent from 'fluent-logger';
import { FluentLogData } from "./fluent.log.data";

export class FluentdTransport extends TransportStream {
    private fluentSender: fluent.FluentSender<FluentLogData>;

    constructor(opts: FluentdTransportOptions) {
        super(opts);

        this.fluentSender = fluent.createFluentSender(opts.tag, {
            host: opts.host,
            port: opts.port,
            timeout: opts.timeout,
            reconnectInterval: opts.reconnectInterval,
        });
    }

    log(info: any, callback: () => void): void {
        setImmediate(() => this.emit('logged', info));

        const { level, message, ...meta } = info;

        this.fluentSender.emit(level, { message, ...meta });

        callback();
    }
}
