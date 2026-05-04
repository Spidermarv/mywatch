import { tmdb } from '$lib/server/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const page = url.searchParams.get('page') || '1';
  
  try {
    const data = await tmdb.getPopular('movie'); // TMDB popular endpoint supports page param too
    return {
      movies: data.results,
      currentPage: data.page,
      totalPages: Math.min(data.total_pages, 500) // TMDB limit
    };
  } catch (error) {
    console.error('Failed to load movies:', error);
    return { movies: [], currentPage: 1, totalPages: 0 };
  }
};
