import { tmdb } from '$lib/server/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const data = await tmdb.getTrending('all', 'week');
    return {
      trending: data.results
    };
  } catch (error) {
    console.error('Failed to load trending:', error);
    return { trending: [] };
  }
};
