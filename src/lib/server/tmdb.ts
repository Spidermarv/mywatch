import { TMDB_API_KEY } from '$env/static/private';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...params
  }).toString();

  const response = await fetch(`${BASE_URL}${endpoint}?${query}`);
  
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.statusText}`);
  }

  return response.json();
}

export const tmdb = {
  getTrending: (type: 'movie' | 'tv' | 'all' = 'all', timeWindow: 'day' | 'week' = 'day') => 
    fetchTMDB(`/trending/${type}/${timeWindow}`),
  
  getPopular: (type: 'movie' | 'tv' = 'movie') => 
    fetchTMDB(`/${type}/popular`),
  
  getDetails: (id: string | number, type: 'movie' | 'tv') => 
    fetchTMDB(`/${type}/${id}`),
  
  getCredits: (id: string | number, type: 'movie' | 'tv') => 
    fetchTMDB(`/${type}/${id}/credits`),
  
  search: (query: string, type: 'movie' | 'tv' | 'multi' = 'multi') => 
    fetchTMDB(`/search/${type}`, { query }),
  
  getImageUrl: (path: string, size: 'w500' | 'original' = 'w500') => 
    `https://image.tmdb.org/t/p/${size}${path}`
};
