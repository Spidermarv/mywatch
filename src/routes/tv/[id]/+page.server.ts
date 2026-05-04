import { tmdb } from '$lib/server/tmdb';
import { fetchOMDB } from '$lib/server/omdb';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;
  
  try {
    const [series, credits, similar, externalIds] = await Promise.all([
      tmdb.getDetails(id, 'tv'),
      tmdb.getCredits(id, 'tv'),
      tmdb.fetchTMDB(`/tv/${id}/similar`),
      tmdb.fetchTMDB(`/tv/${id}/external_ids`)
    ]);

    const omdb = await fetchOMDB(externalIds.imdb_id);

    return {
      series,
      credits: credits.cast.slice(0, 10),
      similar: similar.results.slice(0, 5),
      omdb
    };
  } catch (err) {
    console.error('Failed to load series details:', err);
    throw error(404, 'Series not found');
  }
};
