<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';

  let { data } = $props();
</script>

<div class="max-w-7xl mx-auto px-6 py-8 space-y-12">
  <div class="space-y-2">
    <div class="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/20 border border-brand-blue/30 rounded-full mb-4">
      <span class="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
      <span class="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Global Trends</span>
    </div>
    <h1 class="text-4xl font-bold tracking-tight">Trending This Week</h1>
    <p class="text-text-secondary">What the world is watching right now.</p>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {#each data.trending as item}
      <MovieCard media={item} />
    {/each}
  </div>
</div>
