<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  let { data } = $props();
</script>

<div class="max-w-7xl mx-auto px-6 py-8 space-y-12">
  <div class="space-y-2">
    <h1 class="text-4xl font-bold tracking-tight">TV Series</h1>
    <p class="text-text-secondary">Binge-worthy shows and critically acclaimed series.</p>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {#each data.series as item}
      <MovieCard media={item} />
    {/each}
  </div>

  {#if data.totalPages > 1}
    <div class="flex items-center justify-center gap-4 pt-12">
      <button 
        disabled={data.currentPage === 1}
        class="p-2 bg-bg-secondary border border-border rounded-full disabled:opacity-30 transition-all hover:border-brand-blue"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>
      <span class="text-sm font-bold">Page {data.currentPage} of {data.totalPages}</span>
      <button 
        disabled={data.currentPage === data.totalPages}
        class="p-2 bg-bg-secondary border border-border rounded-full disabled:opacity-30 transition-all hover:border-brand-blue"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
  {/if}
</div>
