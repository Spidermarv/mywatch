<script lang="ts">
  import Player from '$lib/components/Player.svelte';
  import MovieCard from '$lib/components/MovieCard.svelte';
  import { Star, Calendar, Tv, Globe, Share2, Heart, ChevronDown } from 'lucide-svelte';
  import { generateTVJsonLd } from '$lib/utils/seo';

  let { data } = $props();
  const series = $derived(data.series);
  const credits = $derived(data.credits);
  const similar = $derived(data.similar);
  const jsonLd = $derived(generateTVJsonLd(series));

  let selectedSeason = $state(1);
  let selectedEpisode = $state(1);
  let showSeasonDropdown = $state(false);

  const year = $derived(new Date(series.first_air_date).getFullYear());
  const rating = $derived(series.vote_average.toFixed(1));
  
  const currentSeasonData = $derived(series.seasons.find((s: any) => s.season_number === selectedSeason) || series.seasons[0]);
</script>

<svelte:head>
  <title>{series.name} ({year}) - Watch on HurahWatch</title>
  <meta name="description" content={series.overview} />
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="max-w-7xl mx-auto px-6 py-8 space-y-12">
  <!-- Video Player Section -->
  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="relative">
          <button 
            onclick={() => showSeasonDropdown = !showSeasonDropdown}
            class="px-4 py-2 bg-bg-secondary border border-border rounded-xl flex items-center gap-2 hover:border-brand-blue transition-colors"
          >
            <span class="text-sm font-bold">Season {selectedSeason}</span>
            <ChevronDown class="w-4 h-4 transition-transform {showSeasonDropdown ? 'rotate-180' : ''}" />
          </button>
          
          {#if showSeasonDropdown}
            <div class="absolute top-full mt-2 left-0 w-48 bg-bg-secondary border border-border rounded-xl shadow-2xl z-50 overflow-hidden py-1">
              {#each series.seasons as season}
                {#if season.season_number > 0}
                  <button 
                    onclick={() => { selectedSeason = season.season_number; selectedEpisode = 1; showSeasonDropdown = false; }}
                    class="w-full px-4 py-2 text-left text-sm hover:bg-brand-blue/10 hover:text-brand-blue transition-colors {selectedSeason === season.season_number ? 'text-brand-blue bg-brand-blue/5' : ''}"
                  >
                    Season {season.season_number}
                  </button>
                {/if}
              {/each}
            </div>
          {/if}
        </div>

        <div class="flex items-center gap-2 overflow-x-auto max-w-[60vw] pb-2 scrollbar-hide">
          {#each Array(currentSeasonData?.episode_count || 0) as _, i}
            <button 
              onclick={() => selectedEpisode = i + 1}
              class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border transition-all {selectedEpisode === i + 1 ? 'bg-brand-blue border-brand-blue text-white' : 'bg-bg-secondary border-border text-text-secondary hover:border-text-secondary'}"
            >
              {i + 1}
            </button>
          {/each}
        </div>
      </div>
      
      <div class="text-sm font-medium text-text-secondary">
        Playing: <span class="text-text-primary">S{selectedSeason} E{selectedEpisode}</span>
      </div>
    </div>

    <Player tmdbId={series.id} type="tv" season={selectedSeason} episode={selectedEpisode} />
  </section>

  <!-- Info Section -->
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-12">
    <div class="lg:col-span-2 space-y-8">
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          {#each series.genres as genre}
            <span class="px-3 py-1 bg-bg-tertiary border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              {genre.name}
            </span>
          {/each}
        </div>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight">{series.name}</h1>
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
            <Tv class="w-4 h-4" />
            <span>{series.number_of_seasons} Seasons</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Globe class="w-4 h-4" />
            <span>{series.original_language.toUpperCase()}</span>
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
          {series.overview}
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
          <span class="px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded text-[10px] font-bold">{series.status}</span>
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
