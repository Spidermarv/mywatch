import { tmdb } from './tmdb';
import { supabaseAdmin } from './supabase';

export async function syncTrending() {
  console.log('Starting TMDb Sync...');
  
  try {
    const [movies, tv] = await Promise.all([
      tmdb.getTrending('movie', 'day'),
      tmdb.getTrending('tv', 'day')
    ]);

    const allMedia = [
      ...movies.results.map((m: any) => ({ ...m, media_type: 'movie' })),
      ...tv.results.map((m: any) => ({ ...m, media_type: 'tv' }))
    ];

    for (const item of allMedia) {
      const { 
        id, title, name, overview, poster_path, backdrop_path, 
        release_date, first_air_date, vote_average, popularity, media_type 
      } = item;

      // Upsert media
      const { error: mediaError } = await supabaseAdmin
        .from('media')
        .upsert({
          id,
          title: title || name,
          type: media_type,
          overview,
          poster_path,
          backdrop_path,
          release_date: release_date || first_air_date,
          vote_average,
          popularity,
          updated_at: new Date()
        }, { onConflict: 'id' });

      if (mediaError) console.error(`Error syncing media ${id}:`, mediaError);

      // Update trends
      const { error: trendError } = await supabaseAdmin
        .from('trends')
        .upsert({
          media_id: id,
          trend_type: 'trending_day',
          updated_at: new Date()
        }, { onConflict: 'media_id, trend_type' });
      
      if (trendError) console.error(`Error syncing trend ${id}:`, trendError);
    }

    console.log('Sync completed successfully.');
  } catch (error) {
    console.error('Sync failed:', error);
  }
}
