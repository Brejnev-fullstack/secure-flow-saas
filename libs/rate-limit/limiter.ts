type RateLimitEntry = {
  count: number;
  resetTime: number;
};

const store = new Map<string, RateLimitEntry>();

export function createRateLimiter(limit: number, windowMs: number) {
  return function (identifier: string) {
    const now = Date.now();
    const key = identifier;
    const existing = store.get(key);

    if (!existing) {
      store.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });

      return {
        success: true,
      };
    }

    if (now > existing.resetTime) {
      store.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });

      return {
        success: true,
      };
    }

    if (existing.count >= limit) {
      return {
        success: false,
        retryAfter: Math.ceil((existing.resetTime - now) / 1000),
      };
    }

    existing.count++;

    return {
      success: true,
    };
  };
}


