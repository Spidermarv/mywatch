import { tmdb } from '$lib/server/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const [trendingMovies, trendingTV, popularMovies] = await Promise.all([
      tmdb.getTrending('movie', 'day'),
      tmdb.getTrending('tv', 'day'),
      tmdb.getPopular('movie')
    ]);

    return {
      trendingMovies: trendingMovies.results.slice(0, 10),
      trendingTV: trendingTV.results.slice(0, 10),
      popularMovies: popularMovies.results.slice(0, 10)
    };
  } catch (error) {
    console.error('Failed to load home page data:', error);
    return {
      trendingMovies: [],
      trendingTV: [],
      popularMovies: []
    };
  }
};
