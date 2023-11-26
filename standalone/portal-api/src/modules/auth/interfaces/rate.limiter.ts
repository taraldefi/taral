import { RateLimiterRedis, RateLimiterRes, RateLimiterStoreAbstract } from "rate-limiter-flexible";

export interface RateLimiter extends RateLimiterStoreAbstract {
    enabled(): boolean;
}

export class RedisRateLimiter implements RateLimiter {
    constructor(private rateLimiterRedis: RateLimiterRedis) {
        
    }

    enabled(): boolean {
        return true;
    }

    points: number;
    duration: number;
    blockDuration: number;
    execEvenly: boolean;
    execEvenlyMinDelayMs: number;
    keyPrefix: string;

    get msDuration(): number {
        return this.rateLimiterRedis.msDuration;
    }
    
    get msBlockDuration(): number {
        return this.rateLimiterRedis.msBlockDuration;
    }

    deleteInMemoryBlockedAll(): void {
        this.rateLimiterRedis.deleteInMemoryBlockedAll();
    }

    getKey(key: string | number): string {
        return this.rateLimiterRedis.getKey(key);
    }

    parseKey(rlKey: string): string {
        return this.rateLimiterRedis.parseKey(rlKey);
    }

    consume(key: string | number, pointsToConsume?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return this.rateLimiterRedis.consume(key, pointsToConsume, options);
    }

    penalty(key: string | number, points?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return this.rateLimiterRedis.penalty(key, points, options);
    }

    reward(key: string | number, points?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return this.rateLimiterRedis.reward(key, points, options);
    }

    get(key: string | number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return this.rateLimiterRedis.get(key, options);
    }

    set(key: string | number, points: number, secDuration: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return this.rateLimiterRedis.set(key, points, secDuration, options);
    }

    block(key: string | number, secDuration: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return this.rateLimiterRedis.block(key, secDuration, options);
    }

    delete(key: string | number, options?: { [key: string]: any; }): Promise<boolean> {
        return this.rateLimiterRedis.delete(key, options);
    }
}

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