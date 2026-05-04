<script lang="ts">
  import Player from '$lib/components/Player.svelte';
  import MovieCard from '$lib/components/MovieCard.svelte';
  import { Star, Calendar, Clock, Globe, Share2, Heart } from 'lucide-svelte';
  import { generateMovieJsonLd } from '$lib/utils/seo';

  let { data } = $props();
  const { movie, credits, similar } = data;
  const jsonLd = generateMovieJsonLd(movie);

  const year = new Date(movie.release_date).getFullYear();
  const rating = movie.vote_average.toFixed(1);
  const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
</script>

<svelte:head>
  <title>{movie.title} ({year}) - Watch on HurahWatch</title>
  <meta name="description" content={movie.overview} />
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="max-w-7xl mx-auto px-6 py-8 space-y-12">
  <!-- Video Player Section -->
  <section>
    <Player tmdbId={movie.id} type="movie" />
  </section>

  <!-- Info Section -->
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-12">
    <div class="lg:col-span-2 space-y-8">
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          {#each movie.genres as genre}
            <span class="px-3 py-1 bg-bg-tertiary border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              {genre.name}
            </span>
          {/each}
        </div>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight">{movie.title}</h1>
        <div class="flex items-center gap-6 text-sm text-text-secondary">
          <div class="flex items-center gap-1.5" title="TMDB Rating">
            <Star class="w-4 h-4 text-yellow-500 fill-current" />
            <span class="font-bold text-text-primary">{rating}</span>
          </div>
          {#if data.omdb?.Ratings}
            {#each data.omdb.Ratings as rating}
              <div class="flex items-center gap-1.5" title={rating.Source}>
                <span class="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{rating.Source === 'Internet Movie Database' ? 'IMDB' : rating.Source}</span>
                <span class="font-bold text-text-primary">{rating.Value}</span>
              </div>
            {/each}
          {/if}
          <div class="flex items-center gap-1.5">
            <Calendar class="w-4 h-4" />
            <span>{year}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Clock class="w-4 h-4" />
            <span>{runtime}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Globe class="w-4 h-4" />
            <span>{movie.original_language.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {#if data.omdb?.Awards && data.omdb.Awards !== 'N/A'}
        <div class="px-4 py-3 bg-brand-purple/10 border border-brand-purple/20 rounded-2xl flex items-center gap-3">
          <div class="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center flex-shrink-0">
            <Star class="w-4 h-4 text-white fill-current" />
          </div>
          <p class="text-sm font-medium text-brand-purple italic">
            {data.omdb.Awards}
          </p>
        </div>
      {/if}

      <div class="space-y-4">
        <h2 class="text-xl font-bold">Overview</h2>
        <p class="text-text-secondary leading-relaxed text-lg">
          {movie.overview}
        </p>
      </div>

      <div class="space-y-6">
        <h2 class="text-xl font-bold">Cast</h2>
        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {#each credits as person}
            <div class="flex-shrink-0 w-24 space-y-2 text-center">
              <div class="w-20 h-20 mx-auto rounded-full overflow-hidden bg-bg-tertiary border border-border">
                {#if person.profile_path}
                  <img src="https://image.tmdb.org/t/p/w185{person.profile_path}" alt={person.name} class="w-full h-full object-cover" />
                {:else}
                  <div class="w-full h-full flex items-center justify-center text-text-secondary font-bold text-xl uppercase">
                    {person.name.charAt(0)}
                  </div>
                {/if}
              </div>
              <p class="text-[10px] font-bold truncate px-1">{person.name}</p>
              <p class="text-[9px] text-text-secondary truncate px-1">{person.character}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <div class="bg-bg-secondary border border-border rounded-2xl p-6 space-y-6">
        <div class="flex items-center justify-between">
          <span class="text-sm font-bold text-text-secondary uppercase tracking-widest">Status</span>
          <span class="px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded text-[10px] font-bold">{movie.status}</span>
        </div>
        <div class="space-y-4 pt-4 border-t border-border">
          <button class="w-full apple-button flex items-center justify-center gap-2">
            <Heart class="w-4 h-4" /> Add to Favorites
          </button>
          <button class="w-full apple-button-secondary flex items-center justify-center gap-2">
            <Share2 class="w-4 h-4" /> Share Content
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <h2 class="text-xl font-bold">Similar Content</h2>
        <div class="grid grid-cols-2 gap-4">
          {#each similar as item}
            <MovieCard media={item} />
          {/each}
        </div>
      </div>
    </div>
  </section>
</div>
