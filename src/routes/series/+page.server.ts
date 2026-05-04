import { tmdb } from '$lib/server/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const page = url.searchParams.get('page') || '1';
  
  try {
    const data = await tmdb.getPopular('tv');
    return {
      series: data.results,
      currentPage: data.page,
      totalPages: Math.min(data.total_pages, 500)
    };
  } catch (error) {
    console.error('Failed to load series:', error);
    return { series: [], currentPage: 1, totalPages: 0 };
  }
};
