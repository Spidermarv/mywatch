import type { Handle } from '@sveltejs/kit';
import { checkRateLimit } from '$lib/utils/obfuscation';

export const handle: Handle = async ({ event, resolve }) => {
  const ip = event.getClientAddress();
  
  // Apply rate limiting to API routes
  if (event.url.pathname.startsWith('/api')) {
    if (!checkRateLimit(ip, 50, 60000)) {
      return new Response('Too Many Requests', { status: 429 });
    }
  }

  const response = await resolve(event);

  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // CSP (Strict but allowing embeds)
  // Note: Adjust these based on the actual embed providers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://*.tmdb.org https://*.vignette.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https://image.tmdb.org https://*.tmdb.org; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "frame-src 'self' https://vidsrc.to https://www.2embed.cc https://multiembed.mov; " +
    "connect-src 'self' https://api.themoviedb.org https://*.supabase.co;"
  );

  return response;
};
