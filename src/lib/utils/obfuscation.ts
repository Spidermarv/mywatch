/**
 * Simple Base64 obfuscation for embed sources to prevent basic scrapers
 */

export function obfuscate(url: string): string {
  if (typeof btoa === 'undefined') return url;
  return btoa(url).split('').reverse().join('');
}

export function deobfuscate(obfuscated: string): string {
  if (typeof atob === 'undefined') return obfuscated;
  const reversed = obfuscated.split('').reverse().join('');
  return atob(reversed);
}

/**
 * Rate limiting helper (simple implementation)
 * In production, use Redis or Supabase for persistent rate limiting
 */
const rateLimitMap = new Map<string, { count: number, resetAt: number }>();

export function checkRateLimit(ip: string, limit = 100, windowMs = 60000) {
  const now = Date.now();
  const state = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs };

  if (now > state.resetAt) {
    state.count = 1;
    state.resetAt = now + windowMs;
  } else {
    state.count++;
  }

  rateLimitMap.set(ip, state);

  return state.count <= limit;
}
