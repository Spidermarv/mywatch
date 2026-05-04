import { OMDB_API_KEY } from '$env/static/private';

const BASE_URL = 'http://www.omdbapi.com/';

export async function fetchOMDB(imdbId: string) {
  if (!imdbId) return null;
  
  const query = new URLSearchParams({
    apikey: OMDB_API_KEY,
    i: imdbId,
    plot: 'full'
  }).toString();

  try {
    const response = await fetch(`${BASE_URL}?${query}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('OMDB API Error:', error);
    return null;
  }
}
