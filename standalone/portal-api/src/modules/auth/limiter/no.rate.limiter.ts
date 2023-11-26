import { RateLimiterRes } from "rate-limiter-flexible";
import { RateLimiter } from "../interfaces/rate.limiter";

export class NoRateLimiter implements RateLimiter {
    enabled(): boolean {
        return false;
    }

    deleteInMemoryBlockedAll(): void {
        throw new Error("Method not implemented.");
    }
    points: number;
    duration: number;
    get msDuration(): number {
        throw new Error("Method not implemented.");
    }
    blockDuration: number;
    get msBlockDuration(): number {
        throw new Error("Method not implemented.");
    }
    execEvenly: boolean;
    execEvenlyMinDelayMs: number;
    keyPrefix: string;
    getKey(key: string | number): string {
        throw new Error("Method not implemented.");
    }
    parseKey(rlKey: string): string {
        throw new Error("Method not implemented.");
    }
    consume(key: string | number, pointsToConsume?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        throw new Error("Method not implemented.");
    }
    penalty(key: string | number, points?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        throw new Error("Method not implemented.");
    }
    reward(key: string | number, points?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        throw new Error("Method not implemented.");
    }
    get(key: string | number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        throw new Error("Method not implemented.");
    }
    set(key: string | number, points: number, secDuration: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        throw new Error("Method not implemented.");
    }
    block(key: string | number, secDuration: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        throw new Error("Method not implemented.");
    }
    delete(key: string | number, options?: { [key: string]: any; }): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}