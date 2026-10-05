const requests = new Map<string, number[]>();

export function rateLimit(identifier: string, limit: number, windowMs: number) {
  const now = Date.now();

  const userRequests = requests.get(identifier) || [];

  const recentRequests = userRequests.filter(
    (timestamp) => now - timestamp < windowMs,
  );

  if (recentRequests.length >= limit) {
    return false;
  }

  recentRequests.push(now);
  requests.set(identifier, recentRequests);
  return true;
}
