import { syncTrending } from '$lib/server/sync';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TMDB_API_KEY } from '$env/static/private'; // Using this as a simple secret check for now

export const GET: RequestHandler = async ({ url }) => {
  const secret = url.searchParams.get('secret');

  // Simple security check
  if (secret !== TMDB_API_KEY) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Trigger sync in background (Vercel functions have limited time, so we might need a better solution for large syncs)
  await syncTrending();

  return json({ status: 'Sync triggered' });
};
