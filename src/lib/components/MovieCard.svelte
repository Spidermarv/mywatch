<script lang="ts">
  import { Star, Play } from 'lucide-svelte';
  
  let { media } = $props();
  
  const title = $derived(media.title || media.name);
  const releaseDate = $derived(media.release_date || media.first_air_date);
  const year = $derived(releaseDate ? new Date(releaseDate).getFullYear() : 'N/A');
  const poster = $derived(media.poster_path 
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}` 
    : '/placeholder-poster.jpg');
</script>

<a 
  href="/{media.media_type || (media.title ? 'movie' : 'tv')}/{media.id}"
  class="apple-card group relative block"
>
  <div class="aspect-[2/3] w-full bg-bg-tertiary relative overflow-hidden">
    <img 
      src={poster} 
      alt={title}
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
    
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
      <div class="w-full">
        <div class="flex items-center gap-2 mb-2">
          <Star class="w-3 h-3 text-yellow-500 fill-current" />
          <span class="text-xs font-bold text-white">{media.vote_average?.toFixed(1)}</span>
        </div>
        <button class="w-full py-2 bg-brand-blue text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2">
          <Play class="w-3 h-3 fill-current" />
          WATCH NOW
        </button>
      </div>
    </div>
  </div>
  
  <div class="p-3">
    <h3 class="text-sm font-semibold truncate group-hover:text-brand-blue transition-colors">{title}</h3>
    <p class="text-xs text-text-secondary mt-1">{year} • {media.media_type === 'tv' ? 'Series' : 'Movie'}</p>
  </div>
</a>
