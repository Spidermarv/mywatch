import { tmdb } from '$lib/server/tmdb';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('q');
  
  if (!query) {
    return json({ results: [] });
  }

  try {
    const results = await tmdb.search(query);
    return json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return json({ error: 'Search failed' }, { status: 500 });
  }
};
