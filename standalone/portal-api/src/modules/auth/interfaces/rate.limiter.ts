import { RateLimiterStoreAbstract } from "rate-limiter-flexible";

export interface RateLimiter extends RateLimiterStoreAbstract {
    enabled(): boolean;
}
