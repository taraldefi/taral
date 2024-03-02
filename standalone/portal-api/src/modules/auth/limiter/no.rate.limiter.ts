import { RateLimiterRes } from "rate-limiter-flexible";
import { RateLimiter } from "../interfaces/rate.limiter";

export class NoRateLimiter implements RateLimiter {
    enabled(): boolean {
        return false;
    }

    deleteInMemoryBlockedAll(): void {
    }
    points: number;
    duration: number;

    get msDuration(): number {
        return 10000;
    }
    blockDuration: number;
    get msBlockDuration(): number {
        return 10000;
    }
    execEvenly: boolean;
    execEvenlyMinDelayMs: number;
    keyPrefix: string;
    getKey(key: string | number): string {
        return null;
    }
    parseKey(rlKey: string): string {
        
        return null;
    }
    consume(key: string | number, pointsToConsume?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return new Promise((resolve, _) => { resolve(null); }); 
    }
    penalty(key: string | number, points?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return new Promise((resolve, _) => { resolve(null); });
    }
    reward(key: string | number, points?: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return new Promise((resolve, _) => { resolve(null); });
    }
    get(key: string | number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return new Promise((resolve, _) => { resolve(null); });
    }
    set(key: string | number, points: number, secDuration: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return new Promise((resolve, _) => { resolve(null); });
    }
    block(key: string | number, secDuration: number, options?: { [key: string]: any; }): Promise<RateLimiterRes> {
        return new Promise((resolve, _) => { resolve(null); });
    }
    delete(key: string | number, options?: { [key: string]: any; }): Promise<boolean> {
        return new Promise((resolve, _) => { resolve(true); });
    }
}