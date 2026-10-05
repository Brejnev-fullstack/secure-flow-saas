import { createRateLimiter } from "./limiter";

export const loginIpLimiter = createRateLimiter(20, 60 * 1000);
export const loginEmailLimiter = createRateLimiter(5, 60 * 1000);

