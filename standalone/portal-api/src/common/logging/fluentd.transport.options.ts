import { TransportStreamOptions } from "winston-transport";

export interface FluentdTransportOptions extends TransportStreamOptions {
    tag: string;
    host: string;
    port: number;
    timeout?: number;
    reconnectInterval?: number;
}