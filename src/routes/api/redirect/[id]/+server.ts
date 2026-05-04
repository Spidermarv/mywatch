import { SHORTENER_API_KEY } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
  const { id } = params;
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return json({ error: 'Missing target URL' }, { status: 400 });
  }

  try {
    // Example for OuO.io or ShrinkMe.io
    // Note: Actual implementation depends on the specific API documentation
    const response = await fetch(`https://shrinkme.io/api?api=${SHORTENER_API_KEY}&url=${encodeURIComponent(targetUrl)}`);
    const data = await response.json();

    if (data.status === 'success') {
      return json({ shortUrl: data.shortenedUrl });
    } else {
      // Fallback if API fails
      return json({ shortUrl: targetUrl });
    }
  } catch (error) {
    console.error('Shortener API error:', error);
    return json({ shortUrl: targetUrl });
  }
};
