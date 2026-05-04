<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';
  import { ChevronRight } from 'lucide-svelte';

  let { data } = $props();
</script>

<div class="max-w-7xl mx-auto px-6 space-y-16 py-8">
  <!-- Hero Section -->
  <section class="relative h-[60vh] rounded-3xl overflow-hidden group">
    {#if data.trendingMovies?.[0]}
      {@const hero = data.trendingMovies[0]}
      <img 
        src="https://image.tmdb.org/t/p/original{hero.backdrop_path}" 
        alt={hero.title}
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      <div class="absolute inset-0 flex flex-col justify-center px-12 max-w-2xl space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/20 border border-brand-blue/30 rounded-full">
          <span class="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
          <span class="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Trending Now</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          {hero.title}
        </h1>
        <p class="text-lg text-text-secondary line-clamp-3">
          {hero.overview}
        </p>
        <div class="flex items-center gap-4 pt-4">
          <a href="/movie/{hero.id}" class="apple-button flex items-center gap-2">
            Details
          </a>
          <a href="/movie/{hero.id}" class="apple-button-secondary">
            Watch Trailer
          </a>
        </div>
      </div>
    {/if}
  </section>

  <!-- Trending Movies -->
  <section>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold">Trending Movies</h2>
      <a href="/movies" class="text-sm text-brand-blue flex items-center gap-1 hover:underline">
        See All <ChevronRight class="w-4 h-4" />
      </a>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {#each data.trendingMovies.slice(1, 11) as movie}
        <MovieCard media={movie} />
      {/each}
    </div>
  </section>

  <!-- Trending TV Shows -->
  <section>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold">Trending TV Shows</h2>
      <a href="/series" class="text-sm text-brand-blue flex items-center gap-1 hover:underline">
        See All <ChevronRight class="w-4 h-4" />
      </a>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {#each data.trendingTV as series}
        <MovieCard media={series} />
      {/each}
    </div>
  </section>

  <!-- Popular Movies -->
  <section>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold">Popular Movies</h2>
      <a href="/movies" class="text-sm text-brand-blue flex items-center gap-1 hover:underline">
        See All <ChevronRight class="w-4 h-4" />
      </a>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {#each data.popularMovies as movie}
        <MovieCard media={movie} />
      {/each}
    </div>
  </section>
</div>
