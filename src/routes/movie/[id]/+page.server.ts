import { tmdb } from '$lib/server/tmdb';
import { fetchOMDB } from '$lib/server/omdb';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;
  
  try {
    const [movie, credits, similar] = await Promise.all([
      tmdb.getDetails(id, 'movie'),
      tmdb.getCredits(id, 'movie'),
      tmdb.fetchTMDB(`/movie/${id}/similar`)
    ]);

    const omdb = await fetchOMDB(movie.imdb_id);

    return {
      movie,
      credits: credits.cast.slice(0, 10),
      similar: similar.results.slice(0, 5),
      omdb
    };
  } catch (err) {
    console.error('Failed to load movie details:', err);
    throw error(404, 'Movie not found');
  }
};
